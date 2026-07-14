import { Plane, Users, Globe, Award, ShieldCheck, Heart, TrendingUp, MapPin, Calendar } from "lucide-react";
import PageHero from "../../components/public/PageHero";
import Card from "../../components/ui/Card";

const stats = [
  { icon: Users, label: "Happy Travelers", value: "50,000+" },
  { icon: Plane, label: "Airline Partners", value: "25+" },
  { icon: MapPin, label: "Destinations", value: "120+" },
  { icon: Calendar, label: "Years of Service", value: "8+" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    desc: "Every booking is protected with secure payment verification and reliable customer support.",
  },
  {
    icon: Heart,
    title: "Customer First",
    desc: "We design every part of our platform around what makes travel planning easier for you.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Partnering with airlines around the world to bring you more choices and better fares.",
  },
  {
    icon: Award,
    title: "Quality Service",
    desc: "From search to boarding, we aim to make every step of your journey smooth and reliable.",
  },
];

export default function About() {
  return (
    <div>
      <PageHero
        icon={Plane}
        title="About SkyBook"
        subtitle="We're on a mission to make flight booking simple, transparent, and accessible for everyone — connecting travelers with the best airlines at the best prices."
      />

      {/* Stats */}
      <section className="bg-white py-14 -mt-6 relative z-10">
        <div className="container-app">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="text-center cursor-default transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-11 h-11 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="text-gold-dark" size={20} />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-navy mb-1">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-muted">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-soft py-14 sm:py-20">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <span className="text-gold font-semibold text-xs tracking-wide uppercase">
                Our Journey
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mt-2 mb-5">
                Our Story
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed mb-4">
                SkyBook was founded with a simple idea: booking a flight
                shouldn't be complicated or stressful. What started as a
                small platform connecting local travelers with regional
                airlines has grown into a trusted booking service used by
                thousands of people every month.
              </p>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Today, we work with airline partners to offer competitive
                fares, transparent pricing, and a booking experience that
                puts the traveler first — from search to secure payment to
                instant e-tickets with QR verification.
              </p>
            </div>

            <div className="lg:col-span-2">
              <div className="relative bg-navy rounded-2xl p-8 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 30%, white 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <div className="relative flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="text-gold" size={18} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        Growing Every Year
                      </p>
                      <p className="text-white/60 text-xs">
                        Trusted by more travelers each season
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="text-gold" size={18} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        Verified Partners
                      </p>
                      <p className="text-white/60 text-xs">
                        Only trusted, licensed airlines
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Globe className="text-gold" size={18} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        Global Coverage
                      </p>
                      <p className="text-white/60 text-xs">
                        120+ destinations and counting
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container-app">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-gold font-semibold text-xs tracking-wide uppercase">
              Our Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mt-2">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="group text-center px-5 py-8 rounded-xl2 bg-soft border border-transparent cursor-default transition-all duration-200 hover:-translate-y-1.5 hover:shadow-card hover:border-gold/30 hover:bg-white"
              >
                <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center mx-auto mb-4 transition-colors duration-200 group-hover:bg-gold">
                  <v.icon
                    className="text-gold transition-colors duration-200 group-hover:text-navy"
                    size={24}
                  />
                </div>
                <h3 className="font-heading font-semibold text-navy mb-2">
                  {v.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="relative bg-navy py-14 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="container-app text-center relative">
          <Users className="text-gold mx-auto mb-4" size={32} />
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Join Thousands of Happy Travelers
          </h2>
          <p className="text-white/60 text-sm mb-6 max-w-xl mx-auto">
            Start planning your next journey with a platform built around
            trust, simplicity, and great fares.
          </p>
        </div>
      </section>
    </div>
  );
}