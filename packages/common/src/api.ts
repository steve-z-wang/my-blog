import { z } from 'zod';
import { PostSchema, PostWithoutContentSchema } from './models';

// GetTimeline 
export const GetTimelineRequestSchema = z.object({
    limit: z.number().optional(),
    offset: z.number().optional(),
});
export const GetTimelineResponseSchema = z.object({
    posts: z.array(PostWithoutContentSchema),
});
export type GetTimelineRequest = z.infer<typeof GetTimelineRequestSchema>;
export type GetTimelineResponse = z.infer<typeof GetTimelineResponseSchema>;

// GetPost 
export const GetPostRequestSchema = z.object({
    id: z.number(),
});
export const GetPostResponseSchema = z.object({
    post: PostSchema,
});
export type GetPostRequest = z.infer<typeof GetPostRequestSchema>;
export type GetPostResponse = z.infer<typeof GetPostResponseSchema>;