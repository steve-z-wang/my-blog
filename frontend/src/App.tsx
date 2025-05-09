import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import About from "./pages/About";
import PostPage from "./pages/post/Post";
import Home from "./pages/Home";
import { NotificationProvider } from "./components/ui/Notification";
import { useEffect, useState } from "react";
import type { ListPostsResponse, Post } from "@my-blog/common";
import { BackgroundProvider } from "./context/BackgroundContext";
import Archive from "./pages/Archive";
import Tags from "./pages/Tags";
import Tag from "./pages/Tag";

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data: ListPostsResponse = await response.json();
        setPosts(data.posts);
      } catch {
        setError("Failed to load posts");
      }
    };
    fetchPosts();
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;

  if (!posts.length) return <p>Loading...</p>;

  return (
    <BackgroundProvider>
      <NotificationProvider>
        <div className="flex flex-col min-h-screen">
          <NavBar />

          <main className="flex-grow">
            <div className="max-w-screen-lg mx-auto">
              <Routes>
                <Route path="/" element={<Home posts={posts} />} />
                <Route path="/posts/:id" element={<PostPage />} />
                <Route path="/archive" element={<Archive posts={posts} />} />
                <Route path="/tags" element={<Tags posts={posts} />} />
                <Route path="/tags/:tag" element={<Tag posts={posts}/>} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </main>

          <Footer />
        </div>
      </NotificationProvider>
    </BackgroundProvider>
  );
}
