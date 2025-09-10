// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import Services from "./pages/Services";
import FindJobs from "./pages/FindJobs";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import UpFooter from "./components/UpFooter";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
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


        <Route path="/about" element={<h1>About Us Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />

        {/* Home Page */}
        <Route path="/" element={<Home />} />
      </Routes>

      <UpFooter
        heading={<>Strengthen your Human Resource<br/>Strategy with Venus Consultancy</>}
        ctaText="Get In Touch"
        ctaHref="/contact"
      />
      <Footer />
    </Router>
  );
}

export default App;
