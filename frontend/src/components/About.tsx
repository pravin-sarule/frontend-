import React from 'react';
import { Target, Eye, Users, Globe, Shield, Zap, Building, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface AboutProps {
  onNavigate: (page: string) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const stats = [
    { label: 'Years of Innovation', value: '5+', icon: Calendar },
    { label: 'Enterprise Clients', value: '100+', icon: Building },
    { label: 'AI Solutions Deployed', value: '50+', icon: Zap },
    { label: 'Team Members', value: '25+', icon: Users }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Enterprise-grade security with SOC 2 compliance and zero-trust architecture protecting sensitive data.'
    },
    {
      icon: Zap,
      title: 'Innovation Excellence',
      description: 'Cutting-edge AI technology combined with deep industry expertise to deliver transformative solutions.'
    },
    {
      icon: Users,
      title: 'Human-Centric Design',
      description: 'User-first approach ensuring our AI solutions enhance human capabilities rather than replace them.'
    },
    {
      icon: Globe,
      title: 'Global Standards',
      description: 'International compliance and quality standards with local expertise and understanding.'
    }
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
              <button
                onClick={() => onNavigate('/')}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:scale-105"
                title="Back to Home"
              >
                <ArrowLeft className="w-6 h-6 text-white group-hover:text-blue-200 transition-colors duration-300" />
              </button>
            </div>
            
            <div className="animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  About
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  NexIntel AI
                </span>
              </h1>
              <p className="text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                Next-generation artificial intelligence company transforming knowledge-intensive, compliance-driven sectors
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Security Section */}
          <div className="mb-20">
            <div className="text-center mb-16 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Enterprise Security</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Military-grade encryption with SOC 2 compliance and zero-trust architecture protecting your most sensitive legal data
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">SOC 2 Compliance</h4>
                <p className="text-gray-600 leading-relaxed">
                  Certified SOC 2 Type II compliance ensuring the highest standards for security, availability, and confidentiality of your legal data.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Zero-Trust Architecture</h4>
                <p className="text-gray-600 leading-relaxed">
                  Advanced zero-trust security model that verifies every user and device before granting access to sensitive legal information.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">End-to-End Encryption</h4>
                <p className="text-gray-600 leading-relaxed">
                  Military-grade AES-256 encryption protects your data both in transit and at rest, ensuring complete confidentiality.
                </p>
              </div>
            </div>
          </div>

          {/* Global Reach Section */}
          <div className="mb-20">
            <div className="text-center mb-16 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Global Excellence</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Trusted by top law firms worldwide with 24/7 support and 99.9% uptime guarantee for mission-critical operations
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Worldwide Presence</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">50+ countries served globally</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">10,000+ legal professionals trust us</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">99.9% uptime guarantee</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">24/7 multilingual support</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-2xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-2xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-2xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
                <div className="text-center p-6 bg-orange-50 rounded-2xl">
                  <div className="text-3xl font-bold text-orange-600 mb-2">10K+</div>
                  <div className="text-sm text-gray-600">Users</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">About Us</h2>
              <div className="prose prose-lg text-gray-700 leading-relaxed space-y-6">
                <p>
                  <strong>NexIntel AI Pvt Ltd</strong> is a next-generation artificial intelligence company based in Chhatrapati Sambhajinagar, Maharashtra. We are committed to building intelligent automation systems for knowledge-intensive, compliance-driven sectors.
                </p>
                <p>
                  Our core focus lies in transforming traditional, document-heavy workflows through advanced AI solutions tailored for legal, business, and operational ecosystems. By combining cutting-edge technology with real-world enterprise insight, we empower professionals to achieve clarity, efficiency, and scalability.
                </p>
              </div>
            </div>
            
            <div className="animate-slide-up">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Vision */}
            <div className="animate-fade-in">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 h-full border border-blue-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-6">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To empower businesses and professionals through intelligent, user-centric AI solutions that simplify complex, document-heavy workflows—driving better productivity, transparency, and decision-making in compliance-led environments.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="animate-fade-in">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 h-full border border-purple-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To be India's most trusted AI innovation partner by delivering secure, scalable, and human-first technologies that transform legal, operational, and enterprise systems across knowledge-driven sectors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our innovation and drive our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Timeline
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our mission to transform AI technology
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} animate-slide-up`} style={{ animationDelay: `${index * 200}ms` }}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}

      {/* Location */}
      <div className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-8">
              <MapPin className="w-10 h-10 text-blue-300" />
            </div>
            <h2 className="text-4xl font-bold mb-6">Visit Our Office</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Located in the heart of Maharashtra's technology hub
            </p>
            <div className="text-lg text-blue-200">
              <div className="font-semibold">B11, near Railway Station Road, MIDC</div>
              <div>Chhatrapati Sambhajinagar, Maharashtra 431005</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;