import { showNotification } from "@mantine/notifications";
import axios from "axios";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Interceptors add token to authorized requests
API.interceptors.request.use(
  async (config) => {
    const token = await JSON.parse(
      localStorage.getItem("duduzili-user") as string
    )?.token;
    if (token) {
      config.headers.authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    showNotification({
      title: "Error",
      message: "Something went wrong",
      color: "red",
    });
    Promise.reject(error);
  }
);

export default API;
