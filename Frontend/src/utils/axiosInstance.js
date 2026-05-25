import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Set a timeout for requests (optional)
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add any request interceptors here if needed
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//Respose Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      console.log("API Error:", error.response.status, error.response.data);
      if (error.response.status === 401) {
        // Unauthorized, token might be invalid or expired
        localStorage.removeItem("accessToken");
        window.location.href = "/"; // Redirect to login page
      } else if (error.response.status === 500) {
        console.error("Server Error, try again later");
      }

      const message =
        error.response.data?.message ||
        (typeof error.response.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "An error occurred";

      alert(`Error: ${message}`);
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
      alert("Error: Request timed out. Please try again.");
    } else {
      console.error("Network or unknown error", error);
      alert(`Error: ${error.message || "An unknown error occurred"}`);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
