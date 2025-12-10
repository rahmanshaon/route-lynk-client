import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label className={`swap swap-rotate ${className}`}>
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "route-lynk-dark"}
      />

      {/* sun icon */}
      <FaSun className="swap-off fill-current w-6 h-6 text-orange-400" />

      {/* moon icon */}
      <FaMoon className="swap-on fill-current w-6 h-6 text-blue-400" />
    </label>
  );
};

export default ThemeToggle;
