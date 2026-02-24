import React from 'react';

const AdminUsersTable = ({ users, onToggleBlock, onToast }) => {
  return (
    <div className="card">
      <h2>All Users ({users.length})</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Skills</th>
            <th>Joined</th><th>Status</th><th className="right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td className="bold">{u.name}</td>
              <td className="muted">{u.email}</td>
              <td>{u.skills}</td>
              <td className="muted">{u.joinDate}</td>
              <td><span className={`badge ${u.status}`}>{u.status}</span></td>
              <td className="right">
                <button className="action-btn" onClick={() => onToast('Edit ' + u.name)} title="Edit">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                {u.status === 'active' ? (
                  <button className="action-btn danger" onClick={() => onToggleBlock(u.id)} title="Block">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                    </svg>
                  </button>
                ) : (
                  <button className="action-btn success" onClick={() => onToggleBlock(u.id)} title="Unblock">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <polyline points="9 12 11 14 15 10"/>
                    </svg>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersTable;