import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Post } from '@my-blog/common';

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
        setPost(data.post); // Extract the `post` key from the response
        console.log('Fetched post data:', data); // Log the fetched data
      } catch (err) {
        console.error('Error fetching post:', err); // Log the error
        setError('Post not found');
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    console.log('Error state:', error); // Log error state
    return <p className="text-red-600">{error}</p>;
  }

  if (!post) {
    console.log('Post state is null, loading...'); // Log loading state
    return <p>Loading…</p>;
  }

  console.log('Rendering post:', post); // Log post state before rendering

  return (
    <div>
      <div className="flex flex-col lg:flex-row p-4 gap-3">
        <main className="flex-grow bg-white p-6 rounded-lg shadow-md">
          <article className="prose">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </article>
          <Link to="/" className="text-blue-600 hover:underline">← Back</Link>
        </main>
      </div>
    </div>
  );
}