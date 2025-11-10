// client/src/components/Navbar.jsx
import { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import "./Navbar.css";
import { AuthContext } from "../context/AuthContext";
import servicesConfig from "../data/servicesConfig";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services", hasDropdown: true },
  { to: "/find-jobs", label: "Find Jobs" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" }
];

const AUTH_LINKS = [
  { to: "/admin/dashboard", label: "Dashboard", roles: ["admin"] },
  { to: "/recruiter/dashboard", label: "Dashboard", roles: ["recruiter"] }
];

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const focusTimeoutRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const servicesLinkRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  // Handle Services dropdown hover with delay
  useEffect(() => {
    const handleMouseEnter = () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
        dropdownTimeoutRef.current = null;
      }
      setServicesDropdownOpen(true);
    };

    const handleMouseLeave = () => {
      dropdownTimeoutRef.current = setTimeout(() => {
        setServicesDropdownOpen(false);
      }, 200); // 200ms delay before closing
    };

    const linkElement = servicesLinkRef.current;
    const dropdownElement = servicesDropdownRef.current;

    if (linkElement) {
      linkElement.addEventListener('mouseenter', handleMouseEnter);
      linkElement.addEventListener('mouseleave', handleMouseLeave);
    }

    if (dropdownElement) {
      dropdownElement.addEventListener('mouseenter', handleMouseEnter);
      dropdownElement.addEventListener('mouseleave', handleMouseLeave);
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (
        linkElement &&
        dropdownElement &&
        !linkElement.contains(event.target) &&
        !dropdownElement.contains(event.target)
      ) {
        setServicesDropdownOpen(false);
      }
    };

    if (servicesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      if (linkElement) {
        linkElement.removeEventListener('mouseenter', handleMouseEnter);
        linkElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (dropdownElement) {
        dropdownElement.removeEventListener('mouseenter', handleMouseEnter);
        dropdownElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('mousedown', handleClickOutside);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
        dropdownTimeoutRef.current = null;
      }
    };
  }, [servicesDropdownOpen]);

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

  const handleLogout = async () => {
    try {
      // Start logout process (non-blocking)
      logout();
      // Immediately navigate to login page
      navigate("/admin/login");
    } catch (err) {
      console.warn("Logout failed", err);
      // Still navigate even if logout fails
      navigate("/admin/login");
    }
  };

  // helper: decide whether to show an internal-only link
  const canSeeInternal = () => {
    if (!isAuthenticated || !user) return false;
    return ["admin", "recruiter"].includes(user.role);
  };

  return (
    <header className={`vh-navbar ${isScrolled ? "vh-navbar--scrolled" : ""}`}>
      <nav className="vh-navbar__inner u-container" aria-label="Main navigation">
        <Link to="/" className="vh-navbar__brand" aria-label="Venus Hiring home">
          <img
            src="/venuslo.png"
            alt="Venus Hiring"
            className={`vh-navbar__logo ${isScrolled ? "vh-navbar__logo--small" : ""}`}
          />
        </Link>

        {/* Desktop links: when mobile menu is open we set tabIndex=-1 to prevent tabbing into them */}
        <div className="vh-navbar__links" role="navigation" aria-hidden={menuOpen}>
          {NAV_LINKS.map((link) => {
            // hide internal-only links from public / unauthorized users
            if (link.internalOnly && !canSeeInternal()) return null;

            const isActive = location.pathname === link.to;
            
            // Services dropdown
            if (link.hasDropdown) {
              return (
                <div
                  key={link.to}
                  className="vh-navlink-wrapper"
                  ref={servicesLinkRef}
                >
                  <Link
                    to={link.to}
                    className={`vh-navlink vh-navlink--dropdown ${isActive ? "active" : ""} ${servicesDropdownOpen ? "vh-navlink--dropdown-open" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    aria-haspopup="true"
                    aria-expanded={servicesDropdownOpen}
                    tabIndex={menuOpen ? -1 : 0}
                  >
                    {link.label}
                    <ChevronDown size={16} className="vh-navlink__chevron" />
                  </Link>
                  {servicesDropdownOpen && (
                    <div
                      ref={servicesDropdownRef}
                      className="vh-dropdown"
                      role="menu"
                    >
                      {servicesConfig.items.map((service) => (
                        <Link
                          key={service.key}
                          to={`/service-category/${service.key}`}
                          className="vh-dropdown__item"
                          role="menuitem"
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          {service.title}
                        </Link>
                      ))}
                      <Link
                        to="/services"
                        className="vh-dropdown__item vh-dropdown__item--view-all"
                        role="menuitem"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        View All Services →
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            // Regular link
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
          
          {/* Dashboard link for authenticated users */}
          {isAuthenticated && user && AUTH_LINKS.map((link) => {
            if (!link.roles.includes(user.role)) return null;
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

          {/* Auth area: Only show logout for authenticated users */}
          {isAuthenticated && (
            <>
              <span style={{ marginLeft: 8, color: "#333", fontSize: 14 }}>
                {user?.name || user?.email}
              </span>
              <button onClick={handleLogout} className="vh-btn" style={{ marginLeft: 8, cursor: "pointer" }} tabIndex={menuOpen ? -1 : 0}>
                Logout
              </button>
            </>
          )}

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
          {NAV_LINKS.map((link, idx) => {
            // hide internal-only links from public / unauthorized users
            if (link.internalOnly && !canSeeInternal()) return null;

            return (
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
            );
          })}
          
          {/* Dashboard link for authenticated users in mobile menu */}
          {isAuthenticated && user && AUTH_LINKS.map((link) => {
            if (!link.roles.includes(user.role)) return null;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="vh-mobile-menu__link"
                role="menuitem"
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            to="/book-call"
            className="vh-mobile-menu__cta"
            onClick={() => setMenuOpen(false)}
            role="menuitem"
          >
            Book A Call
          </Link>

          {/* Mobile auth actions - Only show for authenticated users */}
          {isAuthenticated && (
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <div style={{ padding: ".6rem .8rem", fontWeight: 700 }}>{user?.name || user?.email}</div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="vh-mobile-menu__link"
                style={{ textAlign: "left", border: "none", background: "transparent", cursor: "pointer" }}
                role="menuitem"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
