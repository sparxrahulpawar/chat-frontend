import React from "react";
import { isAuthenticated } from "../routes/ProtectRoutes";
import { Navigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  // Check if the user is authenticated
  if (isAuthenticated()) {
    return <Navigate to="/chat" />;
  }
  return <>{children}</>;
};

export default AuthLayout;
