
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Home,
//   FileText,
//   Bot,
//   Settings,
//   X,
//   Zap,
//   TrendingUp,
//   ChevronLeft,
//   ChevronRight,
//   Menu
// } from 'lucide-react';

// interface SidebarProps {
//   activeTab: string;
//   onTabChange: (tab: string) => void;
//   isOpen: boolean;
//   onClose: () => void;
//   isCollapsed: boolean;
//   onToggleCollapse: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   activeTab,
//   onTabChange,
//   isOpen,
//   onClose,
//   isCollapsed,
//   onToggleCollapse
// }) => {
//   const navigate = useNavigate();

//   const menuItems = [
//     { id: 'overview', icon: Home, label: 'Overview', badge: null },
//     { id: 'documents', icon: FileText, label: 'Cases & Documents', badge: '12' },
//     { id: 'ai-tools', icon: Bot, label: 'AI Tools', badge: 'New' },
//     { id: 'ai-assistant', icon: Bot, label: 'AI Assistant', badge: null },
//     { id: 'settings', icon: Settings, label: 'Settings', badge: null }
//   ];

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40 animate-fade-in"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`
//           fixed lg:relative lg:translate-x-0 transition-all duration-300 ease-out
//           ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//           ${isCollapsed ? 'lg:w-16' : 'lg:w-80'}
//           h-screen bg-white border-r border-gray-200 z-50 lg:z-auto shadow-2xl lg:shadow-none
//           flex flex-col
//         `}
//       >
//         {/* Header Section */}
//         <div className={`flex items-center ${isCollapsed ? 'justify-center p-4' : 'justify-between p-6'} border-b border-gray-100`}>
//           {!isCollapsed && (
//             <div className="flex items-center space-x-3">
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-sm">NL</span>
//               </div>
//               <div className="lg:block hidden">
//                 <h1 className="text-lg font-bold text-gray-900">NexIntel Legal</h1>
//                 <p className="text-xs text-gray-500">Professional Edition</p>
//               </div>
//             </div>
//           )}
          
//           {isCollapsed && (
//             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">NL</span>
//             </div>
//           )}

//           {/* Mobile Close Button */}
//           <button
//             onClick={onClose}
//             className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//           >
//             <X className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>

//         {/* Navigation Section */}
//         <div className="flex-1 overflow-y-auto">
//           <div className={`${isCollapsed ? 'p-2' : 'p-6'} space-y-2`}>
//             {/* Toggle Button for Desktop */}
//             <button
//               onClick={onToggleCollapse}
//               className={`
//                 hidden lg:flex items-center justify-center
//                 ${isCollapsed ? 'w-12 h-12 mx-auto' : 'w-10 h-10 ml-auto'}
//                 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg
//                 transition-all duration-200 hover:scale-105 mb-4
//               `}
//               aria-label="Toggle Sidebar"
//             >
//               {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
//             </button>

//             {/* Navigation Items */}
//             <nav className="space-y-1">
//               {menuItems.map((item, index) => (
//                 <div key={item.id} className="relative group">
//                   <button
//                     onClick={() => {
//                       onTabChange(item.id);
//                       onClose();
//                     }}
//                     className={`
//                       relative w-full flex items-center
//                       ${isCollapsed 
//                         ? 'justify-center p-3 h-12' 
//                         : 'justify-start px-4 py-3 h-12'}
//                       rounded-lg transition-all duration-200
//                       ${activeTab === item.id
//                         ? 'bg-blue-50 text-blue-700 border border-blue-200'
//                         : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
//                     `}
//                   >
//                     {/* Icon */}
//                     <item.icon
//                       className={`w-5 h-5 transition-colors duration-200 ${
//                         activeTab === item.id ? 'text-blue-600' : 'text-gray-600'
//                       }`}
//                     />
                    
//                     {/* Label and Badge */}
//                     {!isCollapsed && (
//                       <>
//                         <span className="ml-3 font-medium text-sm flex-1 text-left">
//                           {item.label}
//                         </span>
//                         {item.badge && (
//                           <span
//                             className={`px-2 py-1 rounded-md text-xs font-medium ${
//                               activeTab === item.id
//                                 ? 'bg-blue-100 text-blue-700'
//                                 : item.badge === 'New'
//                                   ? 'bg-green-100 text-green-700'
//                                   : 'bg-gray-100 text-gray-600'
//                             }`}
//                           >
//                             {item.badge}
//                           </span>
//                         )}
//                       </>
//                     )}

