import React from 'react';
import './WhatsAppFloat.css';

const WhatsAppFloat = () => {
  const phoneNumber = "+16477616277";
  const message = "Hello! I'm interested in your services.";
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <div className="whatsapp-float">
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-link"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94-1.165-.173-.198-.347-.148-.579-.148-.198 0-.405-.05-.62-.05-.214 0-.438.05-.66.297-.224.248-.855.81-.855 1.97s.873 2.285 1.002 2.44c.13.155 1.76 2.69 4.26 3.77 2.5 1.08 2.5.72 2.95.68.45-.04 1.45-.6 1.66-1.18.21-.58.21-1.08.15-1.18-.07-.1-.22-.15-.45-.25z"/>
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 2.079.549 4.03 1.51 5.73L.03 24l6.345-1.52c1.7.96 3.65 1.51 5.64 1.51 6.62 0 11.99-5.367 11.99-11.987C23.007 5.367 17.637.001 12.017.001zM12.017 19.99c-1.8 0-3.5-.5-4.97-1.35l-.36-.21-3.75.9.96-3.66-.23-.37c-.85-1.45-1.3-3.12-1.3-4.87 0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppFloat;
