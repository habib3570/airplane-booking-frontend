import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { getAirports } from "../../api/airportApi";
import Spinner from "../ui/Spinner";

const cityImages = {
  Dhaka: "https://images.unsplash.com/photo-1583225214464-9296029427aa?w=600&q=80",
  "Cox's Bazar": "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80",
  "Kuala Lumpur": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80",
  Dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
  Bangkok: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80",
  Singapore: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80",
  Amsterdam: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=600&q=80",
  Atlanta: "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=600&q=80",
  Mumbai: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80",
  Boston: "https://images.unsplash.com/photo-1572364902718-0091b1e9c4dc?w=600&q=80",
  Paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
  "Cape Town": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
  "New Delhi": "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
  Denver: "https://images.unsplash.com/photo-1546156929-a4c0ac411f47?w=600&q=80",
  London: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
  Tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
  Istanbul: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
  "New York": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
  Sydney: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80",
};

// Fallback pool — used if a mapped image fails to load, or city has no mapping
const fallbackPool = [
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
  "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=600&q=80",
];

function getCityImage(city, index) {
  return cityImages[city] || fallbackPool[index % fallbackPool.length];
}

function getFallbackImage(index) {
  return fallbackPool[index % fallbackPool.length];
}

export default function PopularDestinations() {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchAirports() {
      try {
        const data = await getAirports({ PageSize: 8, PageNumber: 1 });
        setAirports(data?.items || []);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAirports();
  }, []);

  function handleImageError(e, index) {
    // Prevent infinite loop if fallback also fails
    e.target.onerror = null;
    e.target.src = getFallbackImage(index + 1);
  }

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="container-app">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-gold font-semibold text-xs tracking-wide uppercase">
            Explore
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mt-2 mb-2">
            Popular Destinations
          </h2>
          <p className="text-muted text-sm">
            Discover the most loved destinations by our travelers
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <Spinner size={32} className="text-navy" />
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-muted text-sm py-8">
            Couldn't load destinations right now. Please try again later.
          </p>
        )}

        {!loading && !error && airports.length === 0 && (
          <p className="text-center text-muted text-sm py-8">
            No destinations available yet.
          </p>
        )}

        {!loading && !error && airports.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {airports.map((airport, index) => (
              <Link
                key={airport.id}
                to={`/airports/${airport.iataCode}`}
                className="group relative rounded-xl2 overflow-hidden h-52 text-left shadow-card block"
              >
                <img
                  src={getCityImage(airport.city, index)}
                  alt={airport.city}
                  onError={(e) => handleImageError(e, index)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-1 text-gold text-xs font-semibold mb-1">
                    <MapPin size={12} />
                    {airport.iataCode}
                  </div>
                  <h3 className="text-white font-heading font-semibold text-base">
                    {airport.city}
                  </h3>
                  <p className="text-white/70 text-xs">{airport.country}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}