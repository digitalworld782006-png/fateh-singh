import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginState } from '../types';

interface HeaderProps {
  loginState: LoginState;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ loginState, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-trade-800 border-b border-trade-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-trade-accent to-blue-400">
              TradeNexus
            </span>
          </div>
          
          <nav className="flex space-x-6 items-center">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Market News</Link>
            
            {loginState === LoginState.ADMIN && (
              <Link 
                to="/admin" 
                className="text-trade-gold font-medium hover:text-yellow-300 transition-colors"
              >
                Admin Panel
              </Link>
            )}

            {loginState !== LoginState.LOGGED_OUT ? (
               <button 
                onClick={onLogout}
                className="bg-trade-700 hover:bg-trade-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
               >
                 Logout
               </button>
            ) : (
              <Link 
                to="/login"
                className="bg-trade-accent hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-lg shadow-emerald-900/20"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;