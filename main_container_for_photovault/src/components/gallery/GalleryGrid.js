import React from 'react';
import { Link } from 'react-router-dom';
import { useGallery } from '../../contexts/GalleryContext';
import { useUI } from '../../contexts/UIContext';
import GalleryItem from './GalleryItem';

/**
 * GalleryGrid component displays galleries in a grid layout
 * Includes options for different view modes and grid sizes
 */
const GalleryGrid = ({ galleries, loading }) => {
  const { viewMode, gridColumns } = useUI();
  const { selectedPhotos } = useGallery();

  // If loading, show skeleton placeholders
  if (loading) {
    return (
      <div className={`gallery-grid ${viewMode}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="gallery-skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text skeleton-text-sm"></div>
          </div>
        ))}
      </div>
    );
  }

  // If no galleries, show empty state
  if (!galleries || galleries.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📷</div>
        <h3 className="empty-title">No galleries found</h3>
        <p className="empty-description">
          Create your first gallery to get started with organizing your photos.
        </p>
        <Link to="/create-gallery" className="btn btn-primary">
          Create Gallery
        </Link>
      </div>
    );
  }

  // Render the galleries grid
  return (
    <div 
      className={`gallery-grid ${viewMode}`} 
      style={{ 
        '--grid-columns': gridColumns 
      }}
    >
      {galleries.map(gallery => (
        <GalleryItem 
          key={gallery.id} 
          gallery={gallery}
          isSelected={selectedPhotos.includes(gallery.id)}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;
