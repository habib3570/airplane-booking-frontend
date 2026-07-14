import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Plane, Globe, Mail, ArrowLeft, MapPin } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { getAirlineById } from "../../api/airlineApi";
import { getErrorMessage } from "../../utils/helpers";

export default function AirlineDetails() {
  const { id } = useParams();
  const [airline, setAirline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAirline() {
      setLoading(true);
      try {
        const data = await getAirlineById(id);
        setAirline(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    fetchAirline();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size={36} className="text-navy" />
      </div>
    );
  }

  if (error || !airline) {
    return (
      <div className="container-app py-16 text-center">
        <p className="text-muted text-sm mb-4">
          {error || "Airline not found."}
        </p>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-soft min-h-screen">
      {/* Hero banner */}
      <section className="bg-navy py-14 sm:py-16">
        <div className="container-app">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-gold text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden">
              {airline.logoUrl ? (
                <img
                  src={airline.logoUrl}
                  alt={airline.name}
                  className="w-full h-full object-contain p-3"
                />
              ) : (
                <Plane className="text-navy" size={40} />
              )}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {airline.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <span className="inline-flex items-center gap-1.5 bg-gold/15 text-gold text-xs font-semibold px-3 py-1 rounded-full">
                  <MapPin size={12} />
                  {airline.country}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  IATA: {airline.iataCode}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-12 sm:py-16">
        <div className="container-app max-w-2xl">
          <Card>
            <h2 className="text-lg font-heading font-semibold text-navy mb-5">
              Airline Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0">
                  <Plane className="text-navy" size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted">Airline Name</p>
                  <p className="text-sm font-medium text-navy">{airline.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0">
                  <Globe className="text-navy" size={18} />
                </div>
                <div>
                  <p className="text-xs text-muted">Country</p>
                  <p className="text-sm font-medium text-navy">{airline.country}</p>
                </div>
              </div>

              {airline.contactEmail && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-navy" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Contact Email</p>
                    <p className="text-sm font-medium text-navy">
                      {airline.contactEmail}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="text-center mt-8">
            <Link to="/search">
              <Button variant="primary">Search Flights with {airline.name}</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}