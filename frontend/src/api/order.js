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
};
