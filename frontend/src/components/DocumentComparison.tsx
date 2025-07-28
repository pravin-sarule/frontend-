import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Users, FileText, Download, CheckCircle } from 'lucide-react';

interface DocumentComparisonProps {
  onBack: () => void;
}

const DocumentComparison: React.FC<DocumentComparisonProps> = ({ onBack }) => {
  const [dragActive, setDragActive] = useState({ doc1: false, doc2: false });
  const [uploadedFiles, setUploadedFiles] = useState<{ doc1: File | null; doc2: File | null }>({ doc1: null, doc2: null });
  const [comparisonResults, setComparisonResults] = useState<any>(null);
  const [isComparing, setIsComparing] = useState(false);
  const fileInputRefs = useRef<{ doc1: HTMLInputElement | null; doc2: HTMLInputElement | null }>({ doc1: null, doc2: null });

  const handleDrag = (e: React.DragEvent, docType: 'doc1' | 'doc2') => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(prev => ({ ...prev, [docType]: true }));
    } else if (e.type === 'dragleave') {
      setDragActive(prev => ({ ...prev, [docType]: false }));
    }
  };

  const handleDrop = (e: React.DragEvent, docType: 'doc1' | 'doc2') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [docType]: false }));
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], docType);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, docType: 'doc1' | 'doc2') => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], docType);
    }
  };

  const handleFile = (file: File, docType: 'doc1' | 'doc2') => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid document file (PDF, DOC, DOCX, TXT)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploadedFiles(prev => ({ ...prev, [docType]: file }));
    setComparisonResults(null);
  };

  const compareDocuments = async () => {
    if (!uploadedFiles.doc1 || !uploadedFiles.doc2) {
      alert('Please upload both documents to compare');
      return;
    }

    setIsComparing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const sampleResults = {
        similarity: 78,
        totalChanges: 24,
        additions: 8,
        deletions: 6,
        modifications: 10,
        changes: [
          {
            type: 'addition',
            section: 'Section 3.2 - Payment Terms',
            content: 'Added clause: "Late payments will incur a 1.5% monthly fee"',
            line: 45,
            severity: 'medium'
          },
          {
            type: 'deletion',
            section: 'Section 5.1 - Termination',
            content: 'Removed: "Either party may terminate with 30 days notice"',
            line: 78,
            severity: 'high'
          },
          {
            type: 'modification',
            section: 'Section 2.4 - Deliverables',
            content: 'Changed delivery timeline from "30 days" to "45 days"',
            line: 32,
            severity: 'medium'
          },
          {
            type: 'addition',
            section: 'Section 7.3 - Confidentiality',
            content: 'Added: "Confidentiality obligations survive contract termination"',
            line: 112,
            severity: 'low'
          },
          {
            type: 'modification',
            section: 'Section 4.1 - Liability',
            content: 'Liability cap increased from $100,000 to $250,000',
            line: 65,
            severity: 'high'
          },
          {
            type: 'deletion',
            section: 'Section 6.2 - Dispute Resolution',
            content: 'Removed arbitration clause',
            line: 95,
            severity: 'high'
          }
        ],
        suggestions: [
          'Review liability cap increase for financial impact',
          'Consider implications of removed termination clause',
          'Verify extended delivery timeline meets business needs',
          'Ensure confidentiality terms align with company policy'
        ],
        versionTracking: {
          doc1Version: 'v2.1',
          doc2Version: 'v2.2',
          lastModified: '2024-01-15',
          modifiedBy: 'Legal Team'
        }
      };

      setComparisonResults(sampleResults);
    } catch (error) {
      alert('Comparison failed. Please try again.');
    } finally {
      setIsComparing(false);
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'addition': return 'text-green-700 bg-green-50 border-green-200';
      case 'deletion': return 'text-red-700 bg-red-50 border-red-200';
      case 'modification': return 'text-blue-700 bg-blue-50 border-blue-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'addition': return <span className="text-green-600 font-bold">+</span>;
      case 'deletion': return <span className="text-red-600 font-bold">-</span>;
      case 'modification': return <span className="text-blue-600 font-bold">~</span>;
      default: return <span className="text-gray-600 font-bold">•</span>;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const downloadReport = () => {
    if (!comparisonResults) return;
    
    const report = `DOCUMENT COMPARISON REPORT

Similarity Score: ${comparisonResults.similarity}%
Total Changes: ${comparisonResults.totalChanges}
- Additions: ${comparisonResults.additions}
- Deletions: ${comparisonResults.deletions}
- Modifications: ${comparisonResults.modifications}

DETAILED CHANGES:
${comparisonResults.changes.map((change: any) => `
${change.type.toUpperCase()} - Line ${change.line}
Section: ${change.section}
Change: ${change.content}
Severity: ${change.severity}
`).join('\n')}

RECOMMENDATIONS:
${comparisonResults.suggestions.map((suggestion: string) => `• ${suggestion}`).join('\n')}

Version Information:
Document 1: ${comparisonResults.versionTracking.doc1Version}
Document 2: ${comparisonResults.versionTracking.doc2Version}
Last Modified: ${comparisonResults.versionTracking.lastModified}
Modified By: ${comparisonResults.versionTracking.modifiedBy}`;

    const element = document.createElement('a');
    const file = new Blob([report], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'document-comparison-report.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const UploadArea = ({ docType, title }: { docType: 'doc1' | 'doc2'; title: string }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
          dragActive[docType]
            ? 'border-teal-500 bg-teal-50'
            : 'border-gray-300 hover:border-teal-400 hover:bg-teal-50/50'
        }`}
        onDragEnter={(e) => handleDrag(e, docType)}
        onDragLeave={(e) => handleDrag(e, docType)}
        onDragOver={(e) => handleDrag(e, docType)}
        onDrop={(e) => handleDrop(e, docType)}
      >
        <input
          ref={(el) => fileInputRefs.current[docType] = el}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={(e) => handleChange(e, docType)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {uploadedFiles[docType] ? (
          <div className="space-y-3">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{uploadedFiles[docType]!.name}</h4>
              <p className="text-sm text-gray-600">
                {(uploadedFiles[docType]!.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => fileInputRefs.current[docType]?.click()}
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              Change Document
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Drop document here</h4>
              <p className="text-sm text-gray-600 mb-3">or click to browse</p>
              <button
                onClick={() => fileInputRefs.current[docType]?.click()}
                className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Choose File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

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
          <h1 className="text-3xl font-bold text-gray-900">Document Comparison</h1>
          <p className="text-gray-600 mt-2">Compare multiple versions of documents to track changes and differences.</p>
        </div>
      </div>

      {/* Upload Areas */}
      <div className="grid lg:grid-cols-2 gap-6">
        <UploadArea docType="doc1" title="Original Document" />
        <UploadArea docType="doc2" title="Modified Document" />
      </div>

      {/* Compare Button */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <button
          onClick={compareDocuments}
          disabled={isComparing || !uploadedFiles.doc1 || !uploadedFiles.doc2}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100"
        >
          {isComparing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Comparing Documents...</span>
            </>
          ) : (
            <>
              <Users className="w-5 h-5" />
              <span>Compare Documents</span>
            </>
          )}
        </button>
      </div>

      {/* Comparison Results */}
      {comparisonResults && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparison Summary</h3>
            
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">{comparisonResults.similarity}%</div>
                <div className="text-sm text-gray-600">Similarity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{comparisonResults.additions}</div>
                <div className="text-sm text-gray-600">Additions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{comparisonResults.deletions}</div>
                <div className="text-sm text-gray-600">Deletions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{comparisonResults.modifications}</div>
                <div className="text-sm text-gray-600">Modifications</div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-teal-500 to-cyan-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${comparisonResults.similarity}%` }}
              ></div>
            </div>
          </div>

          {/* Detailed Changes */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Detailed Changes</h3>
              <button
                onClick={downloadReport}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {comparisonResults.changes.map((change: any, index: number) => (
                <div key={index} className={`border rounded-lg p-4 ${getChangeColor(change.type)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {getChangeIcon(change.type)}
                      <div>
                        <h4 className="font-semibold">{change.section}</h4>
                        <p className="text-sm opacity-75">Line {change.line}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(change.severity)}`}>
                      {change.severity} impact
                    </span>
                  </div>
                  <p className="text-sm">{change.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Merge Suggestions */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Merge Suggestions</h3>
            <div className="space-y-3">
              {comparisonResults.suggestions.map((suggestion: string, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentComparison;