import React, { useState } from 'react';
import { Check, Star, Zap, Users, Crown, ArrowRight, ArrowLeft, Phone, Mail } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

import { Link } from 'react-router-dom';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small law firms and individual practitioners',
      icon: Zap,
      color: 'blue',
      popular: false,
      monthlyPrice: 2999,
      yearlyPrice: 29990,
      features: [
        'Up to 100 documents per month',
        'Basic AI document analysis',
        'Email support',
        'Standard security',
        '2 user accounts',
        'Basic templates library',
        'Document summarization',
        'Basic search functionality'
      ]
    },
    {
      name: 'Professional',
      description: 'Ideal for growing law firms and legal departments',
      icon: Users,
      color: 'indigo',
      popular: true,
      monthlyPrice: 7999,
      yearlyPrice: 79990,
      features: [
        'Up to 500 documents per month',
        'Advanced AI analysis & insights',
        'Priority email & chat support',
        'Enhanced security features',
        '10 user accounts',
        'Premium templates library',
        'Contract analysis & review',
        'Advanced search & filtering',
        'Case law research',
        'Custom workflows',
        'API access',
        'Analytics dashboard'
      ]
    },
    {
      name: 'Enterprise',
      description: 'Comprehensive solution for large organizations',
      icon: Crown,
      color: 'purple',
      popular: false,
      monthlyPrice: 19999,
      yearlyPrice: 199990,
      features: [
        'Unlimited documents',
        'Full AI suite with custom models',
        '24/7 dedicated support',
        'Enterprise-grade security',
        'Unlimited user accounts',
        'Custom templates & workflows',
        'Advanced compliance checking',
        'Multi-language support',
        'Custom integrations',
        'White-label options',
        'Dedicated account manager',
        'Custom training & onboarding',
        'SLA guarantees',
        'On-premise deployment option'
      ]
    }
  ];

  const addOns = [
    {
      name: 'Additional Users',
      description: 'Add more team members to your plan',
      price: 499,
      unit: 'per user/month'
    },
    {
      name: 'Extra Document Processing',
      description: 'Process more documents beyond your plan limit',
      price: 5,
      unit: 'per document'
    },
    {
      name: 'Premium Support',
      description: '24/7 phone support with dedicated account manager',
      price: 2999,
      unit: 'per month'
    },
    {
      name: 'Custom AI Training',
      description: 'Train AI models on your specific legal domain',
      price: 49999,
      unit: 'one-time setup'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

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
                <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                  Simple
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Pricing
                </span>
              </h1>
              <p className="text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                Choose the perfect plan for your legal practice. All plans include our core AI features with scalable options.
              </p>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center mb-8">
                <div className="bg-white/10 rounded-2xl p-1.5 backdrop-blur-sm border border-white/20">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      billingCycle === 'monthly'
                        ? 'bg-white text-blue-900 shadow-lg'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      billingCycle === 'yearly'
                        ? 'bg-white text-blue-900 shadow-lg'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Yearly
                    <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">Save 17%</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border ${
                  plan.popular ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-gray-200'
                } animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="p-8 flex flex-col h-full">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-br from-${plan.color}-500 to-${plan.color}-700 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {formatPrice(billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice)}
                    </div>
                    <div className="text-gray-500">
                      per {billingCycle === 'monthly' ? 'month' : 'year'}
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="text-green-600 text-sm font-medium mt-1">
                        Save {formatPrice(plan.monthlyPrice * 12 - plan.yearlyPrice)} annually
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <button
                    className={`w-full ${
                      plan.popular
                        ? 'btn-primary'
                        : 'btn-secondary'
                    }`}
                    >
                    Get Started
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add-ons Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Add-ons & Extensions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your plan with additional features and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={addon.name}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h4 className="text-lg font-bold text-gray-900 mb-3">{addon.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{addon.description}</p>
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {formatPrice(addon.price)}
                </div>
                <div className="text-gray-500 text-sm">{addon.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Common questions about our pricing and plans
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Can I change my plan anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                question: "Is there a free trial available?",
                answer: "Yes, we offer a 30-day free trial for all plans. No credit card required to get started."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, UPI, net banking, and bank transfers for Indian customers."
              },
              {
                question: "Do you offer custom enterprise solutions?",
                answer: "Yes, we provide custom solutions for large enterprises with specific requirements. Contact our sales team for more information."
              },
              {
                question: "Is my data secure?",
                answer: "Absolutely. We use enterprise-grade security with SOC 2 compliance, end-to-end encryption, and regular security audits."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h4 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Legal Practice?</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of legal professionals who trust NexIntel AI for their document analysis and case research needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/signin"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition group"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              <div className="flex items-center space-x-4 text-blue-200">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+91 92264 08832</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">info@nexintelai.com</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 text-blue-200/80 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;