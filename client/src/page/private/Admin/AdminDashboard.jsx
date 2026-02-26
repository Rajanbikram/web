import React, { useState, useEffect, useCallback } from 'react';
import API from '../../../utils/api'; // ✅ FIXED: token interceptor wala
import '../../../css/admin.css';

import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminUsersTable from './AdminUsersTable';
import AdminSkillsTable from './AdminSkillsTable';
import AdminReportsTable from './AdminReportsTable';
import AdminActivityReport from './AdminActivityReport';
import AdminConfirmModal from './AdminConfirmModal';
import AdminToast from './AdminToast';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [pageTitle, setPageTitle] = useState('Dashboard Overview');

  const [stats, setStats] = useState({ totalUsers: 0, totalSkills: 0, activeRequests: 0, pendingReports: 0 });
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [reports, setReports] = useState([]);

  const [modal, setModal] = useState({ open: false, title: '', desc: '', variant: 'confirm', onConfirm: null });
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (msg) => setToast({ show: true, message: msg });
  const hideToast = () => setToast({ show: false, message: '' });

  const fetchAll = useCallback(async () => {
    try {
      const [statsRes, usersRes, skillsRes, reportsRes] = await Promise.all([
        API.get('/admin/stats'),       // ✅ FIXED
        API.get('/admin/users'),       // ✅ FIXED
        API.get('/admin/skills'),      // ✅ FIXED
        API.get('/admin/reports'),     // ✅ FIXED
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setSkills(skillsRes.data);
      setReports(reportsRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleSwitch = (pageId, label) => {
    setActivePage(pageId);
    setPageTitle(label);
  };

  const handleToggleBlock = (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    const action = user.status === 'active' ? 'block' : 'unblock';
    setModal({
      open: true,
      title: action === 'block' ? 'Block User' : 'Unblock User',
      desc: action === 'block'
        ? `Are you sure you want to block ${user.name}? They will not be able to access the platform.`
        : `Are you sure you want to unblock ${user.name}?`,
      variant: action === 'block' ? 'danger' : 'confirm',
      onConfirm: async () => {
        try {
          const res = await API.patch(`/admin/users/${userId}/block`); // ✅ FIXED
          setUsers(prev => prev.map(u => u.id === userId ? res.data.user : u));
          showToast(`${user.name} has been ${res.data.user.status}`);
          fetchAll();
        } catch (err) {
          showToast('Error updating user');
        }
      }
    });
  };

  const handleRemoveSkill = (skillId) => {
    const skill = skills.find(s => s.id === skillId);
    if (!skill) return;
    setModal({
      open: true,
      title: 'Remove Skill',
      desc: `Are you sure you want to remove "${skill.title}"? This action cannot be undone.`,
      variant: 'danger',
      onConfirm: async () => {
        try {
          await API.delete(`/admin/skills/${skillId}`); // ✅ FIXED
          setSkills(prev => prev.filter(s => s.id !== skillId));
          showToast(`"${skill.title}" has been removed`);
          fetchAll();
        } catch (err) {
          showToast('Error removing skill');
        }
      }
    });
  };

  const handleResolveReport = async (reportId, status) => {
    try {
      const res = await API.patch(`/admin/reports/${reportId}`, { status }); // ✅ FIXED
      setReports(prev => prev.map(r => r.id === reportId ? res.data.report : r));
      showToast(`Report ${status === 'resolved' ? 'approved' : 'dismissed'}`);
      fetchAll();
    } catch (err) {
      showToast('Error updating report');
    }
  };

  const closeModal = () => setModal(prev => ({ ...prev, open: false, onConfirm: null }));

  const confirmModal = () => {
    if (modal.onConfirm) modal.onConfirm();
    closeModal();
  };

  const pendingReports = reports.filter(r => r.status === 'pending');

  return (
    <>
      <AdminSidebar activePage={activePage} onSwitch={handleSwitch} />
      <AdminHeader pageTitle={pageTitle} onLogout={() => showToast('Logged out')} />

      <div className="main">

        {/* DASHBOARD PAGE */}
        <div className={`page ${activePage === 'dashboard' ? 'active' : ''}`}>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-inner">
                <div>
                  <p className="label">Total Users</p>
                  <p className="value">{stats.totalUsers}</p>
                  <p className="trend">+12% this month</p>
                </div>
                <div className="stat-icon blue">
                  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-inner">
                <div>
                  <p className="label">Total Skills</p>
                  <p className="value">{stats.totalSkills}</p>
                  <p className="trend">+8% this month</p>
                </div>
                <div className="stat-icon green">
                  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                    <path d="M9 18h6"/><path d="M10 22h4"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-inner">
                <div>
                  <p className="label">Active Requests</p>
                  <p className="value">{stats.activeRequests}</p>
                </div>
                <div className="stat-icon orange">
                  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-card-inner">
                <div>
                  <p className="label">Pending Reports</p>
                  <p className="value">{stats.pendingReports}</p>
                </div>
                <div className="stat-icon red">
                  <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid-2">
            <div className="card">
              <h2>Recent Users</h2>
              <table>
                <thead><tr><th>Name</th><th>Email</th><th>Status</th></tr></thead>
                <tbody>
                  {users.slice(0, 5).map(u => (
                    <tr key={u.id}>
                      <td className="bold">{u.name}</td>
                      <td className="muted">{u.email}</td>
                      <td><span className={`badge ${u.status}`}>{u.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card">
              <h2>Pending Reports</h2>
              <table>
                <thead><tr><th>Skill</th><th>Reason</th><th>Date</th></tr></thead>
                <tbody>
                  {pendingReports.map(r => (
                    <tr key={r.id}>
                      <td className="bold">{r.skillTitle}</td>
                      <td className="muted">{r.reason}</td>
                      <td className="muted">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MANAGE USERS PAGE */}
        <div className={`page ${activePage === 'users' ? 'active' : ''}`}>
          <AdminUsersTable users={users} onToggleBlock={handleToggleBlock} onToast={showToast} />
        </div>

        {/* MANAGE SKILLS PAGE */}
        <div className={`page ${activePage === 'skills' ? 'active' : ''}`}>
          <AdminSkillsTable skills={skills} onRemove={handleRemoveSkill} />
        </div>

        {/* REPORTED SKILLS PAGE */}
        <div className={`page ${activePage === 'reports' ? 'active' : ''}`}>
          <AdminReportsTable reports={reports} onResolve={handleResolveReport} />
        </div>

        {/* CONTENT MODERATION PAGE */}
        <div className={`page ${activePage === 'moderation' ? 'active' : ''}`}>
          <div className="card">
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h2>Content Moderation</h2>
              <p>All flagged content is reviewed through the Reported Skills section. No items currently require moderation.</p>
            </div>
          </div>
        </div>

        {/* ACTIVITY REPORTS PAGE */}
        <div className={`page ${activePage === 'activity' ? 'active' : ''}`}>
          <AdminActivityReport />
        </div>

        {/* SETTINGS PAGE */}
        <div className={`page ${activePage === 'settings' ? 'active' : ''}`}>
          <div className="card">
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h2>Platform Settings</h2>
              <p>Configure platform preferences, notification settings, and admin access controls.</p>
            </div>
          </div>
        </div>

      </div>

      <AdminConfirmModal
        open={modal.open}
        title={modal.title}
        desc={modal.desc}
        variant={modal.variant}
        onConfirm={confirmModal}
        onCancel={closeModal}
      />

      <AdminToast show={toast.show} message={toast.message} onHide={hideToast} />
    </>
  );
};

export default AdminDashboard;