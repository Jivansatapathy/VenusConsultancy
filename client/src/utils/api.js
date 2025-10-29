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

// Resolve runtime API base from environment (cover Vite and NEXT_PUBLIC usage)
const RUNTIME_API =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_URL) ||
  (typeof process !== "undefined" && process.env.NODE_ENV === 'development' ? "http://localhost:5000" : null);

// Provide fallback for production if VITE_API_URL is not set
let API_URL = RUNTIME_API;
if (!API_URL) {
  // Try to detect if we're in production and provide a reasonable fallback
  const isProduction = typeof process !== "undefined" && process.env.NODE_ENV === 'production';
  if (isProduction) {
    // Common production API URLs - you can customize these
    const possibleUrls = [
      'https://venusconsultancy.onrender.com',
      'https://venus-hiring-api.herokuapp.com',
      'https://api.venushiring.com'
    ];
    
    // Use the first available URL or show a helpful error
    API_URL = possibleUrls[0];
    
    console.warn(
      'VITE_API_URL not set in production. Using fallback:', API_URL,
      '\nTo fix this permanently, set VITE_API_URL environment variable to your production API domain.'
    );
  } else {
    // Development fallback
    API_URL = "http://localhost:5000";
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
  return config;
});

// response interceptor: handle 401 by attempting refresh
API.interceptors.response.use(
  (res) => res,
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
