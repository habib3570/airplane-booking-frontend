import axiosClient from "../api/axiosClient";

export const settingsService = {
  getSettings: async () => {
    const { data } = await axiosClient.get("/api/v1/settings");
    return data; // SystemSettingsDto
  },

  updateSettings: async (payload) => {
    const { data } = await axiosClient.put("/api/v1/settings", payload);
    return data; // updated SystemSettingsDto
  },
};