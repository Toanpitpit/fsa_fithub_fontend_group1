import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/constant';

// Upload Service
export const uploadService = {
  /**
   * Upload một file duy nhất lên cloud
   * @param {File} file - File cần upload
   * @param {string} folder - Folder path (optional, e.g., "trainers/certificates")
   * @returns {Promise<string>} URL của file đã upload
   */
  uploadSingleFile: async (file, folder = null) => {
    try {
      // Tạo FormData và thêm file
      const formData = new FormData();
      formData.append('file', file);
      
      // Thêm folder nếu có
      if (folder) {
        formData.append('folder', folder);
      }

      const response = await apiClient.post(
        API_ENDPOINTS.UPLOAD_SINGLE_FILE,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      // Trả về URL từ response
      if (response.data && response.data.data && response.data.data.url) {
        return response.data.data.url;
      }

      throw new Error('URL not found in response');
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'File upload failed');
      } else if (error.request) {
        throw new Error(
          'Cannot connect to server. Please check your network connection.'
        );
      } else {
        throw new Error(error.message || 'An error occurred. Please try again.');
      }
    }
  },

  /**
   * Upload nhiều file cùng lúc lên cloud
   * @param {File[]} files - Mảng các file cần upload
   * @param {string} folder - Folder path (optional, e.g., "trainers/certificates")
   * @returns {Promise<string[]>} Mảng URL của các file đã upload
   */
  uploadMultipleFiles: async (files, folder = null) => {
    try {
      // Tạo FormData và thêm tất cả các file
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      
      // Thêm folder nếu có
      if (folder) {
        formData.append('folder', folder);
      }

      const response = await apiClient.post(
        API_ENDPOINTS.UPLOAD_MULTIPLE_FILES,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      if (response.data && response.data.data) {
        if (Array.isArray(response.data.data)) {
          return response.data.data.map((item) => item.url);
        }
        if (Array.isArray(response.data.data.url)) {
          return response.data.data.url;
        }
        if (response.data.data.url) {
          return [response.data.data.url];
        }
      }

      throw new Error('URL not found in response');
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || 'Multiple files upload failed'
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

