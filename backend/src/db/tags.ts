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

export async function deleteUnusedTags(): Promise<void> {
    const db = getDb();
    await db('tags').whereNotExists(db('tag_posts').whereRaw('tag_posts.tag_id = tags.id')).del();
}

export async function linkTagsToPost(postId: number, tagIds: number[]): Promise<void> {
    if (!tagIds.length) return;

    const db = getDb();
    const records = tagIds.map((tagId) => ({ post_id: postId, tag_id: tagId }));
    await db('tag_posts').insert(records);
}

export async function unlinkTagsFromPost(postId: number): Promise<void> {
    const db = getDb();
    await db('tag_posts').where('post_id', postId).del();
    await deleteUnusedTags();
}