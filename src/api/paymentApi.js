import axiosClient from "./axiosClient";

export async function verifyManualPayment(payload) {
  const { data } = await axiosClient.post(
    "/api/v1/payments/verify-manual",
    payload
  );
  return data;
}