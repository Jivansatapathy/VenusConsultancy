export default {
  id: "aerospace",
  slug: "aerospace",
  hero: {
    title: "Aerospace Recruitment",
    subtitle: "Aerospace Staffing Solutions",
    description: "Venus Hiring helps US aerospace organizations build high-performance, safety-critical engineering teams through specialized Aerospace staffing solutions. From embedded systems and flight software to compliance and certification experts, we deliver industry-ready professionals aligned with regulatory standards, mission-critical quality, and program timelines.",
    backgroundImage: "/Photos of every Industry pages/Aerospace/Aerospace Banner.png",
    heroImage: "/Photos of every Industry pages/Aerospace/Aerospace team.png",
  },
  color: "#dc3545",
  stats: {
    enabled: true,
    items: [
      { number: "100M", label: "Data Points Analyzed", icon: "" },
      { number: "850+", label: "Client Appreciations", icon: "🤝" },
      { number: "1,000+", label: "Satisfied Clients", icon: "🏢" },
      { number: "140K", label: "Response Time (Hours)", icon: "⏱️" }, // Note: 140K hours seems odd for response time, but keeping as per user input
    ],
  },
  services: {
    enabled: true,
    banner: "SOLUTIONS",
    title: "Tailored Aerospace Staffing Solutions",
    items: [
      {
        title: "Full-Cycle Aerospace Recruitment",
        description: "End-to-end recruitment services for high-security aviation and defense roles.",
        image: "/Photos of every Industry pages/Aerospace/Aerospace Full recruitment.png",
        link: { url: "/contact", text: "Connect Now", external: false }
      },
      {
        title: "Talent Sourcing",
        description: "Accessing nationwide talent pools without the complexes of in-house sourcing.",
        image: "/Photos of every Industry pages/Aerospace/Aerospace Solutions For Next Business Growth.png",
        link: { url: "/contact", text: "Connect Now", external: false }
      },
      {
        title: "Avionics Analytics",
        description: "Specialized staffing for avionics systems and data analysis roles.",
        image: "/Photos of every Industry pages/Aerospace/Control system roles.jpg",
        link: { url: "/contact", text: "Connect Now", external: false }
      },
      {
        title: "Defense Branding",
        description: "Building your employer brand within the defense and aerospace sectors.",
        image: "/Photos of every Industry pages/Aerospace/Aerospace Banner.png",
        link: { url: "/contact", text: "Connect Now", external: false }
      }
    ],
    viewAllButton: { text: "View All Services", link: "/services", external: false }
  },
  whatYouNeed: {
    enabled: true,
    banner: "GROWTH",
    title: "Aerospace Solutions For Next Business Growth",
    description: "Venus Hiring works as an extension of your engineering, quality, and program management teams, delivering talent that meets both technical and regulatory expectations.",
    services: [
      "Full-Cycle Aerospace Recruitment",
      "Talent Pipeline Development",
      "Candidate Technical Assessment",
      "Interview Coordination",
      "Background Verification (FCRA/Security)",
      "Onboarding & Clearance Support"
    ],
    image: "/Photos of every Industry pages/Aerospace/Aerospace Solutions For Next Business Growth.png",
    button: { text: "Get Started", link: "/contact", external: false }
  },
  whyPartner: {
    enabled: true,
    banner: "PARTNER",
    title: "Why We Should Be Your Aerospace Staffing Partner",
    description: "American aerospace companies rely on us for contract, permanent, or cleared placements (Secret/Top Secret).",
    points: [
      "15+ Years of Recruitment Excellence",
      "94% Client Satisfaction Rate",
      "30% Average Cost Reduction",
      "15,000+ Successful Placements",
      "Scalable Aerospace Solutions",
      "24/7 Dedicated Support"
    ],
    image: "/Photos of every Industry pages/Aerospace/Why We Should Be Your Recruitment Partner.png",
    button: { text: "Partner With Us", link: "/contact", external: false }
  },
  // New Process Section
  process: {
    enabled: true,
    title: "Our Aerospace Hiring Process (Step-by-Step)",
    steps: [
      {
        number: "1",
        title: "Workforce Planning & Program Analysis",
        description: "We analyze your program scope, certification requirements, timelines, and workforce needs to define the ideal aerospace talent profile."
      },
      {
        number: "2",
        title: "Talent Sourcing & Market Mapping",
        description: "We source aerospace professionals across the USA using specialized engineering databases and passive talent networks."
      },
      {
        number: "3",
        title: "Technical Screening & Compliance Evaluation",
        description: "Candidates are assessed for engineering expertise, documentation standards, safety awareness, and regulatory alignment."
      },
      {
        number: "4",
        title: "Interview Coordination & Stakeholder Support",
        description: "We manage interview scheduling, technical panels, and feedback—reducing effort for engineering and program leaders."
      },
      {
        number: "5",
        title: "Background Verification & Regulatory Compliance",
        description: "We support background checks, employment verification, and compliance documentation aligned with US aerospace standards."
      },
      {
        number: "6",
        title: "Offer Management & Onboarding Support",
        description: "From compensation alignment to onboarding coordination, we ensure smooth hiring and high retention."
      },
      {
        number: "7",
        title: "Recruitment Analytics & Performance Reporting",
        description: "Gain real-time visibility into time-to-hire, cost-per-hire, candidate quality, and workforce scalability."
      }
    ]
  },
  benefits: { // Using "Benefits" section for "Aerospace Staffing Benefits (ROI-Focused)"
    enabled: true,
    title: "Aerospace Staffing Benefits (ROI-Focused)",
    items: [
      {
        title: "Faster Program & Project Execution",
        description: "Hire skilled aerospace engineers quickly to meet delivery timelines and program milestones.",
        icon: "✈️"
      },
      {
        title: "Reduced Hiring Costs",
        description: "Lower recruitment expenses through efficient sourcing and optimized hiring workflows.",
        icon: "💰"
      },
      {
        title: "High-Quality & Compliance-Ready Talent",
        description: "Access pre-vetted professionals experienced in safety-critical aerospace environments.",
        icon: "⭐"
      },
      {
        title: "Regulatory & Certification Alignment",
        description: "Ensure hiring aligns with aviation, defense, and certification standards.",
        icon: "⚖️"
      },
      {
        title: "Scalable Aerospace Workforce",
        description: "Scale teams during new aircraft programs, avionics upgrades, or space initiatives.",
        icon: "📈"
      },
      {
        title: "Predictable Hiring ROI",
        description: "Transparent metrics and reporting deliver measurable recruitment ROI.",
        icon: "📊"
      },
    ],
  },
  rolesWeHire: {
    enabled: true,
    title: "Roles We Staff For",
    subtitle: "High-demand US aerospace roles powered by 15,000+ placements.",
    items: [
      // Systems & Control Roles
      { title: "Control System Engineer", description: "Systems & Control Roles" },
      { title: "System Engineer", description: "Systems & Control Roles" },
      { title: "Validation & Verification Engineer", description: "Systems & Control Roles" },
      // Software & Quality Roles
      { title: "Software Quality Engineer", description: "Software & Quality Roles" },
      { title: "Embedded Software Engineer", description: "Software & Quality Roles" },
      { title: "DO-178 Certification Experts", description: "Software & Quality Roles" },
      // Project & Management Roles
      { title: "Technical Project Manager", description: "Project & Management Roles" }
    ]
  },
  faq: {
    enabled: true,
    title: {
      prefix: "What Do You",
      highlight: "Want To Know?",
    },
    items: [
      {
        question: "What compliance standards do you follow for aerospace hires?",
        answer: "Full FAA certification, AS9100 quality, ITAR export controls, and DO-178 compliance with security clearances."
      },
      {
        question: "How fast can you fill DO-178 or Embedded Software roles?",
        answer: "2-4 weeks average via pre-cleared US aerospace pipelines—50% faster than industry norms."
      },
      {
        question: "Do you offer contract-to-hire for aerospace engineers?",
        answer: "Yes, risk-free trials to permanent with 94% retention for program deliverables."
      },
      {
        question: "What clearances do you support?",
        answer: "Secret/Top Secret eligible candidates with ITAR experience for defense projects."
      },
    ],
    image: "/images/faq-illustration-custom.svg?v=3"
  },
  cta: {
    enabled: true,
    title: "Ready to staff your next aerospace program?",
    description: "Schedule a free compliance audit today.",
    primaryButton: {
      text: "Schedule Audit",
      link: "/contact",
      external: false,
    },
    secondaryButton: {
      text: "View All Services",
      link: "/services",
      external: false,
    },
  },
  blogs: {
    enabled: true,
  },
  seo: {
    title: "Aerospace Staffing & Recruitment Services | Venus Hiring",
    description: "Specialized aerospace staffing for US engineering teams. We provide avionics, flight software, and systems engineering talent with ITAR & clearance compliance. Fast, compliant, and scalable.",
    keywords: ["aerospace staffing", "aviation recruitment", "flight software engineers", "DO-178 compliance", "ITAR staffing", "defense recruitment"],
  },
};
