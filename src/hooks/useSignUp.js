import { useState } from 'react';
import { authService } from '../services/authService';
import {
  PASSWORD_REGEX,
  USERNAME_REGEX,
  FULLNAME_REGEX,
  MIN_AGE,
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
} from '../constants/constant';

/**
 * Custom Hook để xử lý đăng ký tài khoản
 */
export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Validate form data
   * @param {Object} formData - Dữ liệu form
   * @returns {string|null} - Trả về error message hoặc null nếu hợp lệ
   */
  const validateForm = (formData) => {
    const { username, fullname, email, dateOfBirth, gender, password, confirmPassword } = formData;

    // Kiểm tra trống
    if (!username?.trim()) {
      return 'Please enter username.';
    }
    if (!fullname?.trim()) {
      return 'Please enter full name.';
    }
    if (!email?.trim()) {
      return 'Please enter email.';
    }
    if (!dateOfBirth) {
      return 'Please select date of birth.';
    }
    if (!gender) {
      return 'Please select gender.';
    }
    if (!password) {
      return 'Please enter password.';
    }
    if (!confirmPassword) {
      return 'Please confirm password.';
    }

    // Kiểm tra username
    if (username.length < USERNAME_MIN_LENGTH || username.length > USERNAME_MAX_LENGTH) {
      return `Username must be between ${USERNAME_MIN_LENGTH} and ${USERNAME_MAX_LENGTH} characters.`;
    }
    if (!USERNAME_REGEX.test(username)) {
      return 'Username can only contain letters, numbers and underscores.';
    }

    // Kiểm tra fullname
    if (fullname.length < 2 || fullname.length > 100) {
      return 'Full name must be between 2 and 100 characters.';
    }
    if (!FULLNAME_REGEX.test(fullname)) {
      return 'Full name can only contain letters and spaces.';
    }

    // Kiểm tra email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email is invalid.';
    }
    if (email.length > 100) {
      return 'Email cannot exceed 100 characters.';
    }

    // Kiểm tra ngày sinh (phải là ngày trong quá khứ)
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    
    if (birthDate >= today) {
      return 'Date of birth must be a date in the past.';
    }

    // Kiểm tra tuổi tối thiểu
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    
    const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
    
    if (actualAge < MIN_AGE) {
      return `You must be at least ${MIN_AGE} years old to register.`;
    }

    // Kiểm tra password match
    if (password !== confirmPassword) {
      return 'Password confirmation does not match.';
    }

    // Kiểm tra độ mạnh password (theo backend requirement)
    if (password.length < PASSWORD_MIN_LENGTH) {
      return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
    }
    if (!PASSWORD_REGEX.test(password)) {
      return 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character (@$!%*?&#).';
    }

    return null;
  };

  /**
   * Hàm xử lý đăng ký
   * @param {Object} formData - Dữ liệu form
   * @param {boolean} isAgree - Đã đồng ý điều khoản hay chưa
   * @returns {Promise<Object>} - {success: boolean, data?: any, error?: string}
   */
  const signUp = async (formData, isAgree) => {
    setError('');
    setSuccessMessage('');

    // Validate terms agreement
    if (!isAgree) {
      setError('You need to accept the terms to continue.');
      return { success: false, error: 'You need to accept the terms to continue.' };
    }

    // Validate form data
    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return { success: false, error: validationError };
    }

    setIsLoading(true);

    try {
      // Chuẩn bị dữ liệu gửi về backend
      const dataToSend = {
        username: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        fullName: formData.fullname.trim(),
        dateOfBirth: formData.dateOfBirth, // YYYY-MM-DD
        gender: formData.gender.toUpperCase(), // Backend có enum Gender (MALE, FEMALE, OTHER)
      };

      console.log('Sending registration data:', dataToSend);

      // Gọi API
      const response = await authService.register(dataToSend);

      // Success
      setSuccessMessage(
        'Registration successful! Please check your email to verify your account.'
      );

      console.log('Registration successful:', response);

      return { success: true, data: response };
    } catch (err) {
      // Handle error
      const errorMessage = err.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Xóa các thông báo lỗi/thành công
   */
  const clearMessages = () => {
    setError('');
    setSuccessMessage('');
  };

  return {
    signUp,
    isLoading,
    error,
    successMessage,
    clearMessages,
  };
};
