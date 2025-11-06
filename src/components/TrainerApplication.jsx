import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {
  FaUser,
  FaPhone,
  FaFileUpload,
  FaFilePdf,
  FaTimes,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useFileUpload } from "../hooks/useFileUpload";
import "../style/TrainerApplication.css";

export default function TrainerApplication() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { uploadFiles, isLoading, error, progress } = useFileUpload();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length !== files.length) {
      alert("Chỉ chấp nhận file PDF!");
      return;
    }

    setSelectedFiles((prev) => [...prev, ...pdfFiles]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Validate form
    if (!formData.fullName.trim()) {
      setSubmitError("Vui lòng nhập họ tên đầy đủ.");
      return;
    }

    if (!formData.phoneNumber.trim()) {
      setSubmitError("Vui lòng nhập số điện thoại.");
      return;
    }

    if (selectedFiles.length === 0) {
      setSubmitError("Vui lòng upload ít nhất một file PDF.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload files
      const result = await uploadFiles(selectedFiles, {
        maxFiles: 10,
        maxSize: 10 * 1024 * 1024, // 10MB per file
        allowedTypes: ["application/pdf"],
      });

      if (result.success) {
        setUploadedUrls(result.urls);

        // TODO: Submit form data with file URLs to backend
        const applicationData = {
          fullName: formData.fullName.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          certificates: result.urls,
        };

        console.log("Application Data:", applicationData);

        // Simulate API call
        // const response = await submitTrainerApplication(applicationData);

        setSubmitSuccess(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({ fullName: "", phoneNumber: "" });
          setSelectedFiles([]);
          setUploadedUrls([]);
          setSubmitSuccess(false);
        }, 3000);
      } else {
        setSubmitError(result.error || "Upload thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      setSubmitError("Đã có lỗi xảy ra. Vui lòng thử lại.");
      console.error("Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="trainer-application-container">
      <div className="trainer-application-card">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="trainer-application-content"
        >
          <div className="application-header">
            <h2 className="application-title">Đăng Ký Trở Thành Huấn Luyện Viên</h2>
            <p className="application-subtitle">
              Điền thông tin và tải lên các chứng chỉ của bạn
            </p>
          </div>

          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="alert alert-success d-flex align-items-center"
              role="alert"
            >
              <FaCheckCircle className="me-2" />
              Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.
            </motion.div>
          )}

          {submitError && (
            <div className="alert alert-danger" role="alert">
              {submitError}
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Full Name */}
            <Form.Group className="mb-4 position-relative">
              <Form.Label className="form-label">Họ Tên Đầy Đủ</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Nhập họ tên đầy đủ"
                value={formData.fullName}
                onChange={handleInputChange}
                className="trainer-input"
                disabled={isSubmitting || submitSuccess}
              />
              <FaUser className="input-icon" />
            </Form.Group>

            {/* Phone Number */}
            <Form.Group className="mb-4 position-relative">
              <Form.Label className="form-label">Số Điện Thoại</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                placeholder="Nhập số điện thoại"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="trainer-input"
                disabled={isSubmitting || submitSuccess}
              />
              <FaPhone className="input-icon" />
            </Form.Group>

            {/* File Upload Section */}
            <Form.Group className="mb-4">
              <Form.Label className="form-label">
                Chứng Chỉ / Bằng Cấp (PDF)
              </Form.Label>
              <div className="upload-area">
                <input
                  type="file"
                  id="pdfUpload"
                  accept="application/pdf"
                  multiple
                  onChange={handleFileSelect}
                  className="file-input"
                  disabled={isSubmitting || submitSuccess}
                />
                <label htmlFor="pdfUpload" className="upload-label">
                  <FaFileUpload className="upload-icon" />
                  <span className="upload-text">
                    Nhấn để chọn file hoặc kéo thả file vào đây
                  </span>
                  <span className="upload-hint">
                    Chỉ chấp nhận file PDF (tối đa 10MB mỗi file)
                  </span>
                </label>
              </div>
            </Form.Group>

            {/* Selected Files List */}
            {selectedFiles.length > 0 && (
              <div className="selected-files-section mb-4">
                <h6 className="selected-files-title">
                  Các file đã chọn ({selectedFiles.length})
                </h6>
                <div className="selected-files-list">
                  {selectedFiles.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="file-item"
                    >
                      <FaFilePdf className="file-icon" />
                      <div className="file-info">
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">{formatFileSize(file.size)}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="remove-file-btn"
                        disabled={isSubmitting || submitSuccess}
                      >
                        <FaTimes />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Progress */}
            {isLoading && (
              <div className="upload-progress-section mb-4">
                <div className="progress-bar-wrapper">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">Đang upload: {progress}%</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="trainer-submit-btn"
              disabled={isSubmitting || isLoading || submitSuccess}
            >
              {isSubmitting || isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Đang xử lý...
                </>
              ) : submitSuccess ? (
                <>
                  <FaCheckCircle className="me-2" />
                  Đã gửi thành công
                </>
              ) : (
                <>
                  Gửi Đơn Đăng Ký
                  <FaArrowRight className="btn-icon" />
                </>
              )}
            </Button>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}

