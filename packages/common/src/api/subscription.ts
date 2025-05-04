import { z } from 'zod';

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