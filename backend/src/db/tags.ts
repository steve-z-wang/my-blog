import { getDb } from './knex';

export async function getTagsByPostId(postId: string): Promise<string[]> {
    const db = getDb();

    return await db('tag_posts as tp')
        .join('tags as t', 'tp.tag_id', 't.tag_id')
        .where('tp.post_id', postId)
        .pluck('t.tag_name');
}