//                     {/* Active Indicator */}
//                     {activeTab === item.id && (
//                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
//                     )}
//                   </button>

//                   {/* Tooltip for Collapsed State */}
//                   {isCollapsed && (
//                     <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//                       {item.label}
//                       {item.badge && (
//                         <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs">
//                           {item.badge}
//                         </span>
//                       )}
//                       <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </nav>
//           </div>
//         </div>

//         {/* Bottom Section - Only show when expanded */}
//         {!isCollapsed && (
//           <div className="p-6 border-t border-gray-100 space-y-4">
//             {/* AI Assistant Widget */}
//             <div
//               onClick={() => {
//                 onTabChange('ai-assistant');
//                 onClose();
//               }}
//               className="p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl border border-blue-100 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
//             >
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center relative">
//                   <Bot className="w-5 h-5 text-white" />
//                   <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-gray-900 text-sm">AI Assistant</h3>
//                   <p className="text-xs text-gray-600">Ready to help</p>
//                 </div>
//                 <Zap className="w-4 h-4 text-blue-600" />
//               </div>
//             </div>

//             {/* Stats Widget */}
//             <div className="p-4 bg-gray-50 rounded-xl">
//               <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center">
//                 <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
//                 This Week
//               </h4>
//               <div className="space-y-2 text-xs">
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Documents</span>
//                   <span className="font-semibold text-gray-900">24</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">AI Queries</span>
//                   <span className="font-semibold text-gray-900">156</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">Time Saved</span>
//                   <span className="font-semibold text-green-600">12.5h</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Collapsed Bottom Widget */}
//         {isCollapsed && (
//           <div className="p-2 border-t border-gray-100">
//             <div className="relative group">
//               <button
//                 onClick={() => {
//                   onTabChange('ai-assistant');
//                   onClose();
//                 }}
//                 className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto relative hover:scale-105 transition-transform duration-200"
//               >
//                 <Bot className="w-5 h-5 text-white" />
//                 <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
//               </button>
              
//               {/* Tooltip */}
//               <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
//                 AI Assistant
//                 <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Sidebar;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Home,
//   FileText,
//   Bot,
//   Settings,
//   X,
//   Zap,
//   TrendingUp,
//   ChevronLeft,
//   ChevronRight,
//   Menu,
//   BarChart3,
//   Users,
//   Shield,
//   HelpCircle,
//   CreditCard,
//   Globe
// } from 'lucide-react';

// interface SidebarProps {
//   activeTab: string;
//   onTabChange: (tab: string) => void;
//   isOpen: boolean;
//   onClose: () => void;
//   isCollapsed: boolean;
//   onToggleCollapse: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   activeTab,
//   onTabChange,
//   isOpen,
//   onClose,
//   isCollapsed,
//   onToggleCollapse
// }) => {
//   const navigate = useNavigate();

//   const menuItems = [
//     { id: 'overview', icon: Home, label: 'Overview', badge: null },
//     { id: 'documents', icon: FileText, label: 'Cases & Documents', badge: '12' },
//     { id: 'ai-tools', icon: Bot, label: 'AI Tools', badge: 'New' },
//     { id: 'ai-assistant', icon: Bot, label: 'AI Assistant', badge: null },
//     { id: 'settings', icon: Settings, label: 'Settings', badge: null }
//   ];

