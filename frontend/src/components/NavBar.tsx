import { NavLink } from 'react-router-dom';

export default function NavBar() {

  const getLinkClass = (isActive: boolean) =>
    isActive ? "text-blue-600 font-bold" : "hover:text-blue-600";

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Blog Name */}
        <h1 className="text-xl font-bold text-gray-800">
          Steve Wang's Blog
        </h1>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => getLinkClass(isActive)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => getLinkClass(isActive)}
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}