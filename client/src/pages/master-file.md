# Master File - All Code Changes

This file contains all the code changes made to the Home page, About Us page, and Services page.

---

## ============================================
## 1. HOME PAGE - StatAbout Component
## ============================================

### File: `client/src/components/StatAbout.jsx`

```jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSEOContent } from "../context/SEOContentContext";
import "./StatAbout.css";

export default function StatAbout() {
  const { content } = useSEOContent();
  const statContent = content?.home?.statAbout || {};
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState({ clients: 0, satisfaction: 0, success: 0, placements: 0, experience: 0 });

  // IntersectionObserver to detect when section comes into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Counter animation when in view
  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    // Extract number from experienceNumber (e.g., "18+" -> 18)
    const experienceStr = statContent.experienceNumber || "18+";
    const experienceNum = parseInt(experienceStr.replace(/\D/g, '')) || 18;
    
    const targets = {
      clients: parseInt(statContent.stat1Number || 77),
      satisfaction: parseInt(statContent.stat2Number || 98),
      success: parseInt(statContent.stat3Number || 99),
      placements: 5000,
      experience: experienceNum
    };

    // Ease out cubic function
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    let rafId;
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);

      setCounts({
        clients: Math.round(targets.clients * eased),
        satisfaction: Math.round(targets.satisfaction * eased),
        success: Math.round(targets.success * eased),
        placements: Math.round(targets.placements * eased),
        experience: Math.round(targets.experience * eased)
      });

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [inView]);

  // Format number with suffix
  const formatStat = (value, suffix) => {
    if (suffix === 'K+') {
      return `${value}+`;
    }
    return `${value}${suffix}`;
  };

  return (
    <section className="stat-about" ref={sectionRef}>
      <div className="stat-about__container">
        {/* Header Section */}
        <div className="stat-about__header">
          <h2 className="stat-about__main-title">
            {statContent.title || "Our proven track record speaks volumes"}
          </h2>
          <p className="stat-about__main-description">
            {statContent.description || "We deliver measurable results through strategic talent solutions. Our commitment transforms businesses across industries."}
          </p>
        </div>

        {/* Grid Section - 5 Cards */}
        <div className="stat-about__grid">
          {/* Card 1 - Large Vertical (Top Left) */}
          <div className="stat-about__card stat-about__card--large">
            <div className="stat-about__card-number">
              {counts.experience}+
            </div>
            <div className="stat-about__card-content">
              <div className="stat-about__card-title">Years of expertise</div>
              <div className="stat-about__card-subtitle">Decades of refined recruitment strategies</div>
            </div>
          </div>

          {/* Card 2 - Image Placeholder (Top Middle) */}
          <div className="stat-about__card stat-about__card--image">
            <img 
              src={statContent.images?.image1 || "/images/imagetrail/image1.jpg"} 
              alt="Team collaboration" 
              className="stat-about__card-image"
              loading="lazy"
            />
          </div>

          {/* Card 3 - Stat Card (Top Right) */}
          <div className="stat-about__card stat-about__card--stat">
            <div className="stat-about__card-number">
              {counts.placements.toLocaleString()}+
            </div>
            <div className="stat-about__card-content">
              <div className="stat-about__card-title">Successful placements</div>
              <div className="stat-about__card-subtitle">Connecting talent with opportunity</div>
            </div>
          </div>

          {/* Card 4 - Stat Card (Bottom Left) */}
          <div className="stat-about__card stat-about__card--stat">
            <div className="stat-about__card-number">
              {formatStat(counts.satisfaction, statContent.stat2Suffix || '%')}
            </div>
            <div className="stat-about__card-content">
              <div className="stat-about__card-title">Client satisfaction</div>
              <div className="stat-about__card-subtitle">Consistently exceeding expectations</div>
            </div>
          </div>

          {/* Card 5 - Image Placeholder (Bottom Right) */}
          <div className="stat-about__card stat-about__card--image">
            <img 
              src={statContent.images?.image2 || "/images/imagetrail/image2.jpg"} 
              alt="Professional team" 
              className="stat-about__card-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

### File: `client/src/components/StatAbout.css`

```css
/* Stat About Section - New Design Matching Image */
.stat-about {
  width: 100%;
  background: #ffffff;
  padding: 5rem 0;
  font-family: 'Poppins', sans-serif;
}

