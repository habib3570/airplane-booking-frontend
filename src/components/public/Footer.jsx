import { Link } from "react-router-dom";
import { Plane, MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const footerLinks = {
  company: [
    { label: "About Us", to: "/about" },
    { label: "Careers", to: "/careers" },
    { label: "Contact Us", to: "/contact" },
    { label: "Blog", to: "/blog" },
  ],
  support: [
    { label: "Help Center", to: "/faq" },
    { label: "FAQ", to: "/faq" },
    { label: "Booking Guide", to: "/how-it-works" },
    { label: "Refund Policy", to: "/refund-policy" },
  ],
  legal: [
    { label: "Terms & Conditions", to: "/terms" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Cookie Policy", to: "/cookies" },
  ],
};

const socials = [
  { icon: FaFacebook, href: "#" },
  { icon: FaTwitter, href: "#" },
  { icon: FaInstagram, href: "#" },
  { icon: FaYoutube, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-navy pt-14 pb-6">
      <div className="container-app">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center">
                <Plane className="text-navy" size={18} />
              </div>
              <span className="text-lg font-heading font-bold text-white">
                SkyBook
              </span>
            </Link>
            <p className="text-white/60 text-sm mb-5 max-w-xs leading-relaxed">
              Your trusted partner for flight bookings. Safe, simple, and
              affordable travel for everyone.
            </p>
            <div className="space-y-2 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-gold flex-shrink-0" />
                <span>Gulshan Avenue, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-gold flex-shrink-0" />
                <span>+880 1700-000000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-gold flex-shrink-0" />
                <span>support@skybook.com</span>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-4 text-sm">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-4 text-sm">
              Support
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-4 text-sm">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
  <p className="text-white/40 text-xs text-center sm:text-left">
    © {new Date().getFullYear()} SkyBook. All rights reserved.
  </p>
  
</div>
      </div>
    </footer>
  );
}