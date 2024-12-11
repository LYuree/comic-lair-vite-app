import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "http://backend.example/api/auth/";

// регистрация
export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "signup", {
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
  localStorage.removeItem("user");
};

// взять данные о пользователе (включая токен) из localStorage
// (вроде как, используется только на странице профиля)
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  console.log(userStr);
  if (userStr) return JSON.parse(userStr);

  return null;
};
