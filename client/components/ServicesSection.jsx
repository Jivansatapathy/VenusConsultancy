// client/src/components/ServicesSection.jsx
'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
// Import CSS - Next.js will handle bundling
import "./ServicesSection.css";
import services from "../data/servicesConfig.js";

const ServicesSection = () => {
  const { heading, description, items } = services;

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
                  <Image 
                    src={it.image} 
                    alt={it.title} 
                    width={400}
                    height={300}
                    loading="lazy"
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <div className="vh-service-card__overlay"></div>
                </div>
                <div className="vh-service-card__number">0{i + 1}</div>
              </div>
              <div className="vh-service-card__body">
                <h3 className="vh-service-card__title">{it.title}</h3>
                <p className="vh-service-card__excerpt">{it.excerpt}</p>
                <Link 
                  href={it.link} 
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
