// client/src/components/ImagePreloader.jsx
import React, { useEffect } from 'react';

/**
 * ImagePreloader - Preloads critical images for better LCP
 * This component should be used for above-the-fold images
 */
const ImagePreloader = ({ images = [] }) => {
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((imageSrc) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = imageSrc;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Preload critical images immediately
    preloadImages();

    // Cleanup function
    return () => {
      const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]');
      preloadLinks.forEach(link => {
        // Normalize by creating a temporary link to get absolute URL
        const isMatch = images.some(img => {
          const tempLink = document.createElement('a');
          tempLink.href = img;
          return tempLink.href === link.href;
        });
        if (isMatch) {
          link.remove();
        }
      });    };
  }, [images]);

  return null; // This component doesn't render anything
};

export default ImagePreloader;
