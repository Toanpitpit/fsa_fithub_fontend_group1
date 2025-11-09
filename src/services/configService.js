import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/constant';


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

