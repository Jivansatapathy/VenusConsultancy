import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img
            src="/venuslogo.png"
            alt="Venus Hiring"
            className={`logo-img ${isScrolled ? "small" : ""}`}
          />
        </Link>

        {/* Nav Items */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/find-talent">Hire Talent</Link>
          <Link to="/find-jobs">Find Jobs</Link>
          <Link to="/recruits">Venus Recruits</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* Book a Call Button */}
        <Link to="/book-call" className="book-btn">
          Book A Call
        </Link>

        {/* Mobile Toggle */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/find-talent" onClick={() => setMenuOpen(false)}>Hire Talent</Link>
          <Link to="/find-jobs" onClick={() => setMenuOpen(false)}>Find Jobs</Link>
          <Link to="/recruits" onClick={() => setMenuOpen(false)}>Venus Recruits</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          <Link
            to="/book-call"
            className="book-btn"
            onClick={() => setMenuOpen(false)}
          >
            Book A Call
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
