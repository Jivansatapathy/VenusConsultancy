// client/src/data/servicesData.js
// Services content used by Services page (single-page layout)
const servicesData = [
  {
    id: "board-advisory",
    title: "Board Advisory Services",
    subtitle: "Governance • Strategy • Risk",
    description:
      "We advise boards and leadership teams on governance, strategic roadmaps and long-term value creation.",
    bullets: [
      "Board composition & diversity",
      "Strategy alignment & roadmaps",
      "Succession planning & performance frameworks"
    ],
    extended: `
      <h4>What this is</h4>
      <p>Board Advisory Services provide independent, strategic counsel to boards and executive teams. We help shape governance structures, define strategic priorities, and ensure the board is set up to support growth and risk management.</p>
      <h4>How we help you hire</h4>
      <ul>
        <li><strong>Board composition:</strong> We map skills, gaps and help build a diverse board aligned to strategy.</li>
        <li><strong>Succession planning:</strong> Identify and prepare executive and independent director candidates for long-term continuity.</li>
        <li><strong>Search & onboarding:</strong> Confidential search for non-exec directors and support for effective onboarding & charter definition.</li>
      </ul>
      <p>Typical engagement: strategic advisory + retained search for 3–12 months depending on scope.</p>
    `,
    images: ["/services/board-1.jpg", "/services/board-2.jpg", "/services/board-3.jpg"],
    color: "#0b6ea0",
    metric: { label: "Advisory tenure", value: "Avg 12 months" },
    anchor: "board-advisory",
    illustration: "/illustrations/illus-board.svg"
  },

  {
    id: "executive-search",
    title: "Executive Search",
    subtitle: "C-suite & Senior Leadership",
    description:
      "Confidential executive searches to identify, attract and onboard transformational leaders.",
    bullets: [
      "Confidential CxO search",
      "Market mapping & competitor intel",
      "Offer & onboarding support"
    ],
    extended: `
      <h4>About our Executive Search</h4>
      <p>We run confidential mandates for senior leadership roles — combining research, outreach, and rigorous assessment to ensure strong cultural and domain fit.</p>
      <h4>How we help</h4>
      <ul>
        <li>Market mapping and passive candidate outreach.</li>
        <li>Leadership assessment & evidence-based shortlists.</li>
        <li>Negotiation support and onboarding follow-up.</li>
      </ul>
    `,
    images: ["/services/exec-1.jpg", "/services/exec-2.jpg", "/services/exec-3.jpg"],
    color: "#b02e2e",
    metric: { label: "Success rate", value: "98%" },
    anchor: "executive-search",
    illustration: "/illustrations/illus-exec.svg"
  },

  {
    id: "leadership-hiring",
    title: "Leadership Hiring",
    subtitle: "Mid-senior management",
    description:
      "Programs to build leadership pipelines — hiring heads of function and senior managers with domain-fit.",
    bullets: [
      "Targeted shortlist delivery",
      "Leadership assessment",
      "Panel interviews & feedback"
    ],
    extended: `
      <h4>Leadership Hiring programs</h4>
      <p>We design targeted hiring programs to source and assess mid-senior leaders. This includes tailored briefs, behavioral assessments, and structured interview guides for calibration.</p>
      <h4>Deliverables</h4>
      <ul>
        <li>Shortlist of 6–8 vetted candidates.</li>
        <li>Assessment summaries and hiring scorecards.</li>
        <li>Onboarding checklist and 30/60/90 plan support.</li>
      </ul>
    `,
    images: ["/services/leadership-1.jpg", "/services/leadership-2.jpg", "/services/leadership-3.jpg"],
    color: "#2e7d32",
    metric: { label: "Avg shortlist", value: "7 days" },
    anchor: "leadership-hiring",
    illustration: "/illustrations/illus-leadership.svg"
  },

  {
    id: "talent-advisory",
    title: "Talent Advisory Solutions",
    subtitle: "Workforce planning • Employer brand",
    description:
      "Employer branding, workforce planning and retention programs that reduce attrition and increase productivity.",
    bullets: [
      "Employer branding & EVP",
      "Workforce planning",
      "Retention & L&D strategies"
    ],
    extended: `
      <h4>Talent Advisory Solutions</h4>
      <p>We partner with HR and leadership to build talent strategies that scale: EVP design, employer brand, and retention programming.</p>
      <h4>How it works</h4>
      <ol>
        <li>Diagnose: stakeholder interviews & attrition analysis.</li>
        <li>Design: EVP, internal mobility and L&D pathways.</li>
        <li>Deploy: pilot cohorts, measurement and iterative improvements.</li>
      </ol>
    `,
    images: ["/services/talent-1.jpg", "/services/talent-2.jpg", "/services/talent-3.jpg"],
    color: "#5b21b6",
    metric: { label: "Client NPS", value: "89" },
    anchor: "talent-advisory",
    illustration: "/illustrations/illus-talent.svg"
  }
];

export default servicesData;
