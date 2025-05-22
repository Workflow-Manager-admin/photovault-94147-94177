import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state for authentication
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null
};

// Actions for authentication
export const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_LOADING: 'SET_LOADING',
};

// Reducer for handling authentication state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

// Create the context
const AuthContext = createContext();

// Create a custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in on mount (using localStorage as a placeholder)
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: user
          });
        } else {
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    
    // Simulate API call for now
    try {
      // This would be replaced with actual API call in production
      setTimeout(() => {
        const mockUser = {
          id: 1,
          name: 'Demo User',
          email: credentials.email,
          avatar: 'https://via.placeholder.com/150',
        };

        localStorage.setItem('user', JSON.stringify(mockUser));
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: mockUser
        });
      }, 1000);
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: 'Login failed. Please check your credentials.'
      });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  // Clear any authentication errors
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Values provided to consumers of this context
  const value = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
