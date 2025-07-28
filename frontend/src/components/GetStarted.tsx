// import React from 'react';
// import { Scale, ChevronRight, Shield, Zap, Users, Award, Globe } from 'lucide-react';
// import Header from './Header';
// import Footer from './Footer';

// interface GetStartedProps {
//   onNavigate: (page: string) => void;
// }

// const GetStarted: React.FC<GetStartedProps> = ({ onNavigate }) => {
//   return (
//     <div className="min-h-screen bg-white">
//       <Header onNavigate={onNavigate} />
      
//       <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
//       {/* Advanced animated background elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-slow"></div>
//         <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-float-slower"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute top-10 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
//       </div>

//       {/* Animated grid pattern */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
//           backgroundSize: '50px 50px'
//         }}></div>
//       </div>

//       {/* Floating particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className={`absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float-${i % 3 === 0 ? 'slow' : i % 3 === 1 ? 'slower' : ''}`}
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${3 + Math.random() * 4}s`
//             }}
//           ></div>
//         ))}
//       </div>

//       <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
//         <div className="w-full max-w-6xl">
//           {/* Main content with enhanced animations */}
//           <div className="text-center mb-16 animate-fade-in">
//             {/* Premium logo with advanced effects */}
//             <div className="inline-flex items-center justify-center w-32 h-32 bg-white/95 backdrop-blur-sm rounded-3xl mb-12 shadow-2xl shadow-white/20 border border-white/30">
//               <img 
//                 src="/Ai logo-01.png" 
//                 alt="NexIntel Legal AI Logo" 
//                 className="w-20 h-20 object-contain filter drop-shadow-sm"
//               />
//             </div>
            
//             {/* Enhanced headline with premium typography */}
//             <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight text-white">
//               Welcome to NexIntel Legal AI
//             </h1>
            
//             {/* Premium subheadline */}
//             <p className="text-2xl md:text-3xl text-blue-100 mb-6 max-w-4xl mx-auto leading-relaxed font-light">
//               Transform Your Legal Practice with
//               <span className="font-semibold text-white"> Cutting-Edge AI Technology</span>
//             </p>
            
//             <p className="text-xl text-blue-200/80 mb-16 max-w-3xl mx-auto leading-relaxed">
//               Join thousands of legal professionals who trust NexIntel for intelligent document analysis, 
//               case research, and automated legal workflows.
//             </p>

//             {/* Trust indicators with animations */}
//             <div className="flex flex-wrap justify-center items-center gap-8 mb-16 animate-slide-up">
//               <div className="flex items-center space-x-2 text-blue-200">
//                 <Shield className="w-5 h-5 text-green-400" />
//                 <span className="text-sm font-medium">Bank-Level Security</span>
//               </div>
//               <div className="flex items-center space-x-2 text-blue-200">
//                 <Globe className="w-5 h-5 text-blue-400" />
//                 <span className="text-sm font-medium">Global Compliance</span>
//               </div>
//               <div className="flex items-center space-x-2 text-blue-200">
//                 <Users className="w-5 h-5 text-purple-400" />
//                 <span className="text-sm font-medium">10,000+ Users</span>
//               </div>
//             </div>
//           </div>

//           {/* Enhanced feature highlights */}
//           <div className="grid md:grid-cols-3 gap-8 mb-16 animate-slide-up">
//             <div className="group card-premium rounded-3xl p-8 hover-lift cursor-pointer">
//               <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
//                 <Shield className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-white font-bold text-2xl mb-4">Enterprise Security</h3>
//               <p className="text-blue-100/90 text-lg leading-relaxed">
//                 Military-grade encryption with SOC 2 compliance and zero-trust architecture 
//                 protecting your most sensitive legal data.
//               </p>
//               <div className="mt-6 flex items-center text-blue-300 group-hover:text-white transition-colors duration-300">
//                 <button 
//                   onClick={() => onNavigate('about')}
//                   className="text-sm font-medium hover:underline"
//                 >
//                   Learn about security
//                 </button>
//                 <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
//               </div>
//             </div>
            
//             <div className="group card-premium rounded-3xl p-8 hover-lift cursor-pointer">
//               <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
//                 <Zap className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-white font-bold text-2xl mb-4">AI-Powered Intelligence</h3>
//               <p className="text-blue-100/90 text-lg leading-relaxed">
//                 Advanced machine learning algorithms trained on millions of legal documents 
//                 for unprecedented accuracy and insights.
//               </p>
//               <div className="mt-6 flex items-center text-blue-300 group-hover:text-white transition-colors duration-300">
//                 <button 
//                   onClick={() => onNavigate('features')}
//                   className="text-sm font-medium hover:underline"
//                 >
//                   Explore AI capabilities
//                 </button>
//                 <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
//               </div>
//             </div>
            
//             <div className="group card-premium rounded-3xl p-8 hover-lift cursor-pointer">
//               <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
//                 <Users className="w-8 h-8 text-white" />
//               </div>
//               <h3 className="text-white font-bold text-2xl mb-4">Global Excellence</h3>
//               <p className="text-blue-100/90 text-lg leading-relaxed">
//                 Trusted by top law firms worldwide with 24/7 support and 
//                 99.9% uptime guarantee for mission-critical operations.
//               </p>
//               <div className="mt-6 flex items-center text-blue-300 group-hover:text-white transition-colors duration-300">
//                 <button 
//                   onClick={() => onNavigate('about')}
//                   className="text-sm font-medium hover:underline"
//                 >
//                   See global reach
//                 </button>
//                 <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
//               </div>
//             </div>
//           </div>

//           {/* Premium CTA Section */}
//           <div className="text-center animate-fade-in-delayed">
//             <div className="card-premium rounded-3xl p-12 shadow-2xl max-w-2xl mx-auto">
//               <h2 className="text-3xl font-bold text-white mb-6">
//                 Ready to Transform Your Legal Practice?
//               </h2>
//               <p className="text-blue-100 text-lg mb-8 leading-relaxed">
//                 Join the future of legal technology with our comprehensive AI platform.
//               </p>
              
//               <button
//                 onClick={() => onNavigate('signin')}
//                 className="btn-premium mx-auto mb-6"
//               >
//                 Get Started Now
//                 <ChevronRight className="w-7 h-7 ml-4 group-hover:translate-x-3 transition-transform duration-300" />
//               </button>
              
//               <button
//                 onClick={() => onNavigate('about')}
//                 className="btn-outline mb-6 block mx-auto"
//               >
//                 Learn More About Us
//               </button>
              
//               <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-200/80 text-sm">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                   <span>Free 30-day trial</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
//                   <span>No credit card required</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
//                   <span>Setup in 5 minutes</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Social proof section */}
//           <div className="mt-20 text-center animate-slide-up">
//             <p className="text-blue-200/60 text-sm mb-8">Trusted by leading law firms worldwide</p>
//             <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
//               {['BigLaw Partners', 'Global Legal Corp', 'Justice & Associates', 'Premier Legal Group'].map((firm, index) => (
//                 <div key={index} className="text-blue-200/40 font-semibold text-lg">
//                   {firm}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       </div>
      
//       <Footer />
//     </div>
//   );
// };

// export default GetStarted;


import React from 'react';
import { ChevronRight, Shield, Zap, Users } from 'lucide-react'; // Removed Scale, Award, Globe
import Header from './Header';
import Footer from './Footer';

// import { useNavigate } from 'react-router-dom'; // Removed useNavigate

interface GetStartedProps {
  onNavigate: (path: string) => void;
}

const GetStarted: React.FC<GetStartedProps> = ({ onNavigate }) => {
  // const navigate = useNavigate(); // No longer needed as onNavigate prop is used
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="bg-white min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          {/* Main content with enhanced animations */}
          <div className="text-center mb-16 animate-fade-in">
            {/* Enhanced headline with premium typography */}
            {/* <h1 className="text-2xl md:text-8xl font-black mb-8 leading-tight text-gray-900">
              Welcome to NexIntel Legal AI
            </h1> */}
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-snug text-gray-900">
  Welcome to NexIntel Legal AI
</h1>

            
            {/* Premium subheadline */}
            <p className="text-2xl md:text-3xl text-gray-600 mb-6 max-w-4xl mx-auto leading-relaxed font-light">
              Transform Your Legal Practice with
              <span className="font-semibold text-gray-900"> Cutting-Edge AI Technology</span>
            </p>
            
            <p className="text-xl text-gray-500 mb-16 max-w-3xl mx-auto leading-relaxed">
              Legal teams across India trust NexIntel for AI-driven document analysis, research, and automation.
            </p>

            {/* Trust indicators with animations */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-16 animate-slide-up">
              {/* <div className="flex items-center space-x-2 text-gray-600">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">Bank-Level Security</span>
              </div> */}
              {/* <div className="flex items-center space-x-2 text-gray-600">
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium">Global Compliance</span>
              </div> */}
              {/* <div className="flex items-center space-x-2 text-gray-600">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium">10,000+ Users</span>
              </div> */}
            </div>
          </div>

          {/* Enhanced feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 animate-slide-up">
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-900 font-bold text-2xl mb-4">Enterprise Security</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Military-grade encryption with SOC 2 compliance and zero-trust architecture 
                protecting your most sensitive legal data.
              </p>
              <div className="mt-6 flex items-center text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                <button
                  onClick={() => onNavigate('/about')}
                  className="text-sm font-medium hover:underline"
                >
                  Learn about security
                </button>
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-900 font-bold text-2xl mb-4">AI-Powered Intelligence</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Advanced machine learning algorithms trained on millions of legal documents 
                for unprecedented accuracy and insights.
              </p>
              <div className="mt-6 flex items-center text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                <button
                  onClick={() => onNavigate('/features')}
                  className="text-sm font-medium hover:underline"
                >
                  Explore AI capabilities
                </button>
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-900 font-bold text-2xl mb-4">Global Excellence</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Trusted by top law firms worldwide with 24/7 support and 
                99.9% uptime guarantee for mission-critical operations.
              </p>
              <div className="mt-6 flex items-center text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                <button
                  onClick={() => onNavigate('/about')}
                  className="text-sm font-medium hover:underline"
                >
                  See global reach
                </button>
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </div>

          {/* Premium CTA Section */}
          <div className="text-center animate-fade-in-delayed">
            <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-2xl mx-auto border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Legal Practice?
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Join the future of legal technology with our comprehensive AI platform.
              </p>
              
       <div className="flex justify-center items-center space-x-6 mb-6">
  <button
    onClick={() => onNavigate('/signin')}
    className="btn-outline flex items-center"
  >
    Get Started Now
    <ChevronRight className="w-6 h-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
  </button>

  <button
    onClick={() => onNavigate('/about')}
    className="btn-outline"
  >
    Learn More About Us
  </button>
</div>

              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-500 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Free 30-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>Setup in 5 minutes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social proof section */}
          <div className="mt-20 text-center animate-slide-up">
            <p className="text-gray-400 text-sm mb-8">Trusted by leading law firms worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
              {['BigLaw Partners', 'Global Legal Corp', 'Justice & Associates', 'Premier Legal Group'].map((firm, index) => (
                <div key={index} className="text-gray-400 font-semibold text-lg">
                  {firm}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GetStarted;