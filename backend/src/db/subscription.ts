import { ConflictError, NotFoundError } from "../errors";
import { getDb } from "./knex";


export async function subscribeByEmail(email: string): Promise<void> {
    const db = getDb();

    const subscribedAt = Math.floor(Date.now() / 1000); // Current timestamp in seconds

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
}

export async function unsubscribeByEmail(email: string): Promise<void> {
    const db = getDb();

    const count = await db('email_subscriptions')
        .where({ email })
        .del();

    if (count === 0) {
        throw new NotFoundError(`Email ${email} not found in subscriptions`);
    }
}