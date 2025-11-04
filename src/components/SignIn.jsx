import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../style/SignIn.css";

export default function SignIn({ onSwitchToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email và mật khẩu không được để trống")
      alert("Email và mật khẩu không được để trống");
      return
    }else {
      login(email, password);
    }
  };

  async function login(email, password) {
    try {
      const response = await fetch(API_BASE_URL + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("access_token", data.data.tokens.access_token);
        localStorage.setItem("refresh_token", data.data.tokens.refresh_token);
        localStorage.setItem("user", JSON.stringify(data.data.user)); 
        console.log("Login successful:", data.message);
        return data;
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
  const handleGoogleSignIn = () => {
    
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="row g-0 min-h-500">
          <div className="col-md-6 auth-form-side">
            <div className="auth-form-content">
              <h2 className="auth-title">Welcome To FitHub</h2>
              <p className="auth-subtitle">Sign in to continue your journey</p>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 position-relative">
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                  />
                  <svg
                    className="input-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <polyline points="3,8 12,13 21,8" />
                  </svg>
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                  />
                  <div className="input-icons">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                </Form.Group>

                <div className="auth-divider">
                  <span>OR</span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="google-btn"
                >
                  <svg className="google-icon" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

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
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Button>

                <div className="text-center mt-3">
                  <span className="switch-text">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={onSwitchToSignUp}
                    className="switch-link"
                  >
                    Create Account
                  </button>
                </div>

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
