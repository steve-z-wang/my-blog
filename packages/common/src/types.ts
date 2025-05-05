import { z } from "zod";
import {
  CommentSchema,
  PostSchema,
  GetTimelineRequestSchema,
  GetTimelineResponseSchema,
  GetPostRequestSchema,
  GetPostResponseSchema,
  SubscribeByEmailRequestSchema,
  SubscribeByEmailResponseSchema,
  UnsubscribeByEmailRequestSchema,
  UnsubscribeByEmailResponseSchema,
  CreateCommentRequestSchema,
  CreateCommentResponseSchema,
} from "./schema";

/**********
 * Models *
 **********/

export type Comment = z.infer<typeof CommentSchema>;
export type Post = z.infer<typeof PostSchema>;

/*********
 *  API  *
 *********/

// post endpoints
export type GetTimelineRequest = z.infer<typeof GetTimelineRequestSchema>;
export type GetTimelineResponse = z.infer<typeof GetTimelineResponseSchema>;
export type GetPostRequest = z.infer<typeof GetPostRequestSchema>;
export type GetPostResponse = z.infer<typeof GetPostResponseSchema>;

// comment endpoints
export type CreateCommentRequest = z.infer<typeof CreateCommentRequestSchema>;
export type CreateCommentResponse = z.infer<typeof CreateCommentResponseSchema>;

// subscription endpoints
export type SubscribeByEmailRequest = z.infer<
  typeof SubscribeByEmailRequestSchema
>;
export type SubscribeByEmailResponse = z.infer<
  typeof SubscribeByEmailResponseSchema
>;
export type UnsubscribeByEmailRequest = z.infer<
  typeof UnsubscribeByEmailRequestSchema
>;
export type UnsubscribeByEmailResponse = z.infer<
  typeof UnsubscribeByEmailResponseSchema
>;
