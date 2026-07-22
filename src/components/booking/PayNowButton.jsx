import { useState } from "react";
import { paymentService } from "../../services/paymentService";

export default function PayNowButton({ bookingId, disabled }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayNow = async () => {
    setLoading(true);
    setError(null);
    try {
      const session = await paymentService.createCheckoutSession(bookingId);
      // Stripe এর hosted checkout page এ redirect
      window.location.href = session.checkoutUrl;
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Payment session তৈরি করা যায়নি। আবার চেষ্টা করুন।"
      );
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePayNow}
        disabled={disabled || loading}
        className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? "Redirecting to payment..." : "Pay Now with Card"}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}