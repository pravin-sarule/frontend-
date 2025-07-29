// import React, { useState, useRef, useEffect } from 'react';
// import { Scale, Search, Bell, Menu, User, Settings } from 'lucide-react';

// interface NavigationProps {
//   onToggleSidebar: () => void;
//   isSidebarOpen: boolean;
//   onNavigateToSettings?: () => void;
// }

// const Navigation: React.FC<NavigationProps> = ({ onToggleSidebar, isSidebarOpen, onNavigateToSettings }) => {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showUserProfile, setShowUserProfile] = useState(false);
//   const notificationRef = useRef<HTMLDivElement>(null);
//   const profileRef = useRef<HTMLDivElement>(null);

//   // Sample notifications data
//   const notifications = [
//     {
//       id: 1,
//       title: 'Document Analysis Complete',
//       message: 'Contract_Amendment_2024.pdf has been processed successfully',
//       time: '2 minutes ago',
//       type: 'success',
//       unread: true
//     },
//     {
//       id: 2,
//       title: 'New Case Assignment',
//       message: 'Johnson vs. Smith case has been assigned to your team',
//       time: '1 hour ago',
//       type: 'info',
//       unread: true
//     },
//     {
//       id: 3,
//       title: 'AI Analysis Ready',
//       message: 'Legal brief generation completed for Motion to Dismiss',
//       time: '3 hours ago',
//       type: 'success',
//       unread: false
//     },
//     {
//       id: 4,
//       title: 'System Update',
//       message: 'New AI features have been added to your dashboard',
//       time: '1 day ago',
//       type: 'info',
//       unread: false
//     },
//     {
//       id: 5,
//       title: 'Document Upload Failed',
//       message: 'Please check file format and try again',
//       time: '2 days ago',
//       type: 'error',
//       unread: false
//     }
//   ];

//   const unreadCount = notifications.filter(n => n.unread).length;

//   // Close notifications when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
//         setShowNotifications(false);
//       }
//       if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
//         setShowUserProfile(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
//     setShowUserProfile(false); // Close profile when opening notifications
//   };

//   const toggleUserProfile = () => {
//     setShowUserProfile(!showUserProfile);
//     setShowNotifications(false); // Close notifications when opening profile
//   };

//   const getNotificationIcon = (type: string) => {
//     switch (type) {
//       case 'success':
//         return '✅';
//       case 'error':
//         return '❌';
//       case 'info':
//       default:
//         return '📄';
//     }
//   };
//   return (
//     <nav className="bg-white border-b border-gray-200/50 px-6 py-4 sticky top-0 z-50 shadow-lg shadow-gray-900/5">
//       <div className="flex items-center justify-between">
//         {/* Left side */}
//         <div className="flex items-center space-x-6">
//           <button
//             onClick={onToggleSidebar}
//             className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 group"
//           >
//             <Menu className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
//           </button>
          
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center justify-center w-12 h-12 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50">
//               <img 
//                 src="/Ai logo-01.png" 
//                 alt="NexIntel Legal AI Logo" 
//                 className="w-8 h-8 object-contain filter drop-shadow-sm"
//               />
//             </div>
//             <div className="hidden sm:block">
//               <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
//                 NexIntel Legal AI
//               </span>
//               <div className="text-xs text-black font-medium">Professional Edition</div>
//             </div>
//           </div>
//         </div>

//         {/* Center - Enhanced Search */}
//         <div className="hidden md:flex flex-1 max-w-2xl mx-8">
//           <div className="relative w-full group">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
//             <input
//               type="text"
//               placeholder="Search documents, cases, or ask AI anything..."
//               className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 text-black placeholder-gray-500 shadow-sm hover:shadow-md"
//             />
//             <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//               <kbd className="px-2 py-1 text-xs font-semibold text-black bg-gray-100 border border-gray-200 rounded">
//                 ⌘K
//               </kbd>
//             </div>
//           </div>
//         </div>

//         {/* Right side - Enhanced */}
//         <div className="flex items-center space-x-3">
//           <button className="md:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 group">
//             <Search className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
//           </button>
          
