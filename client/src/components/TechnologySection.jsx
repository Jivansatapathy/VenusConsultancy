// client/src/components/TechnologySection.jsx
import React from "react";
import "./TechnologySection.css";

const TechnologySection = () => {
  const technologies = [
    "React",
    "Next.js",
    "JavaScript",
    "Python",
    "Node.js",
    "Angular",
    "Vue.js",
    "TypeScript",
    "Java",
    "PHP",
    "Ruby",
    "Go",
    "Swift",
    "Kotlin",
    "Django",
    "Flask",
    "Spring",
    "Laravel",
    "Express",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes"
  ];

  return (
    <section className="technology-section" aria-labelledby="tech-section-title">
      <div className="technology-container">
        <h2 id="tech-section-title" className="technology-title">
          Technologies We Work With
        </h2>
        <p className="technology-subtitle">
          Our talent pool is skilled in the latest technologies and frameworks
        </p>
        <div className="technology-grid">
          {technologies.map((tech, index) => (
            <div key={index} className="technology-badge">
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;

