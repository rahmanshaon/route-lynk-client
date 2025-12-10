import React from "react";
import { FaUserShield, FaUserTie, FaBan } from "react-icons/fa";

const UserActionButtons = ({
  user,
  currentUser,
  onPromote,
  onFraud,
  isMobile = false,
}) => {
  const isCurrentUser = currentUser?.email === user.email;
  const isAdmin = user.role === "admin";

  if (isCurrentUser || isAdmin) {
    return (
      <div className="flex justify-center w-full">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-base-200/50 text-base-content/40 border border-base-300 border-dashed select-none cursor-not-allowed whitespace-nowrap">
          No Action Required
        </span>
      </div>
    );
  }

  // Banned
  if (user.role === "fraud") {
    return (
      <div className="flex justify-center w-full">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-error/10 text-error border border-error/20 tracking-wide shadow-sm whitespace-nowrap">
          <FaBan className="text-sm" /> BANNED
        </span>
      </div>
    );
  }

  // ACTIONS
  const containerClass = isMobile
    ? "grid grid-cols-1 gap-2 w-full"
    : "flex flex-wrap justify-center gap-2 w-full min-w-[140px]";

  const btnSize = isMobile ? "btn-sm w-full" : "btn-xs";

  return (
    <div className={containerClass}>
      {/* Make Vendor */}
      {user.role === "user" && (
        <button
          onClick={() => onPromote(user, "vendor")}
          className={`btn ${btnSize} btn-outline btn-secondary gap-1.5 whitespace-nowrap`}
        >
          <FaUserTie /> Make Vendor
        </button>
      )}

      {/* Make Admin */}
      {user.role !== "admin" && (
        <button
          onClick={() => onPromote(user, "admin")}
          className={`btn ${btnSize} btn-outline btn-primary gap-1.5 whitespace-nowrap`}
        >
          <FaUserShield /> Make Admin
        </button>
      )}

      {/* Mark Fraud */}
      {user.role === "vendor" && (
        <button
          onClick={() => onFraud(user)}
          className={`btn ${btnSize} btn-error text-white gap-1.5 whitespace-nowrap`}
        >
          <FaBan /> Mark Fraud
        </button>
      )}
    </div>
  );
};

export default UserActionButtons;
