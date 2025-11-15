'use client';

import Hero from '@/components/ThirdHero';
import ScrollingBanner from '@/components/ScrollingBanner';
import StatAbout from '@/components/StatAbout';
// Import directly to avoid CSS chunk loading issues in Next.js 16
import WhyStats from '@/components/WhyStats';
import TalentSection from '@/components/TalentSection';
import ServicesSection from '@/components/ServicesSection';
import BlogSection from '@/components/BlogSection';

export default function Home() {
  return (
    <>
      {/* Above the fold - Load immediately */}
      <Hero />
      <ScrollingBanner />
      <StatAbout />
      
      {/* Below the fold - Load directly (CSS works better this way in Next.js 16) */}
      <ServicesSection/>
      <TalentSection/>
      <WhyStats />
      <BlogSection/>
    </>
  );
}

