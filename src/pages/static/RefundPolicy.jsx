import { AlertCircle, RotateCcw } from "lucide-react";
import PageHero from "../../components/public/PageHero";
import Card from "../../components/ui/Card";

const sections = [
  {
    title: "1. Refund Eligibility",
    body: "Refund eligibility depends on the fare type and cancellation policy of the airline you booked with. Some fares may be fully non-refundable, while others allow partial or full refunds within a specified window.",
  },
  {
    title: "2. Cancellation Requests",
    body: "To request a cancellation, go to My Bookings in your dashboard and submit a cancellation request with a reason. Our team will review the request based on the applicable airline policy.",
  },
  {
    title: "3. Refund Processing Time",
    body: "Approved refunds are typically processed within 7-14 business days. Since payments are handled manually, refunds will be issued back to the payment account number used during booking.",
  },
  {
    title: "4. Non-Refundable Situations",
    body: "Refunds will not be issued for no-shows, missed flights due to passenger error, or bookings cancelled after the airline's non-refundable deadline.",
  },
  {
    title: "5. Payment Verification Errors",
    body: "If a payment was verified in error or a duplicate transaction occurred, please contact our support team immediately with your booking reference and transaction ID for resolution.",
  },
  {
    title: "6. Contact for Refund Support",
    body: "For any refund-related queries, please reach out to support@skybook.com with your booking reference number.",
  },
];

export default function RefundPolicy() {
  return (
    <div className="bg-white">
      <PageHero
        icon={RotateCcw}
        title="Refund Policy"
        meta="Last updated: July 2026"
      />

      <section className="py-12 sm:py-16">
        <div className="container-app max-w-3xl">
          <Card className="mb-8 bg-yellow-50 border-yellow-200 flex items-start gap-3">
            <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-navy">
              Refund terms may vary by airline and fare class. Always check
              your specific booking's fare conditions before requesting a
              cancellation.
            </p>
          </Card>

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