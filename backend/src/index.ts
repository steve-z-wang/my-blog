import { AppBuilder } from './AppBuilder';
import {
    ListPostsRequestSchema,
    ListPostsResponseSchema,
    GetPostRequestSchema,
    GetPostResponseSchema,
    SubscribeByEmailRequestSchema,
    SubscribeByEmailResponseSchema,
    UnsubscribeByEmailRequestSchema,
    UnsubscribeByEmailResponseSchema,
    CreateCommentRequestSchema,
    CreateCommentResponseSchema,
    CreatePostRequestSchema,
    CreatePostResponseSchema,
    UpdatePostRequestSchema,
    UpdatePostResponseSchema,
    DeletePostRequestSchema,
    DeletePostResponseSchema,
} from '@my-blog/common';
import {
    handleListPosts,
    handleGetPost,
    handleSubscribeByEmail,
    handleUnsubscribeByEmail,
    handleCreateComment,
    handleCreatePost,
    handleUpdatePost,
    handleDeletePost,
} from './handlers';
import { initializeDatabase } from './db/knex';

// Initialize database
initializeDatabase();

// Create and configure app
const app = new AppBuilder()

    // Public API routes

    .addRoute({
        method: 'get',
        path: '/api/posts',
        handler: handleListPosts,
        requestSchema: ListPostsRequestSchema,
        responseSchema: ListPostsResponseSchema,
    })
    .addRoute({
        method: 'get',
        path: '/api/posts/:slug',
        handler: handleGetPost,
        requestSchema: GetPostRequestSchema,
        responseSchema: GetPostResponseSchema,
    })
    .addRoute({
        method: 'post',
        path: '/api/comments',
        handler: handleCreateComment,
        requestSchema: CreateCommentRequestSchema,
        responseSchema: CreateCommentResponseSchema,
        status: 201,
    })
    .addRoute({
        method: 'post',
        path: '/api/subscribe',
        handler: handleSubscribeByEmail,
        requestSchema: SubscribeByEmailRequestSchema,
        responseSchema: SubscribeByEmailResponseSchema,
        status: 204,
    })
    .addRoute({
        method: 'delete',
        path: '/api/unsubscribe',
        handler: handleUnsubscribeByEmail,
        requestSchema: UnsubscribeByEmailRequestSchema,
        responseSchema: UnsubscribeByEmailResponseSchema,
        status: 204,
    })

    // Internal API routes

    .addRoute({
        method: 'post',
        path: '/internal/posts',
        handler: handleCreatePost,
        requestSchema: CreatePostRequestSchema,
        responseSchema: CreatePostResponseSchema,
        status: 201,
    })
    .addRoute({
        method: 'put',
        path: '/internal/posts/:slug',
        handler: handleUpdatePost,
        requestSchema: UpdatePostRequestSchema,
        responseSchema: UpdatePostResponseSchema,
        status: 200,
    })
    .addRoute({
        method: 'delete',
        path: '/internal/posts/:slug',
        handler: handleDeletePost,
        requestSchema: DeletePostRequestSchema,
        responseSchema: DeletePostResponseSchema,
        status: 204,
    });

// Start the server
app.start();
