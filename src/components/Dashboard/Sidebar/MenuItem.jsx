import React from "react";
import { NavLink } from "react-router";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <li>
      <NavLink
        to={address}
        end
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium mx-2 mb-1
          ${
            isActive
              ? "bg-primary text-white shadow-lg shadow-primary/30 translate-x-1"
              : "text-base-content/70 hover:bg-base-200 hover:text-base-content hover:pl-6"
          }`
        }
      >
        <span className="text-xl">
          <Icon />
        </span>
        <span className="font-medium tracking-wide text-sm">{label}</span>
      </NavLink>
    </li>
  );
};

export default MenuItem;
