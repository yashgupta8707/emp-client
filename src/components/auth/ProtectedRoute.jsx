import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingScreen from '../ui/LoadingScreen';

// Protected route component that redirects to login if not authenticated
const ProtectedRoute = ({ requireAdmin = false }) => {
  const { user, loading } = useAuth();

  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingScreen />;
  }

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If admin is required and user is not admin, redirect to home
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Render child routes
  return <Outlet />;
};

export default ProtectedRoute;