// import React from 'react';
// import { Home, FileText, Bot, Settings, X, Zap, TrendingUp } from 'lucide-react';

// interface SidebarProps {
//   activeTab: string;
//   onTabChange: (tab: string) => void;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen, onClose }) => {
//   const menuItems = [
//     { id: 'overview', icon: Home, label: 'Overview', badge: null },
//     { id: 'documents', icon: FileText, label: 'Cases & Documents', badge: '12' },
//     { id: 'ai-tools', icon: Bot, label: 'AI Tools', badge: 'New' },
//     { id: 'ai-assistant', icon: Bot, label: 'AI Assistant', badge: null },
//     { id: 'settings', icon: Settings, label: 'Settings', badge: null }
//   ];

//   return (
//     <>
//       {/* Enhanced Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40 animate-fade-in"
//           onClick={onClose}
//         />
//       )}

//       {/* Enhanced Sidebar */}
//       <div className={`
//         fixed lg:relative lg:translate-x-0 transition-all duration-300 ease-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//         w-80 h-screen bg-white border-r border-gray-300 z-50 lg:z-auto shadow-2xl lg:shadow-none
//       `}>
//         <div className="p-8">
//           {/* Enhanced Mobile close button */}
//           <div className="flex items-center justify-between mb-10 lg:hidden">
//             <h2 className="text-xl font-bold text-black">Navigation</h2>
//             <button
//               onClick={onClose}
//               className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 group"
//             >
//               <X className="w-5 h-5 text-black group-hover:text-red-500 transition-colors duration-200" />
//             </button>
//           </div>

//           {/* Enhanced Navigation items */}
//           <nav className="space-y-4">
//             {menuItems.map((item, index) => (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   onTabChange(item.id);
//                   onClose();
//                 }}
//                 className={`
//                   w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 group relative overflow-hidden
//                   ${activeTab === item.id
//                     ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-105'
//                     : 'text-black hover:bg-gray-100 hover:scale-105'
//                   }
//                 `}
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="flex items-center space-x-4">
//                   <item.icon className={`w-6 h-6 transition-all duration-300 ${
//                     activeTab === item.id ? 'text-white' : 'text-black group-hover:text-blue-600'
//                   }`} />
//                   <span className="font-semibold text-lg">{item.label}</span>
//                 </div>
//                 {item.badge && (
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                     activeTab === item.id 
//                       ? 'bg-white/20 text-white' 
//                       : item.badge === 'New' 
//                         ? 'bg-green-100 text-green-700' 
//                         : 'bg-blue-100 text-blue-700'
//                   }`}>
//                     {item.badge}
//                   </span>
//                 )}
//                 {activeTab === item.id && (
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-600/20 rounded-2xl animate-pulse"></div>
//                 )}
//               </button>
//             ))}
//           </nav>

//           {/* Enhanced AI Assistant section */}
//           <div 
//             onClick={() => {
//               onTabChange('ai-assistant');
//               onClose();
//             }}
//             className="mt-12 p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl border border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//           >
//             <div className="text-center">
//               <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
//                 <Bot className="w-8 h-8 text-white" />
//                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
//               </div>
//               <h3 className="font-bold text-black text-lg mb-2">AI Assistant</h3>
//               <p className="text-sm text-black mb-4 leading-relaxed">
//                 Get instant help with legal research, document analysis, and case insights
//               </p>
//               <button 
//                 onClick={(e) => {
//                   e.stopPropagation();
//                 }}
//                 className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group">
//                 <span className="flex items-center justify-center">
//                   Ask AI
//                   <Zap className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform duration-300" />
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* Enhanced Stats section */}
//           <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-gray-200">
//             <h4 className="font-bold text-black mb-4 flex items-center">
//               <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
//               This Week
//             </h4>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-black">Documents Processed</span>
//                 <span className="font-bold text-black">24</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-black">AI Queries</span>
//                 <span className="font-bold text-black">156</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-black">Time Saved</span>
//                 <span className="font-bold text-green-600">12.5h</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

// Sidebar.tsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Home, FileText, Bot, Settings, X, Zap, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