.stat-about__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* Header Section */
.stat-about__header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 4vw, 4rem);
  align-items: start;
  margin-bottom: 1rem;
}

.stat-about__main-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  color: #1A2020;
  margin: 0;
  letter-spacing: -0.5px;
}

.stat-about__main-description {
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  line-height: 1.7;
  color: #6b7280;
  margin: 0;
  max-width: 600px;
}

/* Grid Section - 5 Cards */
.stat-about__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1.5rem;
  align-items: stretch;
}

/* Card Base Styles */
.stat-about__card {
  background: #f3f4f6;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* Card 1 - Large Vertical (spans 2 rows, column 1) */
.stat-about__card--large {
  grid-column: 1;
  grid-row: 1 / 3;
  justify-content: flex-start;
}

.stat-about__card--large .stat-about__card-number {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1;
  color: #1A2020;
  margin-bottom: 1.5rem;
}

.stat-about__card--large .stat-about__card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-about__card--large .stat-about__card-title {
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  font-weight: 600;
  color: #1A2020;
}

.stat-about__card--large .stat-about__card-subtitle {
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  color: #6b7280;
  line-height: 1.5;
}

/* Card 2 - Image Card (Top Middle, Column 2) */
.stat-about__card--image:nth-of-type(2) {
  grid-column: 2;
  grid-row: 1;
  padding: 0;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.stat-about__card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Card 3 - Stat Card (Top Right, Column 3) */
.stat-about__card--stat:nth-of-type(3) {
  grid-column: 3;
  grid-row: 1;
}

.stat-about__card--stat .stat-about__card-number {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1;
  color: #1A2020;
  margin-bottom: 1rem;
}

.stat-about__card--stat .stat-about__card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-about__card--stat .stat-about__card-title {
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-weight: 600;
  color: #1A2020;
}

.stat-about__card--stat .stat-about__card-subtitle {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  color: #6b7280;
  line-height: 1.5;
}

/* Card 4 - Stat Card (Bottom Left, Column 2) */
.stat-about__card--stat:nth-of-type(4) {
  grid-column: 2;
  grid-row: 2;
}

/* Card 5 - Image Card (Bottom Right, Column 3) */
.stat-about__card--image:nth-of-type(5) {
  grid-column: 3;
  grid-row: 2;
  padding: 0;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

/* Card Content Styles */
.stat-about__card-number {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1;
  color: #1A2020;
  margin-bottom: 1rem;
}

.stat-about__card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-about__card-title {
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  font-weight: 600;
  color: #1A2020;
}

.stat-about__card-subtitle {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  color: #6b7280;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .stat-about__header {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .stat-about__main-description {
    max-width: 100%;
  }

  .stat-about__grid {
    gap: 1.25rem;
  }
}

@media (max-width: 768px) {
  .stat-about {
    padding: 3rem 0;
  }

  .stat-about__container {
    gap: 2rem;
  }

  .stat-about__header {
    gap: 1rem;
  }

  .stat-about__grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 1rem;
  }

  .stat-about__card--large {
    grid-column: 1;
    grid-row: 1;
  }

  .stat-about__card--image:nth-of-type(2),
  .stat-about__card--image:nth-of-type(5) {
    grid-column: 1;
    grid-row: auto;
  }

  .stat-about__card--stat:nth-of-type(3),
  .stat-about__card--stat:nth-of-type(4) {
    grid-column: 1;
    grid-row: auto;
  }

  .stat-about__card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .stat-about {
    padding: 2rem 0;
  }

  .stat-about__card {
    padding: 1.25rem;
  }
}
```

---

## ============================================
## 2. HOME PAGE - ServicesSection Component
## ============================================

### File: `client/src/components/ServicesSection.jsx`

```jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSEOContent } from "../context/SEOContentContext";
import "./ServicesSection.css";
import services from "../data/servicesConfig.js";

