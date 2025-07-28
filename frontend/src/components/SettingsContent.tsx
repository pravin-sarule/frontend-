import React, { useState } from 'react';
import { User, Bell, Shield, Palette, HelpCircle, LogOut } from 'lucide-react';

interface SettingsContentProps {
  onSignOut: () => void;
}

const SettingsContent: React.FC<SettingsContentProps> = ({ onSignOut }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [theme, setTheme] = useState('light');
  const [accentColor, setAccentColor] = useState('blue');
  const [interfaceFontSize, setInterfaceFontSize] = useState('medium');
  const [documentFontSize, setDocumentFontSize] = useState('medium');

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true
  });

  // Apply theme changes to document
  const applyTheme = (selectedTheme: string) => {
    setTheme(selectedTheme);
    const root = document.documentElement;
    
    if (selectedTheme === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--background', '222.2 84% 4.9%');
      root.style.setProperty('--foreground', '210 40% 98%');
      root.style.setProperty('--border', '217.2 32.6% 17.5%');
    } else if (selectedTheme === 'light') {
      root.classList.remove('dark');
      root.style.setProperty('--background', '0 0% 100%');
      root.style.setProperty('--foreground', '222.2 84% 4.9%');
      root.style.setProperty('--border', '214.3 31.8% 91.4%');
    } else if (selectedTheme === 'auto') {
      // Auto theme based on system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  };

  // Apply accent color changes
  const applyAccentColor = (color: string) => {
    setAccentColor(color);
    const root = document.documentElement;
    
    const colorMap: { [key: string]: string } = {
      blue: '#3b82f6',
      indigo: '#6366f1',
      purple: '#8b5cf6',
      green: '#10b981',
      orange: '#f59e0b',
      red: '#ef4444'
    };
    
    const selectedColor = colorMap[color] || colorMap.blue;
    root.style.setProperty('--color-primary', selectedColor);
    
    // Update CSS custom properties for the selected color
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --accent-color: ${selectedColor};
      }
      .btn-premium, .bg-blue-600, .bg-gradient-to-r.from-blue-500 {
        background: ${selectedColor} !important;
      }
      .text-blue-600, .text-blue-500 {
        color: ${selectedColor} !important;
      }
      .border-blue-500, .ring-blue-500 {
        border-color: ${selectedColor} !important;
      }
      .focus\\:ring-blue-500:focus {
        --tw-ring-color: ${selectedColor} !important;
      }
    `;
    
    // Remove previous accent color styles
    const existingStyle = document.getElementById('accent-color-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    style.id = 'accent-color-style';
    document.head.appendChild(style);
  };

  // Apply font size changes
  const applyFontSize = (type: 'interface' | 'document', size: string) => {
    const root = document.documentElement;
    
    const fontSizeMap: { [key: string]: string } = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '20px'
    };
    
    if (type === 'interface') {
      setInterfaceFontSize(size);
      root.style.setProperty('--interface-font-size', fontSizeMap[size] || '16px');
      document.body.style.fontSize = fontSizeMap[size] || '16px';
    } else {
      setDocumentFontSize(size);
      root.style.setProperty('--document-font-size', fontSizeMap[size] || '16px');
      
      // Apply to document content areas
      const style = document.createElement('style');
      style.textContent = `
        textarea, .document-content, .text-content {
          font-size: ${fontSizeMap[size] || '16px'} !important;
        }
      `;
      
      const existingStyle = document.getElementById('document-font-style');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      style.id = 'document-font-style';
      document.head.appendChild(style);
    }
  };
  const settingSections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: User,
      description: 'Manage your account information and preferences'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Configure how you receive updates and alerts'
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: Shield,
      description: 'Manage your security settings and data privacy'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      description: 'Customize the look and feel of your workspace'
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: HelpCircle,
      description: 'Get help and contact our support team'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-4 border border-gray-200 sticky top-24">
            <nav className="space-y-2">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <section.icon className={`w-5 h-5 ${
                    activeSection === section.id ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <div>
                    <p className={`font-medium ${
                      activeSection === section.id ? 'text-blue-900' : 'text-gray-900'
                    }`}>{section.title}</p>
                    <p className="text-xs text-gray-500">{section.description}</p>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Conditional Content Based on Active Section */}
          {activeSection === 'profile' && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-6">
                <User className="w-5 h-5 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue="john.doe@lawfirm.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    defaultValue="Senior Partner"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeSection === 'notifications' && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="w-5 h-5 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.email ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive browser notifications</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.push ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.push ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Weekly Summary</p>
                    <p className="text-sm text-gray-500">Receive weekly activity reports</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, weekly: !prev.weekly }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications.weekly ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.weekly ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Help & Support */}
          {activeSection === 'help' && (
            <div className="space-y-6">
              {/* Support Channels */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  <h2 className="text-xl font-semibold text-gray-900">Help & Support</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Contact Support</h3>
                    
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        📞
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Phone Support</p>
                        <p className="text-sm text-blue-600">+91 92264 08832</p>
                        <p className="text-xs text-gray-500">24/7 Available</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        💬
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Live Chat</p>
                        <p className="text-sm text-green-600">Start Chat</p>
                        <p className="text-xs text-gray-500">Average response: 2 min</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        📧
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Email Support</p>
                        <p className="text-sm text-purple-600">hr@nexintelai.com</p>
                        <p className="text-xs text-gray-500">Response within 4 hours</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Knowledge Base</h3>
                    
                    <button className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        📚
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">User Guide</p>
                        <p className="text-sm text-gray-500">Complete documentation</p>
                      </div>
                    </button>
                    
                    <button className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        🎥
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Video Tutorials</p>
                        <p className="text-sm text-gray-500">Step-by-step guides</p>
                      </div>
                    </button>
                    
                    <button className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        ❓
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">FAQ</p>
                        <p className="text-sm text-gray-500">Common questions</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200 text-left">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      📝
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Submit Feedback</p>
                      <p className="text-sm text-gray-500">Share your thoughts</p>
                    </div>
                  </button>
                  
                  <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors duration-200 text-left">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      🐛
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Report Bug</p>
                      <p className="text-sm text-gray-500">Technical issues</p>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* System Information */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">System Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Platform Version</span>
                      <span className="text-sm font-medium text-gray-900">v2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Browser</span>
                      <span className="text-sm font-medium text-gray-900">Chrome 120.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Updated</span>
                      <span className="text-sm font-medium text-gray-900">Jan 15, 2024</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Account Type</span>
                      <span className="text-sm font-medium text-gray-900">Professional</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Subscription</span>
                      <span className="text-sm font-medium text-green-600">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Storage Used</span>
                      <span className="text-sm font-medium text-gray-900">2.4 GB / 10 GB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other sections would go here with similar conditional rendering */}
          {activeSection === 'security' && (
            <div className="space-y-6">
              {/* Password & Authentication */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <h2 className="text-xl font-semibold text-gray-900">Security & Privacy</h2>
                </div>
                
                <div className="space-y-6">
                  {/* Password Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Password & Authentication</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Change Password</p>
                          <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                          Change
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-green-600 font-medium">Enabled</span>
                          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                            Manage
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Login Notifications</p>
                          <p className="text-sm text-gray-500">Get notified of new sign-ins</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Privacy Settings */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Data Collection</p>
                      <p className="text-sm text-gray-500">Allow analytics to improve our service</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Usage Statistics</p>
                      <p className="text-sm text-gray-500">Share anonymous usage data</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Marketing Communications</p>
                      <p className="text-sm text-gray-500">Receive product updates and offers</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Profile Visibility</p>
                      <p className="text-sm text-gray-500">Show your profile to team members</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Data Management */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Download Your Data</p>
                      <p className="text-sm text-gray-500">Export all your account data</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                      Download
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Data Retention</p>
                      <p className="text-sm text-gray-500">Manage how long we keep your data</p>
                    </div>
                    <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="1year">1 Year</option>
                      <option value="2years" selected>2 Years</option>
                      <option value="5years">5 Years</option>
                      <option value="forever">Forever</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <p className="font-medium text-red-900">Delete Account</p>
                      <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                    </div>
                    <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Security Status */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Status</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Account Security</p>
                        <p className="text-sm text-green-600">Excellent</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        🔐
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Data Encryption</p>
                        <p className="text-sm text-blue-600">AES-256 Enabled</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        🛡️
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Compliance</p>
                        <p className="text-sm text-purple-600">SOC 2, GDPR</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        📊
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Last Security Scan</p>
                        <p className="text-sm text-orange-600">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Security Activity</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Successful login</p>
                        <p className="text-xs text-gray-500">Chrome on Windows • New York, NY</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Password changed</p>
                        <p className="text-xs text-gray-500">Security settings updated</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">1 day ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">2FA enabled</p>
                        <p className="text-xs text-gray-500">Two-factor authentication activated</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">3 days ago</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Account created</p>
                        <p className="text-xs text-gray-500">Welcome to NexIntel Legal AI</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">1 week ago</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm py-2 transition-colors duration-200">
                  View All Activity
                </button>
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="space-y-6">
              {/* Theme Settings */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <Palette className="w-5 h-5 text-gray-400" />
                  <h2 className="text-xl font-semibold text-gray-900">Appearance Settings</h2>
                </div>
                
                <div className="space-y-6">
                  {/* Theme Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <input 
                          type="radio" 
                          id="light" 
                          name="theme" 
                          value="light" 
                          checked={theme === 'light'}
                          onChange={() => applyTheme('light')}
                          className="sr-only" 
                        />
                        <label htmlFor="light" className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors duration-200 ${
                          theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}>
                          <div className="w-16 h-12 bg-white border border-gray-200 rounded-lg mb-3 flex items-center justify-center">
                            <div className="w-8 h-2 bg-gray-300 rounded"></div>
                          </div>
                          <span className="font-medium text-gray-900">Light</span>
                          <span className="text-sm text-gray-600">Default theme</span>
                        </label>
                      </div>
                      
                      <div className="relative">
                        <input 
                          type="radio" 
                          id="dark" 
                          name="theme" 
                          value="dark" 
                          checked={theme === 'dark'}
                          onChange={() => applyTheme('dark')}
                          className="sr-only" 
                        />
                        <label htmlFor="dark" className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 ${
                          theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}>
                          <div className="w-16 h-12 bg-gray-800 border border-gray-600 rounded-lg mb-3 flex items-center justify-center">
                            <div className="w-8 h-2 bg-gray-600 rounded"></div>
                          </div>
                          <span className="font-medium text-gray-900">Dark</span>
                          <span className="text-sm text-gray-600">Easy on eyes</span>
                        </label>
                      </div>
                      
                      <div className="relative">
                        <input 
                          type="radio" 
                          id="auto" 
                          name="theme" 
                          value="auto" 
                          checked={theme === 'auto'}
                          onChange={() => applyTheme('auto')}
                          className="sr-only" 
                        />
                        <label htmlFor="auto" className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 ${
                          theme === 'auto' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}>
                          <div className="w-16 h-12 bg-gradient-to-r from-white to-gray-800 border border-gray-300 rounded-lg mb-3 flex items-center justify-center">
                            <div className="w-8 h-2 bg-gradient-to-r from-gray-300 to-gray-600 rounded"></div>
                          </div>
                          <span className="font-medium text-gray-900">Auto</span>
                          <span className="text-sm text-gray-600">System preference</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Color Scheme */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Accent Color</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => applyAccentColor('blue')}
                          className={`w-8 h-8 bg-blue-600 rounded-full border-2 transition-colors duration-200 ${
                            accentColor === 'blue' ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-300 hover:border-blue-600'
                          }`}
                        ></button>
                        <button 
                          onClick={() => applyAccentColor('indigo')}
                          className={`w-8 h-8 bg-indigo-600 rounded-full border-2 transition-colors duration-200 ${
                            accentColor === 'indigo' ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-gray-300 hover:border-indigo-600'
                          }`}
                        ></button>
                        <button 
                          onClick={() => applyAccentColor('purple')}
                          className={`w-8 h-8 bg-purple-600 rounded-full border-2 transition-colors duration-200 ${
                            accentColor === 'purple' ? 'border-purple-600 ring-2 ring-purple-200' : 'border-gray-300 hover:border-purple-600'
                          }`}
                        ></button>
                        <button 
                          onClick={() => applyAccentColor('green')}
                          className={`w-8 h-8 bg-green-600 rounded-full border-2 transition-colors duration-200 ${
                            accentColor === 'green' ? 'border-green-600 ring-2 ring-green-200' : 'border-gray-300 hover:border-green-600'
                          }`}
                        ></button>
                        <button 
                          onClick={() => applyAccentColor('orange')}
                          className={`w-8 h-8 bg-orange-600 rounded-full border-2 transition-colors duration-200 ${
                            accentColor === 'orange' ? 'border-orange-600 ring-2 ring-orange-200' : 'border-gray-300 hover:border-orange-600'
                          }`}
                        ></button>
                        <button 
                          onClick={() => applyAccentColor('red')}
                          className={`w-8 h-8 bg-red-600 rounded-full border-2 transition-colors duration-200 ${
                            accentColor === 'red' ? 'border-red-600 ring-2 ring-red-200' : 'border-gray-300 hover:border-red-600'
                          }`}
                        ></button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Font Size */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Font Size</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Interface font size</span>
                        <select 
                          value={interfaceFontSize}
                          onChange={(e) => applyFontSize('interface', e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Document font size</span>
                        <select 
                          value={documentFontSize}
                          onChange={(e) => applyFontSize('document', e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                          <option value="extra-large">Extra Large</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Layout Settings */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Layout Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Compact Mode</p>
                      <p className="text-sm text-gray-500">Reduce spacing for more content</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Sidebar Auto-collapse</p>
                      <p className="text-sm text-gray-500">Automatically hide sidebar on small screens</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Show Animations</p>
                      <p className="text-sm text-gray-500">Enable smooth transitions and effects</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Display Settings */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Display Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dashboard Layout</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="grid">Grid View</option>
                      <option value="list" selected>List View</option>
                      <option value="compact">Compact View</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Items per Page</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="10">10 items</option>
                      <option value="25" selected>25 items</option>
                      <option value="50">50 items</option>
                      <option value="100">100 items</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Show Tooltips</p>
                      <p className="text-sm text-gray-500">Display helpful hints on hover</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Save Button */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Save Changes</h3>
                    <p className="text-sm text-gray-600">Apply your appearance preferences</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200">
                    Save Appearance Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Account Actions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Actions</h2>
            
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Change Password</p>
                    <p className="text-sm text-gray-500">Update your account password</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Contact Support</p>
                    <p className="text-sm text-gray-500">Get help from our support team</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={onSignOut}
                className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <LogOut className="w-5 h-5 text-red-500" />
                  <div className="text-left">
                    <p className="font-medium text-red-700 group-hover:text-red-800">Sign Out</p>
                    <p className="text-sm text-red-500">Sign out of your account</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;