import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGallery } from '../contexts/GalleryContext';
import GalleryControls from '../components/gallery/GalleryControls';
import GalleryGrid from '../components/gallery/GalleryGrid';

/**
 * Dashboard page component
 * Shows overview of user's galleries and recent activity
 */
const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const { galleries, loading, fetchGalleries } = useGallery();
  const navigate = useNavigate();

  // Fetch galleries when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchGalleries();
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, fetchGalleries, navigate]);

  // Stats to display on the dashboard
  const stats = [
    {
      title: 'Galleries',
      value: galleries.length,
      icon: '🖼️'
    },
    {
      title: 'Photos',
      value: galleries.reduce((total, gallery) => total + gallery.photoCount, 0),
      icon: '📷'
    },
    {
      title: 'Shared',
      value: galleries.filter(gallery => !gallery.isPrivate).length,
      icon: '🔗'
    }
  ];

  // Recent activity data (would come from API in production)
  const recentActivity = [
    {
      type: 'upload',
      details: 'Uploaded 12 new photos to "Vacation" gallery',
      time: '2 hours ago'
    },
    {
      type: 'share',
      details: 'Shared "Family Reunion" gallery with 5 people',
      time: '1 day ago'
    },
    {
      type: 'edit',
      details: 'Edited photo metadata in "Nature" gallery',
      time: '3 days ago'
    }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      {/* Welcome message */}
      <div className="welcome-card">
        <div className="welcome-content">
          <h2 className="welcome-title">
            Welcome back, {user?.name || 'User'}!
          </h2>
          <p className="welcome-message">
            Here's what's happening with your photos
          </p>
        </div>
      </div>

      {/* Stats section */}
      <div className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-details">
                <h3 className="stat-title">{stat.title}</h3>
                <div className="stat-value">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity section */}
      <div className="activity-section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list">
          {recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">
                {activity.type === 'upload' && '📤'}
                {activity.type === 'share' && '🔗'}
                {activity.type === 'edit' && '✏️'}
              </div>
              <div className="activity-content">
                <p className="activity-details">{activity.details}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Galleries section */}
      <div className="galleries-section">
        <div className="section-header">
          <h2 className="section-title">Your Galleries</h2>
        </div>
        
        <GalleryControls />
        <GalleryGrid galleries={galleries} loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;
