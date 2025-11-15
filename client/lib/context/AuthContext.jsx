// client/src/context/AuthContext.jsx
'use client';
import React, { createContext, useState, useEffect, useCallback } from "react";
import API, { setAccessToken, clearAccessToken, initializeTokenFromStorage } from "@/lib/utils/api";

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
    let isInitialized = false;
    
    const initializeAuth = async () => {
      // Prevent double initialization in React StrictMode
      if (isInitialized) return;
      isInitialized = true;
      
      try {
        if (process.env.NODE_ENV === 'development') {
          console.log("[AuthContext] Initializing authentication...");
        }
        
        // Initialize token from localStorage first
        const savedToken = initializeTokenFromStorage();
        
        // First, try to restore from localStorage
        const savedUser = restoreUserFromStorage();
        if (savedUser && savedToken) {
          if (process.env.NODE_ENV === 'development') {
            console.log("[AuthContext] User and token restored from localStorage");
          }
          if (mounted) {
            setUser(savedUser);
            setLoading(false);
          }
          return;
        }
        
        // If no saved user/token, try refresh token
        if (process.env.NODE_ENV === 'development') {
          console.log("[AuthContext] Attempting refresh token...");
        }
        
        try {
          const resp = await API.post("/auth/refresh");
          
          if (resp?.data?.accessToken) {
            setAccessToken(resp.data.accessToken);
            
            // Set user from refresh response or try localStorage
            if (resp.data.user) {
              if (mounted) {
                setUser(resp.data.user);
              }
              saveUserToStorage(resp.data.user);
            } else {
              // Try to restore user from localStorage
              const restoredUser = restoreUserFromStorage();
              if (restoredUser && mounted) {
                setUser(restoredUser);
              }
            }
          }
          
          if (mounted) setLoading(false);
        } catch (refreshError) {
          // Handle network errors gracefully (backend might not be running)
          const isNetworkError = 
            refreshError.code === 'ERR_NETWORK' || 
            refreshError.message?.includes('Network Error') ||
            refreshError.message?.includes('ERR_CONNECTION_REFUSED') ||
            (refreshError.request && !refreshError.response);
            
          if (isNetworkError) {
            // Backend not available - silently fail and use localStorage if available
            if (mounted) {
              setLoading(false);
            }
            return;
          }
          throw refreshError;
        }
      } catch (err) {
        // no session or refresh failed
        if (process.env.NODE_ENV === 'development') {
          // Only log non-network errors
          if (err.code !== 'ERR_NETWORK' && !err.message?.includes('Network Error')) {
            console.log("[AuthContext] No valid session found:", err.message);
          }
        }
        clearAccessToken();
        if (mounted) {
          setUser(null);
          setLoading(false);
        }
        clearUserFromStorage();
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
      
      if (process.env.NODE_ENV === 'development') {
        console.log("[AuthContext] Login successful, user persisted");
      }
      return resp.data;
    } catch (error) {
      console.error("[AuthContext] Login failed:", error);
      throw error;
    }
  }, [saveUserToStorage]);

  const logout = useCallback(async () => {
    if (process.env.NODE_ENV === 'development') {
      console.log("[AuthContext] Logging out...");
    }
    
    // Immediately clear all authentication data for instant logout
    clearAccessToken();
    setUser(null);
    clearUserFromStorage();
    
    // Try to notify server in background (non-blocking)
    try {
      // Set a 5-second timeout for the logout request
      const logoutPromise = API.post("/auth/logout");
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Logout timeout')), 5000)
      );
      
      await Promise.race([logoutPromise, timeoutPromise]);
      if (process.env.NODE_ENV === 'development') {
        console.log("[AuthContext] Server logout successful");
      }
    } catch (err) {
      // ignore network errors and timeouts on logout (silently fail)
      if (process.env.NODE_ENV === 'development' && err.message !== 'Logout timeout') {
        console.warn("[AuthContext] Server logout failed (ignored):", err.message);
      }
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
