import { useState } from 'react';
import { passwordService } from '../services/passwordService';

/**
 * Custom hook để quản lý logic đổi mật khẩu
 */
const useChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordErrors, setPasswordErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  /**
   * Cập nhật giá trị của một field trong password data
   */
  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
    // Xóa error của field đó khi user bắt đầu nhập
    if (passwordErrors[field]) {
      setPasswordErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  /**
   * Toggle hiển thị/ẩn mật khẩu
   */
  const toggleShowPassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  /**
   * Validate form đổi mật khẩu
   */
  const validatePassword = () => {
    const errors = {};

    // Validate current password
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    // Validate new password
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else {
      const validation = passwordService.validateNewPassword(passwordData.newPassword);
      if (!validation.isValid) {
        errors.newPassword = validation.errors[0]; // Display first error
      }
    }

    // Validate confirm password
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Check if new password is same as current password
    if (
      passwordData.currentPassword &&
      passwordData.newPassword &&
      passwordData.currentPassword === passwordData.newPassword
    ) {
      errors.newPassword = 'New password must be different from current password';
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Submit form đổi mật khẩu
   */
  const handleSubmitPassword = async () => {
    if (!validatePassword()) {
      return { success: false };
    }

    setIsLoading(true);
    try {
      const result = await passwordService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if (result.success) {
        // Reset form
        resetPasswordForm();
        return { success: true, message: 'Password changed successfully!' };
      } else {
        // Display error from server
        setPasswordErrors((prev) => ({
          ...prev,
          currentPassword: result.error,
        }));
        return { success: false, error: result.error };
      }
    } catch (error) {
      return {
        success: false,
        error: 'An error occurred. Please try again.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset form về trạng thái ban đầu
   */
  const resetPasswordForm = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordErrors({});
    setShowPassword({
      current: false,
      new: false,
      confirm: false,
    });
  };

  return {
    passwordData,
    passwordErrors,
    isLoading,
    showPassword,
    handlePasswordChange,
    toggleShowPassword,
    handleSubmitPassword,
    resetPasswordForm,
  };
};

export default useChangePassword;

