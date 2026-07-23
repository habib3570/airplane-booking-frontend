import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Plane, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useSiteSettings } from "../../context/SiteSettingsContext";
import { getInitials, cn, resolveImageUrl } from "../../utils/helpers";
import { ROLES } from "../../utils/constants";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Flights", to: "/search" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const siteSettings = useSiteSettings();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleLogout() {
    await logout();
    setProfileOpen(false);
    navigate("/");
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-200",
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur"
      )}
    >
      <div className="container-app flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          {siteSettings.logoUrl ? (
            <img
              src={siteSettings.logoUrl}
              alt={siteSettings.siteName}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover"
            />
          ) : (
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-navy flex items-center justify-center">
              <Plane className="text-gold" size={20} />
            </div>
          )}
          <span className="text-lg sm:text-xl font-heading font-bold text-navy">
            {siteSettings.siteName}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors relative py-1",
                  isActive
                    ? "text-navy after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold"
                    : "text-navy/70 hover:text-navy"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-navy hover:text-gold-dark transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-navy rounded-lg border border-navy hover:bg-navy-light transition-colors"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-gray-200 hover:border-gold transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-navy text-gold flex items-center justify-center text-xs font-semibold overflow-hidden">
                  {user?.profilePictureUrl ? (
                    <img
                      src={resolveImageUrl(user.profilePictureUrl)}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getInitials(user?.fullName)
                  )}
                </div>
                <span className="text-sm font-medium text-navy">
                  {user?.firstName}
                </span>
              </button>

              {profileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1.5 z-20 animate-fadeIn">
                    <Link
                      to={user?.role === ROLES.ADMIN ? "/admin" : "/dashboard"}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-navy hover:bg-soft"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-navy hover:bg-soft"
                    >
                      <User size={16} />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut size={16} />
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-navy"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-navy py-2"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-navy border border-navy rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-navy rounded-lg"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={user?.role === ROLES.ADMIN ? "/admin" : "/dashboard"}
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-navy border border-navy rounded-lg"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center px-4 py-2.5 text-sm font-semibold text-red-600 border border-red-200 rounded-lg"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}