import axiosClient from "./axiosClient";

export async function getAirlines() {
  const { data } = await axiosClient.get("/api/v1/airlines");
  return data;
}

export async function getAirlineById(id) {
  const { data } = await axiosClient.get(`/api/v1/airlines/${id}`);
  return data;
}

export async function createAirline(payload) {
  const { data } = await axiosClient.post("/api/v1/airlines", payload);
  return data;
}

export async function updateAirline(id, payload) {
  const { data } = await axiosClient.put(`/api/v1/airlines/${id}`, payload);
  return data;
}