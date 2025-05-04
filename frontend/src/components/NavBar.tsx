import { NavLink } from 'react-router-dom';

export default function NavBar() {

  const getLinkClass = (isActive: boolean) =>
    isActive ? "text-blue-600 font-bold" : "hover:text-blue-600";

  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-2">

        <h1 className="text-2xl text-gray-900">
          Steve Wang's Blog
        </h1>

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