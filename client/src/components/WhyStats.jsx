// client/src/components/WhyStats.jsx
import React from "react";
import { useSEOContent } from "../context/SEOContentContext";
import "./WhyStats.css";

const WhyStats = () => {
  const { content } = useSEOContent();
  const whyContent = content?.home?.whyStats;
  const defaultCards = [
    {
      title: 'Human-Centered Approach',
      summary: 'Beyond algorithms, human insight',
      description: 'Every candidate and employer is carefully evaluated through our human-led process, going beyond algorithms to assess personality, skills, and cultural fit. We leverage data-driven insights to ensure the right match — combining precision with the human touch that machines cannot replicate.',
      icon: "/iconanimated/algorithm.gif"
    },
    {
      title: 'Comprehensive Talent Solutions',
      summary: 'End-to-end recruitment across industries',
      description: 'We provide end-to-end recruitment services across IT, Engineering, Scientific, Skilled Trades, Light Industrial, Office & Clerical, Technical Support, Outsourcing, and Recruitment Process Outsourcing. Additionally, we specialize in Executive and Board-level recruitment.',
      icon: "/iconanimated/union.gif"
    },
    {
      title: 'Quality & Integrity',
      summary: 'Ethical excellence, guaranteed success',
      description: 'We take responsibility for placing candidates with strong social, ethical, and professional skills, ensuring they are fully prepared for interviews and workplace success.',
      icon: "/iconanimated/algorithm.gif"
    },
    {
      title: 'Global Reach',
      summary: 'Worldwide talent, local expertise',
      description: 'We connect talent with opportunities worldwide, supporting professionals from diverse backgrounds and helping employers access the best talent, anywhere.',
      icon: "/iconanimated/algorithm.gif"
    }
  ];
  const cards = whyContent?.cards?.length > 0 ? whyContent.cards : defaultCards;

  return (
    <section className="vh-why u-container" aria-labelledby="why-heading">
      <div className="vh-why__inner">
        <div className="vh-why__header">
          <h2 id="why-heading" className="vh-why__heading">{whyContent?.heading || "Why Choose Venus Consultancy?"}</h2>
        </div>

        <div className="vh-why__cards">
          {cards.map((card, idx) => (
            <div className="vh-why__card" key={card.title}>
              <div className="vh-why__card-header">
                <img
                  src={card.icon || (idx === 1 ? "/iconanimated/union.gif" : "/iconanimated/algorithm.gif")}
                  alt=""
                  className="vh-why__card-icon"
                  loading="lazy"
                />
                <h3 className="vh-why__card-title">{card.title}</h3>
                <div className="vh-why__card-underline"></div>
              </div>
              <div className="vh-why__card-content">
                <p className="vh-why__card-description">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStats;
