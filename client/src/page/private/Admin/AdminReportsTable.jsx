import React from 'react';

const AdminReportsTable = ({ reports, onResolve }) => {
  return (
    <div className="card">
      <h2>All Reports ({reports.length})</h2>
      <table>
        <thead>
          <tr>
            <th>Skill</th><th>Reported By</th><th>Reason</th>
            <th>Date</th><th>Status</th><th className="right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id}>
              <td className="bold">{r.skillTitle}</td>
              <td className="muted">{r.reportedBy}</td>
              <td className="muted">{r.reason}</td>
              <td className="muted">{r.date}</td>
              <td><span className={`badge ${r.status}`}>{r.status}</span></td>
              <td className="right">
                {r.status === 'pending' ? (
                  <>
                    <button className="action-btn success" onClick={() => onResolve(r.id, 'resolved')} title="Approve">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </button>
                    <button className="action-btn danger" onClick={() => onResolve(r.id, 'dismissed')} title="Dismiss">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </>
                ) : (
                  <span style={{ color: '#6b7f95', fontSize: '12px' }}>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReportsTable;