import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import "../style/Profile.css";
import { Camera } from "lucide-react";
import { useParams } from "react-router-dom";
import useProfile from "../hooks/userprofile";
import { avatar_url_default, cover_url_default } from "../constants/constant";
import ChangePassword from "./ChangePassword";
import Toast from "./Home/Toast";

function ProfileComplete(user) {
  const { id } = useParams();

  
  const {
    profile,
    handleAvatarSelect,
    handleCoverSelect,
    updateProfile,
    reloadProfile,
    isLoading,
    isEditable,
  } = useProfile(id, user);

  const [isEditMode, setIsEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const coverFileInputRef = useRef(null);
  const avatarFileInputRef = useRef(null);
  const [toastMsg, setToastMsg] = useState("");

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

  const handleToggleEdit = () => setIsEditMode(!isEditMode);

  const handleProfileInfoChange = (field, value) => {
    setProfileInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = async () => {
    if (!profileInfo.fullName.trim()) {
      alert("Full name cannot be empty");
      return;
    }

    const updatedData = {
      fullName: profileInfo.fullName,
      gender: profileInfo.gender,
      dateOfBirth: profileInfo.dateOfBirth,
      bio: profileInfo.bio,
    };

    const res = await updateProfile(updatedData);
    if (res.success) {
      setToastMsg(res.data?.message);
      await reloadProfile();
      setIsEditMode(false);
    } else {
      alert(res.error || "Update failed!");
      await reloadProfile();
    }
  };

  const handleCoverChange = () => coverFileInputRef.current?.click();
  const handleAvatarChange = () => avatarFileInputRef.current?.click();

  const handleCoverFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      handleCoverSelect([file]);
      setProfileInfo((prev) => ({
        ...prev,
        coverUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      handleAvatarSelect([file]);
      setProfileInfo((prev) => ({
        ...prev,
        avatarUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handlePasswordChangeSuccess = (message) => {
    setToastMsg(message || "Password changed successfully!");
  };

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

      <div className="toast-wrapper">
        {toastMsg && (
          <Toast
            message={toastMsg}
            onClose={() => setToastMsg("")}
            duration={4000}
          />
        )}
      </div>

      <Container
        fluid
        style={{ maxWidth: "1200px" }}
        className="profile-container"
      >
        <div className="position-relative">
          <div className="profile-cover-container">
            <img
              src={profileInfo.coverUrl || cover_url_default}
              alt="Cover"
              className="profile-cover-image"
            />
            {isEditMode && (
              <button
                onClick={handleCoverChange}
                className="btn btn-light profile-camera-btn-cover d-flex align-items-center justify-content-center"
                title="Change cover photo"
              >
                <Camera size={20} className="fs-5" />
              </button>
            )}
          </div>

          <div className="profile-avatar-wrapper">
            <div className="profile-avatar-container">
              <Image
                src={profileInfo.avatarUrl || avatar_url_default}
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
            <h1 className="h2 mb-2 text-light fw-semibold">
              {profileInfo.fullName}
            </h1>
            <p className="text-light mb-1">@{profileInfo.username}</p>
          </div>

          <Card className="profile-card">
            <Card.Header className="profile-card-header">
              <div className="d-flex justify-content-between align-items-md-center gap-3">
                <h5 className="mb-2 text-light">Profile Information</h5>
                {isEditable && (
                  <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 w-100 w-md-auto">
                    <button
                      className="d-flex align-items-center justify-content-center gap-2 profile-btn-outline"
                      onClick={() => setShowPasswordModal(true)}
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
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm text-light"
                                role="status"
                              ></span>
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <i className="bi bi-check-lg"></i>
                              <span>Save</span>
                            </>
                          )}
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
                )}
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

                <Form.Group className="mb-4">
                  <Form.Label className="profile-tag-title fw-semibold text-light">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={profileInfo.email}
                    disabled
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
                    placeholder="Tell they something about you!!"
                    disabled={!isEditMode}
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

      <ChangePassword
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        onSuccess={handlePasswordChangeSuccess}
      />
    </div>
  );
}

export default ProfileComplete;
