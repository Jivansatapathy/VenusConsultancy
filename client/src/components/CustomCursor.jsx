import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      // Always query DOM to remove any cursor-zoom classes
      document.querySelectorAll('.cursor-zoom').forEach(el => {
        el.classList.remove('cursor-zoom');
      });
    };

    const handleMouseOver = (e) => {
      // Check if hovering over interactive elements only
      const target = e.target;
      const isInteractive = target.matches('a, button, input, textarea, select, [role="button"], [tabindex]');
      
      // Always query DOM to remove any cursor-zoom classes
      document.querySelectorAll('.cursor-zoom').forEach(el => {
        el.classList.remove('cursor-zoom');
      });
      
      // Only set hovering state for interactive elements
      setIsHovering(isInteractive);
    };

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
      style={{
        left: mousePosition.x + 8,
        top: mousePosition.y + 8,
      }}
    />
  );
};

export default CustomCursor;
