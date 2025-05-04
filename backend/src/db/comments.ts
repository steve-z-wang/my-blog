import { Comment } from '@my-blog/common';
import { getDb } from './knex';

interface CommentWithReplies extends Comment {
    replies?: CommentWithReplies[];
}

/**
 * Get comments for a post, with optional nested replies
 * @param postId - the ID of the post
 * @param includeReplies - whether to include nested replies
 * @returns a list of comments with optional nested replies
 */
export async function findCommentsByPostId(
    postId: string,
    includeReplies: boolean = false
): Promise<CommentWithReplies[]> {
    const db = getDb();

    // Get top-level comments
    const topLevelComments = await db('comments as c')
        .select(
            'c.comment_id',
            'c.post_id',
            'c.parent_comment_id',
            'c.author_name',
            'c.content',
            'c.created_at'
        )
        .where('c.post_id', postId)
        .whereNull('c.parent_comment_id')
        .orderBy('c.created_at', 'desc');

    if (!includeReplies) {
        return topLevelComments;
    }

    // Get all replies for these comments in a single query
    const replies = await db('comments as c')
        .select(
            'c.comment_id',
            'c.post_id',
            'c.parent_comment_id',
            'c.author_name',
            'c.content',
            'c.created_at'
        )
        .whereIn('c.parent_comment_id', topLevelComments.map(c => c.comment_id))
        .orderBy('c.created_at', 'asc');

    // Organize replies into a nested structure
    const commentMap = new Map<number, CommentWithReplies>();
    
    // Initialize with top-level comments
    topLevelComments.forEach(comment => {
        commentMap.set(comment.comment_id, { ...comment, replies: [] });
    });

    // Add replies to their parent comments
    replies.forEach(reply => {
        const parent = commentMap.get(reply.parent_comment_id!);
        if (parent && parent.replies) {
            parent.replies.push(reply);
        }
    });

    return Array.from(commentMap.values());
}

/**
 * Get a single comment by ID with its replies
 * @param commentId - the ID of the comment
 * @param includeReplies - whether to include nested replies
 * @returns the comment with optional replies
 */
export async function findCommentById(
    commentId: number,
    includeReplies: boolean = false
): Promise<CommentWithReplies | undefined> {
    const db = getDb();

    const comment = await db('comments')
        .where('comment_id', commentId)
        .first();

    if (!comment || !includeReplies) {
        return comment;
    }

    const replies = await db('comments')
        .where('parent_comment_id', commentId)
        .orderBy('created_at', 'asc');

    return {
        ...comment,
        replies
    };
}

/**
 * Create a new comment
 * @param comment - the comment data to create
 * @returns the created comment
 */
export async function createComment(comment: Omit<Comment, 'comment_id'>): Promise<Comment> {
    const db = getDb();

    const [commentId] = await db('comments')
        .insert({
            post_id: comment.post_id,
            parent_comment_id: comment.parent_comment_id,
            author_name: comment.author_name,
            content: comment.content,
            created_at: comment.created_at
        })
        .returning('comment_id');

    return {
        ...comment,
        comment_id: commentId
    };
}
