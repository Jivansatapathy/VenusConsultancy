import React from "react";
import { BarChart3, FileText, Truck, Workflow } from "lucide-react";
import "./HowWeWork.css";

export default function HowWeWork() {
  const steps = [
    {
      icon: BarChart3,
      title: "APPLICANT REVIEW",
      description: "The applicant review process is a vital step in ensuring that only the most qualified candidates move forward in our recruitment pipeline."
    },
    {
      icon: FileText,
      title: "JOB ANALYSIS",
      description: "Job analysis is a critical process for understanding and defining the specific requirements, responsibilities, and qualifications needed for each position."
    },
    {
      icon: Truck,
      title: "TALENT PLACEMENT",
      description: "Our talent placement process focuses on connecting your organization with professionals who not only meet the job requirements but also align with your company culture and strategic goals."
    }
  ];

  return (
    <section className="how-we-work">
      <div className="how-we-work__container">
        {/* Header Badge */}
        <div className="how-we-work__badge">
          <Workflow size={16} className="how-we-work__badge-icon" />
          <span>HOW WE WORK</span>
        </div>

        {/* Steps */}
        <div className="how-we-work__steps">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <React.Fragment key={index}>
                <div className="how-we-work__step">
                  <div className="how-we-work__icon-circle">
                    <IconComponent size={32} className="how-we-work__icon" />
                  </div>
                  <h3 className="how-we-work__step-title">{step.title}</h3>
                  <p className="how-we-work__step-description">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="how-we-work__arrow">
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
                      />
                      <path
                        d="M70 15 L75 20 L70 25"
                        stroke="#e50914"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
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

