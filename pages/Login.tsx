import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginState } from '../types';

interface LoginProps {
  setLoginState: (state: LoginState) => void;
}

const Login: React.FC<LoginProps> = ({ setLoginState }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check Admin Code
    if (accessCode === '963651') {
      setLoginState(LoginState.ADMIN);
      navigate('/admin');
      return;
    }

    // Normal User Login (Simulated)
    if (username && password) {
      if (accessCode && accessCode !== '963651') {
        setError('Invalid Access Code for Admin. Leave empty for User login.');
        return;
      }
      setLoginState(LoginState.USER);
      navigate('/');
    } else {
      setError('Please enter username and password');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-trade-800 p-8 rounded-2xl shadow-2xl border border-trade-700">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Sign In</h2>
          <p className="mt-2 text-sm text-gray-400">
            Access your trading dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300">Username</label>
              <input
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-trade-600 placeholder-gray-500 text-white rounded-md bg-trade-900 focus:outline-none focus:ring-trade-accent focus:border-trade-accent sm:text-sm"
                placeholder="Trader123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-trade-600 placeholder-gray-500 text-white rounded-md bg-trade-900 focus:outline-none focus:ring-trade-accent focus:border-trade-accent sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="pt-4 border-t border-trade-700">
               <label className="text-sm font-bold text-trade-gold flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 010-2z" clipRule="evenodd" />
                  </svg>
                 Enter Access Code (Admin Only)
               </label>
               <input
                type="password"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-trade-gold/50 placeholder-gray-600 text-white rounded-md bg-trade-900 focus:outline-none focus:ring-trade-gold focus:border-trade-gold sm:text-sm"
                placeholder="Enter 6-digit code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center font-medium bg-red-900/20 p-2 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-trade-accent hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-trade-accent transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;