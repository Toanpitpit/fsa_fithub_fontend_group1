import { useState } from 'react';
import { uploadService } from '../services/uploadService';

/**
 * Custom Hook để xử lý upload file
 */
export const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);

  /**
   * Validate file
   * @param {File} file - File cần validate
   * @param {Object} options - Các tùy chọn validate (optional)
   * @returns {string|null} - Trả về error message hoặc null nếu hợp lệ
   */
  const validateFile = (file, options = {}) => {
    const {
      maxSize = 10 * 1024 * 1024, // 10MB mặc định
      allowedTypes = null, // null = cho phép tất cả, hoặc array như ['image/jpeg', 'image/png']
    } = options;

    // Kiểm tra file tồn tại
    if (!file) {
      return 'Vui lòng chọn file để upload.';
    }

    // Kiểm tra kích thước file
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
      return `File vượt quá kích thước cho phép (${maxSizeMB}MB).`;
    }

    // Kiểm tra loại file
    if (allowedTypes && Array.isArray(allowedTypes)) {
      if (!allowedTypes.includes(file.type)) {
        return `Định dạng file không được hỗ trợ. Chỉ chấp nhận: ${allowedTypes.join(', ')}`;
      }
    }

    return null;
  };

  /**
   * Validate nhiều file
   * @param {File[]} files - Mảng các file cần validate
   * @param {Object} options - Các tùy chọn validate (optional)
   * @returns {string|null} - Trả về error message hoặc null nếu hợp lệ
   */
  const validateFiles = (files, options = {}) => {
    const { maxFiles = 10 } = options;

    // Kiểm tra có file không
    if (!files || files.length === 0) {
      return 'Vui lòng chọn ít nhất một file để upload.';
    }

    // Kiểm tra số lượng file
    if (files.length > maxFiles) {
      return `Chỉ được upload tối đa ${maxFiles} file cùng lúc.`;
    }

    // Validate từng file
    for (let i = 0; i < files.length; i++) {
      const fileError = validateFile(files[i], options);
      if (fileError) {
        return `File "${files[i].name}": ${fileError}`;
      }
    }

    return null;
  };

  /**
   * Hàm xử lý upload một file
   * @param {File} file - File cần upload
   * @param {Object} options - Các tùy chọn validate (optional)
   * @returns {Promise<Object>} - {success: boolean, url?: string, error?: string}
   */
  const uploadFile = async (file, options = {}) => {
    setError('');
    setProgress(0);

    // Validate file
    const validationError = validateFile(file, options);
    if (validationError) {
      setError(validationError);
      return { success: false, error: validationError };
    }

    setIsLoading(true);

    try {
      // Callback để cập nhật progress
      const onUploadProgress = (percent) => {
        setProgress(percent);
      };

      // Gọi API upload
      const url = await uploadService.uploadSingleFile(file, onUploadProgress);

      console.log('Upload successful:', url);
      setProgress(100);

      return { success: true, url };
    } catch (err) {
      // Handle error
      const errorMessage = err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      setError(errorMessage);
      console.error('Upload error:', err);
      setProgress(0);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Hàm xử lý upload nhiều file
   * @param {File[]} files - Mảng các file cần upload
   * @param {Object} options - Các tùy chọn validate (optional)
   * @returns {Promise<Object>} - {success: boolean, urls?: string[], error?: string}
   */
  const uploadFiles = async (files, options = {}) => {
    setError('');
    setProgress(0);

    // Chuyển đổi FileList sang Array nếu cần
    const fileArray = Array.isArray(files) ? files : Array.from(files);

    // Validate files
    const validationError = validateFiles(fileArray, options);
    if (validationError) {
      setError(validationError);
      return { success: false, error: validationError };
    }

    setIsLoading(true);

    try {
      // Callback để cập nhật progress
      const onUploadProgress = (percent) => {
        setProgress(percent);
      };

      // Gọi API upload
      const urls = await uploadService.uploadMultipleFiles(
        fileArray,
        onUploadProgress
      );

      console.log('Upload successful:', urls);
      setProgress(100);

      return { success: true, urls };
    } catch (err) {
      // Handle error
      const errorMessage = err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      setError(errorMessage);
      console.error('Upload error:', err);
      setProgress(0);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset error message
   */
  const resetError = () => {
    setError('');
  };

  /**
   * Reset progress
   */
  const resetProgress = () => {
    setProgress(0);
  };

  /**
   * Reset tất cả state
   */
  const reset = () => {
    setError('');
    setProgress(0);
    setIsLoading(false);
  };

  return {
    uploadFile,
    uploadFiles,
    isLoading,
    error,
    progress,
    resetError,
    resetProgress,
    reset,
  };
};

