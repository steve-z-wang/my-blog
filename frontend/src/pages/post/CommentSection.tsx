import { useState, useRef, useEffect } from "react";
import type { Comment } from "@my-blog/common";
import { Button, Input, Form, useNotification } from "frontend/src/components";

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
}

export default function CommentSection(props: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(props.comments);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { showNotification } = useNotification();

  const authorNameRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const commentFormRef = useRef<HTMLDivElement>(null);

  // Scroll when form appears
  useEffect(() => {
    if ((showCommentForm || replyingTo !== null) && commentFormRef.current) {
      // Scroll with a small delay to ensure DOM is updated
      setTimeout(() => {
        commentFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [showCommentForm, replyingTo]);

  // Get replies for a comment
  const getReplies = (parentId: number) =>
    comments.filter((comment) => comment.parentCommentId === parentId);

  // Get latest activity timestamp
  const getLatestActivity = (comment: Comment): number => {
    const replies = getReplies(comment.commentId);
    return Math.max(
      comment.createdAt || 0,
      ...replies.map((reply) => reply.createdAt || 0)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const authorName = authorNameRef.current?.value.trim() || "";
    const content = contentRef.current?.value.trim() || "";

    if (!authorName || !content) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: props.postId,
          authorName,
          content,
          parentCommentId: replyingTo,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit comment");
      }

      const data = await response.json();
      setComments((prev) => [...prev, data.comment]);

      // Reset form
      if (authorNameRef.current) authorNameRef.current.value = "";
      if (contentRef.current) contentRef.current.value = "";
      setShowCommentForm(false);
      setReplyingTo(null);
      showNotification("Comment submitted successfully", "success");
    } catch (err) {
      showNotification(
        err instanceof Error ? err.message : "Failed to submit comment",
        "error"
      );
    }
  };

  function CommentView({
    comment,
    isTopLevel = false,
  }: {
    comment: Comment;
    isTopLevel?: boolean;
  }) {
    const replies = getReplies(comment.commentId);

    return (
      <div className={isTopLevel ? "" : "ml-16"}>
        {/* Author, date, and reply button */}
        <div className="flex items-center gap-2">
          <span className="font-semibold">{comment.authorName}</span>

          <span className="text-muted text-sm">
            {comment.createdAt
              ? new Date(comment.createdAt * 1000).toLocaleDateString()
              : "Just now"}
          </span>

          {isTopLevel && (
            <button
              className="text-muted text-sm"
              onClick={() => setReplyingTo(comment.commentId)}
            >
              Reply
            </button>
          )}
        </div>

        {/* Comment content */}
        <div className="mt-2">{comment.content}</div>

        {/* Reply form */}
        {replyingTo === comment.commentId && (
          <div className="mt-8" ref={commentFormRef}>
            <CommentForm />
          </div>
        )}

        {/* Replies */}
          {replies.length > 0 && (
            <div className="mt-8 space-y-8">
              {replies.map((reply) => (
                <CommentView
                  key={reply.commentId}
                  comment={reply}
                  isTopLevel={false}
                />
              ))}
            </div>
          )}
      </div>
    );
  }

  const CommentForm = () => {
    return (
      <Form onSubmit={handleSubmit} className="border-t border-gray-100">
        <Input
          ref={authorNameRef}
          type="text"
          placeholder="Your name"
          required
        />

        <Input
          ref={contentRef}
          multiline
          rows={3}
          placeholder="Write a comment..."
          required
        />

        <div className="flex justify-end">
          <Button type="submit" width="24">
            Submit
          </Button>
          <Button
            width="24"
            className="ml-4"
            onClick={() => {
              setShowCommentForm(false);
              setReplyingTo(null);
              if (authorNameRef.current) authorNameRef.current.value = "";
              if (contentRef.current) contentRef.current.value = "";
            }}
          >
            Cancel
          </Button>
        </div>
      </Form>
    );
  };

  // Get and sort top-level comments by latest activity
  const topLevelComments = comments
    .filter((c) => !c.parentCommentId)
    .sort((a, b) => getLatestActivity(b) - getLatestActivity(a));

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Comments</h3>
        <button
          className="text-muted"
          onClick={() => {
            setReplyingTo(null);
            setShowCommentForm(true);
          }}
        >
          Add Comment
        </button>
      </div>

      {comments.length === 0 && !showCommentForm && (
        <div className="py-4 text-muted">No comments yet.</div>
      )}

      <div className="divide-y">

        {/* Reply form */}
        {showCommentForm && !replyingTo && (
          <div className="py-8" ref={commentFormRef}>
            <CommentForm />
          </div>
        )}

        {topLevelComments.map((comment) => (
          <div className="py-8" key={comment.commentId}>
            <CommentView comment={comment} isTopLevel={true} />
          </div>
        ))}
      </div>
    </div>
  );
}
