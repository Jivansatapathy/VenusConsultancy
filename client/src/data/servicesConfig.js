// client/src/data/servicesConfig.js
// Put service images in client/public/images/ and update paths if needed

const services = {
    heading: "Our Services",
    description:
      "We provide tailored hiring and advisory services to help organisations build strong teams and leadership.",
    items: [
      {
        key: "board",
        title: "Board Advisory Services",
        excerpt:
          "Fortify key appointments that will shape the future of your organisation.",
        image: "/images/service-board.jpg",
        link: "/services/board"
      },
      {
        key: "executive",
        title: "Executive Search",
        excerpt:
          "Trusted advisors helping firms hire top-of-the-line leaders and executives.",
        image: "/images/service-executive.jpg",
        link: "/services/executive-search"
      },
      {
        key: "leadership",
        title: "Leadership Hiring",
        excerpt:
          "We enable firms to build strong and diverse leadership teams.",
        image: "/images/service-leadership.jpg",
        link: "/services/leadership"
      },
      {
        key: "talent-advisory",
        title: "Talent Advisory Solutions",
        excerpt:
          "Cultivate a leadership culture that aligns with your values and objectives.",
        image: "/images/service-advisory.jpg",
        link: "/services/talent-advisory"
      }
      // add more items if needed
    ]
  };
  
  export default services;
  