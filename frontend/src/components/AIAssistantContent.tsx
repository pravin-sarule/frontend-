

// import React, { useState, useRef, useEffect } from 'react';
// import { Bot, Send, User, Plus, Mic, Loader, FileText, X, Copy, Check } from 'lucide-react';
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
//   const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);

//   const recognitionRef = useRef<any>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chatContainerRef = useRef<HTMLDivElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Auto-resize textarea
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
//     }
//   }, [inputMessage]);

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputMessage]);

  useEffect(() => {
    fetchChatList();
  }, []);

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
          formattedTimestamp = 'Invalid Date';
        }
      } catch (error) {
        formattedTimestamp = 'Invalid Date';
      }
    } else {
      formattedTimestamp = new Date().toLocaleTimeString();
    }
    const content = msg.message || msg.content || '';
    let type: 'ai' | 'user' | 'system' = 'system';
    if (msg.sender === 'user') type = 'user';
    else if (msg.sender === 'assistant') type = 'ai';
    else if (msg.type) type = msg.type;
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
      if (data.length === 0) {
        await handleNewChat();
      } else if (storedChatId && data.some(chat => chat.id === parseInt(storedChatId))) {
        handleLoadChat(parseInt(storedChatId));
      } else {
        handleLoadChat(data[0].id);
      }
    } catch (error: any) {
      setErrorChatList(error.message);
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
    }
  };

  const handleDeleteChat = async (chatId: number) => {
    if (!window.confirm('Are you sure you want to delete this chat?')) return;
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
        } else {
          await handleNewChat();
        }
      }
    } catch (error: any) {
      alert(`Error deleting chat: ${error.message}`);
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
      if (data.length === 0) {
        console.info("No documents found for user.");
      }
      setAvailableDocuments(data);
    } catch (error: any) {
      setErrorAvailableDocs(error.message);
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
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = '';
    
    lines.forEach((line, lineIndex) => {
      // Handle code blocks
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          // Starting code block
          inCodeBlock = true;
          codeBlockLanguage = line.replace('```', '').trim();
          codeBlockContent = [];
        } else {
          // Ending code block
          inCodeBlock = false;
          formattedLines.push(
            <div key={`code-${lineIndex}`} className="relative group my-6">
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                  <span className="text-xs text-gray-400 font-medium">
                    {codeBlockLanguage || 'Code'}
                  </span>
                  <button
                    onClick={() => handleCopyMessage(codeBlockContent.join('\n'), lineIndex)}
                    className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>
                <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                  <code>{codeBlockContent.join('\n')}</code>
                </pre>
              </div>
            </div>
          );
          codeBlockContent = [];
          codeBlockLanguage = '';
        }
        return;
      }
      
      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }
      
      // Handle inline code
      if (line.includes('`') && !line.startsWith('```')) {
        const parts = line.split(/(`[^`]+`)/g);
        formattedLines.push(
          <p key={lineIndex} className="leading-relaxed my-2 first:mt-0 last:mb-0 text-gray-800">
            {parts.map((part, idx) => 
              part.startsWith('`') && part.endsWith('`') ? 
                <code key={idx} className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600 border">{part.slice(1, -1)}</code> : 
                formatInlineText(part)
            )}
          </p>
        );
      }
      // Handle headers with enhanced styling
      else if (line.startsWith('### ')) {
        formattedLines.push(
          <h3 key={lineIndex} className="text-lg font-bold text-gray-900 mt-8 mb-4 first:mt-0 pb-2 border-b border-gray-200">
            {formatInlineText(line.replace('### ', ''))}
          </h3>
        );
      } else if (line.startsWith('## ')) {
        formattedLines.push(
          <h2 key={lineIndex} className="text-xl font-bold text-gray-900 mt-10 mb-5 first:mt-0 pb-3 border-b-2 border-blue-200">
            {formatInlineText(line.replace('## ', ''))}
          </h2>
        );
      } else if (line.startsWith('# ')) {
        formattedLines.push(
          <h1 key={lineIndex} className="text-2xl font-bold text-gray-900 mt-12 mb-6 first:mt-0 pb-4 border-b-2 border-blue-300">
            {formatInlineText(line.replace('# ', ''))}
          </h1>
        );
      }
      // Enhanced bullet points with better styling
      else if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        const indent = line.length - line.trimStart().length;
        const bulletContent = line.replace(/^[\s-•]+/, '');
        const indentClass = indent > 0 ? `pl-${Math.min(Math.floor(indent / 2) * 4, 16)}` : '';
        formattedLines.push(
          <div key={lineIndex} className={`flex items-start my-2 ${indentClass}`}>
            <span className="text-blue-600 font-bold mt-1.5 mr-3 shrink-0 text-sm">•</span>
            <span className="flex-1 text-gray-800 leading-relaxed">{formatInlineText(bulletContent)}</span>
          </div>
        );
      }
      // Enhanced numbered lists
      else if (/^\s*\d+\.\s/.test(line)) {
        const match = line.match(/^(\s*)(\d+)\.\s(.+)/);
        if (match) {
          const [, indent, number, listContent] = match;
          const indentClass = indent ? `pl-${Math.min(indent.length * 2, 16)}` : '';
          formattedLines.push(
            <div key={lineIndex} className={`flex items-start my-2 ${indentClass}`}>
              <span className="text-blue-600 font-semibold mt-1.5 mr-3 shrink-0 text-sm min-w-6">{number}.</span>
              <span className="flex-1 text-gray-800 leading-relaxed">{formatInlineText(listContent)}</span>
            </div>
          );
        }
      }
      // Enhanced tables
      else if (line.includes('|') && line.split('|').length > 2) {
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
        const isHeader = lines[lineIndex + 1]?.includes('---');
        formattedLines.push(
          <div key={lineIndex} className="overflow-x-auto my-4">
            <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <tbody>
                <tr className={isHeader ? 'bg-gray-50' : ''}>
                  {cells.map((cell, idx) => (
                    <td key={idx} className={`border border-gray-300 px-4 py-3 text-sm ${isHeader ? 'font-semibold text-gray-900' : 'text-gray-800'}`}>
                      {formatInlineText(cell)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        );
      }
      // Enhanced blockquotes
      else if (line.startsWith('> ')) {
        formattedLines.push(
          <blockquote key={lineIndex} className="border-l-4 border-blue-400 pl-6 py-3 my-6 bg-blue-50 rounded-r-lg shadow-sm">
            <div className="italic text-gray-700 text-base leading-relaxed">
              {formatInlineText(line.replace('> ', ''))}
            </div>
          </blockquote>
        );
      }
      // Handle horizontal rules
      else if (line.trim() === '---' || line.trim() === '***') {
        formattedLines.push(
          <hr key={lineIndex} className="my-8 border-gray-300 border-t-2" />
        );
      }
      // Handle empty lines for spacing
      else if (line.trim() === '') {
        formattedLines.push(<div key={lineIndex} className="h-3"></div>);
      }
      // Handle regular paragraphs with better typography
      else if (line.trim()) {
        formattedLines.push(
          <p key={lineIndex} className="leading-relaxed my-4 first:mt-0 last:mb-0 text-gray-800 text-base">
            {formatInlineText(line)}
          </p>
        );
      }
    });
    
    return <div className="prose prose-gray max-w-none">{formattedLines}</div>;
  };

  // Enhanced function to handle inline formatting
  const formatInlineText = (text: string) => {
    const parts = [];
    let currentIndex = 0;
    
    // Combined regex for **bold**, *italic*, __underline__, and links
    const formatRegex = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(__([^_]+)__)|(\[([^\]]+)\]\(([^)]+)\))/g;
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
        parts.push(<u key={match.index} className="underline text-gray-800 decoration-2 underline-offset-2">{match[6]}</u>);
      } else if (match[8] && match[9]) { // [text](url)
        parts.push(
          <a key={match.index} href={match[9]} className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">
            {match[8]}
          </a>
        );
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

  // Animated typing indicator component
  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 px-4 py-3">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span className="text-sm text-gray-500 ml-2">AI is thinking...</span>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Main Chat Area - Fixed Layout */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Scrollable Messages Area */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto scroll-smooth bg-white"
          style={{ 
            paddingTop: '2rem',
            paddingBottom: '1rem',
            scrollBehavior: 'smooth'
          }}
        >
          <div className="max-w-4xl mx-auto px-6">
            {messages.length === 0 && (
              <div className="flex items-center justify-center min-h-[70vh]">
                <div className="text-center max-w-lg">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">AI Legal Assistant</h3>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">How can I help you with legal research, document analysis, or case insights today?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                    {recentTopics.slice(0, 4).map((topic, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickPrompt(topic)}
                        className="p-3 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={`message-${message.id}-${index}`} className="group mb-10 animate-fadeIn">
                <div className={`flex items-start space-x-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type !== 'user' && (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                      message.type === 'ai' 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-br from-red-500 to-red-600'
                    }`}>
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  )}
                  
                  <div className={`flex-1 ${message.type === 'user' ? 'max-w-3xl ml-auto' : 'max-w-none'}`}>
                    {message.type === 'user' && (
                      <div className="flex items-center justify-end mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                          <User className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}
                    
                    <div className={`${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-5 rounded-2xl shadow-lg' 
                        : 'bg-transparent text-gray-900'
                    }`}>
                      <div className="prose prose-gray max-w-none">
                        {message.type === 'ai' ? formatMessageContent(message.content) : (
                          <div className="text-base leading-relaxed">{message.content}</div>
                        )}
                      </div>
                      
                      {message.type === 'ai' && (
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                          <div className="text-xs text-gray-500 flex items-center space-x-2">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <span>{message.timestamp}</span>
                          </div>
                          <button
                            onClick={() => handleCopyMessage(message.content, message.id)}
                            className="flex items-center space-x-2 text-xs text-gray-500 hover:text-gray-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
                          >
                            {copiedMessageId === message.id ? (
                              <>
                                <Check className="w-4 h-4 text-green-600" />
                                <span className="text-green-600">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                      
                      {message.type === 'user' && message.timestamp && (
                        <div className="text-xs text-blue-100 mt-2 text-right opacity-80">
                          {message.timestamp}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {Object.entries(processingDocuments).map(([docId, doc], index) => (
              <div key={`processing-${docId}-${index}`} className="group mb-10 animate-fadeIn">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-5 rounded-2xl shadow-lg">
                      <div className="flex items-center space-x-3">
                        {doc.status === 'PROCESSING' && (
                          <Loader className="w-5 h-5 text-orange-600 animate-spin shrink-0" />
                        )}
                        <div>
                          <p className="font-semibold text-orange-900 text-lg">
                            Processing: {doc.filename}
                          </p>
                          <p className="text-sm text-orange-700 mt-2 leading-relaxed">
                            Status: <span className="font-medium">{doc.status}</span> - {doc.message}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-orange-600 mt-3 flex items-center space-x-2">
                        <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                        <span>{new Date().toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="group mb-10 animate-fadeIn">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-sm">
                      <TypingIndicator />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Fixed Input Area - Properly Positioned */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
          <div className="max-w-4xl mx-auto px-6 py-4">
            {/* File Upload Preview */}
            {(uploadedFiles.length > 0 || selectedDocumentsForQuery.length > 0) && (
              <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
                <div className="font-semibold text-blue-900 mb-3 text-sm flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Files to process:
                </div>
                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div key={`upload-${index}-${file.name}`} className="flex items-center justify-between text-sm bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                      <span className="flex items-center text-blue-800">
                        <FileText className="w-4 h-4 mr-3 text-blue-600" />
                        <span className="font-medium">{file.name}</span>
                        <span className="ml-3 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">New Upload</span>
                      </span>
                      <button 
                        onClick={() => handleRemoveFile(index)} 
                        className="ml-3 text-blue-600 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {selectedDocumentsForQuery.map((doc, index) => (
                    <div key={`selected-doc-${doc.id}-${index}`} className="flex items-center justify-between text-sm bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                      <span className="flex items-center text-blue-800">
                        <FileText className="w-4 h-4 mr-3 text-blue-600" />
                        <span className="font-medium">{doc.document_name}</span>
                        <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Library</span>
                      </span>
                      <button 
                        onClick={() => handleRemoveSelectedDocument(doc.id)} 
                        className="ml-3 text-blue-600 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
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
                  className="w-full mt-4 px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800 text-sm leading-relaxed placeholder-gray-500"
                  rows={2}
                />
              </div>
            )}

            {/* Main Input Area - Enhanced */}
            <div className="relative flex items-end space-x-3 border-2 border-gray-200 rounded-2xl bg-white p-3 shadow-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 focus-within:shadow-xl transition-all duration-200">
              {/* Plus Button with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowAddOptions(!showAddOptions)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    showAddOptions 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                  title="Attach files"
                >
                  <Plus className={`w-5 h-5 transition-transform duration-200 ${showAddOptions ? 'rotate-45' : ''}`} />
                </button>
                {showAddOptions && (
                  <div className="absolute bottom-full left-0 mb-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fadeIn">
                    <label className="block px-5 py-4 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100">
                      <input type="file" multiple className="hidden" onChange={handleFileUpload} />
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600">📎</span>
                        </div>
                        <div>
                          <div className="font-medium">Upload from device</div>
                          <div className="text-xs text-gray-500">Select files to upload</div>
                        </div>
                      </div>
                    </label>
                    <button
                      onClick={() => {
                        setShowAddOptions(false);
                        setShowSelectDocumentModal(true);
                      }}
                      className="block w-full text-left px-5 py-4 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <span className="text-green-600">📁</span>
                        </div>
                        <div>
                          <div className="font-medium">Select from library</div>
                          <div className="text-xs text-gray-500">Choose existing documents</div>
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Text Input - Enhanced */}
              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Message AI Legal Assistant..."
                  className="w-full bg-transparent border-none outline-none resize-none text-gray-900 placeholder-gray-500 py-3 px-2 text-base leading-relaxed"
                  rows={1}
                  style={{ 
                    minHeight: '24px', 
                    maxHeight: '120px'
                  }}
                />
              </div>

              {/* Voice Button - Enhanced */}
              <button
                onClick={handleMicClick}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isRecording 
                    ? 'bg-red-500 text-white shadow-lg animate-pulse' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                title="Voice input"
              >
                <Mic className="w-5 h-5" />
              </button>

              {/* Send Button - Enhanced */}
              <button
                onClick={handleSendMessage}
                disabled={(!inputMessage.trim() && uploadedFiles.length === 0 && selectedDocumentsForQuery.length === 0) || isTyping}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  (!inputMessage.trim() && uploadedFiles.length === 0 && selectedDocumentsForQuery.length === 0) || isTyping
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                }`}
              >
                {isTyping ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Footer Text - Enhanced */}
            <div className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center space-x-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>AI can make mistakes. Consider checking important information.</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Document Selection Modal - Enhanced */}
        {showSelectDocumentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col transform animate-slideUp">
              <div className="flex justify-between items-center p-8 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Select Documents</h2>
                  <p className="text-gray-600 mt-1">Choose documents from your library to query</p>
                </div>
                <button 
                  onClick={() => setShowSelectDocumentModal(false)} 
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8">
                {loadingAvailableDocs ? (
                  <div className="text-center py-16">
                    <Loader className="w-12 h-12 text-blue-500 mx-auto animate-spin mb-6" />
                    <p className="text-gray-600 text-lg">Loading your documents...</p>
                  </div>
                ) : errorAvailableDocs ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <X className="w-8 h-8 text-red-600" />
                    </div>
                    <p className="text-red-600 text-lg">Error: {errorAvailableDocs}</p>
                  </div>
                ) : availableDocuments.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-lg">No documents found in your library.</p>
                    <p className="text-gray-500 mt-2">Upload some documents first to get started.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {availableDocuments.map((doc) => (
                      <label key={doc.id} className="flex items-center p-5 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-blue-300 cursor-pointer transition-all duration-200 group">
                        <input
                          type="checkbox"
                          checked={selectedDocumentsForQuery.some(sDoc => sDoc.id === doc.id)}
                          onChange={() => handleToggleSelectDocument(doc)}
                          className="w-5 h-5 text-blue-600 rounded border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 mr-4"
                        />
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate text-lg">{doc.document_name}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(doc.uploaded_at).toLocaleDateString()} • {doc.file_type.toUpperCase()}
                          </p>
                        </div>
                        {doc.processed && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold ml-3">
                            ✓ Processed
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-4 p-8 border-t border-gray-200 bg-gray-50">
                <button 
                  onClick={() => setShowSelectDocumentModal(false)} 
                  className="px-6 py-3 text-gray-700 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowSelectDocumentModal(false)} 
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl"
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

      {/* Custom CSS for animations */}
      <style >{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .prose {
          line-height: 1.7;
        }
        
        .prose p {
          margin-bottom: 1em;
        }
        
        .prose h1, .prose h2, .prose h3 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        
        .prose ul, .prose ol {
          margin: 1em 0;
        }
        
        .prose li {
          margin: 0.5em 0;
        }
      `}</style>
    </div>
  );
};

export default AIAssistantContent;