import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    // Nếu không có accessToken, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" replace />;
  }

  // Nếu có accessToken, hiển thị children component
  return <Outlet />;
};

export default ProtectedRoute;
