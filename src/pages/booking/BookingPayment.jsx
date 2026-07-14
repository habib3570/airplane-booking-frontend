import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Wallet, Hash, Phone, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import BookingFlightSummary from "../../components/booking/BookingFlightSummary";
import { getBookingById } from "../../api/bookingApi";
import { verifyManualPayment } from "../../api/paymentApi";
import { PAYMENT_METHOD_OPTIONS, BOOKING_STATUS } from "../../utils/enums";
import { formatCurrency, getErrorMessage } from "../../utils/helpers";

export default function BookingPayment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    paymentMethod: "bKash",
    transactionId: "",
    payerPaymentNumber: "",
  });
  const [errors, setErrors] = useState({});

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

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors = {};
    if (!form.transactionId.trim())
      newErrors.transactionId = "Transaction ID is required";
    if (!form.payerPaymentNumber.trim())
      newErrors.payerPaymentNumber = "Payment account number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await verifyManualPayment({
        bookingId: id,
        paymentMethod: form.paymentMethod,
        transactionId: form.transactionId,
        payerPaymentNumber: form.payerPaymentNumber,
      });
      toast.success("Payment verified! Your ticket is ready.");
      navigate(`/booking/${id}/confirmation`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
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
              <p className="font-semibold mb-1">Manual Payment Instructions</p>
              <p className="text-muted">
                Send{" "}
                <span className="font-semibold text-navy">
                  {formatCurrency(booking.totalAmount, booking.currencyCode)}
                </span>{" "}
                to our bKash/SPay merchant number{" "}
                <span className="font-semibold text-navy">01700-000000</span>,
                then enter your transaction ID and the number you paid from
                below.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select
              label="Payment Method"
              name="paymentMethod"
              icon={Wallet}
              options={PAYMENT_METHOD_OPTIONS}
              value={form.paymentMethod}
              onChange={handleChange}
              required
            />
            <Input
              label="Transaction ID"
              name="transactionId"
              icon={Hash}
              placeholder="e.g. 8N7A2K9X1P"
              value={form.transactionId}
              onChange={handleChange}
              error={errors.transactionId}
              required
            />
            <Input
              label="Your Payment Account Number"
              name="payerPaymentNumber"
              icon={Phone}
              placeholder="e.g. 01711111111"
              value={form.payerPaymentNumber}
              onChange={handleChange}
              error={errors.payerPaymentNumber}
              required
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
            >
              Confirm Payment
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}