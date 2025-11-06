import React, { useEffect, useState, useCallback } from 'react';
import { useNotificationContext } from '../contexts/NotificationContext';
import '../style/NotificationToast.css';

/**
 * Component hiển thị toast notification cho các thông báo mới
 * Tự động hiện và tự động ẩn sau 5 giây
 */
export const NotificationToast = () => {
  const { notifications } = useNotificationContext();
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[0];
      
      // Chỉ show toast cho notification mới (trong vòng 5 giây)
      const notificationAge = Date.now() - new Date(latestNotification.createdAt).getTime();
      
      if (notificationAge < 5000) {
        // Kiểm tra xem toast này đã được show chưa
        const alreadyShown = toasts.some(t => t.id === latestNotification.id);
        
        if (!alreadyShown) {
          const newToast = {
            id: latestNotification.id,
            ...latestNotification
          };

          // Thêm toast mới, giữ tối đa 3 toasts
          setToasts(prev => [newToast, ...prev.slice(0, 2)]);

          // Auto remove sau 5 giây
          setTimeout(() => {
            removeToast(newToast.id);
          }, 5000);
        }
      }
    }
  }, [notifications, toasts, removeToast]);

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

  const getNotificationColor = (type) => {
    const colors = {
      LIKE: '#ef4444',
      COMMENT: '#3b82f6',
      COURSE_ENROLL: '#10b981',
      LESSON_COMPLETE: '#22c55e',
      COMMENT_REPLIED: '#8b5cf6',
      SYSTEM_NOTIFICATION: '#f59e0b',
      OTHER: '#6b7280'
    };
    return colors[type] || colors.OTHER;
  };

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className="toast"
          style={{ borderLeftColor: getNotificationColor(toast.type) }}
        >
          <div className="toast-icon">
            {toast.senderAvatar ? (
              <img 
                src={toast.senderAvatar} 
                alt={toast.senderName}
                className="toast-avatar"
              />
            ) : (
              <span className="toast-emoji">
                {getNotificationIcon(toast.type)}
              </span>
            )}
          </div>
          
          <div className="toast-content">
            <div className="toast-header">
              <strong>{toast.type.replace(/_/g, ' ')}</strong>
            </div>
            <div className="toast-body">
              {toast.senderName && (
                <span className="toast-sender">{toast.senderName}</span>
              )}
              <span className="toast-message">{toast.content}</span>
            </div>
          </div>
          
          <button 
            className="toast-close"
            onClick={() => removeToast(toast.id)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

