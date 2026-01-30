import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../utils/api';
import servicesConfig from '../data/servicesConfig';
import talentConfig from '../data/talentConfig';
import blogConfig from '../data/blogConfig';
import { uploadContentImage } from '../utils/firebaseStorage.js';

const SEOContentContext = createContext();

// Default content structure - initialized with actual config data
const getDefaultContent = () => ({
  home: {
    hero: {
      greeting: "- Empower Your Workforce -",
      title: "Staffing & Recruitment Agency in the USA",   
      subtitle: "Supporting Businesses Across the USA with Skilled Talent and Reliable Hiring Solutions",
      button1Text: "Book a Consultation",
      button1Link: "/book-call",
      button2Text: "Our Services",
      button2Link: "/services",
      image: null // Will store base64 or URL
    },
    statAbout: {
      tag: "ABOUT VENUS HIRING",
      title: "Driving Business Growth With Expert Staffing & Recruitment Solutions",
      description: "At Venus Hiring, we understand that hiring the right talent is critical to business success. As a professional staffing and recruitment agency in the USA, we help organizations build high-performing teams through tailored hiring solutions. From permanent recruitment and contract staffing to executive search and workforce planning, our team connects employers with qualified professionals across North America, ensuring faster hiring, reduced costs, and long-term success",
      stat1Number: "77",
      stat1Suffix: "K+",
      stat1Label: "Trusted Partnerships",
      stat2Number: "98",
      stat2Suffix: "%",
      stat2Label: "Client Satisfaction",
      stat3Number: "99",
      stat3Suffix: "%",
      stat3Label: "Success Rate",
      ctaText: "JOIN OUR NETWORK",
      ctaLink: "/book-call",
      images: {
        image1: "/images/imagetrail/image1.jpg",
        image2: "/images/imagetrail/image2.jpg",
        image3: "/images/imagetrail/image3.jpg",
        image4: "/images/imagetrail/image4.jpg"
      },
      experienceNumber: "18+",
      experienceLabel: "Years Of Experience",
      teamText: "We Are Awesome Team"
    },
    services: {
      heading: servicesConfig.heading,
      description: servicesConfig.description,
      items: servicesConfig.items || []
    },
    talent: {
      heading: talentConfig.heading,
      categories: talentConfig.categories || []
    },
    whyStats: {
      heading: "Why Choose Venus Consultancy?",
      cards: [
        {
          title: 'Human-Centered Approach',
          summary: 'Beyond algorithms, human insight',
          description: 'Every candidate and employer is carefully evaluated through our human-led process, going beyond algorithms to assess personality, skills, and cultural fit. We leverage data-driven insights to ensure the right match — combining precision with the human touch that machines cannot replicate.',
          icon: "/iconanimated/algorithm.gif"
        },
        {
          title: 'Comprehensive Talent Solutions',
          summary: 'End-to-end recruitment across industries',
          description: 'We provide end-to-end recruitment services across IT, Engineering, Scientific, Skilled Trades, Light Industrial, Office & Clerical, Technical Support, Outsourcing, and Recruitment Process Outsourcing. Additionally, we specialize in Executive and Board-level recruitment.',
          icon: "/iconanimated/union.gif"
        },
        {
          title: 'Quality & Integrity',
          summary: 'Ethical excellence, guaranteed success',
          description: 'We take responsibility for placing candidates with strong social, ethical, and professional skills, ensuring they are fully prepared for interviews and workplace success.',
          icon: "/iconanimated/algorithm.gif"
        },
        {
          title: 'Global Reach',
          summary: 'Worldwide talent, local expertise',
          description: 'We connect talent with opportunities worldwide, supporting professionals from diverse backgrounds and helping employers access the best talent, anywhere.',
          icon: "/iconanimated/algorithm.gif"
        }
      ]
    },
    blog: {
      heading: blogConfig.heading,
      subheading: blogConfig.subheading,
      readMoreUrl: blogConfig.readMoreUrl,
      items: blogConfig.items || []
    }
  },
  meta: {
    home: {
      title: "Venus Hiring - Top Talent Recruitment Services",
      description: "Connect with top-tier talent across the USA. Expert staffing solutions for American businesses.",
      keywords: "recruitment, staffing, talent acquisition, hiring, USA"
    }
  }
});

