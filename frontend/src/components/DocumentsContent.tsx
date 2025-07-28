import React, { useState, useEffect } from 'react'; // Import useEffect
import { FileText, Upload, Search, Filter, Download, Eye, MoreVertical, Trash2, Loader } from 'lucide-react'; // Import Trash2 and Loader

interface DocumentsContentProps {
  onNavigate?: (page: string) => void;
}

interface Document {
  id: number;
  document_name: string;
  input_bucket_path: string;
  output_bucket_path: string | null;
  file_type: string;
  uploaded_at: string; // ISO format string
  processed: boolean;
}

const DocumentsContent: React.FC<DocumentsContentProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [documents, setDocuments] = useState<Document[]>([]); // State for fetched documents
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found. Please sign in.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.digitizeindia.co.in/api/ai-ml/user_documents', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch documents');
      }

      const data: Document[] = await response.json();
      setDocuments(data);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteDocument = async (documentId: number, documentName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${documentName}"? This action cannot be undone.`)) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication token not found. Please sign in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/ai-ml/documents/${documentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete document');
      }

      setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== documentId));
      alert(`Document "${documentName}" deleted successfully.`);
    } catch (err: any) {
      setError(err.message);
      alert(`Error deleting document "${documentName}": ${err.message}`);
      console.error('Error deleting document:', err);
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Documents' },
    { value: 'contract', label: 'Contracts' },
    { value: 'brief', label: 'Legal Briefs' },
    { value: 'patent', label: 'Patents' },
    { value: 'terms', label: 'Terms & Conditions' }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.document_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.file_type.toLowerCase().includes(searchTerm.toLowerCase()); // Search by file_type as well
    const matchesFilter = selectedFilter === 'all' || doc.file_type.toLowerCase().includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cases & Documents</h1>
          <p className="text-gray-600 mt-2">Manage and analyze your legal documents with AI assistance.</p>
        </div>
        <button 
          onClick={() => onNavigate?.('upload')}
          className="btn-primary"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents, cases, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

     {/* Loading, Error, or Documents Grid */}
     {loading && (
       <div className="text-center py-12">
         <Loader className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
         <h3 className="text-lg font-medium text-gray-900">Loading documents...</h3>
       </div>
     )}

     {error && (
       <div className="text-center py-12 text-red-600">
         <p className="mb-2">Error: {error}</p>
         <button onClick={fetchDocuments} className="btn-secondary">Retry</button>
       </div>
     )}

     {!loading && !error && (
       <div className="grid gap-4">
         {filteredDocuments.map((doc) => (
           <div key={doc.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
             <div className="flex items-center justify-between">
               <div className="flex items-center space-x-4">
                 <div className="p-3 bg-blue-100 rounded-lg">
                   <FileText className="w-6 h-6 text-blue-600" />
                 </div>
                 <div className="flex-1 min-w-0">
                   <h3 className="text-lg font-semibold text-gray-900 truncate">{doc.document_name}</h3>
                   <div className="flex items-center space-x-4 mt-1">
                     <span className="text-sm text-gray-500">{doc.file_type}</span>
                     <span className="text-sm text-gray-500">•</span>
                     <span className="text-sm text-gray-500">
                       {new Date(doc.uploaded_at).toLocaleDateString()}
                     </span>
                     <span className="text-sm text-gray-500">•</span>
                     <span className="text-sm text-gray-500">
                       {/* Placeholder for size, as backend doesn't provide it directly */}
                       {(doc.input_bucket_path || doc.output_bucket_path) ? 'Cloud Storage' : 'N/A'}
                     </span>
                   </div>
                   <div className="flex items-center space-x-2 mt-2">
                     <span
                       className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                         doc.processed
                           ? 'bg-green-100 text-green-800'
                           : 'bg-yellow-100 text-yellow-800'
                       }`}
                     >
                       {doc.processed ? 'Processed' : 'Pending'}
                     </span>
                   </div>
                 </div>
               </div>
               
               <div className="flex items-center space-x-3">
                 <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200" title="View Document">
                   <Eye className="w-4 h-4 text-gray-500" />
                 </button>
                 {doc.output_bucket_path && (
                   <a
                     href={doc.output_bucket_path.replace('gs://', 'https://storage.googleapis.com/')}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                     title="Download Processed Document"
                   >
                     <Download className="w-4 h-4 text-gray-500" />
                   </a>
                 )}
                 <button
                   onClick={() => handleDeleteDocument(doc.id, doc.document_name)} // Add delete handler
                   className="p-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                   title="Delete Document"
                 >
                   <Trash2 className="w-4 h-4 text-red-500" />
                 </button>
                 <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200" title="More Options">
                   <MoreVertical className="w-4 h-4 text-gray-500" />
                 </button>
               </div>
             </div>
           </div>
         ))}
       </div>
     )}

     {!loading && !error && filteredDocuments.length === 0 && (
       <div className="text-center py-12">
         <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
         <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
         <p className="text-gray-600">Try adjusting your search or filter criteria, or upload a new document.</p>
       </div>
     )}
    </div>
  );
};

export default DocumentsContent;
