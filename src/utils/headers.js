import axios from "axios";

// Base API URL
const API_BASE_URL = "http://127.0.0.1:8000/api/";
// const API_BASE_URL = "https://tma-backend-six.vercel.app/api/"; //production

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach Authorization token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
