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
    { icon: Home, label: "Dashboard", key: "dashboard" },
    { icon: ClipboardList, label: "PT Applications", key: "pt-applications" },
    { icon: MousePointerClick, label: "Approve Post Requests", key: "approve-posts" },
    { icon: Layers, label: "Approve Course Requests", key: "approve-courses" },
    { icon: BarChart3, label: "Statistics", key: "statistics" },
  ],

  adminSystem: [
    { icon: Home, label: "Dashboard", key: "dashboard" },
    { icon: Users, label: "User Management", key: "user-management" },
    { icon: FlaskConical, label: "Revenue Report", key: "revenue-report" },
    { icon: Settings, label: "System Configuration", key: "system-config" },
  ],

  pt: [
    { icon: Home, label: "Dashboard", key: "dashboard" },
    { icon: MousePointerClick, label: "My Requests", key: "my-requests" },
    { icon: FileText, label: "My Posts", key: "my-posts" },
    { icon: BookOpen, label: "My Courses", key: "my-courses" },
    { icon: DollarSign, label: "My Revenue", key: "my-revenue" },
  ],
};


// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
  RESEND_VERIFICATION_EMAIL: `${API_BASE_URL}/auth/resend-verification-email`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  
};

// App Constants
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
export const FULLNAME_REGEX = /^[\p{L}\s]+$/u;

export const MIN_AGE = 13;
export const PASSWORD_MIN_LENGTH = 8;
export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 50;

