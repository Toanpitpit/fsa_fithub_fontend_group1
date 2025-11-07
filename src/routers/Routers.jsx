import { Routes, Route, Navigate } from "react-router-dom";
import AuthenticationPage from "../pages/Authentication";
import VerifyEmail from "../components/VerifyEmail";
import ViewProfile from "../pages/ViewProfilePage";
import ProfileComplete from "../components/profile";
import Sidebar from "../components/sidebar";
import HomePage from "../pages/HomePage";

export default function SwitchRouters() {
  return (
    
    <Routes>

      <Route path="/auth" element={<AuthenticationPage />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/admin-dashboard" element={<Sidebar />} />
      <Route path="/profile/:id" element={<ViewProfile />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
