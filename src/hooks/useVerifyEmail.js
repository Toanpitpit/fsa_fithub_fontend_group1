import { useState } from 'react';
import { authService } from '../services/authService';

/**
 * Custom Hook để xử lý verify email
 * @returns {Object} - verifyEmail function, status, message, isLoading
 */
export const useVerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(null); // 'success', 'error', null
  const [message, setMessage] = useState('');

  /**
   * Gọi API để verify email
   * @param {string} token - Token từ URL
   */
  const verifyEmail = async (token) => {
    setIsLoading(true);
    setStatus(null);
    setMessage('');

    try {
      const response = await authService.verifyEmail(token);
      
      if (response.success) {
        setStatus('success');
        setMessage(response.message || 'Email verified successfully!');
      } else {
        setStatus('error');
        setMessage(response.message || 'Verification failed.');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'An error occurred during verification.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear messages
   */
  const clearMessages = () => {
    setMessage('');
    setStatus(null);
  };

  return {
    verifyEmail,
    status,
    message,
    isLoading,
    clearMessages,
  };
};

