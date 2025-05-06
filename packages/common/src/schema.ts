import { z } from "zod";

/**********
 * Models *
 **********/

export const CommentSchema = z.object({
  commentId: z.number(),
  parentCommentId: z.number().nullable(),
  authorName: z.string(),
  content: z.string(),
  createdAt: z.number().optional(),

  // optional
  children: z.array(z.lazy((): z.ZodTypeAny => CommentSchema)).optional(),
});

export const PostSchema = z.object({
  // required
  postId: z.string(),
  publishedAt: z.number(),
  title: z.string(),
  summary: z.string().nullable(),
  tags: z.array(z.string()),

  // optional
  content: z.string().optional(),
  comments: z.array(CommentSchema).optional(),
});

/*******
 * API *
 *******/

// Posts endpoints

export const ListPostsRequestSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const ListPostsResponseSchema = z.object({
  posts: z.array(PostSchema),
});

// Single post endpoints

export const GetPostRequestSchema = z.object({
  id: z.string(),
});
export const GetPostResponseSchema = z.object({
  post: PostSchema,
});

// Create comment endpoints

export const CreateCommentRequestSchema = z.object({
  postId: z.string(),
  parentCommentId: z.number().nullable(),
  authorName: z.string(),
  content: z.string(),
});
export const CreateCommentResponseSchema = z.object({
  comment: CommentSchema,
});

// Subscription endpoints

export const SubscribeByEmailRequestSchema = z.object({
  email: z.string().email().toLowerCase(),
});
export const SubscribeByEmailResponseSchema = z.object({});

export const UnsubscribeByEmailRequestSchema = z.object({
  email: z.string().email(),
});
export const UnsubscribeByEmailResponseSchema = z.object({});
