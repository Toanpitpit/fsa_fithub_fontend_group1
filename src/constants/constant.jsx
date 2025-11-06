// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
  RESEND_VERIFICATION_EMAIL: `${API_BASE_URL}/auth/resend-verification-email`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  
};

// App Constants
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
export const FULLNAME_REGEX = /^[\p{L}\s]+$/u;

export const MIN_AGE = 13;
export const PASSWORD_MIN_LENGTH = 8;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 50;

