import { NavLink } from "react-router-dom";

const NavLinkStyled: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
}> = ({ to, children, className, ...props }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `text-lg sm:text-base font-medium ${className} ${
        isActive ? "underline font-semibold" : ""
      }`
    }
    {...props}
  >
    {children}
  </NavLink>
);

export default function NavBar() {
  return (
    <nav className="flex justify-center w-full p-4">
      <div className="w-full max-w-3xl flex items-center justify-between">

        {/* NavLinks */}
        <div>
          <ul className="flex space-x-6">
            <li>
              <NavLinkStyled to="/">Posts</NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled to="/tags">Tags</NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled to="/archive">Archive</NavLinkStyled>
            </li>
            <li>
              <NavLinkStyled to="/about">About</NavLinkStyled>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