//   const additionalItems = [
//     { id: 'reports', icon: BarChart3, label: 'Reports & Analytics', badge: null },
//     { id: 'team', icon: Users, label: 'Team Management', badge: '3' },
//     { id: 'security', icon: Shield, label: 'Security', badge: null },
//     { id: 'integrations', icon: Globe, label: 'Integrations', badge: 'Beta' },
//     { id: 'billing', icon: CreditCard, label: 'Billing', badge: null },
//     { id: 'help', icon: HelpCircle, label: 'Help & Support', badge: null },
//   ];

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`
//           fixed lg:relative lg:translate-x-0 transition-all duration-300 ease-out
//           ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//           ${isCollapsed ? 'lg:w-20' : 'lg:w-80'}
//           bg-gradient-to-b from-slate-50 to-white border-r border-slate-200/60 z-50 lg:z-auto 
//           shadow-xl lg:shadow-none flex flex-col backdrop-blur-sm
//         `}
//         style={{ height: 'calc(100vh - 80px)' }}
//       >
//         {/* Header Section with Enhanced Styling */}
//         <div className={`
//           ${isCollapsed ? 'justify-center p-4' : 'justify-between p-6'} 
//           border-b border-slate-200/60 shrink-0 bg-white/80 backdrop-blur-sm
//         `}>
//           {/* Clickable Header for Toggle */}
//           <button
//             onClick={onToggleCollapse}
//             className={`
//               hidden lg:flex items-center transition-all duration-300 rounded-xl
//               ${isCollapsed 
//                 ? 'justify-center w-full group hover:bg-blue-50/50 p-3' 
//                 : 'flex-1 hover:bg-slate-50 p-3 -m-3 space-x-4'}
//             `}
//             title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
//           >
//             {/* Enhanced Logo */}
//             <div className={`
//               ${isCollapsed ? 'w-12 h-12' : 'w-10 h-10'} 
//               bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 
//               rounded-xl flex items-center justify-center
//               transition-all duration-300 shadow-lg hover:shadow-xl relative
//               ${isCollapsed ? 'group-hover:scale-105' : ''}
//               before:absolute before:inset-0 before:bg-white/20 before:rounded-xl before:opacity-0 
//               before:transition-opacity before:duration-300 hover:before:opacity-100
//             `}>
//               <span className={`
//                 text-white font-bold transition-all duration-300 relative z-10
//                 ${isCollapsed ? 'text-xl' : 'text-base'}
//               `}>
//                 NL
//               </span>
//               {/* Subtle glow effect */}
//               <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/20 to-indigo-600/20 blur-sm scale-110 opacity-60"></div>
//             </div>

//             {/* Company Info */}
//             {!isCollapsed && (
//               <div className="flex items-center justify-between w-full">
//                 <div className="flex flex-col">
//                   <h1 className="text-lg font-bold text-slate-800 leading-tight">NexIntel Legal</h1>
//                   <p className="text-xs text-slate-500 font-medium">Professional Edition</p>
//                 </div>
//                 <div className="flex items-center space-x-1">
//                   <ChevronLeft className="w-4 h-4 text-slate-400" />
//                 </div>
//               </div>
//             )}

//             {/* Tooltip for collapsed state */}
//             {isCollapsed && (
//               <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
//                 <div className="bg-slate-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
//                   Expand Sidebar
//                   <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-slate-900"></div>
//                 </div>
//               </div>
//             )}
//           </button>

//           {/* Mobile Header */}
//           <div className="lg:hidden flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
//               <span className="text-white font-bold text-base">NL</span>
//             </div>
//             <div>
//               <h1 className="text-lg font-bold text-slate-800">NexIntel Legal</h1>
//               <p className="text-xs text-slate-500">Professional Edition</p>
//             </div>
//           </div>

//           {/* Mobile Close Button */}
//           <button
//             onClick={onClose}
//             className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
//           >
//             <X className="w-5 h-5 text-slate-600" />
//           </button>
//         </div>

//         {/* Scrollable Navigation Section */}
//         <div className="flex-1 overflow-y-auto overflow-x-hidden">
//           <div className={`${isCollapsed ? 'p-2' : 'p-6'} space-y-2`}>
//             {/* Main Navigation */}
//             <nav className="space-y-1">
//               {menuItems.map((item, index) => (
//                 <div key={item.id} className="relative group">
//                   <button
//                     onClick={() => {
//                       onTabChange(item.id);
//                       onClose();
//                     }}
//                     className={`
//                       relative w-full flex items-center transition-all duration-200
//                       ${isCollapsed 
//                         ? 'justify-center p-3 h-12 rounded-xl' 
//                         : 'justify-start px-4 py-3 h-12 rounded-xl'}
//                       ${activeTab === item.id
//                         ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm'
//                         : 'text-slate-700 hover:bg-slate-50/80 hover:text-slate-900'}
//                     `}
//                   >
//                     {/* Icon with enhanced styling */}
//                     <div className={`
//                       flex items-center justify-center transition-all duration-200
//                       ${activeTab === item.id ? 'text-blue-600' : 'text-slate-500'}
//                       ${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'}
//                     `}>
//                       <item.icon className="w-full h-full" />
//                     </div>
                    
//                     {/* Label and Badge */}
//                     {!isCollapsed && (
//                       <>
//                         <span className="ml-3 font-medium text-sm flex-1 text-left">
//                           {item.label}
//                         </span>
//                         {item.badge && (
//                           <span className={`
//                             px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-200
//                             ${activeTab === item.id
//                               ? 'bg-blue-100 text-blue-700'
//                               : item.badge === 'New'
//                                 ? 'bg-emerald-100 text-emerald-700'
//                                 : 'bg-slate-100 text-slate-600'}
//                           `}>
//                             {item.badge}
//                           </span>
//                         )}
//                       </>
//                     )}

