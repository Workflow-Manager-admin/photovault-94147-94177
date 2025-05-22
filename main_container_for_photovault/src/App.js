import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

// Import context providers
import { AuthProvider } from './contexts/AuthContext';
import { UIProvider } from './contexts/UIContext';
import { GalleryProvider } from './contexts/GalleryContext';

// Import components
import MainLayout from './components/layout/MainLayout';
import AppRoutes from './routes/AppRoutes';

/**
 * Main App component for PhotoVault
 * Sets up providers and main application structure
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <UIProvider>
          <GalleryProvider>
            <MainLayout>
              <AppRoutes />
            </MainLayout>
          </GalleryProvider>
        </UIProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
