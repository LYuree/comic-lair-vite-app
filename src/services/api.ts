// services/api.ts
import axios from "axios";
import { refreshToken } from "./auth.service";
import { rootStore } from "../store";

const API_URL = "http://localhost:8000/";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const {
  profileStore: {
    setCurrentUserToken,
    setCurrentUserRefreshToken,
    currentUserToken,
  },
} = rootStore;

// Add a request interceptor

api.interceptors.request.use(
  (config) => {
    // const token = currentUserToken; // Ensure you're getting the current token
    const token = rootStore.profileStore.currentUserToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // debug
    // const refresh_token = await api.get("/check-cookie");
    // console.log(refresh_token);
    // alert(currentUserToken);

    const originalRequest = error.config;

    // the following code prevents the attempt to refresh
    // the token upon wrong credentials being provided;

    if (
      originalRequest.url?.includes("/users/token") || // login endpoint
      originalRequest.url?.includes("/users/refresh-token")
    ) {
      // Just reject, do not refresh token here
      return Promise.reject(error);
    }

    // If error is 401 and we haven't already retried
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      // const userRefreshToken = rootStore.profileStore.currentUserRefreshToken;

      // if (userRefreshToken) {
      try {
        const newAccessToken = await refreshToken();
        setCurrentUserToken(newAccessToken);
        alert(rootStore.profileStore.currentUserToken);

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
        // window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
      // }
    }

    return Promise.reject(error);
  }
);

export default api;
