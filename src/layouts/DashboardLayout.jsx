import React from "react";
import { Outlet } from "react-router";
import { HiMenuAlt2 } from "react-icons/hi";
import Logo from "../components/Shared/Logo";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open font-sans">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* --- Main Content Area --- */}
      {/* REMOVED: bg-base-100. It will now be transparent and show body's bg-base-200 */}
      <div className="drawer-content flex flex-col">
        
        {/* Mobile Header (Only visible on small screens) */}
        <div className="w-full navbar bg-base-100 border-b border-base-200 lg:hidden sticky top-0 z-50 shadow-sm">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <HiMenuAlt2 className="text-2xl" />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <Logo size="sm" />
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 md:p-10 min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* --- Sidebar Area --- */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;