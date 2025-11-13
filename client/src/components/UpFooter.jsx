// client/src/components/UpFooter.jsx
import React from "react";
import "./UpFooter.css";

/**
 * UpFooter - universal CTA band that appears above the main footer.
 * Redesigned to match the reference image with GET STARTED label, heading, buttons, and image.
 */

const UpFooter = () => {
  return (
    <section className="vh-upfooter" aria-labelledby="vh-upfooter-heading">
      <div className="vh-upfooter__container">
        <div className="vh-upfooter__content">
          <div className="vh-upfooter__text-section">
            <div className="vh-upfooter__label">GET STARTED</div>
            <h2 id="vh-upfooter-heading" className="vh-upfooter__heading">
              Find the Right People. Build the Right Teams.
            </h2>
            <p className="vh-upfooter__description">
              At Venus Consultancy, we connect exceptional talent with forward-thinking companies. Whether you're hiring or looking for your next role, we make the perfect match happen.
            </p>
            <div className="vh-upfooter__buttons">
              <a href="/contact" className="vh-upfooter__btn vh-upfooter__btn--primary">
                Hire Top Talent
              </a>
              <a href="/contact" className="vh-upfooter__btn vh-upfooter__btn--secondary">
                Explore Career Opportunities
              </a>
            </div>
          </div>
          <div className="vh-upfooter__image-section">
            <img 
              src="/01.jpeg" 
              alt="Professional team meeting" 
              className="vh-upfooter__image"
              loading="lazy"
              width={500}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpFooter;
