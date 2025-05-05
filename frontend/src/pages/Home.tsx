import { useEffect, useState } from 'react';
import type { Post, GetTimelineResponse, DateFilter } from '@my-blog/common'; // Ensure the updated schema is used
import Timeline from '../components/Home/Timeline';
import Sidebar from '../components/Home/Sidebar';
import PageTransition from '../components/PageTransition';

interface DateFilter {
  year: string;
  month: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateFilter | null>(null);

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
    <PageTransition>
      <div className="content-container flex flex-col lg:flex-row gap-4">

        {/* timeline */}
        <main className="flex-grow content-card">
          <Timeline 
            posts={posts} 
            selectedTags={selectedTags} 
            selectedDate={selectedDate}
            setSelectedTags={setSelectedTags} 
          />
        </main>

        {/* sidebar */}
        <aside className="w-full lg:w-1/3 content-card self-start">
          <Sidebar 
            posts={posts} 
            selectedTags={selectedTags} 
            setSelectedTags={setSelectedTags}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </aside>

      </div>
    </PageTransition>
  );
}
