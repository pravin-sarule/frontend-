import React from 'react';
import { TrendingUp, FileText, Clock, Users, ChevronRight } from 'lucide-react';

// import { useNavigate } from 'react-router-dom'; // Removed useNavigate

interface OverviewContentProps {
  onNavigate: (path: string) => void;
}

const OverviewContent: React.FC<OverviewContentProps> = ({ onNavigate }) => {
  // const navigate = useNavigate(); // No longer needed as onNavigate prop is used
  const stats = [
    { label: 'Active Cases', value: '12', icon: FileText, color: 'blue' },
    { label: 'Documents Processed', value: '247', icon: TrendingUp, color: 'green' },
    { label: 'Hours Saved', value: '89.5', icon: Clock, color: 'purple' },
    { label: 'Team Members', value: '8', icon: Users, color: 'orange' }
  ];

  const recentActivity = [
    { action: 'Document summarized', document: 'Contract_Amendment_2024.pdf', time: '2 hours ago' },
    { action: 'Case analysis completed', document: 'Johnson vs. Smith', time: '4 hours ago' },
    { action: 'Legal brief generated', document: 'Motion to Dismiss', time: '1 day ago' },
    { action: 'Document comparison', document: 'Terms of Service v1.2', time: '2 days ago' }
  ];

  const quickActions = [
    { title: 'Upload New Document', description: 'Add documents for AI analysis', action: () => onNavigate('/dashboard/upload') },
    { title: 'Generate Legal Brief', description: 'Create professional legal documents', action: () => onNavigate('/dashboard/legal-brief-generator') },
    { title: 'Case Summary', description: 'Get AI-powered case summaries', action: () => onNavigate('/dashboard/document-summarizer') },
    { title: 'Document Search', description: 'Find relevant documents quickly', action: () => onNavigate('/dashboard/case-law-research') }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your legal work.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600 truncate">{activity.document}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-700">{action.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;