// components/ProtectedRoute.tsx
import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { rootStore } from "../../store";
import api from "../../services/api";
import { observer } from "mobx-react";

const ProtectedRoute: React.FC = observer(() => {
  const navigate = useNavigate();
  const profileStore = rootStore.profileStore;
  const [token, setToken] = React.useState(profileStore.currentUserToken);

  useEffect(() => {
    setToken(profileStore.currentUserToken);
    const verifyToken = async () => {
      try {
        await api.get("verify-token");
      } catch (error) {
        console.error("Token verification failed:", error);
        navigate("/signin");
      }
    };
    verifyToken();
  }, [navigate, profileStore.currentUserToken]);

  return token ? <Outlet /> : <Navigate to="/signin" />;
});

export default ProtectedRoute;
