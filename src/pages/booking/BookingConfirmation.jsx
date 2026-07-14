import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import QRCode from "react-qr-code";
import { CheckCircle2, Download, Plane } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { getBookingById } from "../../api/bookingApi";
import { getTicketsByBooking, downloadTicketPdfById } from "../../api/ticketApi";
import { formatDate, formatTime, getErrorMessage } from "../../utils/helpers";

export default function BookingConfirmation() {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function fetchData() {
    setLoading(true);
    try {
      const [bookingData, ticketsData] = await Promise.all([
        getBookingById(id),
        getTicketsByBooking(id),
      ]);
      setBooking(bookingData);
      setTickets(ticketsData || []);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload(ticket) {
    setDownloadingId(ticket.id);
    try {
      await downloadTicketPdfById(ticket.id, ticket.ticketNumber);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDownloadingId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size={36} className="text-navy" />
      </div>
    );
  }

  return (
    <div className="bg-soft min-h-screen py-8">
      <div className="container-app max-w-3xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="text-green-600" size={32} />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-navy mb-1">
            Booking Confirmed!
          </h1>
          <p className="text-muted text-sm">
            Reference:{" "}
            <span className="font-semibold text-navy">
              {booking?.bookingReference}
            </span>
          </p>
        </div>

        <div className="space-y-5">
          {tickets.map((ticket) => {
            const verifyUrl = `${window.location.origin}/verify/${ticket.ticketNumber}`;
            return (
              <Card key={ticket.id}>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Plane className="text-gold" size={16} />
                      <span className="text-sm font-semibold text-navy">
                        {ticket.flightNumber}
                      </span>
                      <span className="text-xs text-muted">
                        · {ticket.seatClass}
                      </span>
                    </div>

                    <p className="text-sm text-navy font-medium mb-1">
                      Passenger: {ticket.passengerName}
                    </p>
                    <p className="text-sm text-muted mb-1">
                      Ticket No: {ticket.ticketNumber}
                    </p>
                    <p className="text-sm text-muted mb-3">
                      {formatDate(ticket.departureTime)} ·{" "}
                      {formatTime(ticket.departureTime)} —{" "}
                      {formatTime(ticket.arrivalTime)}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      icon={Download}
                      isLoading={downloadingId === ticket.id}
                      onClick={() => handleDownload(ticket)}
                    >
                      Download PDF
                    </Button>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0">
                    <div className="p-2 bg-white border border-gray-200 rounded-lg">
                      <QRCode value={verifyUrl} size={110} />
                    </div>
                    <p className="text-[10px] text-muted text-center max-w-[120px]">
                      Scan to verify this ticket
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link to="/dashboard/bookings">
            <Button variant="primary">Go to My Bookings</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}