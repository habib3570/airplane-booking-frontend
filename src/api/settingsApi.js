import axiosClient from "./axiosClient";

const settingsApi = {
  getSettings: async () => {
    const response = await axiosClient.get("/api/v1/settings");
    return response.data;
  },

  updateSettings: async (payload) => {
    const response = await axiosClient.put("/api/v1/settings", payload);
    return response.data;
  },

  uploadLogo: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosClient.post("/api/v1/settings/logo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  uploadFavicon: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosClient.post("/api/v1/settings/favicon", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  testSmtp: async (testRecipientEmail) => {
    const response = await axiosClient.post("/api/v1/settings/test-smtp", {
      testRecipientEmail,
    });
    return response.data;
  },
};

export default settingsApi;