import React, { useState } from 'react';
import { MapPin, Mail, Phone, User, MessageCircle, Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      firstName: '',
      email: '',
      subject: '',
      message: ''
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Please fill out this field.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please fill out this field.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please fill out this field.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please fill out this field.';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission here
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We will get back to you soon.');
      // Reset form
      setFormData({
        firstName: '',
        email: '',
        subject: '',
        message: ''
      });
    }
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
                <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  Contact
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Us
                </span>
              </h1>
              <p className="text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                We'd love to hear from you! Please feel free to reach out to us using the contact information below or by filling out the form.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information & Form Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-12">Get In Touch</h2>
              
              <div className="space-y-8">
                {/* Address */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Our Address</h3>
                      <p className="text-gray-600 leading-relaxed">
                        B11, c/o Grind Master Machines Pvt Ltd<br />
                        MIDC, Chhatrapati Sambhajinagar – 431005,<br />
                        Maharashtra, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Email Address</h3>
                      <a href="mailto:hr@nexintelai.com" className="text-blue-600 hover:text-blue-700 font-medium text-lg transition-colors duration-200">
                        hr@nexintelai.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Phone</h3>
                      <a href="tel:+919226408832" className="text-blue-600 hover:text-blue-700 font-medium text-lg transition-colors duration-200">
                        +91 92264 08832
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slide-up">
              <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* First Name and Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First Name"
                          className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 ${
                            errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                          required
                        />
                      </div>
                      {errors.firstName && (
                        <div className="absolute -bottom-6 left-0 text-red-500 text-sm font-medium">
                          {errors.firstName}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email Address"
                          className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 ${
                            errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                          }`}
                          required
                        />
                      </div>
                      {errors.email && (
                        <div className="absolute -bottom-6 left-0 text-red-500 text-sm font-medium">
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="relative">
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Subject"
                        className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 ${
                          errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        required
                      />
                    </div>
                    {errors.subject && (
                      <div className="absolute -bottom-6 left-0 text-red-500 text-sm font-medium">
                        {errors.subject}
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <div className="relative">
                      <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write Message..."
                        rows={6}
                        className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 resize-none ${
                          errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        required
                      />
                    </div>
                    {errors.message && (
                      <div className="absolute -bottom-6 left-0 text-red-500 text-sm font-medium">
                        {errors.message}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      className="btn-primary group"
                    >
                      SEND MESSAGE
                      <Send className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;