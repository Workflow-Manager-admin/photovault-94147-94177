import React from 'react';
import { Link } from 'react-router-dom';
import { useGallery } from '../../contexts/GalleryContext';
import { useUI } from '../../contexts/UIContext';

/**
 * GalleryItem component represents an individual gallery in the grid
 * Includes cover image, gallery details and action buttons
 */
const GalleryItem = ({ gallery, isSelected }) => {
  const { 
    selectPhoto, 
    deselectPhoto 
  } = useGallery();
  
  const { 
    openShareModal, 
    openEditModal 
  } = useUI();

  const handleSelection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSelected) {
      deselectPhoto(gallery.id);
    } else {
      selectPhoto(gallery.id);
    }
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openShareModal(gallery);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openEditModal(gallery);
  };

  return (
    <div className={`gallery-item ${isSelected ? 'selected' : ''}`}>
      <Link to={`/gallery/${gallery.id}`} className="gallery-link">
        <div className="gallery-card">
          {/* Gallery cover image */}
          <div className="gallery-cover">
            <img 
              src={gallery.coverImage || 'https://via.placeholder.com/300x200?text=No+Cover'} 
              alt={gallery.name} 
              className="cover-image"
            />
            
            {/* Selection checkbox overlay */}
            <div className="selection-overlay">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={isSelected}
                  onChange={handleSelection}
                  className="selection-checkbox"
                />
                <span className="checkbox-custom"></span>
              </label>
            </div>
            
            {/* Privacy indicator */}
            {gallery.isPrivate && (
              <div className="privacy-indicator" title="Private gallery">
                🔒
              </div>
            )}
          </div>
          
          {/* Gallery info */}
          <div className="gallery-info">
            <h3 className="gallery-name">{gallery.name}</h3>
            <p className="gallery-meta">
              <span className="photo-count">{gallery.photoCount} photos</span>
              <span className="gallery-date">
                {new Date(gallery.createdAt).toLocaleDateString()}
              </span>
            </p>
            
            {gallery.description && (
              <p className="gallery-description">{gallery.description}</p>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="gallery-actions">
            <button 
              className="action-btn edit-btn" 
              onClick={handleEditClick}
              title="Edit gallery"
            >
              ✏️
            </button>
            <button 
              className="action-btn share-btn" 
              onClick={handleShareClick}
              title="Share gallery"
            >
              🔗
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GalleryItem;
