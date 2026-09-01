import axios from "axios";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
});

export const authAPi = {
  login: async (data) => {
    const response = await client.post("login", data);
    return response.data;
  },
  register: async (data) => {
    const response = await client.post("register", data);
    return response.data;
  },
  getUser: async () => {
    const response = await client.get("/me");
    return response.data;
  },
  logout: async () => {
    await client.post("/logout");
    return true;
  },
};
