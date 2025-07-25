import { z } from "zod";
import {
  CommentSchema,
  PostSchema,
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
export type ListPostsRequest = z.infer<typeof ListPostsRequestSchema>;
export type ListPostsResponse = z.infer<typeof ListPostsResponseSchema>;
export type GetPostRequest = z.infer<typeof GetPostRequestSchema>;
export type GetPostResponse = z.infer<typeof GetPostResponseSchema>;
export type CreatePostRequest = z.infer<typeof CreatePostRequestSchema>;
export type CreatePostResponse = z.infer<typeof CreatePostResponseSchema>;
export type UpdatePostRequest = z.infer<typeof UpdatePostRequestSchema>;
export type UpdatePostResponse = z.infer<typeof UpdatePostResponseSchema>;
export type DeletePostRequest = z.infer<typeof DeletePostRequestSchema>;
export type DeletePostResponse = z.infer<typeof DeletePostResponseSchema>;

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
