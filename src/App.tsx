import React, { useState, useEffect } from 'react';
import { Github, Mail, Linkedin, MessageCircle, ExternalLink, Star, GitFork, Calendar, MapPin, ChevronDown, Bot } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubStats from './components/GitHubStats';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import AIToolsModal from './components/AIToolsModal';
import Navigation from './components/Navigation';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAIToolsOpen, setIsAIToolsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'github', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAIToolSelect = (tool: string) => {
    console.log('Selected AI tool:', tool);
    // Handle different AI tools here
    switch (tool) {
      case 'chatbot':
        setIsChatOpen(true);
        break;
      case 'features':
        // Handle AI features
        break;
      case 'resume':
        // Handle AI resume/interview
        break;
      case 'code':
        // Handle AI code generator
        break;
      default:
        break;
    }
  };
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Navigation activeSection={activeSection} />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubStats />
        <Contact />
      </main>

      {/* Floating AI Tools Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <button
          onClick={() => setIsAIToolsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        >
          <Bot size={24} className="group-hover:rotate-12 transition-transform" />
        </button>
        
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle size={20} />
        </button>
      </div>

      {/* Chatbot */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {/* AI Tools Modal */}
      <AIToolsModal 
        isOpen={isAIToolsOpen} 
        onClose={() => setIsAIToolsOpen(false)}
        onSelectTool={handleAIToolSelect}
      />
    </div>
  );
}

export default App;