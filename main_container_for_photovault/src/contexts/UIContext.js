import React, { createContext, useContext, useReducer } from 'react';

// Initial state for UI-related settings and preferences
const initialState = {
  theme: 'dark', // 'light' or 'dark'
  sidebarOpen: window.innerWidth >= 768, // Open by default on larger screens
  viewMode: 'grid', // 'grid' or 'list' 
  gridColumns: 4, // Number of columns in grid view
  notifications: [],
  isUploadModalOpen: false,
  isEditModalOpen: false,
  isShareModalOpen: false,
  currentModalData: null,
};

// Actions for UI operations
export const UI_ACTIONS = {
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_THEME: 'SET_THEME',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_SIDEBAR: 'SET_SIDEBAR',
  SET_VIEW_MODE: 'SET_VIEW_MODE',
  SET_GRID_COLUMNS: 'SET_GRID_COLUMNS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  CLEAR_NOTIFICATIONS: 'CLEAR_NOTIFICATIONS',
  OPEN_UPLOAD_MODAL: 'OPEN_UPLOAD_MODAL',
  CLOSE_UPLOAD_MODAL: 'CLOSE_UPLOAD_MODAL',
  OPEN_EDIT_MODAL: 'OPEN_EDIT_MODAL',
  CLOSE_EDIT_MODAL: 'CLOSE_EDIT_MODAL',
  OPEN_SHARE_MODAL: 'OPEN_SHARE_MODAL',
  CLOSE_SHARE_MODAL: 'CLOSE_SHARE_MODAL',
  SET_MODAL_DATA: 'SET_MODAL_DATA',
};

// Reducer for handling UI state changes
const uiReducer = (state, action) => {
  switch (action.type) {
    case UI_ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'dark' ? 'light' : 'dark'
      };
    case UI_ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case UI_ACTIONS.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      };
    case UI_ACTIONS.SET_SIDEBAR:
      return {
        ...state,
        sidebarOpen: action.payload
      };
    case UI_ACTIONS.SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload
      };
    case UI_ACTIONS.SET_GRID_COLUMNS:
      return {
        ...state,
        gridColumns: action.payload
      };
    case UI_ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, {
          ...action.payload,
          id: Date.now()
        }]
      };
    case UI_ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    case UI_ACTIONS.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: []
      };
    case UI_ACTIONS.OPEN_UPLOAD_MODAL:
      return {
        ...state,
        isUploadModalOpen: true
      };
    case UI_ACTIONS.CLOSE_UPLOAD_MODAL:
      return {
        ...state,
        isUploadModalOpen: false,
        currentModalData: null
      };
    case UI_ACTIONS.OPEN_EDIT_MODAL:
      return {
        ...state,
        isEditModalOpen: true
      };
    case UI_ACTIONS.CLOSE_EDIT_MODAL:
      return {
        ...state,
        isEditModalOpen: false,
        currentModalData: null
      };
    case UI_ACTIONS.OPEN_SHARE_MODAL:
      return {
        ...state,
        isShareModalOpen: true
      };
    case UI_ACTIONS.CLOSE_SHARE_MODAL:
      return {
        ...state,
        isShareModalOpen: false,
        currentModalData: null
      };
    case UI_ACTIONS.SET_MODAL_DATA:
      return {
        ...state,
        currentModalData: action.payload
      };
    default:
      return state;
  }
};

// Create the context
const UIContext = createContext();

// Create a custom hook for using the UI context
export const useUI = () => useContext(UIContext);

// Provider component
export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    dispatch({ type: UI_ACTIONS.TOGGLE_THEME });
  };

  // Set a specific theme
  const setTheme = (theme) => {
    dispatch({ type: UI_ACTIONS.SET_THEME, payload: theme });
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    dispatch({ type: UI_ACTIONS.TOGGLE_SIDEBAR });
  };

  // Explicitly set sidebar state
  const setSidebar = (isOpen) => {
    dispatch({ type: UI_ACTIONS.SET_SIDEBAR, payload: isOpen });
  };

  // Set view mode (grid or list)
  const setViewMode = (mode) => {
    dispatch({ type: UI_ACTIONS.SET_VIEW_MODE, payload: mode });
  };

  // Set number of columns in grid view
  const setGridColumns = (columns) => {
    dispatch({ type: UI_ACTIONS.SET_GRID_COLUMNS, payload: columns });
  };

  // Add a notification
  const addNotification = (notification) => {
    dispatch({
      type: UI_ACTIONS.ADD_NOTIFICATION,
      payload: {
        ...notification,
        type: notification.type || 'info',
        duration: notification.duration || 5000
      }
    });

    // Auto remove notification after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(notification.id);
      }, notification.duration || 5000);
    }
  };

  // Remove a specific notification
  const removeNotification = (id) => {
    dispatch({ type: UI_ACTIONS.REMOVE_NOTIFICATION, payload: id });
  };

  // Clear all notifications
  const clearNotifications = () => {
    dispatch({ type: UI_ACTIONS.CLEAR_NOTIFICATIONS });
  };

  // Modal control functions
  const openUploadModal = (data = null) => {
    if (data) {
      dispatch({ type: UI_ACTIONS.SET_MODAL_DATA, payload: data });
    }
    dispatch({ type: UI_ACTIONS.OPEN_UPLOAD_MODAL });
  };

  const closeUploadModal = () => {
    dispatch({ type: UI_ACTIONS.CLOSE_UPLOAD_MODAL });
  };

  const openEditModal = (data = null) => {
    if (data) {
      dispatch({ type: UI_ACTIONS.SET_MODAL_DATA, payload: data });
    }
    dispatch({ type: UI_ACTIONS.OPEN_EDIT_MODAL });
  };

  const closeEditModal = () => {
    dispatch({ type: UI_ACTIONS.CLOSE_EDIT_MODAL });
  };

  const openShareModal = (data = null) => {
    if (data) {
      dispatch({ type: UI_ACTIONS.SET_MODAL_DATA, payload: data });
    }
    dispatch({ type: UI_ACTIONS.OPEN_SHARE_MODAL });
  };

  const closeShareModal = () => {
    dispatch({ type: UI_ACTIONS.CLOSE_SHARE_MODAL });
  };

  // Values provided to consumers of this context
  const value = {
    theme: state.theme,
    sidebarOpen: state.sidebarOpen,
    viewMode: state.viewMode,
    gridColumns: state.gridColumns,
    notifications: state.notifications,
    isUploadModalOpen: state.isUploadModalOpen,
    isEditModalOpen: state.isEditModalOpen,
    isShareModalOpen: state.isShareModalOpen,
    currentModalData: state.currentModalData,
    toggleTheme,
    setTheme,
    toggleSidebar,
    setSidebar,
    setViewMode,
    setGridColumns,
    addNotification,
    removeNotification,
    clearNotifications,
    openUploadModal,
    closeUploadModal,
    openEditModal,
    closeEditModal,
    openShareModal,
    closeShareModal
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
