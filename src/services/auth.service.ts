import axios from "axios";
import { rootStore } from "../store";
import { API_URL } from "../utils/API_URL";

// const API_URL = "http://localhost:8000/";

// const {
//   profileStore: { currentUser },
// } = rootStore;

// регистрация
export const register = (
  id: string,
  username: string,
  email: string,
  password: string,
  active: boolean,
  role: string
) => {
  return axios.post(API_URL + "/users/", {
    id: id,
    username,
    email,
    password,
    active,
    role,
  });
};

// выход из аккаунта
export const logout = () => {
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

export const refreshToken = async (): Promise<string> => {
  try {
    const response = await axios.get(`${API_URL}/users/refresh-token`, {
      withCredentials: true,
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Refresh token failed:", error);
    throw error;
  }
};
