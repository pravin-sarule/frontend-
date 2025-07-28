// import React, { useState } from 'react';
// import Navigation from './Navigation';
// import Sidebar from './Sidebar';
// import OverviewContent from './OverviewContent';
// import DocumentsContent from './DocumentsContent';
// import AIToolsContent from './AIToolsContent';
// import AIAssistantContent from './AIAssistantContent';
// import SettingsContent from './SettingsContent';

// interface DashboardProps {
//   onSignOut: () => void;
//   onNavigate: (page: string) => void;
// }

// const Dashboard: React.FC<DashboardProps> = ({ onSignOut, onNavigate }) => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [aiToolView, setAiToolView] = useState<string>('main');

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const closeSidebar = () => {
//     setIsSidebarOpen(false);
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'overview':
//         return <OverviewContent onNavigate={handleQuickActionNavigate} />;
//       case 'documents':
//         return <DocumentsContent onNavigate={handleQuickActionNavigate} />;
//       case 'ai-tools':
//         return <AIToolsContent activeView={aiToolView} onViewChange={setAiToolView} />;
//       case 'ai-assistant':
//         return <AIAssistantContent />;
//       case 'settings':
//         return <SettingsContent onSignOut={onSignOut} />;
//       default:
//         return <OverviewContent onNavigate={handleQuickActionNavigate} />;
//     }
//   };

//   const handleNavigateToSettings = () => {
//     setActiveTab('settings');
//     setIsSidebarOpen(false); // Close sidebar on mobile when navigating
//   };

//   const handleQuickActionNavigate = (page: string) => {
//     if (page === 'upload') {
//       onNavigate('upload');
//     } else if (['brief-generator', 'summarizer', 'case-research'].includes(page)) {
//       setActiveTab('ai-tools');
//       setAiToolView(page);
//       setIsSidebarOpen(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
//       <Navigation 
//         onToggleSidebar={toggleSidebar} 
//         isSidebarOpen={isSidebarOpen}
//         onNavigateToSettings={handleNavigateToSettings}
//       />
      
//       <div className="flex">
//         <Sidebar
//           activeTab={activeTab}
//           onTabChange={setActiveTab}
//           isOpen={isSidebarOpen}
//           onClose={closeSidebar}
//         />
        
//         <main className="flex-1 lg:ml-0">
//           <div className="p-8 animate-fade-in">
//             <div className="max-w-7xl mx-auto">
//               {renderContent()}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState } from 'react';
// import Navigation from './Navigation';
// import Sidebar from './Sidebar';
// import OverviewContent from './OverviewContent';
// import DocumentsContent from './DocumentsContent';
// import AIToolsContent from './AIToolsContent';
// import AIAssistantContent from './AIAssistantContent';
// import SettingsContent from './SettingsContent';

// interface DashboardProps {
//   onSignOut: () => void;
//   onNavigate: (page: string) => void;
// }

// const Dashboard: React.FC<DashboardProps> = ({ onSignOut, onNavigate }) => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [aiToolView, setAiToolView] = useState<string>('main');

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const closeSidebar = () => {
//     setIsSidebarOpen(false);
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'overview':
//         return <OverviewContent onNavigate={handleQuickActionNavigate} />;
//       case 'documents':
//         return <DocumentsContent onNavigate={handleQuickActionNavigate} />;
//       case 'ai-tools':
//         return <AIToolsContent activeView={aiToolView} onViewChange={setAiToolView} />;
//       case 'ai-assistant':
//         return <AIAssistantContent />;
//       case 'settings':
//         return <SettingsContent onSignOut={onSignOut} />;
//       default:
//         return <OverviewContent onNavigate={handleQuickActionNavigate} />;
//     }
//   };

//   const handleNavigateToSettings = () => {
//     setActiveTab('settings');
//     setIsSidebarOpen(false);
//   };

//   const handleQuickActionNavigate = (page: string) => {
//     if (page === 'upload') {
//       onNavigate('upload');
//     } else if (['brief-generator', 'summarizer', 'case-research'].includes(page)) {
//       setActiveTab('ai-tools');
//       setAiToolView(page);
//       setIsSidebarOpen(false);
//     }
//   };

//   return (
//     <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
//       <Navigation 
//         onToggleSidebar={toggleSidebar} 
//         isSidebarOpen={isSidebarOpen}
//         onNavigateToSettings={handleNavigateToSettings}
//       />

//       <div className="flex h-full w-full overflow-hidden">
//         <Sidebar
//           activeTab={activeTab}
//           onTabChange={setActiveTab}
//           isOpen={isSidebarOpen}
//           onClose={closeSidebar}
//         />

//         <main className="flex-1 lg:ml-0 overflow-hidden">
//           <div className="p-8 h-full overflow-hidden animate-fade-in">
//             <div className="max-w-7xl mx-auto h-full overflow-hidden">
//               {renderContent()}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// import React, { useState } from 'react';
// import Navigation from './Navigation';
// import Sidebar from './Sidebar';
// import OverviewContent from './OverviewContent';
// import DocumentsContent from './DocumentsContent';
// import AIToolsContent from './AIToolsContent';
// import AIAssistantContent from './AIAssistantContent';
// import SettingsContent from './SettingsContent';

// interface DashboardProps {
//   onSignOut: () => void;
//   onNavigate: (page: string) => void;
// }

// const Dashboard: React.FC<DashboardProps> = ({ onSignOut, onNavigate }) => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [aiToolView, setAiToolView] = useState<string>('main');

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   const closeSidebar = () => setIsSidebarOpen(false);

//   const handleNavigateToSettings = () => {
//     setActiveTab('settings');
//     setIsSidebarOpen(false);
//   };

//   const handleQuickActionNavigate = (page: string) => {
//     if (page === 'upload') {
//       onNavigate('upload');
//     } else if (['brief-generator', 'summarizer', 'case-research'].includes(page)) {
//       setActiveTab('ai-tools');
//       setAiToolView(page);
//       setIsSidebarOpen(false);
//     }
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'overview':
//         return <OverviewContent onNavigate={handleQuickActionNavigate} />;
//       case 'documents':
//         return <DocumentsContent onNavigate={handleQuickActionNavigate} />;
//       case 'ai-tools':
//         return <AIToolsContent activeView={aiToolView} onViewChange={setAiToolView} />;
//       case 'ai-assistant':
//         return <AIAssistantContent />;
//       case 'settings':
//         return <SettingsContent onSignOut={onSignOut} />;
//       default:
//         return <OverviewContent onNavigate={handleQuickActionNavigate} />;
//     }
//   };

//   return (
//     <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 flex flex-col">
//       {/* Top Navigation */}
//       <div className="shrink-0">
//         <Navigation 
//           onToggleSidebar={toggleSidebar} 
//           isSidebarOpen={isSidebarOpen}
//           onNavigateToSettings={handleNavigateToSettings}
//         />
//       </div>

//       {/* Main Content Area */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <Sidebar
//           activeTab={activeTab}
//           onTabChange={setActiveTab}
//           isOpen={isSidebarOpen}
//           onClose={closeSidebar}
//         />

//         {/* Page Content (Each section handles its own scroll) */}
//         <main className="flex-1 overflow-hidden">
//           <div className="h-full w-full overflow-y-auto">
//             {renderContent()}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
      <Navigation
        onNavigateToSettings={handleNavigateToSettings}
      />

      <div className="flex">
        <Sidebar
          activeTab={path}
          onTabChange={handleTabChange}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapse}
        />

        <main className={`flex-1 transition-all duration-300 ease-out ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-80'}`}>
          <div className="p-8 animate-fade-in">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
