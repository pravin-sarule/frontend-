// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import GetStarted from './components/GetStarted';
// import Auth from './components/Auth';
// import Dashboard from './components/Dashboard';
// import About from './components/About';
// import Contact from './components/Contact';
// import Pricing from './components/Pricing';
// import Features from './components/Features';
// import Solutions from './components/Solutions';
// import Resources from './components/Resources';
// import UploadDocument from './components/UploadDocument';

// function App() {
//   const [currentPage, setCurrentPage] = useState<'start' | 'signin' | 'signup' | 'dashboard' | 'about' | 'contact' | 'pricing' | 'features' | 'solutions' | 'resources' | 'upload'>('start');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Scroll to top whenever the page changes
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [currentPage]);

//   const handleNavigation = (page: string) => {
//     if (page === 'signin' || page === 'signup' || page === 'about' || page === 'contact' || page === 'pricing' || page === 'features' || page === 'solutions' || page === 'resources' || page === 'upload') {
//       setCurrentPage(page as 'signin' | 'signup' | 'about' | 'contact' | 'pricing' | 'features' | 'solutions' | 'resources' | 'upload');
//     } else if (page === 'start') {
//       setCurrentPage('start');
//     }
//   };

//   const handleAuth = () => {
//     setIsAuthenticated(true);
//     setCurrentPage('dashboard');
//   };

//   const handleSignOut = () => {
//     setIsAuthenticated(false);
//     setCurrentPage('start');
//   };

//   if (isAuthenticated || currentPage === 'dashboard') {
//     return <Dashboard onSignOut={handleSignOut} onNavigate={handleNavigation} />;
//   }

//   if (currentPage === 'signin' || currentPage === 'signup') {
//     return <Auth onNavigate={handleNavigation} onAuth={handleAuth} />;
//   }

//   if (currentPage === 'about') {
//     return <About onNavigate={handleNavigation} />;
//   }

//   if (currentPage === 'contact') {
//     return <Contact onNavigate={handleNavigation} />;
//   }

//   if (currentPage === 'pricing') {
//     return <Pricing onNavigate={handleNavigation} />;
//   }

//   if (currentPage === 'features') {
//     return <Features onNavigate={handleNavigation} />;
//   }

//   if (currentPage === 'solutions') {
//     return <Solutions onNavigate={handleNavigation} />;
//   }

//   if (currentPage === 'resources') {
//     return <Resources onNavigate={handleNavigation} />;
//   }

//   if (currentPage === 'upload') {
//     return <UploadDocument onBack={() => handleNavigation('dashboard')} />;
//   }
//   return <GetStarted onNavigate={handleNavigation} />;
// }

// export default App;

// App.tsx
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import GetStarted from './components/GetStarted';
// import Auth from './components/Auth';
// import Dashboard from './components/Dashboard';
// import About from './components/About';
// import Contact from './components/Contact';
// import Pricing from './components/Pricing';
// import Features from './components/Features';
// import Solutions from './components/Solutions';
// import Resources from './components/Resources';
// import UploadDocument from './components/UploadDocument';

// function App() {
//   const [currentPage, setCurrentPage] = useState<'start' | 'signin' | 'signup' | 'dashboard' | 'about' | 'contact' | 'pricing' | 'features' | 'solutions' | 'resources' | 'upload'>('start');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [currentPage]);

//   const handleNavigation = (page: string) => {
//     if (['signin', 'signup', 'about', 'contact', 'pricing', 'features', 'solutions', 'resources', 'upload'].includes(page)) {
//       setCurrentPage(page as typeof currentPage);
//     } else if (page === 'start') {
//       setCurrentPage('start');
//     }
//   };

//   const handleAuth = () => {
//     setIsAuthenticated(true);
//     setCurrentPage('dashboard');
//   };

//   const handleSignOut = () => {
//     setIsAuthenticated(false);
//     setCurrentPage('start');
//   };

