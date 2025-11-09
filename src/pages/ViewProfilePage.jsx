import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import "../style/ProfilePage.css";
import Header from "../components/Home/Header";
import { useEffect, useState } from "react";
import ProfileComplete from "../components/profile";
import Footer from "../components/Home/Footer";
import Toast from "../components/Home/Toast";
import { authService } from "../services/authService";
export default function ViewProfile() {
 const [user, setUser] = useState();
   useEffect(() => {
     const fetchUser = async () => {
       try {
         const res = await authService.getUserFromRefresh();
         if (res.success) setUser(res.data);
       } catch (err) {
         console.error(err.message);
       }
     };
     fetchUser();
   }, []);
 
   
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-vh-100"
      style={{
        backgroundColor: "#0000",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(163, 29, 29, 0.1)",
          backdropFilter: "blur(10px)",
          zIndex: 0,
        }}
      />


      <Header user={user}></Header>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Container className="py-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ProfileComplete user={user} />
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
          zIndex: 10,
        }}
      >
        <Footer></Footer>
      </motion.div>
    </motion.div>
  );
}
