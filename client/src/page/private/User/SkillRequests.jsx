import { useState, useEffect } from 'react';
import API from '../../../utils/axios';

function SkillRequests() {
  const CURRENT_USER = JSON.parse(localStorage.getItem('user')) || {};
  const [requests, setRequests] = useState([]);
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchRequests = () => {
    if (!CURRENT_USER?.id) return;
    API.get(`/requests/user/${CURRENT_USER.id}`)
      .then((res) => setRequests(res.data))
      .catch(() => setRequests([]));
  };

  useEffect(() => { fetchRequests(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/requests/${id}`, { status });
      fetchRequests();
    } catch (err) { console.error(err); }
  };

  const filtered = requests.filter((r) => {
    const isIncoming = r.toUserId === CURRENT_USER.id;
    const typeMatch = typeFilter === 'All' || (typeFilter === 'Incoming' && isIncoming) || (typeFilter === 'Outgoing' && !isIncoming);
    const statusMatch = statusFilter === 'All' || r.status === statusFilter.toLowerCase();
    return typeMatch && statusMatch;
  });

  const pendingCount = requests.filter((r) => r.toUserId === CURRENT_USER.id && r.status === 'pending').length;

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const getStatusIcon = (status) => {
    if (status === 'pending') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
    if (status === 'accepted') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>;
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
  };

  return (
    <>
      <h1 className="page-title">Skill Requests</h1>
      <p className="page-subtitle">
        Manage your incoming and outgoing skill exchange requests
        {pendingCount > 0 && (
          <span style={{ backgroundColor: 'rgba(245,158,11,0.1)', color: 'var(--warning)', padding: '2px 8px', borderRadius: 12, fontSize: 12, fontWeight: 500, marginLeft: 8 }}>
            {pendingCount} pending
          </span>
        )}
      </p>

      <div className="filter-bar">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">Type:</span>
          <div className="filter-tabs">
            {['All', 'Incoming', 'Outgoing'].map((t) => (
              <button key={t} className={`filter-tab ${typeFilter === t ? 'active' : ''}`} onClick={() => setTypeFilter(t)}>{t}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">Status:</span>
          <div className="filter-tabs">
            {['All', 'Pending', 'Accepted', 'Rejected'].map((s) => (
              <button key={s} className={`filter-tab ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted mt-4">Showing {filtered.length} requests</p>

      <div className="grid-3 mt-4">
        {filtered.length === 0 ? (
          <p className="text-muted">No requests found.</p>
        ) : (
          filtered.map((req) => {
            const isIncoming = req.toUserId === CURRENT_USER.id;
            const otherUser = isIncoming ? req.FromUser : req.ToUser;
            const otherName = otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : 'User';
            return (
              <div className="request-card" key={req.id}>
                <div className="request-header">
                  <div>
                    <div className="request-skill">{req.Skill?.name}</div>
                    <div className="request-from">{isIncoming ? 'From' : 'To'}: {otherName} • {formatDate(req.createdAt)}</div>
                  </div>
                  <span className={`request-status ${req.status}`}>
                    {getStatusIcon(req.status)}
                    {req.status ? req.status.charAt(0).toUpperCase() + req.status.slice(1) : 'Unknown'}
                  </span>
                </div>
                {isIncoming && req.status === 'pending' && (
                  <div className="request-actions">
                    <button className="btn btn-success" onClick={() => updateStatus(req.id, 'accepted')}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      Accept
                    </button>
                    <button className="btn btn-secondary" onClick={() => updateStatus(req.id, 'rejected')}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      Decline
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default SkillRequests;