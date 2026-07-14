import axiosClient from "./axiosClient";

export async function getUsers(params = {}) {
  const { data } = await axiosClient.get("/api/v1/users", { params });
  return data;
}

export async function getUserById(id) {
  const { data } = await axiosClient.get(`/api/v1/users/${id}`);
  return data;
}

export async function createUser(payload) {
  const { data } = await axiosClient.post("/api/v1/admin/users", payload);
  return data;
}

export async function updateUserRole(id, role) {
  await axiosClient.put(`/api/v1/admin/users/${id}/role`, { role });
}

export async function toggleUserActive(id, isActive) {
  await axiosClient.patch(`/api/v1/users/${id}/activate`, { isActive });
}

export async function deleteUser(id) {
  await axiosClient.delete(`/api/v1/users/${id}`);
}

export async function updateMyProfile(payload) {
  const { data } = await axiosClient.put("/api/v1/users/profile", payload);
  return data;
}

export async function uploadProfilePicture(file) {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axiosClient.post(
    "/api/v1/users/profile/picture",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}

export async function updatePassport(payload) {
  await axiosClient.put("/api/v1/users/passport", payload);
}