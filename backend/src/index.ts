import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { handleGetPost, handleGetTimeline } from "./handlers";
import { BlogError } from "./errors";
import { GetTimelineResponseSchema, GetPostResponseSchema, toJSON } from "@my-blog/common";
import logger from "./logger";
import { initializeDatabase } from './db/knex';

// Initialize the database before starting the server
initializeDatabase();

const app = express();
const PORT = Number(process.env.PORT ?? 5000);

// global middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// get all posts
app.get("/api/timeline", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await handleGetTimeline({});
        res.send(toJSON(response, GetTimelineResponseSchema));
    } catch (error) {
        next(error);
    }
});

// get a single post
app.get("/api/posts/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const response = await handleGetPost({ id });
        res.send(toJSON(response, GetPostResponseSchema));
    } catch (error) {
        next(error);
    }
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