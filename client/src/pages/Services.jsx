// client/src/pages/Services.jsx
import React from "react";
import IndustryGrid from "../components/services/IndustryGrid";
import "./Services.css";

const Services = () => {
  return (
    <main className="svc-page">
      <header className="svc-hero">
        <div className="svc-hero__inner u-container">
          {/* Eyebrow stays centered */}
          <small className="svc-hero__eyebrow">Services</small>

          {/* Two-column layout below eyebrow */}
          <div className="svc-hero__content">
            {/* Left column */}
            <div className="svc-hero__text">
              <h1 className="svc-hero__title">Our Services</h1>
              <p className="svc-hero__sub">
                Board advisory, executive search and talent programs —
                all available from a single partner.
              </p>

              <div className="svc-hero__ctas">
                <a className="btn btn--primary" href="/post-job">Post a Job</a>
                <a className="btn btn--outline" href="#services-list">Explore Services</a>
              </div>
            </div>

            {/* Right column (illustration) */}
            <div className="svc-hero__image">
              <img
                src="/placeholder-illustration.png"
                alt="Services illustration"
              />
            </div>
          </div>
        </div>
      </header>

      <section id="services-list" className="svc-container u-container">
        <IndustryGrid />
      </section>
    </main>
  );
};

export default Services;
