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
              <div className="stat__value">1000+</div>
              <div className="stat__label">
                candidates placed
              </div>
            </div>
            <div className="stat">
              <div className="stat__value">77+</div>
              <div className="stat__label">companies served globally</div>
            </div>
            <div className="stat">
              <div className="stat__value">24/7</div>
              <div className="stat__label">dedicated support for our clients</div>
            </div>
          </div>

          <h2 className="about-stats__title">
            Connecting Top Talent with Forward-Thinking Companies
          </h2>

          <div className="buyers-providers">
            <article className="bp-card bp-card--buyers">
              <div className="bp-card__content">
                <h3 className="bp-card__title">FOR EMPLOYEES</h3>
                <p className="bp-card__text">
                  Discover opportunities across technology, healthcare, finance and more. Create your profile and apply to roles that match your skills and goals.
                </p>
                <a href="/find-jobs" className="bp-card__link" aria-label="Browse open roles">Find jobs</a>
              </div>
              <img className="bp-card__graphic" src="/graphic1.png" alt="Buyer graphic" loading="lazy" decoding="async" />
            </article>

            <article className="bp-card bp-card--providers">
              <img className="bp-card__graphic" src="/graphic2.png" alt="Provider graphic" loading="lazy" decoding="async" />
              <div className="bp-card__content">
                <h3 className="bp-card__title">FOR EMPLOYERS</h3>
                <p className="bp-card__text">
                  We help you find talent who don't just fill a role—they make an impact. Receive tailored shortlists fast and hire confidently with our dedicated support.
                </p>
                <a href="/contact" className="bp-card__link" aria-label="Hire talent with Venus Hiring">Hire talent</a>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
                  <rect x="9" y="9" width="6" height="6"/>
                  <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/>
                </svg>
              </div>
              <h3 className="tech-feature__title">AI-Powered Matching</h3>
              <p className="tech-feature__desc">
                Advanced algorithms analyze skills, experience, and cultural fit to connect the right talent with the right opportunities.
              </p>
            </div>
            
            <div className="tech-feature">
              <div className="tech-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="3 17 9 11 13 15 21 7"/>
                  <polyline points="14 7 21 7 21 14"/>
                </svg>
              </div>
              <h3 className="tech-feature__title">Real-Time Analytics</h3>
              <p className="tech-feature__desc">
                Comprehensive dashboards provide insights into hiring trends, market demands, and performance metrics.
              </p>
            </div>
            
            <div className="tech-feature">
              <div className="tech-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
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
                  <div className="stat-number">15+</div>
                  <div className="stat-label">industries, one recruitment powerhouse.</div>
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

      {/* Commitment Section (only) */}
      <section className="commitment-section" aria-labelledby="commitment-title">
        <div className="commitment-container">
          <div className="commitment-header">
            <h2 id="commitment-title" className="tech-title">Our Commitment</h2>
            <p className="tech-subtitle">
              We stand by quality, transparency, and outcomes. Everything we do is designed to help
              employers hire better and help professionals grow faster.
            </p>
          </div>

          <div className="commitment-cards">
            <article className="commitment-card">
              <div className="commit-card__head">
                <svg className="commit-card__icon" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 5l-2 2a3 3 0 0 0 0 4l3 3a3 3 0 0 0 4 0l2-2" />
                  <path d="M16 3l5 5" />
                  <path d="M2 12l5 5" />
                  <path d="M8 17l-3 3" />
                </svg>
                <h3 className="commit-card__title">Client‑first delivery</h3>
              </div>
              <p className="commit-card__desc">Clear SLAs, fast shortlists, and aligned incentives focused on results.</p>
            </article>
            <article className="commitment-card">
              <div className="commit-card__head">
                <svg className="commit-card__icon" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 3v18h18" />
                  <rect x="7" y="12" width="3" height="6" />
                  <rect x="12" y="9" width="3" height="9" />
                  <rect x="17" y="6" width="3" height="12" />
                </svg>
                <h3 className="commit-card__title">Data‑driven hiring</h3>
              </div>
              <p className="commit-card__desc">Structured screening and market insights to reduce risk and time‑to‑hire.</p>
            </article>
            <article className="commitment-card">
              <div className="commit-card__head">
                <svg className="commit-card__icon" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 2l7 4v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V6l7-4z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
                <h3 className="commit-card__title">Ethics & support</h3>
              </div>
              <p className="commit-card__desc">Respect, confidentiality, and 24/7 assistance throughout the hiring journey.</p>
            </article>
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


