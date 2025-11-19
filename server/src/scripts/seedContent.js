// server/src/scripts/seedContent.js
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Content from "../models/Content.js";

dotenv.config();

// Base content structure - matches the default content in SEOContentContext.jsx
const getBaseContent = () => ({
  home: {
    hero: {
      greeting: "- Empower Your Workforce -",
      titleLine1: "Shape the Future of",
      titleLine2: "Your Organization Today",
      subtitle: "Connect with top-tier talent across the USA and discover professionals who drive growth, innovation, and success for American businesses.",
      button1Text: "Book a Consultation",
      button1Link: "/book-call",
      button2Text: "Our Services",
      button2Link: "/services",
      image: null
    },
    statAbout: {
      tag: "ABOUT VENUS HIRING",
      title: "Driving Success With An Expert Staffing",
      description: "At Venus Consultancy, we understand that the key to business success lies in having the right people on your team. That's why we're committed to connecting USA companies with top-tier talent across North America and beyond.",
      stat1Number: "77",
      stat1Suffix: "K+",
      stat1Label: "Trusted Partnerships",
      stat2Number: "98",
      stat2Suffix: "%",
      stat2Label: "Client Satisfaction",
      stat3Number: "99",
      stat3Suffix: "%",
      stat3Label: "Success Rate",
      ctaText: "JOIN OUR NETWORK",
      ctaLink: "/book-call",
      images: {
        image1: "/images/imagetrail/image1.jpg",
        image2: "/images/imagetrail/image2.jpg",
        image3: "/images/imagetrail/image3.jpg",
        image4: "/images/imagetrail/image4.jpg"
      },
      experienceNumber: "18+",
      experienceLabel: "Years Of Experience",
      teamText: "We Are Awesome Team"
    },
    services: {
      heading: "Our Services",
      description: "We provide tailored hiring and advisory services to help organisations build strong teams and leadership.",
      items: [
        {
          key: "permanent-staffing",
          title: "Permanent Staffing",
          excerpt: "Connecting organizations with full-time professionals across technology, engineering, corporate, and skilled trades.",
          image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format",
          link: "/contact"
        },
        {
          key: "contract-temporary",
          title: "Contract & Temporary Staffing",
          excerpt: "Flexible talent solutions for short- or long-term projects to meet dynamic business needs.",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format",
          link: "/contact"
        },
        {
          key: "fractional-hr",
          title: "Fractional HR & HR Advisory",
          excerpt: "Providing part-time or interim HR leadership for workforce planning, compliance, and engagement.",
          image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&auto=format",
          link: "/contact"
        },
        {
          key: "sow-project",
          title: "Statement of Work (SOW) & Project-Based Solutions",
          excerpt: "Deploying specialized talent for defined projects or deliverables without long-term commitments.",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&auto=format",
          link: "/contact"
        },
        {
          key: "startup-hiring",
          title: "Startup Hiring",
          excerpt: "Specialized recruitment solutions for startups and growing companies, connecting them with innovative talent ready to scale.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&auto=format",
          link: "/contact"
        }
      ]
    },
    talent: {
      heading: "Add specialized talent across your organization",
      categories: [
        {
          key: "finance",
          label: "Finance & Accounting",
          intro: "We connect you with top finance professionals, from accountants to CFOs, ensuring your business runs smoothly and grows sustainably.",
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
            "rgba(229, 9, 20, 0.25)",
            "rgba(4, 87, 87, 0.25)",
            "rgba(6, 90, 99, 0.25)"
          ]
        },
        {
          key: "technology",
          label: "Technology",
          intro: "Scale your engineering teams with skilled developers, DevOps, and data experts to accelerate product innovation.",
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
            "rgba(155, 81, 224, 0.25)",
            "rgba(52, 152, 219, 0.25)",
            "rgba(46, 204, 113, 0.25)"
          ]
        }
      ]
    },
    whyStats: {
      heading: "Why Choose Venus Consultancy?",
      cards: [
        {
          title: 'Human-Centered Approach',
          summary: 'Beyond algorithms, human insight',
          description: 'Every candidate and employer is carefully evaluated through our human-led process, going beyond algorithms to assess personality, skills, and cultural fit. We leverage data-driven insights to ensure the right match — combining precision with the human touch that machines cannot replicate.',
          icon: "/iconanimated/algorithm.gif"
        },
        {
          title: 'Comprehensive Talent Solutions',
          summary: 'End-to-end recruitment across industries',
          description: 'We provide end-to-end recruitment services across IT, Engineering, Scientific, Skilled Trades, Light Industrial, Office & Clerical, Technical Support, Outsourcing, and Recruitment Process Outsourcing. Additionally, we specialize in Executive and Board-level recruitment.',
          icon: "/iconanimated/union.gif"
        },
        {
          title: 'Quality & Integrity',
          summary: 'Ethical excellence, guaranteed success',
          description: 'We take responsibility for placing candidates with strong social, ethical, and professional skills, ensuring they are fully prepared for interviews and workplace success.',
          icon: "/iconanimated/algorithm.gif"
        },
        {
          title: 'Global Reach',
          summary: 'Worldwide talent, local expertise',
          description: 'We connect talent with opportunities worldwide, supporting professionals from diverse backgrounds and helping employers access the best talent, anywhere.',
          icon: "/iconanimated/algorithm.gif"
        }
      ]
    },
    blog: {
      heading: "Insights & Articles",
      subheading: "Latest thinking on hiring, talent strategy and interview best practices from the Venus Hiring team.",
      readMoreUrl: "/blog",
      items: [
        {
          slug: "how-to-hire-remote-engineers",
          title: "How to hire remote engineers without wasting time",
          excerpt: "We share a streamlined process for sourcing, interviewing, and onboarding remote engineering talent that actually sticks.",
          author: "Jivan Satapathy",
          date: "2025-08-15",
          tags: ["Hiring", "Engineering"],
          image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop&crop=center",
          readMoreUrl: "/blog/how-to-hire-remote-engineers"
        },
        {
          slug: "build-a-inclusive-interview-process",
          title: "Building an inclusive interview process: practical steps",
          excerpt: "Simple adjustments to job descriptions, interviewing, and feedback loops that make hiring fairer and more effective.",
          author: "Soumya R.",
          date: "2025-07-30",
          tags: ["Diversity", "Recruitment"],
          image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop&crop=center",
          readMoreUrl: "/blog/build-a-inclusive-interview-process"
        },
        {
          slug: "employer-branding-matters",
          title: "Employer branding for startups: what actually works",
          excerpt: "From employee storytelling to practical social proof — tactics that help early-stage companies attract the right talent.",
          author: "Pooja K.",
          date: "2025-06-18",
          tags: ["Branding", "Startups"],
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&crop=center",
          readMoreUrl: "/blog/employer-branding-matters"
        }
      ]
    }
  },
  meta: {
    home: {
      title: "Venus Hiring - Top Talent Recruitment Services",
      description: "Connect with top-tier talent across the USA. Expert staffing solutions for American businesses.",
      keywords: "recruitment, staffing, talent acquisition, hiring, USA"
    }
  }
});