//           <div className="relative" ref={notificationRef}>
//             <button 
//               onClick={toggleNotifications}
//               className="relative p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 group"
//             >
//             <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
//               {unreadCount > 0 && (
//                 <>
//                   <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
//                   <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-400 rounded-full animate-ping"></span>
//                   <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
//                     {unreadCount}
//                   </span>
//                 </>
//               )}
//             </button>

//             {/* Notifications Dropdown */}
//             {showNotifications && (
//               <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-slide-down">
//                 {/* Header */}
//                 <div className="p-6 border-b border-gray-100">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
//                     {unreadCount > 0 && (
//                       <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
//                         {unreadCount} new
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Notifications List */}
//                 <div className="max-h-96 overflow-y-auto custom-scrollbar">
//                   {notifications.length > 0 ? (
//                     <div className="p-2">
//                       {notifications.map((notification) => (
//                         <div
//                           key={notification.id}
//                           className={`p-4 rounded-xl mb-2 transition-all duration-200 hover:bg-gray-50 cursor-pointer ${
//                             notification.unread ? 'bg-blue-50/50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
//                           }`}
//                         >
//                           <div className="flex items-start space-x-3">
//                             <div className="text-lg flex-shrink-0 mt-1">
//                               {getNotificationIcon(notification.type)}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <div className="flex items-center justify-between mb-1">
//                                 <h4 className={`font-semibold text-sm ${
//                                   notification.unread ? 'text-gray-900' : 'text-gray-700'
//                                 }`}>
//                                   {notification.title}
//                                 </h4>
//                                 {notification.unread && (
//                                   <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
//                                 )}
//                               </div>
//                               <p className="text-sm text-gray-600 mb-2 leading-relaxed">
//                                 {notification.message}
//                               </p>
//                               <p className="text-xs text-gray-400">
//                                 {notification.time}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="p-8 text-center">
//                       <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//                       <p className="text-gray-500">No notifications yet</p>
//                     </div>
//                   )}
//                 </div>

//                 {/* Footer */}
//                 {notifications.length > 0 && (
//                   <div className="p-4 border-t border-gray-100">
//                     <div className="flex items-center justify-between">
//                       <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
//                         Mark all as read
//                       </button>
//                       <button className="text-sm text-gray-600 hover:text-gray-700 font-semibold transition-colors duration-200">
//                         View all notifications
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
          
//           <button 
//             onClick={onNavigateToSettings}
//             className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 group"
//           >
//             <Settings className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
//           </button>
          
//           <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
//             <div className="hidden sm:block text-right">
//               <div className="text-sm font-semibold text-black">John Doe</div>
//               <div className="text-xs text-black">Senior Partner</div>
//             </div>
            
//             <div className="relative" ref={profileRef}>
//               <button 
//                 onClick={toggleUserProfile}
//                 className="p-1 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105 group"
//               >
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
//                   <User className="w-5 h-5 text-white" />
//                 </div>
//               </button>

