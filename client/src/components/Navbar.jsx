import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/find-talent", label: "Hire Talent" },
  { to: "/find-jobs", label: "Find Jobs" },
  { to: "/recruits", label: "Venus Recruits" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const focusTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Manage focus trap + ESC while menu open
  useEffect(() => {
    if (!menuOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const container = mobileMenuRef.current;
        if (!container) return;
        const focusable = container.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        // shift+tab from first -> go to last
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);

    // safely move focus to first link (use timeout but keep ref to clear)
    focusTimeoutRef.current = setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 60);

    return () => {
      document.removeEventListener("keydown", handleKey);
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
        focusTimeoutRef.current = null;
      }
    };
  }, [menuOpen]);

  // When menu closes, return focus to toggle (only if toggle exists)
  useEffect(() => {
    if (!menuOpen) {
      // delay slightly to allow DOM updates
      setTimeout(() => {
        if (menuButtonRef.current) menuButtonRef.current.focus();
      }, 60);
    }
  }, [menuOpen]);

  return (
    <header className={`vh-navbar ${isScrolled ? "vh-navbar--scrolled" : ""}`}>
      <nav className="vh-navbar__inner u-container" aria-label="Main navigation">
        <Link to="/" className="vh-navbar__brand" aria-label="Venus Hiring home">
          <img
            src="/venuslogo.png"
            alt="Venus Hiring"
            className={`vh-navbar__logo ${isScrolled ? "vh-navbar__logo--small" : ""}`}
          />
        </Link>

        {/* Desktop links: when mobile menu is open we set tabIndex=-1 to prevent tabbing into them */}
        <div className="vh-navbar__links" role="navigation" aria-hidden={menuOpen}>
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`vh-navlink ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                tabIndex={menuOpen ? -1 : 0}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="vh-navbar__actions">
          <Link to="/book-call" className="vh-btn vh-btn--outline" tabIndex={menuOpen ? -1 : 0}>
            Book A Call
          </Link>

          <button
            ref={menuButtonRef}
            className="vh-navbar__toggle"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((s) => !s)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu (kept in DOM so focus trapping works); aria-hidden toggled */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`vh-mobile-menu ${menuOpen ? "vh-mobile-menu--open" : ""}`}
        aria-hidden={!menuOpen}
        role="menu"
      >
        <div className="vh-mobile-menu__inner" role="presentation">
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="vh-mobile-menu__link"
              ref={idx === 0 ? firstLinkRef : null}
              role="menuitem"
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/book-call"
            className="vh-mobile-menu__cta"
            onClick={() => setMenuOpen(false)}
            role="menuitem"
          >
            Book A Call
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