const ServicesSection = () => {
  const { content } = useSEOContent();
  const seoServices = content?.home?.services;
  const { heading, description, items } = seoServices?.items?.length > 0 
    ? seoServices 
    : services;

  // Map services to match the image layout with categories
  const serviceCategories = [
    { category: "Staffing", icon: "📋" },
    { category: "IT Advisory", icon: "💼" },
    { category: "Startup", icon: "🚀" },
    { category: "Staffing", icon: "📝" },
    { category: "Leadership", icon: "👔" },
    { category: "Solutions", icon: "🎯" }
  ];

  // Ensure we have 6 items (duplicate or add if needed)
  const displayItems = items.length >= 6 
    ? items.slice(0, 6) 
    : [...items, ...items.slice(0, 6 - items.length)];

  return (
    <section className="vh-services" aria-labelledby="vh-services-heading">
      <div className="vh-services__container">
        {/* Header Section */}
        <div className="vh-services__header">
          <div className="vh-services__branding">Talent</div>
          <h2 id="vh-services-heading" className="vh-services__heading">
            {heading || "Our services"}
          </h2>
          <p className="vh-services__desc">
            {description || "Comprehensive solutions for every hiring challenge"}
          </p>
        </div>

        {/* Services Grid - 3x2 Layout */}
        <div className="vh-services__grid">
          {displayItems.map((it, i) => {
            const category = serviceCategories[i] || { category: "", icon: "📋" };
            return (
              <article
                key={it.key || i}
                className="vh-service-card"
              >
                {/* Image */}
                <div className="vh-service-card__image">
                  <img 
                    src={it.image} 
                    alt={it.title} 
                    className="vh-service-card__image-img"
                    loading="lazy"
                  />
                </div>

                {/* Card Body */}
                <div className="vh-service-card__body">
                  {category.category && (
                    <div className="vh-service-card__category">{category.category}</div>
                  )}
                  <h3 className="vh-service-card__title">{it.title}</h3>
                  <p className="vh-service-card__excerpt">{it.excerpt}</p>
                  <Link 
                    to={it.link || "/contact"} 
                    className="vh-service-card__link"
                    aria-label={`Learn more about ${it.title}`}
                  >
                    Learn more <span className="vh-service-card__link-arrow">&gt;</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
```

### File: `client/src/components/ServicesSection.css`

```css
/* ServicesSection.css - New Design Matching Image */
.vh-services {
  padding: clamp(4rem, 6vw, 6rem) 0;
  background: #ffffff;
  font-family: 'Poppins', sans-serif;
}

.vh-services__container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 4vw, 3rem);
}

/* Header Section */
.vh-services__header {
  text-align: center;
  margin-bottom: clamp(3rem, 5vw, 4.5rem);
}

.vh-services__branding {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  color: #1A2020;
  font-weight: 500;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
}

.vh-services__heading {
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  font-weight: 700;
  color: #1A2020;
  margin: 0 0 1rem 0;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.vh-services__desc {
  font-size: clamp(1rem, 2vw, 1.15rem);
  color: #4b5563;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Grid Layout - 3 columns, 2 rows */
.vh-services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
}

/* Service Card */
.vh-service-card {
  background: #f3f4f6;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.vh-service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  border-color: rgba(229, 9, 20, 0.1);
}

/* Image Section */
.vh-service-card__image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.5rem;
  background: #e5e7eb;
}

.vh-service-card__image-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.vh-service-card:hover .vh-service-card__image-img {
  transform: scale(1.05);
}

/* Card Body */
.vh-service-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.vh-service-card__category {
  font-size: clamp(0.75rem, 1.2vw, 0.875rem);
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.vh-service-card__title {
  font-size: clamp(1.1rem, 2.2vw, 1.35rem);
  margin: 0;
  color: #1A2020;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.3px;
}

.vh-service-card__excerpt {
  margin: 0;
  color: #4b5563;
  font-size: clamp(0.9rem, 1.8vw, 1rem);
  line-height: 1.6;
  flex: 1;
}

/* Link */
.vh-service-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: #1A2020;
  text-decoration: none;
  font-weight: 500;
  font-size: clamp(0.875rem, 1.5vw, 0.95rem);
  margin-top: 0.5rem;
  transition: all 0.3s ease;
  width: fit-content;
}

.vh-service-card__link:hover {
  color: #e50914;
  gap: 0.5rem;
}

.vh-service-card__link-arrow {
  font-size: 1em;
  transition: transform 0.3s ease;
}

.vh-service-card__link:hover .vh-service-card__link-arrow {
  transform: translateX(4px);
}

.vh-service-card__link:focus {
  outline: 2px solid #e50914;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .vh-services__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

@media (max-width: 768px) {
  .vh-services {
    padding: clamp(3rem, 5vw, 4rem) 0;
  }

  .vh-services__header {
    margin-bottom: 2.5rem;
  }

  .vh-services__grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .vh-service-card {
    padding: 1.75rem;
  }
}

@media (max-width: 480px) {
  .vh-services__container {
    padding: 0 1rem;
  }

  .vh-service-card {
    padding: 1.5rem;
  }

  .vh-service-card__image {
    height: 180px;
  }
}
```

---

## ============================================
## 3. HOME PAGE - Home.jsx
## ============================================

### File: `client/src/pages/Home.jsx`

```jsx
import React, { Suspense, lazy } from "react";
import Hero from "../components/ThirdHero";
import ScrollingBanner from "../components/ScrollingBanner";
import StatAbout from "../components/StatAbout";

// Lazy load heavy components that are below the fold
const Certifications = lazy(() => import("../components/Certifications"));
const TalentSection = lazy(() => import("../components/TalentSection"));
const ServicesSection = lazy(() => import("../components/ServicesSection"));
const BlogSection = lazy(() => import("../components/BlogSection"));

// Loading fallback for lazy components
const LazyFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100px',
    fontSize: '16px',
    color: '#666'
  }}>
    Loading...
  </div>
);

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollingBanner />
      <StatAbout />
      <Suspense fallback={<LazyFallback />}>
        <ServicesSection/>
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <TalentSection/>
      </Suspense>
      {/* Certifications section removed as requested */}
      {/* JourneyStats section removed as requested */}
      {/* WhyStats section removed */}
      <Suspense fallback={<LazyFallback />}>
        <BlogSection/>
      </Suspense>
    </>
  );
}
```

---

## ============================================
## 4. ABOUT US PAGE
## ============================================

### File: `client/src/pages/AboutUs.jsx`

[See full code in the file - too long to include here. The file contains the complete AboutUs component with all sections: Hero, Mission & Vision, Our Approach, Industries, AI Platform, Our Impact, Performance Metrics, and CTA sections.]

### File: `client/src/pages/AboutUs.css`

[See full code in the file - too long to include here. The file contains all CSS styles for the AboutUs page including responsive design for all breakpoints.]

**Key Changes Made:**
- Complete redesign of the About Us page
- Changed all green colors (#4CAF50) to red (#e50914)
- Removed "Client Voices" section
- Updated image paths to use `/aboutus/` folder
- All "Connect" links navigate to `/contact`
- Reduced size of `aboutus6.png` image in "Our Impact" section
- Fixed image repetition in "AI-Powered Platform" section

---

## ============================================
## 5. SERVICES PAGE
## ============================================

### File: `client/src/pages/Services.jsx`

[See full code in the file - too long to include here. The file contains the complete Services component with Hero section, Services Grid section, and all other service-related sections.]

### File: `client/src/pages/Services.css`

[See full code in the file - too long to include here. The file contains all CSS styles for the Services page including responsive design for all breakpoints.]

**Key Changes Made:**
- Replaced hero section with new design
- Added "Services Grid Section" with 3-card layout
- Updated image paths to use `/aboutus/` folder images
- Changed green colors to red (#e50914) for buttons
- Updated class names to match existing page structure

---

## ============================================
## SUMMARY OF ALL CHANGES
## ============================================

### Home Page Changes:
1. **StatAbout Component**: Redesigned with 5-card grid layout and counter animations
2. **ServicesSection Component**: Redesigned with 3x2 grid layout and image cards
3. **Home.jsx**: Updated to use new components

### About Us Page Changes:
1. Complete page redesign with new sections
2. Color scheme changed from green to red
3. Removed "Client Voices" section
4. Image path updates
5. Responsive design improvements

### Services Page Changes:
1. New hero section design
2. Added "Services Grid Section"
3. Image path updates
4. Color scheme updates
5. Responsive design improvements

---

**Note**: For the complete code of AboutUs.jsx, AboutUs.css, Services.jsx, and Services.css, please refer to the actual files in the codebase as they are too extensive to include in this master file.

