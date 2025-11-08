import { Routes, Route, Navigate } from "react-router-dom";
import AuthenticationPage from "../pages/Authentication";
import VerifyEmail from "../components/VerifyEmail";
import HomePage from "../pages/HomePage";
import ViewProfile from "../pages/ViewProfilePage";
import TrainerApplication from "../pages/TrainerApplication";

export default function SwitchRouters() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthenticationPage />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ViewProfile />}/>
      <Route path="/trainer/application" element={<TrainerApplication />}/>
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
