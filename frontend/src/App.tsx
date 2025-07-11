import { Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import About from "./pages/About";
import PostPage from "./pages/post/Post";
import Home from "./pages/Home";
import { NotificationProvider } from "./components/ui/Notification";
import { BackgroundProvider } from "./context/BackgroundContext";
import Archive from "./pages/Archive";
import Tags from "./pages/Tags";
import Tag from "./pages/Tag";
import Subscribe from "./pages/Subscribe";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import NotFound from "./pages/NotFound";
import { PostProvider } from "./context/PostContext";

export default function App() {
  return (
    <ErrorBoundary>
      <BackgroundProvider>
        <NotificationProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />

            <PostProvider>
              <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts/:id" element={<PostPage />} />
                    <Route path="/archive" element={<Archive />} />
                    <Route path="/tags" element={<Tags />} />
                    <Route path="/tags/:tag" element={<Tag />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/subscribe" element={<Subscribe />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
              </main>
            </PostProvider>

            <Footer />
          </div>
        </NotificationProvider>
      </BackgroundProvider>
    </ErrorBoundary>
  );
}
