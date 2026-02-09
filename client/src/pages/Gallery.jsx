// client/src/pages/Gallery.jsx
import React, { useState, useMemo, useEffect } from "react";
import "./Gallery.css";
import { galleryData as staticGalleryData } from "../data/galleryData";
import { getGalleryItems } from "../utils/galleryFirestore.js";
import FAQ from "../components/FAQ";
import YouTubeVideos from "../components/YouTubeVideos";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageOrientations, setImageOrientations] = useState({});
  const [galleryData, setGalleryData] = useState(staticGalleryData); // Initialize with static data
  const [loading, setLoading] = useState(false); // Change to false to show static data immediately
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  // Fetch gallery data from Firestore
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        // We don't set loading=true here anymore because we want to keep showing static data
        setInitialFetchDone(false);
        const dynamicItems = await getGalleryItems();
        console.log('Fetched dynamic gallery items from Firestore:', dynamicItems.length);

        if (dynamicItems.length > 0) {
          setGalleryData(prevData => {
            // Keep existing static data but filter out any that might be duplicates by ID
            const staticIds = new Set(staticGalleryData.map(item => item.id));
            const uniqueDynamicItems = dynamicItems.filter(item => !staticIds.has(item.id));

            // Combine them
            const combined = [...staticGalleryData, ...uniqueDynamicItems];

            // Sort by id descending
            return combined.sort((a, b) => (b.id || 0) - (a.id || 0));
          });
        }
      } catch (error) {
        console.error('Error fetching gallery data from Firestore (using static data only):', error);
      } finally {
        setInitialFetchDone(true);
      }
    };

    fetchGalleryData();
  }, []);

  // Detect image orientation when image loads
  const handleImageLoad = (itemId, event) => {
    const img = event.target;
    const isPortrait = img.naturalHeight > img.naturalWidth;
    setImageOrientations(prev => ({
      ...prev,
      [itemId]: isPortrait ? "portrait" : "landscape"
    }));
  };

  const openModal = (item) => {
    setSelectedImage(item);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  // Close modal on Escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && selectedImage) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedImage]);

  // Helper function to get image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      console.warn('Empty imageUrl provided to getImageUrl');
      return '/venuslogo.png';
    }

    // If it's already a full URL (Firebase Storage or external), return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }

    // Normalize local path: ensure single leading slash and Gallery prefix if missing
    let cleanPath = imageUrl;

    // Ensure it starts with a single /
    if (!cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }

    // If it's just the filename without folder, prepend /Gallery/
    if (!cleanPath.startsWith('/Gallery/') && !cleanPath.includes('/images/') && !cleanPath.includes('/slider/')) {
      // If it already had Gallery but maybe misspelled or lowercase, this might help
      if (cleanPath.toLowerCase().startsWith('/gallery/')) {
        cleanPath = '/Gallery/' + cleanPath.substring(9);
      } else {
        cleanPath = '/Gallery' + cleanPath;
      }
    }

    // Clean up any double slashes that might have been introduced
    cleanPath = cleanPath.replace(/\/+/g, '/');

    return cleanPath;
  };

  // Separate gallery items into landscape and portrait
  const { landscapeItems, portraitItems } = useMemo(() => {
    const landscape = [];
    const portrait = [];

    galleryData.forEach((item) => {
      // Use detected orientation or fallback to item.orientation
      // Handle both Firestore doc IDs and numeric IDs
      const itemId = item.id || item.docId || `item-${Math.random()}`;
      const detectedOrientation = imageOrientations[itemId] || item.orientation || 'landscape';
      const itemWithOrientation = {
        ...item,
        currentOrientation: detectedOrientation,
        itemId,
        imageUrl: getImageUrl(item.image) // Pre-process image URL
      };

      if (detectedOrientation === "portrait") {
        portrait.push(itemWithOrientation);
      } else {
        landscape.push(itemWithOrientation);
      }
    });

    return { landscapeItems: landscape, portraitItems: portrait };
  }, [galleryData, imageOrientations]);

  if (loading) {
    return (
      <main className="gallery-page">
        <section className="gallery-hero">
          <div className="gallery-hero__container">
            <h1 className="gallery-hero__title">Our Gallery</h1>
            <p className="gallery-hero__subtitle">
              Loading gallery...
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="gallery-hero__container">
          <h1 className="gallery-hero__title">Our Gallery</h1>
          <p className="gallery-hero__subtitle">
            Capturing moments from our events, meetings, and networking sessions
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-section">
        <div className="gallery-container">
          {galleryData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
              <p>No gallery items available.</p>
              <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
                Check the browser console for details.
              </p>
            </div>
          ) : (
            <>
              {/* Landscape Images Section */}
              {landscapeItems.length > 0 && (
                <div className="gallery-grid">
                  {landscapeItems.map((item) => {
                    const detectedOrientation = item.currentOrientation;
                    const itemId = item.id || item.docId || `item-${Math.random()}`;
                    return (
                      <div
                        key={itemId}
                        className={`gallery-item gallery-item--${detectedOrientation}`}
                        onClick={() => openModal({ ...item, orientation: detectedOrientation })}
                      >
                        <div className="gallery-item__image-wrapper">
                          <img
                            src={item.imageUrl}
                            alt={item.eventName || 'Gallery image'}
                            className="gallery-item__image"
                            loading="lazy"
                            onLoad={(e) => {
                              if (!e.target.dataset.logged) {
                                console.log('Landscape image loaded:', item.imageUrl);
                                e.target.dataset.logged = 'true';
                              }
                              handleImageLoad(itemId, e);
                            }}
                            onError={(e) => {
                              console.error('Landscape image load error:', {
                                image: item.image,
                                url: item.imageUrl,
                                id: itemId
                              });
                              e.target.src = '/venuslogo.png';
                              e.target.alt = 'Image not available';
                            }}
                          />
                          <div className="gallery-item__overlay">
                            <div className="gallery-item__info">
                              <h3 className="gallery-item__title">{item.eventName}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Portrait Images Section - Starts on new row */}
              {portraitItems.length > 0 && (
                <div className="gallery-grid gallery-grid--portrait">
                  {portraitItems.map((item) => {
                    const detectedOrientation = item.currentOrientation;
                    const itemId = item.id || item.docId || `item-${Math.random()}`;
                    return (
                      <div
                        key={itemId}
                        className={`gallery-item gallery-item--${detectedOrientation}`}
                        onClick={() => openModal({ ...item, orientation: detectedOrientation })}
                      >
                        <div className="gallery-item__image-wrapper">
                          <img
                            src={item.imageUrl}
                            alt={item.eventName || 'Gallery image'}
                            className="gallery-item__image"
                            loading="lazy"
                            onLoad={(e) => {
                              if (!e.target.dataset.logged) {
                                console.log('Portrait image loaded:', item.imageUrl);
                                e.target.dataset.logged = 'true';
                              }
                              handleImageLoad(itemId, e);
                            }}
                            onError={(e) => {
                              console.error('Portrait image load error:', {
                                image: item.image,
                                url: item.imageUrl,
                                id: itemId
                              });
                              e.target.src = '/venuslogo.png';
                              e.target.alt = 'Image not available';
                            }}
                          />
                          <div className="gallery-item__overlay">
                            <div className="gallery-item__info">
                              <h3 className="gallery-item__title">{item.eventName}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Modal for detailed view */}
      {selectedImage && (
        <div className="gallery-modal" onClick={closeModal}>
          <div className="gallery-modal__content" onClick={(e) => e.stopPropagation()}>
            <button
              className="gallery-modal__close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="gallery-modal__body">
              <div className={`gallery-modal__image-wrapper gallery-modal__image-wrapper--${selectedImage.orientation}`}>
                <img
                  src={getImageUrl(selectedImage.image)}
                  alt={selectedImage.eventName || 'Gallery image'}
                  className="gallery-modal__image"
                  onError={(e) => {
                    console.error('Modal image failed to load:', {
                      image: selectedImage.image,
                      calculated: getImageUrl(selectedImage.image)
                    });
                    e.target.src = '/venuslogo.png'; // Fallback image
                    e.target.alt = 'Image not available';
                  }}
                />
              </div>
              <div className="gallery-modal__details">
                <h2 className="gallery-modal__title">{selectedImage.eventName}</h2>
                <div className="gallery-modal__description">
                  <p>{selectedImage.description}</p>
                </div>
                <div className="gallery-modal__attendees">
                  <h3 className="gallery-modal__attendees-title">Meeting Details:</h3>
                  <p className="gallery-modal__attendees-text">{selectedImage.attendees}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Videos Section */}
      <YouTubeVideos
        maxResults={12}
      />

      <FAQ />
    </main>
  );
};

export default Gallery;

