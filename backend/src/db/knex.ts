import knex, { Knex } from 'knex';
import path from 'path';

let db: Knex | null = null;

export function getDb(): Knex {

    if (!db) {
        const dbFile = path.resolve(__dirname, '../../../db/blog.dev.db');

        db = knex({
            client: 'sqlite3',
            connection: {
                filename: dbFile,
            },
            useNullAsDefault: true,
        });
    }
    return db;
}

export default {
    getDb,
}; 