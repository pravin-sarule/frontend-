

import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Sidebar from './Sidebar';

interface DashboardProps {
  onSignOut: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSignOut }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/')[2] || 'overview';

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebarCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const handleTabChange = (tab: string) => {
    navigate(`/dashboard/${tab}`);
    closeSidebar();
  };

  const handleNavigateToSettings = () => {
    navigate('/dashboard/settings');
    closeSidebar();
  };

  // Check if current route is AI Assistant (needs fixed height)
  const isAIAssistant = path === 'ai-assistant';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 flex flex-col">
      <Navigation
        onNavigateToSettings={handleNavigateToSettings}
      />

      <div className="flex flex-1">
        <Sidebar
          activeTab={path}
          onTabChange={handleTabChange}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapse}
        />

        {/* Conditional layout based on component needs */}
        {isAIAssistant ? (
          // AI Assistant: Fixed height with internal scrolling
          <main className={`flex-1 h-screen overflow-hidden bg-white transition-all duration-300 ease-out ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-80'}`} style={{ height: 'calc(100vh - 64px)' }}>
            <Outlet />
          </main>
        ) : (
          // Other components: Scrollable layout with internal padding
          <main className={`flex-1 bg-white overflow-y-auto transition-all duration-300 ease-out ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-80'}`}>
            <div className="p-6">
              <div className="max-w-7xl mx-auto">
                <Outlet />
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default Dashboard;