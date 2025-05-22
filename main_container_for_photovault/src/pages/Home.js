import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Home page component
 * Landing page for the PhotoVault application
 */
const Home = () => {
  const { isAuthenticated } = useAuth();

  // Features list to display on the landing page
  const features = [
    {
      title: 'Secure Storage',
      description: 'Your photos are securely stored with end-to-end encryption.',
      icon: '🔒'
    },
    {
      title: 'Smart Organization',
      description: 'Easily organize photos into galleries with advanced tagging.',
      icon: '📁'
    },
    {
      title: 'Advanced Editing',
      description: 'Edit your photos with professional tools right in the app.',
      icon: '✏️'
    },
    {
      title: 'Private Sharing',
      description: 'Share photos securely with the people you choose.',
      icon: '🔗'
    },
    {
      title: 'AI-Powered Search',
      description: 'Find any photo instantly with smart search capabilities.',
      icon: '🔍'
    },
    {
      title: 'Cross-Platform',
      description: 'Access your photos from any device, anywhere.',
      icon: '📱'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="title">Your photos, secured and organized.</h1>
            <p className="description">
              PhotoVault helps you store, organize, and share your memories 
              with privacy and security at its core.
            </p>

            <div className="hero-buttons">
              {isAuthenticated ? (
                <Link to="/galleries" className="btn btn-large">
                  Go to My Galleries
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="btn btn-large">
                    Get Started
                  </Link>
                  <Link to="/features" className="btn btn-outline btn-large">
                    Learn More
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="hero-image">
            <img 
              src="https://via.placeholder.com/600x400?text=PhotoVault+Demo" 
              alt="PhotoVault Application Demo"
            />
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Features</h2>
          <p className="section-description">
            Everything you need to keep your photos safe and organized.
          </p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to secure your memories?</h2>
            <p className="cta-description">
              Join thousands of users who trust PhotoVault for 
              storing their precious moments.
            </p>
            
            {!isAuthenticated && (
              <div className="cta-buttons">
                <Link to="/signup" className="btn btn-large">
                  Sign Up Now
                </Link>
                <Link to="/login" className="btn btn-link btn-large">
                  Already have an account? Log in
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
