import React from 'react';
import { BlogPost } from '../types';
import { useNavigate } from 'react-router-dom';

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-trade-800 rounded-xl overflow-hidden shadow-lg border border-trade-700 hover:border-trade-accent transition-all duration-300 cursor-pointer group flex flex-col h-full"
      onClick={() => navigate(`/blog/${blog.id}`)}
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={blog.imageUrl} 
          alt={blog.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-trade-900/80 backdrop-blur-sm text-trade-accent text-xs font-bold px-2 py-1 rounded">
          {blog.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center space-x-2 text-xs text-gray-400 mb-3">
          <span>{blog.date}</span>
          <span>•</span>
          <span className="text-trade-gold">{blog.author}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-trade-accent transition-colors">
          {blog.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
          {blog.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {blog.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-trade-700 text-gray-300 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;