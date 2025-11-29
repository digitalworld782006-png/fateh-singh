import { BlogPost, AutoBlogSettings } from '../types';

const BLOG_KEY = 'tradenexus_blogs';
const SETTINGS_KEY = 'tradenexus_settings';

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'EUR/USD Technical Analysis: Breaking the 1.10 Resistance',
    excerpt: 'Deep dive into the Euro strength against the Dollar with support levels and pivot points analysis.',
    content: `
# EUR/USD Market Outlook

The Euro has shown significant resilience against the US Dollar this week. Our technical analysis suggests a bullish momentum if the pair can sustain above the 1.0950 level.

## Key Technical Levels
* **Support:** 1.0880
* **Resistance:** 1.1020

## Trade Setup
Traders should watch for a breakout above 1.1020 for a long entry targeting 1.1150. Conversely, a rejection here could see a retest of 1.0880.

> **Trade Maven Tip:** Always manage your risk. Watch our latest video on "Risk Management Strategies" on the [Trade Maven YouTube Channel](https://youtube.com) for more insights.
    `,
    author: 'AI Analyst',
    date: new Date().toLocaleDateString(),
    timestamp: Date.now(),
    category: 'Forex',
    tags: ['EURUSD', 'Forex', 'Technical Analysis'],
    imageUrl: 'https://picsum.photos/seed/eurusd/800/400',
    youtubePromo: true
  },
  {
    id: '2',
    title: 'Bitcoin (BTC) Price Action: Is the Bull Run Over?',
    excerpt: 'Analyzing the recent crypto market correction and what it means for altcoins.',
    content: `
# Bitcoin Market Update

Bitcoin faced a sharp rejection at $68,000, leading to a broader market correction. However, on-chain data suggests accumulation by whales is continuing.

## Support Zones
The $60,000 psychological level remains critical. A daily close below this could trigger further downside to $52,000.

## Market Sentiment
Fear and Greed index has dropped to Neutral, suggesting the market is resetting before the next leg up.

For real-time updates and live trading sessions, subscribe to **Trade Maven** on YouTube.
    `,
    author: 'AI Analyst',
    date: new Date(Date.now() - 86400000).toLocaleDateString(),
    timestamp: Date.now() - 86400000,
    category: 'Crypto',
    tags: ['Bitcoin', 'Crypto', 'BTC'],
    imageUrl: 'https://picsum.photos/seed/bitcoin/800/400',
    youtubePromo: true
  }
];

export const getBlogs = (): BlogPost[] => {
  const stored = localStorage.getItem(BLOG_KEY);
  if (!stored) {
    localStorage.setItem(BLOG_KEY, JSON.stringify(INITIAL_BLOGS));
    return INITIAL_BLOGS;
  }
  return JSON.parse(stored);
};

export const addBlog = (blog: BlogPost) => {
  const blogs = getBlogs();
  const updated = [blog, ...blogs];
  localStorage.setItem(BLOG_KEY, JSON.stringify(updated));
};

export const deleteBlog = (id: string) => {
  const blogs = getBlogs();
  const updated = blogs.filter(b => b.id !== id);
  localStorage.setItem(BLOG_KEY, JSON.stringify(updated));
};

export const getSettings = (): AutoBlogSettings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) {
    const defaultSettings: AutoBlogSettings = {
      isEnabled: false,
      frequencyHours: 3,
      lastRun: 0,
      topics: ['Forex Major Pairs', 'Gold (XAUUSD)', 'Bitcoin & Ethereum', 'Stock Market Open']
    };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
    return defaultSettings;
  }
  return JSON.parse(stored);
};

export const updateSettings = (settings: AutoBlogSettings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};