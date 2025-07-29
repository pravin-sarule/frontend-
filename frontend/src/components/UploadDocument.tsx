import React, { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, ArrowLeft, Cloud, Zap, Shield } from 'lucide-react';

interface UploadDocumentProps {
  onBack: () => void;
}

const UploadDocument: React.FC<UploadDocumentProps> = ({ onBack }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadStatus, setUploadStatus] = useState<{ [key: string]: 'uploading' | 'success' | 'error' }>({});
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
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB limit
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);

    validFiles.forEach(file => {
      setUploadStatus(prev => ({ ...prev, [file.name]: 'uploading' }));
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));

      const formData = new FormData();
      formData.append('file', file);

      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

      fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
        setUploadStatus(prev => ({ ...prev, [file.name]: 'success' }));
        console.log('Upload successful:', data);
      })
      .catch(error => {
        setUploadStatus(prev => ({ ...prev, [file.name]: 'error' }));
        console.error('Upload failed:', error);
      });
    });
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
    setUploadStatus(prev => {
      const newStatus = { ...prev };
      delete newStatus[fileName];
      return newStatus;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    return <FileText className="w-8 h-8 text-blue-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={onBack}
              className="p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:scale-105 group"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Upload Documents</h1>
              <p className="text-gray-600 mt-2">Upload your legal documents for AI-powered analysis and processing.</p>
            </div>
          </div>

          {/* Upload Area */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 mb-8">
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
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
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Drop files here or click to browse
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Upload PDF, DOC, DOCX, or TXT files up to 10MB each
                  </p>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-premium"
                  >
                    Choose Files
                  </button>
                </div>
              </div>
            </div>

            {/* File Type Info */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                <Cloud className="w-6 h-6 text-blue-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Secure Upload</h4>
                  <p className="text-sm text-gray-600">End-to-end encryption</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl">
                <Zap className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Fast Processing</h4>
                  <p className="text-sm text-gray-600">AI analysis in seconds</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl">
                <Shield className="w-6 h-6 text-purple-600" />
                <div>
                  <h4 className="font-semibold text-gray-900">Privacy First</h4>
                  <p className="text-sm text-gray-600">Your data stays secure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Uploaded Files</h2>
              
              <div className="space-y-4">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow duration-200">
                    <div className="flex-shrink-0">
                      {getFileIcon()}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{file.name}</h4>
                      <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                      
                      {uploadStatus[file.name] === 'uploading' && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Uploading...</span>
                            <span>{uploadProgress[file.name] || 0}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress[file.name] || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {uploadStatus[file.name] === 'success' && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                      {uploadStatus[file.name] === 'error' && (
                        <AlertCircle className="w-6 h-6 text-red-500" />
                      )}
                      
                      <button
                        onClick={() => removeFile(file.name)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {uploadedFiles.some(file => uploadStatus[file.name] === 'success') && (
                <div className="mt-8 text-center">
                  <button className="btn-success">
                    Process Documents with AI
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
