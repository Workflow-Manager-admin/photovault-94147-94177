import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useUI } from '../../contexts/UIContext';
import { Link } from 'react-router-dom';

/**
 * Header component for the PhotoVault application
 * Contains navigation, user controls, and application actions
 */
const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { 
    theme, 
    toggleTheme, 
    toggleSidebar,
    openUploadModal 
  } = useUI();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Left section: Logo and navigation toggle */}
        <div className="header-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <span className="toggle-icon">≡</span>
          </button>
          
          <Link to="/" className="logo">
            <span className="logo-symbol">📷</span>
            <span className="logo-text">PhotoVault</span>
          </Link>
        </div>

        {/* Center section: Search (when authenticated) */}
        {isAuthenticated && (
          <div className="header-center">
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search photos, galleries..." 
                className="search-input" 
              />
              <button className="search-button">🔍</button>
            </div>
          </div>
        )}

        {/* Right section: Actions and user menu */}
        <div className="header-right">
          {/* Theme toggle */}
          <button 
            className="icon-button theme-toggle" 
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {isAuthenticated ? (
            <>
              {/* Upload button */}
              <button 
                className="btn upload-btn"
                onClick={() => openUploadModal()}
              >
                Upload
              </button>

              {/* User menu */}
              <div className="user-menu">
                <div className="user-avatar">
                  <img 
                    src={user?.avatar || 'https://via.placeholder.com/40'} 
                    alt="User avatar"
                  />
                </div>
                <div className="dropdown-menu">
                  <div className="menu-header">
                    <span className="user-name">{user?.name}</span>
                    <span className="user-email">{user?.email}</span>
                  </div>
                  <div className="menu-items">
                    <Link to="/profile" className="menu-item">Profile</Link>
                    <Link to="/settings" className="menu-item">Settings</Link>
                    <button 
                      className="menu-item logout-button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-link">Log in</Link>
              <Link to="/signup" className="btn">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
