import React, { useState, useRef, useEffect } from 'react';
import { useNotificationContext } from '../contexts/NotificationContext';
import '../style/NotificationDropdown.css';

export const NotificationDropdown = () => {
  const {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    markAllAsRead
  } = useNotificationContext();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    
    // Navigate to related content based on referenceType
    if (notification.referenceType && notification.referenceId) {
      switch (notification.referenceType) {
        case 'post':
          // Navigate to post detail
          console.log('Navigate to post:', notification.referenceId);
          // window.location.href = `/posts/${notification.referenceId}`;
          break;
        case 'course':
          // Navigate to course detail
          console.log('Navigate to course:', notification.referenceId);
          // window.location.href = `/courses/${notification.referenceId}`;
          break;
        case 'lesson':
          // Navigate to lesson
          console.log('Navigate to lesson:', notification.referenceId);
          break;
        case 'comment':
          // Navigate to comment
          console.log('Navigate to comment:', notification.referenceId);
          break;
        default:
          console.log('No navigation for type:', notification.referenceType);
      }
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    return date.toLocaleDateString('en-US');
  };

  const getNotificationIcon = (type) => {
    const icons = {
      LIKE: '❤️',
      COMMENT: '💬',
      COURSE_ENROLL: '📚',
      LESSON_COMPLETE: '✅',
      COMMENT_REPLIED: '↩️',
      SYSTEM_NOTIFICATION: '📢',
      OTHER: '🔔'
    };
    return icons[type] || icons.OTHER;
  };

  const handleMarkAllAsRead = (e) => {
    e.stopPropagation();
    markAllAsRead();
  };

  return (
    <div className="notification-dropdown" ref={dropdownRef}>
      <button 
        className="notification-bell"
        onClick={() => setIsOpen(!isOpen)}
        title="Notifications"
      >
        <span className="bell-icon">🔔</span>
        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
        {!isConnected && (
          <span 
            className="connection-indicator offline" 
            title="Disconnected - notifications may be delayed"
          />
        )}
      </button>

      {isOpen && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className="mark-all-read-btn"
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="empty-notifications">
                <div className="empty-icon">🔔</div>
                <p>No notifications</p>
                <small>You will receive notifications when there are new activities</small>
              </div>
            ) : (
              notifications.slice(0, 20).map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    notification.isRead ? '' : 'unread'
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="notification-icon">
                    {notification.senderAvatar ? (
                      <img 
                        src={notification.senderAvatar} 
                        alt={notification.senderName}
                        className="sender-avatar"
                      />
                    ) : (
                      <span className="icon-emoji">
                        {getNotificationIcon(notification.type)}
                      </span>
                    )}
                  </div>
                  
                  <div className="notification-content">
                    <div className="notification-text">
                      {notification.senderName && (
                        <span className="sender-name">
                          {notification.senderName}
                        </span>
                      )}
                      <span className="notification-message">
                        {notification.content}
                      </span>
                    </div>
                    <div className="notification-time">
                      {formatTimeAgo(notification.createdAt)}
                    </div>
                  </div>

                  {!notification.isRead && (
                    <div className="unread-indicator" />
                  )}
                </div>
              ))
            )}
          </div>

          {notifications.length > 20 && (
            <div className="notification-footer">
              <a href="/notifications" onClick={(e) => e.stopPropagation()}>
                View all {notifications.length} notifications
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

