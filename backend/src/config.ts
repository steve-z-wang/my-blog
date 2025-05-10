import { CorsOptions } from 'cors';

interface Config {
    port: number;
    cors: CorsOptions;
    rateLimit: {
        windowMs: number;
        max: number;
    };
}

export const config: Config = {
    port: Number(process.env.PORT ?? 8000),
    cors: {
        origin: process.env.CORS_ORIGIN ?? '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    },
};
