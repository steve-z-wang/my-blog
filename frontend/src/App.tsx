import { Routes, Route } from 'react-router-dom';
import Post from './pages/Post';
import NavBar from './components/NavBar';
import About from './pages/About';
import Footer from './components/Footer';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">

      <NavBar />

      <main className="flex-grow">
        <div className="max-w-screen-lg mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}