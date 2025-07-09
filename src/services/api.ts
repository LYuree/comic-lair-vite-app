// services/api.ts
import axios from "axios";
import { refreshToken } from "./auth.service";
import { rootStore } from "../store";

const API_URL = "http://127.0.0.1:8000/";

const api = axios.create({
  baseURL: API_URL,
});

const {
  profileStore: {
    // currentUserToken,
    // currentUserRefreshToken,
    setCurrentUserToken,
    setCurrentUserRefreshToken,
  },
} = rootStore;

// Add a request interceptor

console.log("interceptor works");

api.interceptors.request.use(
  (config) => {
    console.log("interceptor works");
    // const token = currentUserToken; // Ensure you're getting the current token
    const token = rootStore.profileStore.currentUserToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;

      console.log("Authorization header set:", config.headers.Authorization);
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// api.interceptors.request.use(
//   (config) => {
//     console.log(currentUserToken);
//     if (currentUserToken) {
//       config.headers["Authorization"] = `Bearer ${currentUserToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("response interceptor going");

    // If error is 401 and we haven't already retried
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const userRefreshToken = rootStore.profileStore.currentUserRefreshToken;

      if (userRefreshToken) {
        try {
          const newAccessToken = await refreshToken(userRefreshToken);
          setCurrentUserToken(newAccessToken);

          // Update the Authorization header
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Retry the original request
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh token failed - logout user
          setCurrentUserToken(null);
          setCurrentUserRefreshToken(null);

          // Redirect to login
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
