import React from "react";
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Shared/Loader";

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen />;
  }

  // If User is Logged In, Redirect to Home
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If User is NOT Logged In, show the Page (Login/Register)
  return children;
};

export default GuestRoute;
