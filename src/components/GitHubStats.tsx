import React, { useState, useEffect } from 'react';
import { Calendar, Code, GitBranch, Star } from 'lucide-react';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const GitHubStats: React.FC = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);

  useEffect(() => {
    // Generate mock contribution data for the past year
    const generateContributions = () => {
      const data: ContributionDay[] = [];
      const today = new Date();
      const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      
      for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
        const count = Math.floor(Math.random() * 8); // 0-7 contributions per day
        const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4;
        
        data.push({
          date: new Date(d).toISOString().split('T')[0],
          count,
          level
        });
      }
      
      return data;
    };

    setContributions(generateContributions());
  }, []);

  const getContributionColor = (level: number): string => {
    const colors = [
      'bg-gray-200', // 0 contributions
      'bg-green-200', // 1-2 contributions
      'bg-green-300', // 3-4 contributions
      'bg-green-500', // 5-6 contributions
      'bg-green-700'  // 7+ contributions
    ];
    return colors[level] || colors[0];
  };

  const codeSnippets = [
    {
      title: 'React Functional Component with props',
      language: 'jsx',
      code: `const UserCard = ({ user, onEdit }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>
        Edit User
      </button>
    </div>
  );
};`
    },
    {
      title: 'TypeScript Interface',
      language: 'typescript',
      code: `interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

const fetchUser = async (id: string): Promise<ApiResponse<User>> => {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
};`
    },
    {
      title: 'Node.js Express Route',
      language: 'javascript',
      code: `app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});`
    }
  ];

  const [currentSnippet, setCurrentSnippet] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Group contributions by weeks
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  
  contributions.forEach((day, index) => {
    const dayOfWeek = new Date(day.date).getDay();
    
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
    
    currentWeek.push(day);
    
    if (index === contributions.length - 1) {
      weeks.push(currentWeek);
    }
  });

  return (
    <section id="github" className="py-20 px-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        {/* GitHub Contribution Calendar */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            GitHub Contribution Calendar
          </h2>
          
          <div className="bg-gray-800 rounded-xl p-6 overflow-x-auto">
            <div className="flex space-x-1 min-w-max">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col space-y-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={day.date}
                      className={`w-3 h-3 rounded-sm ${getContributionColor(day.level)} hover:ring-2 hover:ring-white/50 transition-all cursor-pointer`}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
              <span>Less</span>
              <div className="flex space-x-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Code Snippet Showcase */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
            <div className="flex items-center space-x-3">
              <Code size={20} />
              <h3 className="text-xl font-semibold">Code Snippet Showcase</h3>
            </div>
            <p className="text-gray-300 text-sm mt-1">{codeSnippets[currentSnippet].title}</p>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre className="text-green-400">
                <code>{codeSnippets[currentSnippet].code}</code>
              </pre>
            </div>
            
            <div className="flex justify-center mt-4 space-x-2">
              {codeSnippets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSnippet(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSnippet ? 'bg-green-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* GitHub Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-yellow-400">156</div>
            <div className="text-gray-400">Total Stars</div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <GitBranch className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-blue-400">42</div>
            <div className="text-gray-400">Total Forks</div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <Calendar className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-400">365</div>
            <div className="text-gray-400">Contributions</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;