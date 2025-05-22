import { useState, useCallback } from 'react';

/**
 * Custom hook for handling API requests with loading and error states
 * 
 * @param {Function} apiFunction - The API function to call
 * @returns {Object} Object containing loading state, error, data, and execute function
 */
const useApi = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const reset = useCallback(() => {
    setError(null);
    setData(null);
    setLoading(false);
  }, []);

  return { loading, error, data, execute, reset };
};

export default useApi;
