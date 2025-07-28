import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, FileImage, Eye, Download, Copy,
  Zap, Languages, CheckCircle, AlertCircle, Loader,
  FileText, RotateCcw
} from 'lucide-react';

interface OCRToolProps {
  onBack: () => void;
}

const OCRTool: React.FC<OCRToolProps> = ({ onBack }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [extractedText, setExtractedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [confidence, setConfidence] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ar', name: 'Arabic' }
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
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF, BMP, WebP)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB');
      return;
    }

    setUploadedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Reset previous results
    setExtractedText('');
    setProcessingStatus('idle');
    setConfidence(0);
  };

  const processOCR = async () => {
    if (!uploadedImage) return;

    setIsProcessing(true);
    setProcessingStatus('processing');

    // Simulate OCR processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate extracted text based on file name or random legal content
      const sampleTexts = [
        `LEGAL DOCUMENT ANALYSIS REPORT

Case: Johnson vs. Smith Corporation
Date: January 15, 2024
Court: Superior Court of California

SUMMARY:
This case involves a contract dispute between Johnson (Plaintiff) and Smith Corporation (Defendant) regarding breach of service agreement dated March 2023.

KEY FINDINGS:
1. Contract terms were clearly defined in Section 3.2
2. Defendant failed to deliver services as specified
3. Damages calculated at $125,000 plus legal fees

RECOMMENDATION:
Proceed with settlement negotiations based on documented evidence.`,

        `CONTRACT AMENDMENT NO. 3

Effective Date: February 1, 2024
Parties: ABC Legal Services & XYZ Corporation

AMENDMENTS:
Section 4.1 - Payment Terms
- Net payment period extended from 30 to 45 days
- Late fee reduced from 2% to 1.5% monthly

Section 7.3 - Termination Clause
- Notice period increased from 30 to 60 days
- Mutual termination allowed with cause

This amendment supersedes all previous versions.`,

        `DEPOSITION TRANSCRIPT

Case No: CV-2024-001234
Date: January 20, 2024
Witness: Dr. Sarah Mitchell, Expert Witness

Q: Please state your qualifications for the record.
A: I hold a PhD in Engineering from MIT and have 15 years of experience in product safety analysis.

Q: Have you reviewed the incident report?
A: Yes, I have thoroughly examined all documentation provided.

Q: What is your professional opinion?
A: Based on my analysis, the product failure was due to manufacturing defect, not user error.`
      ];

      const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
      setExtractedText(randomText);
      setConfidence(Math.floor(Math.random() * 15) + 85); // 85-99% confidence
      setProcessingStatus('success');
    } catch (error) {
      setProcessingStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    // You could add a toast notification here
  };

  const downloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([extractedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'extracted-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetTool = () => {
    setUploadedImage(null);
    setImagePreview('');
    setExtractedText('');
    setProcessingStatus('idle');
    setConfidence(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
          <h1 className="text-3xl font-bold text-gray-900">OCR Document Scanner</h1>
          <p className="text-gray-600 mt-2">Extract text from images and scanned documents with AI-powered OCR technology.</p>
        </div>
      </div>

      {/* Settings Bar */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Languages className="w-5 h-5 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Language:</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={resetTool}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-6">
          {/* Upload Area */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Image</h2>
            
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
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto">
                  <FileImage className="w-8 h-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drop image here or click to browse
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Supports JPEG, PNG, GIF, BMP, WebP up to 10MB
                  </p>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    Choose Image
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Image Preview</h3>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{uploadedImage?.name}</span>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-64 object-contain rounded-lg border border-gray-200"
                />
              </div>
              
              <div className="mt-4 flex justify-center">
                <button
                  onClick={processOCR}
                  disabled={isProcessing}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100"
                >
                  {isProcessing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>Extract Text</span>
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
              <div className="flex items-center space-x-3 mb-4">
                {processingStatus === 'processing' && (
                  <>
                    <Loader className="w-5 h-5 text-blue-500 animate-spin" />
                    <span className="text-blue-700 font-medium">Processing image...</span>
                  </>
                )}
                {processingStatus === 'success' && (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-700 font-medium">Text extracted successfully!</span>
                  </>
                )}
                {processingStatus === 'error' && (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700 font-medium">Processing failed. Please try again.</span>
                  </>
                )}
              </div>
              
              {processingStatus === 'success' && confidence > 0 && (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Confidence:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{confidence}%</span>
                </div>
              )}
            </div>
          )}

          {/* Extracted Text */}
          {extractedText && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Extracted Text</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={downloadText}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    title="Download as text file"
                  >
                    <Download className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <textarea
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                  placeholder="Extracted text will appear here..."
                />
              </div>
              
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>{extractedText.length} characters</span>
                <span>{extractedText.split(/\s+/).filter(word => word.length > 0).length} words</span>
              </div>
            </div>
          )}

          {/* OCR Features */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">OCR Features</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">High Accuracy</p>
                  <p className="text-sm text-gray-600">99%+ accuracy for printed text</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Languages className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Multi-Language</p>
                  <p className="text-sm text-gray-600">Supports 10+ languages</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Legal Documents</p>
                  <p className="text-sm text-gray-600">Optimized for legal text</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OCRTool;