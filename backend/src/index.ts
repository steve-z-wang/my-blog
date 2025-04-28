import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { getPost, listPosts } from "./models/post";

const app = express();
const PORT = Number(process.env.PORT ?? 5000);

// global middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// get all posts
app.get("/api/posts", (_req: Request, res: Response) => {
    const posts = listPosts();
    res.json(posts);
});

// get a single post
app.get("/api/posts/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).json({ error: "Invalid post ID" });
        return;
    }
    const post = getPost(id); 
    if (!post) {
        res.status(404).json({ error: "Post not found" });
        return;
    }
    res.json(post);
});


// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: "Not found" })
});

// central error handler
app.use(
    (err: Error, _req: Request, res: Response, _next: NextFunction) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
);

app.listen(PORT, () =>
    console.log(`🚀  Server listening on http://localhost:${PORT}`)
);