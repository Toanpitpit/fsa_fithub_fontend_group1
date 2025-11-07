import { useState, useEffect, useCallback, useRef } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  // Get access token
  const getAuthToken = () => {
    return localStorage.getItem('access_token');
  };

  // Connect to SSE
  const connect = useCallback(() => {
    const token = getAuthToken();
    
    if (!token) {
      setError('No authentication token found');
      return;
    }

    // Close existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      // Note: EventSource không support custom headers trong browser
      // Pass token qua query parameter
      const url = `${API_BASE_URL}/notifications/stream?token=${encodeURIComponent(token)}`;
      const eventSource = new EventSource(url);
      
      eventSource.addEventListener('connected', (event) => {
        console.log('✅ Connected to notification service:', event.data);
        setIsConnected(true);
        setError(null);
      });

      eventSource.addEventListener('notification', (event) => {
        const notification = JSON.parse(event.data);
        console.log('🔔 New notification:', notification);
        
        // Thêm notification mới vào đầu list
        setNotifications(prev => [notification, ...prev]);
        
        // Update unread count
        if (!notification.isRead) {
          setUnreadCount(prev => prev + 1);
        }

        // Trigger browser notification nếu được phép
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(notification.type, {
            body: notification.content,
            icon: '/notification-icon.png',
            badge: '/notification-badge.png'
          });
        }
      });

      eventSource.onerror = (error) => {
        console.error('❌ SSE Error:', error);
        setIsConnected(false);
        setError('Connection lost. Reconnecting...');
        
        eventSource.close();
        
        // Auto reconnect sau 5 giây
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('🔄 Attempting to reconnect...');
          connect();
        }, 5000);
      };

      eventSourceRef.current = eventSource;
    } catch (err) {
      console.error('Failed to connect:', err);
      setError(err.message);
    }
  }, []);

  // Disconnect
  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    setIsConnected(false);
    console.log('🔌 Disconnected from notification service');
  }, []);

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    const token = getAuthToken();
    
    if (!token) {
      console.warn('⚠️ No auth token, skipping fetch notifications');
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        
        // Count unread
        const unread = data.filter(n => !n.isRead).length;
        setUnreadCount(unread);
        console.log(`📬 Fetched ${data.length} notifications (${unread} unread)`);
      } else {
        console.error('Failed to fetch notifications:', response.status);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, []);

  // Fetch unread count only
  const fetchUnreadCount = useCallback(async () => {
    const token = getAuthToken();
    
    if (!token) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/unread/count`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  }, []);

  // Mark as read
  const markAsRead = useCallback(async (notificationId) => {
    const token = getAuthToken();
    
    if (!token) return;
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/notifications/${notificationId}/read`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        setNotifications(prev =>
          prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
        console.log(`✅ Marked notification ${notificationId} as read`);
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    const token = getAuthToken();
    
    if (!token) return;
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/notifications/read-all`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        setNotifications(prev =>
          prev.map(n => ({ ...n, isRead: true }))
        );
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
    }
  }, []);

  // Connect on mount, disconnect on unmount
  useEffect(() => {
    const token = getAuthToken();
    
    if (token) {
      connect();
      fetchNotifications();
      requestPermission();
    }

    return () => {
      disconnect();
    };
  }, []);

  return {
    notifications,
    unreadCount,
    isConnected,
    error,
    markAsRead,
    markAllAsRead,
    fetchNotifications,
    fetchUnreadCount,
    connect,
    disconnect,
    requestPermission
  };
};

