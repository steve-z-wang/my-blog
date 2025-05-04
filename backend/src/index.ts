import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { handleGetPost, handleGetTimeline, handleSubscribeByEmail, handleUnsubscribeByEmail, handleGetComments, handleGetComment, handleCreateComment } from "./handlers";
import { BlogError } from "./errors";
import { GetTimelineResponseSchema, GetPostResponseSchema, toJSON, SubscribeByEmailResponseSchema, UnsubscribeByEmailResponseSchema, GetCommentsResponseSchema, GetCommentResponseSchema, CreateCommentResponseSchema } from "@my-blog/common";
import logger from "./logger";
import { initializeDatabase } from './db/knex';
import path from "path";

// Initialize the database before starting the server
initializeDatabase();

const app = express();
const PORT = Number(process.env.PORT ?? 8000);

// global middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const routes = [
    {
        method: "get",
        path: "/api/timeline",
        handler: async (_req: Request) => handleGetTimeline({}),
        schema: GetTimelineResponseSchema,
    },
    {
        method: "get",
        path: "/api/posts/:id",
        handler: async (req: Request) => handleGetPost({ id: req.params.id }),
        schema: GetPostResponseSchema,
    },
    {
        method: "post",
        path: "/api/subscribe",
        handler: async (req: Request) => handleSubscribeByEmail({ email: req.body.email }),
        schema: SubscribeByEmailResponseSchema,
        status: 201,
    },
    {
        method: "delete",
        path: "/api/unsubscribe",
        handler: async (req: Request) => handleUnsubscribeByEmail({ email: req.body.email }),
        schema: UnsubscribeByEmailResponseSchema,
        status: 200,
    },
    {
        method: "get",
        path: "/api/posts/:postId/comments",
        handler: async (req: Request) => handleGetComments({
            postId: req.params.postId,
            includeReplies: req.query.includeReplies === 'true'
        }),
        schema: GetCommentsResponseSchema,
    },
    {
        method: "get",
        path: "/api/comments/:commentId",
        handler: async (req: Request) => handleGetComment({
            commentId: Number(req.params.commentId),
            includeReplies: req.query.includeReplies === 'true'
        }),
        schema: GetCommentResponseSchema,
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
        schema: CreateCommentResponseSchema,
        status: 201,
    },
];

routes.forEach(({ method, path, handler, schema, status = 200 }) => {
    (app as any)[method](path, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await handler(req);
            res.status(status).send(toJSON(response, schema));
        } catch (error) {
            next(error);
        }
    });
});

// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
});

// central error handler
app.use(
    (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
        logger.error(err);

        if (err instanceof BlogError) {
            res.status(err.status).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

app.listen(PORT, () =>
    logger.info(`🚀  Server listening on http://localhost:${PORT}`)
);