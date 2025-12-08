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
} from "react-icons/fa";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import Logo from "../../Shared/Logo";
import MenuItem from "./MenuItem";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [role] = useRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className="w-72 min-h-full bg-base-100 border-r border-base-200 flex flex-col shadow-xl">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-base-200 flex flex-col items-center gap-2">
        <Logo size="md" />
        <div className="badge badge-primary badge-outline capitalize mt-1 font-bold">
          {role || "User"} Dashboard
        </div>
      </div>

      {/* Sidebar Links */}
      <ul className="menu p-4 flex-1 gap-1">
        {/* --- USER ROUTES --- */}
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
              label="Transaction History"
              address="/dashboard/history"
              icon={FaHistory}
            />
          </>
        )}

        {/* --- VENDOR ROUTES --- */}
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
              label="Requested Bookings"
              address="/dashboard/bookings"
              icon={FaTicketAlt}
            />
            <MenuItem
              label="Revenue Overview"
              address="/dashboard/revenue"
              icon={FaChartLine}
            />
          </>
        )}

        {/* --- ADMIN ROUTES --- */}
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

        <div className="divider my-4"></div>

        {/* --- SHARED LINKS --- */}
        <MenuItem label="Home" address="/" icon={FaHome} />

        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-error hover:bg-error/10 font-medium transition-colors"
          >
            Logout
          </button>
        </li>
      </ul>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-base-200 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} RouteLynk</p>
      </div>
    </div>
  );
};

export default Sidebar;
