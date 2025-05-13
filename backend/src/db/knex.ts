import knex, { Knex } from 'knex';
import fs from 'fs';
import { dirname } from 'path';
import { execSync } from 'child_process';
import logger from '../logger';
import { env, isProduction, path } from '../env';

// Use different database files based on environment

let db: Knex | null = null;

export function getDb(): Knex {
    db ??= knex({
        client: 'sqlite3',
        connection: {
            filename: path.db,
        },
        useNullAsDefault: true,
    });
    return db;
}

export function initializeDatabase(): void {
    if (!fs.existsSync(path.db)) {
        logger.info(`Database file not found. Initializing ${env.nodeEnv} database...`);

        // Ensure the directory exists
        fs.mkdirSync(dirname(path.db), { recursive: true });

        // Run schema.sql
        execSync(`sqlite3 ${path.db} < ${path.schema}`);

        // Only seed in development environment
        if (!isProduction) {
            execSync(`sqlite3 ${path.db} < ${path.seed}`);
            logger.info('Development database seeded successfully.');
        }

        logger.info(`${env.nodeEnv} database initialized successfully.`);
    } else {
        logger.info('Database file already exists. Skipping initialization.');
    }
}

export default {
    getDb,
};
