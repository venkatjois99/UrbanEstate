import React from 'react';
import { Navigate } from 'react-router-dom';
import { getTokenData } from './jwt'; // Adjust the import path as necessary
import { AppDispatch } from "../store/myAppStore";
import { logout } from "../RentalServices/Slicer/user/userSlicer";
import { useDispatch } from "react-redux";

interface ProtectedRouteProps {
  requiredRoles: Array<'admin' | 'owner' | 'tenant'>;
  component: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRoles, component: Component }) => {
  const token = localStorage.getItem('token');
  const tokenData = getTokenData(token);
  const dispatch = useDispatch<AppDispatch>();

  if (!tokenData || tokenData.exp * 1000 < Date.now()) {
    // Show toast notification when the token is missing or expired
    dispatch(logout());
    localStorage.removeItem("token");
    return <Navigate to="/loginExpired" replace />; // Redirect if token is missing or expired
  }

  if (!requiredRoles.includes(tokenData.role as 'admin' | 'owner' | 'tenant')) {
    return <Navigate to="/unauthorized" replace />; // Redirect if role doesn’t match
  }

  return <>{Component}</>; // Render nested routes if authorized
};

export default ProtectedRoute;
