import axiosClient from "./axiosClient";

export async function searchOneWay(payload) {
  const { data } = await axiosClient.post("/api/v1/search/one-way", payload);
  return data;
}

export async function searchRoundTrip(payload) {
  const { data } = await axiosClient.post("/api/v1/search/round-trip", payload);
  return data;
}

export async function searchMultiCity(payload) {
  const { data } = await axiosClient.post("/api/v1/search/multi-city", payload);
  return data;
}