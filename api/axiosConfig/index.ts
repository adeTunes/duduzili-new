import axios from "axios";
import { notify } from "../../utils/notification-handler";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
export const PAYMENTAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Interceptors add token to authorized requests
PAYMENTAPI.interceptors.request.use(
  async (config) => {
    const token = await JSON.parse(
      localStorage.getItem("duduzili-user") as string
    )?.token;
    if (token) {
      config.headers.authorization = `Token ${token}`;
      config.headers["API-KEY"] = process.env.NEXT_PUBLIC_API_KEY
      config.headers["HASH-KEY"] = process.env.NEXT_PUBLIC_HASH_KEY
      config.headers["REQUEST-TS"] = process.env.NEXT_PUBLIC_REQUEST_TS
    }
    return config;
  },
  (error) => {
    notify({
      title: "Error",
      message: "Something went wrong",
      color: "red",
    });
    Promise.reject(error);
  }
);
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
    notify({
      title: "Error",
      message: "Something went wrong",
      color: "red",
    });
    Promise.reject(error);
  }
);

export default API;
