import { GetPostRequest, GetPostResponse, GetTimelineRequest, GetTimelineResponse } from '@my-blog/common';
import { NotFoundError, BadRequestError } from './errors';
import { findPosts, findById } from './db/posts';
import logger from './logger';

export async function handleGetTimeline(request: GetTimelineRequest): Promise<GetTimelineResponse> {
    const { limit = 10, offset = 0 } = request;

    logger.info(`Fetching posts with limit: ${limit} and offset: ${offset}`);

    const posts = await findPosts(limit, offset);

    logger.info(`Fetched ${posts.length} posts`);

    return { posts };
}

export async function handleGetPost(request: GetPostRequest): Promise<GetPostResponse> {
    const { id } = request;

    logger.info(`Fetching post with ID: ${id}`);

    if (!Number.isInteger(id)) {
        throw new BadRequestError('Invalid post ID');
    }

    const post = await findById(id);

    logger.info(`Fetched post: ${JSON.stringify(post)}`);

    if (!post) {
        throw new NotFoundError('Post not found');
    }

    return { post };
}