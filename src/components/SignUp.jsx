import { useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaVenusMars,
  FaLock,
  FaArrowRight,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "../style/SignUp.css";
import { useSignUp } from "../hooks/useSignUp";

export default function SignUp({ onSwitchToSignIn }) {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [isAgree, setIsAgree] = useState(false);

  // Sử dụng custom hook
  const { signUp, isLoading, error, successMessage, clearMessages } = useSignUp();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error khi user bắt đầu nhập
    clearMessages();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gọi function từ custom hook
    const result = await signUp(formData, isAgree);

    if (result.success) {
      setFormData({
        username: "",
        fullname: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        password: "",
        confirmPassword: "",
      });
      setIsAgree(false);

      // Chuyển sang trang đăng nhập sau 3 giây
      setTimeout(() => {
        onSwitchToSignIn();
      }, 3000);
    }
  };

  const handleGoogleSignUp = () => {
    console.log("Sign up with Google");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="row g-0 min-h-500">
          <div className="col-md-5 auth-gradient-side signup-gradient">
            <div className="gradient-circle gradient-circle-3"></div>
            <div className="gradient-circle gradient-circle-4"></div>

            <div className="gradient-content">
              <h2 className="gradient-title">Welcome Back!</h2>
              <p className="gradient-text">
                Already have an account? Sign in to continue your fitness
                journey.
              </p>
              <button onClick={onSwitchToSignIn} className="gradient-btn">
                SIGN IN
              </button>
            </div>
          </div>

          <div className="col-md-7 auth-form-side">
            <div className="auth-form-content">
              <h2 className="auth-title">Join FitHub</h2>
              <p className="auth-subtitle">
                Create your account to get started
              </p>

              {/* Success Message */}
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="auth-input"
                        disabled={isLoading}
                      />
                      <FaUser className="input-icon" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Control
                        type="text"
                        name="fullname"
                        placeholder="Full name"
                        value={formData.fullname}
                        onChange={handleChange}
                        className="auth-input"
                        disabled={isLoading}
                      />
                      <FaUser className="input-icon" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3 position-relative">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="auth-input"
                    disabled={isLoading}
                  />
                  <FaEnvelope className="input-icon" />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="auth-input"
                        disabled={isLoading}
                      />
                      <FaCalendarAlt className="input-icon" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3 position-relative">
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="auth-input gender-select"
                        disabled={isLoading}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <FaVenusMars className="input-icon" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="auth-input"
                        disabled={isLoading}
                      />
                      <FaLock className="input-icon" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="auth-input"
                        disabled={isLoading}
                      />
                      <FaLock className="input-icon" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    id="terms-agreement"
                    checked={isAgree}
                    onChange={(e) => setIsAgree(e.target.checked)}
                    disabled={isLoading}
                    label={
                      <span className="terms-check-label">
                        I agree to the{" "}
                        <a href="#terms" className="terms-link">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#privacy" className="terms-link">
                          Privacy Policy
                        </a>
                      </span>
                    }
                    className="terms-check"
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  className="auth-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      Create Account
                      <FaArrowRight className="btn-icon" />
                    </>
                  )}
                </Button>

                <div className="auth-divider">
                  <span>OR</span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="google-btn"
                >
                  <FcGoogle className="google-icon" />
                  <span>Sign up with Google</span>
                </button>
                
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
