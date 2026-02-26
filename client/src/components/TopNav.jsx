import { useNavigate } from 'react-router-dom';

function TopNav() {
  // Read fresh from localStorage every render
  const getUser = () => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  const user = getUser();

  const initials = user
    ? `${user.firstName?.[0] ?? '?'}${user.lastName?.[0] ?? '?'}`
    : '??';

  const fullName = user
    ? `${user.firstName} ${user.lastName}`
    : 'Guest';

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

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

        <button className="icon-btn" onClick={() => navigate('/messages')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span className="badge-count">3</span>
        </button>

        <button className="profile-btn" onClick={handleLogout} title="Click to logout">
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