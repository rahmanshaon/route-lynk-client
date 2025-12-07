import React from "react";
import { HiMenu } from "react-icons/hi";
import { Link, NavLink } from "react-router";
import CustomNavLink from "./CustomNavLink";
import Logo from "./Logo";

const Navbar = () => {
  const user = null;

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
              {!user && (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/login"
                    className="btn btn-sm btn-ghost border-gray-300"
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
          {user ? (
            <div className="btn btn-ghost">User Profile</div>
          ) : (
            // Desktop Login/Register Buttons
            <div className="hidden md:flex gap-2">
              <NavLink to="/login" className="btn btn-ghost font-semibold">
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
