import React from "react";
import { FaUserShield, FaUserTie, FaBan, FaUserCircle } from "react-icons/fa";

const UserActionButtons = ({ user, currentUser, onPromote, onFraud }) => {
  const isCurrentUser = currentUser?.email === user.email;

  // Prevent actions on the logged-in user
  if (isCurrentUser) {
    return (
      <div className="flex justify-center w-full">
        <div className="badge badge-lg bg-base-200 text-base-content/70 border-base-300 font-semibold gap-2 px-4 py-3 shadow-sm">
          <FaUserCircle className="text-lg" /> Current User
        </div>
      </div>
    );
  }

  // Display if user is already banned
  if (user.role === "fraud") {
    return (
      <div className="flex justify-center w-full">
        <span className="badge badge-error text-white font-bold gap-2 p-3 shadow-md">
          <FaBan /> BANNED
        </span>
      </div>
    );
  }

  // Display available control buttons
  return (
    <div className="flex gap-3 justify-center items-center w-full">
      {/* Make Vendor */}
      {user.role === "user" && (
        <div className="tooltip tooltip-bottom" data-tip="Promote to Vendor">
          <button
            onClick={() => onPromote(user, "vendor")}
            className="btn btn-sm btn-circle bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
          >
            <FaUserTie size={16} />
          </button>
        </div>
      )}

      {/* Make Admin */}
      {user.role !== "admin" && (
        <div className="tooltip tooltip-bottom" data-tip="Promote to Admin">
          <button
            onClick={() => onPromote(user, "admin")}
            className="btn btn-sm btn-circle bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
          >
            <FaUserShield size={16} />
          </button>
        </div>
      )}

      {/* Mark Fraud (Vendors only) */}
      {user.role === "vendor" && (
        <div className="tooltip tooltip-bottom" data-tip="Mark as Fraud">
          <button
            onClick={() => onFraud(user)}
            className="btn btn-sm btn-circle bg-error/10 text-error border-error/20 hover:bg-error hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
          >
            <FaBan size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserActionButtons;
