import { motion, AnimatePresence } from "framer-motion";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { useState } from "react";
import "../style/AuthenticationPage.css"; 

export default function AuthenticationPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <div className="auth-page-container">
      <div className="text-center mb-8">
        <h1 className="auth-logo-title">
          <span className="logo-fit-text">Fit</span>
          <span className="logo-hub-text">Hub</span>
        </h1>
        <p className="auth-tagline">
          Your Fitness Journey Starts Here
        </p>
      </div>
      <AnimatePresence mode="wait">
        {isSignIn ? (
          <motion.div
            key="signin"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          >
            <SignIn onSwitchToSignUp={() => setIsSignIn(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.4 }}
          >
            <SignUp onSwitchToSignIn={() => setIsSignIn(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}