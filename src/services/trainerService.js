import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/constant';

// Trainer Service
export const trainerService = {
  /**
   * Submit trainer application
   * @param {Object} applicationData - Data của trainer application
   * @param {string} applicationData.qualifications - Trình độ chuyên môn
   * @param {string} applicationData.experience_details - Chi tiết kinh nghiệm
   * @param {string[]} applicationData.certificateUrls - Mảng URLs của certificates
   * @returns {Promise<Object>} Response từ server
   */
  submitApplication: async (applicationData) => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.TRAINER_APPLICATION,
        applicationData
      );

      // Trả về data từ response
      if (response.data && response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || 'Application submitted successfully',
        };
      }

      throw new Error('Invalid response from server');
    } catch (error) {
      // Xử lý lỗi từ backend
      if (error.response) {
        // Server trả về response với status code lỗi
        const errorMessage = error.response.data.message || 'Failed to submit application';
        
        // Handle specific error cases
        if (error.response.status === 401) {
          throw new Error('You need to login to submit application');
        } else if (error.response.status === 400) {
          throw new Error(errorMessage);
        } else if (error.response.status === 409) {
          throw new Error('You have already submitted an application');
        } else {
          throw new Error(errorMessage);
        }
      } else if (error.request) {
        // Request sent but no response received
        throw new Error(
          'Cannot connect to server. Please check your network connection.'
        );
      } else {
        // Other errors
        throw new Error(error.message || 'An error occurred. Please try again.');
      }
    }
  },

  /**
   * Get trainer application status (for future use)
   * @returns {Promise<Object>} Application status
   */
  getApplicationStatus: async () => {
    try {
      const response = await apiClient.get(
        `${API_ENDPOINTS.TRAINER_APPLICATION}/status`
      );

      if (response.data && response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      throw new Error('Invalid response from server');
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || 'Failed to get application status'
        );
      } else if (error.request) {
        throw new Error(
          'Cannot connect to server. Please check your network connection.'
        );
      } else {
        throw new Error(error.message || 'An error occurred. Please try again.');
      }
    }
  },
};

