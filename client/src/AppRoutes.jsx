import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import React, { Suspense } from "react";

// Public Pages
const LoginPage = React.lazy(() => import("./page/public/Login"));
const RegisterPage = React.lazy(() => import("./page/public/Register"));

// Private Pages - FIX THE PATH
const ProductPage = React.lazy(() => import("./page/private/Product"));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/product" element={<ProductPage />} />
        </Route>

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
