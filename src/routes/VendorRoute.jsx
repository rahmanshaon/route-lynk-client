import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loader from "../components/Shared/Loader";

const VendorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loader fullScreen message="Verifying Vendor Access..." />;
  }

  if (user && role === "vendor") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default VendorRoute;
