import React, { useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();

        // Connect nearby particles
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
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

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)' }}
      />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-cyan-700 bg-clip-text text-transparent">
            Full Stack Developer
          </h1>
          <div className="text-xl md:text-2xl text-gray-700 mb-8 h-8">
            <span className="typewriter">Building amazing digital experiences</span>
          </div>
        </div>

        <div className="flex justify-center space-x-6 mb-12 animate-fadeInUp delay-300">
          <a
            href="https://github.com/manlikeinder"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/60 backdrop-blur-sm rounded-full border border-gray-300 hover:border-cyan-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-600/20"
          >
            <Github size={24} />
          </a>
          <a
            href="#"
            className="p-3 bg-white/60 backdrop-blur-sm rounded-full border border-gray-300 hover:border-cyan-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-600/20"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:your@email.com"
            className="p-3 bg-white/60 backdrop-blur-sm rounded-full border border-gray-300 hover:border-cyan-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-600/20"
          >
            <Mail size={24} />
          </a>
        </div>

        <button
          onClick={scrollToNext}
          className="animate-bounce p-2 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-cyan-600/30 hover:border-cyan-600 transition-all duration-300"
        >
          <ChevronDown size={24} />
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .typewriter {
          overflow: hidden;
          border-right: 0.15em solid #0891b2;
          white-space: nowrap;
          margin: 0 auto;
          letter-spacing: 0.15em;
          animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #0891b2 }
        }
      `}</style>
    </section>
  );
};

export default Hero;