//   if (isAuthenticated || currentPage === 'dashboard') {
//     return <Dashboard onSignOut={handleSignOut} onNavigate={handleNavigation} />;
//   }
[{
	"resource": "/home/pe-basic1/Downloads/project/src/components/About.tsx",
	"owner": "typescript",
	"code": "2322",
	"severity": 8,
	"message": "Type '{ onNavigate: (page: string) => void; }' is not assignable to type 'IntrinsicAttributes'.\n  Property 'onNavigate' does not exist on type 'IntrinsicAttributes'.",
	"source": "ts",
	"startLineNumber": 50,
	"startColumn": 15,
	"endLineNumber": 50,
	"endColumn": 25,
	"origin": "extHost1"
},{
	"resource": "/home/pe-basic1/Downloads/project/src/components/About.tsx",
	"owner": "typescript",
	"code": "6133",
	"severity": 4,
	"message": "'Award' is declared but its value is never read.",
	"source": "ts",
	"startLineNumber": 2,
	"startColumn": 30,
	"endLineNumber": 2,
	"endColumn": 35,
	"tags": [
		1
	],
	"origin": "extHost1"
},{
	"resource": "/home/pe-basic1/Downloads/project/src/components/About.tsx",
	"owner": "typescript",
	"code": "6133",
	"severity": 4,
	"message": "'milestones' is declared but its value is never read.",
	"source": "ts",
	"startLineNumber": 41,
	"startColumn": 9,
	"endLineNumber": 41,
	"endColumn": 19,
	"tags": [
		1
	],
	"origin": "extHost1"
},{
	"resource": "/home/pe-basic1/Downloads/project/src/components/ComplianceChecker.tsx",
	"owner": "typescript",
	"code": "6133",
	"severity": 4,
	"message": "'Upload' is declared but its value is never read.",
	"source": "ts",
	"startLineNumber": 2,
	"startColumn": 21,
	"endLineNumber": 2,
	"endColumn": 27,
	"tags": [
		1
	],
	"origin": "extHost1"
},{
	"resource": "/home/pe-basic1/Downloads/project/src/components/ComplianceChecker.tsx",
	"owner": "typescript",
	"code": "6133",
	"severity": 4,
	"message": "'Settings' is declared but its value is never read.",
	"source": "ts",
	"startLineNumber": 2,
	"startColumn": 85,
	"endLineNumber": 2,
	"endColumn": 93,
	"tags": [
		1
	],
	"origin": "extHost1"
},{
	"resource": "/home/pe-basic1/Downloads/project/src/components/DocumentSummarizer.tsx",
	"owner": "typescript",
	"code": "6133",
	"severity": 4,
	"message": "'Upload' is declared but its value is never read.",
	"source": "ts",
	"startLineNumber": 2,
	"startColumn": 21,
	"endLineNumber": 2,
	"endColumn": 27,
	"tags": [
		1
	],
	"origin": "extHost1"
}]
//   if (currentPage === 'signin' || currentPage === 'signup') {
//     return <Auth onNavigate={handleNavigation} onAuth={handleAuth} />;
//   }

//   switch (currentPage) {
//     case 'about':
//       return <About onNavigate={handleNavigation} />;
//     case 'contact':
//       return <Contact onNavigate={handleNavigation} />;
//     case 'pricing':
//       return <Pricing onNavigate={handleNavigation} />;
//     case 'features':
//       return <Features onNavigate={handleNavigation} />;
//     case 'solutions':
//       return <Solutions onNavigate={handleNavigation} />;
//     case 'resources':
//       return <Resources onNavigate={handleNavigation} />;
//     case 'upload':
//       return <UploadDocument onBack={() => handleNavigation('dashboard')} />;
//     default:
//       return <GetStarted onNavigate={handleNavigation} />;
//   }
// }

// export default App;


// src/App.tsx
// // src/App.tsx
// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// import GetStarted from './components/GetStarted';
// import SignIn from './components/auth/SignIn';
// import SignUp from './components/auth/SignUp';
// import Dashboard from './components/Dashboard';
// import About from './components/About';
// import Contact from './components/Contact';
// import Pricing from './components/Pricing';
// import Features from './components/Features';
// import Solutions from './components/Solutions';
// import Resources from './components/Resources';
// import UploadDocument from './components/UploadDocument';
//  // Use only this Header
// import OverviewContent from './components/OverviewContent';
// import DocumentsContent from './components/DocumentsContent';
// import AIToolsContent from './components/AIToolsContent';
// import AIAssistantContent from './components/AIAssistantContent';
// import SettingsContent from './components/SettingsContent';
// import CaseLawResearch from './components/CaseLawResearch';
// import ComplianceChecker from './components/ComplianceChecker';
// import ContractAnalyzer from './components/ContractAnalyzer';
// import DocumentComparison from './components/DocumentComparison';
// import DocumentSummarizer from './components/DocumentSummarizer';
// import LegalBriefGenerator from './components/LegalBriefGenerator';
// import OCRTool from './components/OCRTool';

