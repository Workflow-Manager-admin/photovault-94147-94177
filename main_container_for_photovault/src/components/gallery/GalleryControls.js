import React, { useState } from 'react';
import { useGallery } from '../../contexts/GalleryContext';
import { useUI } from '../../contexts/UIContext';

/**
 * GalleryControls component provides controls for gallery management
 * Including view options, sorting, filtering and batch actions
 */
const GalleryControls = () => {
  const { 
    viewMode, 
    setViewMode, 
    gridColumns, 
    setGridColumns,
    openUploadModal 
  } = useUI();
  
  const { 
    selectedPhotos, 
    clearSelection 
  } = useGallery();
  
  const [sortBy, setSortBy] = useState('newest');

  // Handler for view mode toggle
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Handler for grid columns change
  const handleGridColumnsChange = (e) => {
    const columns = parseInt(e.target.value, 10);
    setGridColumns(columns);
  };

  // Handler for sort order change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="gallery-controls">
      <div className="controls-section">
        {/* Create gallery / upload buttons */}
        <div className="primary-controls">
          <button className="btn btn-primary create-btn">
            New Gallery
          </button>
          <button 
            className="btn btn-secondary upload-btn"
            onClick={() => openUploadModal()}
          >
            Upload Photos
          </button>
        </div>
        
        {/* View controls */}
        <div className="view-controls">
          <div className="view-mode-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('grid')}
              title="Grid view"
            >
              📱
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('list')}
              title="List view"
            >
              📋
            </button>
          </div>
          
          {viewMode === 'grid' && (
            <div className="columns-control">
              <label htmlFor="grid-columns">Columns:</label>
              <select 
                id="grid-columns" 
                value={gridColumns}
                onChange={handleGridColumnsChange}
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          )}
          
          <div className="sort-control">
            <label htmlFor="sort-by">Sort by:</label>
            <select 
              id="sort-by" 
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="photos-most">Most Photos</option>
              <option value="photos-least">Least Photos</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Batch actions - visible when items are selected */}
      {selectedPhotos.length > 0 && (
        <div className="batch-actions">
          <div className="selection-info">
            <span className="selected-count">
              {selectedPhotos.length} {selectedPhotos.length === 1 ? 'item' : 'items'} selected
            </span>
            <button 
              className="clear-selection-btn"
              onClick={() => clearSelection()}
            >
              Clear
            </button>
          </div>
          
          <div className="batch-buttons">
            <button className="batch-btn delete-btn">
              Delete
            </button>
            <button className="batch-btn move-btn">
              Move
            </button>
            <button className="batch-btn privacy-btn">
              Privacy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryControls;
