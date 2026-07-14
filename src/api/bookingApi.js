import axiosClient from "./axiosClient";

export async function createBooking(payload) {
  const { data } = await axiosClient.post("/api/v1/bookings", payload);
  return data;
}

export async function getMyBookings(params = {}) {
  const { data } = await axiosClient.get("/api/v1/bookings", { params });
  return data;
}

export async function getBookingById(id) {
  const { data } = await axiosClient.get(`/api/v1/bookings/${id}`);
  return data;
}

export async function getBookingByReference(reference) {
  const { data } = await axiosClient.get(
    `/api/v1/bookings/reference/${reference}`
  );
  return data;
}

export async function cancelBooking(id, reason) {
  await axiosClient.patch(`/api/v1/bookings/${id}/cancel`, { reason });
}