// import React from 'react';
// import { Scale, Twitter, Linkedin, Facebook, Youtube, Mail, Phone, MapPin, Shield, Award, Globe, Users } from 'lucide-react';

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
//       {/* Background effects */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
//       </div>

//       <div className="relative z-10">
//         {/* Trust indicators */}
//         <div className="border-b border-white/10 py-8">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//               <div className="flex flex-col items-center space-y-2">
//                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
//                   <Shield className="w-6 h-6 text-green-400" />
//                 </div>
//                 <span className="text-sm font-medium">SOC 2 Certified</span>
//                 <span className="text-xs text-blue-200">Enterprise Security</span>
//               </div>
//               <div className="flex flex-col items-center space-y-2">
//                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
//                   <Award className="w-6 h-6 text-yellow-400" />
//                 </div>
//                 <span className="text-sm font-medium">Industry Leader</span>
//                 <span className="text-xs text-blue-200">Legal Tech Awards 2024</span>
//               </div>
//               <div className="flex flex-col items-center space-y-2">
//                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
//                   <Users className="w-6 h-6 text-purple-400" />
//                 </div>
//                 <span className="text-sm font-medium">10,000+ Users</span>
//                 <span className="text-xs text-blue-200">Trusted Worldwide</span>
//               </div>
//               <div className="flex flex-col items-center space-y-2">
//                 <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
//                   <Globe className="w-6 h-6 text-blue-400" />
//                 </div>
//                 <span className="text-sm font-medium">Global Reach</span>
//                 <span className="text-xs text-blue-200">50+ Countries</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main footer content */}
//         <div className="py-16">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
//               {/* Company info */}
//               <div className="lg:col-span-2">
//                 <div className="flex items-center space-x-4 mb-6">
//                   <div className="flex items-center justify-center w-12 h-12 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
//                     <img 
//                       src="/Ai logo-01.png" 
//                       alt="NexIntel Legal AI Logo" 
//                       className="w-8 h-8 object-contain filter drop-shadow-sm"
//                     />
//                   </div>
//                   <div>
//                     <span className="text-xl font-bold">NexIntel Legal AI</span>
//                     <div className="text-xs text-blue-200">Professional Edition</div>
//                   </div>
//                 </div>
//                 <p className="text-blue-100 mb-6 leading-relaxed">
//                   Transforming legal practice with cutting-edge AI technology. Trusted by leading law firms worldwide for intelligent document analysis and case research.
//                 </p>
//                 <div className="flex space-x-4">
//                   <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
//                     <Twitter className="w-5 h-5" />
//                   </a>
//                   <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
//                     <Linkedin className="w-5 h-5" />
//                   </a>
//                   <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
//                     <Facebook className="w-5 h-5" />
//                   </a>
//                   <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
//                     <Youtube className="w-5 h-5" />
//                   </a>
//                 </div>
//               </div>

//               {/* Solutions */}
//               <div>
//                 <h3 className="text-lg font-semibold mb-6">Solutions</h3>
//                 <ul className="space-y-3">
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Law Firms</a></li>
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Corporate Legal</a></li>
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Litigation Support</a></li>
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Compliance & Risk</a></li>
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Contract Management</a></li>
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Legal Research</a></li>
//                 </ul>
//               </div>

//               {/* Features */}
//               <div>
//                 <h3 className="text-lg font-semibold mb-6">Features</h3>
//                 <ul className="space-y-3">
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">AI Engine</a></li>
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Document Intelligence</a></li>
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Smart Search</a></li>
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Analytics</a></li>
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Collaboration</a></li>
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Security</a></li>
//                 </ul>
//               </div>

//               {/* Company */}
//               <div>
//                 <h3 className="text-lg font-semibold mb-6">Company</h3>
//                 <ul className="space-y-3">
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">About Us</a></li>
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Careers</a></li>
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Press</a></li>
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Partners</a></li>
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Security</a></li>
//                   <li><a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Trust Center</a></li>
//                 </ul>
//               </div>

