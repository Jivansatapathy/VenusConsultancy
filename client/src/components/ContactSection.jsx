// client/src/components/ContactSection.jsx
import React from "react";
import "./ContactSection.css";

/**
 * ContactSection - displays office locations and contact information
 */
const ContactSection = () => {
  return (
    <section className="contact-section" aria-label="Contact information">
      <div className="contact-container">
        <h3 className="contact-title">Our Global Offices</h3>
        
        <div className="offices-grid">
          <div className="office-card">
            <h4 className="office-title">🇨🇦 Toronto, Canada</h4>
            <div className="office-details">
              <p className="office-address">#205 - 1085 Bellamy Road North</p>
              <p className="office-address">Toronto, ON</p>
              <p className="office-phone">Ph: <a href="tel:647-722-0837" className="phone-link">647-722-0837</a></p>
            </div>
          </div>

          <div className="office-card">
            <h4 className="office-title">🇺🇸 Michigan, USA</h4>
            <div className="office-details">
              <p className="office-address">880 W Long Lake Rd Ste 225</p>
              <p className="office-address">Troy, MI 48098</p>
              <p className="office-phone">Ph: <a href="tel:248-275-1077" className="phone-link">248-275-1077</a></p>
              <p className="office-phone">Ph: <a href="tel:718-715-0770" className="phone-link">718-715-0770</a></p>
            </div>
          </div>

          <div className="office-card">
            <h4 className="office-title">🇮🇳 India</h4>
            <div className="office-details">
              <p className="office-address">Mumbai, Surat, Chennai, Hyderabad</p>
              <p className="office-phone">Ph: <a href="tel:+91-261-2601177" className="phone-link">+91-261-2601177</a></p>
              <p className="office-phone">Ph: <a href="tel:+91-261-391177" className="phone-link">+91-261-391177</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
