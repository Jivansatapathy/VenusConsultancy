// client/src/components/services/IndustryGrid.jsx
import React, { useState } from "react";
import "./IndustryGrid.css";
import ServiceSection from "./ServiceSection";
import servicesData from "../../data/servicesData";

const IndustryGrid = ({ services = servicesData }) => {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = (id, nextExpanded) => {
    if (nextExpanded) {
      setExpandedId(id);
      // scroll expanded card into view (small delay for layout)
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } else {
      setExpandedId(null);
    }
  };

  return (
    <div className={`services-grid ${expandedId ? "is-single" : ""}`} id="services-grid">
      {services.map((svc, idx) => (
        <div key={svc.id || idx} className={`services-grid__cell ${expandedId === svc.id ? "is-expanded" : ""}`}>
          <ServiceSection
            service={svc}
            index={idx}
            expanded={expandedId === svc.id}
            onToggle={(id, next) => handleToggle(id, next)}
          />
        </div>
      ))}
    </div>
  );
};

export default IndustryGrid;
