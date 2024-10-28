import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getTokenData } from './jwt'; // Adjust the import path as necessary

interface ProtectedRouteProps {
  requiredRole: 'admin' | 'owner' | 'tenant';
 
}
 
 
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const token = localStorage.getItem('token');
  const tokenData = getTokenData(token);
 
  if (!tokenData || tokenData.exp * 1000 < Date.now()) {
    return <Navigate to="/" replace />; // Redirect if token is missing or expired
  }
 
  if (tokenData.role !== requiredRole) {    return <Navigate to="/unauthorized" replace />; // Redirect if role doesn’t match
  }
 
  return <Outlet />; // Render nested routes if authorized
};
 
export default ProtectedRoute;