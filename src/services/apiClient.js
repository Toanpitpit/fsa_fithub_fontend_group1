import axios from 'axios';
import { API_ENDPOINTS } from '../constants/constant';
import { getRefreshToken } from './authStorage';

/**
 * Shared Axios instance with interceptors for all services
 * - Request interceptor: Automatically adds access token to headers
 * - Response interceptor: Automatically refreshes token on 401 errors
 */
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add access token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Auto refresh token on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 (Unauthorized) and haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Use plain axios to avoid circular dependency
        const refreshResponse = await axios.post(
          API_ENDPOINTS.ME_FROM_REFRESH,
          { refresh_token: refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (refreshResponse?.data?.access_token) {
          // Save new access token
          const newAccessToken = refreshResponse.data.access_token;
          localStorage.setItem('access_token', newAccessToken);
          
          // Update authorization header
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          
          // Retry original request with new token
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - clear storage and redirect to login
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

