// client/src/App.jsx
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import Services from "./pages/Services";
import FindJobs from "./pages/FindJobs";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import UpFooter from "./components/UpFooter";
import About from "./pages/AboutUs";
import Footer from "./components/Footer";

// ✅ Wrapper so we can use useLocation inside Router
function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* Navbar is always visible */}
      <Navbar />

      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/recruiter/dashboard"
          element={
            <PrivateRoute allowedRoles={["recruiter", "admin"]}>
              <RecruiterDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/post-job"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <PostJob />
            </PrivateRoute>
          }
        />
        <Route path="/services" element={<Services />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<About />} />

        {/* Home Page */}
        <Route path="/" element={<Home />} />
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

      <Footer />
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
