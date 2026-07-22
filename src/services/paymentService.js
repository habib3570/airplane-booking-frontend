import axiosClient from "../api/axiosClient";

export const paymentService = {
  createCheckoutSession: async (bookingId) => {
    const { data } = await axiosClient.post("/api/v1/payments/checkout-session", {
      bookingId,
    });
    return data; // { sessionId, checkoutUrl }
  },

  getByBookingId: async (bookingId) => {
    try {
      const { data } = await axiosClient.get(`/api/v1/payments/booking/${bookingId}`);
      return data; // PaymentDto
    } catch {
      return null;
    }
  },
};