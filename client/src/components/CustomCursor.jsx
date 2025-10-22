import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e) => {
      // Check if hovering over interactive elements
      const target = e.target;
      const isInteractive = target.matches('a, button, input, textarea, select, [role="button"], [tabindex]');
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
      ref={cursorRef}
      className={`custom-cursor ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
      }}
    />
  );
};

export default CustomCursor;
