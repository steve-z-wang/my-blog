import { getDb } from './knex';

export async function getTagsByPostId(postId: number): Promise<string[]> {
    const db = getDb();

    return await db('tag_posts as tp')
        .join('tags as t', 'tp.tag_id', 't.id')
        .where('tp.post_id', postId)
        .pluck('t.tag_name');
}

export async function getTagByName(tagName: string): Promise<number | null> {
    const db = getDb();

    const tag = await db('tags').where('tag_name', tagName).first();

    return tag ? tag.id : null;
}

export async function createTag(tagName: string): Promise<number> {
    const db = getDb();

    const [tagId] = await db('tags').insert({ tag_name: tagName }).returning('id');

    return tagId.id;
}

export async function createTagPost(postId: number, tagId: number): Promise<void> {
    const db = getDb();
    await db('tag_posts').insert({ post_id: postId, tag_id: tagId });
}