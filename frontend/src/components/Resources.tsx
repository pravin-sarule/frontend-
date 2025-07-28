import React from 'react';
import { 
  BookOpen, FileText, Video, Download, ExternalLink,
  MessageCircle, Calendar, Mail, Phone, HelpCircle,
  ArrowRight, ArrowLeft
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

import { Link } from 'react-router-dom';

const Resources: React.FC = () => {
  const resourceCategories = [
    {
      id: 'documentation',
      title: 'Documentation',
      icon: BookOpen,
      color: 'blue',
      description: 'Comprehensive guides and API documentation',
      resources: [
        { title: 'Getting Started Guide', type: 'Guide', duration: '10 min read', link: '#' },
        { title: 'API Documentation', type: 'Technical', duration: 'Reference', link: '#' },
        { title: 'Integration Manual', type: 'Guide', duration: '15 min read', link: '#' },
        { title: 'Best Practices', type: 'Guide', duration: '8 min read', link: '#' }
      ]
    },
    {
      id: 'tutorials',
      title: 'Video Tutorials',
      icon: Video,
      color: 'blue',
      description: 'Step-by-step video guides and walkthroughs',
      resources: [
        { title: 'Platform Overview', type: 'Video', duration: '12 min', link: '#' },
        { title: 'Document Analysis Workflow', type: 'Video', duration: '18 min', link: '#' },
        { title: 'AI Tools Masterclass', type: 'Video', duration: '25 min', link: '#' },
        { title: 'Advanced Features', type: 'Video', duration: '20 min', link: '#' }
      ]
    },
    {
      id: 'webinars',
      title: 'Webinars & Events',
      icon: Calendar,
      color: 'blue',
      description: 'Live sessions and recorded webinars',
      resources: [
        { title: 'AI in Legal Practice - Live Session', type: 'Webinar', duration: 'Jan 25, 2024', link: '#' },
        { title: 'Contract Analysis Deep Dive', type: 'Webinar', duration: 'Feb 8, 2024', link: '#' },
        { title: 'Compliance Automation Workshop', type: 'Workshop', duration: 'Feb 15, 2024', link: '#' },
        { title: 'Q&A with Legal Experts', type: 'Live Q&A', duration: 'Monthly', link: '#' }
      ]
    },
    {
      id: 'whitepapers',
      title: 'Whitepapers & Reports',
      icon: FileText,
      color: 'blue',
      description: 'In-depth research and industry insights',
      resources: [
        { title: 'The Future of Legal AI', type: 'Whitepaper', duration: '24 pages', link: '#' },
        { title: 'Legal Tech Trends 2024', type: 'Report', duration: '18 pages', link: '#' },
        { title: 'ROI of Legal Automation', type: 'Case Study', duration: '12 pages', link: '#' },
        { title: 'Compliance in Digital Age', type: 'Whitepaper', duration: '20 pages', link: '#' }
      ]
    }
  ];

  const supportOptions = [
    {
      title: 'Help Center',
      description: 'Find answers to common questions and troubleshooting guides',
      icon: HelpCircle,
      color: 'blue',
      action: 'Browse Articles'
    },
    {
      title: 'Live Chat Support',
      description: '24/7 instant support from our technical team',
      icon: MessageCircle,
      color: 'blue',
      action: 'Start Chat'
    },
    {
      title: 'Schedule Demo',
      description: 'Book a personalized demo with our product experts',
      icon: Calendar,
      color: 'blue',
      action: 'Book Demo'
    },
    {
      title: 'Contact Support',
      description: 'Get direct help from our support specialists',
      icon: Mail,
      color: 'blue',
      action: 'Contact Us'
    }
  ];


  const downloads = [
    {
      title: 'Mobile App - iOS',
      description: 'Access NexIntel AI on your iPhone and iPad',
      icon: Download,
      size: '45 MB',
      version: 'v2.1.0'
    },
    {
      title: 'Mobile App - Android',
      description: 'Access NexIntel AI on your Android device',
      icon: Download,
      size: '38 MB',
      version: 'v2.1.0'
    },
    {
      title: 'Desktop Client',
      description: 'Native desktop application for Windows and Mac',
      icon: Download,
      size: '120 MB',
      version: 'v1.8.2'
    },
    {
      title: 'Browser Extension',
      description: 'Chrome and Firefox extension for quick access',
      icon: Download,
      size: '2.1 MB',
      version: 'v1.4.1'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br  from-[#0f172a] via-[#1e293b] to-[#334155] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl"></div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 py-24">
          {/* Back to Home Icon Button */}
          <div className="absolute top-8 left-8">
            <Link
              to="/"
              className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:scale-105"
              title="Back to Home"
            >
              <ArrowLeft className="w-6 h-6 text-white group-hover:text-blue-200 transition-colors duration-300" />
            </Link>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                Resources
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                & Support
              </span>
            </h1>
            <p className="text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Everything you need to succeed with NexIntel AI - from documentation to community support
            </p>
          </div>
        </div>
      </div>

      {/* Resource Categories */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Learning Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive resources to help you master NexIntel AI and maximize your productivity
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {resourceCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${category.color}-500 to-${category.color}-700 rounded-2xl flex items-center justify-center`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {category.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group cursor-pointer">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                          {resource.title}
                        </h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500">{resource.type}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{resource.duration}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                    </div>
                  ))}
                </div>
                
                <button className={`w-full mt-6 bg-gradient-to-r from-${category.color}-500 to-${category.color}-700 hover:from-${category.color}-600 hover:to-${category.color}-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105`}>
                  View All {category.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Get Support</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to get help when you need it most
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportOptions.map((option, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 text-center flex flex-col h-full"
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-${option.color}-500 to-${option.color}-700 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{option.description}</p>
                <div className="mt-auto">
                  <button className={`w-full bg-${option.color}-600 hover:bg-${option.color}-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200`}>
                    {option.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
{/* 
      {/* Community */}
      {/* <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Our Community</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with fellow legal professionals and get the most out of NexIntel AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {communityResources.map((community, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 text-center flex flex-col h-full"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <community.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{community.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{community.description}</p>
                <div className="text-sm text-blue-600 font-semibold mb-6">{community.members}</div>
                <div className="mt-auto">
                  <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105">
                    Join Community
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>  */}

      {/* Downloads */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Downloads</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access NexIntel AI on all your devices with our native applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {downloads.map((download, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <download.icon className="w-8 h-8 text-blue-600" />
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{download.size}</div>
                    <div className="text-xs text-gray-400">{download.version}</div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{download.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{download.description}</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Need More Help?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Our support team is here to help you succeed with NexIntel AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition group"
            >
              Contact Support
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            
            <div className="flex items-center space-x-4 text-blue-200">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 92264 08832</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@nexintelai.com</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-blue-200/80 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>24/7 support available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Average response: 2 hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>Expert technical team</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Resources;