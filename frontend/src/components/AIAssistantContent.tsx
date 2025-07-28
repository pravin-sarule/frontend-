import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Plus, Mic, Loader, FileText, X } from 'lucide-react';
import RightSidebar from './RightSidebar';

interface Message {
  id: number;
  type: 'ai' | 'user' | 'system';
  content: string;
  timestamp: string; // Frontend display timestamp
  documentId?: string; // Optional: to link messages to specific documents
  
  // Backend fields that might come in the response
  sender?: 'user' | 'assistant';
  message?: string;
  chat_id?: number;
  created_at?: string;
}

interface Chat {
  id: number;
  user_id: number;
  title: string;
  created_at: string;
  messages: Message[];
}

interface Document { // Define Document interface here for local use
  id: number;
  document_name: string;
  input_bucket_path: string;
  output_bucket_path: string | null;
  file_type: string;
  uploaded_at: string;
  processed: boolean;
}

const AIAssistantContent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); // Initial state is empty, will be loaded from chat history
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [summarizationInstruction, setSummarizationInstruction] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [processingDocuments, setProcessingDocuments] = useState<{[key: number]: {filename: string, status: string, message: string}}
  >({});
  const [availableDocuments, setAvailableDocuments] = useState<Document[]>([]);
  const [selectedDocumentsForQuery, setSelectedDocumentsForQuery] = useState<Document[]>([]);
  const [lastProcessedDocumentId, setLastProcessedDocumentId] = useState<number | null>(null);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showSelectDocumentModal, setShowSelectDocumentModal] = useState(false);
  const [loadingAvailableDocs, setLoadingAvailableDocs] = useState(true);
  const [errorAvailableDocs, setErrorAvailableDocs] = useState<string | null>(null);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null); // New state for current chat ID
  const [chatList, setChatList] = useState<Chat[]>([]); // New state for chat list
  const [loadingChatList, setLoadingChatList] = useState(true); // Loading state for chat list
  const [errorChatList, setErrorChatList] = useState<string | null>(null); // Error state for chat list

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch chat list on component mount
  useEffect(() => {
    fetchChatList();
  }, []);

  // Helper function to normalize backend message format to frontend format
  const normalizeMessage = (msg: any): Message => {
    // Handle timestamp - prioritize created_at from backend, fallback to timestamp
    let formattedTimestamp = '';
    const timestampSource = msg.created_at || msg.timestamp;
    
    if (timestampSource) {
      try {
        // Handle potential microsecond precision
        let dateString = String(timestampSource);
        // Remove any fractional seconds beyond milliseconds (3 digits)
        const microsecondRegex = /(\.\d{3})\d+/;
        dateString = dateString.replace(microsecondRegex, '$1');

        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
          formattedTimestamp = date.toLocaleTimeString();
        } else {
          console.warn('Invalid timestamp:', timestampSource);
          formattedTimestamp = 'Invalid Date';
        }
      } catch (error) {
        console.warn('Error parsing timestamp:', timestampSource, error);
        formattedTimestamp = 'Invalid Date';
      }
    } else {
      formattedTimestamp = new Date().toLocaleTimeString(); // Current time as fallback
    }

    // Handle message content - prioritize message field from backend, fallback to content
    const content = msg.message || msg.content || '';

    // Handle message type - map sender to type
    let type: 'ai' | 'user' | 'system' = 'system';
    if (msg.sender === 'user') {
      type = 'user';
    } else if (msg.sender === 'assistant') {
      type = 'ai';
    } else if (msg.type) {
      type = msg.type;
    }

    return {
      id: msg.id,
      type,
      content,
      timestamp: formattedTimestamp,
      documentId: msg.documentId,
      // Keep original backend fields for reference if needed
      sender: msg.sender,
      message: msg.message,
      chat_id: msg.chat_id,
      created_at: msg.created_at
    };
  };

  const fetchChatList = async () => {
    setLoadingChatList(true);
    setErrorChatList(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorChatList('Authentication token not found. Please sign in.');
      setLoadingChatList(false);
      return;
    }
    try {
      const response = await fetch('http://34.47.179.91:8000/api/ai-ml/chats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch chat list');
      }
      const data: Chat[] = await response.json();
      setChatList(data);
      
      // Check if there's a stored current chat ID in localStorage
      const storedChatId = localStorage.getItem('currentChatId');
      
      if (storedChatId && data.some(chat => chat.id === parseInt(storedChatId))) {
        // Load the stored chat if it exists
        handleLoadChat(parseInt(storedChatId));
      } else if (!currentChatId && data.length > 0) {
        // If no stored chat or stored chat doesn't exist, load the most recent one
        handleLoadChat(data[0].id);
      } else if (!currentChatId && data.length === 0) {
        // If no chats exist, don't auto-create one - let user manually create
        setMessages([]);
      }
    } catch (error: any) {
      setErrorChatList(error.message);
      console.error('Error fetching chat list:', error);
    } finally {
      setLoadingChatList(false);
    }
  };

  const handleNewChat = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication token not found. Please sign in.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/api/ai-ml/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title: "New Chat" }), // Default title
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create new chat');
      }
      const newChat: Chat = await response.json();
      setChatList(prev => [newChat, ...prev]); // Add new chat to the top
      setCurrentChatId(newChat.id);
      
      // Store new chat ID in localStorage
      localStorage.setItem('currentChatId', newChat.id.toString());
      
      setMessages([]); // Clear current messages for new chat - no welcome message
      
    } catch (error: any) {
      alert(`Error creating new chat: ${error.message}`);
      console.error('Error creating new chat:', error);
    }
  };

  const handleLoadChat = async (chatId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication token not found. Please sign in.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/ai-ml/chats/${chatId}/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to load chat messages');
      }
      const loadedMessages: any[] = await response.json();
      setCurrentChatId(chatId);
      
      // Store current chat ID in localStorage for persistence
      localStorage.setItem('currentChatId', chatId.toString());
      
      // Normalize all messages using the helper function
      const normalizedMessages = loadedMessages.map(normalizeMessage);
      setMessages(normalizedMessages);
      
      scrollToBottom();
    } catch (error: any) {
      alert(`Error loading chat: ${error.message}`);
      console.error('Error loading chat messages:', error);
    }
  };

  const handleDeleteChat = async (chatId: number) => {
    if (!window.confirm('Are you sure you want to delete this chat? This action cannot be undone.')) {
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication token not found. Please sign in.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/ai-ml/chats/${chatId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete chat');
      }
      setChatList(prev => prev.filter(chat => chat.id !== chatId));
      if (currentChatId === chatId) {
        setCurrentChatId(null);
        setMessages([]);
        // Clear stored chat ID
        localStorage.removeItem('currentChatId');
        
        // Automatically load the next available chat or do nothing
        const remainingChats = chatList.filter(chat => chat.id !== chatId);
        if (remainingChats.length > 0) {
          handleLoadChat(remainingChats[0].id);
        }
      }
    } catch (error: any) {
      alert(`Error deleting chat: ${error.message}`);
      console.error('Error deleting chat:', error);
    }
  };

  const fetchAvailableDocuments = async () => {
    setLoadingAvailableDocs(true);
    setErrorAvailableDocs(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setErrorAvailableDocs('Authentication token not found. Please sign in.');
      setLoadingAvailableDocs(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/api/ai-ml/user_documents', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch available documents');
      }
      const data: Document[] = await response.json();
      setAvailableDocuments(data);
    } catch (error: any) {
      setErrorAvailableDocs(error.message);
      console.error('Error fetching available documents:', error);
    } finally {
      setLoadingAvailableDocs(false);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (showSelectDocumentModal) {
      fetchAvailableDocuments();
    }
  }, [showSelectDocumentModal]); // Fetch documents when modal is opened

  // Polling for document status
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      for (const docId in processingDocuments) {
        // Ensure docId is treated as a number for indexing
        const numericDocId = Number(docId);
        if (processingDocuments[numericDocId].status === 'PROCESSING' || processingDocuments[numericDocId].status === 'RECEIVED') {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('Authentication token not found for polling.');
            continue;
          }

          try {
            const response = await fetch(`http://localhost:8000/api/ai-ml/document_status/${numericDocId}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.error(`Error fetching status for ${numericDocId}:`, errorData);
              setProcessingDocuments(prev => ({
                ...prev,
                [numericDocId]: { ...prev[numericDocId], status: 'FAILED', message: errorData.detail || 'Unknown error' }
              }));
              const currentTimestamp = new Date().toLocaleTimeString();
              setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Document "${processingDocuments[numericDocId].filename}" processing failed: ${errorData.detail || 'Unknown error'}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]); // documentId is string in Message interface
              continue;
            }

            const statusData = await response.json();
            setProcessingDocuments(prev => ({
              ...prev,
              [numericDocId]: { ...prev[numericDocId], status: statusData.status, message: statusData.message }
            }));

            if (statusData.status === 'COMPLETED') {
              // Document completed, fetch summary
              const summaryRes = await fetch(`http://localhost:8000/api/ai-ml/get_summary/${numericDocId}`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });

              const currentTimestamp = new Date().toLocaleTimeString();
              if (!summaryRes.ok) {
                const errorData = await summaryRes.json();
                setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Failed to retrieve summary for "${processingDocuments[numericDocId].filename}": ${errorData.detail || 'Unknown error'}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]);
              } else {
                const summaryData = await summaryRes.json();
                setMessages(prev => [...prev, { id: prev.length + 1, type: 'ai', content: `Summary for "${processingDocuments[numericDocId].filename}":\n\n${summaryData.summary || 'No summary available.'}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]);
              }
              // Remove from processing list and refresh available documents
              setProcessingDocuments(prev => {
                const newDocs = { ...prev };
                delete newDocs[numericDocId];
                return newDocs;
              });
              setLastProcessedDocumentId(numericDocId); // Set the last processed document ID
              fetchAvailableDocuments(); // Refresh the list of available documents
            } else if (statusData.status === 'FAILED') {
              const currentTimestamp = new Date().toLocaleTimeString();
              setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Document "${processingDocuments[numericDocId].filename}" processing failed: ${statusData.error || statusData.message}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]);
              // Remove from processing list
              setProcessingDocuments(prev => {
                const newDocs = { ...prev };
                delete newDocs[numericDocId];
                return newDocs;
              });
            }
          } catch (error: any) {
            console.error(`Polling error for document ${numericDocId}:`, error);
            setProcessingDocuments(prev => ({
              ...prev,
              [numericDocId]: { ...prev[numericDocId], status: 'FAILED', message: `Polling failed: ${error.message}` }
            }));
            const currentTimestamp = new Date().toLocaleTimeString();
            setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Document "${processingDocuments[numericDocId].filename}" processing encountered an error during polling: ${error.message}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]);
            // Remove from processing list
            setProcessingDocuments(prev => {
              const newDocs = { ...prev };
              delete newDocs[numericDocId];
              return newDocs;
            });
          }
        }
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(pollInterval);
  }, [processingDocuments, messages, lastProcessedDocumentId]); // Re-run effect if processingDocuments, messages, or lastProcessedDocumentId change

  const recentTopics = [
    'Contract liability clauses',
    'Employment law updates',
    'Intellectual property rights',
    'Corporate compliance requirements',
    'Litigation strategy planning',
    'Trademark registration basics',
    'Consumer protection regulations',
    'Shareholder agreement terms',
    'Competition law overview',
    'Data privacy compliance'
  ];

  // This function will now only add files to the uploadedFiles state
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]); // Append new files
      e.target.value = ''; // Clear the input so the same file can be selected again
      setShowAddOptions(false); // Close the add options dropdown
    }
  };

  // This function will now handle sending both text messages and initiating document processing
  const handleSendMessage = async () => {
    if (!inputMessage.trim() && uploadedFiles.length === 0 && selectedDocumentsForQuery.length === 0 && lastProcessedDocumentId === null) return;

    if (currentChatId === null) {
      alert("No chat session active. Please start a new chat or select an existing one.");
      return;
    }

    setIsTyping(true);

    const token = localStorage.getItem('token');
    if (!token) {
      const currentTimestamp = new Date().toLocaleTimeString();
      setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: 'Authentication token not found. Please sign in.', timestamp: currentTimestamp }]);
      setIsTyping(false);
      return;
    }

    // Process newly uploaded files first, if any
    if (uploadedFiles.length > 0) {
      for (const file of uploadedFiles) {
        const tempMessageId = messages.length + 1;
        const currentTimestamp = new Date().toLocaleTimeString();
        setMessages(prev => [...prev, { id: tempMessageId, type: 'user', content: `Preparing to upload document: "${file.name}"`, timestamp: currentTimestamp }]);

        const formData = new FormData();
        formData.append('file', file);
        if (summarizationInstruction.trim()) {
          formData.append('summarization_instruction', summarizationInstruction.trim());
        }

        try {
          const uploadRes = await fetch('http://localhost:8000/api/ai-ml/process_document', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
          });

          if (!uploadRes.ok) {
            const errorData = await uploadRes.json();
            throw new Error(errorData.detail ? (typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail)) : 'File upload failed');
          }
          const uploadData = await uploadRes.json();
          const documentId = uploadData.document_id;

          setProcessingDocuments(prev => ({
            ...prev,
            [documentId]: { filename: file.name, status: 'RECEIVED', message: 'Document received, processing initiated.' }
          }));

          const currentTimestamp = new Date().toLocaleTimeString();
          setMessages(prev => prev.map(msg =>
            msg.id === tempMessageId
              ? { ...msg, content: `Document "${file.name}" uploaded. Processing initiated.`, documentId: documentId, timestamp: currentTimestamp }
              : msg
          ));

        } catch (error: any) {
          setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Error uploading file "${file.name}": ${error.message}`, timestamp: new Date().toLocaleTimeString() }]);
          console.error('File upload failed:', error);
        }
      }
      setUploadedFiles([]);
      setSummarizationInstruction('');
    }

    // Determine which documents to query: explicitly selected, or the last processed one
    let documentsToQuery: Document[] = [];
    if (selectedDocumentsForQuery.length > 0) {
      documentsToQuery = selectedDocumentsForQuery;
    } else if (lastProcessedDocumentId !== null) {
      // Find the last processed document from availableDocuments
      const lastDoc = availableDocuments.find(doc => doc.id === lastProcessedDocumentId);
      if (lastDoc) {
        documentsToQuery = [lastDoc];
      }
    }

    // Now send the text query, potentially associated with selected documents
    if (inputMessage.trim() || documentsToQuery.length > 0) { // Query can be just document selection
      const userMessageContent = inputMessage.trim();
      const userMessage: Message = {
        id: messages.length + 1, // This ID is temporary, backend will assign real ID
        type: 'user',
        content: userMessageContent || `Querying selected document(s): ${documentsToQuery.map(doc => doc.document_name).join(', ')}`,
        timestamp: new Date().toLocaleTimeString()
      };
 
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
 
      // Send a query for each selected document
      for (const doc of documentsToQuery) {
        try {
          const queryPayload: { document_id: number; query: string; chat_id: number } = {
            document_id: doc.id,
            query: userMessageContent || "Summarize this document.",
            chat_id: currentChatId // Pass the current chat ID
          };
 
          console.log('Sending query payload:', queryPayload);
 
          const response = await fetch('http://localhost:8000/api/ai-ml/answer_query', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(queryPayload),
          });
 
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail ? (typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail)) : 'Failed to get AI response');
          }
 
          await response.json(); // Consume the response body
          // Messages are now saved by the backend, so we just need to refetch them
          handleLoadChat(currentChatId); // Reload messages for the current chat
 
        } catch (error: any) {
          const currentTimestamp = new Date().toLocaleTimeString();
          setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Error getting AI response for "${doc.document_name}": ${error.message}`, timestamp: currentTimestamp }]);
          console.error(`AI Assistant query failed for document ${doc.document_name}:`, error);
        }
      }
    }
 
    setIsTyping(false);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleRemoveSelectedDocument = (documentIdToRemove: number) => {
    setSelectedDocumentsForQuery(prev => prev.filter(doc => doc.id !== documentIdToRemove));
  };

  const handleToggleSelectDocument = (document: Document) => {
    setSelectedDocumentsForQuery(prev =>
      prev.some(doc => doc.id === document.id)
        ? prev.filter(doc => doc.id !== document.id)
        : [...prev, document]
    );
  };

  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      setIsRecording(true);
      setInputMessage('Listening...');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  return (
    <div className="flex w-full h-full overflow-hidden">
      <div className="flex-1 flex flex-col h-full max-h-full">
        <div className="bg-white border-b border-gray-200 p-3 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">AI Legal Assistant</h1>
              <p className="text-sm text-gray-600">Get instant help with legal research, document analysis, and case insights</p>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">Online</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
          {messages.map((message, index) => (
            <div key={`message-${message.id}-${index}`} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' ? 'bg-blue-600' :
                  message.type === 'ai' ? 'bg-gradient-to-br from-indigo-500 to-purple-600' :
                  'bg-red-500' // Style for system messages/errors
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`rounded-2xl px-4 py-2 ${
                  message.type === 'user' ? 'bg-blue-600 text-white' :
                  message.type === 'ai' ? 'bg-white border border-gray-200 text-gray-900' :
                  'bg-red-100 border border-red-300 text-red-800' // Style for system messages/errors
                }`}>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {/* Display timestamp if available */}
                  {message.timestamp && (
                    <div className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' :
                      message.type === 'ai' ? 'text-gray-500' :
                      'text-red-600' // Style for system messages/errors
                    }`}>{message.timestamp}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {Object.entries(processingDocuments).map(([docId, doc], index) => {
            return (
              <div key={`processing-${docId}-${index}`} className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-2xl">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                    <div className="whitespace-pre-wrap">
                      Document "{doc.filename}" is currently: **{doc.status}** - {doc.message}
                      {doc.status === 'PROCESSING' && (
                        <span className="ml-2 inline-block animate-spin">
                          <Loader className="w-4 h-4 text-gray-500" />
                        </span>
                      )}
                    </div>
                    <div className="text-xs mt-1 text-gray-500">{new Date().toLocaleTimeString()}</div>
                  </div>
                </div>
              </div>
            );
          })}
          {isTyping && (
            <div key="typing-indicator" className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-2xl">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white border-t border-gray-200 p-3 shrink-0">
          <div className="flex items-end space-x-2">
            {/* Plus Button with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowAddOptions(!showAddOptions)}
                className="w-9 h-9 bg-gray-100 border rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0"
                title="Add file or select from storage"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
              {showAddOptions && (
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <input type="file" multiple className="hidden" onChange={handleFileUpload} />
                    Upload from device
                  </label>
                  <button
                    onClick={() => {
                      setShowAddOptions(false);
                      setShowSelectDocumentModal(true); // Open modal for selecting existing documents
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Select from stored documents
                  </button>
                </div>
              )}
            </div>
 
            {/* Input Message Area */}
            <div className="flex-1">
              {(uploadedFiles.length > 0 || selectedDocumentsForQuery.length > 0) && ( // Updated condition
                <div className="mb-2 p-2 bg-blue-50 rounded-lg flex flex-col space-y-2 text-sm text-blue-800">
                  <div className="font-medium mb-1">Files to process:</div>
                  {uploadedFiles.map((file, index) => (
                    <div key={`upload-${index}-${file.name}`} className="flex items-center justify-between">
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {file.name} (New Upload)
                      </span>
                      <button onClick={() => handleRemoveFile(index)} className="ml-2 text-blue-600 hover:text-blue-800">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {selectedDocumentsForQuery.map((doc, index) => ( // Display selected existing documents
                    <div key={`selected-doc-${doc.id}-${index}`} className="flex items-center justify-between">
                      <span className="flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        {doc.document_name} (Stored)
                      </span>
                      <button onClick={() => handleRemoveSelectedDocument(doc.id)} className="ml-2 text-blue-600 hover:text-blue-800">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <textarea
                    value={summarizationInstruction}
                    onChange={(e) => setSummarizationInstruction(e.target.value)}
                    placeholder="Add custom summarization instructions (e.g., 'focus on timeline', 'bullet points only')..."
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800"
                    rows={2}
                    style={{ minHeight: '60px', maxHeight: '100px' }}
                  />
                </div>
              )}

              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about legal matters..."
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={1}
                style={{ minHeight: '40px', maxHeight: '80px' }}
              />
            </div>
 
            {/* Microphone Button */}
            <div
              className={`w-9 h-9 ${isRecording ? 'bg-red-100' : 'bg-gray-100'} border rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer shrink-0`}
              onClick={handleMicClick}
              title="Click to speak"
            >
              <Mic className="w-5 h-5 text-gray-600" />
            </div>
 
            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={(!inputMessage.trim() && uploadedFiles.length === 0 && selectedDocumentsForQuery.length === 0) || isTyping} // Updated condition
              className="btn-primary btn-small disabled:btn-secondary shrink-0"
            >
              {isTyping ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Modal for selecting existing documents */}
        {showSelectDocumentModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[80vh] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Select Documents from Storage</h2>
                <button onClick={() => setShowSelectDocumentModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto mb-4">
                {availableDocuments.length === 0 && !loadingAvailableDocs && !errorAvailableDocs && (
                  <p className="text-gray-600 text-center">No documents available in your storage.</p>
                )}
                {loadingAvailableDocs && (
                  <div className="text-center py-4">
                    <Loader className="w-8 h-8 text-blue-500 mx-auto animate-spin" />
                    <p className="text-gray-600">Loading stored documents...</p>
                  </div>
                )}
                {errorAvailableDocs && (
                  <p className="text-red-600 text-center">Error loading documents: {errorAvailableDocs}</p>
                )}
                {!loadingAvailableDocs && !errorAvailableDocs && availableDocuments.length > 0 && (
                  <div className="space-y-3">
                    {availableDocuments.map((doc, index) => (
                      <div key={`modal-doc-${doc.id}-${index}`} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedDocumentsForQuery.some(sDoc => sDoc.id === doc.id)}
                            onChange={() => handleToggleSelectDocument(doc)}
                            className="form-checkbox h-5 w-5 text-blue-600 rounded"
                          />
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">{doc.document_name}</p>
                            <p className="text-sm text-gray-500">{new Date(doc.uploaded_at).toLocaleDateString()} - {doc.file_type}</p>
                          </div>
                        </div>
                        {doc.processed && doc.output_bucket_path && (
                          <a
                            href={doc.output_bucket_path.replace('gs://', 'https://storage.googleapis.com/')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            View Summary
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <button onClick={() => setShowSelectDocumentModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={() => setShowSelectDocumentModal(false)} className="btn-primary">
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
 
      <div className="h-full max-h-full overflow-y-auto">
        <RightSidebar
          recentTopics={recentTopics}
          handleQuickPrompt={handleQuickPrompt}
          chatList={chatList} // Pass chatList
          currentChatId={currentChatId} // Pass currentChatId
          onLoadChat={handleLoadChat} // Pass load chat handler
          onNewChat={handleNewChat} // Pass new chat handler
          onDeleteChat={handleDeleteChat} // Pass delete chat handler
          loadingChatList={loadingChatList} // Pass loading state
          errorChatList={errorChatList} // Pass error state
        />
      </div>
    </div>
  );
};

export default AIAssistantContent;