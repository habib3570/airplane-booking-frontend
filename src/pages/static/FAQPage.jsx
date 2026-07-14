import { useState } from "react";
import { ChevronDown, Search, HelpCircle } from "lucide-react";
import PageHero from "../../components/public/PageHero";
import Input from "../../components/ui/Input";
import { cn } from "../../utils/helpers";

const faqCategories = [
  {
    category: "Booking",
    items: [
      {
        q: "How do I book a flight?",
        a: "Search for your route on the homepage, select a flight, enter passenger details, and complete the manual payment by providing your account number and transaction ID.",
      },
      {
        q: "Can I book for multiple passengers?",
        a: "Yes, you can add multiple passengers (adults, children, infants) during the search and booking process.",
      },
      {
        q: "Do I need a passport to book a flight?",
        a: "Passport information is required for international flights. You can add or update your passport details in your profile.",
      },
    ],
  },
  {
    category: "Payment",
    items: [
      {
        q: "What payment methods are supported?",
        a: "We currently support manual payment via bKash and SPay. You'll transfer the amount to our provided merchant number and submit your transaction ID for verification.",
      },
      {
        q: "How long does payment confirmation take?",
        a: "Once you submit your transaction ID and payment number, our system verifies it and confirms your booking, generating your ticket immediately after verification.",
      },
      {
        q: "What if my payment isn't confirmed?",
        a: "If your booking remains in a pending state for an extended period, please contact our support team with your booking reference and transaction ID.",
      },
    ],
  },
  {
    category: "Tickets & Check-in",
    items: [
      {
        q: "Can I download my ticket?",
        a: "Yes, once your booking is confirmed, you can download your ticket as a PDF from your profile's Tickets section.",
      },
      {
        q: "How does the QR code work?",
        a: "Each confirmed ticket has a unique QR code linking to a verification page. Scanning it displays your booking and passenger details for quick verification at the airport.",
      },
      {
        q: "What if I lose my ticket?",
        a: "You can always re-download your ticket from your account under My Tickets, no need to worry about losing a physical copy.",
      },
    ],
  },
  {
    category: "Cancellations",
    items: [
      {
        q: "Can I cancel my booking?",
        a: "Yes, cancellation eligibility depends on the airline's fare rules. You can request cancellation from My Bookings in your dashboard.",
      },
      {
        q: "How do refunds work?",
        a: "Approved refunds are processed back to your payment account within 7-14 business days. See our Refund Policy for full details.",
      },
    ],
  },
];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [openKey, setOpenKey] = useState(null);

  const filteredCategories = faqCategories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="bg-white">
      <PageHero icon={HelpCircle} title="How Can We Help?" />

      {/* Search bar sits below hero, overlapping slightly for visual continuity */}
      <div className="container-app relative -mt-6 z-10 mb-4">
        <div className="max-w-md mx-auto">
          <Input
            icon={Search}
            placeholder="Search frequently asked questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white shadow-lg"
          />
        </div>
      </div>

      <section className="py-10 sm:py-16">
        <div className="container-app max-w-3xl">
          {filteredCategories.length === 0 ? (
            <p className="text-center text-muted text-sm py-10">
              No questions found matching your search.
            </p>
          ) : (
            filteredCategories.map((cat) => (
              <div key={cat.category} className="mb-10">
                <h2 className="text-lg font-heading font-semibold text-navy mb-4">
                  {cat.category}
                </h2>
                <div className="space-y-3">
                  {cat.items.map((item) => {
                    const key = `${cat.category}-${item.q}`;
                    const isOpen = openKey === key;
                    return (
                      <div
                        key={key}
                        className={cn(
                          "border rounded-xl overflow-hidden transition-all duration-200",
                          isOpen
                            ? "bg-soft border-gold/30 shadow-sm"
                            : "bg-soft border-gray-100 hover:border-gold/30 hover:shadow-sm hover:-translate-y-0.5"
                        )}
                      >
                        <button
                          onClick={() => setOpenKey(isOpen ? null : key)}
                          className="w-full flex items-center justify-between px-5 py-4 text-left group"
                        >
                          <span className="font-medium text-navy text-sm pr-4 group-hover:text-gold-dark transition-colors duration-200">
                            {item.q}
                          </span>
                          <ChevronDown
                            size={18}
                            className={cn(
                              "text-navy flex-shrink-0 transition-transform duration-200",
                              isOpen && "rotate-180"
                            )}
                          />
                        </button>
                        <div
                          className={cn(
                            "grid transition-all duration-200",
                            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          )}
                        >
                          <div className="overflow-hidden">
                            <p className="px-5 pb-4 text-muted text-sm leading-relaxed">
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}