import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { rootStore } from "../../store";
import api from "../../services/api";
import { observer } from "mobx-react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const ProtectedRoute: React.FC = observer(() => {
  const profileStore = rootStore.profileStore;
  const navigate = useNavigate();

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
