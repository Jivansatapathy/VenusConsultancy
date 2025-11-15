// client/src/components/PageTransition.jsx
import React from 'react';
import { motion } from 'framer-motion';

/**
 * PageTransition - Wrapper component for page transitions
 * Provides subtle fade-in animation when pages change
 */
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
