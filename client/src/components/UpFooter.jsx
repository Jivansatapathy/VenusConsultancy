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
              Ready to get started?
            </h2>
            <p className="vh-upfooter__description">
              Join thousands of companies who trust Venus Consultancy for their recruitment needs. 
              Whether you're looking to hire top talent or find your dream job, we connect the right 
              people with the right opportunities. Start your journey with us today.
            </p>
            <div className="vh-upfooter__buttons">
              <a href="/contact" className="vh-upfooter__btn vh-upfooter__btn--primary">
                SUBMIT VACANCY
              </a>
            </div>
          </div>
          <div className="vh-upfooter__image-section">
            <img 
              src="/01.jpeg" 
              alt="Professional team meeting" 
              className="vh-upfooter__image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpFooter;
