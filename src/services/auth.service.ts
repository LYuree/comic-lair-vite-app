import axios from "axios";
import { rootStore } from "../store";

const API_URL = "http://127.0.0.1:8000/";

// регистрация
export const register = (id: string, username: string, email: string, password: string) => {
  return axios.post(API_URL + "users", {
    id,
    username,
    email,
    password,
  });
};

// авторизация
export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// выход из аккаунта
export const logout = () => {
  // localStorage.removeItem("user");
  const {
    profileStore: { setCurrentUserToken }
  } = rootStore;
  setCurrentUserToken(null);
};

// взять данные о пользователе (включая токен) из localStorage
// (вроде как, используется только на странице профиля)
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
