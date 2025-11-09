import { Navigate } from "react-router-dom";
import { getRefreshToken, isRefreshTokenExpired } from "../services/authStorage";

export default function RedirectIfAuthenticatedLogin({ children }) {
  const refreshToken = getRefreshToken();

  if (refreshToken && !isRefreshTokenExpired()) {
    return <Navigate to="/home-page" replace />;
  }

  return children;
}
