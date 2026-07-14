import { Plane, Clock, ArrowRight } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { FlightStatusBadge } from "../ui/StatusBadge";
import { formatDuration, formatTime, formatCurrency } from "../../utils/helpers";

export default function FlightCard({ flight, onSelect, priceOverride }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Airline */}
        <div className="flex items-center gap-3 sm:w-40 flex-shrink-0">
          {flight.airlineLogoUrl ? (
            <img
              src={flight.airlineLogoUrl}
              alt={flight.airlineName}
              className="w-10 h-10 object-contain"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center">
              <Plane className="text-navy" size={18} />
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-navy leading-tight">
              {flight.airlineName}
            </p>
            <p className="text-xs text-muted">{flight.flightNumber}</p>
          </div>
        </div>

        {/* Route & Time */}
        <div className="flex-1 flex items-center justify-between gap-3">
          <div className="text-center">
            <p className="text-lg font-bold text-navy">
              {formatTime(flight.departureTime)}
            </p>
            <p className="text-xs text-muted">{flight.originIata}</p>
          </div>

          <div className="flex-1 flex flex-col items-center px-2">
            <span className="text-xs text-muted flex items-center gap-1 mb-1">
              <Clock size={12} />
              {formatDuration(flight.durationMinutes)}
            </span>
            <div className="w-full flex items-center gap-1">
              <span className="h-px flex-1 bg-gray-300" />
              <ArrowRight size={14} className="text-gold flex-shrink-0" />
              <span className="h-px flex-1 bg-gray-300" />
            </div>
            <span className="text-[11px] text-muted mt-1">
              {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop(s)`}
            </span>
          </div>

          <div className="text-center">
            <p className="text-lg font-bold text-navy">
              {formatTime(flight.arrivalTime)}
            </p>
            <p className="text-xs text-muted">{flight.destinationIata}</p>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:w-40 flex-shrink-0 gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
          <div className="text-right">
            <p className="text-xl font-bold text-navy">
              {formatCurrency(priceOverride ?? flight.totalPrice ?? flight.economyBasePrice)}
            </p>
            <FlightStatusBadge status={flight.status} />
          </div>
          <Button variant="primary" size="sm" onClick={onSelect}>
            Select
          </Button>
        </div>
      </div>
    </Card>
  );
}