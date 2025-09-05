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
      }
      // ➕ Add more industries here
    ],
    defaultCategory: "finance",
    showArrows: true
  };
  
  export default talentConfig;
  