import React from "react";
import { HiMenu } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router";
import CustomNavLink from "./CustomNavLink";
import Logo from "./Logo";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  // Main Navigation Links
  const links = [
    { path: "/", label: "Home" },
    { path: "/all-tickets", label: "All Tickets" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <nav className="navbar container mx-auto px-4">
        {/* --- Left Side: Mobile Dropdown & Logo --- */}
        <div className="navbar-start">
          <div className="dropdown">
            {/* Mobile Menu Button */}
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <HiMenu className="h-6 w-6" />
            </div>

            {/* Mobile Dropdown Content */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 gap-2"
            >
              <CustomNavLink links={links} />

              <div className="divider my-2"></div>

              {/* Mobile Auth Buttons */}
              {loading ? (
                // Mobile Loading State
                <li className="flex justify-center items-center py-2">
                  <span className="loading loading-bars text-primary"></span>
                </li>
              ) : user ? (
                <>
                  <li className="font-bold px-4 py-2 bg-base-200 rounded-lg mb-2 truncate">
                    {user.displayName}
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn btn-sm btn-error text-white mt-2"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    className="btn btn-sm btn-gradient"
                  >
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-sm btn-gradient">
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
          <ul className="menu menu-horizontal px-1 space-x-2">
            <CustomNavLink links={links} />
          </ul>
        </div>

        {/* --- Right Side: Buttons --- */}
        <div className="navbar-end gap-2">
          {loading ? (
            // --- Desktop Loading State ---
            <span className="loading loading-bars loading-md text-primary"></span>
          ) : user ? (
            // --- Logged In View: User Profile Dropdown ---
            <div className="dropdown dropdown-end">
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.displayName || "User"}
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2"
                >
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user.photoURL || "https://i.ibb.co/wZQG7SwS/user.png"
                      }
                      alt="User"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="px-4 py-2 font-bold text-center border-b mb-2 truncate">
                  {user.displayName}
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error font-bold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // --- Logged Out View: Login/Register Buttons ---
            <div className="hidden md:flex gap-2">
              <NavLink to="/login" className="btn btn-gradient font-semibold">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-gradient font-semibold"
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
