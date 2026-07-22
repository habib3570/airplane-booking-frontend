import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShieldCheck, CreditCard } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import BookingFlightSummary from "../../components/booking/BookingFlightSummary";
import { getBookingById } from "../../api/bookingApi";
import { createCheckoutSession } from "../../api/paymentApi";
import { BOOKING_STATUS } from "../../utils/enums";
import { formatCurrency, getErrorMessage } from "../../utils/helpers";

export default function BookingPayment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    fetchBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function fetchBooking() {
    setLoading(true);
    try {
      const data = await getBookingById(id);
      setBooking(data);
      if (data.status === BOOKING_STATUS.CONFIRMED) {
        navigate(`/booking/${id}/confirmation`, { replace: true });
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function handlePayNow() {
    setIsRedirecting(true);
    try {
      const { checkoutUrl } = await createCheckoutSession(id);
      // Redirect the browser to Stripe's hosted Checkout page
      window.location.href = checkoutUrl;
    } catch (error) {
      toast.error(getErrorMessage(error));
      setIsRedirecting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner size={36} className="text-navy" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container-app py-16 text-center">
        <p className="text-muted">Booking not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-soft min-h-screen py-8">
      <div className="container-app max-w-2xl">
        <h1 className="text-xl sm:text-2xl font-bold text-navy mb-1">
          Complete Payment
        </h1>
        <p className="text-muted text-sm mb-6">
          Booking Reference:{" "}
          <span className="font-semibold text-navy">
            {booking.bookingReference}
          </span>
        </p>

        <Card className="mb-6">
          <BookingFlightSummary segments={booking.segments} />
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
            <span className="text-sm text-muted">Total Amount</span>
            <span className="text-xl font-bold text-navy">
              {formatCurrency(booking.totalAmount, booking.currencyCode)}
            </span>
          </div>
        </Card>

        <Card className="mb-6 bg-navy/5 border-navy/10">
          <div className="flex items-start gap-3">
            <ShieldCheck className="text-navy flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-navy">
              <p className="font-semibold mb-1">Secure Payment via Stripe</p>
              <p className="text-muted">
                You'll be redirected to Stripe's secure checkout page to
                complete your payment with a card. Your booking will be
                confirmed automatically once payment succeeds.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isRedirecting}
            onClick={handlePayNow}
          >
            <CreditCard size={18} className="mr-2" />
            Pay {formatCurrency(booking.totalAmount, booking.currencyCode)} with Stripe
          </Button>
        </Card>
      </div>
    </div>
  );
}