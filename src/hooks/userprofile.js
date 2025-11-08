import { useState, useEffect } from "react";
import { profileService } from "../services/profileServices";

export default function useProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const data = await profileService.getProfileById(userId);
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } 
    })();
  }, [userId]);

  return { profile, error };
}
