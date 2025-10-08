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
        image: "/images/service-board.png",
        link: "/contact"
      },
      {
        key: "executive",
        title: "Executive Search",
        excerpt:
          "Trusted advisors helping firms hire top-of-the-line leaders and executives.",
        image: "/images/service-executive.png",
        link: "/contact"
      },
      {
        key: "leadership",
        title: "Leadership Hiring",
        excerpt:
          "We enable firms to build strong and diverse leadership teams.",
        image: "/images/service-leadership.jpg",
        link: "/contact"
      },
      {
        key: "talent-advisory",
        title: "Talent Advisory Solutions",
        excerpt:
          "Cultivate a leadership culture that aligns with your values and objectives.",
        image: "/images/service-advisory.png",
        link: "/contact"
      }
      // add more items if needed
    ]
  };
  
  export default services;
  