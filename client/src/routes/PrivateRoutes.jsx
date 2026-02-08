import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const token = localStorage.getItem("access_token");  // ✅ CHANGED: "token" → "access_token"
    
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;