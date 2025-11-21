// client/src/components/ServicesSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSEOContent } from "../context/SEOContentContext";
import "./ServicesSection.css";
import services from "../data/servicesConfig.js";

const ServicesSection = () => {
  const { content } = useSEOContent();
  const seoServices = content?.home?.services;
  const { heading, description, items } = seoServices?.items?.length > 0 
    ? seoServices 
    : services;

  return (
    <section className="vh-services" aria-labelledby="vh-services-heading">
      <div className="vh-services__container">
        <div className="vh-services__header">
          <h2 id="vh-services-heading" className="vh-services__heading">
            {heading}
          </h2>
          {description && (
            <p className="vh-services__desc">{description}</p>
          )}
        </div>

        <div className="vh-services__grid">
          {items.map((it, i) => (
            <article
              key={it.key || i}
              className="vh-service-card"
            >
              <div className="vh-service-card__media">
                <div className="vh-service-card__image-wrapper">
                  <img src={it.image} alt={it.title} loading="lazy" decoding="async" />
                  <div className="vh-service-card__overlay"></div>
                </div>
                <div className="vh-service-card__number">0{i + 1}</div>
              </div>
              <div className="vh-service-card__body">
                <h3 className="vh-service-card__title">{it.title}</h3>
                <p className="vh-service-card__excerpt">{it.excerpt}</p>
                <Link 
                  to={it.link} 
                  className="vh-service-card__link"
                  aria-label={`Learn more about ${it.title}`}
                >
                  <span>Learn More</span>
                  <ArrowRight size={18} className="vh-service-card__link-icon" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
