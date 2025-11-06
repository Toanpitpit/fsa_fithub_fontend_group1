import { Routes, Route, Navigate } from "react-router-dom";
import AuthenticationPage from "../pages/Authentication";
import VerifyEmail from "../components/VerifyEmail";
import HomePage from "../pages/HomePage";

export default function SwitchRouters() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthenticationPage />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
