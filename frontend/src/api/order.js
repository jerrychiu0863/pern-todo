import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_ORDER_URL,
});

export const orderApi = {
  getAll: async () => {
    const response = await client.get("all");
    return response.data;
  },
  create: async (order) => {
    const response = await client.post("", order);
    return response.data;
  },
  update: async (orderId, payload) => {
    const response = await client.put(`/${orderId}`, payload);
    return response.data;
  },
  delete: async (orderId) => {
    const response = await client.delete(`/${orderId}`);
    console.log(response);
    return response.data;
  },
};
