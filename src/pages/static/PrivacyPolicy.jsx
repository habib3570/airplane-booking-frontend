import { ShieldCheck } from "lucide-react";
import PageHero from "../../components/public/PageHero";

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect personal information you provide when creating an account or making a booking, including your name, email, phone number, date of birth, nationality, passport details, and payment transaction information.",
  },
  {
    title: "2. How We Use Your Information",
    body: "Your information is used to process bookings, generate e-tickets, verify payments, communicate booking updates, and improve our services. We do not sell your personal information to third parties.",
  },
  {
    title: "3. Payment Information",
    body: "For manual payment verification, we collect the transaction ID and payment account number you provide. This information is used solely for the purpose of verifying and confirming your booking payment.",
  },
  {
    title: "4. Data Sharing",
    body: "We may share necessary booking information (such as passenger name and travel dates) with airline partners to fulfill your booking. We do not share your data with third parties for marketing purposes without consent.",
  },
  {
    title: "5. Data Security",
    body: "We implement industry-standard security measures, including encrypted authentication tokens and secure password storage, to protect your personal information from unauthorized access.",
  },
  {
    title: "6. Cookies",
    body: "Our website may use cookies and local storage to maintain your login session and improve your browsing experience.",
  },
  {
    title: "7. Your Rights",
    body: "You have the right to access, update, or request deletion of your personal information at any time through your profile settings or by contacting our support team.",
  },
  {
    title: "8. Data Retention",
    body: "We retain your account and booking information for as long as necessary to provide our services and comply with legal obligations.",
  },
  {
    title: "9. Changes to This Policy",
    body: "We may update this Privacy Policy periodically. Continued use of our services after changes constitutes acceptance of the revised policy.",
  },
  {
    title: "10. Contact Us",
    body: "For privacy-related questions or requests, please contact us at support@skybook.com.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      <PageHero
        icon={ShieldCheck}
        title="Privacy Policy"
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