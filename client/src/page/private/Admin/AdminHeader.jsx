import React from 'react';

const AdminHeader = ({ pageTitle, onLogout }) => {
  return (
    <header className="header">
      <h1>{pageTitle}</h1>
      <div className="header-actions">
        <button className="header-btn" style={{ position: 'relative' }} title="Notifications">
          <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
          </svg>
          <span className="notification-dot"></span>
        </button>
        <div className="admin-badge">
          <div className="admin-avatar">A</div>
          <span>Admin</span>
        </div>
        <button className="header-btn logout" title="Logout" onClick={onLogout}>
          <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;