export const SEOContentProvider = ({ children }) => {
  const [content, setContent] = useState(getDefaultContent());
  const [loading, setLoading] = useState(true);

  // Load content from MongoDB database on mount
  // useEffect(() => {
  //   const loadContent = async () => {
  //     try {
  //       console.log('[SEO Content] 🔄 Loading content from backend...');
  //       // Fetch all content from database
  //       const response = await API.get('/content');
  //       const databaseContent = response.data?.data || {};
        
  //       console.log('[SEO Content] 📦 Content received from backend:', {
  //         pages: Object.keys(databaseContent),
  //         hasData: Object.keys(databaseContent).length > 0
  //       });
        
  //       // If database has content, use it directly (don't merge with defaults)
  //       // This ensures saved content is not overwritten by defaults
  //       if (databaseContent && Object.keys(databaseContent).length > 0) {
  //         console.log('[SEO Content] ✅ Using content from database');
  //         setContent(databaseContent);
  //       } else {
  //         console.log('[SEO Content] ⚠️  No content in database, using defaults');
  //         // Only use defaults if database is empty
  //         setContent(getDefaultContent());
  //       }
  //     } catch (error) {
  //       console.error('[SEO Content] ❌ Error loading content from database:', error);
  //       // Fallback to defaults if database fetch fails
  //       setContent(getDefaultContent());
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
    
  //   loadContent();
  // }, []);
useEffect(() => {
  // Offline-first mode: use default content only
  setContent(getDefaultContent());
  setLoading(false);
}, []);

  const updateContent = async (path, value) => {
    // Parse the path to get page and section
    const keys = path.split('.');
    const page = keys[0]; // e.g., 'home', 'about', 'services'
    const sectionPath = keys.slice(1); // e.g., ['hero', 'greeting']
    const section = sectionPath[0]; // Top-level section name
    
    // Build the complete updated section BEFORE updating state
    // This ensures we have all existing fields
    let updatedSection = null;
    
    setContent(prev => {
      // Get current section data (deep clone to avoid mutations)
      const currentPageContent = prev[page] || {};
      const currentSection = currentPageContent[section] || {};
      updatedSection = JSON.parse(JSON.stringify(currentSection));
      
      // Update the nested value in the section copy
      let sectionCurrent = updatedSection;
      for (let i = 1; i < sectionPath.length - 1; i++) {
        if (!sectionCurrent[sectionPath[i]]) {
          sectionCurrent[sectionPath[i]] = {};
        }
        sectionCurrent = sectionCurrent[sectionPath[i]];
      }
      sectionCurrent[sectionPath[sectionPath.length - 1]] = value;
      
      // Now update the state for UI
      const newContent = { ...prev };
      let current = newContent;
      
      // Navigate to the correct location in the content tree
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      // Set the value
      current[keys[keys.length - 1]] = value;
      
      return newContent;
    });

    // Save to MongoDB database asynchronously
    try {
      // Ensure we have valid section data to save
      if (!updatedSection) {
        console.warn(`[SEO Content] ⚠️  No section data to save for ${page}.${section}`);
        // Build a minimal section with just the updated field
        updatedSection = {};
        let sectionCurrent = updatedSection;
        for (let i = 1; i < sectionPath.length - 1; i++) {
          sectionCurrent[sectionPath[i]] = {};
          sectionCurrent = sectionCurrent[sectionPath[i]];
        }
        sectionCurrent[sectionPath[sectionPath.length - 1]] = value;
      }
      
      // Log backend save attempt with timestamp
      const timestamp = new Date().toISOString();
      console.log(`[SEO Content] [${timestamp}] 🔄 API Call: Saving to backend`, { 
        page, 
        section, 
        path, 
        value: typeof value === 'string' ? value.substring(0, 50) : value,
        endpoint: '/content/save',
        sectionDataKeys: Object.keys(updatedSection)
      });
      
      // Track API call start
      const apiCallStart = performance.now();
      
      // Save the entire section to database
      const response = await API.post('/content/save', {
        page,
        section: section,
        data: updatedSection
      });
      
      const apiCallDuration = (performance.now() - apiCallStart).toFixed(2);
      console.log(`[SEO Content] [${timestamp}] ✅ API Success: Saved to backend (${apiCallDuration}ms)`, {
        success: response.data.success,
        message: response.data.message,
        dataPreview: JSON.stringify(response.data.data || {}).substring(0, 100)
      });
      
      // Reload content from backend to ensure we have the latest merged data
      // This ensures all fields are preserved (including ones not in the update)
      try {
        const reloadResponse = await API.get('/content');
        const reloadedContent = reloadResponse.data?.data || {};
        if (reloadedContent && Object.keys(reloadedContent).length > 0) {
          setContent(reloadedContent);
          console.log(`[SEO Content] ✅ Content reloaded from backend after save`);
        }
      } catch (reloadError) {
        console.warn(`[SEO Content] ⚠️  Could not reload content after save:`, reloadError.message);
        // Don't throw - the save was successful, just couldn't reload
      }
      
      // Dispatch custom event for monitoring
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('seo-content-saved', {
          detail: { path, value, response: response.data, duration: apiCallDuration }
        }));
      }
    } catch (error) {
      const timestamp = new Date().toISOString();
      console.error(`[SEO Content] [${timestamp}] ❌ API Error: Failed to save to backend`, {
        path,
        error: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // Dispatch custom event for monitoring
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('seo-content-error', {
          detail: { path, value, error: error.message, status: error.response?.status }
        }));
      }
      
      // Revert local state on error
      setContent(prev => {
        const newContent = { ...prev };
        const keys = path.split('.');
        let current = newContent;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        // Keep old value (don't update)
        return prev;
      });
      throw error;
    }
  };

  const updateNestedContent = async (path, key, value) => {
    const keys = path.split('.');
    const page = keys[0];
    const section = keys[1];
    
    // Update local state immediately and capture the updated section
    let updatedSection = null;
    setContent(prev => {
      const newContent = { ...prev };
      let current = newContent;
      
      for (const k of keys) {
        if (!current[k]) {
          current[k] = {};
        }
        current = current[k];
      }
      
      if (Array.isArray(current)) {
        const index = parseInt(key);
        current[index] = { ...current[index], ...value };
      } else {
        current[key] = value;
      }
      
      // Capture the updated section for backend save
      updatedSection = newContent[page]?.[section];
      
      return newContent;
    });

    // Save to backend (similar to updateContent)
    try {
      if (updatedSection) {
        const timestamp = new Date().toISOString();
        console.log(`[SEO Content] [${timestamp}] 🔄 API Call: Saving nested content`, { 
          page, 
          section, 
          path, 
          key,
          endpoint: '/content/save'
        });
        
        const apiCallStart = performance.now();
        const response = await API.post('/content/save', {
          page,
          section: section,
          data: updatedSection
        });
        
        const apiCallDuration = (performance.now() - apiCallStart).toFixed(2);
        console.log(`[SEO Content] [${timestamp}] ✅ API Success: Saved nested content (${apiCallDuration}ms)`);
        
        // Reload content from backend to ensure we have the latest merged data
        try {
          const reloadResponse = await API.get('/content');
          const reloadedContent = reloadResponse.data?.data || {};
          if (reloadedContent && Object.keys(reloadedContent).length > 0) {
            setContent(reloadedContent);
            console.log(`[SEO Content] ✅ Content reloaded from backend after nested save`);
          }
        } catch (reloadError) {
          console.warn(`[SEO Content] ⚠️  Could not reload content after nested save:`, reloadError.message);
        }
        
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('seo-content-saved', {
            detail: { path, value, response: response.data, duration: apiCallDuration }
          }));
        }
      }
    } catch (error) {
      const timestamp = new Date().toISOString();
      console.error(`[SEO Content] [${timestamp}] ❌ API Error: Failed to save nested content`, error);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('seo-content-error', {
          detail: { path, value, error: error.message, status: error.response?.status }
        }));
      }
    }
  };

  const addArrayItem = async (path, item) => {
    const keys = path.split('.');
    const page = keys[0]; // e.g., 'home'
    const section = keys[1]; // e.g., 'blog'
    
    // Update local state immediately and capture the updated section
    let updatedSection = null;
    setContent(prev => {
      const newContent = { ...prev };
      let current = newContent;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      const lastKey = keys[keys.length - 1];
      if (!current[lastKey]) {
        current[lastKey] = [];
      }
      current[lastKey] = [...current[lastKey], item];
      
      // Capture the updated section for backend save
      updatedSection = newContent[page]?.[section];
      
      return newContent;
    });

    // Save to backend
    try {
      if (updatedSection) {
        const timestamp = new Date().toISOString();
        console.log(`[SEO Content] [${timestamp}] 🔄 API Call: Adding array item`, { 
          page, 
          section, 
          path,
          endpoint: '/content/save'
        });
        
        const apiCallStart = performance.now();
        const response = await API.post('/content/save', {
          page,
          section: section,
          data: updatedSection
        });
        
        const apiCallDuration = (performance.now() - apiCallStart).toFixed(2);
        console.log(`[SEO Content] [${timestamp}] ✅ API Success: Array item added (${apiCallDuration}ms)`);
        
        // Reload content from backend to ensure we have the latest merged data
        try {
          const reloadResponse = await API.get('/content');
          const reloadedContent = reloadResponse.data?.data || {};
          if (reloadedContent && Object.keys(reloadedContent).length > 0) {
            setContent(reloadedContent);
            console.log(`[SEO Content] ✅ Content reloaded from backend after adding array item`);
          }
        } catch (reloadError) {
          console.warn(`[SEO Content] ⚠️  Could not reload content after adding array item:`, reloadError.message);
        }
        
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('seo-content-saved', {
            detail: { path, item, response: response.data, duration: apiCallDuration }
          }));
        }
      }
    } catch (error) {
      const timestamp = new Date().toISOString();
      console.error(`[SEO Content] [${timestamp}] ❌ API Error: Failed to add array item`, error);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('seo-content-error', {
          detail: { path, item, error: error.message, status: error.response?.status }
        }));
      }
      // Revert local state on error
      setContent(prev => {
        const newContent = { ...prev };
        const keys = path.split('.');
        let current = newContent;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        const lastKey = keys[keys.length - 1];
        if (Array.isArray(current[lastKey])) {
          current[lastKey] = current[lastKey].slice(0, -1); // Remove last item
        }
        return newContent;
      });
      throw error;
    }
  };

  const removeArrayItem = async (path, index) => {
    const keys = path.split('.');
    const page = keys[0]; // e.g., 'home'
    const section = keys[1]; // e.g., 'blog'
    
    // Update local state immediately and capture the updated section
    let updatedSection = null;
    setContent(prev => {
      const newContent = { ...prev };
      let current = newContent;
      
      for (const k of keys) {
        current = current[k];
      }
      
      if (Array.isArray(current)) {
        current.splice(index, 1);
      }
      
      // Capture the updated section for backend save
      updatedSection = newContent[page]?.[section];
      
      return newContent;
    });

    // Save to backend
    try {
      if (updatedSection) {
        const timestamp = new Date().toISOString();
        console.log(`[SEO Content] [${timestamp}] 🔄 API Call: Removing array item`, { 
          page, 
          section, 
          path,
          index,
          endpoint: '/content/save'
        });
        
        const apiCallStart = performance.now();
        const response = await API.post('/content/save', {
          page,
          section: section,
          data: updatedSection
        });
        
        const apiCallDuration = (performance.now() - apiCallStart).toFixed(2);
        console.log(`[SEO Content] [${timestamp}] ✅ API Success: Array item removed (${apiCallDuration}ms)`);
        
        // Reload content from backend to ensure we have the latest merged data
        try {
          const reloadResponse = await API.get('/content');
          const reloadedContent = reloadResponse.data?.data || {};
          if (reloadedContent && Object.keys(reloadedContent).length > 0) {
            setContent(reloadedContent);
            console.log(`[SEO Content] ✅ Content reloaded from backend after removing array item`);
          }
        } catch (reloadError) {
          console.warn(`[SEO Content] ⚠️  Could not reload content after removing array item:`, reloadError.message);
        }
        
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('seo-content-saved', {
            detail: { path, index, response: response.data, duration: apiCallDuration }
          }));
        }
      }
    } catch (error) {
      const timestamp = new Date().toISOString();
      console.error(`[SEO Content] [${timestamp}] ❌ API Error: Failed to remove array item`, error);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('seo-content-error', {
          detail: { path, index, error: error.message, status: error.response?.status }
        }));
      }
      // Revert local state on error - reload from backend
      try {
        const reloadResponse = await API.get('/content');
        const reloadedContent = reloadResponse.data?.data || {};
        if (reloadedContent && Object.keys(reloadedContent).length > 0) {
          setContent(reloadedContent);
        }
      } catch (reloadError) {
        console.error(`[SEO Content] ❌ Could not reload content after error:`, reloadError);
      }
      throw error;
    }
  };

  const resetContent = async () => {
    setContent(getDefaultContent());
    // Optionally reset backend content (would need a reset endpoint)
  };

  const uploadImage = async (file) => {
    try {
      // Upload image to Firebase Storage
      const imageUrl = await uploadContentImage(file);
      
      // Return the Firebase Storage URL (this will be stored in database)
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image to Firebase Storage:', error);
      throw error;
    }
  };

  const value = {
    content,
    updateContent,
    updateNestedContent,
    addArrayItem,
    removeArrayItem,
    resetContent,
    uploadImage,
    loading
  };

  return (
    <SEOContentContext.Provider value={value}>
      {children}
    </SEOContentContext.Provider>
  );
};

export const useSEOContent = () => {
  const context = useContext(SEOContentContext);
  if (!context) {
    throw new Error('useSEOContent must be used within SEOContentProvider');
  }
  return context;
};

