import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Import page components
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';

// This is just a placeholder for routes that haven't been implemented yet
const PlaceholderPage = ({ title }) => (
  <div className="placeholder-page">
    <h1>{title}</h1>
    <p>This page is under construction.</p>
  </div>
);

/**
 * Route guard for protected routes
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  // If still checking authentication status, show loading
  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render the protected route
  return children;
};

/**
 * AppRoutes component defines all application routes
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<PlaceholderPage title="Features" />} />
      <Route path="/pricing" element={<PlaceholderPage title="Pricing" />} />
      <Route path="/about" element={<PlaceholderPage title="About" />} />
      <Route path="/login" element={<PlaceholderPage title="Login" />} />
      <Route path="/signup" element={<PlaceholderPage title="Sign Up" />} />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/galleries" 
        element={
          <ProtectedRoute>
            <PlaceholderPage title="My Galleries" />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/gallery/:id" 
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Gallery View" />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/shared" 
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Shared with Me" />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/favorites" 
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Favorites" />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <PlaceholderPage title="User Profile" />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <PlaceholderPage title="Settings" />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all route for 404s */}
      <Route path="*" element={<PlaceholderPage title="Page Not Found - 404" />} />
    </Routes>
  );
};

export default AppRoutes;
