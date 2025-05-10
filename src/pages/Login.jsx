import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState('');
  
  const { login, error, setError, user, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  // Clear error when form is changed
  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [username, password]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!username.trim() || !password.trim()) {
      setFormError('Please enter both username and password');
      return;
    }
    
    // Attempt login
    const success = await login(username, password);
    
    if (success) {
      // Save username if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedUsername', username);
      } else {
        localStorage.removeItem('rememberedUsername');
      }
      
      // Redirect to dashboard
      navigate('/');
    }
  };
  
  // Load remembered username
  useEffect(() => {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      setUsername(rememberedUsername);
      setRememberMe(true);
    }
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 rounded-xl shadow-lg p-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">EmpressPC</h1>
          <h2 className="mt-6 text-xl font-semibold text-white">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Enter your credentials to access the quotation system
          </p>
        </div>
        
        {/* Error alert */}
        {(error || formError) && (
          <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg mt-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
              <p className="text-sm text-red-300">{error || formError}</p>
            </div>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                placeholder="Username"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                placeholder="Password"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md text-white font-medium ${
                loading ? 'bg-blue-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className={`h-5 w-5 ${loading ? 'text-blue-400' : 'text-blue-400 group-hover:text-blue-300'}`} />
              </span>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;