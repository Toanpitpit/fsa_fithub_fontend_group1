import React, { useState, useRef, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import useProfile from "../hooks/userprofile";
import { avatar_url_default, cover_url_default } from "../constants/constant";
function ProfileComplete() {
  const { id } = useParams();
  const { profile, error } = useProfile(id);
  const [isEditMode, setIsEditMode] = useState(false);
  // const [showPasswordModal, setShowPasswordModal] = useState(false);
  const coverFileInputRef = useRef(null);
  const avatarFileInputRef = useRef(null);
  const [profileInfo, setProfileInfo] = useState({
    username: "",
    fullName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    bio: "",
    avatarUrl: "",
    coverUrl: "",
    lastLoginAt: "",
  });

  useEffect(() => {
    if (profile)
      setProfileInfo({
        username: profile.username || "",
        fullName: profile.fullName || "",
        email: profile.email || "",
        dateOfBirth: profile.dateOfBirth || "",
        gender: profile.gender || "",
        bio: profile.bio || "",
        avatarUrl: profile.avatarUrl || "",
        coverUrl: profile.coverUrl || "",
        lastLoginAt: profile.lastLoginAt || "",
      });
  }, [profile]);

  /**/
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

  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>Loading...</p>;
  return (
    <div
      className="bg-dark min-vh-100 profile-container-parent"
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
              src={
                profileInfo.coverUrl && profileInfo.coverUrl
                  ? profileInfo.coverUrl
                  : cover_url_default
              }
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
                src={
                  profileInfo && profileInfo.avatar
                    ? profileInfo.coverUrl
                    : avatar_url_default
                }
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
            <h1 className="h2 mb-2  text-light fw-semibold">
              {profileInfo.fullName}
            </h1>
            <p className=" text-light mb-1">@{profileInfo.username}</p>
          </div>

          <Card className="profile-card">
            <Card.Header className="profile-card-header">
              <div className="d-flex justify-content-between align-items-md-center gap-3">
                <h5 className="mb-2 text-light">Profile Information</h5>
                <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 w-100 w-md-auto">
                  <button
                    className="d-flex align-items-center justify-content-center gap-2 profile-btn-outline"
                    // onClick={() => setShowPasswordModal(true)}
                  >
                    <i className="bi bi-key"></i>
                    <span>Change Password</span>
                  </button>

                  {!isEditMode ? (
                    <button
                      onClick={handleToggleEdit}
                      className="d-flex align-items-center justify-content-center gap-2 profile-btn-outline"
                    >
                      <i className="bi bi-pencil"></i>
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="d-flex gap-2">
                      <button
                        onClick={handleUpdateProfile}
                        className="d-flex align-items-center justify-content-center gap-2 profile-btn"
                      >
                        <i className="bi bi-check-lg"></i>
                        <span>Save</span>
                      </button>

                      <button
                        onClick={handleToggleEdit}
                        className="d-flex align-items-center justify-content-center gap-2 profile-btn-cancel"
                      >
                        <i className="bi bi-x-lg"></i>
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Card.Header>

            <Card.Body className="p-4">
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label className="profile-tag-title fw-semibold text-light">
                    Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={profileInfo.username}
                    disabled
                    className="profile-form-control text-light"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="profile-tag-title fw-semibold text-light">
                    Full Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={profileInfo.fullName}
                    onChange={(e) =>
                      handleProfileInfoChange("fullName", e.target.value)
                    }
                    disabled={!isEditMode}
                    className="profile-form-control text-light"
                  />
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-4">
                  <Form.Label className="profile-tag-title fw-semibold text-light">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={profileInfo.email}
                    disabled
                    placeholder="your.email@example.com"
                    className="profile-form-control text-light"
                  />
                </Form.Group>

                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="profile-tag-title fw-semibold text-light">
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
                        className="profile-form-control text-light"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="profile-tag-title fw-semibold text-light">
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
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label className="profile-tag-title fw-semibold text-light">
                    Bio
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={profileInfo.bio}
                    onChange={(e) =>
                      handleProfileInfoChange("bio", e.target.value)
                    }
                    disabled={!isEditMode}
                    placeholder="Tell us about yourself..."
                    className="profile-form-control text-light"
                  />
                </Form.Group>
                <Form.Group className="mb-0">
                  <Form.Label className="profile-tag-title fw-semibold text-light">
                    Last Login
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={profileInfo.lastLoginAt}
                    disabled
                    className="profile-form-control text-light"
                  />
                  <Form.Text className="text-muted text-lingt">
                    This field is read-only and automatically updated.
                  </Form.Text>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default ProfileComplete;

/*
   
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
   */
