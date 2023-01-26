import { Navigate } from "react-router-dom";
import React from "react";
type PropType = {
  children?: React.ReactNode;
};

const ProtectedRoute: React.FC<PropType> = ({ children }) => {
  const isAuthorized = sessionStorage.getItem("isAuth");

  if (isAuthorized !== "pass") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
