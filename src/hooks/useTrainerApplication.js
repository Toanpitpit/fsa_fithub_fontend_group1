import { useState } from "react";
import { useFileUpload } from "./useFileUpload";
import { trainerService } from "../services/trainerService";
import { useUploadConfig } from "./useUploadConfig";

export function useTrainerApplication() {
  const [formData, setFormData] = useState({
    qualifications: "",
    experience_details: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [validationError, setValidationError] = useState(null);

  const { uploadFiles, isLoading, error: uploadError, resetError } = useFileUpload();
  const { config: uploadConfig, loading: configLoading } = useUploadConfig();

  // Validate form fields
  const validateForm = () => {
    setValidationError(null);

    if (!formData.qualifications.trim()) {
      setValidationError("Please enter your qualifications!");
      return false;
    }

    if (!formData.experience_details.trim()) {
      setValidationError("Please enter your experience details!");
      return false;
    }

    if (selectedFiles.length === 0) {
      setValidationError("Please select at least one certificate file (PDF)!");
      return false;
    }

    return true;
  };

  // Validate file selection
  const validateFiles = (files) => {
    const fileArray = Array.from(files);
    const invalidFiles = fileArray.filter(file => file.type !== "application/pdf");
    
    if (invalidFiles.length > 0) {
      setValidationError("Only PDF files are accepted!");
      return null;
    }
    
    return fileArray;
  };

  // Handle form field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setValidationError(null);
  };

  // Handle file selection
  const handleFileSelect = (files) => {
    const validatedFiles = validateFiles(files);
    
    if (validatedFiles) {
      setSelectedFiles(prev => [...prev, ...validatedFiles]);
      resetError();
      setValidationError(null);
    }
  };

  // Remove a single file
  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Remove all files
  const removeAllFiles = () => {
    setSelectedFiles([]);
    setUploadedUrls([]);
  };

  // Submit the application
  const submitApplication = async () => {
    resetError();
    setSubmitSuccess(false);

    // Validate form
    if (!validateForm()) {
      return { success: false, error: validationError };
    }

    // Upload all files to trainers/certificates folder
    // Use document-specific config from backend or fallback to defaults
    const maxSizeMb = uploadConfig?.maxDocumentUploadSizeMb || 10.0;
    const maxFiles = uploadConfig?.maxTrainerDocuments || 10;
    
    const uploadResult = await uploadFiles(selectedFiles, {
      folder: "trainers/certificates",
      maxSize: maxSizeMb * 1024 * 1024, // Convert MB to bytes
      maxFiles: maxFiles,
      allowedTypes: ["application/pdf"], // Only PDF for certificates
    });

    if (!uploadResult.success) {
      return { success: false, error: uploadResult.error };
    }

    setUploadedUrls(uploadResult.urls);

    // Prepare application data
    const applicationData = {
      qualifications: formData.qualifications.trim(),
      experience_details: formData.experience_details.trim(),
      certificateUrls: uploadResult.urls,
    };

    // Submit to backend API
    try {
      const submitResult = await trainerService.submitApplication(applicationData);
      
      if (!submitResult.success) {
        setValidationError(submitResult.message || "Failed to submit application");
        return { success: false, error: submitResult.message };
      }

      console.log("Application submitted successfully:", submitResult.data);

      // Mark as successful
      setSubmitSuccess(true);
      
      return { 
        success: true, 
        data: submitResult.data,
        message: submitResult.message,
        urls: uploadResult.urls 
      };
    } catch (err) {
      const errorMessage = err.message || "An error occurred while submitting application";
      setValidationError(errorMessage);
      console.error("Submit application error:", err);
      return { success: false, error: errorMessage };
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({ qualifications: "", experience_details: "" });
    setSelectedFiles([]);
    setUploadedUrls([]);
    setSubmitSuccess(false);
    setValidationError(null);
    resetError();
  };

  return {
    // Form data
    formData,
    selectedFiles,
    uploadedUrls,
    
    // States
    isLoading: isLoading || configLoading,
    submitSuccess,
    error: validationError || uploadError,
    uploadConfig, // Expose config for UI display
    
    // Actions
    handleFieldChange,
    handleFileSelect,
    removeFile,
    removeAllFiles,
    submitApplication,
    resetForm,
    resetError: () => {
      resetError();
      setValidationError(null);
    },
  };
}

