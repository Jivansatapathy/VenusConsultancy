import React from "react";
import { Link } from "react-router-dom";
import "./StatAbout.css";

export default function StatAbout() {
  return (
    <section className="stat-about">
      <div className="stat-about__container">
        {/* Left Side - Image Grid */}
        <div className="stat-about__left">
          <div className="stat-about__image-grid">
            {/* Top Left Image */}
            <div className="stat-about__image-item stat-about__image-item--1">
              <img 
                src="/images/imagetrail/image1.jpg" 
                alt="Team collaboration" 
                loading="lazy"
              />
            </div>
            
            {/* Top Right Image */}
            <div className="stat-about__image-item stat-about__image-item--2">
              <img 
                src="/images/imagetrail/image2.jpg" 
                alt="Team working together" 
                loading="lazy"
              />
            </div>
            
            {/* Bottom Left - Purple Card */}
            <div className="stat-about__image-item stat-about__image-item--card">
              <div className="stat-about__experience-card">
              <div className="stat-about__experience-number">18+</div>
              <div className="stat-about__experience-label">Years Of Experience</div>
              <div className="stat-about__team-avatars">
                <div className="stat-about__avatar">
                  <img src="/images/imagetrail/image1.jpg" alt="Team member" />
                </div>
                <div className="stat-about__avatar">
                  <img src="/images/imagetrail/image2.jpg" alt="Team member" />
                </div>
                <div className="stat-about__avatar">
                  <img src="/images/imagetrail/image3.jpg" alt="Team member" />
                </div>
                <div className="stat-about__avatar">
                  <img src="/images/imagetrail/image4.jpg" alt="Team member" />
                </div>
                <div className="stat-about__avatar stat-about__avatar--plus">+</div>
              </div>
              <div className="stat-about__team-text">We Are Awesome Team</div>
            </div>
            </div>
            
            {/* Bottom Right Image */}
            <div className="stat-about__image-item stat-about__image-item--3">
              <img 
                src="/images/imagetrail/image3.jpg" 
                alt="Professional team member" 
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="stat-about__right">
          {/* Tag */}
          <div className="stat-about__tag">
            <span className="stat-about__tag-icon">🏢</span>
            <span>ABOUT VENUS HIRING</span>
          </div>

          {/* Title */}
          <h2 className="stat-about__title">
            Driving Success With An Expert Staffing
          </h2>

          {/* Description */}
          <p className="stat-about__description">
            At Venus Hiring, we understand that the key to business success lies in having the right people on your team. That's why we're committed to connecting you with top-tier talent.
          </p>

          {/* Stats */}
          <div className="stat-about__stats">
            <div className="stat-about__stat">
              <div className="stat-about__stat-number">1K+</div>
              <div className="stat-about__stat-label">Global Clients</div>
            </div>
            <div className="stat-about__stat">
              <div className="stat-about__stat-number">98%</div>
              <div className="stat-about__stat-label">Client Satisfaction</div>
            </div>
            <div className="stat-about__stat">
              <div className="stat-about__stat-number">99%</div>
              <div className="stat-about__stat-label">Success Rate</div>
            </div>
          </div>

          {/* CTA Button */}
          <Link to="/book-call" className="stat-about__cta">
            JOIN OUR NETWORK
          </Link>
        </div>
      </div>
    </section>
  );
}