//                     {/* Active Indicator */}
//                     {activeTab === item.id && (
//                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
//                     )}
//                   </button>

//                   {/* Tooltip for Collapsed State */}
//                   {isCollapsed && (
//                     <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
//                       {item.label}
//                       {item.badge && (
//                         <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs">
//                           {item.badge}
//                         </span>
//                       )}
//                       <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </nav>

//             {/* Divider */}
//             <div className={`${isCollapsed ? 'mx-2' : 'mx-0'} border-t border-slate-200/60 my-4`} />

//             {/* Additional Features */}
//             {!isCollapsed && (
//               <div className="mb-4">
//                 <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
//                   More Tools
//                 </h3>
//               </div>
//             )}

//             <nav className="space-y-1">
//               {additionalItems.map((item) => (
//                 <div key={item.id} className="relative group">
//                   <button
//                     onClick={() => {
//                       onTabChange(item.id);
//                       onClose();
//                     }}
//                     className={`
//                       relative w-full flex items-center transition-all duration-200
//                       ${isCollapsed 
//                         ? 'justify-center p-3 h-12 rounded-xl' 
//                         : 'justify-start px-4 py-3 h-12 rounded-xl'}
//                       ${activeTab === item.id
//                         ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm'
//                         : 'text-slate-700 hover:bg-slate-50/80 hover:text-slate-900'}
//                     `}
//                   >
//                     <div className={`
//                       flex items-center justify-center transition-all duration-200
//                       ${activeTab === item.id ? 'text-blue-600' : 'text-slate-500'}
//                       ${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'}
//                     `}>
//                       <item.icon className="w-full h-full" />
//                     </div>
                    
//                     {!isCollapsed && (
//                       <>
//                         <span className="ml-3 font-medium text-sm flex-1 text-left">
//                           {item.label}
//                         </span>
//                         {item.badge && (
//                           <span className={`
//                             px-2 py-1 rounded-lg text-xs font-semibold
//                             ${activeTab === item.id
//                               ? 'bg-blue-100 text-blue-700'
//                               : item.badge === 'Beta'
//                                 ? 'bg-orange-100 text-orange-700'
//                                 : 'bg-slate-100 text-slate-600'}
//                           `}>
//                             {item.badge}
//                           </span>
//                         )}
//                       </>
//                     )}

//                     {activeTab === item.id && (
//                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
//                     )}
//                   </button>

//                   {isCollapsed && (
//                     <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
//                       {item.label}
//                       {item.badge && (
//                         <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs">
//                           {item.badge}
//                         </span>
//                       )}
//                       <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </nav>
//           </div>
//         </div>

//         {/* Enhanced Bottom Section - Only show when expanded */}
//         {!isCollapsed && (
//           <div className="p-6 border-t border-slate-200/60 space-y-4 shrink-0 bg-gradient-to-r from-slate-50/50 to-white">
//             {/* AI Assistant Widget */}
//             <div
//               onClick={() => {
//                 onTabChange('ai-assistant');
//                 onClose();
//               }}
//               className="p-4 bg-gradient-to-br from-blue-50 via-indigo-50/80 to-purple-50/60 rounded-2xl border border-blue-100/60 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
//             >
//               <div className="flex items-center space-x-3">
//                 <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center relative shadow-lg group-hover:shadow-xl transition-all duration-300">
//                   <Bot className="w-6 h-6 text-white" />
//                   <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-slate-900 text-sm">AI Assistant</h3>
//                   <p className="text-xs text-slate-600">Ready to help</p>
//                 </div>
//                 <Zap className="w-4 h-4 text-blue-600 opacity-60 group-hover:opacity-100 transition-opacity" />
//               </div>
//             </div>

//             {/* Enhanced Stats Widget */}
//             <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100/60 rounded-2xl border border-slate-200/60">
//               <h4 className="font-semibold text-slate-900 text-sm mb-3 flex items-center">
//                 <TrendingUp className="w-4 h-4 mr-2 text-emerald-600" />
//                 This Week
//               </h4>
//               <div className="space-y-3 text-xs">
//                 <div className="flex justify-between items-center">
//                   <span className="text-slate-600">Documents</span>
//                   <span className="font-bold text-slate-900 text-sm">24</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-slate-600">AI Queries</span>
//                   <span className="font-bold text-slate-900 text-sm">156</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-slate-600">Time Saved</span>
//                   <span className="font-bold text-emerald-600 text-sm">12.5h</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Enhanced Collapsed Bottom Widget */}
//         {isCollapsed && (
//           <div className="p-3 border-t border-slate-200/60 shrink-0 bg-gradient-to-r from-slate-50/50 to-white">
//             <div className="relative group">
//               <button
//                 onClick={() => {
//                   onTabChange('ai-assistant');
//                   onClose();
//                 }}
//                 className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto relative hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:from-blue-600 group-hover:to-indigo-700"
//               >
//                 <Bot className="w-7 h-7 text-white" />
//                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
//                 {/* Glow effect */}
//                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/30 to-indigo-600/30 blur-lg scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </button>
              
