import { FileText } from "lucide-react";
import PageHero from "../../components/public/PageHero";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using SkyBook's website and booking services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.",
  },
  {
    title: "2. Booking & Payment",
    body: "All flight bookings made through SkyBook are subject to availability and confirmation from the respective airline. Payments are currently processed manually — you are required to complete payment via the specified method and submit a valid transaction ID for verification. Your booking is only confirmed once payment has been verified by our team.",
  },
  {
    title: "3. Pricing",
    body: "Flight prices displayed on SkyBook are set by airline partners and may change without prior notice until a booking is confirmed and paid for. Prices shown are inclusive of applicable taxes and fees unless stated otherwise.",
  },
  {
    title: "4. Passenger Information",
    body: "You are responsible for ensuring all passenger details (name, date of birth, passport information) provided during booking are accurate and match official travel documents. SkyBook is not liable for issues arising from incorrect information provided by the user.",
  },
  {
    title: "5. E-Tickets & QR Verification",
    body: "Upon confirmed payment, an e-ticket with a unique QR code will be generated. This QR code may be scanned to verify booking authenticity. Passengers are responsible for keeping their ticket information secure.",
  },
  {
    title: "6. Cancellations & Refunds",
    body: "Cancellation and refund eligibility depends on the fare rules of the respective airline and the timing of the cancellation request. Please refer to our Refund Policy for detailed information.",
  },
  {
    title: "7. User Accounts",
    body: "You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your responsibility. Notify us immediately of any unauthorized use.",
  },
  {
    title: "8. Limitation of Liability",
    body: "SkyBook acts as a booking intermediary between passengers and airlines. We are not liable for flight delays, cancellations, schedule changes, or other actions taken by airline partners.",
  },
  {
    title: "9. Changes to Terms",
    body: "We reserve the right to update these Terms & Conditions at any time. Continued use of our services after changes constitutes acceptance of the revised terms.",
  },
  {
    title: "10. Contact",
    body: "For questions regarding these terms, please contact us at support@skybook.com.",
  },
];

export default function Terms() {
  return (
    <div className="bg-white">
      <PageHero
        icon={FileText}
        title="Terms & Conditions"
        meta="Last updated: July 2026"
      />

      <section className="py-12 sm:py-16">
        <div className="container-app max-w-3xl">
          <div className="bg-soft rounded-2xl p-2 sm:p-3 space-y-1">
            {sections.map((section) => (
              <div
                key={section.title}
                className="p-5 rounded-xl border border-transparent cursor-default transition-all duration-200 hover:bg-white hover:border-gold/20 hover:shadow-sm"
              >
                <h2 className="text-lg font-heading font-semibold text-navy mb-2">
                  {section.title}
                </h2>
                <p className="text-muted text-sm leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}