import axios from "axios";
import { refreshToken } from "./auth.service";
import { rootStore } from "../store";
import { jwtDecode } from "jwt-decode";

import type { JwtPayload } from "jsonwebtoken";
// import { API_URL } from "../utils/API_URL";
const API_URL = import.meta.env.VITE_API_URL;

export interface MyJwtPayload extends JwtPayload {
  id: string;
  role: string;
  sub: string;
}

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const {
  profileStore: { setCurrentUserToken, setCurrentUserRefreshToken },
} = rootStore;

api.interceptors.request.use(
  (config) => {
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
      try {
        const newAccessToken = await refreshToken();
        setCurrentUserToken(newAccessToken);
        const decoded = jwtDecode<MyJwtPayload>(newAccessToken);
        rootStore.profileStore.setCurrentUser({
          id: decoded.id,
          role: decoded.role,
          sub: decoded.sub,
        });
        // alert(rootStore.profileStore.currentUserToken);

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
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
