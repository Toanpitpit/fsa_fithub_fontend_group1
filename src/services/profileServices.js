import axios from "axios";
import { API_ENDPOINTS } from "../constants/constant";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Create Axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // để gửi cookie refresh token
});

// Attach access token before each request
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Auto refresh token if access_token expired
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Nếu 401 (token hết hạn) và chưa retry thì gọi refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post(
                    `${API_BASE_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );
                const newAccess = res.data?.access_token;

                if (newAccess) {
                    localStorage.setItem("access_token", newAccess);
                    apiClient.defaults.headers.Authorization = `Bearer ${newAccess}`;
                    originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                    return apiClient(originalRequest); 
                }
            } catch (refreshError) {
                localStorage.clear();
                window.location.href = "/auth";
            }
        }
        return Promise.reject(error);
    }
);

// Profile Service
export const profileService = {
    /**
     * Get user profile by ID
     * @param {number|string} userId
     * @returns {Promise<Object>} Profile data
     */
    getProfileById: async (userId) => {
        try {
            const res = await apiClient.get(`${API_ENDPOINTS.PROFILE}/${userId}`);
            return res.data;
        } catch (error) {
            if (error.response)
                throw new Error(error.response.data.message || "Failed to fetch user profile");
            throw new Error("Unable to connect to the server. Please try again.");
        }
    },

    /**
     * Update user profile
     * @param {number|string} userId
     * @param {Object} profileData
     * @returns {Promise<Object>} Updated profile data
     */
    updateProfile: async (userId, profileData) => {
        try {
            const res = await apiClient.put(`${API_ENDPOINTS.PROFILE}/${userId}`, profileData);
            return res.data;
        } catch (error) {
            if (error.response)
                throw new Error(error.response.data.message || "Profile update failed");
            else if (error.request)
                throw new Error("Cannot reach the server. Please check your network.");
            throw new Error("An unexpected error occurred. Please try again.");
        }
    },
};
