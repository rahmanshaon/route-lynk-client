import React from "react";
import { Link } from "react-router"; // react-router v7
import logo from "../../assets/logo.png";

const Logo = ({ size = "md", direction = "row", showText = true }) => {
  // Size map based only on image + main text scaling
  const sizeMap = {
    sm: { img: "28px", text: "text-xl" },
    md: { img: "40px", text: "text-2xl" },
    lg: { img: "56px", text: "text-3xl" },
  };

  // Fallback to md if size is invalid
  const selected = sizeMap[size] || sizeMap["md"];
  const { img, text } = selected;

  return (
    <Link
      to="/"
      className={`flex ${
        direction === "col" ? "flex-col text-center" : "flex-row"
      } items-center gap-2 select-none transition-all duration-300`}
    >
      {/* Logo Image */}
      <img
        src={logo}
        alt="RouteLynk Logo"
        className="object-contain transition-all"
        style={{ width: img, height: "auto" }}
      />

      {/* Logo Text */}
      {showText && (
        <h1 
          className={`text-gradient font-extrabold ${text} whitespace-nowrap opacity-100 transition-opacity duration-300`}
        >
          RouteLynk
        </h1>
      )}
    </Link>
  );
};

export default Logo;