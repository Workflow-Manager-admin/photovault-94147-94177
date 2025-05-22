import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component for the PhotoVault application
 * Contains links, copyright, and secondary information
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Footer logo and description */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-symbol">📷</span>
              <span className="logo-text">PhotoVault</span>
            </div>
            <p className="footer-description">
              A secure and beautiful way to store, organize, and share your photos.
            </p>
          </div>
          
          {/* Footer navigation */}
          <div className="footer-links">
            <div className="footer-links-group">
              <h4 className="footer-heading">Product</h4>
              <ul className="footer-list">
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/download">Download</Link></li>
                <li><Link to="/updates">Updates</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-group">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-list">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/team">Team</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/careers">Careers</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-group">
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-list">
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/status">System Status</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-group">
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-list">
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/cookies">Cookies</Link></li>
                <li><Link to="/compliance">Compliance</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Footer bottom section */}
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {currentYear} PhotoVault. All rights reserved.
          </div>
          
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
