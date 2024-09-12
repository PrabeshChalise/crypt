import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouteAdmin = ({ children }) => {
  const adminId = localStorage.getItem("adminId");

  // If no adminId in localStorage, redirect to login page
  if (!adminId) {
    return <Navigate to="/admin/login" />;
  }

  // If adminId exists, render the children components (admin routes)
  return children;
};

export default PrivateRouteAdmin;
