// client/src/data/servicesConfig.js
// Put service images in client/public/images/ and update paths if needed

const services = {
    heading: "Our Services",
    description:
      "We provide tailored hiring and advisory services to help organisations build strong teams and leadership.",
    items: [
      {
        key: "permanent-staffing",
        title: "Permanent Staffing",
        excerpt:
          "Connecting organizations with full-time professionals across technology, engineering, corporate, and skilled trades.",
        image: "/images/service-board.png",
        link: "/contact"
      },
      {
        key: "contract-temporary",
        title: "Contract & Temporary Staffing",
        excerpt:
          "Flexible talent solutions for short- or long-term projects to meet dynamic business needs.",
        image: "/images/service-executive.png",
        link: "/contact"
      },
      {
        key: "fractional-hr",
        title: "Fractional HR & HR Advisory",
        excerpt:
          "Providing part-time or interim HR leadership for workforce planning, compliance, and engagement.",
        image: "/images/service-leadership.jpg",
        link: "/contact"
      },
      {
        key: "sow-project",
        title: "Statement of Work (SOW) & Project-Based Solutions",
        excerpt:
          "Deploying specialized talent for defined projects or deliverables without long-term commitments.",
        image: "/images/service-advisory.png",
        link: "/contact"
      },
      {
        key: "startup-hiring",
        title: "Startup Hiring",
        excerpt:
          "Specialized recruitment solutions for startups and growing companies, connecting them with innovative talent ready to scale.",
        image: "/images/service-board.png",
        link: "/contact"
      }
    ]
  };
  
  export default services;
  