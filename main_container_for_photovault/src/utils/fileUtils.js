/**
 * Utilities for file handling and manipulation
 */

/**
 * Get a human-readable file size
 * 
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};

/**
 * Check if a file is an image
 * 
 * @param {File} file - File to check
 * @returns {boolean} Whether the file is an image
 */
export const isImageFile = (file) => {
  return file && file.type && file.type.startsWith('image/');
};

/**
 * Check if a file is a video
 * 
 * @param {File} file - File to check
 * @returns {boolean} Whether the file is a video
 */
export const isVideoFile = (file) => {
  return file && file.type && file.type.startsWith('video/');
};

/**
 * Get image dimensions from a File or Blob
 * 
 * @param {File|Blob} file - Image file
 * @returns {Promise<{width: number, height: number}>} Image dimensions
 */
export const getImageDimensions = (file) => {
  return new Promise((resolve, reject) => {
    if (!isImageFile(file)) {
      reject(new Error('Not an image file'));
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src); // Clean up
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src); // Clean up
      reject(new Error('Error loading image'));
    };
    
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Resize an image file
 * 
 * @param {File|Blob} file - Image file to resize
 * @param {number} maxWidth - Maximum width
 * @param {number} maxHeight - Maximum height
 * @param {number} quality - JPEG quality (0-1)
 * @returns {Promise<Blob>} Resized image blob
 */
export const resizeImage = async (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
  if (!isImageFile(file)) {
    throw new Error('Not an image file');
  }
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let width = img.naturalWidth;
      let height = img.naturalHeight;
      
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round(height * maxWidth / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round(width * maxHeight / height);
          height = maxHeight;
        }
      }
      
      // Create canvas for resizing
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      // Draw and resize image on canvas
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to resize image'));
        }
        
        // Clean up
        URL.revokeObjectURL(img.src);
      }, file.type, quality);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Error loading image for resizing'));
    };
    
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Generate a file preview URL
 * 
 * @param {File|Blob} file - File to generate preview for
 * @returns {string|null} Preview URL or null if not supported
 */
export const getFilePreviewUrl = (file) => {
  if (!file) return null;
  
  if (isImageFile(file) || isVideoFile(file)) {
    return URL.createObjectURL(file);
  }
  
  // Return appropriate icon based on file type
  const fileExt = file.name?.split('.').pop()?.toLowerCase() || '';
  
  // This would be replaced with actual icon URLs in a real implementation
  const iconMap = {
    pdf: '/icons/pdf.svg',
    doc: '/icons/doc.svg',
    docx: '/icons/doc.svg',
    xls: '/icons/xls.svg',
    xlsx: '/icons/xls.svg',
    txt: '/icons/txt.svg'
  };
  
  return iconMap[fileExt] || '/icons/file.svg';
};

/**
 * Clean up file preview URLs to prevent memory leaks
 * 
 * @param {string|Array<string>} urls - URL or array of URLs to revoke
 */
export const revokePreviewUrls = (urls) => {
  if (!urls) return;
  
  if (Array.isArray(urls)) {
    urls.forEach(url => {
      if (url && typeof url === 'string' && url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
  } else if (typeof urls === 'string' && urls.startsWith('blob:')) {
    URL.revokeObjectURL(urls);
  }
};
