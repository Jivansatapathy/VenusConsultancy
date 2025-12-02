// client/src/components/GalleryAdmin.jsx
import React, { useState, useEffect } from 'react';
import { 
  getGalleryItems, 
  addGalleryItem, 
  updateGalleryItem, 
  deleteGalleryItem 
} from '../utils/galleryFirestore.js';
import { uploadGalleryImage } from '../utils/firebaseStorage.js';
import { migrateGalleryData, checkMigrationStatus } from '../utils/migrateGallery.js';
import './GalleryAdmin.css';

const GalleryAdmin = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState(null);
  const [migrationProgress, setMigrationProgress] = useState({ current: 0, total: 0, currentItem: null });
  const [formData, setFormData] = useState({
    eventName: '',
    location: '',
    description: '',
    attendees: '',
    orientation: 'landscape',
    image: ''
  });

  useEffect(() => {
    fetchGalleryItems();
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const status = await checkMigrationStatus();
      setMigrationStatus(status);
    } catch (error) {
      console.error('Error checking migration status:', error);
    }
  };

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const items = await getGalleryItems();
      // Sort by id descending
      items.sort((a, b) => (b.id || 0) - (a.id || 0));
      setGalleryItems(items);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      alert('Failed to load gallery items. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const imageUrl = await uploadGalleryImage(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      eventName: '',
      location: '',
      description: '',
      attendees: '',
      orientation: 'landscape',
      image: ''
    });
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setFormData({
      eventName: item.eventName || '',
      location: item.location || '',
      description: item.description || '',
      attendees: item.attendees || '',
      orientation: item.orientation || 'landscape',
      image: item.image || ''
    });
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      eventName: '',
      location: '',
      description: '',
      attendees: '',
      orientation: 'landscape',
      image: ''
    });
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.eventName || !formData.image) {
      alert('Event Name and Image are required fields.');
      return;
    }

    try {
      setUploading(true);
      
      if (editingItem) {
        // Update existing item - use docId (Firestore document ID)
        const docId = editingItem.docId || editingItem.id;
        await updateGalleryItem(docId, {
          eventName: formData.eventName,
          location: formData.location,
          description: formData.description,
          attendees: formData.attendees,
          orientation: formData.orientation,
          image: formData.image
        });
      } else {
        // Add new item
        await addGalleryItem({
          eventName: formData.eventName,
          location: formData.location,
          description: formData.description,
          attendees: formData.attendees,
          orientation: formData.orientation,
          image: formData.image
        });
      }
      
      await fetchGalleryItems();
      handleCancel();
    } catch (error) {
      console.error('Error saving gallery item:', error);
      alert('Failed to save gallery item. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.eventName}"?`)) {
      return;
    }

    try {
      // Use docId (Firestore document ID) for deletion
      const docId = item.docId || item.id;
      await deleteGalleryItem(docId, item.image);
      await fetchGalleryItems();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      alert('Failed to delete gallery item. Please try again.');
    }
  };

  const handleMigrate = async () => {
    if (!window.confirm(
      'This will upload all existing gallery images to Firebase Storage and migrate data to Firestore.\n\n' +
      'This may take several minutes. Continue?'
    )) {
      return;
    }

    try {
      setMigrating(true);
      setMigrationProgress({ current: 0, total: 0, currentItem: null });

      const results = await migrateGalleryData({
        skipExisting: true,
        onProgress: (current, total, item) => {
          setMigrationProgress({ current, total, currentItem: item });
        }
      });

      // Refresh gallery items
      await fetchGalleryItems();
      await checkStatus();

      alert(
        `Migration completed!\n\n` +
        `Total: ${results.total}\n` +
        `Successful: ${results.successful}\n` +
        `Failed: ${results.failed}\n` +
        `Skipped: ${results.skipped}`
      );
    } catch (error) {
      console.error('Migration error:', error);
      alert('Migration failed: ' + error.message);
    } finally {
      setMigrating(false);
      setMigrationProgress({ current: 0, total: 0, currentItem: null });
    }
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/venuslogo.png';
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }
    return imageUrl;
  };

  if (loading) {
    return (
      <div className="gallery-admin">
        <div className="loading">Loading gallery items...</div>
      </div>
    );
  }

  return (
    <div className="gallery-admin">
      <div className="gallery-admin__header">
        <div>
          <h2>Gallery Management</h2>
          <p>Manage gallery images - add, edit, and delete gallery items</p>
          {migrationStatus && (
            <p style={{ marginTop: '8px', fontSize: '0.9rem', color: '#666' }}>
              Migration Status: {migrationStatus.migrated}/{migrationStatus.total} items migrated ({migrationStatus.percentage}%)
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            className="btn btn-secondary"
            onClick={handleMigrate}
            disabled={showForm || migrating}
            title="Upload existing gallery images to Firebase Storage and migrate data to Firestore"
          >
            {migrating ? 'Migrating...' : '🔄 Migrate Existing Data'}
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleAdd}
            disabled={showForm || migrating}
          >
            + Add New Gallery Item
          </button>
        </div>
      </div>

      {/* Migration Progress */}
      {migrating && migrationProgress.total > 0 && (
        <div className="gallery-admin__migration-progress">
          <div className="migration-progress-bar">
            <div 
              className="migration-progress-fill"
              style={{ width: `${(migrationProgress.current / migrationProgress.total) * 100}%` }}
            />
          </div>
          <p className="migration-progress-text">
            Migrating {migrationProgress.current} of {migrationProgress.total}...
            {migrationProgress.currentItem && (
              <span className="migration-current-item"> {migrationProgress.currentItem.eventName}</span>
            )}
          </p>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="gallery-admin__form-modal">
          <div className="gallery-admin__form-content">
            <div className="gallery-admin__form-header">
              <h3>{editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}</h3>
              <button className="btn-close" onClick={handleCancel}>×</button>
            </div>

            <form onSubmit={handleSubmit} className="gallery-admin__form">
              <div className="form-group">
                <label>Event Name *</label>
                <input
                  type="text"
                  value={formData.eventName}
                  onChange={(e) => setFormData(prev => ({ ...prev, eventName: e.target.value }))}
                  placeholder="e.g., Meeting with Governor of Michigan"
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Michigan, USA"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description of what happened at the event..."
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label>Attendees / Meeting Details</label>
                <textarea
                  value={formData.attendees}
                  onChange={(e) => setFormData(prev => ({ ...prev, attendees: e.target.value }))}
                  placeholder="e.g., Venus Consultancy team met with Governor Gretchen Whitmer"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Orientation</label>
                <select
                  value={formData.orientation}
                  onChange={(e) => setFormData(prev => ({ ...prev, orientation: e.target.value }))}
                >
                  <option value="landscape">Landscape</option>
                  <option value="portrait">Portrait</option>
                </select>
                <small>Will be auto-detected, but you can set it manually</small>
              </div>

              <div className="form-group">
                <label>Image *</label>
                <div className="image-upload-section">
                  {formData.image && (
                    <div className="image-preview">
                      <img 
                        src={getImageUrl(formData.image)} 
                        alt="Preview" 
                        onError={(e) => {
                          e.target.src = '/venuslogo.png';
                        }} 
                      />
                      <button
                        type="button"
                        className="btn-remove-image"
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <div className="image-upload-controls">
                    <label className="btn btn-secondary">
                      {uploading ? 'Uploading...' : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            try {
                              await handleImageUpload(file);
                            } catch (error) {
                              // Error already handled in handleImageUpload
                            }
                          }
                        }}
                        style={{ display: 'none' }}
                        disabled={uploading}
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Or enter image URL"
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      className="image-url-input"
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCancel}
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={uploading}
                >
                  {uploading ? 'Saving...' : (editingItem ? 'Update Item' : 'Add Item')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Items List */}
      <div className="gallery-admin__list">
        <h3>Gallery Items ({galleryItems.length})</h3>
        {galleryItems.length === 0 ? (
          <div className="gallery-admin__empty">
            <p>No gallery items yet. Click "Add New Gallery Item" to create your first item.</p>
          </div>
        ) : (
          <div className="gallery-admin__grid">
            {galleryItems.map((item) => {
              const itemKey = item.docId || item.id || `item-${Math.random()}`;
              return (
              <div key={itemKey} className="gallery-admin__card">
                <div className="gallery-admin__card-image">
                  <img 
                    src={getImageUrl(item.image)} 
                    alt={item.eventName}
                    onError={(e) => {
                      e.target.src = '/venuslogo.png';
                    }}
                  />
                </div>
                <div className="gallery-admin__card-content">
                  <h4>{item.eventName || 'Untitled'}</h4>
                  {item.location && (
                    <p className="gallery-admin__location">📍 {item.location}</p>
                  )}
                  {item.description && (
                    <p className="gallery-admin__description">
                      {item.description.substring(0, 100)}
                      {item.description.length > 100 ? '...' : ''}
                    </p>
                  )}
                  <div className="gallery-admin__card-actions">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleEdit(item)}
                      disabled={showForm}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item)}
                      disabled={showForm}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryAdmin;

