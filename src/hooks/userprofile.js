import { useState, useEffect, useMemo } from "react";
import { profileService } from "../services/profileServices";
import { useFileUpload } from "./useFileUpload";

export default function useProfile(userId, currentUser) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [uploadedUrls, setUploadedUrls] = useState({ avatar: null, cover: null });
  const [isUpdating, setIsUpdating] = useState(false);

  const { uploadFiles, isLoading, error: uploadError, resetError } = useFileUpload();
  console.log("user : ");
  console.log(currentUser);
  
  
  const fetchProfile = async () => {
    if (!userId) return;
    try {
      const response = await profileService.getProfileById(userId);
      if (response.success) {
        setProfile(response.data);
        setError(null);
      } else {
        setError(response.message || "Unknown error");
      }
    } catch (err) {
      setError(err.message || "Unable to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const isEditable = useMemo(() => {
    if (!currentUser || !profile) return false;
    return currentUser.user.id === profile.id;
  }, [currentUser, profile]);


  const validateFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
        setError("Only image files are accepted (png, jpg, jpeg)!");
      return null;
    }
    return file;
  };

  const handleAvatarSelect = (files) => {
    if (!isEditable) return; // chặn luôn
    const file = validateFile(files[0]);
    if (file) {
      setAvatarFile(file);
      resetError();
      setError(null);
    }
  };

  const handleCoverSelect = (files) => {
    if (!isEditable) return;
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
    if (!isEditable) {
      setError("You do not have permission to edit this profile");
      return { success: false };
    }

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
        setError(res.message || "Update failed");
        return { success: false, error: res.message };
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    profile,
    error: error || uploadError,
    isLoading: isLoading || isUpdating,
    isEditable,
    avatarFile,
    coverFile,
    uploadedUrls,
    handleAvatarSelect,
    handleCoverSelect,
    updateProfile,
    reloadProfile: fetchProfile,
  };
}
