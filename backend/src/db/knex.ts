import knex, { Knex } from 'knex';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const DB_PATH = path.resolve(__dirname, '../../../db/blog.dev.db');
const SCHEMA_FILE = path.resolve(__dirname, '../../../db/schema.sql');
const SEED_FILE = path.resolve(__dirname, '../../../db/seed.sql');

let db: Knex | null = null;

export function getDb(): Knex {
    db ??= knex({
        client: 'sqlite3',
        connection: {
            filename: DB_PATH,
        },
        useNullAsDefault: true,
    });
    return db;
}

export function initializeDatabase(): void {
    if (!fs.existsSync(DB_PATH)) {
        console.log('Database file not found. Initializing database...');

        // Run schema.sql
        execSync(`sqlite3 ${DB_PATH} < ${SCHEMA_FILE}`);

        // Run seed.sql
        execSync(`sqlite3 ${DB_PATH} < ${SEED_FILE}`);

        console.log('Database initialized successfully.');
    } else {
        console.log('Database file already exists. Skipping initialization.');
    }
}

export default {
    getDb,
};