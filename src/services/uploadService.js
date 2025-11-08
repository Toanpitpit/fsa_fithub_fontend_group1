import axios from 'axios';
import { API_ENDPOINTS } from '../constants/constant';

// Cấu hình axios instance cho upload file
const uploadClient = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Interceptor để tự động thêm token vào header (nếu có)
uploadClient.interceptors.request.use(
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

      const response = await uploadClient.post(
        API_ENDPOINTS.UPLOAD_SINGLE_FILE,
        formData
      );

      // Trả về URL từ response
      if (response.data && response.data.data && response.data.data.url) {
        return response.data.data.url;
      }

      throw new Error('URL không tồn tại trong response');
    } catch (error) {
      // Xử lý lỗi từ backend
      if (error.response) {
        // Server trả về response với status code lỗi
        throw new Error(error.response.data.message || 'Upload file thất bại');
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

      const response = await uploadClient.post(
        API_ENDPOINTS.UPLOAD_MULTIPLE_FILES,
        formData
      );

      // Trả về mảng URL từ response
      if (response.data && response.data.data) {
        // Nếu response.data.data là array
        if (Array.isArray(response.data.data)) {
          return response.data.data.map((item) => item.url);
        }
        // Nếu response.data.data.url là array
        if (Array.isArray(response.data.data.url)) {
          return response.data.data.url;
        }
        // Nếu response.data.data.url là string duy nhất
        if (response.data.data.url) {
          return [response.data.data.url];
        }
      }

      throw new Error('URL không tồn tại trong response');
    } catch (error) {
      // Xử lý lỗi từ backend
      if (error.response) {
        // Server trả về response với status code lỗi
        throw new Error(
          error.response.data.message || 'Upload các file thất bại'
        );
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
};

