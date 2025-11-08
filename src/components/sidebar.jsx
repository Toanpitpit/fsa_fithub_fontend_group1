import { useState } from "react";
import { Menu, Search, Square, Triangle, LogOut } from "lucide-react";
import { NAV_ITEMS_BY_ROLE } from "../constants/constant";
import "../style/Sidebar.css";

export default function Sidebar({ role = "pt" }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = NAV_ITEMS_BY_ROLE[role] || [];

  const integrations = [
    {
      icon: Square,
      label: "Vvix Studio",
      bgColor: "bg-white",
      borderColor: "border",
    },
    { icon: Triangle, label: "Vercel", bgColor: "bg-dark" },
    { icon: Square, label: "Framer", bgColor: "bg-info" },
  ];

  return (
    <div className={`admin-sidebar ${isCollapsed ? "collapsed" : "expanded"}`}>
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="brand">
            <div className="text-center mb-8">
              <h1 className="admin-logo-title">
                <span className="logo-fit-text">Fit</span>
                <span className="logo-hub-text">Hub</span>
              </h1>
            </div>
          </div>
        )}
        <button
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu size={26} />
        </button>
      </div>

      {!isCollapsed && (
        <div className="search-container">
          <div className="search-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
            />
          </div>
        </div>
      )}

      <nav className="sidebar-nav">
        <div className="nav-items">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              icon={item.icon}
              label={item.label}
              active={item.active}
              collapsed={isCollapsed}
            />
          ))}
        </div>

        {/* <div className="integrations-section">
          {!isCollapsed && <p className="section-title">Integrations</p>}
          <div className="nav-items">
            {integrations.map((item, index) => (
              <IntegrationLink
                key={index}
                icon={item.icon}
                label={item.label}
                bgColor={item.bgColor}
                borderColor={item.borderColor}
                collapsed={isCollapsed}
              />
            ))}
          </div>
        </div> */}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            alt="User"
            className="user-avatar"
          />
          {!isCollapsed && (
            <>
              <div className="user-info">
                <p className="user-name">Natalia</p>
                <p className="user-email">natalia@fancy.ui</p>
              </div>
              <button className="logout-btn">
                <LogOut size={22} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function NavLink({ icon: Icon, label, active = false, collapsed }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`nav-link ${active ? "active" : ""} ${
        isHovered ? "hovered" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon size={28} className="nav-icon" />
      {!collapsed && <span className="nav-label">{label}</span>}
      {collapsed && isHovered && <div className="tooltip">{label}</div>}
    </button>
  );
}

function IntegrationLink({
  icon: Icon,
  label,
  bgColor,
  borderColor,
  collapsed,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`nav-link integration-link ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`integration-icon ${bgColor} ${borderColor || ""}`}>
        <Icon size={22} className="icon-svg" />
      </div>
      {!collapsed && <span className="nav-label">{label}</span>}
      {collapsed && isHovered && <div className="tooltip">{label}</div>}
    </button>
  );
}
