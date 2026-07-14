import { useState, useEffect } from "react";
import { Ticket, Download, Plane } from "lucide-react";
import QRCode from "react-qr-code";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { getMyTickets, downloadTicketPdfById } from "../../api/ticketApi";
import { formatDate, formatTime, getErrorMessage } from "../../utils/helpers";
import toast from "react-hot-toast";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  async function fetchTickets() {
    setLoading(true);
    try {
      const data = await getMyTickets();
      setTickets(data || []);
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
      <div className="flex justify-center py-16">
        <Spinner size={32} className="text-navy" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">My Tickets</h1>
      <p className="text-muted mb-6">All your issued e-tickets in one place</p>

      {tickets.length === 0 ? (
        <Card className="text-center py-10">
          <Ticket className="text-gray-300 mx-auto mb-3" size={40} />
          <p className="text-muted text-sm">No tickets issued yet.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => {
            const verifyUrl = `${window.location.origin}/verify/${ticket.ticketNumber}`;
            return (
              <Card key={ticket.id} className="p-0 overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {/* Ticket main info */}
                  <div className="flex-1 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center flex-shrink-0">
                        <Plane className="text-navy" size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-navy">
                          {ticket.flightNumber} · {ticket.seatClass}
                        </p>
                        <p className="text-xs text-muted">
                          {ticket.ticketNumber}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                      <div>
                        <p className="text-xs text-muted mb-0.5">Passenger</p>
                        <p className="text-navy font-medium">{ticket.passengerName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted mb-0.5">Checked In</p>
                        <p className={ticket.isCheckedIn ? "text-green-600 font-medium" : "text-yellow-600 font-medium"}>
                          {ticket.isCheckedIn ? "Yes" : "Not Yet"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted mb-0.5">Departure</p>
                        <p className="text-navy font-medium">
                          {formatDate(ticket.departureTime)}, {formatTime(ticket.departureTime)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted mb-0.5">Arrival</p>
                        <p className="text-navy font-medium">
                          {formatTime(ticket.arrivalTime)}
                        </p>
                      </div>
                    </div>

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

                  {/* QR section — directly attached to the ticket, like a stub */}
                  <div className="sm:w-44 flex-shrink-0 bg-soft border-t sm:border-t-0 sm:border-l border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 p-5">
                    <div className="p-2 bg-white border border-gray-200 rounded-lg">
                      <QRCode value={verifyUrl} size={90} />
                    </div>
                    <p className="text-[10px] text-muted text-center">
                      Scan to verify
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}