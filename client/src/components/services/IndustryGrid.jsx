// client/src/components/services/IndustryGrid.jsx
import React from "react";
import ServiceSection from "./ServiceSection";
import servicesData from "../../data/servicesData";
import "./IndustryGrid.css";

const IndustryGrid = () => {
  return (
    <div className="svc-list">
      {servicesData.map((s, idx) => (
        <ServiceSection key={s.id} service={s} index={idx} />
      ))}
    </div>
  );
};

export default IndustryGrid;
