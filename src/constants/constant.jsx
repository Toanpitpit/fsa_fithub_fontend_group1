import {
  Home,
  FileText,
  BarChart3,
  MousePointerClick,
  FlaskConical,
  Users,
  Settings,
  BookOpen,
  DollarSign,
  ClipboardList,
  Layers,
} from "lucide-react";

export const NAV_ITEMS_BY_ROLE = {
  adminContent: [
    { icon: Home, label: "Dashboard" },
    { icon: ClipboardList, label: "PT Applications" },
    { icon: MousePointerClick, label: "Approve Post Requests" },
    { icon: Layers, label: "Approve Course Requests" },
    { icon: BarChart3, label: "Statistics" },
  ],

  adminSystem: [
    { icon: Home, label: "Dashboard" },
    { icon: Users, label: "User Management" },
    { icon: FlaskConical, label: "Revenue Report" },
    { icon: Settings, label: "System Configuration" },
  ],

  pt: [
    { icon: Home, label: "Dashboard" },
    { icon: MousePointerClick, label: "My Requests" },
    { icon: FileText, label: "My Posts" },
    { icon: BookOpen, label: "My Courses" },
    { icon: DollarSign, label: "My Revenue" },
  ],
};

export const avatar_url_default =
  "https://images.unsplash.com/photo-1570170609489-43197f518df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIzMTE5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080";
export const cover_url_default =
  "https://images.unsplash.com/photo-1689094195667-3dae89dd11fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGUlMjBiYW5uZXJ8ZW58MXx8fHwxNzYyMjY2MDA1fDA&ixlib=rb-4.1.0&q=80&w=1080";
// API Configuration
export const API_BASE_URL = "http://localhost:8080/api";

export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
  RESEND_VERIFICATION_EMAIL: `${API_BASE_URL}/auth/resend-verification-email`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  PROFILE: `${API_BASE_URL}/profile`,
  UPLOAD_MULTIPLE_FILES: `${API_BASE_URL}/upload/multiple`,
  UPLOAD_SINGLE_FILE: `${API_BASE_URL}/upload/single`,
  TRAINER_APPLICATION: `${API_BASE_URL}/trainer/application`,
  ME_FROM_REFRESH:`${API_BASE_URL}/auth/me-from-refresh`
};

// App Constants
export const PASSWORD_REGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
export const FULLNAME_REGEX = /^[\p{L}\s]+$/u;

export const MIN_AGE = 13;
export const PASSWORD_MIN_LENGTH = 8;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 50;
