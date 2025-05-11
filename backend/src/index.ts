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
} from '@my-blog/common';
import {
    handleListPosts,
    handleGetPost,
    handleSubscribeByEmail,
    handleUnsubscribeByEmail,
    handleCreateComment,
    handleCreatePost,
} from './handlers';
import { initializeDatabase } from './db/knex';

// Initialize database
initializeDatabase();

// Create and configure app
const app = new AppBuilder()
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
        path: '/api/posts',
        handler: handleCreatePost,
        requestSchema: CreatePostRequestSchema,
        responseSchema: CreatePostResponseSchema,
        status: 201,
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
        status: 201,
    })
    .addRoute({
        method: 'delete',
        path: '/api/unsubscribe',
        handler: handleUnsubscribeByEmail,
        requestSchema: UnsubscribeByEmailRequestSchema,
        responseSchema: UnsubscribeByEmailResponseSchema,
    });
// Start the server
app.start();
