import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import '../style/SignUp.css';

export default function SignUp({ onSwitchToSignIn }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    password: '',
    confirmPassword: ''
  });
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign up:', formData);
  };

  const handleGoogleSignUp = () => {
    console.log('Sign up with Google');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="row g-0 min-h-500">
          {/* Left Side - Gradient */}
          <div className="col-md-5 auth-gradient-side signup-gradient">
            <div className="gradient-circle gradient-circle-3"></div>
            <div className="gradient-circle gradient-circle-4"></div>
            
            <div className="gradient-content">
              <h2 className="gradient-title">Welcome Back!</h2>
              <p className="gradient-text">
                Already have an account? Sign in to continue your fitness journey.
              </p>
              <button
                onClick={onSwitchToSignIn}
                className="gradient-btn"
              >
                SIGN IN
              </button>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="col-md-7 auth-form-side">
            <div className="auth-form-content">
              <h2 className="auth-title">Join FitHub</h2>
              <p className="auth-subtitle">Create your account to get started</p>

              <Form onSubmit={handleSubmit}>
                {/* Name Row */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="auth-input"
                      />
                      <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="auth-input"
                      />
                      <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Email Row */}
                <Form.Group className="mb-3 position-relative">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="auth-input"
                  />
                  <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <polyline points="3,8 12,13 21,8" />
                  </svg>
                </Form.Group>

                {/* Date of Birth and Gender Row */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="auth-input"
                      />
                      <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="auth-input gender-select"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </Form.Select>
                      <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2a8 8 0 0 1 8 8c0 4.418-8 12-8 12S4 14.418 4 10a8 8 0 0 1 8-8z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Password Row */}
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
                      />
                      <div className="input-icons">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
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
                      />
                      <div className="input-icons">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Terms Agreement */}
                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    id="terms-agreement"
                    label={
                      <span className="terms-check-label">
                        I agree to the <a href="#terms" className="terms-link">Terms of Service</a> and <a href="#privacy" className="terms-link">Privacy Policy</a>
                      </span>
                    }
                    className="terms-check"
                  />
                </Form.Group>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  className="auth-submit-btn"
                >
                  Create Account
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Button>

                {/* Divider */}
                <div className="auth-divider">
                  <span>OR</span>
                </div>

                {/* Google Sign Up */}
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="google-btn"
                >
                  <svg className="google-icon" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Sign up with Google</span>
                </button>

                {/* Switch to Sign In */}
                <div className="text-center mt-4">
                  <span className="switch-text">Already have an account? </span>
                  <button
                    type="button"
                    onClick={onSwitchToSignIn}
                    className="switch-link"
                  >
                    Sign In
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}