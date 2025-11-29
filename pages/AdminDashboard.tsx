import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost, AutoBlogSettings, LoginState } from '../types';
import { getBlogs, deleteBlog, addBlog, getSettings, updateSettings } from '../services/storageService';
import { generateBlogContent } from '../services/geminiService';
import { v4 as uuidv4 } from 'uuid';

interface AdminProps {
  loginState: LoginState;
}

const AdminDashboard: React.FC<AdminProps> = ({ loginState }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'generator' | 'settings' | 'manage'>('generator');
  
  // Generator State
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLog, setGenerationLog] = useState('');

  // Manage State
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  // Auto Settings State
  const [settings, setSettings] = useState<AutoBlogSettings>(getSettings());

  useEffect(() => {
    if (loginState !== LoginState.ADMIN) {
      navigate('/login');
    }
    setBlogs(getBlogs());
    setSettings(getSettings());
  }, [loginState, navigate]);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    setGenerationLog('Initializing AI Analyst...');
    
    try {
      setGenerationLog('Searching for real-time market data...');
      // Simulate delay for effect
      await new Promise(r => setTimeout(r, 1000));
      
      setGenerationLog('Analyzing price action and sentiment...');
      const content = await generateBlogContent(topic);
      
      setGenerationLog('Optimizing SEO and generating chart concepts...');
      
      const newBlog: BlogPost = {
        id: uuidv4(),
        title: content.title || 'Untitled',
        excerpt: content.excerpt || '',
        content: content.content || '',
        author: 'AI Analyst (Admin)',
        date: new Date().toLocaleDateString(),
        timestamp: Date.now(),
        category: content.category || 'Forex',
        tags: content.tags || [],
        imageUrl: `https://picsum.photos/seed/${Math.random()}/800/400`,
        youtubePromo: true
      };

      addBlog(newBlog);
      setBlogs(getBlogs());
      setTopic('');
      setGenerationLog('Blog published successfully!');
      setTimeout(() => setGenerationLog(''), 3000);
    } catch (error) {
      console.error(error);
      setGenerationLog('Error generating blog. Check API Key.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleAuto = () => {
    const newSettings = { ...settings, isEnabled: !settings.isEnabled };
    setSettings(newSettings);
    updateSettings(newSettings);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deleteBlog(id);
      setBlogs(getBlogs());
    }
  };

  // Function to manually trigger the "Auto Blog" process (Simulator)
  const triggerAutoBlogNow = async () => {
    if (!settings.isEnabled) return;
    
    setIsGenerating(true);
    setGenerationLog('AUTO-BLOG ENGINE STARTED...');
    
    try {
      // Pick a random topic
      const randomTopic = settings.topics[Math.floor(Math.random() * settings.topics.length)];
      setGenerationLog(`Auto-selecting topic: ${randomTopic}...`);
      
      const content = await generateBlogContent(randomTopic);
      
      const newBlog: BlogPost = {
        id: uuidv4(),
        title: content.title || 'Auto Update',
        excerpt: content.excerpt || '',
        content: content.content || '',
        author: 'TradeNexus AutoBot',
        date: new Date().toLocaleDateString(),
        timestamp: Date.now(),
        category: content.category || 'Technical Analysis',
        tags: content.tags || [],
        imageUrl: `https://picsum.photos/seed/${Math.random()}/800/400`,
        youtubePromo: true
      };
      
      addBlog(newBlog);
      setBlogs(getBlogs());
      
      // Update last run
      const updatedSettings = { ...settings, lastRun: Date.now() };
      setSettings(updatedSettings);
      updateSettings(updatedSettings);
      
      setGenerationLog(`Auto-Blog "${newBlog.title}" Published!`);
      setTimeout(() => setGenerationLog(''), 3000);
    } catch (err) {
      setGenerationLog('Auto-Blog Failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Control Panel</h1>
        <div className="bg-trade-700 px-4 py-2 rounded-full text-xs font-mono text-trade-accent border border-trade-600">
          SECURE ACCESS: ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('generator')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'generator' ? 'bg-trade-accent text-white' : 'bg-trade-800 text-gray-400 hover:bg-trade-700'}`}
          >
            Blog Generator
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-trade-accent text-white' : 'bg-trade-800 text-gray-400 hover:bg-trade-700'}`}
          >
            Auto-Blog Settings
          </button>
          <button 
            onClick={() => setActiveTab('manage')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'manage' ? 'bg-trade-accent text-white' : 'bg-trade-800 text-gray-400 hover:bg-trade-700'}`}
          >
            Manage Content
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 bg-trade-800 rounded-xl border border-trade-700 p-6 min-h-[500px]">
          
          {/* GENERATOR PANEL */}
          {activeTab === 'generator' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Manual AI Blog Generator</h2>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Topic / Keyword</label>
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Gold Price Analysis, Bitcoin Halving, Fed Rate Decision"
                  className="w-full bg-trade-900 border border-trade-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-trade-accent focus:outline-none"
                />
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !topic}
                className={`w-full py-3 rounded-lg font-bold text-white transition-all ${isGenerating ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-trade-accent to-blue-500 hover:shadow-lg hover:shadow-emerald-900/40'}`}
              >
                {isGenerating ? 'Generating...' : 'Generate SEO Blog Post'}
              </button>
              
              {generationLog && (
                 <div className="mt-4 p-4 bg-trade-900 rounded-lg border border-trade-600 font-mono text-sm text-trade-accent animate-pulse">
                   > {generationLog}
                 </div>
              )}
            </div>
          )}

          {/* AUTO SETTINGS PANEL */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
               <h2 className="text-xl font-bold text-white">Auto-Blog Configuration</h2>
               
               <div className="flex items-center justify-between bg-trade-900 p-6 rounded-lg border border-trade-600">
                 <div>
                   <h3 className="text-lg font-medium text-white">Auto-Pilot Mode</h3>
                   <p className="text-sm text-gray-400">Automatically fetches news and posts blogs every few hours.</p>
                 </div>
                 <button 
                   onClick={handleToggleAuto}
                   className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${settings.isEnabled ? 'bg-trade-accent' : 'bg-gray-600'}`}
                 >
                   <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${settings.isEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
                 </button>
               </div>

               <div>
                 <h3 className="text-md font-medium text-gray-300 mb-3">Target Topics for Auto-Fetch</h3>
                 <div className="flex flex-wrap gap-2">
                   {settings.topics.map(t => (
                     <span key={t} className="bg-trade-700 text-gray-300 px-3 py-1 rounded-full text-sm border border-trade-600">
                       {t}
                     </span>
                   ))}
                   <button className="text-trade-accent text-sm font-medium hover:underline">+ Add Topic</button>
                 </div>
               </div>

               {/* Simulator for the User */}
               <div className="border-t border-trade-700 pt-6">
                 <h3 className="text-md font-medium text-gray-300 mb-3">Testing Zone</h3>
                 <p className="text-xs text-gray-500 mb-4">Since this is a client-side demo, use this button to force an "Auto-Blog" run immediately.</p>
                 <button 
                   onClick={triggerAutoBlogNow}
                   disabled={!settings.isEnabled || isGenerating}
                   className={`px-4 py-2 rounded border border-trade-accent text-trade-accent hover:bg-trade-accent hover:text-white transition-colors ${(!settings.isEnabled || isGenerating) ? 'opacity-50 cursor-not-allowed' : ''}`}
                 >
                   Trigger Auto-Blog Event Now
                 </button>
                  {generationLog && (
                    <div className="mt-2 text-xs text-trade-accent font-mono">
                      {generationLog}
                    </div>
                  )}
               </div>
            </div>
          )}

          {/* MANAGE PANEL */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-4">Manage Blog Posts</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-trade-700">
                  <thead className="bg-trade-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-trade-700">
                    {blogs.map(blog => (
                      <tr key={blog.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{blog.title.substring(0, 40)}...</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{blog.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{blog.author}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleDelete(blog.id)} className="text-red-400 hover:text-red-300">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;