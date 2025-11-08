import React, { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  Button,
  Form,
  Dropdown,
} from "react-bootstrap";
import { Search, ChevronDown, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clearTokens } from "../../services/authStorage";
import "../../style/SignIn.css";

export default function Header({ user }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // test tạm

  const handleLogout = () => {
    clearTokens();
    navigate("/auth", { state: { isSignIn: true } });
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const avatarSrc =
    user?.avatarUrl ||
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; // avatar mặc định

  return (
    <Navbar expand="lg" className="py-3">
      <Container>
        {/* Logo */}
        <Navbar.Brand
          href="/home-page"
          className="text-white d-flex align-items-center gap-2"
        >
          <div className="logo-box" />
          <div>
            <div className="brand-name">
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #0f141b 0%, #d23948 50%, #db4e5c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                }}
              >
                Fit
              </span>
              <span style={{ color: "#e9cbccff", fontWeight: 700 }}>Hub</span>
            </div>
            <div className="brand-tagline">Transform Your Body</div>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Menu */}
          <Nav className="mx-auto">
            <Nav.Link href="/home-page" className="active">
              Home
            </Nav.Link>
            <Nav.Link
              href="#programs"
              className="d-flex align-items-center gap-1"
            >
              Programs <ChevronDown size={14} color="#d90a14" />
            </Nav.Link>
            <Nav.Link
              href="#coaching"
              className="d-flex align-items-center gap-1"
            >
              Coaching <ChevronDown size={14} color="#d90a14" />
            </Nav.Link>
            <Nav.Link href="#membership">Membership</Nav.Link>
            <Nav.Link href="#about">About Us</Nav.Link>
          </Nav>

          {/* Right side */}
          <div className="d-flex gap-3 align-items-center">
            <div className="search-box">
              <Search size={20} style={{ opacity: 0.6 }} />
            </div>
            <Form.Control
              type="text"
              placeholder="Search courses..."
              className="search-input"
              style={{ border: "1px solid", borderRadius: "90px" }}
            />

            {!user ? (
              // Chưa login
              <>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="btn-outline-custom"
                  onClick={() =>
                    navigate("/auth", { state: { isSignIn: true } })
                  }
                >
                  Log in
                </Button>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="btn-primary-red"
                  onClick={() =>
                    navigate("/auth", { state: { isSignIn: false } })
                  }
                >
                  Sign Up
                </Button>
              </>
            ) : (
              // Đã login
              <>
                {/* Notification bell */}
                <div
                  className="position-relative me-3"
                  style={{ cursor: "pointer" }}
                >
                  <Bell color="white" size={24} />
                  {notificationCount > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        backgroundColor: "#d90a14",
                        color: "white",
                        borderRadius: "50%",
                        fontSize: "10px",
                        padding: "2px 5px",
                        fontWeight: "bold",
                      }}
                    >
                      {notificationCount}
                    </span>
                  )}
                </div>

                {/* User dropdown */}
                <Dropdown
                  show={showDropdown}
                  onToggle={(isOpen) => setShowDropdown(Boolean(isOpen))}
                >
                  <Dropdown.Toggle
                    variant="link"
                    bsPrefix="p-0 border-0 bg-transparent"
                    id="dropdown-user"
                    className="user-toggle d-flex align-items-center"
                    aria-label="User menu"
                  >
                    <img
                      src={avatarSrc}
                      alt="avatar"
                      className="user-toggle__avatar"
                      loading="lazy"
                      width={35}
                      height={35}
                    />
                    <span className="user-toggle__name">
                      {user?.data?.username ||
                        user?.username ||
                        user?.fullName ||
                        "User"}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="user-menu" align="end">
                    <Dropdown.Item
                      onClick={handleProfile}
                      className="user-menu__item"
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={handleLogout}
                      className="user-menu__item user-menu__item--danger"
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
