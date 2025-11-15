'use client';

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children, allowedRoles = ["admin", "recruiter"] }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  if (loading) {
    return <div style={{ padding: 32, textAlign: "center" }}>Checking session…</div>;
  }

  if (!user) {
    // not logged in
    router.push("/admin/login");
    return <div style={{ padding: 32, textAlign: "center" }}>Redirecting to login…</div>;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // logged in but wrong role
    return <div style={{ padding: 32, textAlign: "center" }}>403 — Forbidden</div>;
  }

  return children;
}
