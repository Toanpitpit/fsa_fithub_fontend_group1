import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/constant';

export const passwordService = {
  
  changePassword: async (passwordData) => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.CHANGE_PASSWORD,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (error.response) {
        return {
          success: false,
          error: error.response.data.message || 'Failed to change password',
        };
      } else if (error.request) {
        return {
          success: false,
          error: 'Unable to connect to server. Please check your network connection.',
        };
      } else {
        return {
          success: false,
          error: 'An error occurred. Please try again.',
        };
      }
    }
  },

  validateNewPassword: (password) => {
    const errors = [];
    
    if (!password) {
      errors.push('Password cannot be empty');
    } else {
      if (password.length < 8) {
        errors.push('Password must be at least 8 characters');
      }
      if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least 1 uppercase letter');
      }
      if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least 1 lowercase letter');
      }
      if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least 1 number');
      }
      if (!/[@$!%*?&#]/.test(password)) {
        errors.push('Password must contain at least 1 special character (@$!%*?&#)');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

