import React, { Suspense, lazy } from "react";
import Hero from "../components/ThirdHero";
import AboutUs from "../components/AboutUs";

// Lazy load heavy components that are below the fold
const Certifications = lazy(() => import("../components/Certifications"));
const JourneyStats = lazy(() => import("../components/JourneyStats"));
const WhyStats = lazy(() => import("../components/WhyStats"));
const TalentSection = lazy(() => import("../components/TalentSection"));
const Testimonials = lazy(() => import("../components/Testimonials"));
const ServicesSection = lazy(() => import("../components/ServicesSection"));
const BlogSection = lazy(() => import("../components/BlogSection"));

// Loading fallback for lazy components
const LazyFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100px',
    fontSize: '16px',
    color: '#666'
  }}>
    Loading...
  </div>
);
export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Suspense fallback={<LazyFallback />}>
        <Certifications />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <JourneyStats />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <WhyStats />
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <TalentSection/>
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <Testimonials/>
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <ServicesSection/>
      </Suspense>
      <Suspense fallback={<LazyFallback />}>
        <BlogSection/>
      </Suspense>
    </>
  );
}
