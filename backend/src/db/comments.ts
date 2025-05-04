import { Comment } from '@my-blog/common';
import { getDb } from './knex';

/**
 * Get comments for a post, with optional nested replies
 * @param postId - the ID of the post
 * @param includeReplies - whether to include nested replies
 * @returns a list of comments with optional nested replies
 */
export function findCommentsByPostId(
    postId: string,
): Promise<Comment[]> {
    const db = getDb();

    // Get all comments
    return db('comments as c')
        .select(
            'c.comment_id',
            'c.post_id',
            'c.parent_comment_id',
            'c.author_name',
            'c.content',
            'c.created_at'
        )
        .where('c.post_id', postId)
        .orderBy('c.created_at', 'desc');
}

/**
 * Create a new comment
 * @param comment - the comment data to create
 * @returns the created comment
 */
export async function createComment(comment: Omit<Comment, 'comment_id'>): Promise<Comment> {
    const db = getDb();

    return await db('comments')
        .insert(comment)
        .returning('*');
}