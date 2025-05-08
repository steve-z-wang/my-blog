import { Routes, Route } from "react-router-dom";
import Post from "./pages/post/Post";
import NavBar from "./components/layout/NavBar";
import About from "./pages/About";
import Footer from "./components/layout/Footer";
import Home from "./pages/home/Home";
import { NotificationProvider } from "./components/ui/Notification";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <div className="flex flex-col min-h-screen">
          <NavBar />

          <main className="flex-grow">
            <div className="max-w-screen-lg mx-auto">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ErrorBoundary>
                      <Home />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/posts/:id"
                  element={
                    <ErrorBoundary>
                      <Post />
                    </ErrorBoundary>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <ErrorBoundary>
                      <About />
                    </ErrorBoundary>
                  }
                />
              </Routes>
            </div>
          </main>

          <Footer />
        </div>
      </NotificationProvider>
    </ErrorBoundary>
  );
}
