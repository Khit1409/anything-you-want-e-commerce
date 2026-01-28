import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.LARAVEL_SERVER_URL || 'http://localhost:8000/api',
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});
