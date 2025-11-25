// client/src/pages/Gallery.jsx
import React, { useState, useMemo } from "react";
import "./Gallery.css";
import { galleryData } from "../data/galleryData";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageOrientations, setImageOrientations] = useState({});

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

  // Separate gallery items into landscape and portrait
  const { landscapeItems, portraitItems } = useMemo(() => {
    const landscape = [];
    const portrait = [];
    
    galleryData.forEach((item) => {
      // Use detected orientation or fallback to item.orientation
      const detectedOrientation = imageOrientations[item.id] || item.orientation;
      const itemWithOrientation = { ...item, currentOrientation: detectedOrientation };
      
      if (detectedOrientation === "portrait") {
        portrait.push(itemWithOrientation);
      } else {
        landscape.push(itemWithOrientation);
      }
    });
    
    return { landscapeItems: landscape, portraitItems: portrait };
  }, [imageOrientations]);

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
          {/* Landscape Images Section */}
          {landscapeItems.length > 0 && (
            <div className="gallery-grid">
              {landscapeItems.map((item) => {
                const detectedOrientation = item.currentOrientation;
                return (
                  <div
                    key={item.id}
                    className={`gallery-item gallery-item--${detectedOrientation}`}
                    onClick={() => openModal({...item, orientation: detectedOrientation})}
                  >
                    <div className="gallery-item__image-wrapper">
                      <img
                        src={encodeURI(item.image)}
                        alt={item.eventName}
                        className="gallery-item__image"
                        loading="lazy"
                        onLoad={(e) => handleImageLoad(item.id, e)}
                        onError={(e) => {
                          e.target.src = '/venuslogo.png'; // Fallback image
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
                return (
                  <div
                    key={item.id}
                    className={`gallery-item gallery-item--${detectedOrientation}`}
                    onClick={() => openModal({...item, orientation: detectedOrientation})}
                  >
                    <div className="gallery-item__image-wrapper">
                      <img
                        src={encodeURI(item.image)}
                        alt={item.eventName}
                        className="gallery-item__image"
                        loading="lazy"
                        onLoad={(e) => handleImageLoad(item.id, e)}
                        onError={(e) => {
                          e.target.src = '/venuslogo.png'; // Fallback image
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
                  src={encodeURI(selectedImage.image)}
                  alt={selectedImage.eventName}
                  className="gallery-modal__image"
                  onError={(e) => {
                    e.target.src = '/venuslogo.png'; // Fallback image
                    e.target.alt = 'Image not available';
                  }}
                />
              </div>
              <div className="gallery-modal__details">
                <h2 className="gallery-modal__title">{selectedImage.eventName}</h2>
                <div className="gallery-modal__meta">
                  <div className="gallery-modal__meta-item">
                    <span className="gallery-modal__meta-label">Location:</span>
                    <span className="gallery-modal__meta-value">{selectedImage.location}</span>
                  </div>
                </div>
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
    </main>
  );
};

export default Gallery;

