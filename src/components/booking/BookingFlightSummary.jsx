import { Plane, Clock } from "lucide-react";
import { formatDuration, formatTime, formatDate } from "../../utils/helpers";

export default function BookingFlightSummary({ segments = [] }) {
  return (
    <div className="space-y-3">
      {segments.map((segment, index) => (
        <div
          key={segment.id || index}
          className="flex items-center gap-4 p-4 bg-soft rounded-lg border border-gray-100"
        >
          <div className="w-9 h-9 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0">
            <Plane className="text-navy" size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-navy">
              {segment.flightNumber} · {segment.seatClass}
            </p>
            <p className="text-xs text-muted">
              {segment.originIata} → {segment.destinationIata} ·{" "}
              {formatDate(segment.departureTime)}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-medium text-navy">
              {formatTime(segment.departureTime)} - {formatTime(segment.arrivalTime)}
            </p>
            <p className="text-xs text-muted flex items-center gap-1 justify-end">
              <Clock size={11} />
              {formatDuration(
                (new Date(segment.arrivalTime) - new Date(segment.departureTime)) / 60000
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}