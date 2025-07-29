// import React, { useState, useRef, useEffect } from 'react';
// import { Bot, Send, User, Plus, Mic, Loader, FileText, X } from 'lucide-react';
// import RightSidebar from './RightSidebar';

// interface Message {
//   id: number;
//   type: 'ai' | 'user' | 'system';
//   content: string;
//   timestamp: string; // Frontend display timestamp
//   documentId?: string; // Optional: to link messages to specific documents
  
//   // Backend fields that might come in the response
//   sender?: 'user' | 'assistant';
//   message?: string;
//   chat_id?: number;
//   created_at?: string;
// }

// interface Chat {
//   id: number;
//   user_id: number;
//   title: string;
//   created_at: string;
//   messages: Message[];
// }

// interface Document { // Define Document interface here for local use
//   id: number;
//   document_name: string;
//   input_bucket_path: string;
//   output_bucket_path: string | null;
//   file_type: string;
//   uploaded_at: string;
//   processed: boolean;
// }

// const AIAssistantContent: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([]); // Initial state is empty, will be loaded from chat history
//   const [inputMessage, setInputMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
//   const [summarizationInstruction, setSummarizationInstruction] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [processingDocuments, setProcessingDocuments] = useState<{[key: number]: {filename: string, status: string, message: string}}
//   >({});
//   const [availableDocuments, setAvailableDocuments] = useState<Document[]>([]);
//   const [selectedDocumentsForQuery, setSelectedDocumentsForQuery] = useState<Document[]>([]);
//   const [lastProcessedDocumentId, setLastProcessedDocumentId] = useState<number | null>(null);
//   const [showAddOptions, setShowAddOptions] = useState(false);
//   const [showSelectDocumentModal, setShowSelectDocumentModal] = useState(false);
//   const [loadingAvailableDocs, setLoadingAvailableDocs] = useState(true);
//   const [errorAvailableDocs, setErrorAvailableDocs] = useState<string | null>(null);
//   const [currentChatId, setCurrentChatId] = useState<number | null>(null); // New state for current chat ID
//   const [chatList, setChatList] = useState<Chat[]>([]); // New state for chat list
//   const [loadingChatList, setLoadingChatList] = useState(true); // Loading state for chat list
//   const [errorChatList, setErrorChatList] = useState<string | null>(null); // Error state for chat list

//   const recognitionRef = useRef<any>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Fetch chat list on component mount
//   useEffect(() => {
//     fetchChatList();
//   }, []);

//   // Helper function to normalize backend message format to frontend format
//   const normalizeMessage = (msg: any): Message => {
//     // Handle timestamp - prioritize created_at from backend, fallback to timestamp
//     let formattedTimestamp = '';
//     const timestampSource = msg.created_at || msg.timestamp;
    
//     if (timestampSource) {
//       try {
//         // Handle potential microsecond precision
//         let dateString = String(timestampSource);
//         // Remove any fractional seconds beyond milliseconds (3 digits)
//         const microsecondRegex = /(\.\d{3})\d+/;
//         dateString = dateString.replace(microsecondRegex, '$1');

//         const date = new Date(dateString);
//         if (!isNaN(date.getTime())) {
//           formattedTimestamp = date.toLocaleTimeString();
//         } else {
//           console.warn('Invalid timestamp:', timestampSource);
//           formattedTimestamp = 'Invalid Date';
//         }
//       } catch (error) {
//         console.warn('Error parsing timestamp:', timestampSource, error);
//         formattedTimestamp = 'Invalid Date';
//       }
//     } else {
//       formattedTimestamp = new Date().toLocaleTimeString(); // Current time as fallback
//     }

//     // Handle message content - prioritize message field from backend, fallback to content
//     const content = msg.message || msg.content || '';

//     // Handle message type - map sender to type
//     let type: 'ai' | 'user' | 'system' = 'system';
//     if (msg.sender === 'user') {
//       type = 'user';
//     } else if (msg.sender === 'assistant') {
//       type = 'ai';
//     } else if (msg.type) {
//       type = msg.type;
//     }

//     return {
//       id: msg.id,
//       type,
//       content,
//       timestamp: formattedTimestamp,
//       documentId: msg.documentId,
//       // Keep original backend fields for reference if needed
//       sender: msg.sender,
//       message: msg.message,
//       chat_id: msg.chat_id,
//       created_at: msg.created_at
//     };
//   };

//   const fetchChatList = async () => {
//     setLoadingChatList(true);
//     setErrorChatList(null);
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setErrorChatList('Authentication token not found. Please sign in.');
//       setLoadingChatList(false);
//       return;
//     }
//     try {
//       const response = await fetch('https://api.digitizeindia.co.in/api/ai-ml/chats', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to fetch chat list');
//       }
//       const data: Chat[] = await response.json();
//       setChatList(data);
      
//       // Check if there's a stored current chat ID in localStorage
//       const storedChatId = localStorage.getItem('currentChatId');
      
//       if (storedChatId && data.some(chat => chat.id === parseInt(storedChatId))) {
//         // Load the stored chat if it exists
//         handleLoadChat(parseInt(storedChatId));
//       } else if (!currentChatId && data.length > 0) {
//         // If no stored chat or stored chat doesn't exist, load the most recent one
//         handleLoadChat(data[0].id);
//       } else if (!currentChatId && data.length === 0) {
//         // If no chats exist, don't auto-create one - let user manually create
//         setMessages([]);
//       }
//     } catch (error: any) {
//       setErrorChatList(error.message);
//       console.error('Error fetching chat list:', error);
//     } finally {
//       setLoadingChatList(false);
//     }
//   };

//   const handleNewChat = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Authentication token not found. Please sign in.');
//       return;
//     }
//     try {
//       const response = await fetch('https://api.digitizeindia.co.in/api/ai-ml/chats', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ title: "New Chat" }), // Default title
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to create new chat');
//       }
//       const newChat: Chat = await response.json();
//       setChatList(prev => [newChat, ...prev]); // Add new chat to the top
//       setCurrentChatId(newChat.id);
      
//       // Store new chat ID in localStorage
//       localStorage.setItem('currentChatId', newChat.id.toString());
      
//       setMessages([]); // Clear current messages for new chat - no welcome message
      
//     } catch (error: any) {
//       alert(`Error creating new chat: ${error.message}`);
//       console.error('Error creating new chat:', error);
//     }
//   };

//   const handleLoadChat = async (chatId: number) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Authentication token not found. Please sign in.');
//       return;
//     }
//     try {
//       const response = await fetch(`https://api.digitizeindia.co.in/api/ai-ml/chats/${chatId}/messages`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to load chat messages');
//       }
//       const loadedMessages: any[] = await response.json();
//       setCurrentChatId(chatId);
      
//       // Store current chat ID in localStorage for persistence
//       localStorage.setItem('currentChatId', chatId.toString());
      
//       // Normalize all messages using the helper function
//       const normalizedMessages = loadedMessages.map(normalizeMessage);
//       setMessages(normalizedMessages);
      
//       scrollToBottom();
//     } catch (error: any) {
//       alert(`Error loading chat: ${error.message}`);
//       console.error('Error loading chat messages:', error);
//     }
//   };

//   const handleDeleteChat = async (chatId: number) => {
//     if (!window.confirm('Are you sure you want to delete this chat? This action cannot be undone.')) {
//       return;
//     }
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Authentication token not found. Please sign in.');
//       return;
//     }
//     try {
//       const response = await fetch(`https://api.digitizeindia.co.in/api/ai-ml/chats/${chatId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to delete chat');
//       }
//       setChatList(prev => prev.filter(chat => chat.id !== chatId));
//       if (currentChatId === chatId) {
//         setCurrentChatId(null);
//         setMessages([]);
//         // Clear stored chat ID
//         localStorage.removeItem('currentChatId');
        
//         // Automatically load the next available chat or do nothing
//         const remainingChats = chatList.filter(chat => chat.id !== chatId);
//         if (remainingChats.length > 0) {
//           handleLoadChat(remainingChats[0].id);
//         }
//       }
//     } catch (error: any) {
//       alert(`Error deleting chat: ${error.message}`);
//       console.error('Error deleting chat:', error);
//     }
//   };

