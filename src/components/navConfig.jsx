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
