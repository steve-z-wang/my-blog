import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Post } from "@my-blog/common";
import ReactMarkdown from "react-markdown";
import CommentSection from "./CommentSection";
import PageTransition from "../../components/layout/PageTransition";
import { Section, Page } from "frontend/src/components";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Fetching post with ID:", id);
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) throw new Error("Failed to fetch post");
        const data = await response.json();
        console.log("Fetched post data:", data);
        setPost(data.post);
      } catch (err) {
        console.error("Error fetching post:", err); // Log the error
        setError("Post not found");
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return (
      <PageTransition>
        <p className="text-red-600">{error}</p>
      </PageTransition>
    );
  }

  if (!post) {
    return <></>;
  }

  return (
    <Page>
      {/* Article */}
      <Section className="prose max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </Section>

      {/* Comment */}
      <Section>
        {id && (
          <CommentSection postId={post.postId} comments={post.comments ?? []} />
        )}
      </Section>

      {/* Subscribe */}
      <Section className="text-center">
        <p>
          Like this post?{" "}
          <Link to="/subscribe" className="font-medium underline">
            Subscribe for more
          </Link>
          .
        </p>
      </Section>

      {/* Back to Home */}
      <Section className="text-center">
        <Link to="/" className="text-muted font-medium">
          Back to Home
        </Link>
      </Section>
    </Page>
  );
}
