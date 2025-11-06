import { Routes, Route, Navigate } from "react-router-dom";
import AuthenticationPage from "../pages/Authentication";
import VerifyEmail from "../components/VerifyEmail";
import ViewProfile from "../pages/ViewProfilePage";

export default function SwitchRouters() {
const user = localStorage.getItem("user");
  return (
    <Routes>
      <Route path="/auth" element={<AuthenticationPage />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/profile" element={<ViewProfile id={user.id} />}/>
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
