import React from 'react';
import { X, Bot, MessageCircle, FileText, Code, Sparkles } from 'lucide-react';

interface AIToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (tool: string) => void;
}

const AIToolsModal: React.FC<AIToolsModalProps> = ({ isOpen, onClose, onSelectTool }) => {
  const aiTools = [
    {
      id: 'features',
      title: 'AI Features',
      description: 'Explore advanced AI capabilities and integrations',
      icon: <Sparkles size={20} />,
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'chatbot',
      title: 'AI Chatbot',
      description: 'Interactive AI assistant for portfolio questions',
      icon: <MessageCircle size={20} />,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'resume',
      title: 'AI Resume/Interview',
      description: 'AI-powered resume analysis and interview prep',
      icon: <FileText size={20} />,
      color: 'from-green-600 to-emerald-600'
    },
    {
      id: 'code',
      title: 'AI Code Generator',
      description: 'Generate code snippets and solutions',
      icon: <Code size={20} />,
      color: 'from-orange-600 to-red-600'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-xl w-full max-w-md border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">AI Tools</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tools List */}
        <div className="p-6 space-y-3">
          {aiTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => {
                onSelectTool(tool.id);
                onClose();
              }}
              className="w-full p-4 bg-gradient-to-r text-white rounded-lg hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{
                background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                backgroundImage: `linear-gradient(135deg, ${tool.color.split(' ')[0].replace('from-', '')} 0%, ${tool.color.split(' ')[1].replace('to-', '')} 100%)`
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  {tool.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold">{tool.title}</div>
                  <div className="text-sm opacity-90">{tool.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIToolsModal;