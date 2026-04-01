import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api"
});

// Add token from localStorage to requests only if it exists and is valid
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && token.trim().length > 0) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle response errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login on 401 for protected routes
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Don't redirect from here - let the component handle it
      console.warn("Unauthorized - token may be invalid or expired");
    }
    return Promise.reject(error);
  }
);

export default instance;