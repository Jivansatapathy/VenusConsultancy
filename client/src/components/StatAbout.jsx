import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSEOContent } from "../context/SEOContentContext";
import "./StatAbout.css";

export default function StatAbout() {
  const { content } = useSEOContent();
  const statContent = content?.home?.statAbout || {};
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState({ clients: 0, satisfaction: 0, success: 0, placements: 0, experience: 0 });

  // IntersectionObserver to detect when section comes into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Counter animation when in view
  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    // Extract number from experienceNumber (e.g., "18+" -> 18)
    const experienceStr = statContent.experienceNumber || "18+";
    const experienceNum = parseInt(experienceStr.replace(/\D/g, '')) || 18;
    
    const targets = {
      clients: parseInt(statContent.stat1Number || 77),
      satisfaction: parseInt(statContent.stat2Number || 98),
      success: parseInt(statContent.stat3Number || 99),
      placements: 10000,
      experience: experienceNum
    };

    // Ease out cubic function
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    let rafId;
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);

      setCounts({
        clients: Math.round(targets.clients * eased),
        satisfaction: Math.round(targets.satisfaction * eased),
        success: Math.round(targets.success * eased),
        placements: Math.round(targets.placements * eased),
        experience: Math.round(targets.experience * eased)
      });

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [inView]);

  // Format number with suffix
  const formatStat = (value, suffix) => {
    if (suffix === 'K+') {
      return `${value}+`;
    }
    return `${value}${suffix}`;
  };

  return (
    <section className="stat-about" ref={sectionRef}>
      <div className="stat-about__container">
        {/* Header Section */}
        <div className="stat-about__header">
          <h2 className="stat-about__main-title">
            {statContent.title || "Driving Business Growth With Expert Staffing & Recruitment Solutions"}
          </h2>
          <p className="stat-about__main-description">
            {statContent.description || "We deliver measurable results through strategic talent solutions. Our commitment transforms businesses across industries."}
          </p>
        </div>

        {/* Grid Section - 5 Cards */}
        <div className="stat-about__grid">
          {/* Card 1 - Large Vertical (Top Left) */}
          <div className="stat-about__card stat-about__card--large">
            <div className="stat-about__card-number">
              {counts.experience}+
            </div>
            <div className="stat-about__card-content">
              <div className="stat-about__card-title">Years of expertise</div>
              <div className="stat-about__card-subtitle">Delivering recruitment solutions across multiple industries</div>
            </div>
          </div>

          {/* Card 2 - Image Placeholder (Top Middle) */}
          <div className="stat-about__card stat-about__card--image">
            <img 
              src={statContent.images?.image1 || "/images/imagetrail/image1.jpg"} 
              alt="Team collaboration" 
              className="stat-about__card-image"
              loading="lazy"
            />
          </div>

          {/* Card 3 - Stat Card (Top Right) */}
          <div className="stat-about__card stat-about__card--stat">
            <div className="stat-about__card-number">
              {counts.placements.toLocaleString()}+
            </div>
            <div className="stat-about__card-content">
              <div className="stat-about__card-title">Successful placements</div>
              <div className="stat-about__card-subtitle">Helping companies hire skilled professionals</div>
            </div>
          </div>

          {/* Card 4 - Stat Card (Bottom Left) */}
          <div className="stat-about__card stat-about__card--stat">
            <div className="stat-about__card-number">
              {formatStat(counts.satisfaction, statContent.stat2Suffix || '%')}
            </div>
            <div className="stat-about__card-content">
              <div className="stat-about__card-title">Client satisfaction</div>
              <div className="stat-about__card-subtitle">Trusted staffing partner for growing businesses</div>
            </div>
          </div>

          {/* Card 5 - Image Placeholder (Bottom Right) */}
          <div className="stat-about__card stat-about__card--image">
            <img 
              src={statContent.images?.image2 || "/images/imagetrail/image2.jpg"} 
              alt="Professional team" 
              className="stat-about__card-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
