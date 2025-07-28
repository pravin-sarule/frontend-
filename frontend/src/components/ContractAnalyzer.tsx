import React, { useState, useRef } from 'react';
import { ArrowLeft, Search, AlertTriangle, CheckCircle, FileText, Download, Shield } from 'lucide-react';

interface ContractAnalyzerProps {
  onBack: () => void;
}

const ContractAnalyzer: React.FC<ContractAnalyzerProps> = ({ onBack }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid contract file (PDF, DOC, DOCX)');
      return;
    }

    setUploadedFile(file);
    setAnalysisResults(null);
  };

  const analyzeContract = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const sampleResults = {
        riskScore: 7.2,
        riskLevel: 'Medium-High',
        keyTerms: [
          { term: 'Payment Terms', value: 'Net 30 days', risk: 'low' },
          { term: 'Termination Clause', value: '30-day notice required', risk: 'medium' },
          { term: 'Liability Cap', value: '$500,000 maximum', risk: 'low' },
          { term: 'Indemnification', value: 'Mutual indemnification', risk: 'medium' },
          { term: 'Governing Law', value: 'New York State', risk: 'low' }
        ],
        risks: [
          {
            type: 'High Risk',
            title: 'Unlimited Liability Clause',
            description: 'Section 8.3 contains unlimited liability exposure for certain breach types',
            severity: 'high',
            recommendation: 'Negotiate liability cap or exclusions'
          },
          {
            type: 'Medium Risk',
            title: 'Broad Termination Rights',
            description: 'Counterparty has extensive termination rights without cause',
            severity: 'medium',
            recommendation: 'Add reciprocal termination rights or notice requirements'
          },
          {
            type: 'Low Risk',
            title: 'Standard Force Majeure',
            description: 'Force majeure clause is standard but could be more comprehensive',
            severity: 'low',
            recommendation: 'Consider adding pandemic and cyber security events'
          }
        ],
        compliance: [
          { area: 'GDPR Compliance', status: 'compliant', note: 'Data processing clauses meet requirements' },
          { area: 'SOX Compliance', status: 'partial', note: 'Additional financial controls needed' },
          { area: 'Industry Standards', status: 'compliant', note: 'Meets industry best practices' }
        ],
        recommendations: [
          'Add specific performance metrics and SLAs',
          'Include detailed dispute resolution procedures',
          'Clarify intellectual property ownership rights',
          'Add cybersecurity and data breach notification requirements'
        ]
      };

      setAnalysisResults(sampleResults);
    } catch (error) {
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const downloadReport = () => {
    if (!analysisResults) return;
    
    const report = `CONTRACT ANALYSIS REPORT

Risk Score: ${analysisResults.riskScore}/10 (${analysisResults.riskLevel})

KEY TERMS:
${analysisResults.keyTerms.map((term: any) => `• ${term.term}: ${term.value} (${term.risk} risk)`).join('\n')}

IDENTIFIED RISKS:
${analysisResults.risks.map((risk: any) => `• ${risk.title} (${risk.type})\n  ${risk.description}\n  Recommendation: ${risk.recommendation}`).join('\n\n')}

COMPLIANCE STATUS:
${analysisResults.compliance.map((comp: any) => `• ${comp.area}: ${comp.status} - ${comp.note}`).join('\n')}

RECOMMENDATIONS:
${analysisResults.recommendations.map((rec: string) => `• ${rec}`).join('\n')}`;

    const element = document.createElement('a');
    const file = new Blob([report], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'contract-analysis-report.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:scale-105 group"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contract Analyzer</h1>
          <p className="text-gray-600 mt-2">Analyze contracts for risks, key terms, and compliance issues with AI.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-6">
          {/* Upload Area */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Contract</h2>
            
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drop contract here or click to browse
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Supports PDF, DOC, DOCX up to 10MB
                  </p>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    Choose Contract
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* File Info & Analysis */}
          {uploadedFile && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Information</h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{uploadedFile.name}</h4>
                  <p className="text-sm text-gray-600">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <button
                onClick={analyzeContract}
                disabled={isAnalyzing}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing Contract...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Analyze Contract</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {analysisResults && (
            <>
              {/* Risk Score */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment</h3>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{analysisResults.riskScore}/10</div>
                    <div className={`text-sm font-medium ${analysisResults.riskLevel === 'Medium-High' ? 'text-orange-600' : 'text-green-600'}`}>
                      {analysisResults.riskLevel} Risk
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(analysisResults.riskScore / 10) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Key Terms */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Terms</h3>
                <div className="space-y-3">
                  {analysisResults.keyTerms.map((term: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{term.term}</h4>
                        <p className="text-sm text-gray-600">{term.value}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(term.risk)}`}>
                        {term.risk} risk
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Analysis */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Analysis</h3>
                <div className="space-y-4">
                  {analysisResults.risks.map((risk: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        {getRiskIcon(risk.severity)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{risk.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(risk.severity)}`}>
                              {risk.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{risk.description}</p>
                          <p className="text-sm text-blue-600 font-medium">
                            💡 {risk.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Report */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <button
                  onClick={downloadReport}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Analysis Report</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractAnalyzer;