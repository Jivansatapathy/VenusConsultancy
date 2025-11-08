// client/src/components/ServicesSection.jsx
import React from "react";
import "./ServicesSection.css";
import services from "../data/servicesConfig.js";

const ServicesSection = () => {
  const { heading, description, items } = services;

  return (
    <section className="vh-services" aria-labelledby="vh-services-heading">
      <div className="vh-services__card">
        <h2 id="vh-services-heading" className="vh-services__heading">
          {heading}
        </h2>
        {description && (
          <p className="vh-services__desc">{description}</p>
        )}

        <div className="vh-services__grid">
          {items.map((it, i) => (
            <article
              key={it.key || i}
              className="vh-service-card"
            >
              <div className="vh-service-card__media">
                <img src={it.image} alt={it.title} loading="lazy" decoding="async" />
              </div>
              <div className="vh-service-card__body">
                <h3 className="vh-service-card__title">{it.title}</h3>
                <p className="vh-service-card__excerpt">{it.excerpt}</p>
                <a className="vh-service-card__link" href={it.link} aria-label={`Learn more about ${it.title}`}>
                  <span className="vh-service-card__link-icon">⟶</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
