import { useSearchParams, useNavigate } from "react-router-dom";

export default function PaymentCancelledPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = searchParams.get("booking_id");

  return (
    <div className="max-w-md mx-auto text-center py-16">
      <div className="text-yellow-500 text-5xl mb-4">⚠</div>
      <h2 className="text-2xl font-semibold mb-2">Payment Cancelled</h2>
      <p className="text-gray-600 mb-6">
        আপনি পেমেন্ট সম্পন্ন করেননি। আপনার বুকিং এখনো pending আছে, চাইলে আবার চেষ্টা করতে পারেন।
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => bookingId && navigate(`/booking/${bookingId}/payment`)}
          className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
        >
          Try Again
        </button>
        <button
          onClick={() => navigate("/")}
          className="rounded-lg border border-gray-300 px-6 py-2 hover:bg-gray-50"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}