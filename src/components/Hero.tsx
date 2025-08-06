import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Download, User } from 'lucide-react';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Full Stack Developer';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        {/* Terminal Window */}
        <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700 max-w-4xl mx-auto">
          {/* Terminal Header */}
          <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-gray-400 text-sm font-mono">user@portfolio:~</div>
            <div className="w-16"></div>
          </div>

          {/* Terminal Content */}
          <div className="p-8 font-mono text-green-400">
            <div className="flex items-center mb-4">
              <span className="text-green-500">user@portfolio:~$</span>
              <span className="ml-2 text-white">{typedText}</span>
              <span className="animate-pulse text-green-400">|</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center mt-8">
              <div className="space-y-4">
                <div className="text-gray-300">
                  <span className="text-cyan-400">Passionate about creating beautiful,</span><br/>
                  <span className="text-cyan-400">functional and user-centered digital</span><br/>
                  <span className="text-cyan-400">experiences.</span>
                </div>
                <div className="text-gray-300">
                  <span className="text-cyan-400">Currently pursuing my degree in</span><br/>
                  <span className="text-cyan-400">Software Engineering.</span>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors flex items-center space-x-2">
                    <Mail size={16} />
                    <span>Contact Me</span>
                  </button>
                  <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-2 rounded transition-colors flex items-center space-x-2">
                    <Download size={16} />
                    <span>Resume</span>
                  </button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-400 shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center">
                    <User size={80} className="text-cyan-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Stats */}
        <div className="flex justify-center space-x-4 mt-8">
          <div className="bg-gray-800 text-yellow-400 px-4 py-2 rounded-full text-sm font-mono">
            3 Stars
          </div>
          <div className="bg-gray-800 text-gray-400 px-4 py-2 rounded-full text-sm font-mono">
            0 Forks
          </div>
          <div className="bg-gray-800 text-green-400 px-4 py-2 rounded-full text-sm font-mono">
            37 Public Repos
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={scrollToNext}
            className="animate-bounce p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-cyan-400 transition-all duration-300"
          >
            <ChevronDown size={24} className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;