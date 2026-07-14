import { ShieldCheck, Lock, BadgeCheck, Headphones } from "lucide-react";

const signals = [
  {
    icon: Lock,
    label: "Secure Payment",
    desc: "Your transactions are verified and protected",
  },
  {
    icon: ShieldCheck,
    label: "Verified Airlines",
    desc: "We only partner with trusted, licensed carriers",
  },
  {
    icon: BadgeCheck,
    label: "Best Price Guarantee",
    desc: "Compare fares and get the best available deal",
  },
  {
    icon: Headphones,
    label: "24/7 Support",
    desc: "Our team is always here to help you",
  },
];

export default function TrustSignals() {
  return (
    <section className="bg-white pt-14 sm:pt-16 pb-10">
      <div className="container-app">
        <p className="text-center text-xs font-semibold text-gold-dark tracking-wide uppercase mb-6">
          Why Travelers Trust SkyBook
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {signals.map((item) => (
            <div
              key={item.label}
              className="group flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-soft cursor-default transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-gold/40 hover:bg-white"
            >
              <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-gold group-hover:text-navy">
                <item.icon className="text-navy group-hover:text-navy" size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-navy leading-tight mb-0.5">
                  {item.label}
                </p>
                <p className="text-[11px] text-muted leading-snug hidden sm:block">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}