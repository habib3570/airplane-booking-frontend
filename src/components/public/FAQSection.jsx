import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/helpers";

const faqs = [
  {
    q: "How do I book a flight?",
    a: "Search for your route on the homepage, select a flight, enter passenger details, and complete the manual payment by providing your account number and transaction ID.",
  },
  {
    q: "What payment methods are supported?",
    a: "We currently support manual payment. You'll transfer the amount to our provided account and submit your transaction ID for confirmation.",
  },
  {
    q: "How long does payment confirmation take?",
    a: "Once you submit your transaction ID, our team verifies it and confirms your booking. You'll receive your e-ticket and QR code immediately after confirmation.",
  },
  {
    q: "Can I download my ticket?",
    a: "Yes, once your booking is confirmed, you can download your ticket as a PDF from your profile's bookings section.",
  },
  {
    q: "How does the QR code work?",
    a: "Each confirmed ticket has a unique QR code. Scanning it displays your booking details for quick and secure verification at the airport.",
  },
  {
    q: "Can I cancel my booking?",
    a: "Cancellation policies vary by airline and fare type. Please check your booking details or contact our support team for assistance.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="container-app max-w-3xl">
        <div className="text-center mb-10">
          <span className="text-gold font-semibold text-xs tracking-wide uppercase">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="border border-gray-100 rounded-xl overflow-hidden bg-soft"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-medium text-navy text-sm sm:text-base pr-4">
                    {faq.q}
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
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}