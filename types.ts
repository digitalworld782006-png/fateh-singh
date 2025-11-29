export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown content
  author: string;
  date: string;
  timestamp: number;
  category: 'Forex' | 'Crypto' | 'Stocks' | 'Technical Analysis';
  tags: string[];
  imageUrl: string;
  youtubePromo?: boolean;
}

export interface User {
  username: string;
  isAdmin: boolean;
}

export interface AutoBlogSettings {
  isEnabled: boolean;
  frequencyHours: number;
  lastRun: number;
  topics: string[];
}

export enum LoginState {
  LOGGED_OUT,
  USER,
  ADMIN
}