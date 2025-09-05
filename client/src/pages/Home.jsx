import React from "react";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import Certifications from "../components/Certifications";
import JourneyStats from "../components/JourneyStats";
import WhyStats from "../components/WhyStats";
import TalentSection from "../components/TalentSection";
import Testimonials from "../components/Testimonials";
import ServicesSection from "../components/ServicesSection";
import BlogSection from "../components/BlogSection";
export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Certifications />
      <JourneyStats />
      <WhyStats />
      <TalentSection/>
      <Testimonials/>
      <ServicesSection/>
      <BlogSection/>
    </>
  );
}
