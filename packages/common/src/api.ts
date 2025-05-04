import { z } from 'zod';
import { PostSchema, PostWithoutContentSchema } from './models';

// Get timeline

export const GetTimelineRequestSchema = z.object({
    limit: z.number().optional(),
    offset: z.number().optional(),
});
export const GetTimelineResponseSchema = z.object({
    posts: z.array(PostWithoutContentSchema),
});
export type GetTimelineRequest = z.infer<typeof GetTimelineRequestSchema>;
export type GetTimelineResponse = z.infer<typeof GetTimelineResponseSchema>;

// Get post by ID

export const GetPostRequestSchema = z.object({
    id: z.string(),
});
export const GetPostResponseSchema = z.object({
    post: PostSchema,
});
export type GetPostRequest = z.infer<typeof GetPostRequestSchema>;
export type GetPostResponse = z.infer<typeof GetPostResponseSchema>;

// Subscribe and Unsubscribe email

export const SubscribeByEmailRequestSchema = z.object({
    email: z.string().email()
});

export const SubscribeByEmailResponseSchema = z.object({
    email: z.string().email(),
    subscribedAt: z.number()
});

export const UnsubscribeByEmailRequestSchema = z.object({
    email: z.string().email(), 
});

export const UnsubscribeByEmailResponseSchema = z.object({
    email: z.string().email(),
    unsubscribedAt: z.number()
});

export type SubscribeByEmailRequest = z.infer<typeof SubscribeByEmailRequestSchema>;
export type SubscribeByEmailResponse = z.infer<typeof SubscribeByEmailResponseSchema>;
export type UnsubscribeByEmailRequest = z.infer<typeof UnsubscribeByEmailRequestSchema>;
export type UnsubscribeByEmailResponse = z.infer<typeof UnsubscribeByEmailResponseSchema>;