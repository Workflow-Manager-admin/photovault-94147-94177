/**
 * Gallery service for PhotoVault
 * Handles operations related to gallery management including CRUD operations
 * and photo management within galleries
 */

// Simulated API endpoint base URL (would be replaced with real endpoint in production)
const API_URL = '/api/galleries';

/**
 * Fetch all galleries for the current user
 * 
 * @returns {Promise<Array>} List of galleries
 */
export const fetchGalleries = async () => {
  // This would be an actual API call in production
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Vacation Photos',
          description: 'Photos from my last vacation',
          coverImage: 'https://via.placeholder.com/300',
          photoCount: 24,
          isPrivate: false,
          createdAt: '2023-05-15T10:30:00Z',
        },
        {
          id: 2,
          name: 'Family',
          description: 'Family photos',
          coverImage: 'https://via.placeholder.com/300',
          photoCount: 56,
          isPrivate: true,
          createdAt: '2023-04-20T14:22:00Z',
        },
        {
          id: 3,
          name: 'Nature',
          description: 'Beautiful landscapes and wildlife',
          coverImage: 'https://via.placeholder.com/300',
          photoCount: 32,
          isPrivate: false,
          createdAt: '2023-03-10T09:15:00Z',
        }
      ]);
    }, 1000);
  });
};

/**
 * Fetch a specific gallery with its photos
 * 
 * @param {number|string} galleryId - ID of the gallery to fetch
 * @returns {Promise<Object>} Gallery details including photos
 */
export const fetchGallery = async (galleryId) => {
  // This would be an actual API call in production
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Convert to number for comparison if string is passed
      const id = typeof galleryId === 'string' ? parseInt(galleryId, 10) : galleryId;
      
      // Mock gallery data
      const galleryData = {
        1: {
          id: 1,
          name: 'Vacation Photos',
          description: 'Photos from my last vacation',
          coverImage: 'https://via.placeholder.com/300',
          isPrivate: false,
          createdAt: '2023-05-15T10:30:00Z',
          photos: Array.from({ length: 24 }, (_, i) => ({
            id: i + 1,
            url: `https://via.placeholder.com/800x600?text=Vacation${i + 1}`,
            thumbnail: `https://via.placeholder.com/200x150?text=VacThumb${i + 1}`,
            title: `Vacation Photo ${i + 1}`,
            description: `Beautiful scene from my vacation - photo ${i + 1}`,
            dateAdded: '2023-05-15T10:30:00Z',
            privacy: i % 3 === 0 ? 'private' : 'public',
            metadata: {
              location: 'Beach Resort',
              camera: 'iPhone 13 Pro',
              size: '3.2MB'
            }
          }))
        },
        2: {
          id: 2,
          name: 'Family',
          description: 'Family photos',
          coverImage: 'https://via.placeholder.com/300',
          isPrivate: true,
          createdAt: '2023-04-20T14:22:00Z',
          photos: Array.from({ length: 15 }, (_, i) => ({
            id: i + 100,
            url: `https://via.placeholder.com/800x600?text=Family${i + 1}`,
            thumbnail: `https://via.placeholder.com/200x150?text=FamThumb${i + 1}`,
            title: `Family Photo ${i + 1}`,
            description: `Family gathering - photo ${i + 1}`,
            dateAdded: '2023-04-20T14:22:00Z',
            privacy: 'private',
            metadata: {
              location: 'Home',
              camera: 'Canon EOS R5',
              size: '5.7MB'
            }
          }))
        },
        3: {
          id: 3,
          name: 'Nature',
          description: 'Beautiful landscapes and wildlife',
          coverImage: 'https://via.placeholder.com/300',
          isPrivate: false,
          createdAt: '2023-03-10T09:15:00Z',
          photos: Array.from({ length: 32 }, (_, i) => ({
            id: i + 200,
            url: `https://via.placeholder.com/800x600?text=Nature${i + 1}`,
            thumbnail: `https://via.placeholder.com/200x150?text=NatThumb${i + 1}`,
            title: `Nature Photo ${i + 1}`,
            description: `Beautiful landscape - photo ${i + 1}`,
            dateAdded: '2023-03-10T09:15:00Z',
            privacy: 'public',
            metadata: {
              location: 'National Park',
              camera: 'Sony A7 IV',
              size: '8.1MB'
            }
          }))
        }
      };
      
      if (galleryData[id]) {
        resolve(galleryData[id]);
      } else {
        reject(new Error('Gallery not found'));
      }
    }, 1000);
  });
};

