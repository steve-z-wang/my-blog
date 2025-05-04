import { z } from 'zod';
import { CommentSchema } from '../models';

export const GetCommentsRequestSchema = z.object({
    postId: z.string(),
});

export const GetCommentsResponseSchema = z.object({
    comments: z.array(CommentSchema)
});

export const CreateCommentRequestSchema = z.object({
    postId: z.string(),
    parentCommentId: z.number().optional(),
    authorName: z.string(),
    content: z.string()
});

export const CreateCommentResponseSchema = z.object({
    comment: CommentSchema
});

export type GetCommentsRequest = z.infer<typeof GetCommentsRequestSchema>;
export type GetCommentsResponse = z.infer<typeof GetCommentsResponseSchema>;
export type CreateCommentRequest = z.infer<typeof CreateCommentRequestSchema>;
export type CreateCommentResponse = z.infer<typeof CreateCommentResponseSchema>; 