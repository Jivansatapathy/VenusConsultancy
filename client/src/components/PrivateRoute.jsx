// client/src/components/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children, allowedRoles = ["admin", "recruiter"] }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div style={{ padding: 32, textAlign: "center" }}>Checking session…</div>;
  }

  if (!user) {
    // not logged in
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // logged in but wrong role
    return <div style={{ padding: 32, textAlign: "center" }}>403 — Forbidden</div>;
  }

  return children;
}
