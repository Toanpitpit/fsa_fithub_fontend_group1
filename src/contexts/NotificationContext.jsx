import React, { createContext, useContext } from 'react';
import { useNotifications } from '../hooks/useNotifications';

const NotificationContext = createContext(null);

/**
 * Provider component để wrap app và provide notification state
 * 
 * Usage:
 * <NotificationProvider>
 *   <App />
 * </NotificationProvider>
 */
export const NotificationProvider = ({ children }) => {
  const notifications = useNotifications();

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * Custom hook để sử dụng notification context
 * 
 * Usage trong component:
 * const { notifications, unreadCount, markAsRead } = useNotificationContext();
 */
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error(
      'useNotificationContext must be used within NotificationProvider'
    );
  }
  
  return context;
};