// // Scroll restoration on route change
// const ScrollToTop = () => {
//   const { pathname } = useLocation();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   return null;
// };

// // 🔐 Protected route wrapper
// const PrivateRoute = ({ isAuthenticated, children }: { isAuthenticated: boolean; children: JSX.Element }) => {
//   return isAuthenticated ? children : <Navigate to="/signin" />;
// };

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleAuth = () => setIsAuthenticated(true);
//   const handleSignOut = () => setIsAuthenticated(false);

//   return (
//     <>
//       <ScrollToTop />
//       {/* ✅ This is the only header rendered */}
//       <Routes>
//         <Route path="/" element={<GetStarted />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/pricing" element={<Pricing />} />
//         <Route path="/features" element={<Features />} />
//         <Route path="/solutions" element={<Solutions />} />
//         <Route path="/resources" element={<Resources />} />

//         {/* Protected routes */}
//         <Route
//           path="/dashboard/*"
//           element={
//             <PrivateRoute isAuthenticated={isAuthenticated}>
//               <Dashboard onSignOut={handleSignOut} />
//             </PrivateRoute>
//           }
//         >
//           <Route index element={<OverviewContent />} />
//           <Route path="overview" element={<OverviewContent />} />
//           <Route path="documents" element={<DocumentsContent />} />
//           <Route path="ai-tools" element={<AIToolsContent activeView="main" onViewChange={() => {}} />} />
//           <Route path="ai-assistant" element={<AIAssistantContent />} />
//           <Route path="settings" element={<SettingsContent onSignOut={handleSignOut} />} />
//           <Route path="upload" element={<UploadDocument />} />
//           <Route path="case-law-research" element={<CaseLawResearch />} />
//           <Route path="compliance-checker" element={<ComplianceChecker />} />
//           <Route path="contract-analyzer" element={<ContractAnalyzer />} />
//           <Route path="document-comparison" element={<DocumentComparison />} />
//           <Route path="document-summarizer" element={<DocumentSummarizer />} />
//           <Route path="legal-brief-generator" element={<LegalBriefGenerator />} />
//           <Route path="ocr-tool" element={<OCRTool />} />
//         </Route>

//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </>
//   );
// }

// export default App;
// ✅ App.tsx
// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// import GetStarted from './components/GetStarted';
// import SignIn from './components/auth/SignIn';
// import SignUp from './components/auth/SignUp';
// import Dashboard from './components/Dashboard';
// import About from './components/About';
// import Contact from './components/Contact';
// import Pricing from './components/Pricing';
// import Features from './components/Features';
// import Solutions from './components/Solutions';
// import Resources from './components/Resources';
// import UploadDocument from './components/UploadDocument';
// import OverviewContent from './components/OverviewContent';
// import DocumentsContent from './components/DocumentsContent';
// import AIToolsContent from './components/AIToolsContent';
// import AIAssistantContent from './components/AIAssistantContent';
// import SettingsContent from './components/SettingsContent';
// import CaseLawResearch from './components/CaseLawResearch';
// import ComplianceChecker from './components/ComplianceChecker';
// import ContractAnalyzer from './components/ContractAnalyzer';
// import DocumentComparison from './components/DocumentComparison';
// import DocumentSummarizer from './components/DocumentSummarizer';
// import LegalBriefGenerator from './components/LegalBriefGenerator';
// import OCRTool from './components/OCRTool';

// const ScrollToTop = () => {
//   const { pathname } = useLocation();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   return null;
// };

// // 🔐 Protected Route
// const PrivateRoute = ({ isAuthenticated, children }: { isAuthenticated: boolean; children: JSX.Element }) => {
//   return isAuthenticated ? children : <Navigate to="/signin" />;
// };

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
//     return localStorage.getItem('isAuthenticated') === 'true';
//   });

//   const handleAuth = () => {
//     localStorage.setItem('isAuthenticated', 'true');
//     setIsAuthenticated(true);
//   };

//   const handleSignOut = () => {
//     localStorage.removeItem('isAuthenticated');
//     setIsAuthenticated(false);
//   };

