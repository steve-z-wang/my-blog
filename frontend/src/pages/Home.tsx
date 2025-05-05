import { useEffect, useState } from 'react';
import type { Post, GetTimelineResponse } from '@my-blog/common'; // Ensure the updated schema is used
import Timeline from '../components/Home/Timeline';
import Sidebar from '../components/Home/Sidebar';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/timeline');
        if (!response.ok) throw new Error('Failed to fetch posts');

        const data: GetTimelineResponse = await response.json();
        setPosts(data.posts);
      } catch {
        setError('Failed to load posts');
      }
    };
    fetchPosts();
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="content-container flex flex-col lg:flex-row gap-4">

      {/* timeline */}
      <main className="flex-grow content-card">
        <Timeline posts={posts} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      </main>

      {/* sidebar */}
      <aside className="w-full lg:w-1/3 content-card self-start">
        <Sidebar posts={posts} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      </aside>

    </div>
  );
}
