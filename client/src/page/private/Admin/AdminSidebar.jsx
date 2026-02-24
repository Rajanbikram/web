import React from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard Overview', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { id: 'users', label: 'Manage Users', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { id: 'skills', label: 'Manage Skills', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg> },
  { id: 'reports', label: 'Reported Skills', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
  { id: 'moderation', label: 'Content Moderation', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { id: 'activity', label: 'Activity Reports', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { id: 'settings', label: 'Settings', icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg> },
];

const AdminSidebar = ({ activePage, onSwitch }) => {
  const handleClick = (e, id, label) => {
    e.preventDefault();
    onSwitch(id, label);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">SE</div>
        <div className="sidebar-brand-text">
          <p>SkillExchange</p>
          <p>Admin Panel</p>
        </div>
      </div>
      <nav className="sidebar-nav">
        <a href="#" className={activePage === 'dashboard' ? 'active' : ''} onClick={(e) => handleClick(e, 'dashboard', 'Dashboard Overview')}>{navItems[0].icon} Dashboard Overview</a>
        <a href="#" className={activePage === 'users' ? 'active' : ''} onClick={(e) => handleClick(e, 'users', 'Manage Users')}>{navItems[1].icon} Manage Users</a>
        <a href="#" className={activePage === 'skills' ? 'active' : ''} onClick={(e) => handleClick(e, 'skills', 'Manage Skills')}>{navItems[2].icon} Manage Skills</a>
        <a href="#" className={activePage === 'reports' ? 'active' : ''} onClick={(e) => handleClick(e, 'reports', 'Reported Skills')}>{navItems[3].icon} Reported Skills</a>
        <a href="#" className={activePage === 'moderation' ? 'active' : ''} onClick={(e) => handleClick(e, 'moderation', 'Content Moderation')}>{navItems[4].icon} Content Moderation</a>
        <a href="#" className={activePage === 'activity' ? 'active' : ''} onClick={(e) => handleClick(e, 'activity', 'Activity Reports')}>{navItems[5].icon} Activity Reports</a>
        <a href="#" className={activePage === 'settings' ? 'active' : ''} onClick={(e) => handleClick(e, 'settings', 'Settings')}>{navItems[6].icon} Settings</a>
      </nav>
      <div className="sidebar-footer">© 2026 SkillExchange</div>
    </aside>
  );
};

export default AdminSidebar;