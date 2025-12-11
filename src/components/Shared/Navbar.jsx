import React from "react";
import { HiMenu } from "react-icons/hi";
import { FaThLarge, FaSignOutAlt } from "react-icons/fa"; // Removed FaUserCircle
import { Link, NavLink, useNavigate } from "react-router";
import CustomNavLink from "./CustomNavLink";
import Logo from "./Logo";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((err) => toast.error(err));
  };

  // Main Navigation Links
  const links = [
    { path: "/", label: "Home" },
    { path: "/all-tickets", label: "All Tickets" },
    { path: "/about", label: "About Us" },
  ];

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <nav className="navbar container mx-auto px-4">
        {/* --- Left Side: Mobile Dropdown & Logo --- */}
        <div className="navbar-start">
          <div className="dropdown">
            {/* Mobile Menu Button */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden mr-2"
            >
              <HiMenu className="h-6 w-6" />
            </div>

            {/* Mobile Dropdown Content */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-lg bg-base-100 rounded-box w-52 gap-2 border border-base-200"
            >
              <CustomNavLink links={links} />

              <div className="divider my-1"></div>

              {/* Mobile Auth Buttons */}
              {loading ? (
                <li className="flex justify-center items-center py-2">
                  <span className="loading loading-spinner text-primary"></span>
                </li>
              ) : user ? (
                <>
                  <li className="menu-title px-4 py-1 text-gray-500 text-xs uppercase font-bold">
                    {user.displayName}
                  </li>
                  <li>
                    <Link to="/dashboard" className="flex gap-2">
                      <FaThLarge /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-error hover:bg-error/10 flex gap-2"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <div className="flex flex-col gap-2 p-1">
                  <Link
                    to="/login"
                    className="btn btn-sm btn-ghost border-gray-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-sm btn-gradient text-white"
                  >
                    Register
                  </Link>
                </div>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Logo size="md" />
        </div>

        {/* --- Center: Desktop Menu --- */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4 font-medium">
            <CustomNavLink links={links} />
          </ul>
        </div>

        {/* --- Right Side: Buttons --- */}
        <div className="navbar-end gap-3">
          {/* Theme Toggle (Always Visible) */}
          <ThemeToggle className="mr-1" />

          {loading ? (
            // --- Desktop Loading State ---
            <span className="loading loading-bars loading-md text-primary"></span>
          ) : user ? (
            // --- Logged In View: User Dropdown ---
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2 transition-all hover:scale-105"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={user.photoURL || "https://i.ibb.co/wZQG7SwS/user.png"}
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-xl bg-base-100 rounded-xl w-56 border border-base-200"
              >
                {/* Dropdown Header */}
                <li className="menu-title px-4 py-3 border-b border-base-200 mb-2">
                  <span className="block font-bold text-base-content text-sm truncate">
                    {user.displayName}
                  </span>
                  <span className="block text-xs font-normal text-gray-400 truncate">
                    {user.email}
                  </span>
                </li>

                {/* Dropdown Links */}
                <li>
                  <Link to="/dashboard" className="py-3 font-medium">
                    <FaThLarge className="text-primary" /> Dashboard
                  </Link>
                </li>

                <div className="divider my-1"></div>

                {/* Logout */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="py-3 font-bold text-error hover:bg-error/10"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // --- Logged Out View: Login/Register Buttons ---
            <div className="hidden md:flex gap-3">
              <NavLink to="/login" className="btn btn-gradient px-6 font-bold">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-gradient px-6 font-bold"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
