import React from "react";
import {
  FaUser,
  FaHistory,
  FaTicketAlt,
  FaHome,
  FaUsers,
  FaChartLine,
  FaPlusCircle,
  FaListAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import Logo from "../../Shared/Logo";
import MenuItem from "./MenuItem";
import ThemeToggle from "../../Shared/ThemeToggle";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [role] = useRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className="w-72 min-h-full bg-base-100 border-r border-base-200 flex flex-col shadow-2xl z-50">
      {/* --- HEADER --- */}
      <div className="pt-8 pb-6 border-b border-base-200/60 flex flex-col items-center gap-3 bg-base-100/50 backdrop-blur-sm">
        <div className="scale-110">
          <Logo size="md" showText={true} />
        </div>

        {/* Role Badge */}
        <div
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border
          ${
            role === "fraud"
              ? "bg-error/10 text-error border-error/20"
              : "bg-primary/10 text-primary border-primary/20"
          }`}
        >
          {role === "fraud"
            ? "Account Suspended"
            : `${role || "User"} Dashboard`}
        </div>
      </div>

      {/* --- MENU CONTENT --- */}
      <div className="flex-1 overflow-y-auto py-6 px-1 custom-scrollbar">
        <ul className="menu gap-0.5 p-0 text-base-content">
          {/* USER ROUTES */}
          {role === "user" && (
            <>
              <MenuItem
                label="My Profile"
                address="/dashboard/profile"
                icon={FaUser}
              />
              <MenuItem
                label="My Bookings"
                address="/dashboard/my-bookings"
                icon={FaTicketAlt}
              />
              <MenuItem
                label="Transactions"
                address="/dashboard/history"
                icon={FaHistory}
              />
            </>
          )}

          {/* VENDOR ROUTES */}
          {role === "vendor" && (
            <>
              <MenuItem
                label="Vendor Profile"
                address="/dashboard/profile"
                icon={FaUser}
              />
              <MenuItem
                label="Add Ticket"
                address="/dashboard/add-ticket"
                icon={FaPlusCircle}
              />
              <MenuItem
                label="My Tickets"
                address="/dashboard/my-added-tickets"
                icon={FaListAlt}
              />
              <MenuItem
                label="Bookings"
                address="/dashboard/bookings"
                icon={FaTicketAlt}
              />
              <MenuItem
                label="Revenue"
                address="/dashboard/revenue"
                icon={FaChartLine}
              />
            </>
          )}

          {/* ADMIN ROUTES */}
          {role === "admin" && (
            <>
              <MenuItem
                label="Admin Profile"
                address="/dashboard/profile"
                icon={FaUser}
              />
              <MenuItem
                label="Manage Tickets"
                address="/dashboard/manage-tickets"
                icon={FaTicketAlt}
              />
              <MenuItem
                label="Manage Users"
                address="/dashboard/manage-users"
                icon={FaUsers}
              />
              <MenuItem
                label="Advertise"
                address="/dashboard/advertise"
                icon={FaListAlt}
              />
            </>
          )}

          {/* DIVIDER */}
          {role !== "fraud" && (
            <div className="px-4 py-2">
              <div className="h-px bg-base-200"></div>
            </div>
          )}

          {/* SHARED ROUTES */}
          <MenuItem label="Home" address="/" icon={FaHome} />
        </ul>
      </div>

      {/* --- FOOTER --- */}
      <div className="p-5 border-t border-base-200 bg-base-50/50">
        <div className="flex items-center gap-3 mb-4">
          {/* Theme Toggle */}
          <div>
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-base-100 border border-base-200 shadow-sm hover:shadow-md hover:bg-base-200 transition-all cursor-pointer">
              <ThemeToggle />
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-error/10 text-error border border-error/20 hover:bg-error hover:text-white hover:shadow-lg hover:shadow-error/30 transition-all duration-300 font-semibold group"
          >
            <FaSignOutAlt className="text-lg group-hover:rotate-180 transition-transform duration-300" />
            <span>Logout</span>
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-[10px] font-bold tracking-widest text-base-content/30 uppercase">
            © {new Date().getFullYear()} RouteLynk
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
