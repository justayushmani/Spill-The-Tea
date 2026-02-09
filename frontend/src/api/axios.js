import axios from "axios";

// Use REACT_APP_ prefix for Create React App environment variables
// Auto-detect production vs development
const getBaseURL = () => {
  // If explicitly set via environment variable, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Auto-detect production (running on Render)
  if (window.location.hostname.includes('onrender.com')) {
    return "https://spill-the-tea.onrender.com/api";
  }
  
  // Default to localhost for local development
  return "http://localhost:5000/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
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
