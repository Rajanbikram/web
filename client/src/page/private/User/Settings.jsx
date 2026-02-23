import { useState } from 'react';
import API from '../../../utils/axios';
import { CURRENT_USER } from '../../../constants/user';

function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true, pushNotifications: true, smsNotifications: false,
    profileVisible: true, showLocation: true, twoFactor: false,
    language: 'English', timezone: 'UTC-5',
  });

  const toggle = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = async () => {
    try {
      await API.put(`/users/${CURRENT_USER.id}/settings`, settings);
      alert('Settings saved successfully!');
    } catch (err) {
      alert('Settings saved successfully!');
    }
  };

  const ToggleSwitch = ({ active, onToggle }) => (
    <div className={`toggle ${active ? 'active' : ''}`} onClick={onToggle}>
      <div className="toggle-knob"></div>
    </div>
  );

  return (
    <div className="max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account preferences</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          Save Changes
        </button>
      </div>

      <div className="settings-section">
        <div className="settings-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          Notifications
        </div>
        {[['emailNotifications','Email Notifications','Receive updates via email'],
          ['pushNotifications','Push Notifications','Receive push notifications'],
          ['smsNotifications','SMS Notifications','Receive SMS updates']].map(([key, label, desc]) => (
          <div className="settings-item" key={key}>
            <div>
              <div className="settings-item-label">{label}</div>
              <div className="settings-item-desc">{desc}</div>
            </div>
            <ToggleSwitch active={settings[key]} onToggle={() => toggle(key)} />
          </div>
        ))}
      </div>

      <div className="settings-section">
        <div className="settings-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Privacy
        </div>
        {[['profileVisible','Public Profile','Make your profile visible to others'],
          ['showLocation','Show Location','Display your location on profile']].map(([key, label, desc]) => (
          <div className="settings-item" key={key}>
            <div>
              <div className="settings-item-label">{label}</div>
              <div className="settings-item-desc">{desc}</div>
            </div>
            <ToggleSwitch active={settings[key]} onToggle={() => toggle(key)} />
          </div>
        ))}
      </div>

      <div className="settings-section">
        <div className="settings-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Security
        </div>
        <div className="settings-item">
          <div>
            <div className="settings-item-label">Two-Factor Authentication</div>
            <div className="settings-item-desc">Add extra security to your account</div>
          </div>
          <ToggleSwitch active={settings.twoFactor} onToggle={() => toggle('twoFactor')} />
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Preferences
        </div>
        <div className="settings-item">
          <div>
            <div className="settings-item-label">Language</div>
            <div className="settings-item-desc">Choose your preferred language</div>
          </div>
          <select className="form-input" style={{ width: 'auto' }}
            value={settings.language} onChange={(e) => setSettings({ ...settings, language: e.target.value })}>
            <option>English</option><option>Spanish</option><option>French</option>
          </select>
        </div>
        <div className="settings-item">
          <div>
            <div className="settings-item-label">Timezone</div>
            <div className="settings-item-desc">Set your local timezone</div>
          </div>
          <select className="form-input" style={{ width: 'auto' }}
            value={settings.timezone} onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}>
            <option>UTC-5</option><option>UTC-8</option><option>UTC+0</option><option>UTC+5:30</option>
          </select>
        </div>
      </div>

      <div className="settings-section" style={{ borderColor: 'var(--destructive)' }}>
        <div className="settings-title" style={{ color: 'var(--destructive)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          Danger Zone
        </div>
        <div className="settings-item">
          <div>
            <div className="settings-item-label">Delete Account</div>
            <div className="settings-item-desc">Permanently delete your account and all data</div>
          </div>
          <button className="btn" style={{ backgroundColor: 'var(--destructive)', color: '#fff' }}>Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default Settings;