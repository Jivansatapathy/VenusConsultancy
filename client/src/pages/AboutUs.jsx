// client/src/pages/AboutUs.jsx
import React from "react";
import { Link } from 'react-router-dom';
import "./AboutUs.css";
import ImageTrail from "../components/ImageTrail";

const AboutUs = () => {
  return (
    <main className="about-page">
      {/* Hero Section - About Us Design with Image Trail */}
      <section className="about-hero-section">
        <div className="about-hero-container">
          <div className="about-hero-grid">
            {/* Left Side - Image */}
            <div className="about-hero-left">
              <div className="about-hero-image-wrapper">
                <img 
                  src="/aboutus/Venuscom.png" 
                  alt="About us" 
                  className="about-hero-image"
                />
              </div>
            </div>
            {/* Right Side - Text and Features */}
            <div className="about-hero-right">
              <span className="about-hero-tag">ABOUT US</span>
              <h1 className="about-hero-title">
                The most loved <span className="about-hero-title-highlight">Agency</span>
              </h1>
              <p className="about-hero-description">
                We connect ambitious teams across the USA and beyond with the right talent to build the future—faster and with confidence. Our mission drives everything we do.
              </p>
              
              {/* Feature Cards Grid */}
              <div className="about-hero-features">
                <div className="about-hero-feature-card">
                  <div className="about-hero-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="8" r="3" stroke="white" strokeWidth="1.5" fill="none"/>
                      <path d="M6 18v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M12 6l1 2 2 0.5-1.5 1.5 0.5 2-2-1.5-2 1.5 0.5-2-1.5-1.5 2-0.5z" fill="white"/>
                    </svg>
                  </div>
                  <div className="about-hero-feature-text">
                    <div className="about-hero-feature-title">Easiest Admin</div>
                    <div className="about-hero-feature-date">Fall 2023</div>
                  </div>
                </div>
                
                <div className="about-hero-feature-card">
                  <div className="about-hero-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 10v11M7 10l-4-1v6l4-1M7 10l5-1v6l-5-1M17 7v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="white"/>
                    </svg>
                  </div>
                  <div className="about-hero-feature-text">
                    <div className="about-hero-feature-title">Users love Us</div>
                    <div className="about-hero-feature-date">Winter 2023</div>
                  </div>
                </div>
                
                <div className="about-hero-feature-card">
                  <div className="about-hero-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </div>
                  <div className="about-hero-feature-text">
                    <div className="about-hero-feature-title">Leader</div>
                    <div className="about-hero-feature-date">Winter 2023</div>
                  </div>
                </div>
                
                <div className="about-hero-feature-card">
                  <div className="about-hero-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="8" r="2.5" stroke="white" strokeWidth="1.5" fill="none"/>
                      <path d="M7 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      <rect x="6" y="14" width="12" height="2" rx="1" fill="white"/>
                    </svg>
                  </div>
                  <div className="about-hero-feature-text">
                    <div className="about-hero-feature-title">Best support</div>
                    <div className="about-hero-feature-date">Winter 2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Image Trail Overlay */}
          <div className="hero-image-trail">
            <ImageTrail
              items={[
                '/images/imagetrail/image1.jpg',
                '/images/imagetrail/image2.jpg',
                '/images/imagetrail/image3.jpg',
                '/images/imagetrail/image4.jpg',
                '/images/imagetrail/image5.jpg',
                '/images/imagetrail/image6.jpg',
                '/images/imagetrail/image7.jpg',
                '/images/imagetrail/image8.jpg',
                '/images/imagetrail/image9.jpg',
              ]}
              variant={1}
            />
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-header">
            <span className="mission-vision-tag">MISSION & VISION</span>
            <h2 className="mission-vision-title">Our purpose drives excellence</h2>
            <p className="mission-vision-subtitle">
              Building the future of talent acquisition through innovation and strategic partnerships
            </p>
          </div>

          <div className="mission-vision-grid">
            <div className="mission-vision-card">
              <div className="mission-vision-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="mission-vision-card-tag">Mission</span>
              <h3 className="mission-vision-card-title">Empowering talent transformation</h3>
              <p className="mission-vision-card-description">
                We connect exceptional talent with transformative opportunities, leveraging scientific precision to reshape how organizations build their teams.
              </p>
            </div>

            <div className="mission-vision-card">
              <div className="mission-vision-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="mission-vision-card-tag">Vision</span>
              <h3 className="mission-vision-card-title">Global leadership in talent</h3>
              <p className="mission-vision-card-description">
                To become the global leader in scientific talent acquisition, setting new standards for precision and impact.
              </p>
            </div>

            <div className="mission-vision-card">
              <div className="mission-vision-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="mission-vision-card-tag">Core Values</span>
              <h3 className="mission-vision-card-title">Integrity and excellence</h3>
              <p className="mission-vision-card-description">
                Integrity, innovation, and excellence guide every decision we make in service of our clients and candidates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="about-approach-section">
        <div className="container">
          <div className="about-approach-header">
            <span className="about-approach-tag">OUR APPROACH</span>
            <h2 className="about-approach-title">Recruitment excellence reimagined</h2>
            <p className="about-approach-subtitle">
              We transform recruitment from transactional process to strategic partnership
            </p>
          </div>

          <div className="about-approach-grid">
            <div className="about-approach-unified-card">
              <div className="about-approach-image-column">
                <img 
                  src="/aboutus/aboutus1.png"
                  alt="Modern professional in workspace" 
                  className="about-approach-hero-image"
                />
              </div>
              <div className="about-approach-middle-column">
                <div className="about-approach-middle-content">
                  <span className="about-approach-card-tag">Methodology</span>
                  <h3 className="about-approach-card-title">Scientific discipline in talent mapping</h3>
                  <p className="about-approach-card-description">
                    Precision screening with advanced assessment frameworks and predictive analytics
                  </p>
                  <a href="#methodology" className="about-approach-card-link">
                    Learn more
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="about-approach-cards-stack">
              <div className="about-approach-card-small">
                <div className="about-approach-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="about-approach-card-small-title">Data-driven insights</h4>
                <p className="about-approach-card-small-description">
                  Leveraging machine learning to decode complex talent landscapes
                </p>
                <a href="#insights" className="about-approach-card-link">
                  Explore
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>

              <div className="about-approach-card-small">
                <div className="about-approach-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 21V13C16 12.4477 15.5523 12 15 12H9C8.44772 12 8 12.4477 8 13V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="about-approach-card-small-title">Enterprise partnerships</h4>
                <p className="about-approach-card-small-description">
                  Strategic talent solutions aligned with organizational growth objectives
                </p>
                <Link to="/contact" className="about-approach-card-link">
                  Connect
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="industries-section">
        <div className="container">
          <div className="industries-header">
            <span className="industries-label">Our domains</span>
            <h2 className="industries-title">Talent solutions across industries</h2>
            <p className="industries-subtitle">
              Specialized recruitment strategies tailored to unique sector demands
            </p>
          </div>

          <div className="industries-grid">
            <div className="industries-left-column">
              <div className="industries-card-large">
                <div className="industries-card-image-wrapper">
                  <img 
                    src="/aboutus/aboutus2.png"
                    alt="Technical and IT recruitment" 
                    className="industries-card-image"
                  />
                </div>
                <div className="industries-card-content">
                  <span className="industries-card-category">Technology</span>
                  <h3 className="industries-card-title">Technical and IT recruitment</h3>
                  <p className="industries-card-description">
                    Sourcing top-tier tech talent from software engineers to cybersecurity experts
                  </p>
                  <div className="industries-card-ctas">
                    <a href="#tech-roles" className="industries-cta-primary">View roles</a>
                    <a href="#tech-explore" className="industries-cta-link">
                      Explore
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="industries-card-bottom-left">
                <div className="industries-card-image-wrapper">
                  <img 
                    src="/aboutus/aboutus4.png"
                    alt="Life sciences and healthcare professionals" 
                    className="industries-card-image"
                  />
                </div>
                <div className="industries-card-content">
                  <span className="industries-card-category">Healthcare</span>
                  <h3 className="industries-card-title">Life sciences and healthcare professionals</h3>
                  <p className="industries-card-description">
                    Connecting innovative medical and research talent
                  </p>
                  <a href="#healthcare" className="industries-cta-link">
                    Discover
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="industries-right-column">
              <div className="industries-cards-stack-top">
                <div className="industries-card-small">
                  <div className="industries-card-icon">
                    <img src="/aboutus/engineering.png" alt="Engineering" />
                  </div>
                  <h4 className="industries-card-small-title">Engineering and manufacturing</h4>
                  <p className="industries-card-small-description">
                    Precision talent for complex industrial landscapes
                  </p>
                  <a href="#engineering" className="industries-cta-link">
                    Learn more
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>

                <div className="industries-card-small">
                  <div className="industries-card-icon">
                    <img src="/aboutus/finance.png" alt="Finance" />
                  </div>
                  <h4 className="industries-card-small-title">Finance and business</h4>
                  <p className="industries-card-small-description">
                    Strategic recruitment for financial and operational roles
                  </p>
                  <Link to="/contact" className="industries-cta-link">
                    Connect
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="industries-card-large-right">
                <div className="industries-card-image-wrapper">
                  <img 
                    src="/aboutus/aboutus3.png"
                    alt="Executive and leadership hiring" 
                    className="industries-card-image"
                  />
                </div>
                <div className="industries-card-content">
                  <span className="industries-card-category">Leadership</span>
                  <h3 className="industries-card-title">Executive and leadership hiring</h3>
                  <p className="industries-card-description">
                    Identifying transformative leaders who drive organizational excellence
                  </p>
                  <div className="industries-card-ctas">
                    <a href="#leadership-roles" className="industries-cta-primary">View opportunities</a>
                    <a href="#leadership-explore" className="industries-cta-link">
                      Explore
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Platform Section */}
      <section className="ai-platform-section">
        <div className="container">
          <div className="ai-platform-grid">
            <div className="ai-platform-text-column">
              <span className="ai-platform-label">Intelligence</span>
              <h2 className="ai-platform-title">AI-powered talent discovery platform</h2>
              <p className="ai-platform-description">
                Machine learning transforms recruitment. Advanced algorithms decode complex talent landscapes with unprecedented precision and insight.
              </p>
              <div className="ai-platform-ctas">
                <a href="#explore" className="ai-platform-btn-explore">Explore</a>
                <Link to="/contact" className="ai-platform-link-connect">
                  Connect
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>

            <div className="ai-platform-images-column">
              <div className="ai-platform-image-large">
                <img src="/aboutus/aboutus5.png" alt="AI-powered talent discovery" />
              </div>
              <div className="ai-platform-image-small">
                <img src="/aboutus/aboutus2.png" alt="Collaborative workspace" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact / Why Venus Hiring Section */}
      <section className="our-impact-section">
        <div className="container">
          <div className="our-impact-header">
            <h2 className="our-impact-title">Why Venus Hiring</h2>
          </div>

          <div className="our-impact-grid">
            <div className="our-impact-image-column">
              <div className="our-impact-image-card">
                <img src="/aboutus/aboutus6.png" alt="Our Impact" />
              </div>
            </div>

            <div className="our-impact-features-column">
              <div className="our-impact-features-grid">
                <div className="our-impact-feature-block">
                  <div className="our-impact-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 18L8 13L12 17L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 8H15L13 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="our-impact-feature-title">Measurable recruitment impact</h3>
                  <p className="our-impact-feature-description">
                    Accelerate hiring strategies with data-driven precision and strategic talent mapping.
                  </p>
                </div>

                <div className="our-impact-feature-block">
                  <div className="our-impact-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="our-impact-feature-title">Faster placements</h3>
                  <p className="our-impact-feature-description">
                    Reduce time-to-hire with intelligent candidate screening and matching technologies.
                  </p>
                </div>

                <div className="our-impact-feature-block">
                  <div className="our-impact-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h3 className="our-impact-feature-title">Quality candidates</h3>
                  <p className="our-impact-feature-description">
                    Identify top-tier professionals through advanced assessment and predictive analytics.
                  </p>
                </div>

                <div className="our-impact-feature-block">
                  <div className="our-impact-feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L3 7L12 12L21 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 17L12 22L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="our-impact-feature-title">Compliance assurance</h3>
                  <p className="our-impact-feature-description">
                    Ensure rigorous candidate verification and regulatory alignment across recruitment processes.
                  </p>
                </div>
              </div>

              <div className="our-impact-ctas">
                <a href="#learn" className="our-impact-btn-learn">Learn</a>
                <a href="#insights" className="our-impact-link-insights">
                  Insights
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="performance-section">
        <div className="container">
          <div className="performance-grid">
            <div className="performance-text-column">
              <span className="performance-label">Performance</span>
              <h2 className="performance-title">Recruitment metrics that demonstrate our scientific approach</h2>
              <p className="performance-description">
                Quantitative insights reveal the power of intelligent talent acquisition across industries.
              </p>
              <div className="performance-ctas">
                <a href="#analyze" className="performance-btn-analyze">Analyze</a>
                <a href="#details" className="performance-link-details">
                  Details
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="performance-metrics-column">
              <div className="performance-metrics-grid">
                <div className="performance-metric-card">
                  <div className="performance-metric-value">92%</div>
                  <p className="performance-metric-description">Client satisfaction rate</p>
                </div>
                <div className="performance-metric-card">
                  <div className="performance-metric-value">75%</div>
                  <p className="performance-metric-description">Faster recruitment cycles</p>
                </div>
                <div className="performance-metric-card">
                  <div className="performance-metric-value">60%</div>
                  <p className="performance-metric-description">Improved candidate match</p>
                </div>
                <div className="performance-metric-card">
                  <div className="performance-metric-value">98%</div>
                  <p className="performance-metric-description">Compliance accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2 className="cta-heading">Ready to transform your talent strategy?</h2>
              <p className="cta-description">
                Partner with Venus Hiring and unlock precision hiring across global industries.
              </p>
              <div className="cta-buttons">
                <Link to="/jobs" className="cta-btn-primary">Hire talent</Link>
                <Link to="/jobs" className="cta-btn-secondary">Find jobs</Link>
              </div>
            </div>
            <div className="cta-image-wrapper">
              <img src="/aboutus/aboutus5.png" alt="Transform your talent strategy" className="cta-image" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
