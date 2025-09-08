// client/src/components/services/IndustryGrid.jsx
import React, { useState } from "react";
import IndustryCard from "./IndustryCard";
import LeadModal from "./LeadModal";
import servicesData from "../../data/servicesData";
import "./IndustryGrid.css";

const IndustryGrid = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  function handleRequestShortlist(payload) {
    setSelected(payload);
    setOpen(true);
  }

  return (
    <>
      <div className="svc-grid" role="list">
        {servicesData.map((s) => (
          <div key={s.id} role="listitem" className="svc-grid__item">
            <IndustryCard {...s} onRequestShortlist={handleRequestShortlist} />
          </div>
        ))}
      </div>

      <LeadModal
        open={open}
        initialIndustry={selected}
        onClose={() => { setOpen(false); setSelected(null); }}
      />
    </>
  );
};

export default IndustryGrid;
