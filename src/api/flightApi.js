import axiosClient from "./axiosClient";

export async function getFlights(params = {}) {
  const { data } = await axiosClient.get("/api/v1/flights", { params });
  return data;
}

export async function getFlightById(id) {
  const { data } = await axiosClient.get(`/api/v1/flights/${id}`);
  return data;
}

export async function getSeatMap(id) {
  const { data } = await axiosClient.get(`/api/v1/flights/${id}/seats`);
  return data;
}

export async function createFlight(payload) {
  const { data } = await axiosClient.post("/api/v1/flights", payload);
  return data;
}

export async function updateFlight(id, payload) {
  const { data } = await axiosClient.put(`/api/v1/flights/${id}`, payload);
  return data;
}

export async function updateFlightStatus(id, payload) {
  await axiosClient.patch(`/api/v1/flights/${id}/status`, payload);
}

export async function deleteFlight(id) {
  await axiosClient.delete(`/api/v1/flights/${id}`);
}
export async function uploadFlightPhotos(id, files) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  const { data } = await axiosClient.post(
    `/api/v1/flights/${id}/photos`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}

export async function getFlightPhotos(id) {
  const { data } = await axiosClient.get(`/api/v1/flights/${id}/photos`);
  return data;
}

export async function deleteFlightPhoto(id, photoId) {
  await axiosClient.delete(`/api/v1/flights/${id}/photos/${photoId}`);
}