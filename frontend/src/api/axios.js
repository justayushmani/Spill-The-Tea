import axios from "axios";

// Use REACT_APP_ prefix for Create React App environment variables
// Fallback to localhost for development if not set
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Attach JWT token from localStorage on every request (for protected routes)
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
