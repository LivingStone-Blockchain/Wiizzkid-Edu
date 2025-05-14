import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

// Initialize Google GenAI client
const ai = new GoogleGenAI({ apiKey: "AIzaSyCtb9tAxhS-U-ZWs9k8SbC68mIOFvJyXfg" });

const ChatBotPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string; timestamp: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format current time
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        sender: 'bot',
        text: `Hi there! I'm WiizzDroid, your learning assistant. How can I help you today?`,
        timestamp: getCurrentTime()
      }]);
    }
  }, []);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input, timestamp: getCurrentTime() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setIsTyping(true);

    try {
      const prompt = `You are WiizzDroid, a friendly learning assistant chatbot that helps users with educational content.
      You specialize in explaining topics like 3D shapes, vertebrates, and information about educational products.
      Please respond to the following user message in a helpful, concise way: "${userMessage.text}"`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt
      });

      const botResponse = response.text || "Sorry, I couldn't generate a response.";

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
          text: "I'm sorry, I encountered an error processing your request.",
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

  // Basic Markdown-like renderer using plain JS
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
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-indigo-300 dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <h1 className="text-xl font-medium text-gray-800 dark:text-white">WiizzDroid - Your Learning Assistant</h1>
        <p className="text-sm text-gray-500 dark:text-gray-200">Ask me anything about our app and products!</p>
      </header>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4 pb-4">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Start a conversation with WiizzDroid...</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`relative max-w-md px-4 py-3 rounded-lg shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-indigo-500 text-white dark:bg-indigo-500'
                    : 'bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <div 
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(msg.text) }}
                />

                <div className={`text-xs mt-1 ${
                  msg.sender === 'user' 
                    ? 'text-indigo-200' 
                    : 'text-gray-400 dark:text-gray-500'
                } text-right`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-4 py-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-indigo-300 dark:bg-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-200 focus-within:border-indigo-500 dark:focus-within:border-indigo-400">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message WiizzDroid..."
              className="flex-grow p-3 focus:outline-none text-gray-700 dark:text-gray-200 resize-none min-h-[56px] max-h-32 dark:bg-gray-800"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={input.trim() === ''}
              className={`px-4 flex items-center justify-center ${
                input.trim() === ''
                  ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                  : 'bg-indigo-600 text-white dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600'
              } transition-colors duration-200`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-2">Press Enter to send, Shift+Enter for a new line</p>
        </div>
      </footer>
    </div>
  );
};

export default ChatBotPage;