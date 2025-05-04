import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Post } from '@my-blog/common';
import MarkdownRenderer from '../components/Post/MarkdownRenderer';

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
    <div className="container mx-auto px-4">
      <main className="bg-white mt-6 p-8 rounded-lg shadow-lg">
        <MarkdownRenderer content={post.content.replace(/\\n/g, '\n')} />
      </main>
      <div className="mt-6 text-center">
        <Link to="/" className="text-blue-500 hover:text-blue-700 font-medium">
          Back to Home
        </Link>
      </div>
    </div>
  );
}