import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI assistant. I can help you learn more about my skills, projects, and experience. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('skills') || lowerInput.includes('technology')) {
      return "I'm proficient in React, Next.js, TypeScript, Node.js, Python, PostgreSQL, and many other modern technologies. I specialize in full-stack development with a focus on creating scalable, user-friendly applications.";
    } else if (lowerInput.includes('project') || lowerInput.includes('work')) {
      return "I've worked on various projects including e-commerce platforms, task management apps, AI chat applications, and social media dashboards. Each project showcases different aspects of full-stack development and modern web technologies.";
    } else if (lowerInput.includes('experience')) {
      return "I have 3+ years of experience in full-stack development, having completed 50+ projects with 100% client satisfaction. I enjoy working on challenging problems and creating solutions that make a real impact.";
    } else if (lowerInput.includes('contact') || lowerInput.includes('hire')) {
      return "You can reach out to me through the contact form on this website, or connect with me on GitHub and LinkedIn. I'm always open to discussing new opportunities and interesting projects!";
    } else {
      return "That's a great question! Feel free to ask me about my skills, projects, experience, or how to get in touch. I'm here to help you learn more about my work as a full-stack developer.";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
      <div className="bg-white/95 backdrop-blur-lg border border-gray-200 rounded-xl w-full max-w-md h-96 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full">
              <Bot size={16} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-xs text-gray-600">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.isUser
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {!message.isUser && (
                    <Bot size={16} className="text-cyan-600 mt-0.5 flex-shrink-0" />
                  )}
                  {message.isUser && (
                    <User size={16} className="text-white mt-0.5 flex-shrink-0" />
                  )}
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-gray-100 text-gray-900 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-600 border border-gray-200"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;