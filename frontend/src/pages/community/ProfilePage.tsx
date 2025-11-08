import { useState } from 'react';
import { firebaseAuthService } from '../../services/firebaseAuth';
import './ProfilePage.css';

interface ProfilePageProps {
  onLogout: () => void;
}

function ProfilePage({ onLogout }: ProfilePageProps) {
  const [notifications, setNotifications] = useState({
    waterQualityAlerts: true,
    systemUpdates: true,
    maintenanceNotices: false,
    emailNotifications: true,
    pushNotifications: true,
  });

  const user = firebaseAuthService.getCurrentUser();

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSavePreferences = () => {
    console.log('Saving notification preferences:', notifications);
    alert('Notification preferences saved successfully!');
  };

  const handleLogoutClick = async () => {
    await firebaseAuthService.logout();
    onLogout();
  };

  return (
    <div className="profile-page">
      <div className="profile-section">
        <h2 className="profile-title">Profile</h2>
        
        <div className="profile-info-card">
          <div className="profile-avatar">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div className="profile-details">
            <p className="profile-name">{user?.displayName || 'Community Member'}</p>
            <p className="profile-email">{user?.email || 'Not available'}</p>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">Notification Preferences</h3>
        <p className="section-description">
          Manage how you receive water quality updates and system alerts
        </p>

        <div className="notification-settings">
          <div className="notification-category">
            <h4 className="category-title">Alert Types</h4>
            
            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-label">Water Quality Alerts</span>
                <span className="notification-desc">Get notified about water quality changes</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.waterQualityAlerts}
                  onChange={() => handleToggle('waterQualityAlerts')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-label">System Updates</span>
                <span className="notification-desc">Updates about water system status</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.systemUpdates}
                  onChange={() => handleToggle('systemUpdates')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-label">Maintenance Notices</span>
                <span className="notification-desc">Scheduled maintenance notifications</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.maintenanceNotices}
                  onChange={() => handleToggle('maintenanceNotices')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="notification-category">
            <h4 className="category-title">Delivery Method</h4>
            
            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-label">Email Notifications</span>
                <span className="notification-desc">Receive alerts via email</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="notification-item">
              <div className="notification-info">
                <span className="notification-label">Push Notifications</span>
                <span className="notification-desc">Receive alerts in your browser</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.pushNotifications}
                  onChange={() => handleToggle('pushNotifications')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <button className="save-button" onClick={handleSavePreferences}>
          Save Preferences
        </button>
      </div>

      <div className="profile-section">
        <button className="logout-button" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;

