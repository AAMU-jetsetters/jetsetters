import { useState } from 'react';
import './NotificationsPage.css';

interface Notification {
  id: string;
  type: 'water-quality' | 'system-update' | 'maintenance';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsPageProps {
  onMarkAllRead?: () => void;
}

function NotificationsPage({ onMarkAllRead }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'water-quality',
      title: 'Water Quality Update',
      message: 'pH levels have been stabilized. Water quality is now normal.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      type: 'system-update',
      title: 'System Maintenance Complete',
      message: 'Scheduled maintenance has been completed successfully.',
      time: '5 hours ago',
      read: false,
    },
    {
      id: '3',
      type: 'water-quality',
      title: 'Water Quality Alert',
      message: 'Slight increase in chlorine levels detected. Monitoring closely.',
      time: '1 day ago',
      read: true,
    },
    {
      id: '4',
      type: 'maintenance',
      title: 'Scheduled Maintenance Notice',
      message: 'Water system maintenance scheduled for tomorrow, 2:00 AM - 4:00 AM.',
      time: '2 days ago',
      read: true,
    },
    {
      id: '5',
      type: 'system-update',
      title: 'System Update',
      message: 'New water quality monitoring features have been added to your dashboard.',
      time: '3 days ago',
      read: true,
    },
  ]);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
    if (onMarkAllRead) {
      onMarkAllRead();
    }
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'water-quality':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        );
      case 'system-update':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case 'maintenance':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <h2 className="notifications-title">Notifications</h2>
        {unreadCount > 0 && (
          <span className="unread-count">{unreadCount} unread</span>
        )}
      </div>

      {unreadCount > 0 && (
        <div className="notifications-actions">
          <button className="mark-all-read-btn" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </button>
        </div>
      )}

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <p>No notifications yet</p>
            <span>You're all caught up!</span>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-card ${notification.read ? 'read' : 'unread'}`}
              onClick={() => !notification.read && handleMarkAsRead(notification.id)}
            >
              {!notification.read && <div className="unread-indicator"></div>}
              
              <div className={`notification-icon-wrapper ${notification.type}`}>
                {getNotificationIcon(notification.type)}
              </div>

              <div className="notification-details">
                <h3 className="notification-card-title">{notification.title}</h3>
                <p className="notification-message">{notification.message}</p>
                <span className="notification-timestamp">{notification.time}</span>
              </div>

              <button
                className="delete-notification-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNotification(notification.id);
                }}
                aria-label="Delete notification"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;

