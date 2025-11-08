import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import ProfileUser from "../components/profile"; 
import "../style/ProfilePage.css"
import Header from "../components/Header";
export default function ViewProfile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative"
      }}
    >
      {/* Background blur effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(163, 29, 29, 0.1)",
          backdropFilter: "blur(10px)",
          zIndex: 0
        }}
      />

      {/* Header giả */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          background: "rgba(133, 41, 41, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(139, 8, 8, 0.2)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          position: "relative",
          zIndex: 10
        }}
      >
        <Header></Header>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Container className="py-5">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ProfileUser />
          </motion.div>
        </Container>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          position: "relative",
          zIndex: 10
        }}
      >
        <Container>
          <div className="py-4">
            <div className="row">
              <div className="col-md-4 mb-4 mb-md-0">
                <motion.h5 
                  whileHover={{ scale: 1.05 }}
                  className="fw-bold mb-3"
                >
                  User Profile System
                </motion.h5>
                <p className="text-light mb-0">
                  Professional profile management system with modern UI and smooth animations.
                </p>
              </div>
              <div className="col-md-4 mb-4 mb-md-0">
                <motion.h6 
                  whileHover={{ scale: 1.05 }}
                  className="fw-bold mb-3"
                >
                  Quick Links
                </motion.h6>
                <div className="d-flex flex-column gap-2">
                  {['Home', 'Profiles', 'Settings', 'Help'].map((item, index) => (
                    <motion.a
                      key={item}
                      href="#"
                      whileHover={{ x: 5, color: "#667eea" }}
                      transition={{ duration: 0.2 }}
                      style={{
                        color: "rgba(255, 255, 255, 0.8)",
                        textDecoration: "none"
                      }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </div>
              <div className="col-md-4">
                <motion.h6 
                  whileHover={{ scale: 1.05 }}
                  className="fw-bold mb-3"
                >
                  Contact Info
                </motion.h6>
                <div className="d-flex flex-column gap-2 text-light">
                  <div>Email: support@profileapp.com</div>
                  <div>Phone: +1 (555) 123-4567</div>
                  <div>Address: 123 Profile Street, Digital City</div>
                </div>
              </div>
            </div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center pt-4 mt-3 border-top border-secondary"
            >
              <p className="mb-0 text-light">
                © 2024 User Profile System. All rights reserved.
              </p>
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </motion.div>
  );
}