const seed = async () => {
  try {
    await connectDB();
    console.log("Connected to database");

    // Check if content already exists
    let content = await Content.findOne();
    
    if (content && content.data && Object.keys(content.data).length > 0) {
      console.log("⚠️  Content already exists in database.");
      console.log("   Existing pages:", Object.keys(content.data).join(", "));
      console.log("   Use --force flag to overwrite, or update through admin panel.");
      process.exit(0);
    }

    // Get base content
    const baseContent = getBaseContent();

    // Create or update content document
    if (!content) {
      content = new Content({ data: baseContent });
    } else {
      content.data = baseContent;
    }
    
    content.updatedAt = new Date();
    await content.save();

    console.log("✅ Base content seeded successfully!");
    console.log("   Pages initialized:", Object.keys(baseContent).join(", "));
    console.log("   You can now update content through the admin panel.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding content:", err);
    process.exit(1);
  }
};

// Check for --force flag
const args = process.argv.slice(2);
const force = args.includes('--force');

if (force) {
  console.log("⚠️  Force mode: Will overwrite existing content...");
  const seedForce = async () => {
    try {
      await connectDB();
      console.log("Connected to database");

      const baseContent = getBaseContent();
      let content = await Content.findOne();
      
      if (!content) {
        content = new Content({ data: baseContent });
      } else {
        content.data = baseContent;
      }
      
      content.updatedAt = new Date();
      await content.save();

      console.log("✅ Base content force-seeded successfully!");
      console.log("   Pages initialized:", Object.keys(baseContent).join(", "));
      process.exit(0);
    } catch (err) {
      console.error("❌ Error force-seeding content:", err);
      process.exit(1);
    }
  };
  seedForce();
} else {
  seed();
}

