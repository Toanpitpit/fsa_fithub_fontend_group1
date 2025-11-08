import axios from 'axios';
import { API_ENDPOINTS } from '../constants/constant';

// Cấu hình axios instance
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để tự động thêm token vào header (nếu có)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Config Service
export const configService = {
  /**
   * Get upload configuration from backend
   * @returns {Promise<Object>} Upload config including maxFileSize, maxFiles, allowedTypes
   */
  getUploadConfig: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.UPLOAD_CONFIG);

      if (response.data && response.data.success && response.data.data) {
        return {
          success: true,
          data: response.data.data,
        };
      }

      throw new Error('Invalid response from server');
    } catch (error) {
      console.error('Failed to get upload config:', error);
      
      // Return default config on error
      return {
        success: false,
        data: {
          maxFileSize: 10 * 1024 * 1024, // 10MB
          maxFileSizeMB: 10,
          maxFiles: 10,
          allowedTypes: [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp',
            'application/pdf',
          ],
          allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf'],
        },
        error: error.message,
      };
    }
  },
};

