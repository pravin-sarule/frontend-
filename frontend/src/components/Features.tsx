import React from 'react';
import { 
  Bot, FileText, Search, Zap, Shield, BarChart3, 
  Clock, Users, Globe, Award, CheckCircle, ArrowRight, ArrowLeft,
  Brain, Target, Layers, Sparkles, Lock
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

import { Link } from 'react-router-dom';

const Features: React.FC = () => {
  const coreFeatures = [
    {
      icon: Bot,
      title: 'Advanced AI Engine',
      description: 'State-of-the-art natural language processing trained on millions of legal documents for unparalleled accuracy and insight.',
      features: ['GPT-4 powered analysis', 'Legal domain expertise', 'Multi-language support', 'Continuous learning']
    },
    {
      icon: FileText,
      title: 'Document Intelligence',
      description: 'Automatically extract, analyze, and summarize key information from any legal document with precision and speed.',
      features: ['Smart extraction', 'Auto-summarization', 'Key clause identification', 'Risk assessment']
    },
    {
      icon: Search,
      title: 'Intelligent Search',
      description: 'Find relevant cases, precedents, and legal information instantly with our advanced semantic search capabilities.',
      features: ['Semantic search', 'Case law database', 'Precedent matching', 'Citation analysis']
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption, SOC 2 compliance, and zero-trust architecture.',
      features: ['End-to-end encryption', 'SOC 2 certified', 'GDPR compliant', 'Audit trails']
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Gain deep insights into your legal work with comprehensive analytics and performance metrics.',
      features: ['Performance dashboards', 'Time tracking', 'Productivity metrics', 'Custom reports']
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Seamlessly collaborate with your team with shared workspaces, real-time editing, and version control.',
      features: ['Shared workspaces', 'Real-time collaboration', 'Version control', 'Team permissions']
    }
  ];

  const aiCapabilities = [
    {
      icon: Brain,
      title: 'Legal Reasoning',
      description: 'Advanced AI that understands legal context and reasoning patterns'
    },
    {
      icon: Target,
      title: 'Precision Analysis',
      description: '99.7% accuracy in document classification and risk assessment'
    },
    {
      icon: Layers,
      title: 'Multi-Modal Processing',
      description: 'Process text, images, tables, and complex document structures'
    },
    {
      icon: Sparkles,
      title: 'Automated Workflows',
      description: 'Intelligent automation for repetitive legal tasks and processes'
    }
  ];

  const integrations = [
    { name: 'Microsoft Office', logo: '📄', description: 'Word, Excel, PowerPoint integration' },
    { name: 'Google Workspace', logo: '📊', description: 'Docs, Sheets, Drive compatibility' },
    { name: 'Slack', logo: '💬', description: 'Team communication integration' },
    { name: 'Salesforce', logo: '☁️', description: 'CRM and client management' },
    { name: 'DocuSign', logo: '✍️', description: 'Electronic signature workflow' },
    { name: 'Box', logo: '📦', description: 'Cloud storage and file management' }
  ];

  const securityFeatures = [
    { icon: Lock, title: 'Data Encryption', description: 'AES-256 encryption at rest and in transit' },
    { icon: Shield, title: 'Access Control', description: 'Role-based permissions and multi-factor authentication' },
    { icon: Globe, title: 'Compliance', description: 'SOC 2, GDPR, HIPAA, and ISO 27001 certified' },
    { icon: Award, title: 'Audit Ready', description: 'Comprehensive audit trails and compliance reporting' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] relative overflow-hidden">
        {/* Enhanced animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-float-slower"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 py-24">
          <div className="max-w-7xl mx-auto px-4 text-center">
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
            
            <div className="animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  Powerful
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Features
                </span>
              </h1>
              <p className="text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                Discover the comprehensive suite of AI-powered tools designed to transform your legal practice
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4">
          {/* AI Capabilities Highlight */}
          <div className="mb-20">
            <div className="text-center mb-16 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">AI-Powered Intelligence</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Advanced machine learning algorithms trained on millions of legal documents for unprecedented accuracy and insights
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Deep Learning</h4>
                <p className="text-sm text-gray-600">Neural networks trained on millions of legal documents</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">99.7% Accuracy</h4>
                <p className="text-sm text-gray-600">Industry-leading precision in document analysis</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Multi-Modal AI</h4>
                <p className="text-sm text-gray-600">Process text, images, and complex document structures</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Smart Automation</h4>
                <p className="text-sm text-gray-600">Intelligent workflows for repetitive legal tasks</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Core Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to streamline your legal workflow and enhance productivity
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {feature.features.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Capabilities */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">AI Capabilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge artificial intelligence designed specifically for legal professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiCapabilities.map((capability, index) => (
              <div
                key={index}
                className="text-center group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <capability.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{capability.title}</h3>
                <p className="text-gray-600 leading-relaxed">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="py-20 bg-gradient-to-br from-blue-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Enterprise Security</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your data is protected by industry-leading security measures and compliance standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((security, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <security.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">{security.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{security.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Seamless Integrations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with your favorite tools and platforms for a unified workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{integration.logo}</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{integration.name}</h4>
                    <p className="text-gray-600 text-sm">{integration.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">Performance That Delivers</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Proven results that transform legal practices worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '99.7%', label: 'Accuracy Rate', icon: Target },
              { value: '75%', label: 'Time Saved', icon: Clock },
              { value: '10,000+', label: 'Active Users', icon: Users },
              { value: '50+', label: 'Countries', icon: Globe }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-300" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Experience These Features?</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of legal professionals who have transformed their practice with NexIntel AI
            </p>
            
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onNavigate('signin')}
                className="btn-premium group"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              
              <button
                onClick={() => onNavigate('contact')}
                className="btn-outline"
              >
                Schedule Demo
              </button>
            </div> */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
  <Link
    to="/signin"
    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition group"
  >
    Start Free Trial
    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
  </Link>

  <Link
    to="/contact"
    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition group"
  >
    Schedule Demo
    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
  </Link>
</div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-gray-500 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Setup in minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Features;