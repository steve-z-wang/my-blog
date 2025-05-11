import { Comment } from '@my-blog/common';
import { getDb } from './knex';
import logger from '../logger';

function mapDbCommentToComment(dbComment: any): Comment {
    return {
        id: dbComment.id,
        parentId: dbComment.parent_id,
        authorName: dbComment.author_name,
        content: dbComment.content,
        createdAt: dbComment.created_at,
    };
}

export async function getCommentsByPostId(postId: number): Promise<Comment[] | undefined> {
    logger.debug(`getCommentsByPostId: ${postId}`);

    const db = getDb();

    const comments = await db('comments as c')
        .select('c.id', 'c.parent_id', 'c.author_name', 'c.content', 'c.created_at')
        .where('c.post_id', postId)
        .orderBy('c.created_at', 'asc');

    return comments.map(mapDbCommentToComment);
}

export async function createComment(comment: {
    postId: number;
    parentId: number | null;
    authorName: string;
    content: string;
}): Promise<Comment> {
    const db = getDb();

    const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds

    const [commentCreated] = await db('comments')
        .insert({
            post_id: comment.postId,
            parent_id: comment.parentId,
            author_name: comment.authorName,
            content: comment.content,
            created_at: now,
        })
        .returning('*');

    return mapDbCommentToComment(commentCreated);
}
