import {
    GetPostRequest,
    GetPostResponse,
    GetTimelineRequest,
    GetTimelineResponse,
    SubscribeByEmailRequest,
    SubscribeByEmailResponse,
    UnsubscribeByEmailRequest,
    UnsubscribeByEmailResponse,
    CreateCommentRequest,
    CreateCommentResponse,
} from '@my-blog/common';
import { listPosts, getPostById, createComment, subscribeByEmail, unsubscribeByEmail } from './db';

// Handlers connects the API requests to the database operations

export async function handleGetTimeline(request: GetTimelineRequest): Promise<GetTimelineResponse> {
    const posts = await listPosts(request.limit ?? 10, request.offset ?? 0);
    return { posts };
}

export async function handleGetPost(request: GetPostRequest): Promise<GetPostResponse> {
    const post = await getPostById(request.id);
    return { post };
}

export async function handleSubscribeByEmail(
    request: SubscribeByEmailRequest,
): Promise<SubscribeByEmailResponse> {
    await subscribeByEmail(request.email);
    return {};
}

export async function handleUnsubscribeByEmail(
    request: UnsubscribeByEmailRequest,
): Promise<UnsubscribeByEmailResponse> {
    await unsubscribeByEmail(request.email);
    return {};
}

export async function handleCreateComment(
    request: CreateCommentRequest,
): Promise<CreateCommentResponse> {
    const comment = await createComment({
        postId: request.postId,
        parentCommentId: request.parentCommentId,
        authorName: request.authorName,
        content: request.content,
    });
    return { comment };
}
