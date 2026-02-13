import axios from "axios";

// Use REACT_APP_ prefix for Create React App environment variables
// Auto-detect production vs development at runtime
const getBaseURL = () => {
  // If explicitly set via environment variable, use it (set in Render dashboard)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Runtime check for production (running on Render)
  if (typeof window !== "undefined" && window.location.hostname.includes('onrender.com')) {
    return "https://spill-the-tea.onrender.com/api";
  }
  
  // Default to localhost for local development
  return "http://localhost:5000/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

// Log the base URL being used (helpful for debugging)
if (typeof window !== "undefined") {
  console.log("API Base URL:", api.defaults.baseURL);
}

// Attach JWT token from localStorage on every request (for protected routes)
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Ensure baseURL is set correctly at runtime (in case env var wasn't set during build)
    if (!config.baseURL || config.baseURL.includes('localhost')) {
      if (window.location.hostname.includes('onrender.com')) {
        config.baseURL = "https://spill-the-tea.onrender.com/api";
      }
    }
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log network errors for debugging
    if (error.message === 'Network Error' || !error.response) {
      console.error('Network Error - Check if backend is running and CORS is configured');
      console.error('Request URL:', error.config?.baseURL + error.config?.url);
    }
    return Promise.reject(error);
  }
);

export default api;
