import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { rootStore } from "../../store";
import api from "../../services/api";

const API_URL = "http://localhost:8000/";

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();

  const {
    profileStore: { currentUserToken },
  } = rootStore;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // token is sent in the Authorization header
        const response = await api.get(`${API_URL}verify-token`, {
          withCredentials: true,
        });

        // Check if the response indicates a failure (e.g., status code not in the 200 range)
        if (response.status !== 200) {
          throw new Error("Token verification failed");
        }
      } catch (error) {
        // Handle error: navigate to sign-in
        // (the user state data is cleared by the api)
        navigate("/signin");
      }
    };

    verifyToken();
  }, []);

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to signin page
  return currentUserToken ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
