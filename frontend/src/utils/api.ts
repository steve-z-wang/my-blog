import { SubscribeByEmailRequestSchema, Post, ListPostsResponse, Comment } from "@my-blog/common";

export async function subscribeByEmail(email: string): Promise<void> {
  const request = { email };
  try {
    SubscribeByEmailRequestSchema.parse(request); // Validate request
  } catch (error) {
    throw new Error(
      "Invalid email format. Please enter a valid email address."
    );
  }

  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Subscription failed.");
  }
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("/api/posts");
  if (!response.ok) throw new Error("Failed to fetch posts");
  
  const data: ListPostsResponse = await response.json();
  return data.posts;
}

export async function getPost(id: string): Promise<Post> {
  const response = await fetch(`/api/posts/${id}`);
  if (!response.ok) throw new Error("Failed to fetch post");
  
  const data = await response.json();
  return data.post;
}

export async function createComment(
  postId: number, 
  authorName: string,
  content: string,
  parentId: number | null = null
): Promise<Comment> {
  const response = await fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postId,
      authorName,
      content,
      parentId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to submit comment");
  }

  const data = await response.json();
  return data.comment;
}
