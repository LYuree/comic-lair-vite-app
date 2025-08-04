import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { rootStore } from "../../store";
import { observer } from "mobx-react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import api from "../../services/api";

const ProtectedRoute: React.FC = observer(() => {
  const navigate = useNavigate();

  const profileStore = rootStore.profileStore;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get("verify-token");
      } catch (error) {
        console.error("Token verification failed:", error);
        // Optionally clear token here
      } finally {
        profileStore.setAuthChecked(true);
      }
    };

    if (!profileStore.authChecked) {
      verifyToken();
    }
  }, [profileStore, navigate]);

  if (!profileStore.authChecked) {
    // Show loading spinner or nothing until auth check completes
    return <LoadingScreen />;
  }

  return profileStore.currentUserToken ? <Outlet /> : <Navigate to="/signin" />;
});

export default ProtectedRoute;
