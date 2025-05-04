import { ConflictError, NotFoundError } from "../errors";
import { getDb } from "./knex";

/**
 * Subscribe by email
 * @param {string} email - The email address to subscribe
 * @return {Promise<number>} - A promise that resolves to the timestamp of subscription
 */
export async function subscribeByEmail(email: string): Promise<number> {
    const db = getDb();

    const subscribedAt = Math.floor(Date.now()); // Current timestamp in seconds

    try {
        await db("email_subscriptions").insert({
            email,
            subscribed_at: subscribedAt,
        });
    } catch (err: any) {
        // SQLite uses "SQLITE_CONSTRAINT" for UNIQUE/PK violations
        if (err.code === "SQLITE_CONSTRAINT") {
            throw new ConflictError(`Email ${email} is already subscribed`);
        }
        // re-throw any other unexpected errors
        throw err;
    }

    return subscribedAt
}

/**
 * Unsubscribe by email
 * @param {string} email - The email address to unsubscribe
 * @return {Promise<number>} - A promise that resolves to the timestamp of un-subscription
 */
export async function unsubscribeByEmail(email: string): Promise<number> {
    const db = getDb();

    const unsubscribedAt = Math.floor(Date.now()); // Current timestamp in seconds

    const count = await db('email_subscriptions')
        .where({ email })
        .del();

    if (count === 0) {
        throw new NotFoundError(`Email ${email} not found in subscriptions`);
    }

    return unsubscribedAt
}