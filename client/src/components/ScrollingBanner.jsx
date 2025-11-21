import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import "./ScrollingBanner.css";

export default function ScrollingBanner() {
  const services = [
    "Talent Acquisition",
    "Executive Search",
    "Permanent Staffing",
    "Contract Staffing",
    "HR Advisory",
    "Recruitment Solutions",
    "Workforce Planning",
    "Talent Management",
    "Employee Onboarding",
    "Skills Assessment"
  ];

  // Duplicate items for seamless loop
  const duplicatedServices = [...services, ...services];

  return (
    <section className="scrolling-banner">
      <div className="scrolling-banner__container">
        <div className="scrolling-banner__track">
          {duplicatedServices.map((service, index) => (
            <React.Fragment key={index}>
              <div className="scrolling-banner__item">
                <div className="scrolling-banner__box">
                  {service}
                </div>
              </div>
              {index < duplicatedServices.length - 1 && (
                <>
                  <div className="scrolling-banner__icon">
                    <ArrowRight size={20} />
                  </div>
                  <div className="scrolling-banner__icon scrolling-banner__icon--star">
                    <Sparkles size={16} />
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

