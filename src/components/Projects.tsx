import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  topics: string[];
  updated_at: string;
}

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repository[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Frontend', 'Backend', 'Full Stack', 'Mobile', 'Tools'];

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch('https://api.github.com/users/manlikeinder/repos?sort=updated&per_page=12');
        const data = await response.json();
        setRepos(data);
        setFilteredRepos(data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  const categorizeRepo = (repo: Repository): string => {
    const language = repo.language?.toLowerCase() || '';
    const name = repo.name.toLowerCase();
    const description = repo.description?.toLowerCase() || '';
    const topics = repo.topics?.join(' ').toLowerCase() || '';
    
    const content = `${name} ${description} ${topics}`;

    if (language === 'html' || content.includes('html') || content.includes('css') || content.includes('sass') || content.includes('scss')) {
      return 'Frontend';
    }
    if (language === 'javascript' && (content.includes('react') || content.includes('vue') || content.includes('angular') || content.includes('frontend'))) {
      return 'Frontend';
    }
    if (language === 'typescript' && (content.includes('react') || content.includes('next') || content.includes('vue') || content.includes('angular'))) {
      return 'Frontend';
    }
    if (content.includes('react native') || content.includes('flutter') || content.includes('mobile') || content.includes('android') || content.includes('ios')) {
      return 'Mobile';
    }
    if (language === 'python' || language === 'java' || language === 'go' || language === 'rust' || content.includes('api') || content.includes('server') || content.includes('backend')) {
      return 'Backend';
    }
    if (content.includes('fullstack') || content.includes('full-stack') || (content.includes('frontend') && content.includes('backend'))) {
      return 'Full Stack';
    }
    if (content.includes('tool') || content.includes('cli') || content.includes('script') || content.includes('automation')) {
      return 'Tools';
    }
    
    // Default categorization based on language
    if (['javascript', 'typescript'].includes(language)) {
      return 'Frontend';
    }
    if (['python', 'java', 'go', 'rust', 'php', 'ruby'].includes(language)) {
      return 'Backend';
    }
    
    return 'Tools';
  };

  const filterProjects = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredRepos(repos);
    } else {
      const filtered = repos.filter(repo => categorizeRepo(repo) === category);
      setFilteredRepos(filtered);
    }
  };

  const getLanguageColor = (language: string): string => {
    const colors: { [key: string]: string } = {
      javascript: 'bg-yellow-500',
      typescript: 'bg-blue-600',
      python: 'bg-green-600',
      html: 'bg-orange-500',
      css: 'bg-blue-500',
      java: 'bg-red-600',
      go: 'bg-cyan-500',
      rust: 'bg-orange-600',
      php: 'bg-purple-600',
      ruby: 'bg-red-500',
    };
    return colors[language?.toLowerCase()] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-1 bg-gray-300 rounded w-24 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            GitHub Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Explore my latest projects from GitHub, automatically categorized by technology and purpose.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => filterProjects(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-cyan-600 hover:text-cyan-600'
              }`}
            >
              {category}
              {category !== 'All' && (
                <span className="ml-2 text-xs opacity-75">
                  ({repos.filter(repo => categorizeRepo(repo) === category).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="group bg-white backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden hover:border-cyan-600/50 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-sm hover:shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-1">
                    {repo.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-sm">{repo.stargazers_count}</span>
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                
                {repo.description && (
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                    {repo.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  {repo.language && (
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                      <span className="text-sm text-gray-600">{repo.language}</span>
                    </div>
                  )}
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
                    {categorizeRepo(repo)}
                  </span>
                </div>
                
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {repo.topics.slice(0, 3).map((topic, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                    {repo.topics.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{repo.topics.length - 3}
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-3">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-500 hover:text-cyan-600 transition-colors"
                    >
                      <Github size={16} />
                      <span className="text-sm">Code</span>
                    </a>
                    {repo.html_url.includes('github.io') && (
                      <a
                        href={repo.html_url.replace('github.com', 'github.io').replace('.git', '')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-gray-500 hover:text-cyan-600 transition-colors"
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm">Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRepos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Filter size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">No projects found in this category</p>
              <p className="text-sm">Try selecting a different category</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;