import axios from "axios";
import { rootStore } from "../store";

// const API_URL = "http://127.0.0.1:8000/";
const API_URL = "http://localhost:8000/";

// регистрация
export const register = (
  id: string,
  username: string,
  email: string,
  password: string,
  active: boolean,
  role: string
) => {
  return axios.post(API_URL + "users/", {
    id: id,
    username,
    email,
    password,
    active,
    role,
  });
};

// авторизация
// export const login = (username: string, password: string) => {
//   return axios
//     .post(API_URL + "signin", {
//       username,
//       password,
//     })
//     .then((response) => {
//       if (response.data.accessToken) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }

//       return response.data;
//     });
// };

// выход из аккаунта
export const logout = () => {
  // localStorage.removeItem("user");
  const {
    profileStore: { setCurrentUserToken },
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

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export const login = async (
  username: string,
  password: string
): Promise<TokenResponse> => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const response = await axios.post<TokenResponse>(
    `${API_URL}/users/token`,
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};

// export const refreshToken = async (refreshToken: string): Promise<string> => {
//   const response = await axios.post<{ access_token: string }>(
//     `${API_URL}/users/refresh-token`,
//     { refresh_token: refreshToken }
//   );

//   return response.data.access_token;
// };

export const refreshToken = async (): Promise<string> => {
  const response = await axios.get(`${API_URL}users/refresh-token`, {
    withCredentials: true, // ensures cookies are sent
  });
  return response.data.access_token;
};
