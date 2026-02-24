import React from 'react';

const progressData = [
  { label: 'User Registrations', value: 12, max: 20 },
  { label: 'Skills Posted', value: 8, max: 15 },
  { label: 'Skill Exchanges', value: 23, max: 30 },
  { label: 'Reports Filed', value: 4, max: 10 },
];

const AdminActivityReport = () => {
  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-inner">
            <div><p className="label">New Users (This Week)</p><p className="value">12</p></div>
            <div className="stat-icon blue">
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-inner">
            <div><p className="label">Skills Posted (This Week)</p><p className="value">8</p></div>
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
            <div><p className="label">Exchanges Completed</p><p className="value">23</p></div>
            <div className="stat-icon orange">
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-inner">
            <div><p className="label">Platform Growth</p><p className="value">18%</p></div>
            <div className="stat-icon blue">
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                <polyline points="16 7 22 7 22 13"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '24px' }} className="card">
        <h2>Weekly Activity Summary</h2>
        {progressData.map((d, i) => {
          const pct = ((d.value / d.max) * 100).toFixed(0);
          return (
            <div className="progress-row" key={i}>
              <div className="progress-label">
                <span>{d.label}</span>
                <span>{d.value}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pct}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AdminActivityReport;