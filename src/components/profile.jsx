import React, { useState, useRef } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Modal,
  Badge,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import "../style/Profile.css";
import { Camera } from "lucide-react";

function ProfileComplete() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const coverFileInputRef = useRef(null);
  const avatarFileInputRef = useRef(null);

  const [profileInfo, setProfileInfo] = useState({
    username: "johndoe",
    fullName: "John Doe",
    email: "john.doe@example.com",
    dateOfBirth: "1990-05-15",
    gender: "male",
    bio: "Passionate developer and tech enthusiast. Love to build amazing web applications and share knowledge with the community.",
    avatar_url:
      "https://images.unsplash.com/photo-1570170609489-43197f518df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIzMTE5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    cover_url:
      "https://images.unsplash.com/photo-1689094195667-3dae89dd11fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGUlMjBiYW5uZXJ8ZW58MXx8fHwxNzYyMjY2MDA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    lastLogin: "November 5, 2025 at 2:30 PM",
  });

  const handleToggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const handleUpdateProfile = () => {
    if (profileInfo.fullName.trim === "") {
      setIsEditMode(!isEditMode);
      return;
    }
    setIsEditMode(!isEditMode);
  };

  const handleProfileInfoChange = (field, value) => {
    setProfileInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  /*
    
  */
  const handleCoverChange = () => {
    coverFileInputRef.current?.click();
  };

  const handleAvatarChange = () => {
    avatarFileInputRef.current?.click();
  };

  /*
   */
  const handleCoverFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        handleProfileInfoChange("cover_url", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("File size should be less than 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        handleProfileInfoChange("avatar_url", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({});

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validatePassword = () => {
    const errors = {};

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();

    if (validatePassword()) {
      alert("Password changed successfully!");
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordErrors({});
    }
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordErrors({});
  };

  return (
    <div
      className="bg-light min-vh-100 profile-container-parent"
      style={{ maxWidth: "1200px" }}
    >
      <input
        type="file"
        ref={coverFileInputRef}
        onChange={handleCoverFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      <input
        type="file"
        ref={avatarFileInputRef}
        onChange={handleAvatarFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      <Container
        fluid
        style={{ maxWidth: "1200px" }}
        className="profile-container"
      >
        <div className="position-relative">
          <div className="profile-cover-container">
            <img
              src={profileInfo.cover_url}
              alt="Cover"
              className="profile-cover-image"
            />
            {isEditMode && (
              <>
                <button
                  onClick={handleCoverChange}
                  className="btn btn-light profile-camera-btn-cover d-flex align-items-center justify-content-center"
                  title="Change cover photo"
                >
                  <Camera size={20} className="fs-5" />
                </button>
              </>
            )}
          </div>

          <div className="profile-avatar-wrapper">
            <div className="profile-avatar-container">
              <Image
                src={profileInfo.avatar_url}
                alt={profileInfo.fullName}
                roundedCircle
                className="profile-avatar-image"
              />
              {isEditMode && (
                <button
                  onClick={handleAvatarChange}
                  className="btn btn-light profile-camera-btn-avatar d-flex align-items-center justify-content-center"
                  title="Change avatar"
                >
                  <Camera size={20} className="fs-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={{ marginTop: "5rem" }}>
          <div className="text-center mb-4">
            <h1 className="h2 mb-2 fw-semibold">{profileInfo.fullName}</h1>
            <p className="text-muted mb-0">@{profileInfo.username}</p>
          </div>

          <Card className="profile-card">
            <Card.Header className="profile-card-header">
              <div className="d-flex justify-content-between align-items-md-center gap-3">
                <h5 className="mb-2">Profile Information</h5>
                <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 w-100 w-md-auto">
                  <button
                    className="d-flex align-items-center justify-content-center gap-2 profile-btn-outline"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    <i className="bi bi-key"></i>
                    <span>Change Password</span>
                  </button>
                  <button
                    onClick={() => {
                      isEditMode ? handleToggleEdit() : handleUpdateProfile();
                    }}
                    className={`d-flex align-items-center justify-content-center gap-2 ${
                      isEditMode ? "profile-btn" : "profile-btn-outline"
                    }`}
                  >
                    <i
                      className={isEditMode ? "bi bi-check-lg" : "bi bi-pencil"}
                    ></i>
                    <span>{isEditMode ? "Save Profile" : "Edit Profile"}</span>
                  </button>
                </div>
              </div>
            </Card.Header>

            <Card.Body className="p-4">
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={profileInfo.username}
                    disabled
                    className="profile-form-control"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={profileInfo.fullName}
                    onChange={(e) =>
                      handleProfileInfoChange("fullName", e.target.value)
                    }
                    disabled={!isEditMode}
                    className="profile-form-control"
                  />
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={profileInfo.email}
                    disabled
                    placeholder="your.email@example.com"
                    className="profile-form-control"
                  />
                </Form.Group>

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        <i className="bi bi-calendar3 me-2"></i>
                        Date of Birth
                      </Form.Label>
                      <Form.Control
                        type="date"
                        value={profileInfo.dateOfBirth}
                        onChange={(e) =>
                          handleProfileInfoChange("dateOfBirth", e.target.value)
                        }
                        disabled={!isEditMode}
                        className="profile-form-control"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        <i className="bi bi-gender-ambiguous me-2"></i>
                        Gender
                      </Form.Label>
                      <Form.Select
                        value={profileInfo.gender}
                        onChange={(e) =>
                          handleProfileInfoChange("gender", e.target.value)
                        }
                        disabled={!isEditMode}
                        className="profile-form-control"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={profileInfo.bio}
                    onChange={(e) =>
                      handleProfileInfoChange("bio", e.target.value)
                    }
                    disabled={!isEditMode}
                    placeholder="Tell us about yourself..."
                    className="profile-form-control"
                  />
                </Form.Group>
                <Form.Group className="mb-0">
                  <Form.Label>Last Login</Form.Label>
                  <Form.Control
                    type="text"
                    value={profileInfo.lastLogin}
                    disabled
                    className="profile-form-control text-muted"
                  />
                  <Form.Text className="text-muted">
                    This field is read-only and automatically updated.
                  </Form.Text>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>

      {/* Change Password Modal */}
      <Modal
        show={showPasswordModal}
        onHide={handleClosePasswordModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <i className="bi bi-key me-2"></i>
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-4">
            Update your password to keep your account secure.
          </p>
          <Form onSubmit={handleSubmitPassword}>
            {/* Current Password */}
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  handlePasswordChange("currentPassword", e.target.value)
                }
                isInvalid={!!passwordErrors.currentPassword}
                className="profile-form-control"
              />
              <Form.Control.Feedback type="invalid">
                {passwordErrors.currentPassword}
              </Form.Control.Feedback>
            </Form.Group>

            {/* New Password */}
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  handlePasswordChange("newPassword", e.target.value)
                }
                isInvalid={!!passwordErrors.newPassword}
                className="profile-form-control"
              />
              <Form.Control.Feedback type="invalid">
                {passwordErrors.newPassword}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Password must be at least 8 characters long.
              </Form.Text>
            </Form.Group>

            {/* Confirm New Password */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  handlePasswordChange("confirmPassword", e.target.value)
                }
                isInvalid={!!passwordErrors.confirmPassword}
                className="profile-form-control"
              />
              <Form.Control.Feedback type="invalid">
                {passwordErrors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePasswordModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmitPassword}
            className="profile-btn-primary"
          >
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProfileComplete;
