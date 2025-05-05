import { Comment } from '@my-blog/common';
import { getDb } from './knex';

function mapDbCommentToComment(dbComment: any): Comment {
    return {
        commentId: dbComment.comment_id,
        parentCommentId: dbComment.parent_comment_id,
        authorName: dbComment.author_name,
        content: dbComment.content,
        createdAt: dbComment.created_at,
    };
}

export async function getCommentsByPostId(postId: string): Promise<Comment[] | undefined> {
    const db = getDb();

    const comments = await db('comments as c')
        .select('c.comment_id', 'c.parent_comment_id', 'c.author_name', 'c.content', 'c.created_at')
        .where('c.post_id', postId)
        .orderBy('c.created_at', 'asc');

    return comments.map(mapDbCommentToComment);
}

export async function createComment(comment: {
    postId: string;
    parentCommentId: number | null; 
    authorName: string;
    content: string;
}): Promise<Comment> {
    const db = getDb();

    const [postCreated] = await db('comments').insert(comment).returning('*');

    return mapDbCommentToComment(postCreated);
}
