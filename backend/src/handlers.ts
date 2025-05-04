import { GetPostRequest, GetPostResponse, GetTimelineRequest, GetTimelineResponse, SubscribeByEmailRequest, SubscribeByEmailResponse, UnsubscribeByEmailRequest, UnsubscribeByEmailResponse } from '@my-blog/common';
import { BadRequestError, NotFoundError } from './errors';
import { findPosts, findById } from './db/posts';
import logger from './logger';
import { subscribe } from 'diagnostics_channel';
import { subscribeByEmail, unsubscribeByEmail } from './db/subscription';

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

    const post = await findById(id);

    logger.info(`Fetched post: ${JSON.stringify(post)}`);

    if (!post) {
        throw new NotFoundError('Post not found');
    }

    return { post };
}

export async function handleSubscribeByEmail(request: SubscribeByEmailRequest): Promise<SubscribeByEmailResponse> {
    const { email } = request;

    logger.info(`Subscribing email: ${email}`);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        logger.error(`Invalid email format: ${email}`);
        throw new BadRequestError('Invalid email format');
    }

    const subscribedAt = await subscribeByEmail(email);

    logger.info(`Subscribed email: ${email} at ${subscribedAt}`);
    return {
        email,
        subscribedAt,
    };
}

export async function handleUnsubscribeByEmail(request: UnsubscribeByEmailRequest): Promise<UnsubscribeByEmailResponse> {
    const { email } = request;

    logger.info(`Unsubscribing email: ${email}`);

    const unsubscribedAt = await unsubscribeByEmail(email);

    logger.info(`Unsubscribed email: ${email} at ${unsubscribedAt}`);

    return {
        email,
        unsubscribedAt,
    };
}