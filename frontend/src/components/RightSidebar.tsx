import React from 'react';
import { Lightbulb, Plus, Trash2, MessageCircle, Loader } from 'lucide-react';

interface Message {
  id: number;
  type: 'ai' | 'user' | 'system';
  content: string;
  timestamp: string;
  documentId?: string;
}

interface Chat {
  id: number;
  user_id: number;
  title: string;
  created_at: string;
  messages: Message[];
}

interface RightSidebarProps {
  recentTopics: string[];
  handleQuickPrompt: (prompt: string) => void;
  chatList: Chat[];
  currentChatId: number | null;
  onLoadChat: (chatId: number) => Promise<void>;
  onNewChat: () => Promise<void>;
  onDeleteChat: (chatId: number) => Promise<void>;
  loadingChatList: boolean;
  errorChatList: string | null;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ 
  recentTopics, 
  handleQuickPrompt, 
  chatList, 
  currentChatId, 
  onLoadChat, 
  onNewChat, 
  onDeleteChat, 
  loadingChatList, 
  errorChatList 
}) => {

  // Helper function to get chat preview (last message or document info)
  const getChatPreview = (chat: Chat): string => {
    if (chat.messages.length === 0) return "New chat";
    
    const lastMessage = chat.messages[chat.messages.length - 1];
    
    // Safety check - ensure content exists
    if (!lastMessage || !lastMessage.content) {
      return "No content";
    }
    
    // If last message mentions a document, show document-related preview
    if (lastMessage.content.includes('Summary for') || lastMessage.content.includes('Document')) {
      const documentMatch = lastMessage.content.match(/Document "([^"]+)"/);
      if (documentMatch) {
        return `📄 ${documentMatch[1]}`;
      }
    }
    
    // Show preview of last user query or AI response
    const preview = lastMessage.content.substring(0, 50);
    return preview.length < lastMessage.content.length ? `${preview}...` : preview;
  };

  // Helper function to count messages in chat
  const getMessageCount = (chat: Chat): number => {
    if (!chat || !chat.messages || !Array.isArray(chat.messages)) {
      return 0;
    }
    return chat.messages.length;
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="w-80 h-screen overflow-y-auto bg-white border-l border-gray-200 flex-shrink-0">
      <div className="p-4">
        
        {/* New Chat Button */}
        <div className="mb-6">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-gray-500" />
            Chat History
          </h3>
          
          {/* Loading State */}
          {loadingChatList && (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-6 h-6 text-blue-500 animate-spin" />
              <span className="ml-2 text-gray-600">Loading chats...</span>
            </div>
          )}

          {/* Error State */}
          {errorChatList && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-700 text-sm">{errorChatList}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="text-red-600 hover:text-red-800 text-sm mt-2 underline"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loadingChatList && !errorChatList && chatList.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No chat history yet</p>
              <p className="text-gray-400 text-xs mt-1">Start a new chat to begin</p>
            </div>
          )}

          {/* Chat List */}
          {!loadingChatList && !errorChatList && chatList.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {chatList.map((chat, index) => {
                try {
                  // Safety check for chat object
                  if (!chat || typeof chat.id === 'undefined') {
                    console.warn('Invalid chat object:', chat);
                    return null;
                  }

                  return (
                    <div 
                      key={`chat-${chat.id}-${index}`}
                      className={`group relative border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                        currentChatId === chat.id 
                          ? 'bg-blue-50 border-blue-200 shadow-sm' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => onLoadChat(chat.id)}
                    >
                      {/* Chat Header */}
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`font-medium text-sm truncate pr-2 ${
                          currentChatId === chat.id ? 'text-blue-900' : 'text-gray-900'
                        }`}>
                          {chat.title || 'Untitled Chat'}
                        </h4>
                        
                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteChat(chat.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-500 p-1"
                          title="Delete chat"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Chat Preview */}
                      <p className={`text-xs mb-2 line-clamp-2 ${
                        currentChatId === chat.id ? 'text-blue-700' : 'text-gray-600'
                      }`}>
                        {getChatPreview(chat)}
                      </p>

                      {/* Chat Meta Info */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          {getMessageCount(chat)} messages
                        </span>
                        <span>{chat.created_at ? formatDate(chat.created_at) : 'Unknown date'}</span>
                      </div>

                      {/* Active Chat Indicator */}
                      {currentChatId === chat.id && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg"></div>
                      )}
                    </div>
                  );
                } catch (error) {
                  console.error('Error rendering chat item:', error, 'Chat:', chat);
                  return (
                    <div key={`error-chat-${index}`} className="border border-red-200 rounded-lg p-3 bg-red-50">
                      <p className="text-red-600 text-sm">Error loading chat</p>
                    </div>
                  );
                }
              }).filter(Boolean)} {/* Filter out null values */}
            </div>
          )}
        </div>

        {/* Quick Topics (Only show if no chats or as suggestions) */}
        {(!loadingChatList && chatList.length === 0) && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-orange-500" />
              Quick Start Topics
            </h3>
            <div className="space-y-2">
              {recentTopics.slice(0, 5).map((topic, index) => (
                <button
                  key={`topic-${index}`}
                  onClick={() => handleQuickPrompt(`Tell me about ${topic}`)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm border border-gray-200"
                >
                  <p className="text-gray-700">{topic}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AI Capabilities */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-orange-500" />
            AI Capabilities
          </h3>
          <div className="space-y-3">
            {[
              'Legal research & case analysis',
              'Contract review & risk assessment', 
              'Document drafting assistance',
              'Compliance checking',
              'Strategic legal advice',
              'Citation formatting'
            ].map((capability, index) => (
              <div key={`capability-${index}`} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-sm text-gray-700">{capability}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        {chatList.length > 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2 text-sm">💡 Pro Tips</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Upload documents to get AI-powered summaries</li>
              <li>• Ask specific questions about your documents</li>
              <li>• Use custom instructions for targeted analysis</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;