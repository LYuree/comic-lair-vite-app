import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

// использовать в ProfilePage.tsx?
export const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader(), withCredentials: true });
};

// ===============================================================
// в оригинальном проекте авторизации JWT использовалось для
// запроса контента домашней страницы (теперь не нужно?):

// export const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };

// ===============================================================
// на будущее:

export const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader(), withCredentials: true });
};

export const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader(), withCredentials: true });
};
