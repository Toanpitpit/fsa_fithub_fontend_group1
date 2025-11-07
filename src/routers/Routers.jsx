import { Routes, Route, Navigate } from "react-router-dom";
import AuthenticationPage from "../pages/Authentication";
import VerifyEmail from "../components/VerifyEmail";
import ViewProfile from "../pages/ViewProfilePage";
import AdminLayout from "../pages/AdminLayout";

export default function SwitchRouters() {
const user = localStorage.getItem("user");
  return (
    <Routes>
      <Route path="/auth" element={<AuthenticationPage />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/profile/:id" element={<ViewProfile/>}/>
      <Route path="*" element={<Navigate to="/auth" replace />} />
      <Route path="/admin-dashboard" element={<AdminLayout/>}/>
    </Routes>


  );
}
