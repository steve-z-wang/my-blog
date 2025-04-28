import { Routes, Route } from 'react-router-dom';
import PostsList from './pages/PostsList';
import PostDetail from './pages/PostDetail';
import NavBar from './components/NavBar';
import About from './pages/About';

export default function App() {
  return (
    <>
      <NavBar />

      <main className="container mx-auto p-6 bg-white mt-4 shadow-md">
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}