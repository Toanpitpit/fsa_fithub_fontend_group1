import { Navigate } from "react-router-dom";

export function getAccessToken() {
  // Ưu tiên sessionStorage (login không remember)
  const sessionToken = sessionStorage.getItem("access_token");
  if (sessionToken) return sessionToken;

  // Nếu không có trong sessionStorage → thử localStorage
  const localToken = localStorage.getItem("access_token");
  return localToken || null;
}

export function getRefreshToken() {
  const sessionRefresh = sessionStorage.getItem("refresh_token");
  if (sessionRefresh) return sessionRefresh;

  const localRefresh = localStorage.getItem("refresh_token");
  return localRefresh || null;
}

export function clearAccessTokens() {
  localStorage.removeItem("access_token");
  sessionStorage.removeItem("access_token");
  localStorage.removeItem("access_expiry");
  localStorage.removeItem("refresh_expiry");
  sessionStorage.removeItem("access_expiry");
  sessionStorage.removeItem("refresh_expiry");
}

export function clearRefreshTokens() {
  localStorage.removeItem("refresh_token");
  sessionStorage.removeItem("refresh_token");
  localStorage.removeItem("access_expiry");
  localStorage.removeItem("refresh_expiry");
  sessionStorage.removeItem("access_expiry");
  sessionStorage.removeItem("refresh_expiry");
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  sessionStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  sessionStorage.removeItem("refresh_token");
   localStorage.removeItem("access_expiry");
  localStorage.removeItem("refresh_expiry");
  sessionStorage.removeItem("access_expiry");
  sessionStorage.removeItem("refresh_expiry");
}

// export function isAccessTokenExpired() {
//   const now = Date.now();
//   const accessExpiry =
//     Number(sessionStorage.getItem("access_expiry")) ||
//     Number(localStorage.getItem("access_expiry"));

//   return !accessExpiry ? true : now > accessExpiry ? true : false;
// }

export function isAccessTokenExpired() {
  const rememberMe = localStorage.getItem("remember_me") === "true";
  const storage = rememberMe ? localStorage : sessionStorage;

  const token = storage.getItem("access_token");
  const expiry = Number(storage.getItem("access_expiry"));

  // Nếu token null hoặc expiry không tồn tại → coi là expired
  if (!token || !expiry) return true;

  // Nếu thời gian hiện tại vượt quá expiry → expired
  return Date.now() > expiry;
}

export function isRefreshTokenExpired() {
  const rememberMe = localStorage.getItem("remember_me") === "true";
  const storage = rememberMe ? localStorage : sessionStorage;

  const token = storage.getItem("refresh_token");
  const expiry = Number(storage.getItem("refresh_expiry"));

  if (!token || !expiry) return true;

  return Date.now() > expiry;
}

