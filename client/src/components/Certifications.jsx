              import React from "react";
import "./Certifications.css";

export default function Certifications() {
  return (
    <section className="certifications">
      <div className="cert-container">
        {/* Certification 1 */}
        <div className="cert-item">
          <img
            src="/cert-1.png"
            alt="India's Top 25 Safest Places"
            className="cert-img"
          />
          <p className="cert-text">
          Certified by the Toronto Region Board <br /> of Trade
          </p>
        </div>

        {/* Certification 2 */}
        <div className="cert-item">
          <img
            src="/cert-2.png"
            alt="Great Place to Work"
            className="cert-img"
          />
          <p className="cert-text">
          HRPA-Accredited HR Professional <br />
            Certified by HRPA
          </p>
        </div>

        
      </div>
    </section>
  );
}
