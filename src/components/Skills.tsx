import React from 'react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Code/JS',
      skills: [
        { name: 'JavaScript/TypeScript', level: 95 },
        { name: 'React', level: 90 },
        { name: 'TailwindCSS', level: 95 }
      ]
    },
    {
      title: 'Express',
      skills: [
        { name: 'MongoDB', level: 88 },
        { name: 'RESTful APIs', level: 85 },
        { name: 'Firebase', level: 90 }
      ]
    },
    {
      title: 'VS Code',
      skills: [
        { name: 'Figma', level: 88 },
        { name: 'Responsive Design', level: 95 },
        { name: 'WordPress', level: 80 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-cyan-600/30 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <h3 className="text-xl font-semibold mb-6 text-cyan-600">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">{skill.name}</span>
                      <span className="text-cyan-600 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;