import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import PrivateLayout from "../components/PrivateLayout";
import React, { Suspense } from "react";

// Public Pages
const LoginPage = React.lazy(() => import("../page/public/Login"));
const RegisterPage = React.lazy(() => import("../page/public/Register"));

// Private Pages
const DashboardPage = React.lazy(() => import("../page/private/User/Dashboard"));
const ProfilePage = React.lazy(() => import("../page/private/User/Profile"));
const TeachSkillsPage = React.lazy(() => import("../page/private/User/TeachSkills"));
const LearnSkillsPage = React.lazy(() => import("../page/private/User/LearnSkills"));
const SkillRequestsPage = React.lazy(() => import("../page/private/User/SkillRequests"));
const MessagesPage = React.lazy(() => import("../page/private/User/Messages"));
const ReviewsPage = React.lazy(() => import("../page/private/User/Reviews"));
const SettingsPage = React.lazy(() => import("../page/private/User/Settings"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Private Routes with Sidebar + TopNav Layout */}
        <Route element={<PrivateRoutes />}>
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/teach" element={<TeachSkillsPage />} />
            <Route path="/learn" element={<LearnSkillsPage />} />
            <Route path="/requests" element={<SkillRequestsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;