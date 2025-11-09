import { useState } from 'react';
import { authService } from '../services/authService';

/**
 * Custom Hook để xử lý gửi lại email xác thực
 * @returns {Object} - resendEmail function, isLoading, status, message
 */
export const useResendVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', null
  const [message, setMessage] = useState('');

 
  const resendEmail = async (email) => {
    setIsLoading(true);
    setStatus(null);
    setMessage('');

    try {
      const response = await authService.resendVerificationEmail(email);
      
      if (response.success) {
        setStatus('success');
        setMessage(response.message || 'Verification email has been resent successfully!');
      } else {
        setStatus('error');
        setMessage(response.message || 'Unable to resend email.');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'An error occurred while resending email.');
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
    resendEmail,
    status,
    message,
    isLoading,
    clearMessages,
  };
};