/**
 * Create a new gallery
 * 
 * @param {Object} galleryData - Gallery details
 * @returns {Promise<Object>} Created gallery
 */
export const createGallery = async (galleryData) => {
  // This would be an actual API call in production
  return new Promise((resolve) => {
    setTimeout(() => {
      const newGallery = {
        ...galleryData,
        id: Date.now(),
        photoCount: 0,
        createdAt: new Date().toISOString(),
      };
      resolve(newGallery);
    }, 1000);
  });
};

/**
 * Update gallery details
 * 
 * @param {number|string} galleryId - ID of the gallery to update
 * @param {Object} galleryData - Updated gallery details
 * @returns {Promise<Object>} Updated gallery
 */
export const updateGallery = async (galleryId, galleryData) => {
  // This would be an actual API call in production
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In a real application, we'd make an API call here
      // For now, we'll just return the merged data
      resolve({
        id: galleryId,
        ...galleryData,
        updatedAt: new Date().toISOString()
      });
    }, 1000);
  });
};

/**
 * Delete a gallery
 * 
 * @param {number|string} galleryId - ID of the gallery to delete
 * @returns {Promise<boolean>} Success status
 */
export const deleteGallery = async (galleryId) => {
  // This would be an actual API call in production
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real application, we'd make an API call here
      resolve({ success: true });
    }, 1000);
  });
};

/**
 * Add photos to a gallery
 * 
 * @param {number|string} galleryId - ID of the gallery
 * @param {Array<Object>} photos - Array of photo objects
 * @returns {Promise<Object>} Updated gallery with new photos
 */
export const addPhotosToGallery = async (galleryId, photos) => {
  // This would be an actual API call in production
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        addedCount: photos.length,
        galleryId: galleryId
      });
    }, 1500);
  });
};

/**
 * Remove photos from a gallery
 * 
 * @param {number|string} galleryId - ID of the gallery
 * @param {Array<number|string>} photoIds - Array of photo IDs to remove
 * @returns {Promise<Object>} Success status
 */
export const removePhotosFromGallery = async (galleryId, photoIds) => {
  // This would be an actual API call in production
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        removedCount: photoIds.length,
        galleryId: galleryId
      });
    }, 1000);
  });
};

/**
 * Update photo details
 * 
 * @param {number|string} photoId - ID of the photo
 * @param {Object} photoData - Updated photo details
 * @returns {Promise<Object>} Updated photo
 */
export const updatePhoto = async (photoId, photoData) => {
  // This would be an actual API call in production
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: photoId,
        ...photoData,
        updatedAt: new Date().toISOString()
      });
    }, 800);
  });
};

/**
 * Update privacy settings for photos
 * 
 * @param {Array<number|string>} photoIds - Array of photo IDs
 * @param {string} privacy - Privacy setting ('public', 'private', 'shared')
 * @returns {Promise<Object>} Success status
 */
export const updatePhotosPrivacy = async (photoIds, privacy) => {
  // This would be an actual API call in production
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        updatedCount: photoIds.length,
        privacy: privacy
      });
    }, 800);
  });
};

/**
 * Share a gallery with specific users
 * 
 * @param {number|string} galleryId - ID of the gallery
 * @param {Array<Object>} shareSettings - Sharing configuration
 * @returns {Promise<Object>} Sharing result with links or status
 */
export const shareGallery = async (galleryId, shareSettings) => {
  // This would be an actual API call in production
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        galleryId: galleryId,
        shareLink: `https://photovault.example.com/shared/gallery/${galleryId}`,
        expiresAt: shareSettings.expiresAt || null,
        recipients: shareSettings.recipients || [],
        permissions: shareSettings.permissions || 'view'
      });
    }, 1200);
  });
};
