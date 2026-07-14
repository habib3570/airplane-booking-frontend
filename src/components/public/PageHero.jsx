export default function PageHero({ icon: Icon, title, subtitle, meta }) {
  return (
    <section className="relative bg-navy py-14 sm:py-16 overflow-hidden">
      {/* Signature glow + texture, consistent with the homepage hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(212,175,55,0.14), transparent 60%), radial-gradient(ellipse 50% 50% at 90% 100%, rgba(20,66,114,0.5), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 15%, white 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <svg
        className="absolute inset-x-0 top-0 w-full h-full pointer-events-none opacity-30"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M -50 240 C 250 160, 550 280, 850 120 S 1150 20, 1300 40"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
      </svg>

      <div className="container-app relative text-center">
        {Icon && (
          <div className="w-14 h-14 rounded-2xl bg-gold flex items-center justify-center mx-auto mb-5 shadow-lg shadow-gold/20">
            <Icon className="text-navy" size={24} />
          </div>
        )}
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
        {meta && <p className="text-white/50 text-xs mt-3">{meta}</p>}
      </div>
    </section>
  );
}