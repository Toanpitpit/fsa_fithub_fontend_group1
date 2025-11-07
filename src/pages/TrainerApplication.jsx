import { useState, useRef } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { FaUser, FaFileAlt, FaUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "../style/TrainerApplication.css";
import { useTrainerApplication } from "../hooks/useTrainerApplication";

export default function TrainerApplication() {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const {
    formData,
    selectedFiles,
    isLoading,
    submitSuccess,
    error,
    handleFieldChange,
    handleFileSelect,
    removeFile,
    removeAllFiles,
    submitApplication,
    resetForm,
  } = useTrainerApplication();

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
    removeFile(index);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveAllFiles = () => {
    removeAllFiles();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Submit application (validation and upload handled by hook)
    const result = await submitApplication();

    if (result.success) {
      // Reset form after success
      setTimeout(() => {
        resetForm();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 3000);
    }
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
          {/* Qualifications Field */}
          <Form.Group className="mb-4 position-relative">
            <Form.Label className="trainer-label">Qualifications</Form.Label>
            <Form.Control
              type="textarea"
              name="qualifications"
              placeholder="Enter your qualifications (e.g., Certified Personal Trainer, Nutrition Specialist)"
              value={formData.qualifications}
              onChange={handleFieldChange}
              className="trainer-input"
              disabled={isLoading}
            />
            <FaUser className="trainer-input-icon" />
          </Form.Group>

          {/* Experience Details Field */}
          <Form.Group className="mb-4 position-relative">
            <Form.Label className="trainer-label">Experience Details</Form.Label>
            <Form.Control
              type="textarea"
              name="experience_details"
              placeholder="Describe your experience (e.g., 5+ years training clients in yoga and HIIT)"
              value={formData.experience_details}
              onChange={handleFieldChange}
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

