import React from 'react';
import { NotificationDropdown } from './NotificationDropdown';

/**
 * Example Header Component với Notification Dropdown
 * 
 * Bạn có thể thêm NotificationDropdown vào header/navbar hiện có của mình
 */
export const HeaderWithNotification = () => {
  return (
    <header className="app-header" style={headerStyles}>
      <div className="header-left" style={headerLeftStyles}>
        <h1 style={logoStyles}>
          <span style={{ color: '#667eea' }}>Fit</span>
          <span style={{ color: '#764ba2' }}>Hub</span>
        </h1>
      </div>
      
      <div className="header-center" style={headerCenterStyles}>
        {/* Search bar hoặc navigation links */}
      </div>
      
      <div className="header-right" style={headerRightStyles}>
        {/* User profile, settings, etc */}
        <div style={{ marginRight: '10px' }}>
          <button style={iconButtonStyles}>⚙️</button>
        </div>
        
        {/* Notification Dropdown */}
        <NotificationDropdown />
        
        {/* User Avatar */}
        <div style={{ marginLeft: '10px' }}>
          <img 
            src="https://via.placeholder.com/40" 
            alt="User"
            style={avatarStyles}
          />
        </div>
      </div>
    </header>
  );
};

// Inline styles for example (use CSS in production)
const headerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 24px',
  backgroundColor: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 100
};

const headerLeftStyles = {
  display: 'flex',
  alignItems: 'center'
};

const logoStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: 0
};

const headerCenterStyles = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  padding: '0 20px'
};

const headerRightStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const iconButtonStyles = {
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  padding: '8px',
  borderRadius: '50%',
  transition: 'background-color 0.2s'
};

const avatarStyles = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  cursor: 'pointer'
};

