import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/constant';
import { getRefreshToken } from './authStorage';


// Auth Service
export const authService = {
  /**
   * Đăng ký tài khoản mới
   * @param {Object} userData - Dữ liệu đăng ký
   * @returns {Promise} Response từ server
   */
  register: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);
      return response.data;
    } catch (error) {
      // Xử lý lỗi từ backend
      if (error.response) {
        // Server trả về response với status code lỗi
        throw new Error(error.response.data.message || 'Registration failed');
      } else if (error.request) {
        // Request được gửi nhưng không nhận được response
        throw new Error('Unable to connect to server. Please check your network connection.');
      } else {
        // Lỗi khác
        throw new Error('An error occurred. Please try again.');
      }
    }
  },

  /**
   * Xác thực email
   * @param {string} token - Token xác thực
   * @returns {Promise} Response từ server
   */
  verifyEmail: async (token) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.VERIFY_EMAIL}?token=${token}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Email verification failed');
      } else {
        throw new Error('An error occurred. Please try again.');
      }
    }
  },

  /**
   * Gửi lại email xác thực
   * @param {string} email - Email cần gửi lại xác thực
   * @returns {Promise} Response từ server
   */
  resendVerificationEmail: async (email) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.RESEND_VERIFICATION_EMAIL, { email });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Unable to resend verification email');
      } else if (error.request) {
        throw new Error('Unable to connect to server. Please check your network connection.');
      } else {
        throw new Error('An error occurred. Please try again.');
      }
    }
  },
  getUserFromRefresh: async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await apiClient.post(API_ENDPOINTS.ME_FROM_REFRESH, {
        refresh_token: refreshToken,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to get user');
      } else if (error.request) {
        throw new Error('Unable to connect to server.');
      } else {
        throw new Error('An error occurred. Please try again.');
      }
    }
  },

};

