import React, { useState, useEffect, useRef } from "react";
import { FileText, Search, Handshake } from "lucide-react";
import "./HowWeWork.css";

export default function HowWeWork() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);

  const steps = [
    {
      icon: FileText,
      title: "Applicant Review",
      description: "The applicant review process is a vital step in ensuring that only the most qualified candidates move forward in our recruitment pipeline."
    },
    {
      icon: Search,
      title: "Job Analysis",
      description: "Job analysis is a critical process for understanding and defining the specific requirements, responsibilities, and qualifications needed for each position."
    },
    {
      icon: Handshake,
      title: "Talent Placement",
      description: "Our talent placement process focuses on connecting your organization with professionals who not only meet the job requirements but also align with your company culture and strategic goals."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="how-we-work" ref={sectionRef}>
      <div className="how-we-work__container">
        {/* Header */}
        <div className={`how-we-work__header ${inView ? 'how-we-work__header--visible' : ''}`}>
          <h2 className="how-we-work__title">How We Work</h2>
          <p className="how-we-work__subtitle">
            A streamlined approach to connecting exceptional talent with forward-thinking organizations
          </p>
        </div>

        {/* Steps */}
        <div className="how-we-work__steps">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <React.Fragment key={index}>
                <div 
                  ref={(el) => (stepRefs.current[index] = el)}
                  className={`how-we-work__step ${inView ? 'how-we-work__step--visible' : ''}`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="how-we-work__step-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  <div className="how-we-work__icon-container">
                    <IconComponent size={40} className="how-we-work__icon" strokeWidth={1.5} />
                  </div>

                  <div className="how-we-work__step-content">
                    <h3 className="how-we-work__step-title">{step.title}</h3>
                    <p className="how-we-work__step-description">{step.description}</p>
                  </div>
                </div>

                {!isLast && (
                  <div 
                    className={`how-we-work__connector ${inView ? 'how-we-work__connector--visible' : ''}`}
                    style={{ 
                      transitionDelay: `${(index + 1) * 100 + 200}ms`
                    }}
                  >
                    <div className="how-we-work__connector-line"></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