//               {/* Contact */}
//               <div>
//                 <h3 className="text-lg font-semibold mb-6">Contact</h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-3">
//                     <Phone className="w-5 h-5 text-blue-400" />
//                     <span className="text-blue-200">+91 92264 08832</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <Mail className="w-5 h-5 text-blue-400" />
//                     <span className="text-blue-200">hr@nexintelai.com</span>
//                   </div>
//                   <div className="flex items-start space-x-3">
//                     <MapPin className="w-5 h-5 text-blue-400 mt-1" />
//                     <div className="text-blue-200">
//                       <div>B11, near Railway Station Road, MIDC</div>
//                       <div>Chhatrapati Sambhajinagar, Maharashtra 431005</div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-6">
//                   <h4 className="font-semibold mb-3">Newsletter</h4>
//                   <div className="flex">
//                     <input
//                       type="email"
//                       placeholder="Enter your email"
//                       className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-blue-200"
//                     />
//                     <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors duration-200">
//                       Subscribe
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="border-t border-white/10 py-8">
//           <div className="max-w-7xl mx-auto px-4">
//             <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//               <div className="text-blue-200 text-sm">
//                 © 2024 NexIntel Legal AI. All rights reserved.
//               </div>
//               <div className="flex items-center space-x-6 text-sm">
//                 <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Privacy Policy</a>
//                 <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Terms of Service</a>
//                 <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">Cookie Policy</a>
//                 <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">GDPR</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import {
  Scale, Twitter, Linkedin, Facebook, Youtube, Mail, Phone, MapPin,
  Shield, Award, Globe, Users
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    // <footer className="bg-gradient-to-br from-[#1f1f47] via-[#2d2d7a] to-[#1c1c3a] text-white relative overflow-hidden">
    <footer className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white">

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Trust Indicators */}
        <div className="border-b border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: <Shield className="w-6 h-6 text-green-400" />, title: "SOC 2 Certified", desc: "Enterprise Security" },
                { icon: <Award className="w-6 h-6 text-yellow-400" />, title: "Industry Leader", desc: "Legal Tech Awards 2024" },
                { icon: <Users className="w-6 h-6 text-purple-400" />, title: "10,000+ Users", desc: "Trusted Worldwide" },
                { icon: <Globe className="w-6 h-6 text-cyan-400" />, title: "Global Reach", desc: "50+ Countries" }
              ].map(({ icon, title, desc }, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">{icon}</div>
                  <span className="text-sm font-medium">{title}</span>
                  <span className="text-xs text-slate-300">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
              {/* Logo & Intro */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/90 rounded-xl shadow-lg border border-white/20">
                    <img
                      src="/Ai logo-01.png"
                      alt="NexIntel Legal AI Logo"
                      className="w-8 h-8 object-contain filter drop-shadow-sm"
                    />
                  </div>
                  <div>
                    <span className="text-xl font-bold">NexIntel Legal AI</span>
                    <div className="text-xs text-slate-300">Professional Edition</div>
                  </div>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Transforming legal practice with cutting-edge AI technology. Trusted by top law firms for intelligent document analysis and case research.
                </p>
                <div className="flex space-x-4">
                  {[Twitter, Linkedin, Facebook, Youtube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h3 className="text-lg font-semibold mb-6">Solutions</h3>
                <ul className="space-y-3">
                  {["Law Firms", "Corporate Legal", "Litigation Support", "Compliance & Risk", "Contract Management", "Legal Research"].map((item, i) => (
                    <li key={i}><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">{item}</a></li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold mb-6">Features</h3>
                <ul className="space-y-3">
                  {["AI Engine", "Document Intelligence", "Smart Search", "Analytics", "Collaboration", "Security"].map((item, i) => (
                    <li key={i}><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">{item}</a></li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-lg font-semibold mb-6">Company</h3>
                <ul className="space-y-3">
                  {["About Us", "Careers", "Press", "Partners", "Security", "Trust Center"].map((item, i) => (
                    <li key={i}><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">{item}</a></li>
                  ))}
                </ul>
              </div>

              {/* Contact
              <div>
                <h3 className="text-lg font-semibold mb-6">Contact</h3>
                <div className="space-y-4 text-slate-300">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-cyan-400" />
                    <span>+91 92264 08832</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span>hr@nexintelai.com</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-cyan-400 mt-1" />
                    <div>
                      <div>B11, near Railway Station Road, MIDC</div>
                      <div>Chhatrapati Sambhajinagar, Maharashtra 431005</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Newsletter</h4>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg focus:ring-2 focus:ring-cyan-400 text-white placeholder-slate-300"
                    />
                    <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-r-lg transition-colors duration-200">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-slate-300 text-sm">
                © 2024 NexIntel Legal AI. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map((item, i) => (
                  <a key={i} href="#" className="text-slate-300 hover:text-white transition-colors duration-200">{item}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
