// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import UpFooter from "./components/UpFooter";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

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


  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {/* Navbar is always visible */}
      <Navbar />

      <Routes>
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

        {/* Home Page */}
        <Route path="/" element={
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        } />
      </Routes>

      {/* ✅ Show UpFooter everywhere except Contact and Services pages */}
      {location.pathname !== "/contact" && location.pathname !== "/services" && (
        <UpFooter
          heading={
            <>
              Strengthen your Human Resource
              <br />Strategy with Venus Consultancy
            </>
          }
          ctaText="Get In Touch"
          ctaHref="/contact"
        />
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
