import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/constant';

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
