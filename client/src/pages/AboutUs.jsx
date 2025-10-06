// client/src/pages/AboutUs.jsx
import React from "react";
import "./AboutUs.css";
import CurvedLoop from "../components/CurvedLoop";
import ImageTrail from "../components/ImageTrail";

const AboutUs = () => {
  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero__bg" />
        <div className="about-hero__container">
          <h1 id="about-hero-title" className="about-hero__title">
            About Venus Hiring
          </h1>
          <p className="about-hero__sub">
            We connect ambitious teams with the right talent to build the future—faster and with confidence.
          </p>
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

      {/* Stats + Buyers/Providers */}
      <section className="about-stats">
        <div className="about-stats__container">
          <div className="stats-row" role="group" aria-label="Key metrics">
            <div className="stat">
              <div className="stat__value">$2B+</div>
              <div className="stat__label">
                in global service
                <br />
                projects annually
              </div>
            </div>
            <div className="stat">
              <div className="stat__value">12M+</div>
              <div className="stat__label">
                active users
                <br />
                annually
              </div>
            </div>
            <div className="stat">
              <div className="stat__value">Every<br/>2 seconds</div>
              <div className="stat__label">
                buyers find a service provider
                <br />
                on Venus
              </div>
            </div>
          </div>

          <h2 className="about-stats__title">
            When you’re ready to execute,
            <br />
            you need firms that deliver.
          </h2>

          <div className="buyers-providers">
            <article className="bp-card bp-card--buyers">
              <div className="bp-card__content">
                <h3 className="bp-card__title">FOR BUYERS</h3>
                <p className="bp-card__text">
                  Solve your business challenge by searching our vetted database of 350,000+ service providers
                </p>
                <a href="/services" className="bp-card__link" aria-label="Start your search in services">Start your search</a>
              </div>
              <img className="bp-card__graphic" src="/graphic1.png" alt="Buyer graphic" loading="lazy" decoding="async" />
            </article>

            <article className="bp-card bp-card--providers">
              <img className="bp-card__graphic" src="/graphic2.png" alt="Provider graphic" loading="lazy" decoding="async" />
              <div className="bp-card__content">
                <h3 className="bp-card__title">FOR PROVIDERS</h3>
                <p className="bp-card__text">
                  Get listed where buying decisions are made so you can capture the attention of in-market prospects
                </p>
                <a href="/contact" className="bp-card__link" aria-label="Create a profile by contacting us">Create a profile</a>
              </div>
            </article>
          </div>
        </div>
      </section>


      {/* Technology & Innovation Section */}
      <section className="tech-innovation" aria-labelledby="tech-title">
        <div className="tech-container">
          <div className="tech-header">
            <h2 id="tech-title" className="tech-title">Technology & Innovation</h2>
            <p className="tech-subtitle">
              We leverage cutting-edge technology to revolutionize talent acquisition and create meaningful connections.
            </p>
          </div>
          
          <div className="tech-features">
            <div className="tech-feature">
              <div className="tech-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.5L19.5 8V16L12 19.5L4.5 16V8L12 4.5Z"/>
                </svg>
              </div>
              <h3 className="tech-feature__title">AI-Powered Matching</h3>
              <p className="tech-feature__desc">
                Advanced algorithms analyze skills, experience, and cultural fit to connect the right talent with the right opportunities.
              </p>
            </div>
            
            <div className="tech-feature">
              <div className="tech-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
                </svg>
              </div>
              <h3 className="tech-feature__title">Real-Time Analytics</h3>
              <p className="tech-feature__desc">
                Comprehensive dashboards provide insights into hiring trends, market demands, and performance metrics.
              </p>
            </div>
            
            <div className="tech-feature">
              <div className="tech-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.1 7 14 7.9 14 9S13.1 11 12 11 10 10.1 10 9 10.9 7 12 7ZM18 11.5C18 12.4 17.4 13 16.5 13S15 12.4 15 11.5 15.6 10 16.5 10 18 10.6 18 11.5Z"/>
                </svg>
              </div>
              <h3 className="tech-feature__title">Secure Platform</h3>
              <p className="tech-feature__desc">
                Enterprise-grade security ensures data protection and compliance with global privacy regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Culture & Work Environment Section */}
      <section className="culture-section" aria-labelledby="culture-title">
        <div className="culture-container">
          <div className="culture-content">
            <div className="culture-text">
              <h2 id="culture-title" className="culture-title">Culture & Work Environment</h2>
              <p className="culture-subtitle">
                We believe great talent deserves great culture. Our remote-first approach fosters innovation, collaboration, and work-life balance.
              </p>
              
              <div className="culture-values">
                <div className="culture-value">
                  <h4 className="culture-value__title">Remote-First</h4>
                  <p className="culture-value__desc">Work from anywhere with flexible schedules and global collaboration tools.</p>
                </div>
                
                <div className="culture-value">
                  <h4 className="culture-value__title">Diversity & Inclusion</h4>
                  <p className="culture-value__desc">We celebrate different perspectives and create an environment where everyone can thrive.</p>
                </div>
                
                <div className="culture-value">
                  <h4 className="culture-value__title">Continuous Learning</h4>
                  <p className="culture-value__desc">Invest in your growth with learning budgets, conferences, and mentorship programs.</p>
                </div>
                
                <div className="culture-value">
                  <h4 className="culture-value__title">Work-Life Balance</h4>
                  <p className="culture-value__desc">Flexible hours, unlimited PTO, and wellness programs to support your well-being.</p>
                </div>
              </div>
            </div>
            
            <div className="culture-visual">
              <div className="culture-stats">
                <div className="culture-stat">
                  <div className="stat-number">95%</div>
                  <div className="stat-label">Employee Satisfaction</div>
                </div>
                <div className="culture-stat">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Countries Represented</div>
                </div>
                <div className="culture-stat">
                  <div className="stat-number">4.8/5</div>
                  <div className="stat-label">Work-Life Balance Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="future-vision" aria-labelledby="future-title">
        <div className="future-container">
          <div className="future-header">
            <h2 id="future-title" className="future-title">Future Vision</h2>
            <p className="future-subtitle">
              We're building the future of work, one connection at a time. Here's where we're heading.
            </p>
          </div>
          
          <div className="vision-roadmap">
            <div className="vision-item">
              <div className="vision-timeline">
                <div className="timeline-dot"></div>
                <div className="timeline-line"></div>
              </div>
              <div className="vision-content">
                <h3 className="vision-title">2024: AI Integration</h3>
                <p className="vision-desc">
                  Launch advanced AI features for smarter matching, automated screening, and predictive analytics.
                </p>
              </div>
            </div>
            
            <div className="vision-item">
              <div className="vision-timeline">
                <div className="timeline-dot"></div>
                <div className="timeline-line"></div>
              </div>
              <div className="vision-content">
                <h3 className="vision-title">2025: Global Expansion</h3>
                <p className="vision-desc">
                  Expand to 50+ countries with localized platforms and regional talent pools.
                </p>
              </div>
            </div>
            
            <div className="vision-item">
              <div className="vision-timeline">
                <div className="timeline-dot"></div>
                <div className="timeline-line"></div>
              </div>
              <div className="vision-content">
                <h3 className="vision-title">2026: Industry Leadership</h3>
                <p className="vision-desc">
                  Become the global standard for talent acquisition with 10M+ active users and $1B+ in placements.
                </p>
              </div>
            </div>
          </div>
          
          <div className="future-commitment">
            <h3 className="commitment-title">Our Commitment</h3>
            <p className="commitment-text">
              We're committed to making talent acquisition more transparent, efficient, and human-centered. 
              Every feature we build, every partnership we form, and every decision we make is guided by our 
              mission to connect the world's best talent with the world's best opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Curved Loop Text Section */}
      <section className="curved-text-section">
        <CurvedLoop 
          marqueeText="Hiring the best For the Best ✦ Connecting Talent with Opportunity. ✦ Shaping Careers, Building Futures. ✦"
          speed={2}
          curveAmount={300}
          direction="left"
          interactive={true}
          className="curved-text"
        />
      </section>



    </main>
  );
};

export default AboutUs;


