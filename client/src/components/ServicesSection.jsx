// client/src/components/ServicesSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSEOContent } from "../context/SEOContentContext";
import "./ServicesSection.css";
import services from "../data/servicesConfig.js";

const ServicesSection = () => {
  const { content } = useSEOContent();
  const seoServices = content?.home?.services;
  
  // Always use servicesConfig items (which now has 6 items), but allow SEO content to override heading/description
  const heading = seoServices?.heading || services.heading;
  const description = seoServices?.description || services.description;
  const items = services.items; // Always use the updated config items

  // Map services to match the image layout with categories
  const serviceCategories = [
    { category: "Staffing", icon: "📋" },
    { category: "IT Advisory", icon: "💼" },
    { category: "Startup", icon: "🚀" },
    { category: "Staffing", icon: "📝" },
    { category: "Leadership", icon: "👔" },
    { category: "Solutions", icon: "🎯" }
  ];

  // Use items directly (should be 6 items now)
  const displayItems = items.slice(0, 6);

  return (
    <section className="vh-services" aria-labelledby="vh-services-heading">
      <div className="vh-services__container">
        {/* Header Section */}
        <div className="vh-services__header">
          <div className="vh-services__branding">Solutions</div>
          <h2 id="vh-services-heading" className="vh-services__heading">
            More ways we can help
          </h2>
          <p className="vh-services__desc">
            {description || "Strategic recruitment services tailored to your business needs"}
          </p>
        </div>

        {/* Services Grid - 3x2 Layout */}
        <div className="vh-services__grid">
          {displayItems.map((it, i) => {
            const category = serviceCategories[i] || { category: "", icon: "📋" };
            return (
              <article
                key={it.key || i}
                className="vh-service-card"
              >
                {/* Image */}
                <div className="vh-service-card__image">
                  <img 
                    src={it.image} 
                    alt={it.title} 
                    className="vh-service-card__image-img"
                    loading="lazy"
                  />
                </div>

                {/* Card Body */}
                <div className="vh-service-card__body">
                  {category.category && (
                    <div className="vh-service-card__category">{category.category}</div>
                  )}
                  <h3 className="vh-service-card__title">{it.title}</h3>
                  <p className="vh-service-card__excerpt">{it.excerpt}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
