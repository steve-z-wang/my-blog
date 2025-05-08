import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { buttonClass } from "../../styles/buttonClass";

interface NavLinkStyledProps extends NavLinkProps {
  fullWidth?: boolean;
}

const NavLinkStyled: React.FC<NavLinkStyledProps> = ({
  fullWidth,
  ...props
}) => (
  <NavLink
    {...props}
    className={({ isActive }) =>
      buttonClass({
        fullWidth,
      }) + (isActive ? "text-primary" : "")
    }
  ></NavLink>
);

export default NavLinkStyled;
