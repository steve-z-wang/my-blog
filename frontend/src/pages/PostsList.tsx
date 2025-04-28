import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '@my-blog/common';

function PostItem({ post }: { post: Post }) {
  return (
    <li key={post.post_id} className="pb-6 mb-12 border-b-4 border-gray-200">
      {/* Title */}
      <h2 className="text-lg font-bold">{post.title}</h2>
      <div className="border-t border-gray-300 my-2"></div> 

      {/* Post Metadata */}
      <p className="italic text-gray-500">
        by <span className="font-bold">Steve Wang</span> on{' '}
        <span className="font-bold">
          {new Date(post.publish_at * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>{' '}
        in{' '}
        {post.tags.map((tag, index) => (
          <span key={tag} className="font-bold">
            {tag}
            {index < post.tags.length - 1 && ', '}
          </span>
        ))}
      </p>

      {/* Post Content */}
      <p className="text-gray-500 pt-6">
        {post.content.length > 250 ? `${post.content.slice(0, 250)}...` : post.content}
      </p>

      {/* Read More Link */}
      <Link to={`/posts/${post.post_id}`} className="pt-6 text-blue-500 hover:underline">
        <p className="pt-3">Read more</p>
      </Link>
    </li>
  );
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/posts')
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then(setPosts)
      .catch(() => setErr('Failed to load posts'));
  }, []);

  if (err) return <p className="text-red-600">{err}</p>;
  if (!posts.length) return <p>No posts yet.</p>;

  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.post_id} post={post} />
      ))}
    </ul>
  );
}
