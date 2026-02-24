import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};

export default AdminRoutes;