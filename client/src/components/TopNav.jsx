import { CURRENT_USER } from '../constants/user';

function TopNav() {
  const initials = CURRENT_USER
    ? `${CURRENT_USER.firstName?.[0] ?? '?'}${CURRENT_USER.lastName?.[0] ?? '?'}`
    : '??';

  const fullName = CURRENT_USER
    ? `${CURRENT_USER.firstName} ${CURRENT_USER.lastName}`
    : 'Guest';

  return (
    <header className="top-nav">
      <div className="search-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="text" placeholder="Search skills, users..." />
      </div>

      <div className="top-nav-right">
        <button className="icon-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="badge"></span>
        </button>

        <button className="icon-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span className="badge-count">3</span>
        </button>

        <button className="profile-btn">
          <div className="avatar">{initials}</div>
          <span className="profile-name">{fullName}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </div>
    </header>
  );
}

export default TopNav;