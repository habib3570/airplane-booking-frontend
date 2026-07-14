import Hero from "../components/public/Hero";
import TrustSignals from "../components/public/TrustSignals";
import PopularDestinations from "../components/public/PopularDestinations";
import WhyChooseUs from "../components/public/WhyChooseUs";
import HowItWorks from "../components/public/HowItWorks";
import AirlinePartners from "../components/public/AirlinePartners";
import Reviews from "../components/public/Reviews";
import FAQSection from "../components/public/FAQSection";
import Newsletter from "../components/public/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSignals />
      <PopularDestinations />
      <WhyChooseUs />
      <HowItWorks />
      <AirlinePartners />
      <Reviews />
      <FAQSection />
      <Newsletter />
    </>
  );
}