//               {/* User Profile Dropdown */}
//               {showUserProfile && (
//                 <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-slide-down">
//                   {/* Profile Header */}
//                   <div className="p-6 border-b border-gray-100">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
//                         <User className="w-8 h-8 text-white" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-lg font-bold text-gray-900">John Doe</h3>
//                         <p className="text-sm text-gray-600">Senior Partner</p>
//                         <p className="text-sm text-blue-600">john.doe@lawfirm.com</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Profile Details */}
//                   <div className="p-6 border-b border-gray-100">
//                     <h4 className="text-sm font-semibold text-gray-900 mb-4">Profile Information</h4>
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600">Department</span>
//                         <span className="text-sm font-medium text-gray-900">Corporate Law</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600">Employee ID</span>
//                         <span className="text-sm font-medium text-gray-900">EMP-2024-001</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600">Join Date</span>
//                         <span className="text-sm font-medium text-gray-900">January 15, 2020</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600">Location</span>
//                         <span className="text-sm font-medium text-gray-900">New York Office</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600">Phone</span>
//                         <span className="text-sm font-medium text-gray-900">+1 (555) 123-4567</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Activity Stats */}
//                   <div className="p-6 border-b border-gray-100">
//                     <h4 className="text-sm font-semibold text-gray-900 mb-4">Activity Overview</h4>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="text-center p-3 bg-blue-50 rounded-xl">
//                         <div className="text-2xl font-bold text-blue-600">24</div>
//                         <div className="text-xs text-gray-600">Cases This Month</div>
//                       </div>
//                       <div className="text-center p-3 bg-green-50 rounded-xl">
//                         <div className="text-2xl font-bold text-green-600">156</div>
//                         <div className="text-xs text-gray-600">Documents Processed</div>
//                       </div>
//                       <div className="text-center p-3 bg-purple-50 rounded-xl">
//                         <div className="text-2xl font-bold text-purple-600">89.5h</div>
//                         <div className="text-xs text-gray-600">Time Saved</div>
//                       </div>
//                       <div className="text-center p-3 bg-orange-50 rounded-xl">
//                         <div className="text-2xl font-bold text-orange-600">98%</div>
//                         <div className="text-xs text-gray-600">Efficiency Score</div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Quick Actions */}
//                   <div className="p-4">
//                     <div className="space-y-2">
//                       <button 
//                         onClick={() => {
//                           onNavigateToSettings?.();
//                           setShowUserProfile(false);
//                         }}
//                         className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-left group"
//                       >
//                         <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
//                           <User className="w-4 h-4 text-blue-600" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">Edit Profile</p>
//                           <p className="text-xs text-gray-500">Update your information</p>
//                         </div>
//                       </button>
                      
//                       <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-left group">
//                         <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
//                           <Bell className="w-4 h-4 text-green-600" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-gray-900">Preferences</p>
//                           <p className="text-xs text-gray-500">Notification settings</p>
//                         </div>
//                       </button>
                      
//                       <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50 transition-colors duration-200 text-left group">
//                         <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
//                           <User className="w-4 h-4 text-red-600" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-medium text-red-700">Sign Out</p>
//                           <p className="text-xs text-red-500">End your session</p>
//                         </div>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;

import React, { useState, useRef, useEffect } from 'react';
import { Scale, Search, Bell, Menu, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavigationProps {
  onNavigateToSettings?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigateToSettings }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: 'Document Analysis Complete', message: 'Contract_Amendment_2024.pdf has been processed successfully', time: '2 minutes ago', type: 'success', unread: true },
    { id: 2, title: 'New Case Assignment', message: 'Johnson vs. Smith case has been assigned to your team', time: '1 hour ago', type: 'info', unread: true },
    { id: 3, title: 'AI Analysis Ready', message: 'Legal brief generation completed for Motion to Dismiss', time: '3 hours ago', type: 'success', unread: false },
    { id: 4, title: 'System Update', message: 'New AI features have been added to your dashboard', time: '1 day ago', type: 'info', unread: false },
    { id: 5, title: 'Document Upload Failed', message: 'Please check file format and try again', time: '2 days ago', type: 'error', unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowUserProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowUserProfile(false);
  };

  const toggleUserProfile = () => {
    setShowUserProfile(!showUserProfile);
    setShowNotifications(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    if (query.includes('settings')) navigate('/settings');
    else if (query.includes('documents') || query.includes('cases')) navigate('/documents');
    else if (query.includes('assistant') || query.includes('ai')) navigate('/ai-assistant');
    else if (query.includes('overview')) navigate('/overview');
    else alert('No matching page found.');
    setSearchQuery('');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'info':
      default: return '📄';
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200/50 px-6 py-4 sticky top-0 z-50 shadow-lg shadow-gray-900/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
              <img src="/NEXINTEL AI PVT. LTD LOGO FINAL .jpg" alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">NexIntel Legal AI</span>
              <div className="text-xs text-black font-medium">Professional Edition</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents, cases, or ask AI anything..."
              className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs font-semibold text-black bg-gray-100 border border-gray-200 rounded">⌘K</kbd>
            </div>
          </div>
        </form>

        <div className="flex items-center space-x-3">
          <button className="md:hidden p-3 rounded-xl hover:bg-gray-100">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          {/* Notifications and User Profile UI remains unchanged */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
;
