import { ShieldCheck, Clock, Wallet, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Best Price Guarantee",
    desc: "We compare prices across airlines so you always get the best deal.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    desc: "Your data and payments are protected with industry-standard security.",
  },
  {
    icon: Clock,
    title: "Instant Confirmation",
    desc: "Get your e-ticket and QR code instantly after payment confirmation.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    desc: "Our support team is available around the clock to help you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-soft py-16 sm:py-24 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(212,175,55,0.08), transparent 45%), radial-gradient(circle at 10% 80%, rgba(10,38,71,0.05), transparent 45%)",
        }}
      />
      <div className="container-app relative">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-gold font-semibold text-xs tracking-wide uppercase">
            Why SkyBook
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mt-2">
            Why Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group text-center px-5 py-8 rounded-xl2 bg-white border border-transparent shadow-card cursor-default transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl hover:border-gold/30"
            >
              <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center mx-auto mb-4 transition-colors duration-200 group-hover:bg-gold">
                <f.icon
                  className="text-gold transition-colors duration-200 group-hover:text-navy"
                  size={26}
                />
              </div>
              <h3 className="font-heading font-semibold text-navy mb-2">
                {f.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}