// interface SidebarProps {
//   activeTab: string;
//   onTabChange: (tab: string) => void;
//   isOpen: boolean; // For mobile sidebar
//   onClose: () => void; // For mobile sidebar
//   isCollapsed: boolean; // For desktop collapsible sidebar
//   onToggleCollapse: () => void; // For desktop collapsible sidebar
// }

// const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isOpen, onClose, isCollapsed, onToggleCollapse }) => {
//   const navigate = useNavigate();

//   const menuItems = [
//     { id: 'overview', icon: Home, label: 'Overview', badge: null, path: 'overview' },
//     { id: 'documents', icon: FileText, label: 'Cases & Documents', badge: '12', path: 'documents' },
//     { id: 'ai-tools', icon: Bot, label: 'AI Tools', badge: 'New', path: 'ai-tools' },
//     { id: 'ai-assistant', icon: Bot, label: 'AI Assistant', badge: null, path: 'ai-assistant' },
//     { id: 'settings', icon: Settings, label: 'Settings', badge: null, path: 'settings' }
//   ];

//   return (
//     <>
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40 animate-fade-in"
//           onClick={onClose}
//         />
//       )}

//       <div
//         className={`
//           fixed lg:relative lg:translate-x-0 transition-all duration-300 ease-out
//           ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//           ${isCollapsed ? 'lg:w-20' : 'lg:w-80'}
//           h-screen bg-white border-r border-gray-300 z-50 lg:z-auto shadow-2xl lg:shadow-none
//         `}
//       >
//         <div className="h-full overflow-y-auto p-8 relative">
//           {/* Toggle Button for desktop */}
//           <button
//             onClick={onToggleCollapse}
//             className={`
//               hidden lg:flex items-center justify-center
//               absolute top-8 ${isCollapsed ? '-right-4' : 'right-4'}
//               w-8 h-8 bg-blue-600 text-white rounded-full shadow-lg
//               hover:bg-blue-700 transition-all duration-300 z-50
//             `}
//             aria-label="Toggle Sidebar"
//           >
//             {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
//           </button>

//           {/* Enhanced Mobile close button */}
//           <div className="flex items-center justify-between mb-10 lg:hidden">
//             <h2 className="text-xl font-bold text-black">Navigation</h2>
//             <button
//               onClick={onClose}
//               className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 group"
//             >
//               <X className="w-5 h-5 text-black group-hover:text-red-500 transition-colors duration-200" />
//             </button>
//           </div>

//           <nav className="space-y-4">
//             {menuItems.map((item, index) => (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   onTabChange(item.id);
//                   onClose(); // Close for mobile
//                 }}
//                 className={`
//                   w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-6 py-5 rounded-2xl transition-all duration-300 group relative overflow-hidden
//                   ${activeTab === item.id
//                     ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-105'
//                     : 'text-black hover:bg-gray-100 hover:scale-105'
//                   }
//                 `}
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'} w-full`}>
//                   <item.icon className={`w-6 h-6 transition-all duration-300 ${
//                     activeTab === item.id ? 'text-white' : 'text-black group-hover:text-blue-600'
//                   }`} />
//                   {!isCollapsed && <span className="font-semibold text-lg">{item.label}</span>}
//                 </div>
//                 {!isCollapsed && item.badge && (
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                     activeTab === item.id
//                       ? 'bg-white/20 text-white'
//                       : item.badge === 'New'
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-blue-100 text-blue-700'
//                   }`}>
//                     {item.badge}
//                   </span>
//                 )}
//                 {activeTab === item.id && (
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-600/20 rounded-2xl animate-pulse"></div>
//                 )}
//               </button>
//             ))}
//           </nav>

//           {!isCollapsed && (
//             <>
//               <div
//                 onClick={() => {
//                   onTabChange('ai-assistant');
//                   onClose();
//                 }}
//                 className="mt-12 p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl border border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
//               >
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
//                     <Bot className="w-8 h-8 text-white" />
//                     <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
//                   </div>
//                   <h3 className="font-bold text-black text-lg mb-2">AI Assistant</h3>
//                   <p className="text-sm text-black mb-4 leading-relaxed">
//                     Get instant help with legal research, document analysis, and case insights
//                   </p>
//                   <button
//                     onClick={(e) => e.stopPropagation()}
//                     className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
//                   >
//                     <span className="flex items-center justify-center">
//                       Ask AI
//                       <Zap className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform duration-300" />
//                     </span>
//                   </button>
//                 </div>
//               </div>

