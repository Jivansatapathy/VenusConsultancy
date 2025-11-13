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
        <h3 className="contact-title">Our Office Locations</h3>
        
        <div className="offices-grid">
          <div className="office-card">
            <h4 className="office-title" aria-label="Toronto, Canada">
              <img 
                src="https://flagcdn.com/w40/ca.png" 
                alt="Canada flag" 
                style={{
                  width: '24px',
                  height: '18px',
                  marginRight: '8px',
                  borderRadius: '2px',
                  display: 'inline-block',
                  verticalAlign: 'middle'
                }}
              />
              Toronto, Canada
            </h4>
            <div className="office-details">
              <p className="office-address">205 – 1085 Bellamy Road North</p>
              <p className="office-address">Toronto, ON M1H 3C7</p>
              <p className="office-phone">Ph: <a href="tel:647-722-0837" className="phone-link">647-722-0837</a></p>
              <p className="office-email">Email: <a href="mailto:info@venushiring.ca" className="phone-link">info@venushiring.ca</a></p>
            </div>
          </div>

          <div className="office-card">
            <h4 className="office-title" aria-label="Michigan, USA">
              <img 
                src="https://flagcdn.com/w40/us.png" 
                alt="USA flag" 
                style={{
                  width: '24px',
                  height: '18px',
                  marginRight: '8px',
                  borderRadius: '2px',
                  display: 'inline-block',
                  verticalAlign: 'middle'
                }}
              />
              Michigan, USA
            </h4>
            <div className="office-details">
              <p className="office-address">225 – 880 W Long Lake Road</p>
              <p className="office-address">Troy, MI 48098</p>
              <p className="office-phone">Ph: <a href="tel:248-275-1077" className="phone-link">248-275-1077</a></p>
              <p className="office-phone">Ph: <a href="tel:718-715-0770" className="phone-link">718-715-0770</a></p>
              <p className="office-email">Email: <a href="mailto:info@venushiring.com" className="phone-link">info@venushiring.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
