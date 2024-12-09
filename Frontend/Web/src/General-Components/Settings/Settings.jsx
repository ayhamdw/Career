import React from "react";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>

      {/* Profile Section */}
      <div className="settings-section">
        <h2>Profile</h2>
        <div className="profile-item">
          <label>Name</label>
          <input type="text" defaultValue="John Doe" />
        </div>
        <div className="profile-item">
          <label>Email</label>
          <input type="email" defaultValue="johndoe@example.com" />
        </div>
        <button className="save-button">Save Changes</button>
      </div>

      {/* Change Password Section */}
      <div className="settings-section">
        <h2>Change Password</h2>
        <div className="profile-item">
          <label>Current Password</label>
          <input type="password" />
        </div>
        <div className="profile-item">
          <label>New Password</label>
          <input type="password" />
        </div>
        <div className="profile-item">
          <label>Confirm New Password</label>
          <input type="password" />
        </div>
        <button className="save-button">Update Password</button>
      </div>

      {/* Notification Settings */}
      <div className="settings-section">
        <h2>Notifications</h2>
        <div className="profile-item">
          <label>Email Notifications</label>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="profile-item">
          <label>Push Notifications</label>
          <input type="checkbox" />
        </div>
        <button className="save-button">Save Preferences</button>
      </div>
    </div>
  );
};

export default Settings;
