import { useState, useEffect } from 'react';
import type { Comment } from '@my-blog/common';

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ authorName: '', content: '', parentId: null as string | null });
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}/comments`);
        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        setComments(data.comments);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments');
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          authorName: newComment.authorName,
          content: newComment.content,
          parentId: newComment.parentId,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit comment');
      
      const data = await response.json();
      setComments([...comments, data.comment]);
      setNewComment({ authorName: '', content: '', parentId: null });
      setReplyingTo(null);
      setShowCommentForm(false);
    } catch (err) {
      console.error('Error submitting comment:', err);
      setError('Failed to submit comment');
    }
  };

  // Helper to get replies for a comment
  function getReplies(parentId: string) {
    return comments.filter((c) => c.parentId === parentId);
  }

  // Only top-level comments (no parentId)
  const topLevelComments = comments.filter((c) => !c.parentId);

  function SubmitCommentForm() {
    return (
      <form onSubmit={handleSubmit} className="mb-8">

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="authorName"
            value={newComment.authorName}
            onChange={(e) => setNewComment({ ...newComment, authorName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            id="content"
            value={newComment.content}
            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>

        {/* Submit */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Submit Comment
          </button>
          <button
            type="button"
            onClick={() => {
              setShowCommentForm(false);
              setReplyingTo(null);
              setNewComment({ authorName: '', content: '', parentId: null });
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    )
  }

  function Comment({ comment, replyingTo, setReplyingTo }: { comment: Comment, replyingTo: string | null, setReplyingTo: (id: string | null) => void }) {
    // Prevent self-referencing replies
    const replies = getReplies(comment.id).filter(reply => reply.id !== comment.id);
    return (
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center mb-2">
          <span className="font-semibold">{comment.author_name}</span>
          <span className="text-gray-500 text-sm ml-2">
            {new Date(comment.created_at * 1000).toLocaleDateString()}
          </span>
          <button
            onClick={() => {
              setReplyingTo(comment.id);
              setNewComment({ ...newComment, parentId: comment.id });
              setShowCommentForm(false);
            }}
            className="ml-4 text-blue-500 hover:text-blue-700 text-sm"
          >
            Reply
          </button>
        </div>
        <p className="text-gray-700">{comment.content}</p>
        {replyingTo === comment.id && (
          <div className="ml-8 mt-4">
            <SubmitCommentForm />
          </div>
        )}
        {replies.length > 0 && (
          <div className="ml-8 mt-4">
            {replies.map((reply: Comment) => (
              <Comment key={reply.id} comment={reply} replyingTo={replyingTo} setReplyingTo={setReplyingTo} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Comments</h2>
        {!showCommentForm && !replyingTo && (
          <button
            onClick={() => {
              setShowCommentForm(true);
              setReplyingTo(null);
              setNewComment({ authorName: '', content: '', parentId: null });
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Commene
          </button>
        )}
      </div>
      
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="space-y-4">
        {topLevelComments.map((comment) => (
          <Comment key={comment.id} comment={comment} replyingTo={replyingTo} setReplyingTo={setReplyingTo} />
        ))}
      </div>

      {showCommentForm && !replyingTo && <SubmitCommentForm />}
    </div>
  );
} 