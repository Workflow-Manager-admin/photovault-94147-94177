import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useUI } from '../../contexts/UIContext';

/**
 * Sidebar component for the PhotoVault application
 * Contains primary navigation and filters
 */
const Sidebar = () => {
  const { isAuthenticated } = useAuth();
  const { sidebarOpen } = useUI();
  const location = useLocation();

  // Function to determine if a navigation item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Guest navigation items
  const guestNavItems = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/features', label: 'Features', icon: '✨' },
    { to: '/pricing', label: 'Pricing', icon: '💰' },
    { to: '/about', label: 'About', icon: 'ℹ️' },
  ];

  // Authenticated user navigation items
  const userNavItems = [
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/galleries', label: 'My Galleries', icon: '🖼️' },
    { to: '/shared', label: 'Shared with Me', icon: '🔄' },
    { to: '/favorites', label: 'Favorites', icon: '⭐' },
    { to: '/recent', label: 'Recent', icon: '🕒' },
  ];

  // Filter categories for authenticated users
  const filters = [
    { id: 'privacy', label: 'Privacy', 
      options: [
        { id: 'private', label: 'Private' },
        { id: 'public', label: 'Public' },
        { id: 'shared', label: 'Shared' },
      ] 
    },
    { id: 'date', label: 'Date', 
      options: [
        { id: 'today', label: 'Today' },
        { id: 'this-week', label: 'This Week' },
        { id: 'this-month', label: 'This Month' },
        { id: 'this-year', label: 'This Year' },
      ] 
    },
    { id: 'tags', label: 'Tags', 
      options: [
        { id: 'family', label: 'Family' },
        { id: 'vacation', label: 'Vacation' },
        { id: 'nature', label: 'Nature' },
        { id: 'events', label: 'Events' },
      ] 
    },
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {(isAuthenticated ? userNavItems : guestNavItems).map((item) => (
              <li key={item.to} className={`nav-item ${isActive(item.to) ? 'active' : ''}`}>
                <Link to={item.to} className="nav-link">
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {isAuthenticated && (
          <div className="sidebar-filters">
            <h3 className="filters-heading">Filters</h3>
            
            {filters.map((filter) => (
              <div key={filter.id} className="filter-group">
                <h4 className="filter-heading">{filter.label}</h4>
                <ul className="filter-options">
                  {filter.options.map((option) => (
                    <li key={option.id} className="filter-option">
                      <label className="filter-label">
                        <input type="checkbox" className="filter-checkbox" />
                        <span className="filter-text">{option.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {isAuthenticated && (
          <div className="sidebar-footer">
            <div className="storage-info">
              <div className="storage-text">
                <span>Storage: 35% used</span>
                <span className="storage-details">3.5GB / 10GB</span>
              </div>
              <div className="storage-bar">
                <div className="storage-progress" style={{ width: '35%' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
