import { useState, useRef } from "react";
import type { Comment } from "@my-blog/common";
import Button from "../common/Button";
import Input from "../common/Input";
import Form from "../common/Form";
import { useNotification } from "../common/Notification";

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

  // Get replies for a comment
  const getReplies = (parentId: number) => 
    comments.filter(comment => comment.parentCommentId === parentId);

  // Get latest activity timestamp
  const getLatestActivity = (comment: Comment): number => {
    const replies = getReplies(comment.commentId);
    return Math.max(
      comment.createdAt || 0,
      ...replies.map(reply => reply.createdAt || 0)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const authorName = authorNameRef.current?.value.trim() || '';
    const content = contentRef.current?.value.trim() || '';

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
      setComments(prev => [...prev, data.comment]);
      
      // Reset form
      if (authorNameRef.current) authorNameRef.current.value = '';
      if (contentRef.current) contentRef.current.value = '';
      setShowCommentForm(false);
      setReplyingTo(null);
      showNotification("Comment submitted successfully", "success");
    } catch (err) {
      showNotification(err instanceof Error ? err.message : "Failed to submit comment", "error");
    }
  };

  function CommentView({ comment, isTopLevel = false }: { comment: Comment; isTopLevel?: boolean }) {
    const replies = getReplies(comment.commentId);
    
    return (
      <div className={isTopLevel ? 'mb-4 pb-4 border-b border-gray-100' : 'ml-6 mb-4'}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm">
            <span className="font-medium">{comment.authorName}</span>
            <span className="text-gray-500 ml-2">
              {comment.createdAt ? new Date(comment.createdAt * 1000).toLocaleDateString() : 'Just now'}
            </span>
          </div>
          {isTopLevel && (
            <Button
              onClick={() => setReplyingTo(comment.commentId)}
              variant="text"
              size="sm"
            >
              Reply
            </Button>
          )}
        </div>

        <div className="text-gray-700">{comment.content}</div>

        {replyingTo === comment.commentId && (
          <div className="mt-3 ml-6">
            <CommentForm />
          </div>
        )}

        {replies.length > 0 && (
          <div className="mt-3">
            {replies.map(reply => (
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

  function CommentForm() {
    return (
      <Form
        onSubmit={handleSubmit}
        className="border-t border-gray-100 pt-4"
      >
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

        <div className="flex gap-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
          >
            Submit
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() => {
              setShowCommentForm(false);
              setReplyingTo(null);
              if (authorNameRef.current) authorNameRef.current.value = '';
              if (contentRef.current) contentRef.current.value = '';
            }}
          >
            Cancel
          </Button>
        </div>
      </Form>
    );
  }

  // Get and sort top-level comments by latest activity
  const topLevelComments = comments
    .filter(c => !c.parentCommentId)
    .sort((a, b) => getLatestActivity(b) - getLatestActivity(a));

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Comments</h2>
        {!showCommentForm && !replyingTo && (
          <Button
            onClick={() => setShowCommentForm(true)}
            variant="text"
            size="sm"
          >
            Add Comment
          </Button>
        )}
      </div>

      {showCommentForm && !replyingTo && (
        <div className="mb-6">
          <CommentForm />
        </div>
      )}

      <div>
        {topLevelComments.map(comment => (
          <CommentView
            key={comment.commentId}
            comment={comment}
            isTopLevel={true}
          />
        ))}
      </div>
    </div>
  );
}
