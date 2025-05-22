/**
 * Utilities for privacy and security features
 */

/**
 * Privacy levels for photos and galleries
 */
export const PRIVACY_LEVELS = {
  PUBLIC: 'public', // Visible to everyone
  UNLISTED: 'unlisted', // Accessible only via direct link
  SHARED: 'shared', // Shared with specific users
  PRIVATE: 'private', // Only visible to owner
};

/**
 * Check if a user has permission to view an item
 * 
 * @param {Object} item - Gallery or photo item
 * @param {Object} user - Current user
 * @param {Object} options - Additional options
 * @returns {boolean} Whether the user has permission
 */
export const hasViewPermission = (item, user, options = {}) => {
  // If no item or no privacy level, deny access
  if (!item || !item.privacy) return false;
  
  // If user is the owner, allow access
  if (user && item.ownerId === user.id) return true;
  
  // Check based on privacy level
  switch (item.privacy) {
    case PRIVACY_LEVELS.PUBLIC:
      return true;
    
    case PRIVACY_LEVELS.UNLISTED:
      // Unlisted items are accessible with direct link (e.g. via share token)
      return !!options.shareToken;
    
    case PRIVACY_LEVELS.SHARED:
      // Check if user is in the shared list
      return !!(
        user && 
        Array.isArray(item.sharedWith) && 
        item.sharedWith.includes(user.id)
      );
    
    case PRIVACY_LEVELS.PRIVATE:
      // Private items are only visible to owner (already checked above)
      return false;
    
    default:
      return false;
  }
};

/**
 * Check if a user has permission to edit an item
 * 
 * @param {Object} item - Gallery or photo item
 * @param {Object} user - Current user
 * @returns {boolean} Whether the user has permission
 */
export const hasEditPermission = (item, user) => {
  // Only the owner can edit
  return !!(user && item && item.ownerId === user.id);
};

/**
 * Generate a secure share token
 * 
 * @returns {string} Share token
 */
export const generateShareToken = () => {
  // In a real app, we'd use a more secure method
  // This is just a placeholder implementation
  const randomPart = Math.random().toString(36).substring(2, 15);
  const timePart = Date.now().toString(36);
  return `${randomPart}-${timePart}`;
};

/**
 * Generate expiration options for sharing
 * 
 * @returns {Array<Object>} Expiration options
 */
export const getExpirationOptions = () => {
  return [
    { value: null, label: 'Never expires' },
    { value: 3600, label: '1 hour' },
    { value: 86400, label: '24 hours' },
    { value: 604800, label: '7 days' },
    { value: 2592000, label: '30 days' },
  ];
};

/**
 * Calculate expiration date from seconds
 * 
 * @param {number} seconds - Seconds until expiration
 * @returns {Date|null} Expiration date or null if never expires
 */
export const calculateExpirationDate = (seconds) => {
  if (!seconds) return null;
  
  const now = new Date();
  return new Date(now.getTime() + seconds * 1000);
};

/**
 * Check if a share link has expired
 * 
 * @param {Object} shareLink - Share link object with expiresAt field
 * @returns {boolean} Whether the link has expired
 */
export const isShareLinkExpired = (shareLink) => {
  if (!shareLink || !shareLink.expiresAt) return false;
  
  const now = new Date();
  const expiresAt = new Date(shareLink.expiresAt);
  
  return now > expiresAt;
};
