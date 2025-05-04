import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { BlogError } from './errors';
import logger from './logger';
import { config } from './config';
import { z } from 'zod';
import crypto from 'crypto';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface RouteDefinition<TReq, TRes> {
    method: HttpMethod;
    path: string;
    handler: (request: TReq) => Promise<TRes>;
    requestSchema: z.ZodType<TReq>;
    responseSchema: z.ZodType<TRes>;
    status?: number;
}

export class AppBuilder {
    private readonly app: Express;
    private routes: RouteDefinition<any, any>[] = [];

    constructor() {
        this.app = express();
        this.setupMiddleware();
    }

    private setupMiddleware() {
        // Security middleware
        this.app.use(helmet());
        this.app.use(cors(config.cors));
        this.app.use(rateLimit(config.rateLimit));

        // Global middleware
        this.app.use(express.json());
        this.app.use(morgan("dev"));
    }

    public addRoute<TReq, TRes>(definition: RouteDefinition<TReq, TRes>) {
        this.routes.push(definition);
        return this;
    }

    private setupRoutes() {
        this.routes.forEach(route => {
            this.app[route.method](route.path, async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const requestId = crypto.randomUUID();
                    // Combine request data based on method
                    const requestData = route.method === 'get' 
                        ? { ...req.params, ...req.query }
                        : { ...req.params, ...req.body };

                    logger.info({
                        requestId,
                        type: 'request',
                        method: route.method,
                        path: route.path,
                        data: requestData
                    });

                    // Parse and validate request
                    const validatedRequest = route.requestSchema.parse(requestData);

                    // Execute handler
                    const response = await route.handler(validatedRequest);

                    // Validate response
                    const validatedResponse = route.responseSchema.parse(response);

                    logger.info({
                        requestId,
                        type: 'response',
                        method: route.method,
                        path: route.path,
                        status: route.status ?? 200,
                        data: validatedResponse
                    });

                    // Send response
                    res.status(route.status ?? 200).json(validatedResponse);
                } catch (error) {
                    next(error);
                }
            });
        });

        // 404 handler
        this.app.use((_req, res) => {
            res.status(404).json({ error: "Not found" });
        });

        // Error handler
        this.app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
            logger.error(err);

            if (err instanceof BlogError) {
                res.status(err.status).json({ error: err.message });
            } else if (err instanceof Error) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }

    public start(port: number = config.port) {
        this.setupRoutes();

        const server = this.app.listen(port, () => {
            logger.info(`🚀  Server listening on http://localhost:${port}`);
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            logger.info('SIGTERM signal received. Closing HTTP server...');
            server.close(() => {
                logger.info('HTTP server closed');
                process.exit(0);
            });
        });

        return server;
    }
} 