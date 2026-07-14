import axiosClient from "./axiosClient";

export async function getDashboardStats(params = {}) {
  const { data } = await axiosClient.get("/api/v1/admin/dashboard", { params });
  return data;
}

export async function getRevenueReport(params = {}) {
  const { data } = await axiosClient.get("/api/v1/admin/reports/revenue", { params });
  return data;
}

export async function getBookingsReport(params = {}) {
  const { data } = await axiosClient.get("/api/v1/admin/reports/bookings", { params });
  return data;
}

export async function getAuditLogs(params = {}) {
  const { data } = await axiosClient.get("/api/v1/admin/audit-logs", { params });
  return data;
}

export async function createAgent(payload) {
  const { data } = await axiosClient.post("/api/v1/admin/agents", payload);
  return data;
}

export async function sendFlightAlert(payload) {
  await axiosClient.post("/api/v1/admin/notifications/flight-alert", payload);
}