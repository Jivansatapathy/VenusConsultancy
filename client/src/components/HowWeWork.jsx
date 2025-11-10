import React, { useState, useEffect, useRef } from "react";
import { FileText, Search, Handshake, Workflow } from "lucide-react";
import "./HowWeWork.css";

export default function HowWeWork() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  const steps = [
    {
      icon: FileText,
      title: "APPLICANT REVIEW",
      description: "The applicant review process is a vital step in ensuring that only the most qualified candidates move forward in our recruitment pipeline."
    },
    {
      icon: Search,
      title: "JOB ANALYSIS",
      description: "Job analysis is a critical process for understanding and defining the specific requirements, responsibilities, and qualifications needed for each position."
    },
    {
      icon: Handshake,
      title: "TALENT PLACEMENT",
      description: "Our talent placement process focuses on connecting your organization with professionals who not only meet the job requirements but also align with your company culture and strategic goals."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="how-we-work" ref={sectionRef}>
      <div className="how-we-work__container">
        {/* Header Badge */}
        <div className={`how-we-work__badge ${inView ? 'how-we-work__badge--animate' : ''}`}>
          <Workflow size={16} className="how-we-work__badge-icon" />
          <span>HOW WE WORK</span>
        </div>

        {/* Steps */}
        <div className="how-we-work__steps">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <React.Fragment key={index}>
                <div 
                  className={`how-we-work__step ${inView ? 'how-we-work__step--animate' : ''}`}
                  style={{ ['--delay']: `${index * 0.2}s` }}
                >
                  <div className="how-we-work__step-number">{index + 1}</div>
                  <div className="how-we-work__icon-circle">
                    <div className="how-we-work__icon-bg"></div>
                    <IconComponent size={36} className="how-we-work__icon" />
                  </div>
                  <h3 className="how-we-work__step-title">{step.title}</h3>
                  <p className="how-we-work__step-description">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`how-we-work__arrow ${inView ? 'how-we-work__arrow--animate' : ''}`}>
                    <svg
                      width="80"
                      height="40"
                      viewBox="0 0 80 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 20 L75 20"
                        stroke="#e50914"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        className="how-we-work__arrow-line"
                      />
                      <path
                        d="M70 15 L75 20 L70 25"
                        stroke="#e50914"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        className="how-we-work__arrow-head"
                      />
                    </svg>
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

