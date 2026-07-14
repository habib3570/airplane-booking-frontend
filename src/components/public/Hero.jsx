import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftRight, Search, MapPin, Calendar, Plus, X } from "lucide-react";
import Select from "../ui/Select";
import Input from "../ui/Input";
import Button from "../ui/Button";
import PassengerSelector from "../booking/PassengerSelector";
import { getAirports } from "../../api/airportApi";
import { TRIP_TYPE } from "../../utils/enums";

const TRIP_TYPES = [
  { value: TRIP_TYPE.ONE_WAY, label: "One Way" },
  { value: TRIP_TYPE.ROUND_TRIP, label: "Round Trip" },
  { value: TRIP_TYPE.MULTI_CITY, label: "Multi-City" },
];

function emptyLeg() {
  return { origin: "", destination: "", departureDate: "" };
}

export default function Hero() {
  const navigate = useNavigate();
  const [airports, setAirports] = useState([]);
  const [loadingAirports, setLoadingAirports] = useState(true);

  const [tripType, setTripType] = useState(TRIP_TYPE.ONE_WAY);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [legs, setLegs] = useState([emptyLeg(), emptyLeg()]);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  useEffect(() => {
    async function fetchAirports() {
      try {
        const data = await getAirports({ PageSize: 100 });
        setAirports(data?.items || []);
      } catch (error) {
        setAirports([]);
      } finally {
        setLoadingAirports(false);
      }
    }
    fetchAirports();
  }, []);

  const airportOptions = airports.map((a) => ({
    value: a.iataCode,
    label: `${a.city} (${a.iataCode}) — ${a.name}`,
  }));

  function swapAirports() {
    setOrigin(destination);
    setDestination(origin);
  }

  function updateLeg(index, field, value) {
    setLegs((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function addLeg() {
    if (legs.length >= 5) return;
    setLegs((prev) => [...prev, emptyLeg()]);
  }

  function removeLeg(index) {
    if (legs.length <= 2) return;
    setLegs((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSearch(e) {
    e.preventDefault();
    const passengerParams = {
      adults: String(passengers.adults),
      children: String(passengers.children),
      infants: String(passengers.infants),
    };

    if (tripType === TRIP_TYPE.MULTI_CITY) {
      const params = new URLSearchParams({ tripType: TRIP_TYPE.MULTI_CITY });
      navigate(`/search?${params.toString()}`, {
        state: { legs, passengers },
      });
      return;
    }

    const params = new URLSearchParams({
      tripType,
      origin,
      destination,
      departureDate,
      ...passengerParams,
    });
    if (tripType === TRIP_TYPE.ROUND_TRIP && returnDate) {
      params.set("returnDate", returnDate);
    }
    navigate(`/search?${params.toString()}`);
  }

  return (
    <section className="relative bg-navy overflow-hidden pb-16 sm:pb-20">
      {/* Layered background: radial glow + soft dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,175,55,0.16), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 10%, rgba(20,66,114,0.6), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 15%, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Signature element: dashed flight path arcing across the hero */}
      <svg
        className="absolute inset-x-0 top-0 w-full h-full pointer-events-none opacity-40"
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M -50 380 C 250 280, 550 460, 850 200 S 1150 40, 1300 60"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
        <circle cx="850" cy="200" r="3.5" fill="#D4AF37" />
      </svg>

      <div className="container-app relative pt-14 sm:pt-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/15 text-gold text-xs font-semibold tracking-wide mb-4 border border-gold/20">
            #1 TRUSTED FLIGHT BOOKING PLATFORM
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white leading-tight mb-4">
            Fly Anywhere, <span className="text-gold">Book with Ease</span>
          </h1>
          <p className="text-white/70 text-sm sm:text-base">
            Compare fares, choose your favorite airline, and book your next
            journey in minutes.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="bg-white rounded-xl2 shadow-2xl ring-1 ring-black/5 p-5 sm:p-6 max-w-5xl mx-auto relative z-10"
        >
          <div className="flex gap-2 mb-4 flex-wrap">
            {TRIP_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTripType(t.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  tripType === t.value
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-navy border-gray-200 hover:border-navy"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* One Way / Round Trip */}
          {tripType !== TRIP_TYPE.MULTI_CITY && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              <div className="md:col-span-3">
                <Select
                  label="From"
                  icon={MapPin}
                  placeholder={loadingAirports ? "Loading..." : "Select origin"}
                  options={airportOptions}
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                />
              </div>

              <div className="md:col-span-1 flex justify-center pb-2.5">
                <button
                  type="button"
                  onClick={swapAirports}
                  className="w-9 h-9 rounded-full bg-soft border border-gray-200 flex items-center justify-center text-navy hover:bg-gold hover:border-gold transition-colors flex-shrink-0"
                  aria-label="Swap origin and destination"
                >
                  <ArrowLeftRight size={16} />
                </button>
              </div>

              <div className="md:col-span-3">
                <Select
                  label="To"
                  icon={MapPin}
                  placeholder={loadingAirports ? "Loading..." : "Select destination"}
                  options={airportOptions}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>

              <div className={tripType === TRIP_TYPE.ROUND_TRIP ? "md:col-span-2" : "md:col-span-3"}>
                <Input
                  label="Departure"
                  type="date"
                  icon={Calendar}
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>

              {tripType === TRIP_TYPE.ROUND_TRIP && (
                <div className="md:col-span-2">
                  <Input
                    label="Return"
                    type="date"
                    icon={Calendar}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={departureDate || new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              )}

              <div className="md:col-span-3">
                <PassengerSelector value={passengers} onChange={setPassengers} />
              </div>

              <div className="md:col-span-12 pt-1">
                <Button type="submit" variant="primary" size="lg" icon={Search} className="w-full">
                  Search Flights
                </Button>
              </div>
            </div>
          )}

          {/* Multi-City */}
          {tripType === TRIP_TYPE.MULTI_CITY && (
            <div className="space-y-3">
              {legs.map((leg, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end p-3 rounded-lg bg-soft"
                >
                  <div className="md:col-span-1 flex md:justify-center pb-2.5">
                    <span className="w-7 h-7 rounded-full bg-navy text-gold text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                  </div>
                  <div className="md:col-span-3">
                    <Select
                      label="From"
                      icon={MapPin}
                      placeholder="Origin"
                      options={airportOptions}
                      value={leg.origin}
                      onChange={(e) => updateLeg(index, "origin", e.target.value)}
                      required
                    />
                  </div>
                  <div className="md:col-span-3">
                    <Select
                      label="To"
                      icon={MapPin}
                      placeholder="Destination"
                      options={airportOptions}
                      value={leg.destination}
                      onChange={(e) => updateLeg(index, "destination", e.target.value)}
                      required
                    />
                  </div>
                  <div className="md:col-span-3">
                    <Input
                      label="Date"
                      type="date"
                      icon={Calendar}
                      value={leg.departureDate}
                      onChange={(e) => updateLeg(index, "departureDate", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end pb-1">
                    {legs.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeLeg(index)}
                        className="w-9 h-9 rounded-lg border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors"
                        aria-label="Remove flight"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addLeg}
                disabled={legs.length >= 5}
                className="flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-gold-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Plus size={16} />
                Add Another Flight
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end pt-2">
                <div className="md:col-span-4">
                  <PassengerSelector value={passengers} onChange={setPassengers} />
                </div>
                <div className="md:col-span-8">
                  <Button type="submit" variant="primary" size="lg" icon={Search} className="w-full">
                    Search Flights
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}