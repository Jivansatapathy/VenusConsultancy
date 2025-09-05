import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";
import PostJob from "./pages/PostJob";
import FindJobs from "./pages/FindJobs";
import FindTalent from "./pages/FindTalent";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";  // ✅ Import Home
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
          path="/admin/post-job"
          element={
            <PrivateRoute>
              <PostJob />
            </PrivateRoute>
          }
        />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/find-talent" element={<FindTalent />} />
        <Route path="/about" element={<h1>About Us Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />

        {/* ✅ Home Page Connected */}
        <Route path="/" element={<Home />} />
      </Routes>
      <UpFooter
        heading={<>Strengthen your Human Resource<br/>Strategy with ABC Consultants</>}
        ctaText="Get In Touch"
        ctaHref="/contact"
      />
      <Footer />
    </Router>
  );
}

export default App;
