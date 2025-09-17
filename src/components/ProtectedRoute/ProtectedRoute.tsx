import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { rootStore } from "../../store";
import { observer } from "mobx-react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
// import api from "../../services/api";

const ProtectedRoute: React.FC = observer(() => {
  const profileStore = rootStore.profileStore;

  if (!profileStore.authChecked) return <LoadingScreen />;

  return profileStore.currentUserToken ? <Outlet /> : <Navigate to="/signin" />;
});

export default ProtectedRoute;
