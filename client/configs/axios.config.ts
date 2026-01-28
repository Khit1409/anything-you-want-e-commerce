import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