//   const fetchAvailableDocuments = async () => {
//     setLoadingAvailableDocs(true);
//     setErrorAvailableDocs(null);
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setErrorAvailableDocs('Authentication token not found. Please sign in.');
//       setLoadingAvailableDocs(false);
//       return;
//     }
//     try {
//       const response = await fetch('https://api.digitizeindia.co.in/api/ai-ml/user_documents', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to fetch available documents');
//       }
//       const data: Document[] = await response.json();
//       setAvailableDocuments(data);
//     } catch (error: any) {
//       setErrorAvailableDocs(error.message);
//       console.error('Error fetching available documents:', error);
//     } finally {
//       setLoadingAvailableDocs(false);
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     if (showSelectDocumentModal) {
//       fetchAvailableDocuments();
//     }
//   }, [showSelectDocumentModal]); // Fetch documents when modal is opened

//   // Polling for document status
//   useEffect(() => {
//     const pollInterval = setInterval(async () => {
//       for (const docId in processingDocuments) {
//         // Ensure docId is treated as a number for indexing
//         const numericDocId = Number(docId);
//         if (processingDocuments[numericDocId].status === 'PROCESSING' || processingDocuments[numericDocId].status === 'RECEIVED') {
//           const token = localStorage.getItem('token');
//           if (!token) {
//             console.error('Authentication token not found for polling.');
//             continue;
//           }

//           try {
//             const response = await fetch(`https://api.digitizeindia.co.in/api/ai-ml/document_status/${numericDocId}`, {
//               headers: {
//                 'Authorization': `Bearer ${token}`,
//               },
//             });

//             if (!response.ok) {
//               const errorData = await response.json();
//               console.error(`Error fetching status for ${numericDocId}:`, errorData);
//               setProcessingDocuments(prev => ({
//                 ...prev,
//                 [numericDocId]: { ...prev[numericDocId], status: 'FAILED', message: errorData.detail || 'Unknown error' }
//               }));
//               const currentTimestamp = new Date().toLocaleTimeString();
//               setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Document "${processingDocuments[numericDocId].filename}" processing failed: ${errorData.detail || 'Unknown error'}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]); // documentId is string in Message interface
//               continue;
//             }

//             const statusData = await response.json();
//             setProcessingDocuments(prev => ({
//               ...prev,
//               [numericDocId]: { ...prev[numericDocId], status: statusData.status, message: statusData.message }
//             }));

//             if (statusData.status === 'COMPLETED') {
//               // Document completed, fetch summary
//               const summaryRes = await fetch(`https://api.digitizeindia.co.in/api/ai-ml/get_summary/${numericDocId}`, {
//                 headers: {
//                   'Authorization': `Bearer ${token}`,
//                 },
//               });

//               const currentTimestamp = new Date().toLocaleTimeString();
//               if (!summaryRes.ok) {
//                 const errorData = await summaryRes.json();
//                 setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Failed to retrieve summary for "${processingDocuments[numericDocId].filename}": ${errorData.detail || 'Unknown error'}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]);
//               } else {
//                 const summaryData = await summaryRes.json();
//                 setMessages(prev => [...prev, { id: prev.length + 1, type: 'ai', content: `Summary for "${processingDocuments[numericDocId].filename}":\n\n${summaryData.summary || 'No summary available.'}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]);
//               }
//               // Remove from processing list and refresh available documents
//               setProcessingDocuments(prev => {
//                 const newDocs = { ...prev };
//                 delete newDocs[numericDocId];
//                 return newDocs;
//               });
//               setLastProcessedDocumentId(numericDocId); // Set the last processed document ID
//               fetchAvailableDocuments(); // Refresh the list of available documents
//             } else if (statusData.status === 'FAILED') {
//               const currentTimestamp = new Date().toLocaleTimeString();
//               setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Document "${processingDocuments[numericDocId].filename}" processing failed: ${statusData.error || statusData.message}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]);
//               // Remove from processing list
//               setProcessingDocuments(prev => {
//                 const newDocs = { ...prev };
//                 delete newDocs[numericDocId];
//                 return newDocs;
//               });
//             }
//           } catch (error: any) {
//             console.error(`Polling error for document ${numericDocId}:`, error);
//             setProcessingDocuments(prev => ({
//               ...prev,
//               [numericDocId]: { ...prev[numericDocId], status: 'FAILED', message: `Polling failed: ${error.message}` }
//             }));
//             const currentTimestamp = new Date().toLocaleTimeString();
//             setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Document "${processingDocuments[numericDocId].filename}" processing encountered an error during polling: ${error.message}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]);
//             // Remove from processing list
//             setProcessingDocuments(prev => {
//               const newDocs = { ...prev };
//               delete newDocs[numericDocId];
//               return newDocs;
//             });
//           }
//         }
//       }
//     }, 5000); // Poll every 5 seconds

//     return () => clearInterval(pollInterval);
//   }, [processingDocuments, messages, lastProcessedDocumentId]); // Re-run effect if processingDocuments, messages, or lastProcessedDocumentId change

//   const recentTopics = [
//     'Contract liability clauses',
//     'Employment law updates',
//     'Intellectual property rights',
//     'Corporate compliance requirements',
//     'Litigation strategy planning',
//     'Trademark registration basics',
//     'Consumer protection regulations',
//     'Shareholder agreement terms',
//     'Competition law overview',
//     'Data privacy compliance'
//   ];

//   // This function will now only add files to the uploadedFiles state
//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       setUploadedFiles(prev => [...prev, ...files]); // Append new files
//       e.target.value = ''; // Clear the input so the same file can be selected again
//       setShowAddOptions(false); // Close the add options dropdown
//     }
//   };

//   // This function will now handle sending both text messages and initiating document processing
//   const handleSendMessage = async () => {
//     if (!inputMessage.trim() && uploadedFiles.length === 0 && selectedDocumentsForQuery.length === 0 && lastProcessedDocumentId === null) return;

//     if (currentChatId === null) {
//       alert("No chat session active. Please start a new chat or select an existing one.");
//       return;
//     }

//     setIsTyping(true);

//     const token = localStorage.getItem('token');
//     if (!token) {
//       const currentTimestamp = new Date().toLocaleTimeString();
//       setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: 'Authentication token not found. Please sign in.', timestamp: currentTimestamp }]);
//       setIsTyping(false);
//       return;
//     }

//     // Process newly uploaded files first, if any
//     if (uploadedFiles.length > 0) {
//       for (const file of uploadedFiles) {
//         const tempMessageId = messages.length + 1;
//         const currentTimestamp = new Date().toLocaleTimeString();
//         setMessages(prev => [...prev, { id: tempMessageId, type: 'user', content: `Preparing to upload document: "${file.name}"`, timestamp: currentTimestamp }]);

//         const formData = new FormData();
//         formData.append('file', file);
//         if (summarizationInstruction.trim()) {
//           formData.append('summarization_instruction', summarizationInstruction.trim());
//         }

//         try {
//           const uploadRes = await fetch('https://api.digitizeindia.co.in/api/ai-ml/process_document', {
//             method: 'POST',
//             headers: {
//               'Authorization': `Bearer ${token}`,
//             },
//             body: formData,
//           });

//           if (!uploadRes.ok) {
//             const errorData = await uploadRes.json();
//             throw new Error(errorData.detail ? (typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail)) : 'File upload failed');
//           }
//           const uploadData = await uploadRes.json();
//           const documentId = uploadData.document_id;

//           setProcessingDocuments(prev => ({
//             ...prev,
//             [documentId]: { filename: file.name, status: 'RECEIVED', message: 'Document received, processing initiated.' }
//           }));

//           const currentTimestamp = new Date().toLocaleTimeString();
//           setMessages(prev => prev.map(msg =>
//             msg.id === tempMessageId
//               ? { ...msg, content: `Document "${file.name}" uploaded. Processing initiated.`, documentId: documentId, timestamp: currentTimestamp }
//               : msg
//           ));

//         } catch (error: any) {
//           setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Error uploading file "${file.name}": ${error.message}`, timestamp: new Date().toLocaleTimeString() }]);
//           console.error('File upload failed:', error);
//         }
//       }
//       setUploadedFiles([]);
//       setSummarizationInstruction('');
//     }

//     // Determine which documents to query: explicitly selected, or the last processed one
//     let documentsToQuery: Document[] = [];
//     if (selectedDocumentsForQuery.length > 0) {
//       documentsToQuery = selectedDocumentsForQuery;
//     } else if (lastProcessedDocumentId !== null) {
//       // Find the last processed document from availableDocuments
//       const lastDoc = availableDocuments.find(doc => doc.id === lastProcessedDocumentId);
//       if (lastDoc) {
//         documentsToQuery = [lastDoc];
//       }
//     }

//     // Now send the text query, potentially associated with selected documents
//     if (inputMessage.trim() || documentsToQuery.length > 0) { // Query can be just document selection
//       const userMessageContent = inputMessage.trim();
//       const userMessage: Message = {
//         id: messages.length + 1, // This ID is temporary, backend will assign real ID
//         type: 'user',
//         content: userMessageContent || `Querying selected document(s): ${documentsToQuery.map(doc => doc.document_name).join(', ')}`,
//         timestamp: new Date().toLocaleTimeString()
//       };
 
//       setMessages(prev => [...prev, userMessage]);
//       setInputMessage('');
 
//       // Send a query for each selected document
//       for (const doc of documentsToQuery) {
//         try {
//           const queryPayload: { document_id: number; query: string; chat_id: number } = {
//             document_id: doc.id,
//             query: userMessageContent || "Summarize this document.",
//             chat_id: currentChatId // Pass the current chat ID
//           };
 
//           console.log('Sending query payload:', queryPayload);
 
//           const response = await fetch('https://api.digitizeindia.co.in/api/ai-ml/answer_query', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify(queryPayload),
//           });
 
//           if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.detail ? (typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail)) : 'Failed to get AI response');
//           }
 
//           await response.json(); // Consume the response body
//           // Messages are now saved by the backend, so we just need to refetch them
//           handleLoadChat(currentChatId); // Reload messages for the current chat
 
//         } catch (error: any) {
//           const currentTimestamp = new Date().toLocaleTimeString();
//           setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Error getting AI response for "${doc.document_name}": ${error.message}`, timestamp: currentTimestamp }]);
//           console.error(`AI Assistant query failed for document ${doc.document_name}:`, error);
//         }
//       }
//     }
 
//     setIsTyping(false);
//   };

//   const handleQuickPrompt = (prompt: string) => {
//     setInputMessage(prompt);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const handleRemoveFile = (indexToRemove: number) => {
//     setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
//   };

//   const handleRemoveSelectedDocument = (documentIdToRemove: number) => {
//     setSelectedDocumentsForQuery(prev => prev.filter(doc => doc.id !== documentIdToRemove));
//   };

//   const handleToggleSelectDocument = (document: Document) => {
//     setSelectedDocumentsForQuery(prev =>
//       prev.some(doc => doc.id === document.id)
//         ? prev.filter(doc => doc.id !== document.id)
//         : [...prev, document]
//     );
//   };

//   const handleMicClick = () => {
//     if (!('webkitSpeechRecognition' in window)) {
//       alert('Speech recognition not supported in this browser.');
//       return;
//     }

//     const recognition = new (window as any).webkitSpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = 'en-IN';

//     recognition.onstart = () => {
//       setIsRecording(true);
//       setInputMessage('Listening...');
//     };

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript;
//       setInputMessage(transcript);
//     };

//     recognition.onerror = () => {
//       setIsRecording(false);
//     };

//     recognition.onend = () => {
//       setIsRecording(false);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   };

//   return (
//     <div className="flex w-full h-full overflow-hidden">
//       <div className="flex-1 flex flex-col h-full max-h-full">
//         <div className="bg-white border-b border-gray-200 p-3 shrink-0">
//           <div className="flex items-center space-x-3">
//             <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
//               <Bot className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h1 className="text-lg font-bold text-gray-900">AI Legal Assistant</h1>
//               <p className="text-sm text-gray-600">Get instant help with legal research, document analysis, and case insights</p>
//             </div>
//             <div className="ml-auto flex items-center space-x-2">
//               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//               <span className="text-sm text-green-600 font-medium">Online</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
//           {messages.map((message, index) => (
//             <div key={`message-${message.id}-${index}`} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//               <div className={`flex items-start space-x-3 max-w-2xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
//                 <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
//                   message.type === 'user' ? 'bg-blue-600' :
//                   message.type === 'ai' ? 'bg-gradient-to-br from-indigo-500 to-purple-600' :
//                   'bg-red-500' // Style for system messages/errors
//                 }`}>
//                   {message.type === 'user' ? (
//                     <User className="w-4 h-4 text-white" />
//                   ) : (
//                     <Bot className="w-4 h-4 text-white" />
//                   )}
//                 </div>
//                 <div className={`rounded-2xl px-4 py-2 ${
//                   message.type === 'user' ? 'bg-blue-600 text-white' :
//                   message.type === 'ai' ? 'bg-white border border-gray-200 text-gray-900' :
//                   'bg-red-100 border border-red-300 text-red-800' // Style for system messages/errors
//                 }`}>
//                   <div className="whitespace-pre-wrap">{message.content}</div>
//                   {/* Display timestamp if available */}
//                   {message.timestamp && (
//                     <div className={`text-xs mt-1 ${
//                       message.type === 'user' ? 'text-blue-100' :
//                       message.type === 'ai' ? 'text-gray-500' :
//                       'text-red-600' // Style for system messages/errors
//                     }`}>{message.timestamp}</div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//           {Object.entries(processingDocuments).map(([docId, doc], index) => {
//             return (
//               <div key={`processing-${docId}-${index}`} className="flex justify-start">
//                 <div className="flex items-start space-x-3 max-w-2xl">
//                   <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
//                     <Bot className="w-4 h-4 text-white" />
//                   </div>
//                   <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
//                     <div className="whitespace-pre-wrap">
//                       Document "{doc.filename}" is currently: **{doc.status}** - {doc.message}
//                       {doc.status === 'PROCESSING' && (
//                         <span className="ml-2 inline-block animate-spin">
//                           <Loader className="w-4 h-4 text-gray-500" />
//                         </span>
//                       )}
//                     </div>
//                     <div className="text-xs mt-1 text-gray-500">{new Date().toLocaleTimeString()}</div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//           {isTyping && (
//             <div key="typing-indicator" className="flex justify-start">
//               <div className="flex items-start space-x-3 max-w-2xl">
//                 <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
//                   <Bot className="w-4 h-4 text-white" />
//                 </div>
//                 <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
//                   <div className="flex space-x-1">
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         <div className="bg-white border-t border-gray-200 p-3 shrink-0">
//           <div className="flex items-end space-x-2">
//             {/* Plus Button with Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowAddOptions(!showAddOptions)}
//                 className="w-9 h-9 bg-gray-100 border rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0"
//                 title="Add file or select from storage"
//               >
//                 <Plus className="w-5 h-5 text-gray-600" />
//               </button>
//               {showAddOptions && (
//                 <div className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
//                   <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
//                     <input type="file" multiple className="hidden" onChange={handleFileUpload} />
//                     Upload from device
//                   </label>
//                   <button
//                     onClick={() => {
//                       setShowAddOptions(false);
//                       setShowSelectDocumentModal(true); // Open modal for selecting existing documents
//                     }}
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     Select from stored documents
//                   </button>
//                 </div>
//               )}
//             </div>
 
//             {/* Input Message Area */}
//             <div className="flex-1">
//               {(uploadedFiles.length > 0 || selectedDocumentsForQuery.length > 0) && ( // Updated condition
//                 <div className="mb-2 p-2 bg-blue-50 rounded-lg flex flex-col space-y-2 text-sm text-blue-800">
//                   <div className="font-medium mb-1">Files to process:</div>
//                   {uploadedFiles.map((file, index) => (
//                     <div key={`upload-${index}-${file.name}`} className="flex items-center justify-between">
//                       <span className="flex items-center">
//                         <FileText className="w-4 h-4 mr-1" />
//                         {file.name} (New Upload)
//                       </span>
//                       <button onClick={() => handleRemoveFile(index)} className="ml-2 text-blue-600 hover:text-blue-800">
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                   {selectedDocumentsForQuery.map((doc, index) => ( // Display selected existing documents
//                     <div key={`selected-doc-${doc.id}-${index}`} className="flex items-center justify-between">
//                       <span className="flex items-center">
//                         <FileText className="w-4 h-4 mr-1" />
//                         {doc.document_name} (Stored)
//                       </span>
//                       <button onClick={() => handleRemoveSelectedDocument(doc.id)} className="ml-2 text-blue-600 hover:text-blue-800">
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                   <textarea
//                     value={summarizationInstruction}
//                     onChange={(e) => setSummarizationInstruction(e.target.value)}
//                     placeholder="Add custom summarization instructions (e.g., 'focus on timeline', 'bullet points only')..."
//                     className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800"
//                     rows={2}
//                     style={{ minHeight: '60px', maxHeight: '100px' }}
//                   />
//                 </div>
//               )}

//               <textarea
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Ask me anything about legal matters..."
//                 className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                 rows={1}
//                 style={{ minHeight: '40px', maxHeight: '80px' }}
//               />
//             </div>
 
//             {/* Microphone Button */}
//             <div
//               className={`w-9 h-9 ${isRecording ? 'bg-red-100' : 'bg-gray-100'} border rounded-xl flex items-center justify-center hover:bg-gray-200 cursor-pointer shrink-0`}
//               onClick={handleMicClick}
//               title="Click to speak"
//             >
//               <Mic className="w-5 h-5 text-gray-600" />
//             </div>
 
//             {/* Send Button */}
//             <button
//               onClick={handleSendMessage}
//               disabled={(!inputMessage.trim() && uploadedFiles.length === 0 && selectedDocumentsForQuery.length === 0) || isTyping} // Updated condition
//               className="btn-primary btn-small disabled:btn-secondary shrink-0"
//             >
//               {isTyping ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
//             </button>
//           </div>
//         </div>

//         {/* Modal for selecting existing documents */}
//         {showSelectDocumentModal && (
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[80vh] flex flex-col">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-gray-900">Select Documents from Storage</h2>
//                 <button onClick={() => setShowSelectDocumentModal(false)} className="text-gray-500 hover:text-gray-700">
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
//               <div className="flex-1 overflow-y-auto mb-4">
//                 {availableDocuments.length === 0 && !loadingAvailableDocs && !errorAvailableDocs && (
//                   <p className="text-gray-600 text-center">No documents available in your storage.</p>
//                 )}
//                 {loadingAvailableDocs && (
//                   <div className="text-center py-4">
//                     <Loader className="w-8 h-8 text-blue-500 mx-auto animate-spin" />
//                     <p className="text-gray-600">Loading stored documents...</p>
//                   </div>
//                 )}
//                 {errorAvailableDocs && (
//                   <p className="text-red-600 text-center">Error loading documents: {errorAvailableDocs}</p>
//                 )}
//                 {!loadingAvailableDocs && !errorAvailableDocs && availableDocuments.length > 0 && (
//                   <div className="space-y-3">
//                     {availableDocuments.map((doc, index) => (
//                       <div key={`modal-doc-${doc.id}-${index}`} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
//                         <div className="flex items-center space-x-3">
//                           <input
//                             type="checkbox"
//                             checked={selectedDocumentsForQuery.some(sDoc => sDoc.id === doc.id)}
//                             onChange={() => handleToggleSelectDocument(doc)}
//                             className="form-checkbox h-5 w-5 text-blue-600 rounded"
//                           />
//                           <FileText className="w-5 h-5 text-blue-600" />
//                           <div>
//                             <p className="font-medium text-gray-900">{doc.document_name}</p>
//                             <p className="text-sm text-gray-500">{new Date(doc.uploaded_at).toLocaleDateString()} - {doc.file_type}</p>
//                           </div>
//                         </div>
//                         {doc.processed && doc.output_bucket_path && (
//                           <a
//                             href={doc.output_bucket_path.replace('gs://', 'https://storage.googleapis.com/')}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:underline text-sm"
//                           >
//                             View Summary
//                           </a>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className="flex justify-end space-x-3">
//                 <button onClick={() => setShowSelectDocumentModal(false)} className="btn-secondary">
//                   Cancel
//                 </button>
//                 <button onClick={() => setShowSelectDocumentModal(false)} className="btn-primary">
//                   Done
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
 
//       <div className="h-full max-h-full overflow-y-auto">
//         <RightSidebar
//           recentTopics={recentTopics}
//           handleQuickPrompt={handleQuickPrompt}
//           chatList={chatList} // Pass chatList
//           currentChatId={currentChatId} // Pass currentChatId
//           onLoadChat={handleLoadChat} // Pass load chat handler
//           onNewChat={handleNewChat} // Pass new chat handler
//           onDeleteChat={handleDeleteChat} // Pass delete chat handler
//           loadingChatList={loadingChatList} // Pass loading state
//           errorChatList={errorChatList} // Pass error state
//         />
//       </div>
//     </div>
//   );
// };

// export default AIAssistantContent;
// import React, { useState, useRef, useEffect } from 'react';
// import { Bot, Send, User, Plus, Mic, Loader, FileText, X } from 'lucide-react';
// import RightSidebar from './RightSidebar';

// interface Message {
//   id: number;
//   type: 'ai' | 'user' | 'system';
//   content: string;
//   timestamp: string;
//   documentId?: string;
//   sender?: 'user' | 'assistant';
//   message?: string;
//   chat_id?: number;
//   created_at?: string;
// }

// interface Chat {
//   id: number;
//   user_id: number;
//   title: string;
//   created_at: string;
//   messages: Message[];
// }

// interface Document {
//   id: number;
//   document_name: string;
//   input_bucket_path: string;
//   output_bucket_path: string | null;
//   file_type: string;
//   uploaded_at: string;
//   processed: boolean;
// }

// const AIAssistantContent: React.FC = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
//   const [summarizationInstruction, setSummarizationInstruction] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [processingDocuments, setProcessingDocuments] = useState<{[key: number]: {filename: string, status: string, message: string}}>({});
//   const [availableDocuments, setAvailableDocuments] = useState<Document[]>([]);
//   const [selectedDocumentsForQuery, setSelectedDocumentsForQuery] = useState<Document[]>([]);
//   const [lastProcessedDocumentId, setLastProcessedDocumentId] = useState<number | null>(null);
//   const [showAddOptions, setShowAddOptions] = useState(false);
//   const [showSelectDocumentModal, setShowSelectDocumentModal] = useState(false);
//   const [loadingAvailableDocs, setLoadingAvailableDocs] = useState(true);
//   const [errorAvailableDocs, setErrorAvailableDocs] = useState<string | null>(null);
//   const [currentChatId, setCurrentChatId] = useState<number | null>(null);
//   const [chatList, setChatList] = useState<Chat[]>([]);
//   const [loadingChatList, setLoadingChatList] = useState(true);
//   const [errorChatList, setErrorChatList] = useState<string | null>(null);

//   const recognitionRef = useRef<any>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chatContainerRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Fetch chat list on component mount
//   useEffect(() => {
//     fetchChatList();
//   }, []);

//   // Helper function to normalize backend message format to frontend format
//   const normalizeMessage = (msg: any): Message => {
//     let formattedTimestamp = '';
//     const timestampSource = msg.created_at || msg.timestamp;
    
//     if (timestampSource) {
//       try {
//         let dateString = String(timestampSource);
//         const microsecondRegex = /(\.\d{3})\d+/;
//         dateString = dateString.replace(microsecondRegex, '$1');

//         const date = new Date(dateString);
//         if (!isNaN(date.getTime())) {
//           formattedTimestamp = date.toLocaleTimeString();
//         } else {
//           console.warn('Invalid timestamp:', timestampSource);
//           formattedTimestamp = 'Invalid Date';
//         }
//       } catch (error) {
//         console.warn('Error parsing timestamp:', timestampSource, error);
//         formattedTimestamp = 'Invalid Date';
//       }
//     } else {
//       formattedTimestamp = new Date().toLocaleTimeString();
//     }

//     const content = msg.message || msg.content || '';

//     let type: 'ai' | 'user' | 'system' = 'system';
//     if (msg.sender === 'user') {
//       type = 'user';
//     } else if (msg.sender === 'assistant') {
//       type = 'ai';
//     } else if (msg.type) {
//       type = msg.type;
//     }

//     return {
//       id: msg.id,
//       type,
//       content,
//       timestamp: formattedTimestamp,
//       documentId: msg.documentId,
//       sender: msg.sender,
//       message: msg.message,
//       chat_id: msg.chat_id,
//       created_at: msg.created_at
//     };
//   };

//   const fetchChatList = async () => {
//     setLoadingChatList(true);
//     setErrorChatList(null);
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setErrorChatList('Authentication token not found. Please sign in.');
//       setLoadingChatList(false);
//       return;
//     }
//     try {
//       const response = await fetch('https://api.digitizeindia.co.in/api/ai-ml/chats', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to fetch chat list');
//       }
//       const data: Chat[] = await response.json();
//       setChatList(data);
      
//       const storedChatId = localStorage.getItem('currentChatId');
      
//       if (storedChatId && data.some(chat => chat.id === parseInt(storedChatId))) {
//         handleLoadChat(parseInt(storedChatId));
//       } else if (!currentChatId && data.length > 0) {
//         handleLoadChat(data[0].id);
//       } else if (!currentChatId && data.length === 0) {
//         setMessages([]);
//       }
//     } catch (error: any) {
//       setErrorChatList(error.message);
//       console.error('Error fetching chat list:', error);
//     } finally {
//       setLoadingChatList(false);
//     }
//   };

//   const handleNewChat = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Authentication token not found. Please sign in.');
//       return;
//     }
//     try {
//       const response = await fetch('https://api.digitizeindia.co.in/api/ai-ml/chats', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ title: "New Chat" }),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to create new chat');
//       }
//       const newChat: Chat = await response.json();
//       setChatList(prev => [newChat, ...prev]);
//       setCurrentChatId(newChat.id);
      
//       localStorage.setItem('currentChatId', newChat.id.toString());
      
//       setMessages([]);
      
//     } catch (error: any) {
//       alert(`Error creating new chat: ${error.message}`);
//       console.error('Error creating new chat:', error);
//     }
//   };

//   const handleLoadChat = async (chatId: number) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Authentication token not found. Please sign in.');
//       return;
//     }
//     try {
//       const response = await fetch(`https://api.digitizeindia.co.in/api/ai-ml/chats/${chatId}/messages`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to load chat messages');
//       }
//       const loadedMessages: any[] = await response.json();
//       setCurrentChatId(chatId);
      
//       localStorage.setItem('currentChatId', chatId.toString());
      
//       const normalizedMessages = loadedMessages.map(normalizeMessage);
//       setMessages(normalizedMessages);
      
//       scrollToBottom();
//     } catch (error: any) {
//       alert(`Error loading chat: ${error.message}`);
//       console.error('Error loading chat messages:', error);
//     }
//   };

//   const handleDeleteChat = async (chatId: number) => {
//     if (!window.confirm('Are you sure you want to delete this chat? This action cannot be undone.')) {
//       return;
//     }
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Authentication token not found. Please sign in.');
//       return;
//     }
//     try {
//       const response = await fetch(`https://api.digitizeindia.co.in/api/ai-ml/chats/${chatId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to delete chat');
//       }
//       setChatList(prev => prev.filter(chat => chat.id !== chatId));
//       if (currentChatId === chatId) {
//         setCurrentChatId(null);
//         setMessages([]);
//         localStorage.removeItem('currentChatId');
        
//         const remainingChats = chatList.filter(chat => chat.id !== chatId);
//         if (remainingChats.length > 0) {
//           handleLoadChat(remainingChats[0].id);
//         }
//       }
//     } catch (error: any) {
//       alert(`Error deleting chat: ${error.message}`);
//       console.error('Error deleting chat:', error);
//     }
//   };

//   const fetchAvailableDocuments = async () => {
//     setLoadingAvailableDocs(true);
//     setErrorAvailableDocs(null);
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setErrorAvailableDocs('Authentication token not found. Please sign in.');
//       setLoadingAvailableDocs(false);
//       return;
//     }
//     try {
//       const response = await fetch('https://api.digitizeindia.co.in/api/ai-ml/user_documents', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Failed to fetch available documents');
//       }
//       const data: Document[] = await response.json();
//       setAvailableDocuments(data);
//     } catch (error: any) {
//       setErrorAvailableDocs(error.message);
//       console.error('Error fetching available documents:', error);
//     } finally {
//       setLoadingAvailableDocs(false);
//     }
//   };

//   useEffect(() => {
//     if (showSelectDocumentModal) {
//       fetchAvailableDocuments();
//     }
//   }, [showSelectDocumentModal]);

//   // Polling for document status
//   useEffect(() => {
//     const pollInterval = setInterval(async () => {
//       for (const docId in processingDocuments) {
//         const numericDocId = Number(docId);
//         if (processingDocuments[numericDocId].status === 'PROCESSING' || processingDocuments[numericDocId].status === 'RECEIVED') {
//           const token = localStorage.getItem('token');
//           if (!token) {
//             console.error('Authentication token not found for polling.');
//             continue;
//           }

//           try {
//             const response = await fetch(`https://api.digitizeindia.co.in/api/ai-ml/document_status/${numericDocId}`, {
//               headers: {
//                 'Authorization': `Bearer ${token}`,
//               },
//             });

//             if (!response.ok) {
//               const errorData = await response.json();
//               console.error(`Error fetching status for ${numericDocId}:`, errorData);
//               setProcessingDocuments(prev => ({
//                 ...prev,
//                 [numericDocId]: { ...prev[numericDocId], status: 'FAILED', message: errorData.detail || 'Unknown error' }
//               }));
//               const currentTimestamp = new Date().toLocaleTimeString();
//               setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Document "${processingDocuments[numericDocId].filename}" processing failed: ${errorData.detail || 'Unknown error'}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]);
//               continue;
//             }

//             const statusData = await response.json();
//             setProcessingDocuments(prev => ({
//               ...prev,
//               [numericDocId]: { ...prev[numericDocId], status: statusData.status, message: statusData.message }
//             }));

//             if (statusData.status === 'COMPLETED') {
//               const summaryRes = await fetch(`https://api.digitizeindia.co.in/api/ai-ml/get_summary/${numericDocId}`, {
//                 headers: {
//                   'Authorization': `Bearer ${token}`,
//                 },
//               });

//               const currentTimestamp = new Date().toLocaleTimeString();
//               if (!summaryRes.ok) {
//                 const errorData = await summaryRes.json();
//                 setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Failed to retrieve summary for "${processingDocuments[numericDocId].filename}": ${errorData.detail || 'Unknown error'}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]);
//               } else {
//                 const summaryData = await summaryRes.json();
//                 setMessages(prev => [...prev, { id: prev.length + 1, type: 'ai', content: `Summary for "${processingDocuments[numericDocId].filename}":\n\n${summaryData.summary || 'No summary available.'}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]);
//               }
//               setProcessingDocuments(prev => {
//                 const newDocs = { ...prev };
//                 delete newDocs[numericDocId];
//                 return newDocs;
//               });
//               setLastProcessedDocumentId(numericDocId);
//               fetchAvailableDocuments();
//             } else if (statusData.status === 'FAILED') {
//               const currentTimestamp = new Date().toLocaleTimeString();
//               setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Document "${processingDocuments[numericDocId].filename}" processing failed: ${statusData.error || statusData.message}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]);
//               setProcessingDocuments(prev => {
//                 const newDocs = { ...prev };
//                 delete newDocs[numericDocId];
//                 return newDocs;
//               });
//             }
//           } catch (error: any) {
//             console.error(`Polling error for document ${numericDocId}:`, error);
//             setProcessingDocuments(prev => ({
//               ...prev,
//               [numericDocId]: { ...prev[numericDocId], status: 'FAILED', message: `Polling failed: ${error.message}` }
//             }));
//             const currentTimestamp = new Date().toLocaleTimeString();
//             setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Document "${processingDocuments[numericDocId].filename}" processing encountered an error during polling: ${error.message}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]);
//             setProcessingDocuments(prev => {
//               const newDocs = { ...prev };
//               delete newDocs[numericDocId];
//               return newDocs;
//             });
//           }
//         }
//       }
//     }, 5000);

//     return () => clearInterval(pollInterval);
//   }, [processingDocuments, messages, lastProcessedDocumentId]);

//   const recentTopics = [
//     'Contract liability clauses',
//     'Employment law updates',
//     'Intellectual property rights',
//     'Corporate compliance requirements',
//     'Litigation strategy planning',
//     'Trademark registration basics',
//     'Consumer protection regulations',
//     'Shareholder agreement terms',
//     'Competition law overview',
//     'Data privacy compliance'
//   ];

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       setUploadedFiles(prev => [...prev, ...files]);
//       e.target.value = '';
//       setShowAddOptions(false);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim() && uploadedFiles.length === 0 && selectedDocumentsForQuery.length === 0 && lastProcessedDocumentId === null) return;

//     if (currentChatId === null) {
//       alert("No chat session active. Please start a new chat or select an existing one.");
//       return;
//     }

//     setIsTyping(true);

//     const token = localStorage.getItem('token');
//     if (!token) {
//       const currentTimestamp = new Date().toLocaleTimeString();
//       setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: 'Authentication token not found. Please sign in.', timestamp: currentTimestamp }]);
//       setIsTyping(false);
//       return;
//     }

//     // Process newly uploaded files first, if any
//     if (uploadedFiles.length > 0) {
//       for (const file of uploadedFiles) {
//         const tempMessageId = messages.length + 1;
//         const currentTimestamp = new Date().toLocaleTimeString();
//         setMessages(prev => [...prev, { id: tempMessageId, type: 'user', content: `Preparing to upload document: "${file.name}"`, timestamp: currentTimestamp }]);

//         const formData = new FormData();
//         formData.append('file', file);
//         if (summarizationInstruction.trim()) {
//           formData.append('summarization_instruction', summarizationInstruction.trim());
//         }

//         try {
//           const uploadRes = await fetch('https://api.digitizeindia.co.in/api/ai-ml/process_document', {
//             method: 'POST',
//             headers: {
//               'Authorization': `Bearer ${token}`,
//             },
//             body: formData,
//           });

//           if (!uploadRes.ok) {
//             const errorData = await uploadRes.json();
//             throw new Error(errorData.detail ? (typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail)) : 'File upload failed');
//           }
//           const uploadData = await uploadRes.json();
//           const documentId = uploadData.document_id;

//           setProcessingDocuments(prev => ({
//             ...prev,
//             [documentId]: { filename: file.name, status: 'RECEIVED', message: 'Document received, processing initiated.' }
//           }));

//           const currentTimestamp = new Date().toLocaleTimeString();
//           setMessages(prev => prev.map(msg =>
//             msg.id === tempMessageId
//               ? { ...msg, content: `Document "${file.name}" uploaded. Processing initiated.`, documentId: documentId, timestamp: currentTimestamp }
//               : msg
//           ));

//         } catch (error: any) {
//           setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Error uploading file "${file.name}": ${error.message}`, timestamp: new Date().toLocaleTimeString() }]);
//           console.error('File upload failed:', error);
//         }
//       }
//       setUploadedFiles([]);
//       setSummarizationInstruction('');
//     }

//     // Determine which documents to query
//     let documentsToQuery: Document[] = [];
//     if (selectedDocumentsForQuery.length > 0) {
//       documentsToQuery = selectedDocumentsForQuery;
//     } else if (lastProcessedDocumentId !== null) {
//       const lastDoc = availableDocuments.find(doc => doc.id === lastProcessedDocumentId);
//       if (lastDoc) {
//         documentsToQuery = [lastDoc];
//       }
//     }

//     if (inputMessage.trim() || documentsToQuery.length > 0) {
//       const userMessageContent = inputMessage.trim();
//       const userMessage: Message = {
//         id: messages.length + 1,
//         type: 'user',
//         content: userMessageContent || `Querying selected document(s): ${documentsToQuery.map(doc => doc.document_name).join(', ')}`,
//         timestamp: new Date().toLocaleTimeString()
//       };
 
//       setMessages(prev => [...prev, userMessage]);
//       setInputMessage('');
 
//       for (const doc of documentsToQuery) {
//         try {
//           const queryPayload: { document_id: number; query: string; chat_id: number } = {
//             document_id: doc.id,
//             query: userMessageContent || "Summarize this document.",
//             chat_id: currentChatId
//           };
 
//           console.log('Sending query payload:', queryPayload);
 
//           const response = await fetch('https://api.digitizeindia.co.in/api/ai-ml/answer_query', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify(queryPayload),
//           });
 
//           if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.detail ? (typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail)) : 'Failed to get AI response');
//           }
 
//           await response.json();
//           handleLoadChat(currentChatId);
 
//         } catch (error: any) {
//           const currentTimestamp = new Date().toLocaleTimeString();
//           setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Error getting AI response for "${doc.document_name}": ${error.message}`, timestamp: currentTimestamp }]);
//           console.error(`AI Assistant query failed for document ${doc.document_name}:`, error);
//         }
//       }
//     }
 
//     setIsTyping(false);
//   };

//   const handleQuickPrompt = (prompt: string) => {
//     setInputMessage(prompt);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const handleRemoveFile = (indexToRemove: number) => {
//     setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
//   };

//   const handleRemoveSelectedDocument = (documentIdToRemove: number) => {
//     setSelectedDocumentsForQuery(prev => prev.filter(doc => doc.id !== documentIdToRemove));
//   };

//   const handleToggleSelectDocument = (document: Document) => {
//     setSelectedDocumentsForQuery(prev =>
//       prev.some(doc => doc.id === document.id)
//         ? prev.filter(doc => doc.id !== document.id)
//         : [...prev, document]
//     );
//   };

//   const handleMicClick = () => {
//     if (!('webkitSpeechRecognition' in window)) {
//       alert('Speech recognition not supported in this browser.');
//       return;
//     }

//     const recognition = new (window as any).webkitSpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = 'en-IN';

//     recognition.onstart = () => {
//       setIsRecording(true);
//       setInputMessage('Listening...');
//     };

//     recognition.onresult = (event: any) => {
//       const transcript = event.results[0][0].transcript;
//       setInputMessage(transcript);
//     };

//     recognition.onerror = () => {
//       setIsRecording(false);
//     };

//     recognition.onend = () => {
//       setIsRecording(false);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   };

//   // Function to format message content with rich text formatting
//   const formatMessageContent = (content: string) => {
//     // Split content by lines
//     const lines = content.split('\n');
//     const formattedLines: JSX.Element[] = [];
    
//     lines.forEach((line, lineIndex) => {
//       // Handle headers (##, ###)
//       if (line.startsWith('### ')) {
//         formattedLines.push(
//           <h3 key={lineIndex} className="text-lg font-bold text-gray-900 mt-4 mb-2 first:mt-0">
//             {line.replace('### ', '')}
//           </h3>
//         );
//       } else if (line.startsWith('## ')) {
//         formattedLines.push(
//           <h2 key={lineIndex} className="text-xl font-bold text-gray-900 mt-6 mb-3 first:mt-0">
//             {line.replace('## ', '')}
//           </h2>
//         );
//       } else if (line.startsWith('# ')) {
//         formattedLines.push(
//           <h1 key={lineIndex} className="text-2xl font-bold text-gray-900 mt-6 mb-4 first:mt-0">
//             {line.replace('# ', '')}
//           </h1>
//         );
//       }
//       // Handle bullet points
//       else if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
//         const bulletContent = line.replace(/^[\s-•]+/, '');
//         formattedLines.push(
//           <div key={lineIndex} className="flex items-start space-x-2 my-1">
//             <span className="text-blue-600 font-bold mt-1">•</span>
//             <span className="flex-1">{formatInlineText(bulletContent)}</span>
//           </div>
//         );
//       }
//       // Handle numbered lists
//       else if (/^\d+\.\s/.test(line.trim())) {
//         const match = line.match(/^(\s*)(\d+)\.\s(.+)/);
//         if (match) {
//           const [, indent, number, listContent] = match;
//           formattedLines.push(
//             <div key={lineIndex} className="flex items-start space-x-2 my-1">
//               <span className="text-blue-600 font-semibold mt-1">{number}.</span>
//               <span className="flex-1">{formatInlineText(listContent)}</span>
//             </div>
//           );
//         }
//       }
//       // Handle empty lines
//       else if (line.trim() === '') {
//         formattedLines.push(<div key={lineIndex} className="h-3"></div>);
//       }
//       // Handle regular paragraphs
//       else if (line.trim()) {
//         formattedLines.push(
//           <p key={lineIndex} className="leading-relaxed my-2 first:mt-0 last:mb-0">
//             {formatInlineText(line)}
//           </p>
//         );
//       }
//     });
    
//     return <div className="space-y-1">{formattedLines}</div>;
//   };

//   // Function to handle inline formatting (bold, italics, etc.)
//   const formatInlineText = (text: string) => {
//     const parts = [];
//     let currentIndex = 0;
    
//     // Handle **bold** text
//     const boldRegex = /\*\*(.*?)\*\*/g;
//     let match;
    
//     while ((match = boldRegex.exec(text)) !== null) {
//       // Add text before bold
//       if (match.index > currentIndex) {
//         parts.push(text.slice(currentIndex, match.index));
//       }
//       // Add bold text
//       parts.push(<strong key={match.index} className="font-bold text-gray-900">{match[1]}</strong>);
//       currentIndex = match.index + match[0].length;
//     }
    
//     // Add remaining text
//     if (currentIndex < text.length) {
//       parts.push(text.slice(currentIndex));
//     }
    
//     return parts.length > 0 ? parts : text;
//   };

//   return (
//     <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
//       {/* Main Chat Area - Fixed Layout */}
//       <div className="flex-1 flex flex-col h-full">
//         {/* Fixed Header */}
//         <div className="bg-white border-b border-gray-200 px-6 py-4 shrink-0 shadow-sm">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
//                 <Bot className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">AI Legal Assistant</h1>
//                 <p className="text-sm text-gray-600">Get instant help with legal research, document analysis, and case insights</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//               <span className="text-sm text-green-600 font-medium">Online</span>
//             </div>
//           </div>
//         </div>

//         {/* Scrollable Messages Area */}
//         <div 
//           ref={chatContainerRef}
//           className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scroll-smooth"
//           style={{ 
//             height: 'calc(100vh - 200px)', // Fixed height accounting for header and input
//             scrollBehavior: 'smooth'
//           }}
//         >
//           {messages.length === 0 && (
//             <div className="flex items-center justify-center h-full">
//               <div className="text-center max-w-md">
//                 <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
//                   <Bot className="w-8 h-8 text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to AI Legal Assistant</h3>
//                 <p className="text-gray-600 mb-6">Start a conversation by asking a legal question or uploading a document for analysis.</p>
//               </div>
//             </div>
//           )}

//           {messages.map((message, index) => (
//             <div key={`message-${message.id}-${index}`} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//               <div className={`flex items-start space-x-3 max-w-4xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
//                   message.type === 'user' ? 'bg-blue-600' :
//                   message.type === 'ai' ? 'bg-gradient-to-br from-indigo-500 to-purple-600' :
//                   'bg-red-500'
//                 }`}>
//                   {message.type === 'user' ? (
//                     <User className="w-4 h-4 text-white" />
//                   ) : (
//                     <Bot className="w-4 h-4 text-white" />
//                   )}
//                 </div>
//                 <div className={`rounded-2xl px-4 py-3 shadow-sm ${
//                   message.type === 'user' ? 'bg-blue-600 text-white' :
//                   message.type === 'ai' ? 'bg-white border border-gray-200 text-gray-900' :
//                   'bg-red-50 border border-red-200 text-red-800'
//                 }`}>
//                   <div className="leading-relaxed">
//                     {message.type === 'ai' ? formatMessageContent(message.content) : message.content}
//                   </div>
//                   {message.timestamp && (
//                     <div className={`text-xs mt-2 ${
//                       message.type === 'user' ? 'text-blue-100' :
//                       message.type === 'ai' ? 'text-gray-500' :
//                       'text-red-600'
//                     }`}>{message.timestamp}</div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}

//           {Object.entries(processingDocuments).map(([docId, doc], index) => (
//             <div key={`processing-${docId}-${index}`} className="flex justify-start">
//               <div className="flex items-start space-x-3 max-w-4xl">
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
//                   <Bot className="w-4 h-4 text-white" />
//                 </div>
//                 <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
//                   <div className="whitespace-pre-wrap leading-relaxed">
//                     Document "{doc.filename}" is currently: **{doc.status}** - {doc.message}
//                     {doc.status === 'PROCESSING' && (
//                       <span className="ml-2 inline-block animate-spin">
//                         <Loader className="w-4 h-4 text-gray-500" />
//                       </span>
//                     )}
//                   </div>
//                   <div className="text-xs mt-2 text-gray-500">{new Date().toLocaleTimeString()}</div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {isTyping && (
//             <div className="flex justify-start">
//               <div className="flex items-start space-x-3 max-w-4xl">
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
//                   <Bot className="w-4 h-4 text-white" />
//                 </div>
//                 <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
//                   <div className="flex space-x-1">
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

//         {/* Fixed Input Area */}
//         <div className="bg-white border-t border-gray-200 px-6 py-4 shrink-0 shadow-lg">
//           <div className="max-w-4xl mx-auto">
//             {/* File Upload Preview */}
//             {(uploadedFiles.length > 0 || selectedDocumentsForQuery.length > 0) && (
//               <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
//                 <div className="font-medium text-blue-900 mb-2 text-sm">Files to process:</div>
//                 <div className="space-y-2">
//                   {uploadedFiles.map((file, index) => (
//                     <div key={`upload-${index}-${file.name}`} className="flex items-center justify-between text-sm">
//                       <span className="flex items-center text-blue-800">
//                         <FileText className="w-4 h-4 mr-2" />
//                         {file.name} <span className="ml-1 text-blue-600">(New Upload)</span>
//                       </span>
//                       <button onClick={() => handleRemoveFile(index)} className="ml-2 text-blue-600 hover:text-blue-800 transition-colors">
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                   {selectedDocumentsForQuery.map((doc, index) => (
//                     <div key={`selected-doc-${doc.id}-${index}`} className="flex items-center justify-between text-sm">
//                       <span className="flex items-center text-blue-800">
//                         <FileText className="w-4 h-4 mr-2" />
//                         {doc.document_name} <span className="ml-1 text-blue-600">(Stored)</span>
//                       </span>
//                       <button onClick={() => handleRemoveSelectedDocument(doc.id)} className="ml-2 text-blue-600 hover:text-blue-800 transition-colors">
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <textarea
//                   value={summarizationInstruction}
//                   onChange={(e) => setSummarizationInstruction(e.target.value)}
//                   placeholder="Add custom summarization instructions (e.g., 'focus on timeline', 'bullet points only')..."
//                   className="w-full mt-3 px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800 text-sm"
//                   rows={2}
//                 />
//               </div>
//             )}

//             {/* Input Row */}
//             <div className="flex items-end space-x-3">
//               {/* Plus Button with Dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={() => setShowAddOptions(!showAddOptions)}
//                   className="w-10 h-10 bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0 shadow-sm"
//                   title="Add file or select from storage"
//                 >
//                   <Plus className="w-5 h-5 text-gray-600" />
//                 </button>
//                 {showAddOptions && (
//                   <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
//                     <label className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
//                       <input type="file" multiple className="hidden" onChange={handleFileUpload} />
//                       📁 Upload from device
//                     </label>
//                     <button
//                       onClick={() => {
//                         setShowAddOptions(false);
//                         setShowSelectDocumentModal(true);
//                       }}
//                       className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                     >
//                       📋 Select from stored documents
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Input Area */}
//               <div className="flex-1">
//                 <textarea
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Ask me anything about legal matters..."
//                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none shadow-sm text-gray-900"
//                   rows={1}
//                   style={{ minHeight: '48px', maxHeight: '120px' }}
//                 />
//               </div>

//               {/* Microphone Button */}
//               <button
//                 onClick={handleMicClick}
//                 className={`w-10 h-10 ${isRecording ? 'bg-red-100 border-red-300' : 'bg-gray-100 border-gray-300'} border rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0 shadow-sm`}
//                 title="Click to speak"
//               >
//                 <Mic className={`w-5 h-5 ${isRecording ? 'text-red-600' : 'text-gray-600'}`} />
//               </button>

//               {/* Send Button */}
//               <button
//                 onClick={handleSendMessage}
//                 disabled={(!inputMessage.trim() && uploadedFiles.length === 0 && selectedDocumentsForQuery.length === 0) || isTyping}
//                 className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors shrink-0 shadow-sm"
//               >
//                 {isTyping ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Modal for selecting existing documents */}
//         {showSelectDocumentModal && (
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[80vh] flex flex-col mx-4">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold text-gray-900">Select Documents from Storage</h2>
//                 <button onClick={() => setShowSelectDocumentModal(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
//               <div className="flex-1 overflow-y-auto mb-6">
//                 {availableDocuments.length === 0 && !loadingAvailableDocs && !errorAvailableDocs && (
//                   <p className="text-gray-600 text-center py-8">No documents available in your storage.</p>
//                 )}
//                 {loadingAvailableDocs && (
//                   <div className="text-center py-8">
//                     <Loader className="w-8 h-8 text-blue-500 mx-auto animate-spin mb-4" />
//                     <p className="text-gray-600">Loading stored documents...</p>
//                   </div>
//                 )}
//                 {errorAvailableDocs && (
//                   <p className="text-red-600 text-center py-8">Error loading documents: {errorAvailableDocs}</p>
//                 )}
//                 {!loadingAvailableDocs && !errorAvailableDocs && availableDocuments.length > 0 && (
//                   <div className="space-y-3">
//                     {availableDocuments.map((doc, index) => (
//                       <div key={`modal-doc-${doc.id}-${index}`} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
//                         <div className="flex items-center space-x-3">
//                           <input
//                             type="checkbox"
//                             checked={selectedDocumentsForQuery.some(sDoc => sDoc.id === doc.id)}
//                             onChange={() => handleToggleSelectDocument(doc)}
//                             className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
//                           />
//                           <FileText className="w-5 h-5 text-blue-600 shrink-0" />
//                           <div>
//                             <p className="font-medium text-gray-900">{doc.document_name}</p>
//                             <p className="text-sm text-gray-500">{new Date(doc.uploaded_at).toLocaleDateString()} • {doc.file_type}</p>
//                           </div>
//                         </div>
//                         {doc.processed && doc.output_bucket_path && (
//                           <a
//                             href={doc.output_bucket_path.replace('gs://', 'https://storage.googleapis.com/')}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
//                           >
//                             View Summary
//                           </a>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className="flex justify-end space-x-3">
//                 <button 
//                   onClick={() => setShowSelectDocumentModal(false)} 
//                   className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   onClick={() => setShowSelectDocumentModal(false)} 
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Done
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Right Sidebar */}
//       <div className="h-full max-h-full overflow-y-auto border-l border-gray-200 bg-white">
//         <RightSidebar
//           recentTopics={recentTopics}
//           handleQuickPrompt={handleQuickPrompt}
//           chatList={chatList}
//           currentChatId={currentChatId}
//           onLoadChat={handleLoadChat}
//           onNewChat={handleNewChat}
//           onDeleteChat={handleDeleteChat}
//           loadingChatList={loadingChatList}
//           errorChatList={errorChatList}
//         />
//       </div>
//     </div>
//   );
// };

// export default AIAssistantContent;

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Plus, Mic, Loader, FileText, X, Copy, Check } from 'lucide-react';
import RightSidebar from './RightSidebar';

interface Message {
  id: number;
  type: 'ai' | 'user' | 'system';
  content: string;
  timestamp: string;
  documentId?: string;
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

interface Document {
  id: number;
  document_name: string;
  input_bucket_path: string;
  output_bucket_path: string | null;
  file_type: string;
  uploaded_at: string;
  processed: boolean;
}

const AIAssistantContent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [summarizationInstruction, setSummarizationInstruction] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [processingDocuments, setProcessingDocuments] = useState<{[key: number]: {filename: string, status: string, message: string}}>({});
  const [availableDocuments, setAvailableDocuments] = useState<Document[]>([]);
  const [selectedDocumentsForQuery, setSelectedDocumentsForQuery] = useState<Document[]>([]);
  const [lastProcessedDocumentId, setLastProcessedDocumentId] = useState<number | null>(null);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showSelectDocumentModal, setShowSelectDocumentModal] = useState(false);
  const [loadingAvailableDocs, setLoadingAvailableDocs] = useState(true);
  const [errorAvailableDocs, setErrorAvailableDocs] = useState<string | null>(null);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [loadingChatList, setLoadingChatList] = useState(true);
  const [errorChatList, setErrorChatList] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
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
    let formattedTimestamp = '';
    const timestampSource = msg.created_at || msg.timestamp;
    
    if (timestampSource) {
      try {
        let dateString = String(timestampSource);
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
      formattedTimestamp = new Date().toLocaleTimeString();
    }

    const content = msg.message || msg.content || '';

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
      const response = await fetch('https://api.digitizeindia.co.in/api/ai-ml/chats', {
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
      
      const storedChatId = localStorage.getItem('currentChatId');
      
      if (storedChatId && data.some(chat => chat.id === parseInt(storedChatId))) {
        handleLoadChat(parseInt(storedChatId));
      } else if (!currentChatId && data.length > 0) {
        handleLoadChat(data[0].id);
      } else if (!currentChatId && data.length === 0) {
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
      const response = await fetch('https://api.digitizeindia.co.in/api/ai-ml/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title: "New Chat" }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create new chat');
      }
      const newChat: Chat = await response.json();
      setChatList(prev => [newChat, ...prev]);
      setCurrentChatId(newChat.id);
      
      localStorage.setItem('currentChatId', newChat.id.toString());
      
      setMessages([]);
      
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
      const response = await fetch(`https://api.digitizeindia.co.in/api/ai-ml/chats/${chatId}/messages`, {
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
      
      localStorage.setItem('currentChatId', chatId.toString());
      
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
      const response = await fetch(`https://api.digitizeindia.co.in/api/ai-ml/chats/${chatId}`, {
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
        localStorage.removeItem('currentChatId');
        
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
      const response = await fetch('https://api.digitizeindia.co.in/api/ai-ml/user_documents', {
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
    if (showSelectDocumentModal) {
      fetchAvailableDocuments();
    }
  }, [showSelectDocumentModal]);

  // Polling for document status
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      for (const docId in processingDocuments) {
        const numericDocId = Number(docId);
        if (processingDocuments[numericDocId].status === 'PROCESSING' || processingDocuments[numericDocId].status === 'RECEIVED') {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('Authentication token not found for polling.');
            continue;
          }

          try {
            const response = await fetch(`https://api.digitizeindia.co.in/api/ai-ml/document_status/${numericDocId}`, {
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
              setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Document "${processingDocuments[numericDocId].filename}" processing failed: ${errorData.detail || 'Unknown error'}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]);
              continue;
            }

            const statusData = await response.json();
            setProcessingDocuments(prev => ({
              ...prev,
              [numericDocId]: { ...prev[numericDocId], status: statusData.status, message: statusData.message }
            }));

            if (statusData.status === 'COMPLETED') {
              const summaryRes = await fetch(`https://api.digitizeindia.co.in/api/ai-ml/get_summary/${numericDocId}`, {
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
              setProcessingDocuments(prev => {
                const newDocs = { ...prev };
                delete newDocs[numericDocId];
                return newDocs;
              });
              setLastProcessedDocumentId(numericDocId);
              fetchAvailableDocuments();
            } else if (statusData.status === 'FAILED') {
              const currentTimestamp = new Date().toLocaleTimeString();
              setMessages(prev => [...prev, { id: prev.length + 1, type: 'system', content: `Document "${processingDocuments[numericDocId].filename}" processing failed: ${statusData.error || statusData.message}`, timestamp: currentTimestamp, documentId: String(numericDocId) }]);
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
            setProcessingDocuments(prev => {
              const newDocs = { ...prev };
              delete newDocs[numericDocId];
              return newDocs;
            });
          }
        }
      }
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [processingDocuments, messages, lastProcessedDocumentId]);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
      e.target.value = '';
      setShowAddOptions(false);
    }
  };

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
          const uploadRes = await fetch('https://api.digitizeindia.co.in/api/ai-ml/process_document', {
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

    // Determine which documents to query
    let documentsToQuery: Document[] = [];
    if (selectedDocumentsForQuery.length > 0) {
      documentsToQuery = selectedDocumentsForQuery;
    } else if (lastProcessedDocumentId !== null) {
      const lastDoc = availableDocuments.find(doc => doc.id === lastProcessedDocumentId);
      if (lastDoc) {
        documentsToQuery = [lastDoc];
      }
    }

    if (inputMessage.trim() || documentsToQuery.length > 0) {
      const userMessageContent = inputMessage.trim();
      const userMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        content: userMessageContent || `Querying selected document(s): ${documentsToQuery.map(doc => doc.document_name).join(', ')}`,
        timestamp: new Date().toLocaleTimeString()
      };
 
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
 
      for (const doc of documentsToQuery) {
        try {
          const queryPayload: { document_id: number; query: string; chat_id: number } = {
            document_id: doc.id,
            query: userMessageContent || "Summarize this document.",
            chat_id: currentChatId
          };
 
          console.log('Sending query payload:', queryPayload);
 
          const response = await fetch('https://api.digitizeindia.co.in/api/ai-ml/answer_query', {
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
 
          await response.json();
          handleLoadChat(currentChatId);
 
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

  // Enhanced function to format message content with rich text formatting
  const formatMessageContent = (content: string) => {
    const lines = content.split('\n');
    const formattedLines: JSX.Element[] = [];
    
    lines.forEach((line, lineIndex) => {
      // Handle code blocks
      if (line.startsWith('```')) {
        formattedLines.push(
          <div key={lineIndex} className="bg-gray-900 text-gray-100 p-4 rounded-lg my-4 font-mono text-sm overflow-x-auto">
            <code>{line.replace(/```\w*/, '')}</code>
          </div>
        );
      }
      // Handle inline code
      else if (line.includes('`') && !line.startsWith('```')) {
        const parts = line.split(/(`[^`]+`)/g);
        formattedLines.push(
          <p key={lineIndex} className="leading-relaxed my-2 first:mt-0 last:mb-0">
            {parts.map((part, idx) => 
              part.startsWith('`') && part.endsWith('`') ? 
                <code key={idx} className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">{part.slice(1, -1)}</code> : 
                formatInlineText(part)
            )}
          </p>
        );
      }
      // Handle headers
      else if (line.startsWith('### ')) {
        formattedLines.push(
          <h3 key={lineIndex} className="text-lg font-bold text-gray-900 mt-6 mb-3 first:mt-0 border-b border-gray-200 pb-2">
            {formatInlineText(line.replace('### ', ''))}
          </h3>
        );
      } else if (line.startsWith('## ')) {
        formattedLines.push(
          <h2 key={lineIndex} className="text-xl font-bold text-gray-900 mt-8 mb-4 first:mt-0 border-b-2 border-blue-200 pb-2">
            {formatInlineText(line.replace('## ', ''))}
          </h2>
        );
      } else if (line.startsWith('# ')) {
        formattedLines.push(
          <h1 key={lineIndex} className="text-2xl font-bold text-gray-900 mt-8 mb-6 first:mt-0 border-b-2 border-blue-300 pb-3">
            {formatInlineText(line.replace('# ', ''))}
          </h1>
        );
      }
      // Handle bullet points with proper indentation
      else if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        const indent = line.length - line.trimStart().length;
        const bulletContent = line.replace(/^[\s-•]+/, '');
        formattedLines.push(
          <div key={lineIndex} className={`flex items-start my-1 ${indent > 0 ? `ml-${Math.min(indent, 8)}` : ''}`}>
            <span className="text-blue-600 font-bold mt-1 mr-2 shrink-0">•</span>
            <span className="flex-1">{formatInlineText(bulletContent)}</span>
          </div>
        );
      }
      // Handle numbered lists
      else if (/^\s*\d+\.\s/.test(line)) {
        const match = line.match(/^(\s*)(\d+)\.\s(.+)/);
        if (match) {
          const [, indent, number, listContent] = match;
          formattedLines.push(
            <div key={lineIndex} className={`flex items-start my-1 ${indent ? `ml-${Math.min(indent.length, 8)}` : ''}`}>
              <span className="text-blue-600 font-semibold mt-1 mr-2 shrink-0">{number}.</span>
              <span className="flex-1">{formatInlineText(listContent)}</span>
            </div>
          );
        }
      }
      // Handle tables (basic support)
      else if (line.includes('|') && line.split('|').length > 2) {
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
        formattedLines.push(
          <div key={lineIndex} className="overflow-x-auto my-4">
            <table className="min-w-full border border-gray-300">
              <tbody>
                <tr>
                  {cells.map((cell, idx) => (
                    <td key={idx} className="border border-gray-300 px-4 py-2 text-sm">
                      {formatInlineText(cell)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
      // Handle blockquotes
      else if (line.startsWith('> ')) {
        formattedLines.push(
          <blockquote key={lineIndex} className="border-l-4 border-blue-400 pl-4 py-2 my-4 bg-blue-50 italic text-gray-700">
            {formatInlineText(line.replace('> ', ''))}
          </blockquote>
        );
      }
      // Handle horizontal rules
      else if (line.trim() === '---' || line.trim() === '***') {
        formattedLines.push(
          <hr key={lineIndex} className="my-6 border-gray-300" />
        );
      }
      // Handle empty lines for spacing
      else if (line.trim() === '') {
        formattedLines.push(<div key={lineIndex} className="h-4"></div>);
      }
      // Handle regular paragraphs
      else if (line.trim()) {
        formattedLines.push(
          <p key={lineIndex} className="leading-relaxed my-3 first:mt-0 last:mb-0 text-gray-800">
            {formatInlineText(line)}
          </p>
        );
      }
    });
    
    return <div className="space-y-1">{formattedLines}</div>;
  };

  // Enhanced function to handle inline formatting
  const formatInlineText = (text: string) => {
    const parts = [];
    let currentIndex = 0;
    
    // Combined regex for **bold**, *italic*, and __underline__
    const formatRegex = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(__([^_]+)__)/g;
    let match;
    
    while ((match = formatRegex.exec(text)) !== null) {
      // Add text before formatting
      if (match.index > currentIndex) {
        parts.push(text.slice(currentIndex, match.index));
      }
      
      // Add formatted text
      if (match[2]) { // **bold**
        parts.push(<strong key={match.index} className="font-bold text-gray-900">{match[2]}</strong>);
      } else if (match[4]) { // *italic*
        parts.push(<em key={match.index} className="italic text-gray-700">{match[4]}</em>);
      } else if (match[6]) { // __underline__
        parts.push(<u key={match.index} className="underline text-gray-800">{match[6]}</u>);
      }
      
      currentIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.slice(currentIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };

  // Copy message function
  const handleCopyMessage = async (content: string, messageId: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Main Chat Area - Full ChatGPT Layout */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Scrollable Messages Area - No Fixed Header */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto scroll-smooth"
          style={{ 
            paddingTop: '2rem',
            paddingBottom: '1rem',
            scrollBehavior: 'smooth'
          }}
        >
          <div className="max-w-3xl mx-auto px-4">
            {messages.length === 0 && (
              <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">AI Legal Assistant</h3>
                  <p className="text-gray-600 text-lg mb-8">How can I help you with legal research, document analysis, or case insights today?</p>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={`message-${message.id}-${index}`} className="group mb-8">
                <div className={`flex items-start space-x-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type !== 'user' && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.type === 'ai' ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-red-500'
                    }`}>
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div className={`flex-1 ${message.type === 'user' ? 'max-w-2xl ml-auto' : 'max-w-none'}`}>
                    {message.type === 'user' && (
                      <div className="flex items-center justify-end mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                    
                    <div className={`${
                      message.type === 'user' 
                        ? 'bg-gray-100 p-4 rounded-2xl text-gray-900' 
                        : 'bg-transparent text-gray-900'
                    }`}>
                      <div className="prose prose-gray max-w-none">
                        {message.type === 'ai' ? formatMessageContent(message.content) : message.content}
                      </div>
                      
                      {message.type === 'ai' && (
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                          <div className="text-xs text-gray-500">
                            {message.timestamp}
                          </div>
                          <button
                            onClick={() => handleCopyMessage(message.content, message.id)}
                            className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            {copiedMessageId === message.id ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                      
                      {message.type === 'user' && message.timestamp && (
                        <div className="text-xs text-gray-500 mt-2 text-right">
                          {message.timestamp}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {Object.entries(processingDocuments).map(([docId, doc], index) => (
              <div key={`processing-${docId}-${index}`} className="group mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        {doc.status === 'PROCESSING' && (
                          <Loader className="w-4 h-4 text-orange-600 animate-spin shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-orange-900">
                            Processing: {doc.filename}
                          </p>
                          <p className="text-sm text-orange-700 mt-1">
                            Status: {doc.status} - {doc.message}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-orange-600 mt-2">
                        {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="group mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 p-4 rounded-2xl inline-block">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Fixed Input Area at Bottom */}
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto px-4 py-4">
            {/* File Upload Preview */}
            {(uploadedFiles.length > 0 || selectedDocumentsForQuery.length > 0) && (
              <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="font-medium text-blue-900 mb-3 text-sm">Files to process:</div>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={`upload-${index}-${file.name}`} className="flex items-center justify-between text-sm bg-white p-2 rounded-lg">
                      <span className="flex items-center text-blue-800">
                        <FileText className="w-4 h-4 mr-2 text-blue-600" />
                        {file.name} 
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">New Upload</span>
                      </span>
                      <button 
                        onClick={() => handleRemoveFile(index)} 
                        className="ml-2 text-blue-600 hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {selectedDocumentsForQuery.map((doc, index) => (
                    <div key={`selected-doc-${doc.id}-${index}`} className="flex items-center justify-between text-sm bg-white p-2 rounded-lg">
                      <span className="flex items-center text-blue-800">
                        <FileText className="w-4 h-4 mr-2 text-blue-600" />
                        {doc.document_name} 
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Stored</span>
                      </span>
                      <button 
                        onClick={() => handleRemoveSelectedDocument(doc.id)} 
                        className="ml-2 text-blue-600 hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <textarea
                  value={summarizationInstruction}
                  onChange={(e) => setSummarizationInstruction(e.target.value)}
                  placeholder="Add custom instructions (e.g., 'focus on key dates', 'summarize in bullet points')..."
                  className="w-full mt-3 px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800 text-sm"
                  rows={2}
                />
              </div>
            )}

            {/* Main Input Area */}
            <div className="relative flex items-end space-x-3 border border-gray-300 rounded-2xl bg-white p-2 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              {/* Plus Button */}
              <div className="relative">
                <button
                  onClick={() => setShowAddOptions(!showAddOptions)}
                  className="w-8 h-8 bg-transparent hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors"
                  title="Attach files"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
                {showAddOptions && (
                  <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    <label className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors rounded-t-xl">
                      <input type="file" multiple className="hidden" onChange={handleFileUpload} />
                      <div className="flex items-center space-x-2">
                        <span>📎</span>
                        <span>Upload from device</span>
                      </div>
                    </label>
                    <button
                      onClick={() => {
                        setShowAddOptions(false);
                        setShowSelectDocumentModal(true);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-b-xl"
                    >
                      <div className="flex items-center space-x-2">
                        <span>📁</span>
                        <span>Select from library</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Text Input */}
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Message AI Legal Assistant..."
                  className="w-full bg-transparent border-none outline-none resize-none text-gray-900 placeholder-gray-500 py-2 px-1 text-base"
                  rows={1}
                  style={{ 
                    minHeight: '24px', 
                    maxHeight: '120px',
                    lineHeight: '1.5'
                  }}
                />
              </div>

              {/* Voice Button */}
              <button
                onClick={handleMicClick}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  isRecording 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-transparent hover:bg-gray-100 text-gray-600'
                }`}
                title="Voice input"
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={(!inputMessage.trim() && uploadedFiles.length === 0 && selectedDocumentsForQuery.length === 0) || isTyping}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  (!inputMessage.trim() && uploadedFiles.length === 0 && selectedDocumentsForQuery.length === 0) || isTyping
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-800 text-white'
                }`}
              >
                {isTyping ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Footer Text */}
            <div className="text-xs text-gray-500 text-center mt-3">
              AI can make mistakes. Consider checking important information.
            </div>
          </div>
        </div>

        {/* Document Selection Modal */}
        {showSelectDocumentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Select Documents</h2>
                <button 
                  onClick={() => setShowSelectDocumentModal(false)} 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {loadingAvailableDocs ? (
                  <div className="text-center py-12">
                    <Loader className="w-8 h-8 text-blue-500 mx-auto animate-spin mb-4" />
                    <p className="text-gray-600">Loading your documents...</p>
                  </div>
                ) : errorAvailableDocs ? (
                  <div className="text-center py-12">
                    <p className="text-red-600">Error: {errorAvailableDocs}</p>
                  </div>
                ) : availableDocuments.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No documents found in your library.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {availableDocuments.map((doc) => (
                      <label key={doc.id} className="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedDocumentsForQuery.some(sDoc => sDoc.id === doc.id)}
                          onChange={() => handleToggleSelectDocument(doc)}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 mr-4"
                        />
                        <FileText className="w-5 h-5 text-blue-600 mr-3 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{doc.document_name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(doc.uploaded_at).toLocaleDateString()} • {doc.file_type}
                          </p>
                        </div>
                        {doc.processed && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs ml-2">
                            Processed
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowSelectDocumentModal(false)} 
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowSelectDocumentModal(false)} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Done ({selectedDocumentsForQuery.length} selected)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-80 h-full border-l border-gray-200 bg-white shrink-0">
        <RightSidebar
          recentTopics={recentTopics}
          handleQuickPrompt={handleQuickPrompt}
          chatList={chatList}
          currentChatId={currentChatId}
          onLoadChat={handleLoadChat}
          onNewChat={handleNewChat}
          onDeleteChat={handleDeleteChat}
          loadingChatList={loadingChatList}
          errorChatList={errorChatList}
        />
      </div>
    </div>
  );
};

export default AIAssistantContent;