import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import "dotenv/config";
import { handleGetPost, handleGetTimeline, handleSubscribeByEmail, handleUnsubscribeByEmail, handleGetComments, handleCreateComment } from "./handlers";
import { BlogError } from "./errors";
import {
    GetTimelineResponseSchema,
    GetPostResponseSchema,
    SubscribeByEmailResponseSchema,
    UnsubscribeByEmailResponseSchema,
    GetCommentsResponseSchema,
    CreateCommentResponseSchema,
    toJSON
} from "@my-blog/common";
import logger from "./logger";
import { initializeDatabase } from './db/knex';
import { config } from './config';

// Initialize the database before starting the server
initializeDatabase();

const app = express();
const PORT = config.port;

// Security middleware
app.use(helmet());
app.use(cors(config.cors));
app.use(rateLimit(config.rateLimit));

// Global middleware
app.use(express.json());
app.use(morgan("dev"));

// Type definitions
type RouteMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
interface RouteConfig {
    method: RouteMethod;
    path: string;
    handler: (req: Request) => Promise<any>;
    responseSchema: any;
    status?: number;
}

const routes: RouteConfig[] = [
    {
        method: "get",
        path: "/api/timeline",
        handler: async (_req: Request) => handleGetTimeline({}),
        responseSchema: GetTimelineResponseSchema,
    },
    {
        method: "get",
        path: "/api/posts/:id",
        handler: async (req: Request) => handleGetPost({ id: req.params.id }),
        responseSchema: GetPostResponseSchema,
    },
    {
        method: "post",
        path: "/api/subscribe",
        handler: async (req: Request) => handleSubscribeByEmail({ email: req.body.email }),
        responseSchema: SubscribeByEmailResponseSchema,
        status: 201,
    },
    {
        method: "delete",
        path: "/api/unsubscribe",
        handler: async (req: Request) => handleUnsubscribeByEmail({ email: req.body.email }),
        responseSchema: UnsubscribeByEmailResponseSchema,
        status: 200,
    },
    {
        method: "get",
        path: "/api/posts/:postId/comments",
        handler: async (req: Request) => handleGetComments({
            postId: req.params.postId,
        }),
        responseSchema: GetCommentsResponseSchema,
    },
    {
        method: "post",
        path: "/api/comments",
        handler: async (req: Request) => handleCreateComment({
            postId: req.body.postId,
            parentCommentId: req.body.parentCommentId,
            authorName: req.body.authorName,
            content: req.body.content
        }),
        responseSchema: CreateCommentResponseSchema,
        status: 201,
    },
];

// Register routes
routes.forEach(({ method, path, handler, responseSchema, status = 200 }) => {
    app[method](path, async (req: Request, res: Response) => {
        const response = await handler(req);
        res.status(status).send(toJSON(response, responseSchema));
    });
});

// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
});

// Central error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err);

    if (err instanceof BlogError) {
        res.status(err.status).json({ error: err.message });
    } else if (err instanceof Error) {
        res.status(500).json({ error: err.message });
    } else {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Graceful shutdown
const server = app.listen(PORT, () =>
    logger.info(`🚀  Server listening on http://localhost:${PORT}`)
);

process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received. Closing HTTP server...');
    server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
    });
});