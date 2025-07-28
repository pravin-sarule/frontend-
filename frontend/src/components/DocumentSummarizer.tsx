import React, { useState, useRef } from 'react';
import { ArrowLeft, FileText, Zap, Download, Copy, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface DocumentSummarizerProps {
  onBack: () => void;
}

const DocumentSummarizer: React.FC<DocumentSummarizerProps> = ({ onBack }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [legalImplications, setLegalImplications] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
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
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid document file (PDF, DOC, DOCX, TXT)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploadedFile(file);
    setSummary('');
    setKeyPoints([]);
    setLegalImplications([]);
    setProcessingStatus('idle');
  };

  const processSummary = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setProcessingStatus('processing');

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const sampleSummary = `This contract amendment modifies the original service agreement between Johnson Legal Services and TechCorp Industries. The amendment extends the contract term by 12 months, adjusts payment schedules from monthly to quarterly billing, and introduces new performance metrics for service delivery. The document also includes updated termination clauses and dispute resolution procedures.`;
      
      const sampleKeyPoints = [
        'Contract term extended by 12 months (until December 2024)',
        'Payment schedule changed from monthly to quarterly billing',
        'New performance metrics introduced for service evaluation',
        'Updated termination clause requires 60-day notice period',
        'Dispute resolution now includes mandatory mediation before arbitration'
      ];
      
      const sampleImplications = [
        'Extended commitment period may impact budget planning',
        'Quarterly billing could affect cash flow management',
        'New performance metrics may require additional reporting',
        'Longer termination notice provides more stability but less flexibility'
      ];

      setSummary(sampleSummary);
      setKeyPoints(sampleKeyPoints);
      setLegalImplications(sampleImplications);
      setProcessingStatus('success');
    } catch (error) {
      setProcessingStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadSummary = () => {
    const content = `DOCUMENT SUMMARY\n\n${summary}\n\nKEY POINTS:\n${keyPoints.map(point => `• ${point}`).join('\n')}\n\nLEGAL IMPLICATIONS:\n${legalImplications.map(impl => `• ${impl}`).join('\n')}`;
    
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'document-summary.txt';
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
          <h1 className="text-3xl font-bold text-gray-900">Document Summarizer</h1>
          <p className="text-gray-600 mt-2">Generate concise summaries of legal documents with AI-powered analysis.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-6">
          {/* Upload Area */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Document</h2>
            
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drop document here or click to browse
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Supports PDF, DOC, DOCX, TXT up to 10MB
                  </p>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    Choose Document
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* File Info */}
          {uploadedFile && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Document Info</h3>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{uploadedFile.name}</h4>
                  <p className="text-sm text-gray-600">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex justify-center">
                <button
                  onClick={processSummary}
                  disabled={isProcessing}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100"
                >
                  {isProcessing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>Generate Summary</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Processing Status */}
          {processingStatus !== 'idle' && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-3">
                {processingStatus === 'processing' && (
                  <>
                    <Loader className="w-5 h-5 text-blue-500 animate-spin" />
                    <span className="text-blue-700 font-medium">Analyzing document...</span>
                  </>
                )}
                {processingStatus === 'success' && (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-700 font-medium">Summary generated successfully!</span>
                  </>
                )}
                {processingStatus === 'error' && (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700 font-medium">Analysis failed. Please try again.</span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Summary Results */}
          {summary && (
            <div className="space-y-6">
              {/* Executive Summary */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Executive Summary</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(summary)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      title="Copy summary"
                    >
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{summary}</p>
              </div>

              {/* Key Points */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Points</h3>
                <ul className="space-y-3">
                  {keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Implications */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Implications</h3>
                <ul className="space-y-3">
                  {legalImplications.map((implication, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{implication}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Download Button */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <button
                  onClick={downloadSummary}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Summary Report</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentSummarizer;