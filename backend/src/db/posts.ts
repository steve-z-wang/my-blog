import { Post } from '@my-blog/common';
import { getCommentsByPostId } from './comments';
import { getDb } from './knex';
import { getTagsByPostId } from './tags';
import { NotFoundError } from '../errors';

export async function listPosts(limit: number, offset: number): Promise<Post[]> {
    const db = getDb();

    const posts = await db('posts as p')
        .select(
            'p.post_id',
            'p.published_at',
            'p.title',
            'p.summary',
            db.raw(`COALESCE(json_group_array(t.tag_name), '[]') AS tags`),
        )
        .leftJoin('tag_posts as tp', 'p.post_id', 'tp.post_id')
        .leftJoin('tags as t', 'tp.tag_id', 't.tag_id')
        .groupBy('p.post_id')
        .orderBy('p.published_at', 'desc')
        .limit(limit)
        .offset(offset);

    return posts.map((post) => ({
        postId: post.post_id,
        publishedAt: post.published_at,
        title: post.title,
        summary: post.summary,
        tags: Array.isArray(post.tags) ? post.tags : JSON.parse(post.tags),
    }));
}

export async function getPostById(postId: string): Promise<Post> {
    const db = getDb();

    const post = await db('posts as p')
        .select('p.post_id', 'p.published_at', 'p.title', 'p.summary', 'p.content')
        .where('p.post_id', postId)
        .first();

    if (!post) {
        throw new NotFoundError('Post not found');
    }

    const tags = await getTagsByPostId(postId);
    const comments = await getCommentsByPostId(postId);

    return {
        postId: post.post_id,
        publishedAt: post.published_at,
        title: post.title,
        summary: post.summary,
        content: post.content,
        tags: tags,
        comments: comments,
    };
}
