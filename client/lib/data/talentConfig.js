// client/src/data/talentConfig.js
// Add your images to client/public/images/ and update the paths below.

const talentConfig = {
    heading: "Add specialized talent across your organization",
    brandColor: "#e50914", // Venus red
    categories: [
      {
        key: "finance",
        label: "Finance & Accounting",
        intro:
          "We connect you with top finance professionals, from accountants to CFOs, ensuring your business runs smoothly and grows sustainably.",
        roles: [
          "Financial Controller",
          "Senior Accountant",
          "FP&A Specialist",
          "Internal Auditor",
          "Accounts Payable / Receivable"
        ],
        images: [
          "/images/finance-large.jpg",
          "/images/finance-sm1.jpg",
          "/images/finance-sm2.jpg"
        ],
        learnMoreUrl: "/services",
        shapeColors: [
          "rgba(229, 9, 20, 0.25)",  // red
          "rgba(4, 87, 87, 0.25)",   // teal
          "rgba(6, 90, 99, 0.25)"    // blue
        ]
      },
      {
        key: "technology",
        label: "Technology",
        intro:
          "Scale your engineering teams with skilled developers, DevOps, and data experts to accelerate product innovation.",
        roles: [
          "Frontend Engineer",
          "Backend Engineer",
          "DevOps Engineer",
          "Data Scientist",
          "QA Engineer"
        ],
        images: [
          "/images/tech-large.jpg",
          "/images/tech-sm1.jpg",
          "/images/tech-sm2.jpg"
        ],
        learnMoreUrl: "/services",
        shapeColors: [
          "rgba(155, 81, 224, 0.25)", // purple
          "rgba(52, 152, 219, 0.25)", // blue
          "rgba(46, 204, 113, 0.25)"  // green
        ]
      },
      {
        key: "automotiveEv",
        label: "Automotive & EV",
        intro:
          "We staff critical roles across the EV and automotive ecosystem — from battery to plant engineering.",
        roles: [
          "Utilities Engineer",
          "System Engineer",
          "H&S & Sustainability Consultant",
          "Production Engineer",
          "HVAC Technician",
          "Power Engineer",
          "Battery Cell Manufacturing Engineer",
          "Electrical Engineer",
          "Battery Design Engineer"
        ],
        images: [
          "/images/auto-ev-large.jpg",
          "/images/auto-ev-sm1.jpg",
          "/images/auto-ev-sm2.jpg"
        ],
        learnMoreUrl: "/services",
        shapeColors: [
          "rgba(46, 204, 113, 0.25)",
          "rgba(52, 152, 219, 0.25)",
          "rgba(155, 81, 224, 0.25)"
        ]
      },
      {
        key: "aerospace",
        label: "Aerospace",
        intro:
          "Certified engineering talent for avionics, flight software, and safety-critical systems.",
        roles: [
          "Control System Engineer",
          "Software Quality Engineer",
          "System Engineer",
          "Technical Project Manager",
          "Embedded Software Engineer",
          "Validation & Verification Engineer",
          "DO-178 Certification Experts"
        ],
        images: [
          "/images/aero-large.jpeg",
          "/images/aerospace.jpg",
          "/images/aerospace1.jpg"
        ],
        learnMoreUrl: "/services",
        shapeColors: [
          "rgba(52, 152, 219, 0.25)",
          "rgba(155, 81, 224, 0.25)",
          "rgba(46, 204, 113, 0.25)"
        ]
      },
      {
        key: "autotech",
        label: "AutoTech",
        intro:
          "Software and systems talent for next‑gen vehicles, ADAS, infotainment, and safety.",
        roles: [
          "Software Testing",
          "Embedded Developers",
          "Technical Project Managers",
          "Autonomous Vehicle Systems",
          "ADAS Engineers",
          "Mechanical Developers",
          "Software/Hardware Design",
          "FuSa / Cybersecurity",
          "Infotainment Developers"
        ],
        images: [
          "/images/autotech-large.jpg",
          "/images/autotech-sm12.jpg",
          "/images/autotech-sm22.jpg"
        ],
        learnMoreUrl: "/services",
        shapeColors: [
          "rgba(155, 81, 224, 0.25)",
          "rgba(231, 76, 60, 0.25)",
          "rgba(52, 152, 219, 0.25)"
        ]
      },
      {
        key: "customerSupport",
        label: "Customer Service & Tech Support",
        intro:
          "Build scalable support teams for e‑commerce, retail, banking, and IT environments.",
        roles: [
          "Live Chat Support",
          "Remote Desktop Support",
          "PC Networking",
          "Personal Tech Support",
          "IT Technical Specialists",
          "Customer Service (E‑commerce)",
          "Customer Service (Retail)",
          "Customer Service (Banking)"
        ],
        images: [
          "/images/cs1.jpg",
          "/images/cs2.jpg",
          "/images/cs3.jpg"
        ],
        learnMoreUrl: "/services",
        shapeColors: [
          "rgba(52, 152, 219, 0.25)",
          "rgba(241, 196, 15, 0.25)",
          "rgba(46, 204, 113, 0.25)"
        ]
      },
      {
        key: "executive",
        label: "C‑Suite & Executive",
        intro:
          "Board and executive search for transformative leadership across functions.",
        roles: [
          "Board Search",
          "CEO",
          "CFO",
          "COO",
          "CMO",
          "CRO",
          "CIO",
          "CTO",
          "CHRO",
          "General Manager",
          "Country Manager"
        ],
        images: [
          "/images/css1.jpg",
          "/images/css2.jpg",
          "/images/css3.jpg"
        ],
        learnMoreUrl: "/services",
        shapeColors: [
          "rgba(231, 76, 60, 0.25)",
          "rgba(52, 152, 219, 0.25)",
          "rgba(44, 62, 80, 0.25)"
        ]
      },
      {
        key: "clinicalResearch",
        label: "Clinical Research",
        intro:
          "Specialists across clinical operations, QA, regulatory, and life sciences functions.",
        roles: [
          "Sales",
          "Marketing",
          "Market Research",
          "Regulatory Affairs",
          "Supply Chain Management",
          "Clinical Trials Assistant",
          "Clinical Research",
          "Business Development",
          "Legal",
          "Chemical Engineering",
          "Laboratory Support",
          "Quality Control",
          "Pharmacology"
        ],
        images: [
          "/images/clinical-large.jpg",
          "/images/clinical-sm1.jpg",
          "/images/clinical-sm2.jpg"
        ],
        learnMoreUrl: "/services",
        shapeColors: [
          "rgba(52, 152, 219, 0.25)",
          "rgba(46, 204, 113, 0.25)",
          "rgba(155, 81, 224, 0.25)"
        ]
      },
      {
        key: "ecomSupplyChain",
        label: "E‑commerce & Supply Chain",
        intro:
          "Recruit across end‑to‑end supply chain, operations, and industrial functions.",
        roles: [
          "Supply Chain",
          "Logistics",
          "Transportation",
          "Construction",
          "Procurement",
          "3PL",
          "Health & Safety",
          "Quality",
          "Production",
          "Warehousing",
          "Project Management",
          "Process Improvement",
          "Strategic Planning",
          "Pharmaceuticals",
          "Consumer Packaged Goods",
          "Industrial",
          "Life Sciences"
        ],
        images: [
          "/images/supply-large.jpg",
          "/images/supply-sm1.jpg",
          "/images/supply-sm2.jpg"
        ],
        learnMoreUrl: "/services",
        shapeColors: [
          "rgba(46, 204, 113, 0.25)",
          "rgba(52, 152, 219, 0.25)",
          "rgba(241, 196, 15, 0.25)"
        ]
      },
      {
        key: "manufacturing",
        label: "Manufacturing & Skilled Trade",
        intro:
          "Plant, process, quality, and HSE talent to optimize throughput and safety.",
        roles: [
          "Engineering",
          "Manufacturing",
          "Supply Chain",
          "Logistics",
          "Transportation",
          "Construction",
          "Procurement",
          "Warehousing",
          "Trades",
          "Health & Safety",
          "Project Management",
          "Quality & Lean Six Sigma"
        ],
        images: [
          "/images/mfg-large.jpg",
          "/images/mfg-sm1.jpg",
          "/images/mst.jpg"
        ],
        learnMoreUrl: "/services",
        shapeColors: [
          "rgba(44, 62, 80, 0.25)",
          "rgba(46, 204, 113, 0.25)",
          "rgba(52, 152, 219, 0.25)"
        ]
      },
      {
        key: "scientificOutsourcing",
        label: "Scientific Outsourcing",
        intro:
          "On‑demand scientific talent and managed services for R&D and labs.",
        roles: [
          "Lab Technicians",
          "Analytical Chemists",
          "Research Assistants",
          "Biostatisticians",
          "Method Development",
          "Documentation & QA"
        ],
        images: [
          "/images/so3.jpg",
          "/images/so1.jpg",
          "/images/so2.jpg"
        ],
        learnMoreUrl: "/services",
        shapeColors: [
          "rgba(52, 152, 219, 0.25)",
          "rgba(155, 81, 224, 0.25)",
          "rgba(46, 204, 113, 0.25)"
        ]
      }
      // ➕ Add more industries here
    ],
    defaultCategory: "finance",
    showArrows: true
  };
  
  export default talentConfig;
  