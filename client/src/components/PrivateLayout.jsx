import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import TopNav from './TopNav';

function PrivateLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="app-container">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className="main-wrapper">
        <TopNav />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PrivateLayout;