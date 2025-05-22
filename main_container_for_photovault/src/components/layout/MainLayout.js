import React from 'react';
import { useUI } from '../../contexts/UIContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

/**
 * MainLayout component for the PhotoVault application
 * Provides the overall layout structure with header, sidebar, content area, and footer
 */
const MainLayout = ({ children }) => {
  const { theme, sidebarOpen } = useUI();

  return (
    <div className={`app-layout ${theme}-theme ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <Header />
      
      <div className="layout-container">
        <Sidebar />
        
        <main className="main-content">
          <div className="content-wrapper">
            {children}
          </div>
          
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
