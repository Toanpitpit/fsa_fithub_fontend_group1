import { useState } from 'react';
import {
  Home,
  Search,
  FileText,
  BarChart3,
  MousePointerClick,
  FlaskConical,
  Square,
  Triangle,
  Menu,
  LogOut,
} from 'lucide-react';
import '../style/Sidebar.css';

export  default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: Home, label: 'Dashboard', active: false },
    { icon: FileText, label: 'CMS', active: false },
    { icon: BarChart3, label: 'Forms', active: false },
    { icon: MousePointerClick, label: 'Clicks', active: false },
    { icon: FlaskConical, label: 'Split Testing', active: false },
  ];

  const integrations = [
    { icon: Square, label: 'Vvix Studio', bgColor: 'bg-white', borderColor: 'border' },
    { icon: Triangle, label: 'Vercel', bgColor: 'bg-dark' },
    { icon: Square, label: 'Framer', bgColor: 'bg-info' },
  ];

  return (
    <div className={`admin-sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
     
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="brand">
            <div className="brand-icon">
              <span>V</span>
            </div>
            <span className="brand-name">Veloce</span>
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
              onClick={() => {
                if (isCollapsed) {
                  setIsCollapsed(false);
                }
              }}
              collapsed={isCollapsed}
            />
          ))}
        </div>

        {/* Integrations Section */}
        <div className="integrations-section">
          {!isCollapsed && (
            <p className="section-title">Integrations</p>
          )}
          <div className="nav-items">
            {integrations.map((item, index) => (
              <IntegrationLink
                key={index}
                icon={item.icon}
                onClick={() => {
                  if (isCollapsed) {
                    setIsCollapsed(false);
                  }
                }}
                label={item.label}
                bgColor={item.bgColor}
                borderColor={item.borderColor}
                collapsed={isCollapsed}
              />
            ))}
          </div>
        </div>
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

function NavLink({ icon: Icon, label, active = false, collapsed, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`nav-link ${active ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Icon size={28} className="nav-icon" />
      {!collapsed && <span className="nav-label">{label}</span>}
      {collapsed && isHovered && (
        <div className="tooltip">
          {label}
        </div>
      )}
    </button>
  );
}

function IntegrationLink({ icon: Icon, label, bgColor, borderColor, collapsed, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`nav-link integration-link ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={`integration-icon ${bgColor} ${borderColor || ''}`}>
        <Icon size={22} className="icon-svg" />
      </div>
      {!collapsed && <span className="nav-label">{label}</span>}
      {collapsed && isHovered && (
        <div className="tooltip">
          {label}
        </div>
      )}
    </button>
  );
}
