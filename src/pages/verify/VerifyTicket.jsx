import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle, Plane, User, Calendar } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { getTicketByNumber } from "../../api/ticketApi";
import { formatDate, formatTime, getErrorMessage } from "../../utils/helpers";

export default function VerifyTicket() {
  const { ticketNumber } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTicket() {
      try {
        const data = await getTicketByNumber(ticketNumber);
        setTicket(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    fetchTicket();
  }, [ticketNumber]);

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        {loading && (
          <div className="text-center py-8">
            <Spinner size={36} className="text-navy mx-auto mb-4" />
            <p className="text-muted text-sm">Verifying ticket...</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <XCircle className="text-red-600" size={32} />
            </div>
            <p className="text-navy font-semibold mb-2">Invalid Ticket</p>
            <p className="text-muted text-sm mb-6">{error}</p>
            <Link to="/">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        )}

        {!loading && !error && ticket && (
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="text-green-600" size={32} />
              </div>
              <p className="text-navy font-semibold">Valid Ticket</p>
              <p className="text-muted text-xs">{ticket.ticketNumber}</p>
            </div>

            <div className="space-y-3 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-3">
                <User className="text-gold flex-shrink-0" size={18} />
                <div>
                  <p className="text-xs text-muted">Passenger</p>
                  <p className="text-sm font-medium text-navy">
                    {ticket.passengerName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Plane className="text-gold flex-shrink-0" size={18} />
                <div>
                  <p className="text-xs text-muted">Flight</p>
                  <p className="text-sm font-medium text-navy">
                    {ticket.flightNumber} · {ticket.seatClass}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-gold flex-shrink-0" size={18} />
                <div>
                  <p className="text-xs text-muted">Departure</p>
                  <p className="text-sm font-medium text-navy">
                    {formatDate(ticket.departureTime)} at{" "}
                    {formatTime(ticket.departureTime)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted">Checked In</span>
                <span
                  className={`text-xs font-semibold ${
                    ticket.isCheckedIn ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {ticket.isCheckedIn ? "Yes" : "Not Yet"}
                </span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}