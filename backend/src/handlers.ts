import { GetPostRequest, GetPostResponse, GetTimelineRequest, GetTimelineResponse, SubscribeByEmailRequest, SubscribeByEmailResponse, UnsubscribeByEmailRequest, UnsubscribeByEmailResponse, GetCommentsRequest, GetCommentsResponse, CreateCommentRequest, CreateCommentResponse } from '@my-blog/common';
import { BadRequestError, NotFoundError } from './errors';
import { findPosts, findById } from './db/posts';
import { findCommentsByPostId, createComment } from './db/comments';
import { subscribeByEmail, unsubscribeByEmail } from './db/subscription';

export async function handleGetTimeline({ limit = 10, offset = 0 }: GetTimelineRequest): Promise<GetTimelineResponse> {
    const posts = await findPosts(limit, offset);
    return { posts };
}

export async function handleGetPost({ id }: GetPostRequest): Promise<GetPostResponse> {
    const post = await findById(id);
    if (!post) {
        throw new NotFoundError('Post not found');
    }
    return { post };
}

export async function handleSubscribeByEmail({ email }: SubscribeByEmailRequest): Promise<SubscribeByEmailResponse> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new BadRequestError('Invalid email format');
    }
    const subscribedAt = await subscribeByEmail(email);
    return { email, subscribedAt };
}

export async function handleUnsubscribeByEmail({ email }: UnsubscribeByEmailRequest): Promise<UnsubscribeByEmailResponse> {
    const unsubscribedAt = await unsubscribeByEmail(email);
    return { email, unsubscribedAt };
}

export async function handleGetComments({ postId }: GetCommentsRequest): Promise<GetCommentsResponse> {
    const comments = await findCommentsByPostId(postId);
    return { comments };
}

export async function handleCreateComment({ postId, parentCommentId, authorName, content }: CreateCommentRequest): Promise<CreateCommentResponse> {
    const comment = await createComment({
        post_id: postId,
        parent_comment_id: parentCommentId,
        author_name: authorName,
        content,
        created_at: Math.floor(Date.now())
    });
    return { comment };
}