import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

// Initialize Google Generative AI with the provided API key
const ai = new GoogleGenAI({ apiKey: "AIzaSyCtb9tAxhS-U-ZWs9k8SbC68mIOFvJyXfg" });

interface ChatBotProps {
  botName?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ 
  botName = "Wiizzkid ChatBot", 
  isOpen = false, 
  onClose = () => {} 
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string; timestamp: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatOpen, setChatOpen] = useState(isOpen);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Sync with external isOpen prop
  useEffect(() => {
    setChatOpen(isOpen);
  }, [isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (chatOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [chatOpen]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format current time
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input, timestamp: getCurrentTime() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userMessage.text
      });

      const botResponse = response.text || "I'm sorry, I couldn't generate a response.";

      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          sender: 'bot', 
          text: botResponse, 
          timestamp: getCurrentTime() 
        }]);
        setIsTyping(false);
      }, 800);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          sender: 'bot', 
          text: "I'm sorry, I encountered an error processing your request. Please try again later.", 
          timestamp: getCurrentTime() 
        }]);
        setIsTyping(false);
      }, 800);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    const newState = !chatOpen;
    setChatOpen(newState);
    if (!newState) onClose();
  };

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        sender: 'bot',
        text: `Hi there! I'm ${botName}, powered by Google Gemini AI. How can I help you today?`,
        timestamp: getCurrentTime()
      }]);
    }
  }, [botName, messages.length]);

  // 🧠 Simple Markdown-like Renderer (Vanilla JS)
  const renderSimpleMarkdown = (text: string) => {
    let html = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    const lines = html.split('\n');
    let result = '';
    let inList = false;

    for (let line of lines) {
      line = line.trim();

      if (line.startsWith('* ')) {
        if (!inList) {
          result += '<ul class="list-disc ml-5 my-1">';
          inList = true;
        }
        result += `<li>${line.substring(2)}</li>`;
      } else {
        if (inList) {
          result += '</ul>';
          inList = false;
        }

        if (line) {
          result += `<p class="my-1">${line}</p>`;
        }
      }
    }

    if (inList) result += '</ul>';
    return result;
  };

  return (
    <>
      {/* Chat toggle button */}
      <button 
        onClick={toggleChat}
        className={`fixed bottom-20 right-6 h-12 w-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 ${
          chatOpen ? 'bg-indigo-700 rotate-45' : 'bg-indigo-600 hover:bg-red-600'
        }`}
      >
        {chatOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat modal */}
      <div className={`fixed bottom-6 right-6 mb-16 w-96 h-128 max-h-[80vh] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden transition-all duration-300 z-40 ${
        chatOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="bg-indigo-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h1 className="font-medium">{botName}</h1>
                <div className="flex items-center text-xs text-indigo-100">
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  Online now
                </div>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="text-indigo-100 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2 flex-shrink-0 self-end mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                )}
                <div className={`relative max-w-xs px-4 py-2 rounded-lg shadow-sm 
                  ${msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-gray-800 border border-gray-100'}`}
                >
                  <div 
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(msg.text) }}
                  />

                  <div className={`text-xs ${msg.sender === 'user' ? 'text-indigo-200' : 'text-gray-400'} text-right mt-1`}>
                    {msg.timestamp}
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white ml-2 flex-shrink-0 self-end mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2 flex-shrink-0 self-end mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-gray-200 bg-white p-3">
          <div className="flex rounded-md border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-200 focus-within:border-indigo-500">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${botName}...`}
              className="flex-grow p-2 focus:outline-none text-gray-700 resize-none min-h-[40px] max-h-24 text-sm"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={input.trim() === ''}
              className={`px-3 flex items-center justify-center ${
                input.trim() === '' 
                  ? 'bg-gray-100 text-gray-400' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              } transition-colors duration-200`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;