//               {/* Enhanced Tooltip */}
//               <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl">
//                 AI Assistant
//                 <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
//               </div>
//             </div>
//           </div>
//         )}
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
  ChevronRight,
  Menu,
  BarChart3,
  Users,
  Shield,
  HelpCircle,
  CreditCard,
  Globe
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

  const additionalItems = [
    { id: 'reports', icon: BarChart3, label: 'Reports & Analytics', badge: null },
    { id: 'team', icon: Users, label: 'Team Management', badge: '3' },
    { id: 'security', icon: Shield, label: 'Security', badge: null },
    { id: 'integrations', icon: Globe, label: 'Integrations', badge: 'Beta' },
    { id: 'billing', icon: CreditCard, label: 'Billing', badge: null },
    { id: 'help', icon: HelpCircle, label: 'Help & Support', badge: null },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:fixed lg:translate-x-0 transition-all duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'lg:w-20' : 'lg:w-80'}
          bg-gradient-to-b from-slate-50 to-white border-r border-slate-200/60 z-50 lg:z-auto 
          shadow-xl lg:shadow-none flex flex-col backdrop-blur-sm
          top-20 lg:top-20 left-0
        `}
        style={{ height: 'calc(100vh - 80px)' }}
      >
        {/* Header Section with Enhanced Styling */}
        <div className={`
          ${isCollapsed ? 'justify-center p-4' : 'justify-between p-6'} 
          border-b border-slate-200/60 shrink-0 bg-white/80 backdrop-blur-sm
        `}>
          {/* Clickable Header for Toggle */}
          <button
            onClick={onToggleCollapse}
            className={`
              hidden lg:flex items-center transition-all duration-300 rounded-xl
              ${isCollapsed 
                ? 'justify-center w-full group hover:bg-blue-50/50 p-3' 
                : 'flex-1 hover:bg-slate-50 p-3 -m-3 space-x-4'}
            `}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {/* Enhanced Logo */}
            <div className={`
              ${isCollapsed ? 'w-12 h-12' : 'w-10 h-10'} 
              bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 
              rounded-xl flex items-center justify-center
              transition-all duration-300 shadow-lg hover:shadow-xl relative
              ${isCollapsed ? 'group-hover:scale-105' : ''}
              before:absolute before:inset-0 before:bg-white/20 before:rounded-xl before:opacity-0 
              before:transition-opacity before:duration-300 hover:before:opacity-100
            `}>
              <span className={`
                text-white font-bold transition-all duration-300 relative z-10
                ${isCollapsed ? 'text-xl' : 'text-base'}
              `}>
                NL
              </span>
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/20 to-indigo-600/20 blur-sm scale-110 opacity-60"></div>
            </div>

            {/* Company Info */}
            {!isCollapsed && (
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-slate-800 leading-tight">NexIntel Legal</h1>
                  <p className="text-xs text-slate-500 font-medium">Professional Edition</p>
                </div>
                <div className="flex items-center space-x-1">
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            )}

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                <div className="bg-slate-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                  Expand Sidebar
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-slate-900"></div>
                </div>
              </div>
            )}
          </button>

          {/* Mobile Header */}
          <div className="lg:hidden flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-base">NL</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">NexIntel Legal</h1>
              <p className="text-xs text-slate-500">Professional Edition</p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Scrollable Navigation Section */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-400">
          <div className={`${isCollapsed ? 'p-2' : 'p-6'} space-y-2`}>
            {/* Main Navigation */}
            <nav className="space-y-1">
              {menuItems.map((item, index) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => {
                      onTabChange(item.id);
                      onClose();
                    }}
                    className={`
                      relative w-full flex items-center transition-all duration-200
                      ${isCollapsed 
                        ? 'justify-center p-3 h-12 rounded-xl' 
                        : 'justify-start px-4 py-3 h-12 rounded-xl'}
                      ${activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm'
                        : 'text-slate-700 hover:bg-slate-50/80 hover:text-slate-900'}
                    `}
                  >
                    {/* Icon with enhanced styling */}
                    <div className={`
                      flex items-center justify-center transition-all duration-200
                      ${activeTab === item.id ? 'text-blue-600' : 'text-slate-500'}
                      ${isCollapsed ? 'w-7 h-7' : 'w-6 h-6'}
                    `}>
                      <item.icon className="w-full h-full" />
                    </div>
                    
                    {/* Label and Badge */}
                    {!isCollapsed && (
                      <>
                        <span className="ml-3 font-medium text-sm flex-1 text-left">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={`
                            px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-200
                            ${activeTab === item.id
                              ? 'bg-blue-100 text-blue-700'
                              : item.badge === 'New'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-slate-100 text-slate-600'}
                          `}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}

                    {/* Active Indicator */}
                    {activeTab === item.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
                    )}
                  </button>

                  {/* Tooltip for Collapsed State */}
                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                      {item.badge && (
                        <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs">
                          {item.badge}
                        </span>
                      )}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Divider */}
            <div className={`${isCollapsed ? 'mx-2' : 'mx-0'} border-t border-slate-200/60 my-4`} />

            {/* Additional Features */}
            {!isCollapsed && (
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
                  More Tools
                </h3>
              </div>
            )}

            <nav className="space-y-1">
              {additionalItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => {
                      onTabChange(item.id);
                      onClose();
                    }}
                    className={`
                      relative w-full flex items-center transition-all duration-200
                      ${isCollapsed 
                        ? 'justify-center p-3 h-12 rounded-xl' 
                        : 'justify-start px-4 py-3 h-12 rounded-xl'}
                      ${activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-sm'
                        : 'text-slate-700 hover:bg-slate-50/80 hover:text-slate-900'}
                    `}
                  >
                    <div className={`
                      flex items-center justify-center transition-all duration-200
                      ${activeTab === item.id ? 'text-blue-600' : 'text-slate-500'}
                      ${isCollapsed ? 'w-7 h-7' : 'w-6 h-6'}
                    `}>
                      <item.icon className="w-full h-full" />
                    </div>
                    
                    {!isCollapsed && (
                      <>
                        <span className="ml-3 font-medium text-sm flex-1 text-left">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={`
                            px-2 py-1 rounded-lg text-xs font-semibold
                            ${activeTab === item.id
                              ? 'bg-blue-100 text-blue-700'
                              : item.badge === 'Beta'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-slate-100 text-slate-600'}
                          `}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}

                    {activeTab === item.id && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
                    )}
                  </button>

                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                      {item.badge && (
                        <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs">
                          {item.badge}
                        </span>
                      )}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Enhanced Bottom Section - Only show when expanded */}
        {!isCollapsed && (
          <div className="p-6 border-t border-slate-200/60 space-y-4 shrink-0 bg-gradient-to-r from-slate-50/50 to-white">
            {/* AI Assistant Widget */}
            <div
              onClick={() => {
                onTabChange('ai-assistant');
                onClose();
              }}
              className="p-4 bg-gradient-to-br from-blue-50 via-indigo-50/80 to-purple-50/60 rounded-2xl border border-blue-100/60 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center relative shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Bot className="w-6 h-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-sm">AI Assistant</h3>
                  <p className="text-xs text-slate-600">Ready to help</p>
                </div>
                <Zap className="w-4 h-4 text-blue-600 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Enhanced Stats Widget */}
            <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100/60 rounded-2xl border border-slate-200/60">
              <h4 className="font-semibold text-slate-900 text-sm mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-emerald-600" />
                This Week
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Documents</span>
                  <span className="font-bold text-slate-900 text-sm">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">AI Queries</span>
                  <span className="font-bold text-slate-900 text-sm">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Time Saved</span>
                  <span className="font-bold text-emerald-600 text-sm">12.5h</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Collapsed Bottom Widget */}
        {isCollapsed && (
          <div className="p-3 border-t border-slate-200/60 shrink-0 bg-gradient-to-r from-slate-50/50 to-white">
            <div className="relative group">
              <button
                onClick={() => {
                  onTabChange('ai-assistant');
                  onClose();
                }}
                className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto relative hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:from-blue-600 group-hover:to-indigo-700"
              >
                <Bot className="w-7 h-7 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/30 to-indigo-600/30 blur-lg scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              {/* Enhanced Tooltip */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                AI Assistant
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;