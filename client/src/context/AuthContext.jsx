// client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from "react";
import API, { setAccessToken, clearAccessToken, initializeTokenFromStorage } from "../utils/api";

export const AuthContext = createContext();

// Storage keys for persistence
const STORAGE_KEYS = {
  USER: "venus_user",
  TOKEN: "venus_token",
  LAST_LOGIN: "venus_last_login"
};

/*
  Enhanced AuthProvider with persistent login:
  - Stores user data and token in localStorage
  - Maintains login state across page refreshes
  - Handles token expiration gracefully
  - Provides secure logout functionality
*/
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // while doing initial refresh check

  // Helper function to save user data to localStorage
  const saveUserToStorage = useCallback((userData) => {
    if (userData) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      localStorage.setItem(STORAGE_KEYS.LAST_LOGIN, new Date().toISOString());
    }
  }, []);

  // Helper function to clear user data from localStorage
  const clearUserFromStorage = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.LAST_LOGIN);
  }, []);

  // Helper function to restore user from localStorage
  const restoreUserFromStorage = useCallback(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
      const lastLogin = localStorage.getItem(STORAGE_KEYS.LAST_LOGIN);
      
      if (savedUser && savedToken) {
        // Check if login is not too old (optional: 7 days max)
        if (lastLogin) {
          const loginDate = new Date(lastLogin);
          const now = new Date();
          const daysDiff = (now - loginDate) / (1000 * 60 * 60 * 24);
          
          if (daysDiff > 7) {
            // Login too old, clear storage
            clearUserFromStorage();
            return null;
          }
        }
        
        const userData = JSON.parse(savedUser);
        setAccessToken(savedToken);
        return userData;
      }
    } catch (error) {
      console.error("[AuthContext] Error restoring user from storage:", error);
      clearUserFromStorage();
    }
    return null;
  }, [clearUserFromStorage]);

  // on mount, try to restore session from localStorage or refresh token
  useEffect(() => {
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        console.log("[AuthContext] Initializing authentication...");
        
        // Initialize token from localStorage first
        const savedToken = initializeTokenFromStorage();
        
        // First, try to restore from localStorage
        const savedUser = restoreUserFromStorage();
        if (savedUser && savedToken) {
          console.log("[AuthContext] User and token restored from localStorage");
          setUser(savedUser);
          setLoading(false);
          return;
        }
        
        // If no saved user/token, try refresh token
        console.log("[AuthContext] Attempting refresh token...");
        const resp = await API.post("/auth/refresh");
        console.log("[AuthContext] Refresh response:", resp.data);
        
        if (resp?.data?.accessToken) {
          setAccessToken(resp.data.accessToken);
          
          // Set user from refresh response or try localStorage
          if (resp.data.user) {
            setUser(resp.data.user);
            saveUserToStorage(resp.data.user);
          } else {
            // Try to restore user from localStorage
            const restoredUser = restoreUserFromStorage();
            if (restoredUser) {
              setUser(restoredUser);
            }
          }
        }
        
        if (mounted) setLoading(false);
      } catch (err) {
        // no session or refresh failed
        console.log("[AuthContext] No valid session found:", err.message);
        console.log("[AuthContext] Error details:", err.response?.data);
        clearAccessToken();
        setUser(null);
        clearUserFromStorage();
        if (mounted) setLoading(false);
      }
    };

    initializeAuth();
    
    return () => {
      mounted = false;
    };
  }, [restoreUserFromStorage, saveUserToStorage, clearUserFromStorage]);

  const login = useCallback(async ({ email, password, userType = "admin" }) => {
    try {
      const resp = await API.post("/auth/login", { email, password, userType });
      const { accessToken, user: userObj } = resp.data;
      
      // Set token and user
      setAccessToken(accessToken);
      setUser(userObj || null);
      
      // Store in localStorage for persistence
      if (userObj) {
        saveUserToStorage(userObj);
        localStorage.setItem(STORAGE_KEYS.TOKEN, accessToken);
      }
      
      console.log("[AuthContext] Login successful, user persisted");
      return resp.data;
    } catch (error) {
      console.error("[AuthContext] Login failed:", error);
      throw error;
    }
  }, [saveUserToStorage]);

  const logout = useCallback(async () => {
    console.log("[AuthContext] Logging out...");
    
    // Immediately clear all authentication data for instant logout
    clearAccessToken();
    setUser(null);
    clearUserFromStorage();
    console.log("[AuthContext] User logged out and data cleared instantly");
    
    // Try to notify server in background (non-blocking)
    try {
      // Set a 5-second timeout for the logout request
      const logoutPromise = API.post("/auth/logout");
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Logout timeout')), 5000)
      );
      
      await Promise.race([logoutPromise, timeoutPromise]);
      console.log("[AuthContext] Server logout successful");
    } catch (err) {
      // ignore network errors and timeouts on logout
      console.warn("[AuthContext] Server logout failed or timed out (ignored):", err.message);
    }
  }, [clearUserFromStorage]);

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
