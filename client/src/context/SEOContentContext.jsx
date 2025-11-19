import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../utils/api';
import servicesConfig from '../data/servicesConfig';
import talentConfig from '../data/talentConfig';
import blogConfig from '../data/blogConfig';

const SEOContentContext = createContext();

// Default content structure - initialized with actual config data
const getDefaultContent = () => ({
  home: {
    hero: {
      greeting: "- Empower Your Workforce -",
      titleLine1: "Shape the Future of",
      titleLine2: "Your Organization Today",
      subtitle: "Connect with top-tier talent across the USA and discover professionals who drive growth, innovation, and success for American businesses.",
      button1Text: "Book a Consultation",
      button1Link: "/book-call",
      button2Text: "Our Services",
      button2Link: "/services",
      image: null // Will store base64 or URL
    },
    statAbout: {
      tag: "ABOUT VENUS HIRING",
      title: "Driving Success With An Expert Staffing",
      description: "At Venus Consultancy, we understand that the key to business success lies in having the right people on your team. That's why we're committed to connecting USA companies with top-tier talent across North America and beyond.",
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
  useEffect(() => {
    const loadContent = async () => {
      try {
        // Fetch all content from database
        const response = await API.get('/content');
        const databaseContent = response.data?.data || {};
        
        // Merge database content with defaults (database content takes precedence)
        const defaultContent = getDefaultContent();
        const merged = { ...defaultContent };
        
        // Deep merge database content into defaults
        const deepMerge = (target, source) => {
          Object.keys(source).forEach(key => {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
              if (!target[key]) target[key] = {};
              deepMerge(target[key], source[key]);
            } else {
              target[key] = source[key];
            }
          });
        };
        
        Object.keys(databaseContent).forEach(page => {
          if (merged[page]) {
            deepMerge(merged[page], databaseContent[page]);
          } else {
            merged[page] = databaseContent[page];
          }
        });
        
        setContent(merged);
      } catch (error) {
        console.error('Error loading content from database:', error);
        // Fallback to defaults if database fetch fails
        setContent(getDefaultContent());
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, []);

  const updateContent = async (path, value) => {
    // Parse the path to get page and section
    const keys = path.split('.');
    const page = keys[0]; // e.g., 'home', 'about', 'services'
    const sectionPath = keys.slice(1); // e.g., ['hero', 'greeting']
    const section = sectionPath[0]; // Top-level section name
    
    // Update local state immediately for instant UI feedback
    setContent(prev => {
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
      // Get the current page content from state (use functional update to get latest)
      const currentPageContent = content[page] || {};
      
      // Build the updated section data
      const updatedSection = { ...currentPageContent[section] };
      
      // Navigate through the section path and update the nested value
      let sectionCurrent = updatedSection;
      for (let i = 1; i < sectionPath.length - 1; i++) {
        if (!sectionCurrent[sectionPath[i]]) {
          sectionCurrent[sectionPath[i]] = {};
        }
        sectionCurrent = sectionCurrent[sectionPath[i]];
      }
      sectionCurrent[sectionPath[sectionPath.length - 1]] = value;
      
      // Log backend save attempt with timestamp
      const timestamp = new Date().toISOString();
      console.log(`[SEO Content] [${timestamp}] 🔄 API Call: Saving to backend`, { 
        page, 
        section, 
        path, 
        value: typeof value === 'string' ? value.substring(0, 50) : value,
        endpoint: '/content/save'
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

  const addArrayItem = (path, item) => {
    setContent(prev => {
      const newContent = { ...prev };
      const keys = path.split('.');
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
      
      return newContent;
    });
  };

  const removeArrayItem = (path, index) => {
    setContent(prev => {
      const newContent = { ...prev };
      const keys = path.split('.');
      let current = newContent;
      
      for (const k of keys) {
        current = current[k];
      }
      
      if (Array.isArray(current)) {
        current.splice(index, 1);
      }
      
      return newContent;
    });
  };

  const resetContent = async () => {
    setContent(getDefaultContent());
    // Optionally reset backend content (would need a reset endpoint)
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      // Upload image to server (saves to uploads/images folder)
      const response = await API.post('/content/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Return the image URL that will be stored in database
      // The URL points to the server endpoint that serves the image
      const imageUrl = response.data.imageUrl;
      
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image to server:', error);
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

