import React, { createContext, useContext, useState, useEffect } from "react";
import type { Post } from "@my-blog/common";
import { fetchPosts } from "../utils/api";

interface PostContextType {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refreshPosts: () => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);
export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      console.error("Failed to load posts:", err);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (error) {
    throw new Error(error);
  }

  return (
    <PostContext.Provider
      value={{ posts, loading, error, refreshPosts: loadPosts }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
}
