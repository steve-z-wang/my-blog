import knex, { Knex } from 'knex';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import logger from '../logger';

// Get the current environment
const NODE_ENV = process.env.NODE_ENV ?? 'development';
logger.info(`Current environment: ${NODE_ENV}`);

// Base directory for DB files (can be overridden by env)
const DB_DIR = process.env.DB_DIR ?? path.resolve(__dirname, '../../../db');
logger.info(`Database directory: ${DB_DIR}`);

// Use different database files based on environment
const DB_FILENAME = NODE_ENV === 'production' ? 'blog.prod.db' : 'blog.dev.db';
const DB_PATH = path.resolve(DB_DIR, DB_FILENAME);
const SCHEMA_FILE = path.resolve(DB_DIR, 'schema.sql');
const SEED_FILE = path.resolve(DB_DIR, 'seed.sql');

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
        logger.info(`Database file not found. Initializing ${NODE_ENV} database...`);

        // Ensure the directory exists
        fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

        // Run schema.sql
        execSync(`sqlite3 ${DB_PATH} < ${SCHEMA_FILE}`);

        // Only seed in development environment
        if (NODE_ENV !== 'production') {
            execSync(`sqlite3 ${DB_PATH} < ${SEED_FILE}`);
            logger.info('Development database seeded successfully.');
        }

        logger.info(`${NODE_ENV} database initialized successfully.`);
    } else {
        logger.info('Database file already exists. Skipping initialization.');
    }
}

export default {
    getDb,
};
