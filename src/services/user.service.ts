import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

export const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

// ===============================================================
// в оригинальном проекте авторизации JWT использовалось для
// запроса контента домашней страницы (теперь не нужно?):

// export const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };

// ===============================================================
// на будущее:

// export const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod", { headers: authHeader() });
// };

// export const getAdminBoard = () => {
//   return axios.get(API_URL + "admin", { headers: authHeader() });
// };
