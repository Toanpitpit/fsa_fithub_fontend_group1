import { useState, useEffect } from "react";
import { profileService } from "../services/profileServices";
import { useFileUpload } from "./useFileUpload";

export default function useProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [uploadedUrls, setUploadedUrls] = useState({ avatar: null, cover: null });
  const [isUpdating, setIsUpdating] = useState(false);

  const { uploadFiles, isLoading, error: uploadError, resetError } = useFileUpload();

  const fetchProfile = async () => {
    if (!userId) return;
    try {
      const response = await profileService.getProfileById(userId);
      if (response.success) {
        setProfile(response.data);
        setError(null);
      } else {
        setError(response.message || "Lỗi không xác định");
      }
    } catch (err) {
      setError(err.message || "Không thể tải hồ sơ");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const validateFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Chỉ chấp nhận file ảnh (png, jpg, jpeg)!");
      return null;
    }
    return file;
  };

  const handleAvatarSelect = (files) => {
    const file = validateFile(files[0]);
    if (file) {
      setAvatarFile(file);
      resetError();
      setError(null);
    }
  };

  const handleCoverSelect = (files) => {
    const file = validateFile(files[0]);
    if (file) {
      setCoverFile(file);
      resetError();
      setError(null);
    }
  };

  const uploadImage = async (file, folder) => {
    if (!file) return { success: false };
    const uploadResult = await uploadFiles([file], {
      folder,
      maxSize: 5 * 1024 * 1024,
      allowedTypes: ["image/png", "image/jpeg", "image/jpg"],
    });
    return uploadResult;
  };

  const updateProfile = async (updatedInfo) => {
    setIsUpdating(true);
    resetError();

    const payload = { ...updatedInfo };

    if (avatarFile) {
      const avatarRes = await uploadImage(avatarFile, "users/avatars");
      if (!avatarRes.success) {
        setError(avatarRes.error);
        setIsUpdating(false);
        return { success: false, error: avatarRes.error };
      }
      payload.avatarUrl = avatarRes.urls[0];
      setUploadedUrls((prev) => ({ ...prev, avatarUrl: avatarRes.urls[0] }));
    }

    if (coverFile) {
      const coverRes = await uploadImage(coverFile, "users/covers");
      if (!coverRes.success) {
        setError(coverRes.error);
        setIsUpdating(false);
        return { success: false, error: coverRes.error };
      }
      payload.coverUrl = coverRes.urls[0];
      setUploadedUrls((prev) => ({ ...prev, coverUrl: coverRes.urls[0] }));
    }

    try {
      const res = await profileService.updateProfile(userId, payload);
      if (res.success) {
        await fetchProfile();
        setAvatarFile(null);
        setCoverFile(null);
        return { success: true, data: res.data };
      } else {
        setError(res.message || "Cập nhật thất bại");
        return { success: false, error: res.message };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsUpdating(false);
    }
  };

  const resetProfileUpload = () => {
    setAvatarFile(null);
    setCoverFile(null);
    setUploadedUrls({ avatar: null, cover: null });
    resetError();
    setError(null);
  };

  return {
    profile,
    error: error || uploadError,
    isLoading: isLoading || isUpdating,
    avatarFile,
    coverFile,
    uploadedUrls,
    handleAvatarSelect,
    handleCoverSelect,
    updateProfile,
    resetProfileUpload,
    reloadProfile: fetchProfile,
  };
}
