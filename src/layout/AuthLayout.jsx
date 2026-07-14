import { Link } from "react-router-dom";
import { Plane, ShieldCheck, Star, Headphones } from "lucide-react";

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy relative overflow-hidden flex-col justify-between p-12">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <Link to="/" className="relative flex items-center gap-2 text-white z-10">
          <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
            <Plane className="text-navy" size={20} />
          </div>
          <span className="text-xl font-heading font-bold">SkyBook</span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-3xl font-heading font-bold text-white mb-4 leading-snug">
            Fly with confidence,
            <br />
            <span className="text-gold">book with trust</span>
          </h2>
          <p className="text-white/70 mb-8">
            Thousands of routes, top airlines, and secure booking — all in one place.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white/90">
              <ShieldCheck className="text-gold" size={20} />
              <span className="text-sm">100% safe and secure booking</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Star className="text-gold" size={20} />
              <span className="text-sm">50,000+ happy travelers</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Headphones className="text-gold" size={20} />
              <span className="text-sm">24/7 customer support</span>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-white/40 text-xs">
          © {new Date().getFullYear()} SkyBook. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg bg-navy flex items-center justify-center">
              <Plane className="text-gold" size={18} />
            </div>
            <span className="text-lg font-heading font-bold text-navy">
              SkyBook
            </span>
          </Link>

          <h1 className="text-2xl font-heading font-bold text-navy mb-1">
            {title}
          </h1>
          {subtitle && <p className="text-muted text-sm mb-6">{subtitle}</p>}

          {children}
        </div>
      </div>
    </div>
  );
}