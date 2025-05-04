import { z } from 'zod';

// post 

export const PostSchema = z.object({
    post_id: z.string(), // Changed from number to string
    published_at: z.number(),
    title: z.string(),
    content: z.string(),
    summary: z.string().nullable(),
    tags: z.array(z.string()),
});
export const PostWithoutContentSchema = PostSchema.omit({ content: true });

export type Post = z.infer<typeof PostSchema>;
export type PostWithoutContent = z.infer<typeof PostWithoutContentSchema>;

// email subscription 

export const EmailSubscriptionSchema = z.object({
    email: z.string().email(),
    subscribed_at: z.number(),
});

export type EmailSubscription = z.infer<typeof EmailSubscriptionSchema>;

// comment 

export const CommentSchema: z.ZodType<any> = z.object({
    comment_id: z.number(),
    post_id: z.string(),
    parent_comment_id: z.number().nullable(),
    author_name: z.string(),
    content: z.string(),
    created_at: z.number(),
    replies: z.array(z.lazy(() => CommentSchema)).optional()
});

export type Comment = z.infer<typeof CommentSchema>;