//   return (
//     <>
//       <ScrollToTop />
//       <Routes>
//         <Route path="/" element={<GetStarted />} />
//         <Route path="/signin" element={<SignIn onAuth={handleAuth} />} />
//         <Route path="/signup" element={<SignUp onAuth={handleAuth} />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/pricing" element={<Pricing />} />
//         <Route path="/features" element={<Features />} />
//         <Route path="/solutions" element={<Solutions />} />
//         <Route path="/resources" element={<Resources />} />

//         {/* ✅ Protected Dashboard */}
//         <Route
//           path="/dashboard/*"
//           element={
//             <PrivateRoute isAuthenticated={isAuthenticated}>
//               <Dashboard onSignOut={handleSignOut} />
//             </PrivateRoute>
//           }
//         >
//           <Route index element={<OverviewContent />} />
//           <Route path="overview" element={<OverviewContent />} />
//           <Route path="documents" element={<DocumentsContent />} />
//           <Route path="ai-tools" element={<AIToolsContent activeView="main" onViewChange={() => {}} />} />
//           <Route path="ai-assistant" element={<AIAssistantContent />} />
//           <Route path="settings" element={<SettingsContent onSignOut={handleSignOut} />} />
//           <Route path="upload" element={<UploadDocument />} />
//           <Route path="case-law-research" element={<CaseLawResearch />} />
//           <Route path="compliance-checker" element={<ComplianceChecker />} />
//           <Route path="contract-analyzer" element={<ContractAnalyzer />} />
//           <Route path="document-comparison" element={<DocumentComparison />} />
//           <Route path="document-summarizer" element={<DocumentSummarizer />} />
//           <Route path="legal-brief-generator" element={<LegalBriefGenerator />} />
//           <Route path="ocr-tool" element={<OCRTool />} />
//         </Route>

//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </>
//   );
// }

// export default App;


import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import GetStarted from './components/GetStarted';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Contact from './components/Contact';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Solutions from './components/Solutions';
import Resources from './components/Resources';
import UploadDocument from './components/UploadDocument';
import OverviewContent from './components/OverviewContent';
import DocumentsContent from './components/DocumentsContent';
import AIToolsContent from './components/AIToolsContent';
import AIAssistantContent from './components/AIAssistantContent';
import SettingsContent from './components/SettingsContent';
import CaseLawResearch from './components/CaseLawResearch';
import ComplianceChecker from './components/ComplianceChecker';
import ContractAnalyzer from './components/ContractAnalyzer';
import DocumentComparison from './components/DocumentComparison';
import DocumentSummarizer from './components/DocumentSummarizer';
import LegalBriefGenerator from './components/LegalBriefGenerator';
import OCRTool from './components/OCRTool';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

function App() {
  const navigate = useNavigate();
  const [, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const handleAuth = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<GetStarted onNavigate={handleNavigate} />} />
        <Route path="/signin" element={<SignIn onAuth={handleAuth} />} />
        <Route path="/signup" element={<SignUp onAuth={handleAuth} />} />
        <Route path="/about" element={<About onNavigate={handleNavigate} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/resources" element={<Resources />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard onSignOut={handleSignOut} />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<OverviewContent onNavigate={handleNavigate} />} />
          <Route path="documents" element={<DocumentsContent onNavigate={handleNavigate} />} />
          <Route path="ai-tools" element={<AIToolsContent activeView="main" onViewChange={() => {}} onNavigate={handleNavigate} />} />
          <Route path="ai-assistant" element={<AIAssistantContent />} />
          <Route path="settings" element={<SettingsContent onSignOut={handleSignOut} />} />
          <Route path="upload" element={<UploadDocument onBack={handleBack} />} />
          <Route path="case-law-research" element={<CaseLawResearch onBack={handleBack} />} />
          <Route path="compliance-checker" element={<ComplianceChecker onBack={handleBack} />} />
          <Route path="contract-analyzer" element={<ContractAnalyzer onBack={handleBack} />} />
          <Route path="document-comparison" element={<DocumentComparison onBack={handleBack} />} />
          <Route path="document-summarizer" element={<DocumentSummarizer onBack={handleBack} />} />
          <Route path="legal-brief-generator" element={<LegalBriefGenerator onBack={handleBack} />} />
          <Route path="ocr-tool" element={<OCRTool onBack={handleBack} />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
