import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Post } from '@my-blog/common';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject(r))
      .then(setPost)
      .catch(() => setErr('Post not found'));
  }, [id]);

  if (err) return <p className="text-red-600">{err}</p>;
  if (!post) return <p>Loading…</p>;

  return (
    <article className="prose">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to="/" className="text-blue-600 hover:underline">← Back</Link>
    </article>
  );
}