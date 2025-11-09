import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  FaArrowRight,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "../style/SignIn.css";
import { useLocation, useNavigate } from "react-router-dom";
import Toast from "./Home/Toast";

export default function SignIn({ onSwitchToSignUp }) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errorLogin, setErrorLogin] = useState("");
  const [shake, setShake] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [toastMsg, setToastMsg] = useState("");

  const clickSignIn = async () => {
    try {
      const loginRequest = {
        emailOrUsername: emailOrUsername,
        password: password,
        rememberMe: rememberMe,
      };

      const loginResponse = await axios.post(
        `${API_BASE_URL}/auth/login`,
        loginRequest
      );

      // Lấy token & thời gian hết hạn
      const tokens = loginResponse?.data?.data?.tokens;
      if (!tokens) {
        // handle error sớm
        throw new Error("Tokens not found in response");
      }

      const {
        access_token,
        refresh_token,
        expires_in, // seconds, ví dụ 3600
        refresh_expires_in, // seconds, ví dụ 30*24*3600
      } = tokens;

      // Tính mốc hết hạn (ms)
      const now = Date.now();
      const accessExpiryMs = now + Number(expires_in) * 1000;
      const refreshExpiryMs = now + Number(refresh_expires_in) * 1000;
      console.log("accessExpiryMs") + accessExpiryMs;
      console.log("refreshExpiryMs" + refreshExpiryMs);
      console.log(now - refreshExpiryMs);

      // Chọn storage theo rememberMe
      const storage = rememberMe ? localStorage : sessionStorage;
      const other = rememberMe ? sessionStorage : localStorage;

      // xóa bên còn lại để tránh “đụng hàng”
      other.removeItem("access_token");
      other.removeItem("refresh_token");
      other.removeItem("access_expiry");
      other.removeItem("refresh_expiry");
      localStorage.removeItem("remember_me");

      // Lưu đồng bộ token + expiry
      storage.setItem("access_token", access_token);
      storage.setItem("refresh_token", refresh_token);
      storage.setItem("access_expiry", String(accessExpiryMs));
      storage.setItem("refresh_expiry", String(refreshExpiryMs));
      localStorage.setItem("remember_me", rememberMe ? "true" : "false");

      navigate("/home-page", {
        state: { successMessage: loginResponse.data?.message + " 🎉" },
      });
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;

      setErrorLogin(errMsg);
      setShake(true);
      setTimeout(() => {
        setErrorLogin("");
        setShake(false);
      }, 5000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (location.state?.errorMessage) {
      setToastMsg(location.state.errorMessage);

      // Clear state sau khi Toast đã hiển thị xong
      setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 100); // duration toast
    }
  }, [location.state, navigate, location.pathname]);

  return (
    <div className="auth-container">
      <div className="toast-wrapper">
        {toastMsg && (
          <Toast
            message={toastMsg}
            onClose={() => setToastMsg("")}
            duration={4000}
          />
        )}
      </div>
      <div className="auth-card">
        <div className="row g-0 min-h-500">
          <div className="col-md-6 auth-form-side">
            <div className="auth-form-content">
              <h2 className="auth-title">Welcome To FitHub</h2>
              <p className="auth-subtitle">Sign in to continue your journey</p>

              {errorLogin && (
                <div
                  className={`alert alert-danger ${shake ? "shake" : ""}`}
                  role="alert"
                >
                  {errorLogin}
                </div>
              )}

              <Form>
                <Form.Group className="mb-3 position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Username or Email Address"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    className="auth-input"
                  />
                  <FaEnvelope className="input-icon" />
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                  />
                  <FaLock className="input-icon lock-icon" />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center my-3">
                  <Form.Check
                    type="checkbox"
                    id="remember"
                    label="Remember me"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="remember-check"
                  />
                  <a href="#" className="forgot-link">
                    Forgot Password?
                  </a>
                </div>

                <Button
                  onClick={() => clickSignIn()}
                  className="auth-submit-btn"
                >
                  Sign In
                  <FaArrowRight className="btn-icon" />
                </Button>

                <div className="auth-divider">
                  <span>OR</span>
                </div>

                <button type="button" className="google-btn">
                  <FcGoogle className="google-icon" />
                  <span>Continue with Google</span>
                </button>

                <div className="text-center mt-4">
                  <p className="terms-text">
                    By continuing, you agree to our{" "}
                    <a href="#" className="terms-link">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="terms-link">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </Form>
            </div>
          </div>

          <div className="col-md-6 auth-gradient-side">
            <div className="gradient-circle gradient-circle-1"></div>
            <div className="gradient-circle gradient-circle-2"></div>

            <div className="gradient-content">
              <h2 className="gradient-title">Hello, Friend!</h2>
              <p className="gradient-text">
                Register with your personal details to use all of site features
              </p>
              <button onClick={onSwitchToSignUp} className="gradient-btn">
                SIGN UP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
