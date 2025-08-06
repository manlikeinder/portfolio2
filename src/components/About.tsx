import React from 'react';
import { Code, Database, Server, Smartphone } from 'lucide-react';

const About: React.FC = () => {
  const specialties = [
    {
      icon: <Code size={24} />,
      title: 'Frontend Development',
      description: 'React, Next.js, TypeScript, Tailwind CSS'
    },
    {
      icon: <Server size={24} />,
      title: 'Backend Development',
      description: 'Node.js, Express, Python, REST APIs'
    },
    {
      icon: <Database size={24} />,
      title: 'Database Design',
      description: 'PostgreSQL, MongoDB, Redis, Supabase'
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Mobile Development',
      description: 'React Native, Progressive Web Apps'
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in-up">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-fade-in-left">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate full-stack developer with expertise in modern web technologies. 
              I love creating beautiful, functional applications that solve real-world problems 
              and provide exceptional user experiences.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              With a strong foundation in both frontend and backend development, I enjoy 
              working on challenging projects that push the boundaries of what's possible 
              on the web.
            </p>
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600">3+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600">50+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600">100%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in-right">
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-600/30">
              <div className="w-64 h-64 bg-gray-700/80 rounded-full flex items-center justify-center shadow-lg">
                <div className="text-6xl">👨‍💻</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((specialty, index) => (
            <div
              key={index}
              className="p-6 bg-gray-700/80 backdrop-blur-sm rounded-xl border border-gray-600 hover:border-cyan-600/50 transition-all duration-300 hover:transform hover:scale-105 group shadow-sm hover:shadow-md animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-cyan-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {specialty.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{specialty.title}</h3>
              <p className="text-gray-300 text-sm">{specialty.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;