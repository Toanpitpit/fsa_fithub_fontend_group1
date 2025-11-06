import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaArrowRight,
  FaEnvelopeOpenText,
  FaRedo,
} from "react-icons/fa";
import "../style/VerifyEmail.css";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import { useResendVerification } from "../hooks/useResendVerification";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { verifyEmail, status, message, isLoading } = useVerifyEmail();
  const { resendEmail, status: resendStatus, message: resendMessage, isLoading: isResending } = useResendVerification();
  
  // Ref to track if verification has been initiated (prevents double call in StrictMode)
  const hasCalledVerify = useRef(false);
  
  // State for resend email modal
  const [showResendModal, setShowResendModal] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!token) {
      // Không có token trong URL
      return;
    }

    // Prevent duplicate API calls (especially in React StrictMode)
    if (hasCalledVerify.current) {
      return;
    }

    // Mark as called and execute verification
    hasCalledVerify.current = true;
    verifyEmail(token);
  }, [token, verifyEmail]);

  const handleReturnToLogin = () => {
    navigate("/");
  };

  const handleReturnToRegister = () => {
    navigate("/");
  };

  const handleResendClick = () => {
    setShowResendModal(true);
  };

  const handleResendSubmit = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      await resendEmail(email.trim().toLowerCase());
    }
  };

  const handleCloseModal = () => {
    setShowResendModal(false);
    setEmail("");
  };

  // Nội dung hiển thị theo trạng thái
  const renderContent = () => {
    if (!token) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="verify-content error"
        >
          <div className="verify-icon-wrapper error-icon">
            <FaExclamationTriangle className="verify-icon" />
          </div>
          <h2 className="verify-title">Invalid Link</h2>
          <p className="verify-message">
            The verification link is invalid or missing a token.
          </p>
          <button onClick={handleReturnToRegister} className="verify-btn">
            Return to Sign Up
            <FaArrowRight className="btn-icon" />
          </button>
        </motion.div>
      );
    }

    if (isLoading) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="verify-content loading"
        >
          <div className="verify-icon-wrapper loading-icon">
            <FaEnvelopeOpenText className="verify-icon" />
            <div className="loading-pulse"></div>
          </div>
          <h2 className="verify-title">Verifying Email...</h2>
          <p className="verify-message">
            Please wait while we verify your email address.
          </p>
          <Spinner animation="border" className="verify-spinner" />
        </motion.div>
      );
    }

    if (status === "success") {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="verify-content success"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="verify-icon-wrapper success-icon"
          >
            <FaCheckCircle className="verify-icon" />
            <motion.div
              className="success-circle"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
          <h2 className="verify-title">Email Verified!</h2>
          <p className="verify-message">
            {message || "Your email has been successfully verified. You can now sign in to your account."}
          </p>
          <button onClick={handleReturnToLogin} className="verify-btn">
            Sign In Now
            <FaArrowRight className="btn-icon" />
          </button>
        </motion.div>
      );
    }

    if (status === "error") {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="verify-content error"
        >
          <div className="verify-icon-wrapper error-icon">
            <FaTimesCircle className="verify-icon" />
          </div>
          <h2 className="verify-title">Verification Failed</h2>
          <p className="verify-message">
            {message || "Unable to verify your email. The link may be expired or invalid."}
          </p>
          <div className="verify-actions-stacked">
            <button onClick={handleResendClick} className="verify-btn primary full-width">
              <FaRedo className="btn-icon" />
              Resend Verification Email
            </button>
            <div className="verify-actions-row">
              <button onClick={handleReturnToRegister} className="verify-btn secondary">
                Sign Up Again
              </button>
              <button onClick={handleReturnToLogin} className="verify-btn secondary">
                Try Sign In
                <FaArrowRight className="btn-icon" />
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    return null;
  };

  return (
    <div className="verify-page-container">
      {/* Logo */}
      <div className="verify-logo">
        <h1 className="verify-logo-title">
          <span className="logo-fit-text">Fit</span>
          <span className="logo-hub-text">Hub</span>
        </h1>
      </div>

      {/* Card */}
      <div className="verify-card">
        <div className="verify-gradient-bg">
          <div className="gradient-circle gradient-circle-1"></div>
          <div className="gradient-circle gradient-circle-2"></div>
          <div className="gradient-circle gradient-circle-3"></div>
        </div>
        
        {renderContent()}
      </div>

      {/* Resend Email Modal */}
      {showResendModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="modal-title">Resend Verification Email</h3>
            
            {resendStatus === 'success' ? (
              <div className="modal-success">
                <FaCheckCircle className="success-icon-modal" />
                <p className="modal-message">{resendMessage}</p>
                <button onClick={handleCloseModal} className="verify-btn">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleResendSubmit} className="modal-form">
                <p className="modal-description">
                  Enter your email address and we'll send you a new verification link.
                </p>
                
                {resendStatus === 'error' && (
                  <div className="alert alert-error">
                    {resendMessage}
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isResending}
                  />
                </div>
                
                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="verify-btn secondary"
                    disabled={isResending}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="verify-btn primary"
                    disabled={isResending}
                  >
                    {isResending ? (
                      <>
                        <Spinner animation="border" size="sm" className="mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaRedo className="btn-icon" />
                        Send Email
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <div className="verify-footer">
        <p>
          Need help?{" "}
          <a href="#contact" className="footer-link">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}

