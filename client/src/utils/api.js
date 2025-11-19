// client/src/utils/api.js
import axios from "axios";

let accessToken = null;
let isRefreshing = false;
let refreshQueue = [];

// call this from AuthContext after login
export function setAccessToken(token) {
  accessToken = token;
  // Also store in localStorage for persistence
  if (token) {
    localStorage.setItem("venus_token", token);
  }
}

// call on logout
export function clearAccessToken() {
  accessToken = null;
  // Clear from localStorage
  localStorage.removeItem("venus_token");
}

// Initialize token from localStorage on app start
export function initializeTokenFromStorage() {
  try {
    const savedToken = localStorage.getItem("venus_token");
    if (savedToken) {
      accessToken = savedToken;
      return savedToken;
    }
  } catch (error) {
    console.error("[API] Error loading token from storage:", error);
    localStorage.removeItem("venus_token");
  }
  return null;
}

function processQueue(err, token = null) {
  refreshQueue.forEach((p) => (err ? p.reject(err) : p.resolve(token)));
  refreshQueue = [];
}

// Cloud Run Backend URL - ONLY source of truth
const CLOUD_RUN_BACKEND = 'https://venus-backend-841304788329.asia-south1.run.app';

// Resolve API URL from environment variable or use Cloud Run backend
// In development, allow localhost if explicitly set, otherwise use Cloud Run
const RUNTIME_API = 
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env && process.env.VITE_API_URL);

// Determine API URL - ONLY use Cloud Run backend or explicit VITE_API_URL
let API_URL;
if (RUNTIME_API) {
  // Use explicit VITE_API_URL if set
  API_URL = RUNTIME_API;
  console.log('[API] Using VITE_API_URL:', API_URL);
} else {
  // Default to Cloud Run backend (ONLY allowed backend)
  API_URL = CLOUD_RUN_BACKEND;
  console.log('[API] Using Cloud Run backend:', API_URL);
  
  // Warn if in production and VITE_API_URL is not set
  const isProduction = typeof process !== "undefined" && process.env.NODE_ENV === 'production';
  if (isProduction) {
    console.warn(
      '[API] VITE_API_URL not set. Using Cloud Run backend:',
      CLOUD_RUN_BACKEND,
      '\nTo customize, set VITE_API_URL environment variable.'
    );
  }
}

// Ensure baseURL ends without trailing slash and points to /api
const API_BASE = API_URL.replace(/\/$/, "") + "/api";

if (typeof process !== "undefined" && process.env.NODE_ENV === 'development') {
  console.log("[API] Runtime API URL:", API_URL);
  console.log("[API] Final API Base:", API_BASE);
}

const API = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // send cookies (refresh token) on refresh requests
  headers: {
    "Content-Type": "application/json",
  },
});

// attach access token to outgoing requests
API.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  
  // Log API requests (especially for content endpoints)
  if (config.url?.includes('/content')) {
    const timestamp = new Date().toISOString();
    console.log(`[API Request] [${timestamp}] ${config.method?.toUpperCase()} ${config.url}`, {
      baseURL: config.baseURL,
      data: config.data ? (typeof config.data === 'string' ? config.data.substring(0, 100) : JSON.stringify(config.data).substring(0, 100)) : undefined
    });
  }
  
  return config;
});

// response interceptor: handle 401 by attempting refresh
API.interceptors.response.use(
  (res) => {
    // Log API responses (especially for content endpoints)
    if (res.config?.url?.includes('/content')) {
      const timestamp = new Date().toISOString();
      console.log(`[API Response] [${timestamp}] ${res.config.method?.toUpperCase()} ${res.config.url} - Status: ${res.status}`, {
        success: res.data?.success,
        message: res.data?.message
      });
    }
    return res;
  },
  async (error) => {
    const original = error.config;
    if (!original || original._retry) return Promise.reject(error);

    if (error.response && error.response.status === 401) {
      original._retry = true;

      if (isRefreshing) {
        // queue requests while a refresh is in progress
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: (token) => {
              original.headers.Authorization = `Bearer ${token}`;
              resolve(API(original));
            },
            reject,
          });
        });
      }

      isRefreshing = true;
      try {
        // use the API instance (so baseURL and withCredentials apply)
        const resp = await API.post("/auth/refresh", {}, { withCredentials: true });
        const newAccess = resp.data?.accessToken;
        if (!newAccess) throw new Error("No access token returned from refresh");

        setAccessToken(newAccess);
        processQueue(null, newAccess);

        original.headers.Authorization = `Bearer ${newAccess}`;
        return API(original);
      } catch (e) {
        console.error("[API] Refresh token failed:", e.message);
        processQueue(e, null);
        clearAccessToken();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;
