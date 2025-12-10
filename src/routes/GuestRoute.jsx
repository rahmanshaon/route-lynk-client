import React from "react";
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  // If User is Logged In, Redirect to Home
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If User is NOT Logged In, show the Page (Login/Register)
  return children;
};

export default GuestRoute;
