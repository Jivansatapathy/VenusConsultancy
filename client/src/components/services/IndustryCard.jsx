// client/src/components/services/IndustryGrid.jsx
import React, { useState } from "react";
import ServiceSection from "./ServiceSection";
import servicesData from "../../data/servicesData";
import "./IndustryGrid.css";

const IndustryGrid = () => {
  const [expandedId, setExpandedId] = useState(null);

  if (!servicesData || !Array.isArray(servicesData)) return null;

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
    // when opening a service, we switch the layout to stacked (single column)
    // when closing (id === prev) it returns to grid automatically because expandedId becomes null
  };

  const isAnyExpanded = Boolean(expandedId);

  return (
    <section className="svc-grid-section" aria-label="Who we hire section">
      <div className="u-container svc-grid-section__inner">
        <header className="svc-grid-header">
          <h2 className="svc-grid-title">Who We Hire</h2>
          <p className="svc-grid-sub">
            We help you hire leadership and specialist roles across functions — below are the key services and sample roles we recruit for.
          </p>
        </header>

        <div
          className={`svc-list-grid ${isAnyExpanded ? "svc-list-grid--stacked" : ""}`}
          role="list"
        >
          {servicesData.map((s, idx) => (
            <div
              key={s.id || idx}
              role="listitem"
              className={`svc-list-grid__item ${expandedId === s.id ? "svc-list-grid__item--active" : ""}`}
            >
              <ServiceSection
                service={s}
                index={idx}
                expanded={expandedId === s.id}
                onToggle={() => handleToggle(s.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryGrid;
