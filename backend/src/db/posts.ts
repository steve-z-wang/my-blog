import { Post, PostWithoutContent } from '@my-blog/common';
import { getDb } from './knex';

/**
 * Get the timeline of posts, sorted by publish date
 * @param limit - the number of posts to return
 * @param offset - the number of posts to skip
 * @returns a list of posts with summary and tags 
 */
export function findPosts(
    limit: number,
    offset: number
): Promise<PostWithoutContent[]> {
    const db = getDb();

    return db('posts as p')
        .select(
            'p.post_id',
            'p.published_at',
            'p.title',
            'p.summary',
            db.raw(`COALESCE(json_group_array(t.tag_name), '[]') AS tags`)
        )
        .leftJoin('tag_posts as tp', 'p.post_id', 'tp.post_id')
        .leftJoin('tags as t', 'tp.tag_id', 't.tag_id')
        .groupBy('p.post_id')
        .orderBy('p.published_at', 'desc')
        .limit(limit)
        .offset(offset)
        .then(posts =>
            posts.map(post => {
                post.tags = JSON.parse(post.tags); // Convert JSON string to array
                return post;
            })
        );
}

/**
 * Get a single post by ID
 * @param id - the ID of the post to get
 * @returns a single post with all details
 */
export function findById(id: string): Promise<Post | undefined> {
    const db = getDb();

    return db('posts as p')
        .select(
            'p.post_id',
            'p.published_at',
            'p.title',
            'p.summary',
            'p.content',
            db.raw(`COALESCE(json_group_array(t.tag_name), '[]') AS tags`)
        )
        .leftJoin('tag_posts as tp', 'p.post_id', 'tp.post_id')
        .leftJoin('tags as t', 'tp.tag_id', 't.tag_id')
        .where('p.post_id', id)
        .groupBy('p.post_id')
        .first()
        .then(post => {
            if (post) {
                post.tags = JSON.parse(post.tags);
            }
            return post;
        });
}