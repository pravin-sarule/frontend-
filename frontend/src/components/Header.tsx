import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const Header: React.FC = () => {
  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-md">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span>📞</span>
              <span>+91 92264 08832</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✉️</span>
              <span>hr@nexintelai.com</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <span>📍</span>
              <span>B11, MIDC,Near RailwayStation Road, Chhatrapati Sambhajinagar, Maharashtra</span>
            </div>
          </div>
          <div className="text-xs">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>24/7 Support Available</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        
        <Link to="/" className="flex flex-col items-center">
          <img
            src="/NEXINTEL AI PVT. LTD LOGO FINAL .jpg"
            alt="NEXINTEL AI Logo"
            className="h-12 object-contain"
          />
          <div className="text-xs text-gray-500 mt-1">Professional Legal Intelligence Platform</div>
        </Link>


        {/* Navigation */}
        <nav className="hidden lg:flex space-x-4 text-sm">
          <Link to="/solutions" className="px-3 py-1 rounded-md text-gray-700 hover:bg-blue-100 transition">Solutions</Link>
          <Link to="/features" className="px-3 py-1 rounded-md text-gray-700 hover:bg-blue-100 transition">Features</Link>
          <Link to="/pricing" className="px-3 py-1 rounded-md text-gray-700 hover:bg-blue-100 transition">Pricing</Link>
          <Link to="/resources" className="px-3 py-1 rounded-md text-gray-700 hover:bg-blue-100 transition">Resources</Link>
          <Link to="/about" className="px-3 py-1 rounded-md text-gray-700 hover:bg-blue-100 transition">About Us</Link>
          <Link to="/contact" className="px-3 py-1 rounded-md text-gray-700 hover:bg-blue-100 transition">Contact</Link>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/signin"
            className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Sign In
          </Link>
          <Link
            to="/signin"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
