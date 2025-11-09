import axios from 'axios';
import { API_ENDPOINTS } from '../constants/constant';
import {
  getRefreshToken,
  isRefreshTokenExpired,
} from "../services/authStorage";
// Cấu hình axios instance
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để tự động thêm token vào header (nếu có)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const res = await authService.getUserFromRefresh();
        if (res?.data?.access_token) {
          localStorage.setItem('access_token', res.data.access_token);
          error.config.headers.Authorization = `Bearer ${res.data.access_token}`;
          return apiClient.request(error.config); 
        }
      } catch {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);


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
        throw new Error(error.response.data.message || 'Đăng ký thất bại');
      } else if (error.request) {
        // Request được gửi nhưng không nhận được response
        throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
      } else {
        // Lỗi khác
        throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    }
  },

  // /**
  //  * Đăng nhập
  //  * @param {Object} credentials - Username và password
  //  * @returns {Promise} Response từ server
  //  */
  // login: async (credentials) => {
  //   try {
  //     const response = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
  //     // Lưu token vào localStorage
  //     if (response.data.token) {
  //       localStorage.setItem('token', response.data.token);
  //     }
  //     return response.data;
  //   } catch (error) {
  //     if (error.response) {
  //       throw new Error(error.response.data.message || 'Đăng nhập thất bại');
  //     } else if (error.request) {
  //       throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
  //     } else {
  //       throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại.');
  //     }
  //   }
  // },

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
        throw new Error(error.response.data.message || 'Xác thực email thất bại');
      } else {
        throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại.');
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
        throw new Error(error.response.data.message || 'Không thể gửi lại email xác thực');
      } else if (error.request) {
        throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
      } else {
        throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    }
  },
  getUserFromRefresh: async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('Không có refresh token');

    const response = await apiClient.post(API_ENDPOINTS.ME_FROM_REFRESH, {
      refresh_token: refreshToken,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Lấy user thất bại');
    } else if (error.request) {
      throw new Error('Không thể kết nối đến server.');
    } else {
      throw new Error('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
  }
},

};

