import * as nodePath from 'path';
import dotenv from 'dotenv';

const projectRoot = nodePath.resolve(__dirname, '../../');
dotenv.config({ path: nodePath.resolve(__dirname, '../../.env') });

function getEnv(key: string): string {
    if (process.env[key] === undefined) {
        throw new Error(`Environment variable ${key} is not set!`);
    }

    const value = process.env[key] as string;
    console.log(`Environment variable ${key}: "${value}"`);
    return value;
}

export const env = {
    nodeEnv: getEnv('NODE_ENV'),
    port: Number(getEnv('API_PORT')),
    dbDir: getEnv('DB_DIR'),
    dbFile: getEnv('DB_NAME'),
    schemaFile: getEnv('SCHEMA_FILE'),
    seedFile: getEnv('SEED_FILE'),
};

export const isProduction = env.nodeEnv === 'production';
export const isDevelopment = env.nodeEnv === 'development';

export const path = {
    db: nodePath.resolve(projectRoot, env.dbDir, env.dbFile),
    schema: nodePath.resolve(projectRoot, env.dbDir, env.schemaFile),
    seed: nodePath.resolve(projectRoot, env.dbDir, env.seedFile),
};
