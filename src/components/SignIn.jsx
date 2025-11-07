import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "../style/SignIn.css";
import { useNavigate } from "react-router-dom";

export default function SignIn({ onSwitchToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Username , Password not be empty!");
      return;
    } else {
      setError("");
      login(email, password);
    }
  };

  async function login(email, password) {
    try {
      const response = await fetch(API_BASE_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrUsername: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("access_token", data.data.tokens.access_token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        setSuccessMessage("Login Successfuly , Welcome");
        setTimeout(() => {
           navigate(`/profile/${data.data.user.id}`);
        }, 1000);
       
        return data;
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        "Login fail , Please try again! (Check your username or password)"
      );
      throw error;
    }
  }

  const handleGoogleSignIn = () => {
    console.log("Sign in with Google");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="row g-0 min-h-500">
          <div className="col-md-6 auth-form-side">
            <div className="auth-form-content">
              <h2 className="auth-title">Welcome To FitHub</h2>
              <p className="auth-subtitle">Sign in to continue your journey</p>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 position-relative">
                  <Form.Control
                    type="text"
                    placeholder="Username or Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="remember-check"
                  />
                  <a href="#" className="forgot-link">
                    Forgot Password?
                  </a>
                </div>

                <Button type="submit" className="auth-submit-btn">
                  Sign In
                  <FaArrowRight className="btn-icon" />
                </Button>

                <div className="auth-divider">
                  <span>OR</span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="google-btn"
                >
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
