import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBriefcase, faAward } from "@fortawesome/free-solid-svg-icons";

/**
 * Hero component
 * @param {Object} props
 * @param {boolean} props.showImage - toggle person image
 * @param {string} props.imageSrc - optional image path
 */
export default function Hero({ showImage = false, imageSrc = "/hero-person.webp" }) {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Title */}
        <div className="hero-title">
          <div className="title-line line-1">Helping Companies</div>
          <div className="title-line line-2">Hire Smarter</div>
          <div className="title-line line-3">Helping Talent</div>
          <div className="title-line line-4">Thrive</div>
        </div>

        {/* Buttons */}
        <div className="hero-buttons">
          <Link to="/find-jobs" className="btn btn--primary">Find a Job</Link>
          <Link to="/services" className="btn btn--outline">Our Services</Link>
        </div>

        {/* Optional Hero Image (keeps stacking below buttons) */}
        {showImage && (
          <div className="hero-image">
            <img src={imageSrc} alt="hero person" loading="lazy" decoding="async" />
          </div>
        )}
      </div>

      {/* --- Stats: intentionally placed OUTSIDE hero-container but stacked below --- */}
      <div className="hero-stats-wrapper stacked">
        <div className="hero-stats">
          <div className="stat u-card">
            <FontAwesomeIcon icon={faUsers} className="stat-icon" />
            <h3>10,000+</h3>
            <p>Candidates Placed</p>
          </div>

          <div className="stat u-card">
            <FontAwesomeIcon icon={faBriefcase} className="stat-icon" />
            <h3>500+</h3>
            <p>Companies Served</p>
          </div>

          <div className="stat u-card">
            <FontAwesomeIcon icon={faAward} className="stat-icon" />
            <h3>95%</h3>
            <p>Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
