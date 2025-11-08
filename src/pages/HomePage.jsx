import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../style/SignIn.css";

const HomePage = () => {
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      setShake(true);

      const timer = setTimeout(() => {
        setSuccessMessage("");
        setShake(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="container mt-5 text-center">
      {/* 🔹 Toast thông báo nhỏ góc phải */}
      {successMessage && (
        <div
          className={`toast-box ${shake ? "shake" : ""}`}
          role="alert"
        >
          <div className="toast-header">
            <strong className="me-auto">FitHub</strong>
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccessMessage("")}
            ></button>
          </div>
          <div className="toast-body">{successMessage}</div>
        </div>
      )}

      <h1 className="mt-4">🏠 Home Page</h1>
      <p>Chào mừng bạn đến với FitHub!</p>
    </div>
  );
};

export default HomePage;
