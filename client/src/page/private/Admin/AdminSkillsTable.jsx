import React from 'react';

const AdminSkillsTable = ({ skills, onRemove }) => {
  return (
    <div className="card">
      <h2>All Skills ({skills.length})</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th><th>Category</th><th>Posted By</th>
            <th>Date</th><th>Status</th><th className="right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map(s => (
            <tr key={s.id}>
              <td className="bold">{s.title}</td>
              <td className="muted">{s.category}</td>
              <td className="muted">{s.postedBy}</td>
              <td className="muted">{s.date}</td>
              <td><span className={`badge ${s.status}`}>{s.status}</span></td>
              <td className="right">
                <button className="action-btn danger" onClick={() => onRemove(s.id)} title="Remove">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSkillsTable;