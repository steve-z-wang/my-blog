import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-2 md:mb-0">
          <a
            href="https://github.com/steve-z-wang"
            className="mx-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/stevewang2000/"
            className="mx-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="mailto:stevewang.at.work@gmail.com"
            className="mx-2 hover:underline"
          >
            Email
          </a>
        </div>
        <div>
          <p className="text-sm">&copy; {new Date().getFullYear()} Steve Wang's Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}