import { useState, useRef } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { FaUser, FaFileAlt, FaUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "../style/TrainerApplication.css";
import { useFileUpload } from "../hooks/useFileUpload";

export default function TrainerApplication() {
  const [formData, setFormData] = useState({
    fullName: "",
    specialty: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const { uploadFiles, isLoading, error, progress, resetError } = useFileUpload();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (files) => {
    // Convert to array if needed
    const fileArray = Array.from(files);
    
    // Validate all files are PDF
    const invalidFiles = fileArray.filter(file => file.type !== "application/pdf");
    
    if (invalidFiles.length > 0) {
      alert("Chỉ chấp nhận file PDF!");
      return;
    }
    
    // Add new files to existing ones
    setSelectedFiles(prev => [...prev, ...fileArray]);
    resetError();
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveAllFiles = () => {
    setSelectedFiles([]);
    setUploadedUrls([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetError();
    setSubmitSuccess(false);

    // Validate
    if (!formData.fullName.trim()) {
      alert("Vui lòng nhập họ tên đầy đủ!");
      return;
    }
    if (!formData.specialty.trim()) {
      alert("Vui lòng nhập chuyên môn!");
      return;
    }
    if (selectedFiles.length === 0) {
      alert("Vui lòng chọn ít nhất một file chứng chỉ (PDF)!");
      return;
    }

    // Upload all files
    const uploadResult = await uploadFiles(selectedFiles, {
      maxSize: 10 * 1024 * 1024, // 10MB per file
      maxFiles: 10,
      allowedTypes: ["application/pdf"],
    });

    if (!uploadResult.success) {
      return;
    }

    setUploadedUrls(uploadResult.urls);

    // TODO: Submit form data with uploaded URLs to backend
    const applicationData = {
      fullName: formData.fullName.trim(),
      specialty: formData.specialty.trim(),
      certificateUrls: uploadResult.urls,
    };

    console.log("Application Data:", applicationData);

    // Simulate success
    setSubmitSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ fullName: "", specialty: "" });
      setSelectedFiles([]);
      setUploadedUrls([]);
      setSubmitSuccess(false);
    }, 3000);
  };

  return (
    <div className="trainer-application-container">
      <div className="trainer-application-card">
        <div className="trainer-header">
          <h2 className="trainer-title">Become a FitHub Trainer</h2>
          <p className="trainer-subtitle">
            Share your expertise and help others achieve their fitness goals
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="alert alert-success d-flex align-items-center" role="alert">
            <FaCheckCircle className="me-2" />
            <span>Application submitted successfully! We'll review it soon.</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <FaTimesCircle className="me-2" />
            <span>{error}</span>
          </div>
        )}

        <Form onSubmit={handleSubmit} className="trainer-form">
          {/* Full Name Field */}
          <Form.Group className="mb-4 position-relative">
            <Form.Label className="trainer-label">Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="trainer-input"
              disabled={isLoading}
            />
            <FaUser className="trainer-input-icon" />
          </Form.Group>

          {/* Specialty Field */}
          <Form.Group className="mb-4 position-relative">
            <Form.Label className="trainer-label">Specialty</Form.Label>
            <Form.Control
              type="text"
              name="specialty"
              placeholder="e.g., Yoga, Weight Training, HIIT"
              value={formData.specialty}
              onChange={handleChange}
              className="trainer-input"
              disabled={isLoading}
            />
            <FaFileAlt className="trainer-input-icon" />
          </Form.Group>

          {/* Certificate Upload Field */}
          <Form.Group className="mb-4">
            <Form.Label className="trainer-label">
              Certificates (PDF only) - Multiple files allowed
            </Form.Label>
            
            <div
              className={`trainer-file-drop-zone ${isDragging ? "dragging" : ""} ${
                selectedFiles.length > 0 ? "has-file" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                multiple
                onChange={handleFileInputChange}
                style={{ display: "none" }}
                disabled={isLoading}
              />

              {selectedFiles.length === 0 ? (
                <div className="trainer-drop-zone-content">
                  <FaUpload className="trainer-upload-icon" />
                  <p className="trainer-drop-zone-title">
                    Drag & drop your PDF certificates here
                  </p>
                  <p className="trainer-drop-zone-subtitle">or</p>
                  <Button
                    variant="outline-primary"
                    onClick={handleBrowseClick}
                    disabled={isLoading}
                    className="trainer-browse-btn"
                  >
                    Browse Files
                  </Button>
                  <p className="trainer-drop-zone-info">
                    Maximum file size: 10MB per file | Maximum 10 files
                  </p>
                </div>
              ) : (
                <div className="trainer-files-container">
                  <div className="trainer-files-header">
                    <span className="trainer-files-count">
                      {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""} selected
                    </span>
                    {!isLoading && (
                      <Button
                        variant="link"
                        onClick={handleRemoveAllFiles}
                        className="trainer-clear-all-btn"
                      >
                        Clear All
                      </Button>
                    )}
                  </div>
                  <div className="trainer-files-list">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="trainer-selected-file-info">
                        <FaFileAlt className="trainer-file-icon" />
                        <div className="trainer-file-details">
                          <p className="trainer-file-name">{file.name}</p>
                          <p className="trainer-file-size">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                        {!isLoading && (
                          <Button
                            variant="link"
                            onClick={() => handleRemoveFile(index)}
                            className="trainer-remove-file-btn"
                          >
                            <FaTimesCircle />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  {!isLoading && (
                    <Button
                      variant="outline-secondary"
                      onClick={handleBrowseClick}
                      className="trainer-add-more-btn"
                    >
                      + Add More Files
                    </Button>
                  )}
                </div>
              )}

              {/* Upload Progress */}
              {isLoading && (
                <div className="trainer-upload-progress">
                  <div className="trainer-progress-bar-container">
                    <div
                      className="trainer-progress-bar-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="trainer-progress-text">Uploading {selectedFiles.length} file(s)... {progress}%</p>
                </div>
              )}
            </div>
          </Form.Group>

          {/* Submit Button */}
          <Button
            type="submit"
            className="trainer-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Submitting...
              </>
            ) : (
              <>
                Submit Application
                <FaCheckCircle className="trainer-btn-icon ms-2" />
              </>
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
}

