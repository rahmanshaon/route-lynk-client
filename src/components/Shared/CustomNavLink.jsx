import React from "react";
import { NavLink } from "react-router";

const CustomNavLink = ({ links, variant = "gradient", className = "" }) => {
  // Gradient active link style
  const gradientActiveStyle = {
    background:
      "linear-gradient(135deg, #0052cc 0%, #2563eb 40%, #00b4d8 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    borderImage:
      "linear-gradient(135deg, #0052cc 0%, #2563eb 40%, #00b4d8 100%) 1",
    borderBottom: "2px solid",
    paddingBottom: "4px",
    fontWeight: 600,
  };

  // White active link style
  const whiteActiveStyle = {
    color: "#ffffff",
    borderBottom: "2px solid #ffffff",
    paddingBottom: "4px",
    borderRadius: 0,
    fontWeight: 600,
  };

  // Choose the active style based on the variant prop
  const activeLinkStyle =
    variant === "white" ? whiteActiveStyle : gradientActiveStyle;

  return (
    <>
      {links.map((link) => (
        <li className={`font-medium ${className}`} key={link.path}>
          <NavLink
            to={link.path}
            style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </>
  );
};

export default CustomNavLink;
