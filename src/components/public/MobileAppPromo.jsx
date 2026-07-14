import { Apple, Smartphone, Star } from "lucide-react";

export default function MobileAppPromo() {
  return (
    <section className="bg-white py-14 sm:py-20 overflow-hidden">
      <div className="container-app">
        <div className="bg-navy rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-10 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="flex-1 relative z-10 text-center lg:text-left">
            <span className="inline-flex items-center gap-1 bg-gold/15 text-gold text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <Star size={12} fill="currentColor" />
              4.8 App Rating
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Book Faster with Our Mobile App
            </h2>
            <p className="text-white/70 text-sm mb-6 max-w-md mx-auto lg:mx-0">
              Get exclusive app-only deals, real-time flight updates, and
              manage your bookings on the go.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <button className="flex items-center gap-2 bg-white text-navy px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gold transition-colors">
                <Apple size={20} />
                App Store
              </button>
              <button className="flex items-center gap-2 bg-white text-navy px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-gold transition-colors">
                <Smartphone size={20} />
                Google Play
              </button>
            </div>
          </div>
          <div className="flex-shrink-0 relative z-10">
            <div className="w-48 h-64 sm:w-56 sm:h-72 bg-white/10 rounded-3xl border border-white/20 flex items-center justify-center backdrop-blur-sm">
              <Smartphone className="text-gold" size={64} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}