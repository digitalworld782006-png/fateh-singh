import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-trade-900 border-t border-trade-800 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-gray-100">TradeNexus</span>
            <p className="text-gray-400 text-sm mt-1">Automated AI Trading Intelligence</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-trade-accent">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-trade-accent">Terms of Service</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-trade-gold hover:text-yellow-300 font-semibold">
              Trade Maven (YouTube)
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-trade-800 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} TradeNexus. All rights reserved. Not financial advice.
        </div>
      </div>
    </footer>
  );
};

export default Footer;