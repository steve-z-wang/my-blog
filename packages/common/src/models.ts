import { z } from 'zod';

export const PostSchema = z.object({
    post_id: z.number(),
    publish_at: z.number(),
    title: z.string(),
    content: z.string(),
    summary: z.string().nullable(),
    tags: z.array(z.string()),
});
export type Post = z.infer<typeof PostSchema>;

export const PostWithoutContentSchema = PostSchema.omit({ content: true });
export type PostWithoutContent = z.infer<typeof PostWithoutContentSchema>;