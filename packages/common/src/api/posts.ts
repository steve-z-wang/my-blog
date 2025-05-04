import { z } from 'zod';
import { PostSchema, PostWithoutContentSchema } from '../models';

// Timeline endpoints
export const GetTimelineRequestSchema = z.object({
    limit: z.number().optional(),
    offset: z.number().optional(),
});

export const GetTimelineResponseSchema = z.object({
    posts: z.array(PostWithoutContentSchema),
});

export type GetTimelineRequest = z.infer<typeof GetTimelineRequestSchema>;
export type GetTimelineResponse = z.infer<typeof GetTimelineResponseSchema>;

// Single post endpoints
export const GetPostRequestSchema = z.object({
    id: z.string(),
});

export const GetPostResponseSchema = z.object({
    post: PostSchema,
});

export type GetPostRequest = z.infer<typeof GetPostRequestSchema>;
export type GetPostResponse = z.infer<typeof GetPostResponseSchema>; 