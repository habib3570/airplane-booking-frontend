import axiosClient from "./axiosClient";

/**
 * Creates a Stripe Checkout Session for the given booking.
 * Backend returns { sessionId, checkoutUrl } — redirect the user to checkoutUrl.
 */
export async function createCheckoutSession(bookingId) {
  const { data } = await axiosClient.post("/api/v1/payments/checkout-session", {
    bookingId,
  });
  return data; // { sessionId, checkoutUrl }
}

/**
 * Fetch payment details for a booking (used to check status if needed).
 */
export async function getPaymentByBookingId(bookingId) {
  const { data } = await axiosClient.get(`/api/v1/payments/booking/${bookingId}`);
  return data;
}