// client/src/components/ContactSection.jsx
import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import "./ContactSection.css";

/**
 * ContactSection - displays office locations and contact information
 */
const ContactSection = () => {
  return (
    <section className="contact-section" aria-label="Contact information">
      <div className="contact-container">
        <h3 className="contact-title">Our Office Locations</h3>
        <p className="contact-subtitle">Connect with us across multiple locations worldwide</p>
        
        <div className="offices-grid">
          <div className="office-card">
            <div className="office-header">
              <div className="office-flag-wrapper office-flag-wrapper--canada">
                <img 
                  src="https://flagcdn.com/w40/ca.png" 
                  alt="Canada flag" 
                  className="office-flag"
                />
              </div>
              <h4 className="office-title" aria-label="Toronto, Canada">
                Toronto, Canada
              </h4>
            </div>
            <div className="office-details">
              <div className="office-detail-item">
                <MapPin size={18} className="office-icon office-icon--green" />
                <p className="office-address">#205 - 1085 Bellamy Road North, Toronto, ON</p>
              </div>
              <div className="office-detail-item">
                <Phone size={18} className="office-icon office-icon--green" />
                <p className="office-phone">647-722-0837</p>
              </div>
              <div className="office-detail-item">
                <Mail size={18} className="office-icon office-icon--green" />
                <a href="mailto:info@venushiring.ca" className="office-email">info@venushiring.ca</a>
              </div>
            </div>
          </div>

          <div className="office-card">
            <div className="office-header">
              <div className="office-flag-wrapper office-flag-wrapper--usa">
                <img 
                  src="https://flagcdn.com/w40/us.png" 
                  alt="USA flag" 
                  className="office-flag"
                />
              </div>
              <h4 className="office-title" aria-label="Michigan, USA">
                Michigan, USA
              </h4>
            </div>
            <div className="office-details">
              <div className="office-detail-item">
                <MapPin size={18} className="office-icon office-icon--green" />
                <p className="office-address">880 W Long Lake Rd Ste 225 | Troy, MI 48098</p>
              </div>
              <div className="office-detail-item">
                <Phone size={18} className="office-icon office-icon--green" />
                <p className="office-phone">248-275-1077</p>
              </div>
              <div className="office-detail-item">
                <Phone size={18} className="office-icon office-icon--green" />
                <p className="office-phone">718-715-0770</p>
              </div>
              <div className="office-detail-item">
                <Mail size={18} className="office-icon office-icon--green" />
                <a href="mailto:info@venushiring.com" className="office-email">info@venushiring.com</a>
              </div>
            </div>
          </div>

          <div className="office-card">
            <div className="office-header">
              <div className="office-flag-wrapper office-flag-wrapper--india">
                <img 
                  src="https://flagcdn.com/w40/in.png" 
                  alt="India flag" 
                  className="office-flag"
                />
              </div>
              <h4 className="office-title" aria-label="India">
                India
              </h4>
            </div>
            <div className="office-details">
              <div className="office-detail-item">
                <MapPin size={18} className="office-icon office-icon--green" />
                <p className="office-address">Mumbai, Surat, Chennai, Hyderabad</p>
              </div>
              <div className="office-detail-item">
                <Phone size={18} className="office-icon office-icon--green" />
                <p className="office-phone">+91-261-2601177</p>
              </div>
              <div className="office-detail-item">
                <Phone size={18} className="office-icon office-icon--green" />
                <p className="office-phone">+91-261-391177</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
