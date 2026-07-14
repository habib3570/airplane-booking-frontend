import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAirlines } from "../../api/airlineApi";
import Spinner from "../ui/Spinner";

const gradients = [
  "from-[#0A2647] to-[#144272]",
  "from-[#B8942C] to-[#D4AF37]",
  "from-[#1e3a5f] to-[#2c5282]",
  "from-[#8B6914] to-[#B8942C]",
  "from-[#0A2647] to-[#2c5282]",
  "from-[#144272] to-[#D4AF37]",
];

function getGradient(name) {
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
}

function getInitial(name) {
  return name?.trim()?.[0]?.toUpperCase() || "?";
}

export default function AirlinePartners() {
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchAirlines() {
      try {
        const data = await getAirlines();
        setAirlines(Array.isArray(data) ? data : data?.items || []);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAirlines();
  }, []);

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="container-app">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-gold font-semibold text-xs tracking-wide uppercase">
            Our Partners
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mt-2">
            Airline Partners
          </h2>
          <p className="text-muted text-sm mt-2">
            We work with trusted airlines to bring you the best options —
            click a partner to see details
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-8">
            <Spinner size={28} className="text-navy" />
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-muted text-sm py-6">
            Couldn't load airline partners right now.
          </p>
        )}

        {!loading && !error && airlines.length === 0 && (
          <p className="text-center text-muted text-sm py-6">
            No airline partners available yet.
          </p>
        )}

        {!loading && !error && airlines.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {airlines.map((airline) => (
              <Link
                key={airline.id}
                to={`/airlines/${airline.id}`}
                className="group bg-white rounded-xl border border-gray-100 p-4 h-28 flex flex-col items-center justify-center gap-2.5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-gold/40"
                title={airline.name}
              >
                {airline.logoUrl ? (
                  <img
                    src={airline.logoUrl}
                    alt={airline.name}
                    className="max-h-9 max-w-[80%] object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${getGradient(
                      airline.name
                    )} flex items-center justify-center text-white font-heading font-bold text-sm shadow-sm transition-transform duration-200 group-hover:scale-110`}
                  >
                    {getInitial(airline.name)}
                  </div>
                )}
                <span className="text-[11px] text-muted text-center line-clamp-1 group-hover:text-navy transition-colors duration-200">
                  {airline.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}