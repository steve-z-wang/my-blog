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

export function PostList() {
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
    <>
      <ul>
        {posts.map((post) => (
          <PostItem key={post.post_id} post={post} />
        ))}
      </ul>
    </>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-gray-100">
      {/* Main Content */}
      <main className="flex-grow bg-white p-6 rounded-lg shadow-md">
        <PostList />
      </main>

      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Filter</h2>
        {/* Filter by Date */}
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2">By Date</h3>
          <input
            type="date"
            className="w-full p-2 border rounded-md"
            onChange={(e) => console.log('Filter by date:', e.target.value)}
          />
        </div>
        {/* Filter by Tags */}
        <div>
          <h3 className="text-md font-semibold mb-2">By Tags</h3>
          <ul className="space-y-2">
            {['React', 'JavaScript', 'CSS'].map((tag) => (
              <li key={tag}>
                <button
                  className="w-full text-left p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={() => console.log('Filter by tag:', tag)}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}