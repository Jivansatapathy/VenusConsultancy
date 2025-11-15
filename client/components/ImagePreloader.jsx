// client/src/components/ImagePreloader.jsx
'use client';

import { useEffect } from 'react';

/**
 * ImagePreloader - Preloads critical images using Next.js optimized approach
 * Uses native Image API for better performance
 */
const ImagePreloader = ({ images = [] }) => {
  useEffect(() => {
    if (typeof window === 'undefined' || images.length === 0) return;

    const preloadedImages = new Set();
    
    const preloadImages = () => {
      images.forEach((imageSrc) => {
        // Skip if already preloaded
        if (preloadedImages.has(imageSrc)) return;
        
        // Use native Image API for preloading (more reliable than link preload)
        const img = new Image();
        img.src = imageSrc;
        img.loading = 'eager';
        preloadedImages.add(imageSrc);
      });
    };

    // Preload images after a short delay to avoid blocking initial render
    const timeoutId = setTimeout(preloadImages, 100);

    return () => {
      clearTimeout(timeoutId);
      preloadedImages.clear();
    };
  }, [images]);

  return null; // This component doesn't render anything
};

export default ImagePreloader;
