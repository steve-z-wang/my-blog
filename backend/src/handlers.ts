import { GetPostRequest, GetPostResponse, GetTimelineRequest, GetTimelineResponse, SubscribeByEmailRequest, SubscribeByEmailResponse, UnsubscribeByEmailRequest, UnsubscribeByEmailResponse, GetCommentsRequest, GetCommentsResponse, GetCommentRequest, GetCommentResponse, CreateCommentRequest, CreateCommentResponse } from '@my-blog/common';
import { BadRequestError, NotFoundError } from './errors';
import { findPosts, findById } from './db/posts';
import { findCommentsByPostId, findCommentById, createComment } from './db/comments';
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

export async function handleGetComments(request: GetCommentsRequest): Promise<GetCommentsResponse> {
    const { postId, includeReplies = false } = request;

    logger.info(`Fetching comments for post ${postId} with includeReplies: ${includeReplies}`);

    const comments = await findCommentsByPostId(postId, includeReplies);

    return { comments };
}

export async function handleGetComment(request: GetCommentRequest): Promise<GetCommentResponse> {
    const { commentId, includeReplies = false } = request;

    logger.info(`Fetching comment ${commentId} with includeReplies: ${includeReplies}`);

    const comment = await findCommentById(commentId, includeReplies);

    if (!comment) {
        logger.error(`Comment not found: ${commentId}`);
        throw new NotFoundError('Comment not found');
    }

    logger.info(`Fetched comment: ${JSON.stringify(comment)}`);

    return { comment };
}

export async function handleCreateComment(request: CreateCommentRequest): Promise<CreateCommentResponse> {
    const { postId, parentCommentId, authorName, content } = request;

    logger.info(`Creating comment for post ${postId} by ${authorName}`);

    const comment = await createComment({
        post_id: postId,
        parent_comment_id: parentCommentId,
        author_name: authorName,
        content,
        created_at: Math.floor(Date.now() / 1000)
    });

    logger.info(`Created comment: ${JSON.stringify(comment)}`);

    return { comment };
}