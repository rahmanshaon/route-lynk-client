import React from "react";
import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <li>
      <NavLink
        to={address}
        end
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium
          ${
            isActive
              ? "bg-primary text-white shadow-md"
              : "text-gray-600 hover:bg-base-300 hover:text-primary"
          }`
        }
      >
        <Icon className="text-xl" />
        <span className="font-medium">{label}</span>
      </NavLink>
    </li>
  );
};

export default MenuItem;
