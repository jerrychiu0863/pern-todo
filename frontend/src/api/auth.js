import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
});

export const authAPi = {
  login: async (data) => {
    const response = await client.post("login", data);
    return response.data;
  },
};
