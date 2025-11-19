import React, { useState, useEffect } from 'react';
import { useSEOContent } from '../context/SEOContentContext';
import API from '../utils/api';
import APICallMonitor from './APICallMonitor';
import './SEOContentManager.css';

const SEOContentManager = () => {
  const { content, updateContent, updateNestedContent, addArrayItem, removeArrayItem, resetContent, uploadImage } = useSEOContent();
  const [activePage, setActivePage] = useState('home');
  const [activeSection, setActiveSection] = useState('hero');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    console.log(`[SEO Manager] ${type.toUpperCase()}: ${text}`);
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  // Listen for save events from SEOContentContext
  useEffect(() => {
    const handleSaveSuccess = (event) => {
      console.log('[SEO Manager] Save success event received:', event.detail);
      showMessage('success', `Content saved: ${event.detail.path}`);
    };

    const handleSaveError = (event) => {
      console.error('[SEO Manager] Save error event received:', event.detail);
      const errorMsg = event.detail.status === 401 
        ? 'Not authenticated. Please login again.'
        : event.detail.status === 403
        ? 'Permission denied. Admin access required.'
        : `Failed to save: ${event.detail.error || 'Unknown error'}`;
      showMessage('error', errorMsg);
    };

    window.addEventListener('seo-content-saved', handleSaveSuccess);
    window.addEventListener('seo-content-error', handleSaveError);

    return () => {
      window.removeEventListener('seo-content-saved', handleSaveSuccess);
      window.removeEventListener('seo-content-error', handleSaveError);
    };
  }, []);

  const handleImageUpload = async (path, file) => {
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      await updateContent(path, imageUrl);
      showMessage('success', 'Image uploaded and saved successfully!');
    } catch (error) {
      console.error('Image upload error:', error);
      showMessage('error', 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showMessage('success', 'Content saved successfully!');
    }, 500);
  };

  const handleInitializeBaseContent = async () => {
    if (!window.confirm('This will initialize base content in the database. Continue?')) {
      return;
    }

    setInitializing(true);
    try {
      const response = await API.post('/content/initialize');
      if (response.data.success) {
        showMessage('success', 'Base content initialized successfully! Please refresh the page.');
        // Reload the page after 2 seconds to show updated content
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error('Error initializing base content:', error);
      showMessage('error', error.response?.data?.error || 'Failed to initialize base content. Please try again.');
    } finally {
      setInitializing(false);
    }
  };

  const pages = [
    { key: 'home', label: 'Home Page' },
    { key: 'about', label: 'About Page' },
    { key: 'services', label: 'Services Page' },
    { key: 'contact', label: 'Contact Page' },
    { key: 'meta', label: 'Meta Tags (All Pages)' }
  ];

  const getSectionsForPage = (page) => {
    const sectionsMap = {
      home: [
        { key: 'hero', label: 'Hero Section' },
        { key: 'statAbout', label: 'About & Stats' },
        { key: 'services', label: 'Services Section' },
        { key: 'talent', label: 'Talent Section' },
        { key: 'whyStats', label: 'Why Stats' },
        { key: 'blog', label: 'Blog Section' }
      ],
      about: [
        { key: 'hero', label: 'Hero Section' },
        { key: 'stats', label: 'Statistics' },
        { key: 'mission', label: 'Mission & Vision' },
        { key: 'team', label: 'Team Section' }
      ],
      services: [
        { key: 'hero', label: 'Hero Section' },
        { key: 'services', label: 'Services List' },
        { key: 'talentDiscovery', label: 'Talent Discovery' },
        { key: 'testimonials', label: 'Testimonials' }
      ],
      contact: [
        { key: 'hero', label: 'Hero Section' },
        { key: 'offices', label: 'Office Locations' },
        { key: 'form', label: 'Contact Form' }
      ],
      meta: [
        { key: 'home', label: 'Home Page Meta' },
        { key: 'about', label: 'About Page Meta' },
        { key: 'services', label: 'Services Page Meta' },
        { key: 'contact', label: 'Contact Page Meta' }
      ]
    };
    return sectionsMap[page] || [];
  };

  return (
    <div className="seo-content-manager">
      <div className="seo-header">
        <h2>SEO Content Management</h2>
        <div className="seo-actions">
          <button 
            className="btn btn-primary" 
            onClick={handleInitializeBaseContent} 
            disabled={initializing}
            title="Upload base content structure to database"
          >
            {initializing ? 'Initializing...' : 'Initialize Base Content'}
          </button>
          <button className="btn btn-secondary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
          <button className="btn btn-danger" onClick={() => {
            if (window.confirm('Are you sure you want to reset all content to defaults?')) {
              resetContent();
              showMessage('success', 'Content reset to defaults');
            }
          }}>
            Reset to Defaults
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`seo-message seo-message--${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="seo-layout">
        <div className="seo-sidebar">
          <h3>Pages</h3>
          <nav className="seo-nav">
            {pages.map(page => (
              <button
                key={page.key}
                className={`seo-nav-item ${activePage === page.key ? 'active' : ''}`}
                onClick={() => {
                  setActivePage(page.key);
                  const sections = getSectionsForPage(page.key);
                  if (sections.length > 0) {
                    setActiveSection(sections[0].key);
                  }
                }}
              >
                {page.label}
              </button>
            ))}
          </nav>
          
          {activePage !== 'meta' && (
            <>
              <h3 style={{ marginTop: '2rem' }}>Sections</h3>
              <nav className="seo-nav">
                {getSectionsForPage(activePage).map(section => (
                  <button
                    key={section.key}
                    className={`seo-nav-item ${activeSection === section.key ? 'active' : ''}`}
                    onClick={() => setActiveSection(section.key)}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </>
          )}
        </div>

        <div className="seo-content">
          {uploading && (
            <div className="seo-uploading">
              <p>Uploading image...</p>
            </div>
          )}
          
          {/* Home Page Sections */}
          {activePage === 'home' && activeSection === 'hero' && <HeroEditor content={content.home?.hero || {}} updateContent={updateContent} handleImageUpload={handleImageUpload} page="home" />}
          {activePage === 'home' && activeSection === 'statAbout' && <StatAboutEditor content={content.home?.statAbout || {}} updateContent={updateContent} handleImageUpload={handleImageUpload} page="home" />}
          {activePage === 'home' && activeSection === 'services' && <ServicesEditor content={content.home?.services || {}} updateContent={updateContent} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} handleImageUpload={handleImageUpload} page="home" />}
          {activePage === 'home' && activeSection === 'talent' && <TalentEditor content={content.home?.talent || {}} updateContent={updateContent} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} handleImageUpload={handleImageUpload} page="home" />}
          {activePage === 'home' && activeSection === 'whyStats' && <WhyStatsEditor content={content.home?.whyStats || {}} updateContent={updateContent} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} handleImageUpload={handleImageUpload} page="home" />}
          {activePage === 'home' && activeSection === 'blog' && <BlogEditor content={content.home?.blog || {}} updateContent={updateContent} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} handleImageUpload={handleImageUpload} page="home" />}
          
          {/* About Page Sections */}
          {activePage === 'about' && activeSection === 'hero' && <HeroEditor content={content.about?.hero || {}} updateContent={updateContent} handleImageUpload={handleImageUpload} page="about" />}
          {activePage === 'about' && activeSection === 'stats' && <AboutStatsEditor content={content.about?.stats || {}} updateContent={updateContent} page="about" />}
          {activePage === 'about' && activeSection === 'mission' && <MissionEditor content={content.about?.mission || {}} updateContent={updateContent} handleImageUpload={handleImageUpload} page="about" />}
          
          {/* Services Page Sections */}
          {activePage === 'services' && activeSection === 'hero' && <HeroEditor content={content.services?.hero || {}} updateContent={updateContent} handleImageUpload={handleImageUpload} page="services" />}
          {activePage === 'services' && activeSection === 'services' && <ServicesPageEditor content={content.services?.services || {}} updateContent={updateContent} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} handleImageUpload={handleImageUpload} page="services" />}
          
          {/* Contact Page Sections */}
          {activePage === 'contact' && activeSection === 'hero' && <HeroEditor content={content.contact?.hero || {}} updateContent={updateContent} handleImageUpload={handleImageUpload} page="contact" />}
          {activePage === 'contact' && activeSection === 'offices' && <OfficesEditor content={content.contact?.offices || {}} updateContent={updateContent} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} page="contact" />}
          
          {/* Meta Tags */}
          {activePage === 'meta' && <MetaEditor content={content.meta || {}} updateContent={updateContent} />}
        </div>
      </div>
      
      {/* API Call Monitor */}
      <APICallMonitor />
    </div>
  );
};

// Helper function to build content path
const buildPath = (page, ...parts) => `${page}.${parts.join('.')}`;

// Hero Section Editor
const HeroEditor = ({ content, updateContent, handleImageUpload, page = 'home' }) => {
  return (
    <div className="seo-section-editor">
      <h3>Hero Section - {page.charAt(0).toUpperCase() + page.slice(1)} Page</h3>
      <div className="seo-form">
        <div className="seo-form-group">
          <label>Greeting Text</label>
          <input
            type="text"
            value={content.greeting || ''}
            onChange={(e) => updateContent(buildPath(page, 'hero', 'greeting'), e.target.value)}
          />
        </div>

        <div className="seo-form-group">
          <label>Title Line 1</label>
          <input
            type="text"
            value={content.titleLine1 || ''}
            onChange={(e) => updateContent(buildPath(page, 'hero', 'titleLine1'), e.target.value)}
          />
        </div>

        <div className="seo-form-group">
          <label>Title Line 2</label>
          <input
            type="text"
            value={content.titleLine2 || ''}
            onChange={(e) => updateContent(buildPath(page, 'hero', 'titleLine2'), e.target.value)}
          />
        </div>

        <div className="seo-form-group">
          <label>Subtitle</label>
          <textarea
            value={content.subtitle || ''}
            onChange={(e) => updateContent(buildPath(page, 'hero', 'subtitle'), e.target.value)}
            rows={3}
          />
        </div>

        <div className="seo-form-row">
          <div className="seo-form-group">
            <label>Button 1 Text</label>
            <input
              type="text"
              value={content.button1Text || ''}
              onChange={(e) => updateContent(buildPath(page, 'hero', 'button1Text'), e.target.value)}
            />
          </div>
          <div className="seo-form-group">
            <label>Button 1 Link</label>
            <input
              type="text"
              value={content.button1Link || ''}
              onChange={(e) => updateContent(buildPath(page, 'hero', 'button1Link'), e.target.value)}
            />
          </div>
        </div>

        <div className="seo-form-row">
          <div className="seo-form-group">
            <label>Button 2 Text</label>
            <input
              type="text"
              value={content.button2Text || ''}
              onChange={(e) => updateContent(buildPath(page, 'hero', 'button2Text'), e.target.value)}
            />
          </div>
          <div className="seo-form-group">
            <label>Button 2 Link</label>
            <input
              type="text"
              value={content.button2Link || ''}
              onChange={(e) => updateContent(buildPath(page, 'hero', 'button2Link'), e.target.value)}
            />
          </div>
        </div>

        <div className="seo-form-group">
          <label>Hero Image</label>
          <ImageUploader
            currentImage={content.image}
            onUpload={(file) => handleImageUpload(buildPath(page, 'hero', 'image'), file)}
            onUrlChange={(url) => updateContent(buildPath(page, 'hero', 'image'), url)}
          />
        </div>
      </div>
    </div>
  );
};

// Stat About Editor
const StatAboutEditor = ({ content, updateContent, handleImageUpload, page = 'home' }) => {
  return (
    <div className="seo-section-editor">
      <h3>About & Stats Section</h3>
      <div className="seo-form">
        <div className="seo-form-group">
          <label>Tag</label>
          <input
            type="text"
            value={content.tag || ''}
            onChange={(e) => updateContent(buildPath(page, 'statAbout', 'tag'), e.target.value)}
          />
        </div>

        <div className="seo-form-group">
          <label>Title</label>
          <input
            type="text"
            value={content.title || ''}
            onChange={(e) => updateContent('home.statAbout.title', e.target.value)}
          />
        </div>

        <div className="seo-form-group">
          <label>Description</label>
          <textarea
            value={content.description || ''}
            onChange={(e) => updateContent('home.statAbout.description', e.target.value)}
            rows={4}
          />
        </div>

        <div className="seo-form-group">
          <label>Experience Number</label>
          <input
            type="text"
            value={content.experienceNumber || ''}
            onChange={(e) => updateContent('home.statAbout.experienceNumber', e.target.value)}
          />
        </div>

        <div className="seo-form-group">
          <label>Experience Label</label>
          <input
            type="text"
            value={content.experienceLabel || ''}
            onChange={(e) => updateContent('home.statAbout.experienceLabel', e.target.value)}
          />
        </div>

        <div className="seo-form-group">
          <label>Team Text</label>
          <input
            type="text"
            value={content.teamText || ''}
            onChange={(e) => updateContent('home.statAbout.teamText', e.target.value)}
          />
        </div>

        <h4>Statistics</h4>
        <div className="seo-form-row">
          <div className="seo-form-group">
            <label>Stat 1 Number</label>
            <input
              type="text"
              value={content.stat1Number || ''}
              onChange={(e) => updateContent('home.statAbout.stat1Number', e.target.value)}
            />
          </div>
          <div className="seo-form-group">
            <label>Stat 1 Suffix</label>
            <input
              type="text"
              value={content.stat1Suffix || ''}
              onChange={(e) => updateContent('home.statAbout.stat1Suffix', e.target.value)}
            />
          </div>
          <div className="seo-form-group">
            <label>Stat 1 Label</label>
            <input
              type="text"
              value={content.stat1Label || ''}
              onChange={(e) => updateContent('home.statAbout.stat1Label', e.target.value)}
            />
          </div>
        </div>

        <div className="seo-form-row">
          <div className="seo-form-group">
            <label>Stat 2 Number</label>
            <input
              type="text"
              value={content.stat2Number || ''}
              onChange={(e) => updateContent('home.statAbout.stat2Number', e.target.value)}
            />
          </div>
          <div className="seo-form-group">
            <label>Stat 2 Suffix</label>
            <input
              type="text"
              value={content.stat2Suffix || ''}
              onChange={(e) => updateContent('home.statAbout.stat2Suffix', e.target.value)}
            />
          </div>
          <div className="seo-form-group">
            <label>Stat 2 Label</label>
            <input
              type="text"
              value={content.stat2Label || ''}
              onChange={(e) => updateContent('home.statAbout.stat2Label', e.target.value)}
            />
          </div>
        </div>

        <div className="seo-form-row">
          <div className="seo-form-group">
            <label>Stat 3 Number</label>
            <input
              type="text"
              value={content.stat3Number || ''}
              onChange={(e) => updateContent('home.statAbout.stat3Number', e.target.value)}
            />
          </div>
          <div className="seo-form-group">
            <label>Stat 3 Suffix</label>
            <input
              type="text"
              value={content.stat3Suffix || ''}
              onChange={(e) => updateContent('home.statAbout.stat3Suffix', e.target.value)}
            />
          </div>
          <div className="seo-form-group">
            <label>Stat 3 Label</label>
            <input
              type="text"
              value={content.stat3Label || ''}
              onChange={(e) => updateContent('home.statAbout.stat3Label', e.target.value)}
            />
          </div>
        </div>

        <div className="seo-form-row">
          <div className="seo-form-group">
            <label>CTA Text</label>
            <input
              type="text"
              value={content.ctaText || ''}
              onChange={(e) => updateContent('home.statAbout.ctaText', e.target.value)}
            />
          </div>
          <div className="seo-form-group">
            <label>CTA Link</label>
            <input
              type="text"
              value={content.ctaLink || ''}
              onChange={(e) => updateContent('home.statAbout.ctaLink', e.target.value)}
            />
          </div>
        </div>

        <h4>Images</h4>
        {['image1', 'image2', 'image3', 'image4'].map((imgKey, idx) => (
          <div className="seo-form-group" key={imgKey}>
            <label>Image {idx + 1}</label>
            <ImageUploader
              currentImage={content.images?.[imgKey]}
              onUpload={(file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  updateContent(`home.statAbout.images.${imgKey}`, reader.result);
                };
                reader.readAsDataURL(file);
              }}
              onUrlChange={(url) => updateContent(`home.statAbout.images.${imgKey}`, url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Services Editor
const ServicesEditor = ({ content, updateContent, addArrayItem, removeArrayItem, handleImageUpload }) => {
  const services = content.items || [];

  return (
    <div className="seo-section-editor">
      <h3>Services Section</h3>
      <div className="seo-form">
        <div className="seo-form-group">
          <label>Heading</label>
          <input
            type="text"
            value={content.heading || ''}
            onChange={(e) => updateContent('home.services.heading', e.target.value)}
          />
        </div>

        <div className="seo-form-group">
          <label>Description</label>
          <textarea
            value={content.description || ''}
            onChange={(e) => updateContent('home.services.description', e.target.value)}
            rows={3}
          />
        </div>

        <div className="seo-array-section">
          <div className="seo-array-header">
            <h4>Service Items</h4>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => addArrayItem('home.services.items', {
                key: `service-${Date.now()}`,
                title: 'New Service',
                excerpt: '',
                image: '',
                link: '/contact'
              })}
            >
              Add Service
            </button>
          </div>

          {services.map((service, index) => (
            <div key={index} className="seo-array-item">
              <div className="seo-array-item-header">
                <h5>Service {index + 1}</h5>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeArrayItem('home.services.items', index)}
                >
                  Remove
                </button>
              </div>

              <div className="seo-form-group">
                <label>Key</label>
                <input
                  type="text"
                  value={service.key || ''}
                  onChange={(e) => updateNestedContent('home.services.items', index, { key: e.target.value })}
                />
              </div>

              <div className="seo-form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={service.title || ''}
                  onChange={(e) => updateNestedContent('home.services.items', index, { title: e.target.value })}
                />
              </div>

              <div className="seo-form-group">
                <label>Excerpt</label>
                <textarea
                  value={service.excerpt || ''}
                  onChange={(e) => updateNestedContent('home.services.items', index, { excerpt: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="seo-form-group">
                <label>Link</label>
                <input
                  type="text"
                  value={service.link || ''}
                  onChange={(e) => updateNestedContent('home.services.items', index, { link: e.target.value })}
                />
              </div>

              <div className="seo-form-group">
                <label>Image</label>
                <ImageUploader
                  currentImage={service.image}
                  onUpload={(file) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      updateNestedContent('home.services.items', index, { image: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }}
                  onUrlChange={(url) => updateNestedContent('home.services.items', index, { image: url })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Talent Editor
const TalentEditor = ({ content, updateContent, addArrayItem, removeArrayItem, handleImageUpload }) => {
  const categories = content.categories || [];

  return (
    <div className="seo-section-editor">
      <h3>Talent Section</h3>
      <div className="seo-form">
        <div className="seo-form-group">
          <label>Heading</label>
          <input
            type="text"
            value={content.heading || ''}
            onChange={(e) => updateContent('home.talent.heading', e.target.value)}
          />
        </div>

        <div className="seo-array-section">
          <div className="seo-array-header">
            <h4>Talent Categories</h4>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => addArrayItem('home.talent.categories', {
                key: `category-${Date.now()}`,
                label: 'New Category',
                intro: '',
                roles: [],
                images: ['', '', ''],
                learnMoreUrl: '/services',
                shapeColors: ['rgba(229, 9, 20, 0.25)', 'rgba(4, 87, 87, 0.25)', 'rgba(6, 90, 99, 0.25)']
              })}
            >
              Add Category
            </button>
          </div>

          {categories.map((category, index) => (
            <div key={index} className="seo-array-item">
              <div className="seo-array-item-header">
                <h5>Category {index + 1}: {category.label || 'Unnamed'}</h5>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeArrayItem('home.talent.categories', index)}
                >
                  Remove
                </button>
              </div>

              <div className="seo-form-group">
                <label>Key</label>
                <input
                  type="text"
                  value={category.key || ''}
                  onChange={(e) => updateNestedContent('home.talent.categories', index, { key: e.target.value })}
                />
              </div>

              <div className="seo-form-group">
                <label>Label</label>
                <input
                  type="text"
                  value={category.label || ''}
                  onChange={(e) => updateNestedContent('home.talent.categories', index, { label: e.target.value })}
                />
              </div>

              <div className="seo-form-group">
                <label>Intro</label>
                <textarea
                  value={category.intro || ''}
                  onChange={(e) => updateNestedContent('home.talent.categories', index, { intro: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="seo-form-group">
                <label>Roles (comma-separated)</label>
                <input
                  type="text"
                  value={Array.isArray(category.roles) ? category.roles.join(', ') : ''}
                  onChange={(e) => {
                    const roles = e.target.value.split(',').map(r => r.trim()).filter(r => r);
                    updateNestedContent('home.talent.categories', index, { roles });
                  }}
                  placeholder="Role 1, Role 2, Role 3"
                />
              </div>

              <div className="seo-form-group">
                <label>Learn More URL</label>
                <input
                  type="text"
                  value={category.learnMoreUrl || ''}
                  onChange={(e) => updateNestedContent('home.talent.categories', index, { learnMoreUrl: e.target.value })}
                />
              </div>

              <h6>Images</h6>
              {[0, 1, 2].map((imgIdx) => (
                <div className="seo-form-group" key={imgIdx}>
                  <label>Image {imgIdx + 1}</label>
                  <ImageUploader
                    currentImage={category.images?.[imgIdx]}
                    onUpload={(file) => {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const newImages = [...(category.images || ['', '', ''])];
                        newImages[imgIdx] = reader.result;
                        updateNestedContent('home.talent.categories', index, { images: newImages });
                      };
                      reader.readAsDataURL(file);
                    }}
                    onUrlChange={(url) => {
                      const newImages = [...(category.images || ['', '', ''])];
                      newImages[imgIdx] = url;
                      updateNestedContent('home.talent.categories', index, { images: newImages });
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Why Stats Editor
const WhyStatsEditor = ({ content, updateContent, addArrayItem, removeArrayItem, handleImageUpload }) => {
  const cards = content.cards || [];

  return (
    <div className="seo-section-editor">
      <h3>Why Stats Section</h3>
      <div className="seo-form">
        <div className="seo-form-group">
          <label>Heading</label>
          <input
            type="text"
            value={content.heading || ''}
            onChange={(e) => updateContent('home.whyStats.heading', e.target.value)}
          />
        </div>

        <div className="seo-array-section">
          <div className="seo-array-header">
            <h4>Why Cards</h4>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => addArrayItem('home.whyStats.cards', {
                title: 'New Card',
                summary: '',
                description: '',
                icon: '/iconanimated/algorithm.gif'
              })}
            >
              Add Card
            </button>
          </div>

          {cards.map((card, index) => (
            <div key={index} className="seo-array-item">
              <div className="seo-array-item-header">
                <h5>Card {index + 1}</h5>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeArrayItem('home.whyStats.cards', index)}
                >
                  Remove
                </button>
              </div>

              <div className="seo-form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={card.title || ''}
                  onChange={(e) => updateNestedContent('home.whyStats.cards', index, { title: e.target.value })}
                />
              </div>

              <div className="seo-form-group">
                <label>Summary</label>
                <input
                  type="text"
                  value={card.summary || ''}
                  onChange={(e) => updateNestedContent('home.whyStats.cards', index, { summary: e.target.value })}
                />
              </div>

              <div className="seo-form-group">
                <label>Description</label>
                <textarea
                  value={card.description || ''}
                  onChange={(e) => updateNestedContent('home.whyStats.cards', index, { description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="seo-form-group">
                <label>Icon URL</label>
                <input
                  type="text"
                  value={card.icon || ''}
                  onChange={(e) => updateNestedContent('home.whyStats.cards', index, { icon: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Blog Editor
const BlogEditor = ({ content, updateContent, addArrayItem, removeArrayItem, handleImageUpload }) => {
  const items = content.items || [];

  return (
    <div className="seo-section-editor">
      <h3>Blog Section</h3>
      <div className="seo-form">
        <div className="seo-form-group">
          <label>Heading</label>
          <input
            type="text"
            value={content.heading || ''}
            onChange={(e) => updateContent('home.blog.heading', e.target.value)}
          />
        </div>

        <div className="seo-form-group">
          <label>Subheading</label>
          <input
            type="text"
            value={content.subheading || ''}
            onChange={(e) => updateContent('home.blog.subheading', e.target.value)}
          />
        </div>

        <div className="seo-form-group">
          <label>Read More URL</label>
          <input
            type="text"
            value={content.readMoreUrl || ''}
            onChange={(e) => updateContent('home.blog.readMoreUrl', e.target.value)}
          />
        </div>

        <div className="seo-array-section">
          <div className="seo-array-header">
            <h4>Blog Items</h4>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => addArrayItem('home.blog.items', {
                slug: `blog-${Date.now()}`,
                title: 'New Blog Post',
                excerpt: '',
                image: '',
                readMoreUrl: '#',
                tags: []
              })}
            >
              Add Blog Post
            </button>
          </div>

          {items.map((item, index) => (
            <div key={index} className="seo-array-item">
              <div className="seo-array-item-header">
                <h5>Post {index + 1}</h5>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeArrayItem('home.blog.items', index)}
                >
                  Remove
                </button>
              </div>

              <div className="seo-form-group">
                <label>Slug</label>
                <input
                  type="text"
                  value={item.slug || ''}
                  onChange={(e) => updateNestedContent('home.blog.items', index, { slug: e.target.value })}
                />
              </div>

              <div className="seo-form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => updateNestedContent('home.blog.items', index, { title: e.target.value })}
                />
              </div>

              <div className="seo-form-group">
                <label>Excerpt</label>
                <textarea
                  value={item.excerpt || ''}
                  onChange={(e) => updateNestedContent('home.blog.items', index, { excerpt: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="seo-form-group">
                <label>Read More URL</label>
                <input
                  type="text"
                  value={item.readMoreUrl || ''}
                  onChange={(e) => updateNestedContent('home.blog.items', index, { readMoreUrl: e.target.value })}
                />
              </div>

              <div className="seo-form-group">
                <label>Tags (comma-separated)</label>
                <input
                  type="text"
                  value={Array.isArray(item.tags) ? item.tags.join(', ') : ''}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                    updateNestedContent('home.blog.items', index, { tags });
                  }}
                />
              </div>

              <div className="seo-form-group">
                <label>Image</label>
                <ImageUploader
                  currentImage={item.image}
                  onUpload={(file) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      updateNestedContent('home.blog.items', index, { image: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }}
                  onUrlChange={(url) => updateNestedContent('home.blog.items', index, { image: url })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Meta Tags Editor
const MetaEditor = ({ content, updateContent }) => {
  return (
    <div className="seo-section-editor">
      <h3>Meta Tags</h3>
      <div className="seo-form">
        <div className="seo-form-group">
          <label>Home Page Title</label>
          <input
            type="text"
            value={content.home?.title || ''}
            onChange={(e) => updateContent('meta.home.title', e.target.value)}
          />
        </div>

        <div className="seo-form-group">
          <label>Home Page Description</label>
          <textarea
            value={content.home?.description || ''}
            onChange={(e) => updateContent('meta.home.description', e.target.value)}
            rows={3}
          />
        </div>

        <div className="seo-form-group">
          <label>Home Page Keywords</label>
          <input
            type="text"
            value={content.home?.keywords || ''}
            onChange={(e) => updateContent('meta.home.keywords', e.target.value)}
            placeholder="keyword1, keyword2, keyword3"
          />
        </div>
      </div>
    </div>
  );
};

// Image Uploader Component
const ImageUploader = ({ currentImage, onUpload, onUrlChange }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (currentImage && !currentImage.startsWith('data:')) {
      setImageUrl(currentImage);
    }
  }, [currentImage]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleUrlSubmit = () => {
    if (imageUrl) {
      onUrlChange(imageUrl);
    }
  };

  return (
    <div className="image-uploader">
      {currentImage && (
        <div className="image-preview">
          <img src={currentImage} alt="Preview" />
        </div>
      )}
      <div className="image-uploader-controls">
        <div className="image-uploader-upload">
          <label className="btn btn-secondary btn-sm">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <div className="image-uploader-url">
          <input
            type="text"
            placeholder="Or enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit()}
          />
          <button className="btn btn-primary btn-sm" onClick={handleUrlSubmit}>
            Use URL
          </button>
        </div>
      </div>
    </div>
  );
};

export default SEOContentManager;

