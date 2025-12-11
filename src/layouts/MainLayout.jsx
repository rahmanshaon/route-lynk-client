import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import Loader from "../components/Shared/Loader";

const MainLayout = () => {
  const location = useLocation();
  const [navigating, setNavigating] = useState(false);

  // --- Navigation Loading Logic ---
  useEffect(() => {
    setNavigating(true);

    const timer = setTimeout(() => {
      setNavigating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {navigating ? (
          <Loader
            fullScreen={false}
            className="min-h-[60vh]"
            message="Loading Page..."
          />
        ) : (
          <Outlet />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
