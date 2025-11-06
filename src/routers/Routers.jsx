import { Routes, Route, Navigate } from "react-router-dom";
import AuthenticationPage from "../pages/Authentication";
import VerifyEmail from "../components/VerifyEmail";

export default function SwitchRouters() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthenticationPage />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
