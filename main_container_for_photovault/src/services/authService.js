/**
 * Authentication service for PhotoVault
 * Handles user authentication, registration, and related operations
 */

// Simulated API endpoint base URL (would be replaced with real endpoint in production)
const API_URL = '/api/auth';

/**
 * Log in a user with email and password
 * 
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data
 */
export const login = async (email, password) => {
  // This would be an actual API call in production
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful login for demo purposes
      if (email && password) {
        resolve({
          id: 1,
          name: 'Demo User',
          email: email,
          avatar: 'https://via.placeholder.com/150',
          token: 'mock-jwt-token'
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

/**
 * Register a new user
 * 
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Created user data
 */
export const register = async (userData) => {
  // This would be an actual API call in production
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.email && userData.password) {
        resolve({
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          avatar: null,
          token: 'mock-jwt-token'
        });
      } else {
        reject(new Error('Invalid user data'));
      }
    }, 1000);
  });
};

/**
 * Log out the current user
 * 
 * @returns {Promise<void>}
 */
export const logout = async () => {
  // This would be an actual API call in production
  return new Promise((resolve) => {
    setTimeout(() => {
      // Clear any stored tokens from localStorage
      localStorage.removeItem('user');
      resolve();
    }, 300);
  });
};

/**
 * Verify the current authentication token
 * 
 * @returns {Promise<Object>} User data if token is valid
 */
export const verifyToken = async () => {
  // This would be an actual API call in production
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = localStorage.getItem('user');
      if (user) {
        resolve(JSON.parse(user));
      } else {
        reject(new Error('Invalid or expired token'));
      }
    }, 500);
  });
};

/**
 * Update user profile information
 * 
 * @param {Object} profileData - Updated profile data
 * @returns {Promise<Object>} Updated user data
 */
export const updateProfile = async (profileData) => {
  // This would be an actual API call in production
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          reject(new Error('Not authenticated'));
          return;
        }

        const updatedUser = {
          ...user,
          ...profileData,
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));
        resolve(updatedUser);
      } catch (error) {
        reject(new Error('Failed to update profile'));
      }
    }, 1000);
  });
};

/**
 * Request a password reset for a user
 * 
 * @param {string} email - User email address
 * @returns {Promise<void>}
 */
export const requestPasswordReset = async (email) => {
  // This would be an actual API call in production
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email) {
        resolve({ success: true });
      } else {
        reject(new Error('Email is required'));
      }
    }, 1000);
  });
};
