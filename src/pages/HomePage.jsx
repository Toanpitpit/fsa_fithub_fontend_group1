import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import Header from "../components/Header";
import HeroBanner from "../components/Herobanner";
export default function HomePage() {
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
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          zIndex: 0
        }}
      />
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
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
        <Container fluid>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <HeroBanner></HeroBanner>
          </motion.div>
        </Container>
      </motion.div>

      {/* <motion.div
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
      </motion.div> */}
    </motion.div>
  );
}