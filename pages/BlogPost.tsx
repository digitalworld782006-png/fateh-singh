import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogs } from '../services/storageService';
import { BlogPost as BlogPostType } from '../types';
import ReactMarkdown from 'react-markdown';

// Simple markdown components mapping for styling
const MarkdownComponents = {
  h1: ({node, ...props}: any) => <h1 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />,
  h2: ({node, ...props}: any) => <h2 className="text-2xl font-semibold text-trade-accent mt-6 mb-3" {...props} />,
  h3: ({node, ...props}: any) => <h3 className="text-xl font-semibold text-gray-200 mt-4 mb-2" {...props} />,
  p: ({node, ...props}: any) => <p className="text-gray-300 leading-relaxed mb-4" {...props} />,
  ul: ({node, ...props}: any) => <ul className="list-disc list-inside text-gray-300 mb-4 ml-4" {...props} />,
  li: ({node, ...props}: any) => <li className="mb-1" {...props} />,
  strong: ({node, ...props}: any) => <strong className="text-white font-bold" {...props} />,
  blockquote: ({node, ...props}: any) => <blockquote className="border-l-4 border-trade-gold pl-4 italic text-gray-400 my-4 bg-trade-800/50 py-2 rounded-r" {...props} />,
  a: ({node, ...props}: any) => <a className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
};

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPostType | null>(null);

  useEffect(() => {
    const blogs = getBlogs();
    const found = blogs.find(b => b.id === id);
    setBlog(found || null);
  }, [id]);

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-2xl text-white">Post not found</h2>
        <Link to="/" className="text-trade-accent mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 border-b border-trade-700 pb-8">
        <div className="flex flex-wrap gap-2 mb-4">
           {blog.tags.map(tag => (
             <span key={tag} className="bg-trade-800 text-trade-accent px-3 py-1 rounded-full text-sm font-mono border border-trade-700">
               #{tag}
             </span>
           ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
          {blog.title}
        </h1>
        <div className="flex items-center text-gray-400 text-sm">
          <span className="font-semibold text-trade-gold">{blog.author}</span>
          <span className="mx-2">•</span>
          <span>{blog.date}</span>
        </div>
      </div>

      <img 
        src={blog.imageUrl} 
        alt={blog.title} 
        className="w-full h-96 object-cover rounded-xl shadow-2xl mb-10 border border-trade-700"
      />

      <div className="prose prose-invert max-w-none">
        <ReactMarkdown components={MarkdownComponents}>
          {blog.content}
        </ReactMarkdown>
      </div>

      {/* Trade Maven Promo Box (Hardcoded redundancy for SEO requirement) */}
      <div className="mt-12 bg-gradient-to-r from-trade-800 to-trade-900 border border-trade-gold/30 rounded-xl p-8 flex flex-col md:flex-row items-center gap-6 shadow-lg shadow-yellow-900/10">
        <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-2xl font-bold shadow-lg">
          ▶
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Want more deep-dive analysis?</h3>
          <p className="text-gray-300 mb-4">
            Join thousands of traders on the <strong>Trade Maven</strong> YouTube channel for daily live streams, educational content, and market breakdowns.
          </p>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Watch Trade Maven Now
          </a>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;