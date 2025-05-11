import {
    GetPostRequest,
    GetPostResponse,
    ListPostsRequest,
    ListPostsResponse,
    SubscribeByEmailRequest,
    SubscribeByEmailResponse,
    UnsubscribeByEmailRequest,
    UnsubscribeByEmailResponse,
    CreateCommentRequest,
    CreateCommentResponse,
    CreatePostRequest,
    CreatePostResponse,
} from '@my-blog/common';
import {
    listPosts,
    createComment,
    subscribeByEmail,
    unsubscribeByEmail,
    getPostBySlug,
    createPost,
} from './db';

// Define a generic handler interface
export interface RequestHandler<TRequest, TResponse> {
    (request: TRequest): Promise<TResponse>;
}

// Handlers connects the API requests to the database operations

export const handleListPosts: RequestHandler<ListPostsRequest, ListPostsResponse> = async (
    request,
) => {
    const posts = await listPosts(request.limit ?? 10, request.offset ?? 0);
    return { posts };
};

export const handleGetPost: RequestHandler<GetPostRequest, GetPostResponse> = async (request) => {
    const post = await getPostBySlug(request.slug);
    return { post };
};

export const handleCreatePost: RequestHandler<CreatePostRequest, CreatePostResponse> = async (
    request,
) => {
    const post = await createPost(
        request.slug,
        request.title,
        request.summary,
        request.content,
        request.tags,
    );
    return { post };
};

export const handleSubscribeByEmail: RequestHandler<
    SubscribeByEmailRequest,
    SubscribeByEmailResponse
> = async (request) => {
    await subscribeByEmail(request.email);
    return {};
};

export const handleUnsubscribeByEmail: RequestHandler<
    UnsubscribeByEmailRequest,
    UnsubscribeByEmailResponse
> = async (request) => {
    await unsubscribeByEmail(request.email);
    return {};
};

export const handleCreateComment: RequestHandler<
    CreateCommentRequest,
    CreateCommentResponse
> = async (request) => {
    const comment = await createComment({
        postId: request.postId,
        parentId: request.parentId,
        authorName: request.authorName,
        content: request.content,
    });
    return { comment };
};
