// client/src/components/OptimizedImage.jsx
import React, { useState } from 'react';

/**
 * OptimizedImage - Component for optimized image delivery
 * Features:
 * - WebP format with fallback
 * - Lazy loading
 * - Responsive images with srcset
 * - Placeholder while loading
 * - Error handling
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  decoding = 'async',
  width,
  height,
  sizes,
  priority = false,
  onError,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate WebP version of the image
  const getWebPSrc = (originalSrc) => {
    if (originalSrc.includes('.webp')) return originalSrc;
    if (originalSrc.includes('unsplash.com')) return originalSrc; // Unsplash handles optimization
    
    try {
      // Use URL parsing to properly handle query parameters and fragments
      const url = new URL(originalSrc, window.location.origin);
      const pathname = url.pathname;
      
      // Check if pathname has an image extension
      const imageExtensionMatch = pathname.match(/\.(jpg|jpeg|png)$/i);
      if (imageExtensionMatch) {
        // Replace the extension with .webp
        const newPathname = pathname.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        url.pathname = newPathname;
        return url.toString();
      }
      
      return originalSrc;
    } catch (error) {
      // Fallback to regex for relative URLs or invalid URLs
      return originalSrc.replace(/\.(jpg|jpeg|png)(\?.*)?(#.*)?$/i, '.webp$2$3');
    }
  };

  // Generate responsive srcset
  // Note: This component requires server/build-time generation of responsive variant files
  // (e.g., image-320w.jpg, image-640w.jpg, and WebP alternatives) to avoid 404s
  const getSrcSet = (originalSrc) => {
    if (originalSrc.includes('unsplash.com')) return undefined; // Unsplash handles this
    
    // Strip query parameters and fragments before extracting extension
    const cleanSrc = originalSrc.split('?')[0].split('#')[0];
    const extension = cleanSrc.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || '.jpg';
    const baseSrc = cleanSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '');
    
    return `${baseSrc}-320w${extension} 320w, ${baseSrc}-640w${extension} 640w, ${baseSrc}-1024w${extension} 1024w, ${baseSrc}-1920w${extension} 1920w`;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  const webpSrc = getWebPSrc(src);
  const srcSet = getSrcSet(src);

  return (
    <div className={`optimized-image-container ${className}`} style={{ position: 'relative' }}>
      {/* Placeholder while loading */}
      {!isLoaded && !hasError && (
        <div 
          className="image-placeholder"
          style={{
            width: width || '100%',
            height: height || '200px',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
            fontSize: '14px'
          }}
        >
          Loading...
        </div>
      )}

      {/* Error fallback */}
      {hasError && (
        <div 
          className="image-error"
          style={{
            width: width || '100%',
            height: height || '200px',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
            fontSize: '14px',
            border: '1px solid #e5e7eb'
          }}
        >
          Image unavailable
        </div>
      )}

      {/* Optimized image */}
      {!hasError && (
        <picture>
          {/* WebP source for modern browsers */}
          <source
            srcSet={srcSet ? getSrcSet(webpSrc) : webpSrc}
            type="image/webp"
            sizes={sizes}
          />
          
          {/* Fallback image */}
          <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            className={`optimized-image ${isLoaded ? 'loaded' : 'loading'}`}
            loading={priority ? 'eager' : loading}
            decoding={decoding}
            width={width}
            height={height}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: width || '100%',
              height: height || 'auto',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
            {...props}
          />
        </picture>
      )}
    </div>
  );
};

export default OptimizedImage;
