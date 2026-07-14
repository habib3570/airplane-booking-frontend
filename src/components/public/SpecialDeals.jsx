import { Tag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// NOTE: No Deals API endpoint exists in the provided spec.
// Replace this static array with an API call once a /deals endpoint is available.
const deals = [
  {
    id: 1,
    title: "Dhaka to Cox's Bazar",
    discount: "Up to 20% OFF",
    price: "৳3,499",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80",
  },
  {
    id: 2,
    title: "Dhaka to Kuala Lumpur",
    discount: "Up to 15% OFF",
    price: "৳18,999",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80",
  },
  {
    id: 3,
    title: "Dhaka to Dubai",
    discount: "Up to 12% OFF",
    price: "৳32,499",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
  },
];

export default function SpecialDeals() {
  return (
    <section id="deals" className="bg-soft py-14 sm:py-20">
      <div className="container-app">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="text-gold font-semibold text-xs tracking-wide uppercase">
              Limited Time
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mt-2">
              Special Deals
            </h2>
          </div>
          <Link
            to="/search"
            className="text-sm font-semibold text-navy hover:text-gold-dark flex items-center gap-1"
          >
            View all deals <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-xl2 overflow-hidden shadow-card hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="relative h-40">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Tag size={12} />
                  {deal.discount}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-navy mb-1">
                  {deal.title}
                </h3>
                <p className="text-muted text-xs mb-3">Starting from</p>
                <p className="text-xl font-bold text-navy">{deal.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}