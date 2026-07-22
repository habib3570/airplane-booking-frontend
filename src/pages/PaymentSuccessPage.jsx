import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { paymentService } from "../services/paymentService";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = searchParams.get("booking_id");

  const [payment, setPayment] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!bookingId) {
      setStatus("notfound");
      return;
    }

    let attempts = 0;
    const maxAttempts = 6;
    let timeoutId;

    const poll = async () => {
      const result = await paymentService.getByBookingId(bookingId);
      attempts += 1;

      if (result && result.status === "Succeeded") {
        setPayment(result);
        setStatus("confirmed");
        return;
      }

      if (attempts >= maxAttempts) {
        setPayment(result);
        setStatus("pending");
        return;
      }

      timeoutId = setTimeout(poll, 2000);
    };

    poll();

    return () => clearTimeout(timeoutId);
  }, [bookingId]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full mb-4" />
        <p className="text-gray-600">Confirming your payment...</p>
      </div>
    );
  }

  if (status === "notfound") {
    return (
      <div className="text-center py-16">
        <p className="text-red-600">Invalid payment reference.</p>
        <Link to="/" className="text-indigo-600 underline">Go home</Link>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold mb-2">Payment is being processed</h2>
        <p className="text-gray-600 mb-4">এটা একটু সময় নিতে পারে। কিছুক্ষণ পর আপনার বুকিং পেজ চেক করুন।</p>
        <button
          onClick={() => navigate(`/booking/${bookingId}/confirmation`)}
          className="text-indigo-600 underline"
        >
          View Booking
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto text-center py-16">
      <div className="text-green-600 text-5xl mb-4">OK</div>
      <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
      <p className="text-gray-600 mb-1">Amount: {payment && payment.amount} {payment && payment.currencyCode}</p>
      <p className="text-gray-600 mb-6">Booking Reference: {payment && payment.bookingReference}</p>
      {payment && payment.receiptUrl ? (
        <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline block mb-4">
          View Receipt
        </a>
      ) : null}
      <button
        onClick={() => navigate(`/booking/${bookingId}/confirmation`)}
        className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
      >
        View My Booking
      </button>
    </div>
  );
}