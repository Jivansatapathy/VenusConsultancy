// client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from "react";
import API, { setAccessToken, clearAccessToken } from "../utils/api";

export const AuthContext = createContext();

/*
  AuthProvider responsibilities:
  - login(email,password,userType) -> calls /api/auth/login, stores in-memory access token & user
  - logout() -> calls /api/auth/logout, clears token & user
  - on mount, optionally call refresh to grab access token if cookie present (silent login)
*/
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // while doing initial refresh check

  // on mount, try silent refresh to restore session (if refresh cookie exists)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await API.post("/auth/refresh"); // API has withCredentials true
        if (resp?.data?.accessToken) {
          setAccessToken(resp.data.accessToken);
          // optional: parse token to get user info or call /auth/me if available
          // we rely on login response to set user; here we simply set a minimal flag.
          // You could call /api/admin/me if you implement it.
        }
        if (mounted) setLoading(false);
      } catch (err) {
        // no session or refresh failed
        clearAccessToken();
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(async ({ email, password, userType = "admin" }) => {
    const resp = await API.post("/auth/login", { email, password, userType });
    const { accessToken, user: userObj } = resp.data;
    setAccessToken(accessToken);
    setUser(userObj || null);
    
    // Store user in localStorage for persistence
    if (userObj) {
      localStorage.setItem("user", JSON.stringify(userObj));
    }
    
    return resp.data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      // ignore network errors on logout
      console.warn("logout error", err);
    } finally {
      clearAccessToken();
      setUser(null);
      localStorage.removeItem("user");
    }
  }, []);

  const value = {
    user,
    setUser,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
