'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import UpFooter from '@/components/UpFooter';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import CustomCursor from '@/components/CustomCursor';
import ImagePreloader from '@/components/ImagePreloader';
import PageTransition from '@/components/PageTransition';

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Preload critical images */}
      <ImagePreloader images={[
        '/01.jpeg',
        '/venuslogo.png',
        '/Background.png'
      ]} />
      
      {/* Navbar - rendered once in layout */}
      <Navbar />

      <PageTransition key={pathname}>
        {children}
      </PageTransition>

      {/* Show UpFooter everywhere except Contact and Services pages */}
      {pathname !== "/contact" && pathname !== "/services" && (
        <UpFooter />
      )}

      {/* Show ContactSection everywhere except Contact and Services pages */}
      {pathname !== "/contact" && pathname !== "/services" && (
        <ContactSection />
      )}

      <Footer />
      
      {/* WhatsApp Float Button - appears on all pages */}
      <WhatsAppFloat />
    </>
  );
}

