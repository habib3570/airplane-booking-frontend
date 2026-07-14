import { Search, CreditCard, QrCode, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "1",
    title: "Search Flights",
    desc: "Enter your route and travel date to find the best available flights.",
  },
  {
    icon: CreditCard,
    step: "2",
    title: "Book & Pay",
    desc: "Select your flight, enter passenger details, and complete payment.",
  },
  {
    icon: QrCode,
    step: "3",
    title: "Get Your E-Ticket",
    desc: "Receive your ticket instantly with a QR code for quick verification.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-navy py-16 sm:py-24 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="container-app relative">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-gold font-semibold text-xs tracking-wide uppercase">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 relative">
          {steps.map((s, i) => (
            <div key={s.step} className="relative flex flex-col items-center text-center">
              {/* Connector line to next step (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-8 left-[calc(50%+40px)] right-[calc(-50%+40px)] border-t-2 border-dashed border-white/15" />
              )}

              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center relative z-10 shadow-lg shadow-gold/20">
                  <s.icon className="text-navy" size={26} />
                </div>
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-navy border-2 border-gold text-gold text-xs font-bold flex items-center justify-center z-20">
                  {s.step}
                </span>
              </div>

              <h3 className="font-heading font-semibold text-white mb-2">
                {s.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
                {s.desc}
              </p>

              {i < steps.length - 1 && (
                <ArrowRight
                  className="sm:hidden text-gold/40 mt-6 rotate-90"
                  size={20}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}