import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../services/adminAuthService';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const authed = isAuthenticated();

  if (!authed) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
