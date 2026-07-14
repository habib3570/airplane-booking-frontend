import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plane, CreditCard, Ticket, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../../components/ui/Card";
import Spinner from "../../components/ui/Spinner";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import Textarea from "../../components/ui/Textarea";
import { BookingStatusBadge } from "../../components/ui/StatusBadge";
import { getMyBookings, cancelBooking } from "../../api/bookingApi";
import { BOOKING_STATUS } from "../../utils/enums";
import { formatDate, formatCurrency, getErrorMessage } from "../../utils/helpers";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelError, setCancelError] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);
    try {
      const data = await getMyBookings({ PageSize: 50 });
      setBookings(data?.items || []);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  function openCancelModal(booking) {
    setCancelTarget(booking);
    setCancelReason("");
    setCancelError("");
  }

  function closeCancelModal() {
    if (isCancelling) return;
    setCancelTarget(null);
    setCancelReason("");
    setCancelError("");
  }

  async function handleCancelSubmit() {
    if (!cancelReason.trim()) {
      setCancelError("Please provide a reason for cancellation");
      return;
    }

    setIsCancelling(true);
    try {
      await cancelBooking(cancelTarget.id, cancelReason.trim());
      toast.success("Booking cancelled successfully");
      setCancelTarget(null);
      setCancelReason("");
      fetchBookings();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsCancelling(false);
    }
  }

  function canCancel(status) {
    return (
      status === BOOKING_STATUS.PENDING_PAYMENT ||
      status === BOOKING_STATUS.CONFIRMED
    );
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
      <h1 className="text-2xl font-bold text-navy mb-1">My Bookings</h1>
      <p className="text-muted mb-6">View and manage all your flight bookings</p>

      {bookings.length === 0 ? (
        <Card className="text-center py-10">
          <Plane className="text-gray-300 mx-auto mb-3" size={40} />
          <p className="text-muted text-sm mb-4">You have no bookings yet.</p>
          <Link to="/">
            <Button variant="primary">Search Flights</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-semibold text-navy">
                      {booking.bookingReference}
                    </p>
                    <BookingStatusBadge status={booking.status} />
                  </div>
                  <p className="text-sm text-muted">
                    {booking.flightNumbers?.join(", ")}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {formatCurrency(booking.totalAmount, booking.currencyCode)}
                    {booking.confirmedAt &&
                      ` · Confirmed ${formatDate(booking.confirmedAt)}`}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 flex-shrink-0">
                  {booking.status === BOOKING_STATUS.PENDING_PAYMENT && (
                    <Link to={`/booking/${booking.id}/payment`}>
                      <Button variant="primary" size="sm" icon={CreditCard}>
                        Complete Payment
                      </Button>
                    </Link>
                  )}
                  {booking.status === BOOKING_STATUS.CONFIRMED && (
                    <Link to={`/booking/${booking.id}/confirmation`}>
                      <Button variant="outline" size="sm" icon={Ticket}>
                        View Tickets
                      </Button>
                    </Link>
                  )}
                  {canCancel(booking.status) && (
                    <Button
                      variant="danger"
                      size="sm"
                      icon={XCircle}
                      onClick={() => openCancelModal(booking)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Cancel Booking Modal */}
      <Modal
        isOpen={!!cancelTarget}
        onClose={closeCancelModal}
        title="Cancel Booking"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted">
            Are you sure you want to cancel booking{" "}
            <span className="font-semibold text-navy">
              {cancelTarget?.bookingReference}
            </span>
            ? This action cannot be undone, and refund eligibility depends on
            the airline's fare rules.
          </p>

          <Textarea
            label="Reason for Cancellation"
            placeholder="e.g. Change of travel plans"
            value={cancelReason}
            onChange={(e) => {
              setCancelReason(e.target.value);
              if (cancelError) setCancelError("");
            }}
            error={cancelError}
            rows={3}
            required
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={closeCancelModal} disabled={isCancelling}>
              Keep Booking
            </Button>
            <Button
              variant="danger"
              onClick={handleCancelSubmit}
              isLoading={isCancelling}
            >
              Confirm Cancellation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}