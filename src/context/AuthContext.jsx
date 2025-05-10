import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Set token in axios headers and localStorage
  const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Load user from token
  const loadUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setAuthToken(token);
      const response = await api.get('/auth/me');
      setUser(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to load user:', err);
      setToken(null);
      setUser(null);
      setAuthToken(null);
      setError('Session expired. Please login again.');
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', { username, password });
      const { token, user } = response.data;
      
      setToken(token);
      setUser(user);
      setAuthToken(token);
      setError(null);
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
    navigate('/login');
  };

  // Register new user (admin only)
  const registerUser = async (userData) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/register', userData);
      setError(null);
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.message || 'Failed to register user.');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      setError(null);
      return { success: true, message: response.data.message };
    } catch (err) {
      console.error('Password change failed:', err);
      setError(err.response?.data?.message || 'Failed to change password.');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  // Get all users (admin only)
  const getUsers = async () => {
    try {
      const response = await api.get('/auth/users');
      return response.data;
    } catch (err) {
      console.error('Failed to get users:', err);
      setError(err.response?.data?.message || 'Failed to fetch users.');
      return [];
    }
  };

  // Update user (admin only)
  const updateUser = async (userId, userData) => {
    try {
      setLoading(true);
      const response = await api.put(`/auth/users/${userId}`, userData);
      setError(null);
      return { success: true, message: response.data.message };
    } catch (err) {
      console.error('User update failed:', err);
      setError(err.response?.data?.message || 'Failed to update user.');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  useEffect(() => {
    loadUser();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        setError,
        login,
        logout,
        registerUser,
        changePassword,
        getUsers,
        updateUser,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;