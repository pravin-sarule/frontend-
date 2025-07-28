import React from 'react';
import { Bot, FileText, Zap, Search, Edit, BarChart3, Users, Shield, Scan } from 'lucide-react';
import OCRTool from './OCRTool';
import DocumentSummarizer from './DocumentSummarizer';
import LegalBriefGenerator from './LegalBriefGenerator';
import ContractAnalyzer from './ContractAnalyzer';
import CaseLawResearch from './CaseLawResearch';
import DocumentComparison from './DocumentComparison';
import ComplianceChecker from './ComplianceChecker';

interface AIToolsContentProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
  onNavigate: (page: string) => void;
}

const AIToolsContent: React.FC<AIToolsContentProps> = ({ activeView: externalActiveView, onViewChange }) => {
  const [internalActiveView, setInternalActiveView] = React.useState<'main' | 'ocr' | 'summarizer' | 'brief-generator' | 'contract-analyzer' | 'case-research' | 'document-comparison' | 'compliance-checker'>('main');
  
  const activeView = externalActiveView || internalActiveView;
  const setActiveView = onViewChange || setInternalActiveView;

  if (activeView === 'ocr') {
    return <OCRTool onBack={() => setActiveView('main')} />;
  }
  
  if (activeView === 'summarizer') {
    return <DocumentSummarizer onBack={() => setActiveView('main')} />;
  }
  
  if (activeView === 'brief-generator') {
    return <LegalBriefGenerator onBack={() => setActiveView('main')} />;
  }
  
  if (activeView === 'contract-analyzer') {
    return <ContractAnalyzer onBack={() => setActiveView('main')} />;
  }
  
  if (activeView === 'case-research') {
    return <CaseLawResearch onBack={() => setActiveView('main')} />;
  }
  
  if (activeView === 'document-comparison') {
    return <DocumentComparison onBack={() => setActiveView('main')} />;
  }
  
  if (activeView === 'compliance-checker') {
    return <ComplianceChecker onBack={() => setActiveView('main')} />;
  }

  const aiTools = [
    {
      id: 1,
      name: 'Document Summarizer',
      description: 'Generate concise summaries of legal documents',
      icon: FileText,
      color: 'blue',
      features: ['Key points extraction', 'Executive summary', 'Legal implications']
    },
    {
      id: 2,
      name: 'Legal Brief Generator',
      description: 'Create professional legal briefs and motions',
      icon: Edit,
      color: 'green',
      features: ['Template library', 'Citation formatting', 'Argument structure']
    },
    {
      id: 3,
      name: 'Contract Analyzer',
      description: 'Analyze contracts for risks and key terms',
      icon: Search,
      color: 'purple',
      features: ['Risk assessment', 'Clause analysis', 'Compliance check']
    },
    {
      id: 4,
      name: 'Case Law Research',
      description: 'Find relevant cases and precedents',
      icon: BarChart3,
      color: 'orange',
      features: ['Precedent search', 'Citation analysis', 'Relevance scoring']
    },
    {
      id: 5,
      name: 'Document Comparison',
      description: 'Compare multiple versions of documents',
      icon: Users,
      color: 'teal',
      features: ['Version tracking', 'Change highlighting', 'Merge suggestions']
    },
    {
      id: 6,
      name: 'Compliance Checker',
      description: 'Ensure documents meet regulatory requirements',
      icon: Shield,
      color: 'red',
      features: ['Regulation matching', 'Compliance scoring', 'Gap analysis']
    },
    {
      id: 7,
      name: 'OCR Document Scanner',
      description: 'Extract text from images and scanned documents',
      icon: Scan,
      color: 'indigo',
      features: ['Image to text conversion', 'Multi-language support', 'High accuracy OCR']
    }
  ];

  const recentUsage = [
    { tool: 'Document Summarizer', usage: '24 times', lastUsed: '2 hours ago' },
    { tool: 'Contract Analyzer', usage: '18 times', lastUsed: '4 hours ago' },
    { tool: 'Legal Brief Generator', usage: '12 times', lastUsed: '1 day ago' },
    { tool: 'Case Law Research', usage: '8 times', lastUsed: '2 days ago' },
    { tool: 'OCR Document Scanner', usage: '6 times', lastUsed: '3 days ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Tools</h1>
        <p className="text-gray-600 mt-2">Leverage AI to enhance your legal workflow and productivity.</p>
      </div>

      {/* AI Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {aiTools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 group cursor-pointer">
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-xl bg-${tool.color}-100 group-hover:bg-${tool.color}-200 transition-colors duration-200`}>
                <tool.icon className={`w-6 h-6 text-${tool.color}-600`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                  {tool.name}
                </h3>
                <p className="text-gray-600 mt-1 text-sm">{tool.description}</p>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={() => {
                    switch(tool.id) {
                      case 1: setActiveView('summarizer'); break;
                      case 2: setActiveView('brief-generator'); break;
                      case 3: setActiveView('contract-analyzer'); break;
                      case 4: setActiveView('case-research'); break;
                      case 5: setActiveView('document-comparison'); break;
                      case 6: setActiveView('compliance-checker'); break;
                      case 7: setActiveView('ocr'); break;
                      default: break;
                    }
                  }}
                  className="mt-4 w-full btn-primary"
                >
                  Use Tool
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Usage */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Recent Usage</h2>
          </div>
          <div className="space-y-4">
            {recentUsage.map((usage, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div>
                  <p className="font-medium text-gray-900">{usage.tool}</p>
                  <p className="text-sm text-gray-600">{usage.usage} this week</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{usage.lastUsed}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Assistant */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Bot className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">AI Assistant</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-3">
                "How can I help you with your legal work today?"
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs text-gray-500">AI Assistant</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors duration-200">
                <p className="text-sm font-medium text-gray-900">Explain this contract clause</p>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors duration-200">
                <p className="text-sm font-medium text-gray-900">Draft a motion to dismiss</p>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors duration-200">
                <p className="text-sm font-medium text-gray-900">Find similar cases</p>
              </button>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Ask the AI assistant anything..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary btn-small">
                <Bot className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolsContent;