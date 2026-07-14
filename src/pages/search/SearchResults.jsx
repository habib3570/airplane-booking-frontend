import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { SlidersHorizontal, ArrowUpDown, Plane } from "lucide-react";
import FlightCard from "../../components/booking/FlightCard";
import Select from "../../components/ui/Select";
import Spinner from "../../components/ui/Spinner";
import Card from "../../components/ui/Card";
import { searchOneWay, searchRoundTrip, searchMultiCity } from "../../api/searchApi";
import { SEAT_CLASS_OPTIONS, TRIP_TYPE } from "../../utils/enums";
import { getErrorMessage, formatCurrency } from "../../utils/helpers";

const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "duration-asc", label: "Duration: Shortest" },
];

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const tripType = searchParams.get("tripType") || TRIP_TYPE.ONE_WAY;
  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const departureDate = searchParams.get("departureDate") || "";
  const returnDate = searchParams.get("returnDate") || "";
  const adults = parseInt(searchParams.get("adults") || "1", 10);
  const children = parseInt(searchParams.get("children") || "0", 10);
  const infants = parseInt(searchParams.get("infants") || "0", 10);

  const multiCityLegs = location.state?.legs || [];
  const multiCityPassengers = location.state?.passengers;

  const [seatClass, setSeatClass] = useState("Economy");
  const [sortValue, setSortValue] = useState("price-asc");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalPassengers =
    tripType === TRIP_TYPE.MULTI_CITY
      ? (multiCityPassengers?.adults || 0) +
        (multiCityPassengers?.children || 0) +
        (multiCityPassengers?.infants || 0)
      : adults + children + infants;

  useEffect(() => {
    if (tripType === TRIP_TYPE.MULTI_CITY) {
      if (!multiCityLegs.length) {
        setError("Missing multi-city flight details. Please search again from the homepage.");
        setLoading(false);
        return;
      }
    } else if (!origin || !destination || !departureDate) {
      setError("Missing search criteria. Please search again from the homepage.");
      setLoading(false);
      return;
    }
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripType, origin, destination, departureDate, returnDate, seatClass, sortValue]);

  async function fetchResults() {
    setLoading(true);
    setError("");

    const [sortBy, sortDir] = sortValue.split("-");

    try {
      if (tripType === TRIP_TYPE.MULTI_CITY) {
        const payload = {
          legs: multiCityLegs.map((leg) => ({
            originIata: leg.origin,
            destinationIata: leg.destination,
            departureDate: leg.departureDate,
          })),
          passengers: multiCityPassengers || { adults: 1, children: 0, infants: 0 },
          seatClass,
        };
        const data = await searchMultiCity(payload);
        setResults(data || []);
      } else {
        const payload = {
          originIata: origin,
          destinationIata: destination,
          departureDate,
          returnDate: returnDate || null,
          passengers: { adults, children, infants },
          seatClass,
          maxStops: 2,
          sortBy: sortBy === "duration" ? "duration" : "price",
          sortDescending: sortDir === "desc",
        };

        if (tripType === TRIP_TYPE.ROUND_TRIP && returnDate) {
          const data = await searchRoundTrip(payload);
          setResults(data || []);
        } else {
          const data = await searchOneWay(payload);
          setResults(data || []);
        }
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectOneWay(flight) {
    navigate("/booking/passengers", {
      state: {
        tripType: TRIP_TYPE.ONE_WAY,
        segments: [{ flightId: flight.id, seatClass }],
        segmentsPreview: [flight],
        passengerCounts: { adults, children, infants },
      },
    });
  }

  function handleSelectRoundTrip(pair) {
    navigate("/booking/passengers", {
      state: {
        tripType: TRIP_TYPE.ROUND_TRIP,
        segments: [
          { flightId: pair.outboundFlight.id, seatClass },
          { flightId: pair.returnFlight.id, seatClass },
        ],
        segmentsPreview: [pair.outboundFlight, pair.returnFlight],
        passengerCounts: { adults, children, infants },
      },
    });
  }

  function handleSelectMultiCity(combo) {
    navigate("/booking/passengers", {
      state: {
        tripType: TRIP_TYPE.MULTI_CITY,
        segments: combo.flights.map((f) => ({ flightId: f.id, seatClass })),
        segmentsPreview: combo.flights,
        passengerCounts: multiCityPassengers || { adults: 1, children: 0, infants: 0 },
      },
    });
  }

  return (
    <div className="bg-soft min-h-screen py-8">
      <div className="container-app">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-navy flex items-center gap-2 flex-wrap">
            {tripType === TRIP_TYPE.MULTI_CITY ? (
              <>
                <Plane size={20} className="text-gold" />
                Multi-City Trip
              </>
            ) : (
              <>
                {origin} <span className="text-gold">→</span> {destination}
              </>
            )}
          </h1>
          <p className="text-muted text-sm mt-1">
            {tripType === TRIP_TYPE.MULTI_CITY
              ? `${multiCityLegs.length} flights`
              : `${departureDate}${returnDate ? ` — ${returnDate}` : ""}`}{" "}
            · {totalPassengers} passenger{totalPassengers !== 1 ? "s" : ""}
          </p>
        </div>

        <Card className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-end">
          <div className="flex items-center gap-2 text-navy text-sm font-medium sm:hidden">
            <SlidersHorizontal size={16} />
            Filters
          </div>
          <div className="w-full sm:w-56">
            <Select
              label="Seat Class"
              options={SEAT_CLASS_OPTIONS}
              value={seatClass}
              onChange={(e) => setSeatClass(e.target.value)}
            />
          </div>
          {tripType !== TRIP_TYPE.MULTI_CITY && (
            <div className="w-full sm:w-56">
              <Select
                label="Sort By"
                options={sortOptions}
                value={sortValue}
                onChange={(e) => setSortValue(e.target.value)}
              />
            </div>
          )}
        </Card>

        {loading && (
          <div className="flex justify-center py-16">
            <Spinner size={36} className="text-navy" />
          </div>
        )}

        {!loading && error && (
          <Card className="text-center py-10">
            <p className="text-muted text-sm mb-4">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="text-navy font-semibold text-sm hover:text-gold-dark"
            >
              Back to Home
            </button>
          </Card>
        )}

        {!loading && !error && results.length === 0 && (
          <Card className="text-center py-10">
            <p className="text-muted text-sm">
              No flights found for this search. Try different criteria.
            </p>
          </Card>
        )}

        {/* One Way */}
        {!loading && !error && results.length > 0 && tripType === TRIP_TYPE.ONE_WAY && (
          <div className="space-y-4">
            {results.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                onSelect={() => handleSelectOneWay(flight)}
              />
            ))}
          </div>
        )}

        {/* Round Trip */}
        {!loading && !error && results.length > 0 && tripType === TRIP_TYPE.ROUND_TRIP && (
          <div className="space-y-6">
            {results.map((pair, index) => (
              <Card key={index} className="space-y-3">
                <p className="text-xs font-semibold text-gold-dark uppercase tracking-wide flex items-center gap-1">
                  <ArrowUpDown size={12} /> Outbound
                </p>
                <FlightCard flight={pair.outboundFlight} onSelect={() => handleSelectRoundTrip(pair)} priceOverride={pair.totalPrice} />
                <p className="text-xs font-semibold text-gold-dark uppercase tracking-wide flex items-center gap-1 pt-2">
                  <ArrowUpDown size={12} /> Return
                </p>
                <FlightCard flight={pair.returnFlight} onSelect={() => handleSelectRoundTrip(pair)} priceOverride={pair.totalPrice} />
              </Card>
            ))}
          </div>
        )}

        {/* Multi-City */}
        {!loading && !error && results.length > 0 && tripType === TRIP_TYPE.MULTI_CITY && (
          <div className="space-y-6">
            {results.map((combo, index) => (
              <Card key={index} className="space-y-3">
                {combo.flights.map((flight, i) => (
                  <div key={flight.id}>
                    <p className="text-xs font-semibold text-gold-dark uppercase tracking-wide flex items-center gap-1 mb-2">
                      <Plane size={12} /> Flight {i + 1}
                    </p>
                    <FlightCard
                      flight={flight}
                      onSelect={() => handleSelectMultiCity(combo)}
                    />
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-sm text-muted">Total for this combination</span>
                  <span className="text-lg font-bold text-navy">
                    {formatCurrency(combo.totalPrice)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}