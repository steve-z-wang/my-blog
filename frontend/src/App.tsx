import { Routes, Route } from 'react-router-dom';
import Post from './pages/Post';
import NavBar from './components/NavBar';
import About from './pages/About';
import Footer from './components/Footer';
import Home from './pages/Home';
import { NotificationProvider } from './components/common/Notification';
import ErrorBoundary from './components/common/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <div className="flex flex-col min-h-screen">
          <NavBar />

          <main className="flex-grow">
            <div className="max-w-screen-lg mx-auto">
              <Routes>
                <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
                <Route path="/posts/:id" element={<ErrorBoundary><Post /></ErrorBoundary>} />
                <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
              </Routes>
            </div>
          </main>

          <Footer />
        </div>
      </NotificationProvider>
    </ErrorBoundary>
  );
}