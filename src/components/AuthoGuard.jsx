import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  isAccessTokenExpired,
  isRefreshTokenExpired,
  clearTokens,
  clearAccessTokens,
  clearRefreshTokens,
} from "../services/authStorage";

export default function AuthoGuard({ children }) {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      const rememberMe = localStorage.getItem("rememberMe") === "true";

      //Không có refresh token hoặc hết hạn → logout
      if (!refreshToken && isRefreshTokenExpired()) {
        clearRefreshTokens();
        clearAccessTokens();

        if (location.pathname === "/home-page") {
          setIsChecking(false);
          return children;
        } else {
          navigate("/auth", {
            state: {
              errorMessage:
                "Your session token has expired. Please log in again.",
            },
          });
          setIsChecking(false);
          return;
        }
      }

      try {

        // Nếu access token còn hạn
        if (!isAccessTokenExpired()) {
          // Kiểm tra đăng nhập 1 vị trí duy nhất
          const responsePosition = await axios.get(
            `${API_BASE_URL}/auth/check-one-position/${refreshToken}/${accessToken}`
          );
          return;
        }

        // Nếu access token hết hạn → tiến hành refresh
        if (isAccessTokenExpired()) {
          
          // Kiểm tra refresh token vẫn còn hợp lệ
          await axios.get(
            `${API_BASE_URL}/auth/check-one-position/${refreshToken}/${accessToken}`
          );

          // Xóa token cũ
          clearAccessTokens();

          // Gọi API refresh token để lấy token mới
          const responseNewAccessToken = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            { refresh_token: refreshToken }
          );

          const now = Date.now();
          const accessExpiryMsNew =
            now + Number(responseNewAccessToken.data?.data?.expires_in) * 1000;
          const refreshExpiryMsNew =
            now +
            Number(responseNewAccessToken.data?.data?.refresh_expires_in) *
              1000;

          const accessTokenNew =
            responseNewAccessToken?.data?.data?.access_token;
          const refreshTokenNew =
            responseNewAccessToken?.data?.data?.refresh_token;

          // Lưu token mới đúng nơi (theo rememberMe)
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem("access_token", accessTokenNew);
          storage.setItem("refresh_token", refreshTokenNew);
          storage.setItem("access_expiry", accessExpiryMsNew);
          storage.setItem("refresh_expiry", refreshExpiryMsNew);

          return;
        }
      } catch (error) {
        // Có lỗi (token không hợp lệ, bị revoke, v.v.)
        const errMsg =
          error.response?.data?.message ||
          "Authentication failed. Please log in again.";
        clearTokens();
        navigate("/auth", {
          state: { errorMessage: errMsg },
        });
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [location.state, navigate, location.pathname, API_BASE_URL, children]);

  // Trong lúc đang kiểm tra xác thực
  if (isChecking)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="loader"></div>
        <style>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      </div>
    );

  // Nếu hợp lệ → cho phép render trang con
  return children;
}
