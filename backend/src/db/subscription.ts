import { ConflictError, NotFoundError } from '../errors';
import { getDb } from './knex';

export async function subscribeByEmail(email: string): Promise<void> {
    const db = getDb();

    const subscribedAt = Math.floor(Date.now() / 1000); // Current timestamp in seconds

    // Check if the email already exists in the database
    const existingSubscription = await db('email_subscriptions').where({ email }).first();

    if (existingSubscription) {
        throw new ConflictError(`Email ${email} is already subscribed`);
    }

    await db('email_subscriptions').insert({
        email,
        subscribed_at: subscribedAt,
    });
}

export async function unsubscribeByEmail(email: string): Promise<void> {
    const db = getDb();

    const count = await db('email_subscriptions').where({ email }).del();

    if (count === 0) {
        throw new NotFoundError(`Email ${email} not found in subscriptions`);
    }
}
