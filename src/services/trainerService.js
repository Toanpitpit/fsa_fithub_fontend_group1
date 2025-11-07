import axios from 'axios';
import { API_ENDPOINTS } from '../constants/constant';

// Cấu hình axios instance
const trainerClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để tự động thêm token vào header
trainerClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
      const response = await trainerClient.post(
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
        
        // Xử lý các trường hợp lỗi cụ thể
        if (error.response.status === 401) {
          throw new Error('Bạn cần đăng nhập để submit application');
        } else if (error.response.status === 400) {
          throw new Error(errorMessage);
        } else if (error.response.status === 409) {
          throw new Error('Bạn đã submit application rồi');
        } else {
          throw new Error(errorMessage);
        }
      } else if (error.request) {
        // Request được gửi nhưng không nhận được response
        throw new Error(
          'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.'
        );
      } else {
        // Lỗi khác
        throw new Error(error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    }
  },

  /**
   * Get trainer application status (for future use)
   * @returns {Promise<Object>} Application status
   */
  getApplicationStatus: async () => {
    try {
      const response = await trainerClient.get(
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
          'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.'
        );
      } else {
        throw new Error(error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    }
  },
};