//               <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-gray-200">
//                 <h4 className="font-bold text-black mb-4 flex items-center">
//                   <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
//                   This Week
//                 </h4>
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-black">Documents Processed</span>
//                     <span className="font-bold text-black">24</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-black">AI Queries</span>
//                     <span className="font-bold text-black">156</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-black">Time Saved</span>
//                     <span className="font-bold text-green-600">12.5h</span>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  FileText,
  Bot,
  Settings,
  X,
  Zap,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse
}) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'overview', icon: Home, label: 'Overview', badge: null },
    { id: 'documents', icon: FileText, label: 'Cases & Documents', badge: '12' },
    { id: 'ai-tools', icon: Bot, label: 'AI Tools', badge: 'New' },
    { id: 'ai-assistant', icon: Bot, label: 'AI Assistant', badge: null },
    { id: 'settings', icon: Settings, label: 'Settings', badge: null }
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      <div
        className={`
          fixed lg:relative lg:translate-x-0 transition-all duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'lg:w-20' : 'lg:w-80'}
          h-screen bg-white border-r border-gray-300 z-50 lg:z-auto shadow-2xl lg:shadow-none
        `}
      >
        <div className="h-full overflow-y-auto p-8 relative">
          {/* Toggle Button for desktop */}
          <button
            onClick={onToggleCollapse}
            className={`
              hidden lg:flex items-center justify-center
              absolute top-8 ${isCollapsed ? '-right-4' : 'right-4'}
              w-8 h-8 bg-blue-600 text-white rounded-full shadow-lg
              hover:bg-blue-700 transition-all duration-300 z-50
            `}
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          {/* Mobile header */}
          <div className="flex items-center justify-between mb-10 lg:hidden">
            <h2 className="text-xl font-bold text-black">Navigation</h2>
            <button
              onClick={onClose}
              className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 group"
            >
              <X className="w-5 h-5 text-black group-hover:text-red-500 transition-colors duration-200" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-4">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose(); // Close for mobile
                }}
                className={`
                  relative group
                  w-full flex items-center
                  ${isCollapsed ? 'justify-center px-3 py-4' : 'justify-between px-6 py-5'}
                  rounded-2xl transition-all duration-300 overflow-hidden
                  ${activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105'
                    : 'text-black hover:bg-gray-100 hover:scale-105'}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'} w-full`}>
                  <item.icon
                    className={`w-6 h-6 transition-all duration-300 ${
                      activeTab === item.id ? 'text-white' : 'text-black group-hover:text-blue-600'
                    }`}
                  />
                  {!isCollapsed && <span className="font-semibold text-lg">{item.label}</span>}
                </div>

                {/* Badge */}
                {!isCollapsed && item.badge && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      activeTab === item.id
                        ? 'bg-white/20 text-white'
                        : item.badge === 'New'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Tooltip */}
                {isCollapsed && (
                  <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-black text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
                    {item.label}
                  </span>
                )}

                {/* Active tab pulse effect */}
                {activeTab === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-600/20 rounded-2xl animate-pulse pointer-events-none" />
                )}
              </button>
            ))}
          </nav>

          {/* Sidebar widgets */}
          {!isCollapsed && (
            <>
              <div
                onClick={() => {
                  onTabChange('ai-assistant');
                  onClose();
                }}
                className="mt-12 p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl border border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
                    <Bot className="w-8 h-8 text-white" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
                  </div>
                  <h3 className="font-bold text-black text-lg mb-2">AI Assistant</h3>
                  <p className="text-sm text-black mb-4 leading-relaxed">
                    Get instant help with legal research, document analysis, and case insights
                  </p>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
                  >
                    <span className="flex items-center justify-center">
                      Ask AI
                      <Zap className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-gray-200">
                <h4 className="font-bold text-black mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  This Week
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-black">Documents Processed</span>
                    <span className="font-bold text-black">24</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-black">AI Queries</span>
                    <span className="font-bold text-black">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-black">Time Saved</span>
                    <span className="font-bold text-green-600">12.5h</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
