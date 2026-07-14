import axiosClient from "./axiosClient";

export async function getAirports(params = {}) {
  const { data } = await axiosClient.get("/api/v1/airports", { params });
  return data;
}

export async function getAirportByCode(iataCode) {
  const { data } = await axiosClient.get(`/api/v1/airports/${iataCode}`);
  return data;
}

export async function createAirport(payload) {
  const { data } = await axiosClient.post("/api/v1/airports", payload);
  return data;
}

export async function updateAirport(id, payload) {
  const { data } = await axiosClient.put(`/api/v1/airports/${id}`, payload);
  return data;
}

export async function deleteAirport(id) {
  await axiosClient.delete(`/api/v1/airports/${id}`);
}

export async function getAirportPhotos(id) {
  const { data } = await axiosClient.get(`/api/v1/airports/${id}/photos`);
  return data;
}

export async function deleteAirportPhoto(id, photoId) {
  await axiosClient.delete(`/api/v1/airports/${id}/photos/${photoId}`);
}