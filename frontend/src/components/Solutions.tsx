import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building, Scale, FileText, Shield,
  ArrowRight, ArrowLeft, CheckCircle, TrendingUp,
  Gavel, BookOpen
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const Solutions: React.FC = () => {
  const navigate = useNavigate();

  const solutions = [
    // ... same solutions content
    {
      id: 'law-firms',
      icon: Scale,
      title: 'Law Firms',
      subtitle: 'Comprehensive legal practice management',
      description: 'Streamline your entire legal practice with AI-powered document analysis, case management, and client communication tools.',
      features: [
        'Case management and tracking',
        'Document automation and templates',
        'Client portal and communication',
        'Time tracking and billing',
        'Legal research and precedents',
        'Compliance monitoring'
      ],
      benefits: [
        '60% faster document processing',
        '40% reduction in research time',
        '25% increase in billable hours',
        'Improved client satisfaction'
      ],
      color: 'blue',
      image: '⚖️'
    },
    {
      id: 'corporate-legal',
      icon: Building,
      title: 'Corporate Legal Teams',
      subtitle: 'Enterprise legal operations',
      description: 'Empower your in-house legal team with advanced contract management, compliance tracking, and risk assessment tools.',
      features: [
        'Contract lifecycle management',
        'Compliance dashboard and alerts',
        'Risk assessment and mitigation',
        'Legal spend management',
        'Vendor and supplier agreements',
        'Regulatory change tracking'
      ],
      benefits: [
        '50% faster contract reviews',
        '70% reduction in compliance risks',
        '30% cost savings on legal spend',
        'Enhanced regulatory compliance'
      ],
      color: 'indigo',
      image: '🏢'
    },
    {
      id: 'litigation',
      icon: Gavel,
      title: 'Litigation Support',
      subtitle: 'Advanced litigation management',
      description: 'Accelerate your litigation process with AI-powered document discovery, case analysis, and brief generation.',
      features: [
        'Document discovery and review',
        'Case timeline and evidence tracking',
        'Brief and motion generation',
        'Deposition preparation',
        'Expert witness management',
        'Settlement analysis'
      ],
      benefits: [
        '80% faster document review',
        '45% reduction in discovery costs',
        'Improved case outcomes',
        'Enhanced trial preparation'
      ],
      color: 'purple',
      image: '⚖️'
    },
    {
      id: 'compliance',
      icon: Shield,
      title: 'Compliance & Risk',
      subtitle: 'Regulatory compliance management',
      description: 'Stay ahead of regulatory changes with automated compliance monitoring, risk assessment, and reporting tools.',
      features: [
        'Regulatory change monitoring',
        'Compliance gap analysis',
        'Risk scoring and assessment',
        'Audit trail and reporting',
        'Policy management',
        'Training and certification tracking'
      ],
      benefits: [
        '90% reduction in compliance gaps',
        '60% faster audit preparation',
        'Proactive risk management',
        'Automated reporting'
      ],
      color: 'green',
      image: '🛡️'
    },
    {
      id: 'contract-management',
      icon: FileText,
      title: 'Contract Management',
      subtitle: 'Intelligent contract lifecycle',
      description: 'Manage your entire contract lifecycle with AI-powered analysis, automated workflows, and smart notifications.',
      features: [
        'Contract creation and templates',
        'Automated review and analysis',
        'Approval workflows',
        'Renewal and expiration alerts',
        'Performance tracking',
        'Vendor relationship management'
      ],
      benefits: [
        '65% faster contract processing',
        '35% reduction in contract risks',
        'Improved vendor relationships',
        'Better contract terms'
      ],
      color: 'orange',
      image: '📄'
    },
    {
      id: 'legal-research',
      icon: BookOpen,
      title: 'Legal Research',
      subtitle: 'AI-powered research platform',
      description: 'Transform your legal research with intelligent search, case analysis, and precedent identification.',
      features: [
        'Semantic legal search',
        'Case law analysis',
        'Precedent identification',
        'Citation verification',
        'Research collaboration',
        'Knowledge management'
      ],
      benefits: [
        '70% faster research process',
        'More comprehensive results',
        'Improved legal arguments',
        'Enhanced case preparation'
      ],
      color: 'teal',
      image: '📚'
    }
  ];


  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float-slower"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 py-24">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="absolute top-8 left-8">
              <button
                onClick={() => navigate('/')}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:scale-105"
                title="Back to Home"
              >
                <ArrowLeft className="w-6 h-6 text-white group-hover:text-blue-200 transition-colors duration-300" />
              </button>
            </div>

            <div className="animate-fade-in">
              <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  Legal
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to--600 bg-clip-text text-transparent">
                  Solutions
                </span>
              </h1>
              <p className="text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                Tailored AI solutions for every legal practice, from solo practitioners to global enterprises
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Solutions by Practice Area</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized AI solutions designed for your specific legal needs and practice requirements
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-6">
                  <div className="text-6xl mb-4">{solution.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                        <solution.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{solution.title}</h3>
                        <p className="text-gray-600">{solution.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">{solution.description}</p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {solution.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
                        <ul className="space-y-2">
                          {solution.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 group">
                      <span className="flex items-center justify-center">
                        Learn More
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Transform Your Practice?</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover how NexIntel AI can revolutionize your legal workflow and drive better outcomes
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/signin')}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 group"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 group"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Solutions;
