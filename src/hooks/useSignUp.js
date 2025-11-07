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
      return 'Vui lòng nhập username.';
    }
    if (!fullname?.trim()) {
      return 'Vui lòng nhập họ tên đầy đủ.';
    }
    if (!email?.trim()) {
      return 'Vui lòng nhập email.';
    }
    if (!dateOfBirth) {
      return 'Vui lòng chọn ngày sinh.';
    }
    if (!gender) {
      return 'Vui lòng chọn giới tính.';
    }
    if (!password) {
      return 'Vui lòng nhập mật khẩu.';
    }
    if (!confirmPassword) {
      return 'Vui lòng xác nhận mật khẩu.';
    }

    // Kiểm tra username
    if (username.length < USERNAME_MIN_LENGTH || username.length > USERNAME_MAX_LENGTH) {
      return `Username phải từ ${USERNAME_MIN_LENGTH} đến ${USERNAME_MAX_LENGTH} ký tự.`;
    }
    if (!USERNAME_REGEX.test(username)) {
      return 'Username chỉ chứa chữ cái, số và dấu gạch dưới.';
    }

    // Kiểm tra fullname
    if (fullname.length < 2 || fullname.length > 100) {
      return 'Họ tên phải từ 2 đến 100 ký tự.';
    }
    if (!FULLNAME_REGEX.test(fullname)) {
      return 'Họ tên chỉ chứa chữ cái và khoảng trắng.';
    }

    // Kiểm tra email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email không hợp lệ.';
    }
    if (email.length > 100) {
      return 'Email không được vượt quá 100 ký tự.';
    }

    // Kiểm tra ngày sinh (phải là ngày trong quá khứ)
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    
    if (birthDate >= today) {
      return 'Ngày sinh phải là ngày trong quá khứ.';
    }

    // Kiểm tra tuổi tối thiểu
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    
    const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
    
    if (actualAge < MIN_AGE) {
      return `Bạn phải từ ${MIN_AGE} tuổi trở lên để đăng ký.`;
    }

    // Kiểm tra password match
    if (password !== confirmPassword) {
      return 'Mật khẩu xác nhận không khớp.';
    }

    // Kiểm tra độ mạnh password (theo backend requirement)
    if (password.length < PASSWORD_MIN_LENGTH) {
      return `Mật khẩu phải có ít nhất ${PASSWORD_MIN_LENGTH} ký tự.`;
    }
    if (!PASSWORD_REGEX.test(password)) {
      return 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt (@$!%*?&#).';
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
      setError('Bạn cần chấp nhận điều khoản để tiếp tục.');
      return { success: false, error: 'Bạn cần chấp nhận điều khoản để tiếp tục.' };
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
        gender: formData.gender.toUpperCase(),
      };

      console.log('Sending registration data:', dataToSend);

      // Gọi API
      const response = await authService.register(dataToSend);

      // Success
      setSuccessMessage(
        'Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.'
      );

      console.log('Registration successful:', response);

      return { success: true, data: response };
    } catch (err) {
      // Handle error
      const errorMessage = err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
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
