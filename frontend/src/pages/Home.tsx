import { useEffect, useState } from 'react';
import type { PostWithoutContent, GetTimelineResponse } from '@my-blog/common'; // Ensure the updated schema is used
import Timeline from '../components/Home/Timeline';
import Sidebar from '../components/Home/Sidebar';

export default function Home() {
  const [posts, setPosts] = useState<PostWithoutContent[]>([]);
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
    <div className="flex flex-col lg:flex-row p-4 gap-3">
      <main className="flex-grow bg-white p-6 rounded-lg shadow-md">
        <Timeline posts={posts} selectedTags={selectedTags} />
      </main>
      <aside className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md self-start">
        <Sidebar posts={posts} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
      </aside>
    </div>
  );
}
