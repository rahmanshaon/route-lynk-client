import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Check local storage or default to light
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "route-lynk-light");

  useEffect(() => {
    // Save to Local Storage
    localStorage.setItem("theme", theme);
    
    // Apply to HTML tag
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "route-lynk-light" ? "route-lynk-dark" : "route-lynk-light"
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;