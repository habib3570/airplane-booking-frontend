import { Star, Quote } from "lucide-react";

// NOTE: No Reviews API endpoint exists in the provided spec.
// Replace this static array with an API call once a /reviews endpoint is available.
const reviews = [
  {
    id: 1,
    name: "Nusrat Jahan",
    role: "Frequent Flyer",
    rating: 5,
    text: "Booking was incredibly smooth and the QR ticket system made check-in so fast. Highly recommend SkyBook!",
  },
  {
    id: 2,
    name: "Tanvir Ahmed",
    role: "Business Traveler",
    rating: 5,
    text: "Great prices and excellent customer support. I book all my business trips through SkyBook now.",
  },
  {
    id: 3,
    name: "Fahmida Akter",
    role: "Family Traveler",
    rating: 4,
    text: "Easy to use platform with clear pricing. The manual payment option was very convenient for us.",
  },
];

export default function Reviews() {
  return (
    <section className="bg-soft py-14 sm:py-20">
      <div className="container-app">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-gold font-semibold text-xs tracking-wide uppercase">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mt-2">
            What Our Travelers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-xl2 p-6 shadow-card relative cursor-default transition-all duration-200 hover:-translate-y-1 hover:shadow-lg border border-transparent hover:border-gold/30"
            >
              <Quote className="text-gold/30 absolute top-5 right-5" size={32} />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < r.rating
                        ? "text-gold fill-gold"
                        : "text-gray-200 fill-gray-200"
                    }
                  />
                ))}
              </div>
              <p className="text-navy text-sm leading-relaxed mb-5">
                "{r.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy text-gold flex items-center justify-center text-xs font-semibold">
                  {r.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">{r.name}</p>
                  <p className="text-xs text-muted">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}