import { useEffect, useState } from "react";
import "../style/custom.css";

// Import components
import Articles from "../components/Home/Articles";
import Categories from "../components/Home/Categories";
import FAQ from "../components/Home/FAQ";
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import Hero from "../components/Home/Hero";
import Pricing from "../components/Home/Pricing";
import Services from "../components/Home/Services";
import Stats from "../components/Home/Stats";
import Team from "../components/Home/Team";

// Import images
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import imgFrame3142 from "../assets/159decd207e06ecd4f98157af057a99e445c0451.png";
import imgFrame514 from "../assets/1a90e5cd7399735ff1d2ab1f41a2747eba676b3d.png";
import imgFrame447 from "../assets/38ff352b88627b6db80be025bc73d4a344b24e18.png";
import imgFrame513 from "../assets/4db40e0d45768febc86b5dd950fedce957e9e19a.png";
import imgFrame512 from "../assets/50893c736932ef090d1bacdd740cb0ccb39be9f5.png";
import imgFrame511 from "../assets/6059fac6119c3f846dc8160da258ff6493233b0c.png";
import imgFrame429 from "../assets/668c6c3d0118dc29000b598d320bd3b6bb70bafa.png";
import imgFrame445 from "../assets/69573ea629b490916a264f05f51d7e6ba3f27174.png";
import imgFrame3141 from "../assets/72f1be153711da1ed4fa5b45d410451f1b681f59.png";
import imgFrame3144 from "../assets/7cb9f0b137fc58f0ef3889a8cdb699b09ed69074.png";
import imgFrame3143 from "../assets/8cf5a8cb534ae1f08982b3e983713a1ce08d4b22.png";
import imgFrame446 from "../assets/8ecb73d3ffec6aaf55ccc9ec87da40d3c7c91123.png";
import imgFrame443 from "../assets/af56840a26856a0143a20449181f094ebb0365b9.png";
import imgSideViewFitManPosingWhileWearingTankTopWithCrossedArms1 from "../assets/ba0b4b6140f1442df69f99820b959f89e382e97c.png";
import imgFrame444 from "../assets/d135e47fd40ce0cd2d2ccb9103fc472d6c94bc2f.png";
import imgFrame428 from "../assets/e722ad0570fbc06d81a00ea8ee1fde5dac3aaf71.png";
import imgFrame427 from "../assets/fb1edd6744ee4820dfaccb18734942113c4a3830.png";
import Toast from "../components/Home/Toast";
import {
  getRefreshToken,
  isRefreshTokenExpired,
} from "../services/authStorage";

export default function Hompage() {
  // Services data
  const services = [
    { img: imgFrame3141, title: "Personal Training" },
    { img: imgFrame3142, title: "Group Classes" },
    { img: imgFrame3143, title: "Nutrition Coaching" },
    { img: imgFrame3144, title: "Online Programs" },
  ];

  // Categories data
  const categories = [
    { img: imgFrame443, title: "Aerobic Exercise" },
    { img: imgFrame444, title: "Ab Routines" },
    { img: imgFrame445, title: "Pilates" },
    { img: imgFrame446, title: "Building Muscle" },
    { img: imgFrame447, title: "Weight Training" },
  ];

  // Team data
  const trainers = [
    { img: imgFrame511, name: "Ryan Beard", role: "Fitness Coach" },
    { img: imgFrame512, name: "Michael Davis", role: "Nutrition Expert" },
    { img: imgFrame513, name: "John Anderson", role: "Personal Trainer" },
    { img: imgFrame514, name: "Tom Blair", role: "Yoga Instructor" },
  ];

  // Articles data
  const articles = [
    {
      img: imgFrame427,
      title: "Essential Approach for Weight Training",
      date: "Nov 7, 2025",
    },
    {
      img: imgFrame428,
      title: "Nutrition Tips for Better Performance",
      date: "Nov 5, 2025",
    },
    {
      img: imgFrame429,
      title: "Building Muscle Mass Effectively",
      date: "Nov 2, 2025",
    },
  ];

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const location = useLocation();
  const navigate = useNavigate();

  const [toastMsg, setToastMsg] = useState("");
  const [userObject, setUserObject] = useState();

  useEffect(() => {
    const fetchUserFromRefresh = async () => {
      const refreshToken = getRefreshToken();
     
      // if (!refreshToken || isRefreshTokenExpired()) return;

      try {
        const userResponse = await axios.post(
          `${API_BASE_URL}/auth/me-from-refresh`,
          {
            refresh_token: refreshToken,
          }
        );
        setUserObject(userResponse.data.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        if (error.response)
          console.error("Response data:", error.response.data);
        if (error.request)
          console.error("Request made but no response:", error.request);
        console.error("Error message:", error.message);
      }
    };

    const checkAuth = async () => {
      // Nếu vừa login thành công → hiện toast, sau đó reset state
      if (location.state?.successMessage) {
        setToastMsg(location.state.successMessage);
        

        // Clear state tránh toast lặp lại
        navigate(location.pathname, { replace: true });

        await fetchUserFromRefresh();
        return;
      }

      // Nếu đã có refresh token hợp lệ (tự động đăng nhập)
      await fetchUserFromRefresh();
    };

    checkAuth();
  }, [location.state, navigate, location.pathname, API_BASE_URL]);

  return (
    <div className="App">
      <div className="toast-wrapper">
        {toastMsg && (
          <Toast
            message={toastMsg}
            onClose={() => setToastMsg("")}
            duration={4000}
          />
        )}
      </div>

      <Header user={userObject === null ? "" : userObject} />
      <Hero
        image={imgSideViewFitManPosingWhileWearingTankTopWithCrossedArms1}
      />
      <Stats />
      <Services services={services} />
      <Pricing />
      <Categories categories={categories} />
      <Team trainers={trainers} />
      <Articles articles={articles} />
      <FAQ />
      <Footer />
    </div>
  );
}
