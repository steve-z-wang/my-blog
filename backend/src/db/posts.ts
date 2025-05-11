import { Post } from '@my-blog/common';
import { getCommentsByPostId } from './comments';
import { getDb } from './knex';
import { getTagsByPostId } from './tags';
import { NotFoundError } from '../errors';
import logger from '../logger';

export async function listPosts(limit: number, offset: number): Promise<Post[]> {
    const db = getDb();

    const posts = await db('posts as p')
        .select(
            'p.id',
            'p.slug',
            'p.published_at',
            'p.title',
            'p.summary',
            db.raw(`COALESCE(json_group_array(t.tag_name), '[]') AS tags`),
        )
        .leftJoin('tag_posts as tp', 'p.id', 'tp.post_id')
        .leftJoin('tags as t', 'tp.tag_id', 't.id')
        .groupBy('p.id')
        .orderBy('p.published_at', 'desc')
        .limit(limit)
        .offset(offset);

    return posts.map((post) => ({
        id: post.id,
        slug: post.slug,
        publishedAt: post.published_at,
        title: post.title,
        summary: post.summary,
        tags: Array.isArray(post.tags) ? post.tags : JSON.parse(post.tags),
    }));
}

export async function getPostById(id: number): Promise<Post> {
    const whereClause = { 'p.id': id };
    return getPost(whereClause);
}

export async function getPostBySlug(slug: string): Promise<Post> {
    logger.debug(`getPostBySlug: ${slug}`);
    const whereClause = { 'p.slug': slug };
    return getPost(whereClause);
}

async function getPost(whereClause: any): Promise<Post> {
    logger.debug(`getPost: ${JSON.stringify(whereClause)}`);

    const db = getDb();

    const post = await db('posts as p')
        .select('p.id', 'p.slug', 'p.published_at', 'p.title', 'p.summary', 'p.content')
        .where(whereClause)
        .first();

    if (!post) {
        throw new NotFoundError('Post not found');
    }

    logger.debug(`getPost: ${JSON.stringify(post)}`);

    const tags = await getTagsByPostId(post.id);
    const comments = await getCommentsByPostId(post.id);

    return {
        id: post.id,
        slug: post.slug,
        publishedAt: post.published_at,
        title: post.title,
        summary: post.summary,
        content: post.content,
        tags: tags,
        comments: comments,
    };
}
