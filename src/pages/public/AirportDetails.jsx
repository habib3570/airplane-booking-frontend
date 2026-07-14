import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MapPin, Globe, Clock, ArrowLeft, Plane, Navigation } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { getAirportByCode } from "../../api/airportApi";
import { getErrorMessage } from "../../utils/helpers";

const cityImages = {
  Dhaka: "https://images.unsplash.com/photo-1583225214464-9296029427aa?w=1200&q=80",
  "Cox's Bazar": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80",
  "Kuala Lumpur": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&q=80",
  Dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
  Bangkok: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200&q=80",
  Singapore: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80",
  Amsterdam: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1200&q=80",
  Atlanta: "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=1200&q=80",
  Mumbai: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=1200&q=80",
  Boston: "https://images.unsplash.com/photo-1572364902718-0091b1e9c4dc?w=1200&q=80",
  Paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
  "Cape Town": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80",
  "New Delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80",
  Denver: "https://images.unsplash.com/photo-1546156929-a4c0ac411f47?w=1200&q=80",
  London: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80",
  Tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80",
  Istanbul: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80",
  "New York": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80",
  Sydney: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80",
};

const fallbackPool = [
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80",
  "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1200&q=80",
];

function getFallbackImage(seed = 0) {
  return fallbackPool[seed % fallbackPool.length];
}

export default function AirportDetails() {
  const { iataCode } = useParams();
  const navigate = useNavigate();
  const [airport, setAirport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAirport() {
      setLoading(true);
      try {
        const data = await getAirportByCode(iataCode);
        setAirport(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    fetchAirport();
  }, [iataCode]);

  function handleImageError(e) {
    e.target.onerror = null;
    e.target.src = getFallbackImage(1);
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size={36} className="text-navy" />
      </div>
    );
  }

  if (error || !airport) {
    return (
      <div className="container-app py-16 text-center">
        <p className="text-muted text-sm mb-4">
          {error || "Destination not found."}
        </p>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const image = cityImages[airport.city] || getFallbackImage(0);

  return (
    <div className="bg-soft min-h-screen">
      {/* Hero image */}
      <section className="relative h-72 sm:h-96">
        <img
          src={image}
          alt={airport.city}
          onError={handleImageError}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />
        <div className="container-app relative h-full flex flex-col justify-between py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-gold text-sm w-fit transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div>
            <span className="inline-flex items-center gap-1.5 bg-gold/15 text-gold text-xs font-semibold px-3 py-1 rounded-full mb-3">
              <MapPin size={12} />
              {airport.iataCode}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              {airport.city}
            </h1>
            <p className="text-white/70 text-sm sm:text-base">
              {airport.country}
            </p>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-12 sm:py-16">
        <div className="container-app max-w-2xl">
          <Card>
            <h2 className="text-lg font-heading font-semibold text-navy mb-5">
              Airport Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0">
                  <Plane className="text-navy" size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted">Airport Name</p>
                  <p className="text-sm font-medium text-navy">{airport.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0">
                  <Navigation className="text-navy" size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted">IATA / ICAO Code</p>
                  <p className="text-sm font-medium text-navy">
                    {airport.iataCode} / {airport.icaoCode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0">
                  <Globe className="text-navy" size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted">Location</p>
                  <p className="text-sm font-medium text-navy">
                    {airport.city}, {airport.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0">
                  <Clock className="text-navy" size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted">Time Zone</p>
                  <p className="text-sm font-medium text-navy">
                    {airport.timeZone}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="text-center mt-8">
            <Button
              variant="primary"
              onClick={() =>
                navigate(`/search?destination=${airport.iataCode}`)
              }
            >
              Search Flights to {airport.city}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}