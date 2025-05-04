import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Post } from '@my-blog/common';
import ReactMarkdown from 'react-markdown';
import CommentSection from '../components/Post/CommentSection';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log('Fetching post with ID:', id);
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) throw new Error('Failed to fetch post');
        const data = await response.json();
        setPost(data.post);
        console.log('Fetched post data:', data);
      } catch (err) {
        console.error('Error fetching post:', err); // Log the error
        setError('Post not found');
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!post) {
    return <></>; 
  }

  return (
    <div className="content-container">
      <main className="content-card">
        <div className="prose prose-lg prose-slate max-w-none">
          <ReactMarkdown>
            {post.content.replace(/\\n/g, '\n')}
          </ReactMarkdown>
        </div>
        {id && <CommentSection postId={id} />}
        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-500 hover:text-blue-700 font-medium">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}