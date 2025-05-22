/**
 * Utilities for date formatting and manipulation
 */

/**
 * Format a date string or timestamp to a human-readable format
 * 
 * @param {string|number|Date} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Default formatting options
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options
    };
    
    return dateObj.toLocaleDateString(undefined, defaultOptions);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Get a relative time string (e.g. "2 hours ago", "3 days ago")
 * 
 * @param {string|number|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const getRelativeTimeString = (date) => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now - dateObj) / 1000);
    
    // Less than a minute
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    // Less than an hour
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    // Less than a day
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    // Less than a week
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
    
    // Less than a month
    if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    
    // Less than a year
    if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
    
    // More than a year
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  } catch (error) {
    console.error('Error calculating relative time:', error);
    return 'Unknown date';
  }
};

/**
 * Group dates by year, month, or day
 * 
 * @param {Array<Object>} items - Array of objects containing dates
 * @param {string} dateField - Field name containing the date
 * @param {string} groupBy - Grouping type ('year', 'month', 'day')
 * @returns {Object} Grouped items
 */
export const groupByDate = (items, dateField = 'createdAt', groupBy = 'day') => {
  try {
    return items.reduce((grouped, item) => {
      const date = new Date(item[dateField]);
      
      let key;
      if (groupBy === 'year') {
        key = date.getFullYear().toString();
      } else if (groupBy === 'month') {
        key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      } else {
        key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      }
      
      if (!grouped[key]) {
        grouped[key] = [];
      }
      
      grouped[key].push(item);
      return grouped;
    }, {});
  } catch (error) {
    console.error('Error grouping by date:', error);
    return {};
  }
};
