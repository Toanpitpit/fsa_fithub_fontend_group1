import React from 'react';
import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import useChangePassword from '../hooks/useChangePassword';
import '../style/ChangePassword.css';

const ChangePassword = ({ show, onHide, onSuccess }) => {
  const {
    passwordData,
    passwordErrors,
    isLoading,
    showPassword,
    handlePasswordChange,
    toggleShowPassword,
    handleSubmitPassword,
    resetPasswordForm,
  } = useChangePassword();

  const handleClose = () => {
    resetPasswordForm();
    onHide();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleSubmitPassword();
    
    if (result.success) {
      handleClose();
      if (onSuccess) {
        onSuccess(result.message);
      }
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered
      dialogClassName="change-password-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          <i className="bi bi-key me-2"></i> Change Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted mb-4">
          Update your password to keep your account secure.
        </p>
        <Form onSubmit={handleSubmit}>
          {/* Current Password */}
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword.current ? 'text' : 'password'}
                placeholder="Enter current password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  handlePasswordChange('currentPassword', e.target.value)
                }
                isInvalid={!!passwordErrors.currentPassword}
                disabled={isLoading}
              />
              <Button
                variant="outline-secondary"
                onClick={() => toggleShowPassword('current')}
                disabled={isLoading}
              >
                <i
                  className={`bi ${
                    showPassword.current ? 'bi-eye-slash' : 'bi-eye'
                  }`}
                ></i>
              </Button>
              <Form.Control.Feedback type="invalid">
                {passwordErrors.currentPassword}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* New Password */}
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword.new ? 'text' : 'password'}
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  handlePasswordChange('newPassword', e.target.value)
                }
                isInvalid={!!passwordErrors.newPassword}
                disabled={isLoading}
              />
              <Button
                variant="outline-secondary"
                onClick={() => toggleShowPassword('new')}
                disabled={isLoading}
              >
                <i
                  className={`bi ${
                    showPassword.new ? 'bi-eye-slash' : 'bi-eye'
                  }`}
                ></i>
              </Button>
              <Form.Control.Feedback type="invalid">
                {passwordErrors.newPassword}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Text className="text-muted">
              Password must be at least 8 characters, including uppercase, lowercase, numbers and special characters.
            </Form.Text>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword.confirm ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  handlePasswordChange('confirmPassword', e.target.value)
                }
                isInvalid={!!passwordErrors.confirmPassword}
                disabled={isLoading}
              />
              <Button
                variant="outline-secondary"
                onClick={() => toggleShowPassword('confirm')}
                disabled={isLoading}
              >
                <i
                  className={`bi ${
                    showPassword.confirm ? 'bi-eye-slash' : 'bi-eye'
                  }`}
                ></i>
              </Button>
              <Form.Control.Feedback type="invalid">
                {passwordErrors.confirmPassword}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={handleClose} 
          disabled={isLoading}
          className="change-password-btn-cancel"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="change-password-btn-primary"
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Processing...
            </>
          ) : (
            'Change Password'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePassword;

