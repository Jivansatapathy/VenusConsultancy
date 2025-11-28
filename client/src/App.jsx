// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import UpFooter from "./components/UpFooter";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CustomCursor from "./components/CustomCursor";
import PageTransition from "./components/PageTransition";
import ImagePreloader from "./components/ImagePreloader";

// Lazy load heavy components
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const RecruiterDashboard = lazy(() => import("./pages/RecruiterDashboard"));
const PostJob = lazy(() => import("./pages/PostJob"));
const Services = lazy(() => import("./pages/Services"));
const FindJobs = lazy(() => import("./pages/FindJobs"));
const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/AboutUs"));
const BookCall = lazy(() => import("./pages/BookCall"));
const Hiring = lazy(() => import("./pages/Hiring"));
const JobRoles = lazy(() => import("./pages/JobRoles"));
const ServiceCategory = lazy(() => import("./pages/ServiceCategory"));
const Blog = lazy(() => import("./pages/Blog"));
const Gallery = lazy(() => import("./pages/Gallery"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '200px',
    fontSize: '18px',
    color: '#666'
  }}>
    Loading...
  </div>
);

// ✅ Wrapper so we can use useLocation inside Router
function AppContent() {
  const location = useLocation();

  // Scroll to top on route change - improved implementation
  useEffect(() => {
    // Use multiple methods for better browser compatibility
    const scrollToTop = () => {
      // Try modern method first
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      } else {
        window.scrollTo(0, 0);
      }
      // Fallback for older browsers
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // Immediate scroll
    scrollToTop();
    
    // Also scroll after a small delay to handle any async rendering or transitions
    const timeoutId = setTimeout(scrollToTop, 150);
    
    return () => clearTimeout(timeoutId);
  }, [location]);

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
      
      {/* Navbar is always visible */}
      <Navbar />

      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
        <Route path="/admin/login" element={
          <Suspense fallback={<LoadingFallback />}>
            <AdminLogin />
          </Suspense>
        } />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Suspense fallback={<LoadingFallback />}>
                <AdminDashboard />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route path="/blog/:slug?" element={
          <Suspense fallback={<LoadingFallback />}>
            <Blog />
          </Suspense>
        } />
        <Route
          path="/recruiter/dashboard"
          element={
            <PrivateRoute allowedRoles={["recruiter", "admin"]}>
              <Suspense fallback={<LoadingFallback />}>
                <RecruiterDashboard />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/post-job"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Suspense fallback={<LoadingFallback />}>
                <PostJob />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route path="/services" element={
          <Suspense fallback={<LoadingFallback />}>
            <Services />
          </Suspense>
        } />
        <Route path="/find-jobs" element={
          <Suspense fallback={<LoadingFallback />}>
            <FindJobs />
          </Suspense>
        } />
        <Route path="/contact" element={
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        } />

        <Route path="/about" element={
          <Suspense fallback={<LoadingFallback />}>
            <About />
          </Suspense>
        } />

        <Route path="/book-call" element={
          <Suspense fallback={<LoadingFallback />}>
            <BookCall />
          </Suspense>
        } />

        <Route path="/hiring" element={
          <Suspense fallback={<LoadingFallback />}>
            <Hiring />
          </Suspense>
        } />
        <Route path="/hiring/:jobRole" element={
          <Suspense fallback={<LoadingFallback />}>
            <Hiring />
          </Suspense>
        } />
        <Route path="/job-roles" element={
          <Suspense fallback={<LoadingFallback />}>
            <JobRoles />
          </Suspense>
        } />
        <Route path="/service-category/:categoryKey" element={
          <Suspense fallback={<LoadingFallback />}>
            <ServiceCategory />
          </Suspense>
        } />
        <Route path="/gallery" element={
          <Suspense fallback={<LoadingFallback />}>
            <Gallery />
          </Suspense>
        } />
        <Route path="/privacy" element={
          <Suspense fallback={<LoadingFallback />}>
            <PrivacyPolicy />
          </Suspense>
        } />
        <Route path="/terms" element={
          <Suspense fallback={<LoadingFallback />}>
            <TermsOfService />
          </Suspense>
        } />
        <Route path="/disclaimer" element={
          <Suspense fallback={<LoadingFallback />}>
            <Disclaimer />
          </Suspense>
        } />

        {/* Home Page */}
        <Route path="/" element={
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        } />
          </Routes>
        </PageTransition>
      </AnimatePresence>

      {/* ✅ Show UpFooter everywhere except Contact and Services pages */}
      {location.pathname !== "/contact" && location.pathname !== "/services" && (
        <UpFooter />
      )}

      {/* ✅ Show ContactSection everywhere except Contact and Services pages */}
      {location.pathname !== "/contact" && location.pathname !== "/services" && (
        <ContactSection />
      )}

      <Footer />
      
      {/* WhatsApp Float Button - appears on all pages */}
      <WhatsAppFloat />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
