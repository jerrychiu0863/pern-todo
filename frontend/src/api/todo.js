import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_TODO_URL,
});

export const todoApi = {
  getAll: async () => {
    const response = await client.get("/all");
    return response.data;
  },
  create: async (description) => {
    const response = await client.post("", { description });
    return response.data;
  },
  update: async (todoId, payload) => {
    const reponse = await client.put(`${todoId}`, payload);
    return reponse.data;
  },
  delete: async (todoId) => {
    await client.delete(`${todoId}`);
  },
};
