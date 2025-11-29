import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import BlogPost from './pages/BlogPost';
import { LoginState, AutoBlogSettings } from './types';
import { getSettings, updateSettings, addBlog, getBlogs } from './services/storageService';
import { generateBlogContent } from './services/geminiService';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [loginState, setLoginState] = useState<LoginState>(LoginState.LOGGED_OUT);

  // Background Auto-Blog Logic (Simulated Background Process)
  useEffect(() => {
    const checkAutoBlog = async () => {
      const settings: AutoBlogSettings = getSettings();
      if (!settings.isEnabled) return;

      const now = Date.now();
      const hoursSinceLastRun = (now - settings.lastRun) / (1000 * 60 * 60);

      // If frequency met (simulated check every minute via interval below)
      if (hoursSinceLastRun >= settings.frequencyHours) {
        console.log("Auto-Blog Triggered via Interval");
        try {
          const randomTopic = settings.topics[Math.floor(Math.random() * settings.topics.length)];
          const content = await generateBlogContent(randomTopic);
          
          const newBlog = {
            id: uuidv4(),
            title: content.title || 'Market Update',
            excerpt: content.excerpt || '',
            content: content.content || '',
            author: 'TradeNexus AutoBot',
            date: new Date().toLocaleDateString(),
            timestamp: Date.now(),
            category: content.category || 'Forex',
            tags: content.tags || [],
            imageUrl: `https://picsum.photos/seed/${Math.random()}/800/400`,
            youtubePromo: true
          };

          addBlog(newBlog as any);
          
          // Update last run time
          updateSettings({ ...settings, lastRun: now });
        } catch (e) {
          console.error("Auto blog failed silently", e);
        }
      }
    };

    // Check every 60 seconds if we need to auto-post
    const timer = setInterval(checkAutoBlog, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    setLoginState(LoginState.LOGGED_OUT);
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header loginState={loginState} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setLoginState={setLoginState} />} />
            <Route 
              path="/admin" 
              element={
                loginState === LoginState.ADMIN ? 
                <AdminDashboard loginState={loginState} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;