import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { rootStore } from "../store";
import { jwtDecode } from "jwt-decode";
import IUser from "../types/user.type";
import api from "../services/api";
import { API_URL } from "../utils/API_URL";
const SignIn: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    profileStore: { setCurrentUser, setCurrentUserToken },
  } = rootStore;

  const validateForm = () => {
    if (!userName || !passWord) {
      setError("Username and password are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return; // Ensure the form is validated
    setLoading(true);

    const formDetails = new URLSearchParams();
    formDetails.append("username", userName);
    formDetails.append("password", passWord);

    try {
      const response = await api.post(`${API_URL}/users/token`, formDetails, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const { access_token } = response.data;
      setLoading(false);
      const userPayload: any = jwtDecode(access_token);
      const user: IUser = {
        sub: userPayload.sub,
        id: userPayload.id,
        role: userPayload.role,
      };
      setCurrentUser(user);
      setCurrentUserToken(access_token);
      console.log(`Login successful`);
      navigate("/profile");
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401) {
          setError("Invalid username or password.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-232px)] flex items-center justify-center mt-12">
      <div className="bg-white p-8 lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent md shadow-sm text-sm font-medium text-white bg-[#bd0000] hover:bg-[maroon]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link to={"/signup"} className="text-[maroon] hover:underline">
              Зарегистрироваться
            </Link>
            <span className="mx-2">|</span>
            <Link to={"*"} className="text-[maroon] hover:underline">
              Восстановить пароль
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
