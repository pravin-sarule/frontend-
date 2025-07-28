import React, { useState, useRef } from 'react';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, FileText, Download } from 'lucide-react';

interface ComplianceCheckerProps {
  onBack: () => void;
}

const ComplianceChecker: React.FC<ComplianceCheckerProps> = ({ onBack }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedRegulations, setSelectedRegulations] = useState<string[]>(['gdpr', 'sox']);
  const [complianceResults, setComplianceResults] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const regulations = [
    { id: 'gdpr', name: 'GDPR', description: 'General Data Protection Regulation' },
    { id: 'sox', name: 'SOX', description: 'Sarbanes-Oxley Act' },
    { id: 'hipaa', name: 'HIPAA', description: 'Health Insurance Portability and Accountability Act' },
    { id: 'pci', name: 'PCI DSS', description: 'Payment Card Industry Data Security Standard' },
    { id: 'ccpa', name: 'CCPA', description: 'California Consumer Privacy Act' },
    { id: 'iso27001', name: 'ISO 27001', description: 'Information Security Management' }
  ];

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
      alert('Please upload a valid document file (PDF, DOC, DOCX)');
      return;
    }

    setUploadedFile(file);
    setComplianceResults(null);
  };

  const toggleRegulation = (regId: string) => {
    setSelectedRegulations(prev => 
      prev.includes(regId) 
        ? prev.filter(id => id !== regId)
        : [...prev, regId]
    );
  };

  const checkCompliance = async () => {
    if (!uploadedFile || selectedRegulations.length === 0) {
      alert('Please upload a document and select at least one regulation');
      return;
    }

    setIsChecking(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      const sampleResults = {
        overallScore: 82,
        complianceLevel: 'Good',
        totalChecks: 45,
        passed: 37,
        failed: 5,
        warnings: 3,
        regulations: [
          {
            id: 'gdpr',
            name: 'GDPR',
            score: 85,
            status: 'compliant',
            checks: [
              { item: 'Data Processing Lawfulness', status: 'pass', description: 'Legal basis for processing clearly defined' },
              { item: 'Data Subject Rights', status: 'pass', description: 'Rights to access, rectify, and erase data included' },
              { item: 'Data Breach Notification', status: 'warning', description: 'Notification timeline could be more specific' },
              { item: 'Privacy by Design', status: 'fail', description: 'Missing privacy impact assessment requirements' }
            ]
          },
          {
            id: 'sox',
            name: 'SOX',
            score: 78,
            status: 'partial',
            checks: [
              { item: 'Financial Controls', status: 'pass', description: 'Internal controls framework documented' },
              { item: 'Management Certification', status: 'pass', description: 'CEO/CFO certification requirements included' },
              { item: 'Audit Committee Independence', status: 'fail', description: 'Independence requirements not clearly stated' },
              { item: 'Whistleblower Protection', status: 'warning', description: 'Protection mechanisms need strengthening' }
            ]
          }
        ],
        gaps: [
          {
            regulation: 'GDPR',
            issue: 'Missing Privacy Impact Assessment',
            severity: 'high',
            recommendation: 'Add mandatory privacy impact assessment for high-risk processing',
            section: 'Article 35'
          },
          {
            regulation: 'SOX',
            issue: 'Audit Committee Independence',
            severity: 'medium',
            recommendation: 'Clarify independence requirements for audit committee members',
            section: 'Section 301'
          },
          {
            regulation: 'GDPR',
            issue: 'Data Breach Notification Timeline',
            severity: 'low',
            recommendation: 'Specify 72-hour notification requirement explicitly',
            section: 'Article 33'
          }
        ],
        recommendations: [
          'Implement comprehensive privacy impact assessment procedures',
          'Strengthen audit committee independence requirements',
          'Add specific data breach notification timelines',
          'Include regular compliance monitoring procedures'
        ]
      };

      setComplianceResults(sampleResults);
    } catch (error) {
      alert('Compliance check failed. Please try again.');
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-50';
      case 'fail': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'fail': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const downloadReport = () => {
    if (!complianceResults) return;
    
    const report = `COMPLIANCE CHECK REPORT

Overall Score: ${complianceResults.overallScore}/100 (${complianceResults.complianceLevel})
Total Checks: ${complianceResults.totalChecks}
Passed: ${complianceResults.passed}
Failed: ${complianceResults.failed}
Warnings: ${complianceResults.warnings}

REGULATION COMPLIANCE:
${complianceResults.regulations.map((reg: any) => `
${reg.name} - Score: ${reg.score}/100 (${reg.status})
${reg.checks.map((check: any) => `  • ${check.item}: ${check.status.toUpperCase()} - ${check.description}`).join('\n')}
`).join('\n')}

COMPLIANCE GAPS:
${complianceResults.gaps.map((gap: any) => `
• ${gap.issue} (${gap.regulation})
  Severity: ${gap.severity}
  Section: ${gap.section}
  Recommendation: ${gap.recommendation}
`).join('\n')}

RECOMMENDATIONS:
${complianceResults.recommendations.map((rec: string) => `• ${rec}`).join('\n')}`;

    const element = document.createElement('a');
    const file = new Blob([report], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'compliance-check-report.txt';
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
          <h1 className="text-3xl font-bold text-gray-900">Compliance Checker</h1>
          <p className="text-gray-600 mt-2">Ensure documents meet regulatory requirements and compliance standards.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Configuration Section */}
        <div className="space-y-6">
          {/* Upload Area */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Document</h2>
            
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-red-400 hover:bg-red-50/50'
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
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drop document here or click to browse
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Supports PDF, DOC, DOCX up to 10MB
                  </p>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    Choose Document
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Regulation Selection */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Regulations</h3>
            <div className="space-y-3">
              {regulations.map((reg) => (
                <div key={reg.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={reg.id}
                    checked={selectedRegulations.includes(reg.id)}
                    onChange={() => toggleRegulation(reg.id)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor={reg.id} className="flex-1 cursor-pointer">
                    <div className="font-medium text-gray-900">{reg.name}</div>
                    <div className="text-sm text-gray-600">{reg.description}</div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Check Button */}
          {uploadedFile && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{uploadedFile.name}</h4>
                  <p className="text-sm text-gray-600">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <button
                onClick={checkCompliance}
                disabled={isChecking || selectedRegulations.length === 0}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100"
              >
                {isChecking ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Checking Compliance...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Check Compliance</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {complianceResults && (
            <>
              {/* Overall Score */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Score</h3>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{complianceResults.overallScore}/100</div>
                    <div className="text-sm font-medium text-gray-600">{complianceResults.complianceLevel} Compliance</div>
                  </div>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">{complianceResults.passed}</div>
                    <div className="text-xs text-gray-600">Passed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-600">{complianceResults.warnings}</div>
                    <div className="text-xs text-gray-600">Warnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-600">{complianceResults.failed}</div>
                    <div className="text-xs text-gray-600">Failed</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-500 to-pink-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${complianceResults.overallScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Regulation Details */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Regulation Details</h3>
                <div className="space-y-4">
                  {complianceResults.regulations.map((reg: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{reg.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reg.status === 'compliant' ? 'text-green-600 bg-green-100' : 'text-orange-600 bg-orange-100'
                        }`}>
                          {reg.score}/100
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {reg.checks.map((check: any, checkIndex: number) => (
                          <div key={checkIndex} className="flex items-start space-x-3 p-2 rounded-lg bg-gray-50">
                            {getStatusIcon(check.status)}
                            <div className="flex-1">
                              <div className="font-medium text-sm text-gray-900">{check.item}</div>
                              <div className="text-xs text-gray-600">{check.description}</div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(check.status)}`}>
                              {check.status}
                            </span>
                          </div>
                        ))}
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
                  <span>Download Compliance Report</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceChecker;