import { useNavigate, useLocation } from 'react-router-dom';
import { navItems } from '../constants/navItems';

function Sidebar({ sidebarCollapsed, setSidebarCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} id="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo">SkillSwap</span>
        <button className="sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.page}
            className={`nav-item ${location.pathname === `/${item.page}` ? 'active' : ''}`}
            onClick={() => navigate(`/${item.page}`)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">© 2024 SkillSwap</div>
    </aside>
  );
}

export default Sidebar;