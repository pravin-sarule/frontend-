import React, { useState } from 'react';
import { Scale, Eye, EyeOff, ArrowLeft, Mail, Lock, User, Shield, Zap } from 'lucide-react';

interface AuthProps {
  onNavigate: (page: string) => void;
  onAuth: () => void;
}

const Auth: React.FC<AuthProps> = ({ onNavigate, onAuth }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    onAuth();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          {/* Back button in left corner */}
          <div className="mb-8">
            <button
              onClick={() => onNavigate('start')}
              className="inline-flex items-center text-blue-200 hover:text-white transition-all duration-300 group hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform duration-300" />
              <span className="font-medium">Back to Home</span>
            </button>
          </div>
            
          {/* NexIntel Logo */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl mb-6 shadow-lg">
              <img 
                src="/NEXINTEL AI PVT. LTD LOGO FINAL .jpg" 
                alt="NexIntel Legal AI Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-3">
              {isSignIn ? 'Welcome Back' : 'Join NexIntel'}
            </h1>
            <p className="text-blue-200 text-lg">
              {isSignIn ? 'Sign in to your professional account' : 'Create your professional legal account'}
            </p>
          </div>

          {/* Enhanced Auth Form */}
          <div className="card-premium rounded-3xl shadow-2xl p-10 border border-white/20">
            {/* Enhanced Toggle Tabs */}
            <div className="flex bg-white/10 rounded-2xl p-1.5 mb-10">
              <button
                onClick={() => setIsSignIn(true)}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  isSignIn
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                    : 'text-blue-200 hover:text-white hover:bg-white/5'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignIn(false)}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  !isSignIn
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105'
                    : 'text-blue-200 hover:text-white hover:bg-white/5'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {!isSignIn && (
                <div className="animate-slide-down">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-blue-100 mb-3">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300 group-focus-within:text-blue-200 transition-colors duration-200" />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white placeholder-blue-200 backdrop-blur-sm hover:bg-white/15"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-blue-100 mb-3">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300 group-focus-within:text-blue-200 transition-colors duration-200" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white placeholder-blue-200 backdrop-blur-sm hover:bg-white/15"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-blue-100 mb-3">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300 group-focus-within:text-blue-200 transition-colors duration-200" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-14 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white placeholder-blue-200 backdrop-blur-sm hover:bg-white/15"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-white transition-all duration-200 hover:scale-110"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isSignIn && (
                <div className="animate-slide-down">
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-blue-100 mb-3">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300 group-focus-within:text-blue-200 transition-colors duration-200" />
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white placeholder-blue-200 backdrop-blur-sm hover:bg-white/15"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
              )}

              {isSignIn && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-blue-300 hover:text-white text-sm font-semibold transition-all duration-200 hover:scale-105"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full btn-premium group"
              >
                <span className="flex items-center justify-center">
                  {isSignIn ? 'Sign In to Dashboard' : 'Create Account'}
                  <ArrowLeft className="w-5 h-5 ml-3 rotate-180 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
            </form>

            {/* Enhanced security badges */}
            {!isSignIn && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="flex flex-col items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200">
                    <Shield className="w-6 h-6 text-green-400 mb-2" />
                    <span className="text-xs text-blue-200 font-medium">Bank-Level Security</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200">
                    <Zap className="w-6 h-6 text-yellow-400 mb-2" />
                    <span className="text-xs text-blue-200 font-medium">Instant Setup</span>
                  </div>
                </div>
              </div>
            )}

            {/* Social Authentication Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-blue-200">Or, continue with:</span>
              </div>
            </div>

            {/* Social Authentication Buttons */}
            <div className="space-y-3 mb-8">
              <button
                type="button"
                className="w-full btn-outline text-white border-white/20 bg-white/10 hover:bg-white/15 backdrop-blur-sm group"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                className="w-full btn-outline text-white border-white/20 bg-white/10 hover:bg-white/15 backdrop-blur-sm group"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M23.5 12.3c0-1.4-.1-2.4-.3-3.5H12v6.6h6.4c-.3 1.6-1.2 3-2.5 3.9v3.1h4c2.4-2.2 3.6-5.4 3.6-9.1z"/>
                  <path fill="currentColor" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-4-3.1c-1.1.7-2.5 1.2-3.9 1.2-3 0-5.6-2-6.5-4.7H1.3v3c2 4 6.1 6.5 10.7 6.5z"/>
                  <path fill="currentColor" d="M5.5 14.5c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2V7H1.3C.5 8.4 0 10.1 0 12s.5 3.6 1.3 5l4.2-2.5z"/>
                  <path fill="currentColor" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.5 1.3 7l4.2 2.5C6.4 6.8 9 4.8 12 4.8z"/>
                </svg>
                Continue with Microsoft Account
              </button>

              <button
                type="button"
                className="w-full btn-outline text-white border-white/20 bg-white/10 hover:bg-white/15 backdrop-blur-sm group"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Continue with Apple
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-blue-200 text-sm">
                {isSignIn ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsSignIn(!isSignIn)}
                  className="text-blue-300 hover:text-white font-semibold transition-all duration-200 hover:scale-105"
                >
                  {isSignIn ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;