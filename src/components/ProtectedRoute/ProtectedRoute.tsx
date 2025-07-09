import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { rootStore } from "../../store";
// import axios from "axios";
import api from "../../services/api";

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();

  const {
    profileStore: {
      currentUserToken,
      // setCurrentUserToken,
      // setCurrentUser
    },
  } = rootStore;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await api.get("/verify-token", {
          // headers: {
          //   Authorization: `Bearer ${currentUserToken}`,
          // },
          withCredentials: true,
        });

        // Check if the response indicates a failure (e.g., status code not in the 200 range)
        if (response.status !== 200) {
          throw new Error("Token verification failed");
        }
      } catch (error) {
        // Handle error: clear user data and navigate to sign-in

        // setCurrentUser(null);
        // setCurrentUserToken(null);
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
