import axiosClient from "./axiosClient";

const contactApi = {
  send: async (payload) => {
    const response = await axiosClient.post("/api/v1/contact", payload);
    return response.data;
  },

  getAll: async (pageNumber = 1, pageSize = 20) => {
    const response = await axiosClient.get("/api/v1/contact/admin", {
      params: { pageNumber, pageSize },
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosClient.get(`/api/v1/contact/admin/${id}`);
    return response.data;
  },

  markAsRead: async (id) => {
    await axiosClient.patch(`/api/v1/contact/admin/${id}/read`);
  },

  getUnreadCount: async () => {
    const response = await axiosClient.get("/api/v1/contact/admin/unread-count");
    return response.data.count;
  },

  remove: async (id) => {
    await axiosClient.delete(`/api/v1/contact/admin/${id}`);
  },
};

export default contactApi;