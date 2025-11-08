import { useState } from 'react';
import { uploadService } from '../services/uploadService';

/**
 * Custom Hook để xử lý upload file
 */
export const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

    // Check if file exists
    if (!file) {
      return 'Please select a file to upload.';
    }

    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
      return `File size exceeds the limit (${maxSizeMB}MB).`;
    }

    // Check file type
    if (allowedTypes && Array.isArray(allowedTypes)) {
      if (!allowedTypes.includes(file.type)) {
        return `File type not supported. Only accept: ${allowedTypes.join(', ')}`;
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

    // Check if files exist
    if (!files || files.length === 0) {
      return 'Please select at least one file to upload.';
    }

    // Check number of files
    if (files.length > maxFiles) {
      return `Maximum ${maxFiles} files allowed at once.`;
    }

    // Validate each file
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
   * @param {Object} options - Các tùy chọn validate và upload (optional)
   * @param {string} options.folder - Folder path để lưu file (e.g., "trainers/certificates")
   * @returns {Promise<Object>} - {success: boolean, url?: string, error?: string}
   */
  const uploadFile = async (file, options = {}) => {
    setError('');

    // Validate file
    const validationError = validateFile(file, options);
    if (validationError) {
      setError(validationError);
      return { success: false, error: validationError };
    }

    setIsLoading(true);

    try {
      // Gọi API upload với folder (nếu có)
      const url = await uploadService.uploadSingleFile(file, options.folder);

      console.log('Upload successful:', url);

      return { success: true, url };
    } catch (err) {
      // Handle error
      const errorMessage = err.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      console.error('Upload error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Hàm xử lý upload nhiều file
   * @param {File[]} files - Mảng các file cần upload
   * @param {Object} options - Các tùy chọn validate và upload (optional)
   * @param {string} options.folder - Folder path để lưu file (e.g., "trainers/certificates")
   * @returns {Promise<Object>} - {success: boolean, urls?: string[], error?: string}
   */
  const uploadFiles = async (files, options = {}) => {
    setError('');

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
      // Gọi API upload với folder (nếu có)
      const urls = await uploadService.uploadMultipleFiles(fileArray, options.folder);

      console.log('Upload successful:', urls);

      return { success: true, urls };
    } catch (err) {
      // Handle error
      const errorMessage = err.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      console.error('Upload error:', err);
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
   * Reset tất cả state
   */
  const reset = () => {
    setError('');
    setIsLoading(false);
  };

  return {
    uploadFile,
    uploadFiles,
    isLoading,
    error,
    resetError,
    reset,
  };
};

