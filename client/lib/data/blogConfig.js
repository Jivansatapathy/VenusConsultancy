// client/src/data/blogConfig.js
// Put images in client/public/images/ and update paths if needed

const blogConfig = {
    heading: "Insights & Articles",
    subheading:
      "Latest thinking on hiring, talent strategy and interview best practices from the Venus Hiring team.",
    items: [
      {
        slug: "how-to-hire-remote-engineers",
        title: "How to hire remote engineers without wasting time",
        excerpt:
          "We share a streamlined process for sourcing, interviewing, and onboarding remote engineering talent that actually sticks.",
        author: "Jivan Satapathy",
        date: "2025-08-15",
        tags: ["Hiring", "Engineering"],
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop&crop=center",
        readMoreUrl: "/blog/how-to-hire-remote-engineers"
      },
      {
        slug: "build-a-inclusive-interview-process",
        title: "Building an inclusive interview process: practical steps",
        excerpt:
          "Simple adjustments to job descriptions, interviewing, and feedback loops that make hiring fairer and more effective.",
        author: "Soumya R.",
        date: "2025-07-30",
        tags: ["Diversity", "Recruitment"],
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop&crop=center",
        readMoreUrl: "/blog/build-a-inclusive-interview-process"
      },
      {
        slug: "employer-branding-matters",
        title: "Employer branding for startups: what actually works",
        excerpt:
          "From employee storytelling to practical social proof — tactics that help early-stage companies attract the right talent.",
        author: "Pooja K.",
        date: "2025-06-18",
        tags: ["Branding", "Startups"],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop&crop=center",
        readMoreUrl: "/blog/employer-branding-matters"
      }
    ],
    readMoreUrl: "/blog"
  };
  
  export default blogConfig;
  