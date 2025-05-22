import React, { createContext, useContext, useReducer } from 'react';

// Initial state for gallery management
const initialState = {
  galleries: [],
  currentGallery: null,
  selectedPhotos: [],
  loading: false,
  error: null
};

// Actions for gallery operations
export const GALLERY_ACTIONS = {
  SET_GALLERIES: 'SET_GALLERIES',
  SET_CURRENT_GALLERY: 'SET_CURRENT_GALLERY',
  ADD_GALLERY: 'ADD_GALLERY',
  UPDATE_GALLERY: 'UPDATE_GALLERY',
  DELETE_GALLERY: 'DELETE_GALLERY',
  SELECT_PHOTO: 'SELECT_PHOTO',
  DESELECT_PHOTO: 'DESELECT_PHOTO',
  CLEAR_SELECTION: 'CLEAR_SELECTION',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer for handling gallery state changes
const galleryReducer = (state, action) => {
  switch (action.type) {
    case GALLERY_ACTIONS.SET_GALLERIES:
      return {
        ...state,
        galleries: action.payload,
        loading: false
      };
    case GALLERY_ACTIONS.SET_CURRENT_GALLERY:
      return {
        ...state,
        currentGallery: action.payload,
        loading: false
      };
    case GALLERY_ACTIONS.ADD_GALLERY:
      return {
        ...state,
        galleries: [...state.galleries, action.payload],
        loading: false
      };
    case GALLERY_ACTIONS.UPDATE_GALLERY:
      return {
        ...state,
        galleries: state.galleries.map(gallery => 
          gallery.id === action.payload.id ? action.payload : gallery
        ),
        currentGallery: state.currentGallery?.id === action.payload.id ? 
          action.payload : state.currentGallery,
        loading: false
      };
    case GALLERY_ACTIONS.DELETE_GALLERY:
      return {
        ...state,
        galleries: state.galleries.filter(gallery => gallery.id !== action.payload),
        currentGallery: state.currentGallery?.id === action.payload ? 
          null : state.currentGallery,
        loading: false
      };
    case GALLERY_ACTIONS.SELECT_PHOTO:
      return {
        ...state,
        selectedPhotos: [...state.selectedPhotos, action.payload]
      };
    case GALLERY_ACTIONS.DESELECT_PHOTO:
      return {
        ...state,
        selectedPhotos: state.selectedPhotos.filter(id => id !== action.payload)
      };
    case GALLERY_ACTIONS.CLEAR_SELECTION:
      return {
        ...state,
        selectedPhotos: []
      };
    case GALLERY_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case GALLERY_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case GALLERY_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

// Create the context
const GalleryContext = createContext();

// Custom hook for using the gallery context
export const useGallery = () => useContext(GalleryContext);

// Provider component
export const GalleryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(galleryReducer, initialState);

  // Function to fetch all galleries
  const fetchGalleries = async () => {
    dispatch({ type: GALLERY_ACTIONS.SET_LOADING, payload: true });

    try {
      // This would be replaced with actual API call in production
      setTimeout(() => {
        const mockGalleries = [
          {
            id: 1,
            name: 'Vacation Photos',
            description: 'Photos from my last vacation',
            coverImage: 'https://via.placeholder.com/300',
            photoCount: 24,
            isPrivate: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            name: 'Family',
            description: 'Family photos',
            coverImage: 'https://via.placeholder.com/300',
            photoCount: 56,
            isPrivate: true,
            createdAt: new Date().toISOString(),
          }
        ];

        dispatch({
          type: GALLERY_ACTIONS.SET_GALLERIES,
          payload: mockGalleries
        });
      }, 1000);
    } catch (error) {
      dispatch({
        type: GALLERY_ACTIONS.SET_ERROR,
        payload: 'Failed to fetch galleries. Please try again.'
      });
    }
  };

  // Function to fetch a specific gallery
  const fetchGallery = async (galleryId) => {
    dispatch({ type: GALLERY_ACTIONS.SET_LOADING, payload: true });

    try {
      // This would be replaced with actual API call in production
      setTimeout(() => {
        const mockGallery = {
          id: galleryId,
          name: galleryId === 1 ? 'Vacation Photos' : 'Family',
          description: galleryId === 1 
            ? 'Photos from my last vacation' 
            : 'Family photos',
          coverImage: 'https://via.placeholder.com/300',
          photos: Array.from({ length: galleryId === 1 ? 24 : 56 }, (_, i) => ({
            id: i + 1,
            url: `https://via.placeholder.com/800x600?text=Photo${i + 1}`,
            thumbnail: `https://via.placeholder.com/200x150?text=Thumb${i + 1}`,
            title: `Photo ${i + 1}`,
            description: `Description for photo ${i + 1}`,
            dateAdded: new Date().toISOString(),
            privacy: i % 3 === 0 ? 'private' : 'public'
          })),
          isPrivate: galleryId === 2,
          createdAt: new Date().toISOString(),
        };

        dispatch({
          type: GALLERY_ACTIONS.SET_CURRENT_GALLERY,
          payload: mockGallery
        });
      }, 1000);
    } catch (error) {
      dispatch({
        type: GALLERY_ACTIONS.SET_ERROR,
        payload: 'Failed to fetch gallery details. Please try again.'
      });
    }
  };

  // Create a new gallery
  const createGallery = async (galleryData) => {
    dispatch({ type: GALLERY_ACTIONS.SET_LOADING, payload: true });

    try {
      // This would be replaced with actual API call in production
      setTimeout(() => {
        const newGallery = {
          ...galleryData,
          id: Date.now(), // Use timestamp as temporary ID
          photoCount: 0,
          createdAt: new Date().toISOString(),
        };

        dispatch({
          type: GALLERY_ACTIONS.ADD_GALLERY,
          payload: newGallery
        });
      }, 1000);
    } catch (error) {
      dispatch({
        type: GALLERY_ACTIONS.SET_ERROR,
        payload: 'Failed to create gallery. Please try again.'
      });
    }
  };

  // Update gallery details
  const updateGallery = async (galleryId, updatedData) => {
    dispatch({ type: GALLERY_ACTIONS.SET_LOADING, payload: true });

    try {
      // This would be replaced with actual API call in production
      setTimeout(() => {
        const gallery = state.galleries.find(g => g.id === galleryId);
        if (!gallery) throw new Error('Gallery not found');

        const updatedGallery = {
          ...gallery,
          ...updatedData,
        };

        dispatch({
          type: GALLERY_ACTIONS.UPDATE_GALLERY,
          payload: updatedGallery
        });
      }, 1000);
    } catch (error) {
      dispatch({
        type: GALLERY_ACTIONS.SET_ERROR,
        payload: 'Failed to update gallery. Please try again.'
      });
    }
  };

  // Delete a gallery
  const deleteGallery = async (galleryId) => {
    dispatch({ type: GALLERY_ACTIONS.SET_LOADING, payload: true });

    try {
      // This would be replaced with actual API call in production
      setTimeout(() => {
        dispatch({
          type: GALLERY_ACTIONS.DELETE_GALLERY,
          payload: galleryId
        });
      }, 1000);
    } catch (error) {
      dispatch({
        type: GALLERY_ACTIONS.SET_ERROR,
        payload: 'Failed to delete gallery. Please try again.'
      });
    }
  };

  // Functions for photo selection (for batch operations)
  const selectPhoto = (photoId) => {
    dispatch({ type: GALLERY_ACTIONS.SELECT_PHOTO, payload: photoId });
  };

  const deselectPhoto = (photoId) => {
    dispatch({ type: GALLERY_ACTIONS.DESELECT_PHOTO, payload: photoId });
  };

  const clearSelection = () => {
    dispatch({ type: GALLERY_ACTIONS.CLEAR_SELECTION });
  };

  // Clear any gallery-related errors
  const clearError = () => {
    dispatch({ type: GALLERY_ACTIONS.CLEAR_ERROR });
  };

  // Values provided to consumers of this context
  const value = {
    galleries: state.galleries,
    currentGallery: state.currentGallery,
    selectedPhotos: state.selectedPhotos,
    loading: state.loading,
    error: state.error,
    fetchGalleries,
    fetchGallery,
    createGallery,
    updateGallery,
    deleteGallery,
    selectPhoto,
    deselectPhoto,
    clearSelection,
    clearError
  };

  return <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>;
};
