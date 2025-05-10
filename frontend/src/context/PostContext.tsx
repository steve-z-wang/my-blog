import React, { createContext, useContext, useState, useEffect } from "react";
import type { Post, ListPostsResponse } from "@my-blog/common";

interface PostContextType {
  posts: Post[];
  loading: boolean;
  getPost: (id: string) => Promise<Post>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data: ListPostsResponse = await response.json();
        setPosts(data.posts);
      } catch (err) {
        throw new Error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getPost = async (id: string): Promise<Post> => {
    const response = await fetch(`/api/posts/${id}`);
    if (!response.ok) throw new Error("Failed to fetch post");
    const data = await response.json();
    return data.post;
  };

  return (
    <PostContext.Provider value={{ posts, loading, getPost }}>
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