// client/src/utils/api.js
import axios from "axios";

let accessToken = null;
let isRefreshing = false;
let refreshQueue = [];

// call this from AuthContext after login
export function setAccessToken(token) {
  accessToken = token;
}

// call on logout
export function clearAccessToken() {
  accessToken = null;
}

function processQueue(err, token = null) {
  refreshQueue.forEach((p) => (err ? p.reject(err) : p.resolve(token)));
  refreshQueue = [];
}

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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
        // call /auth/refresh — cookie will be sent because withCredentials: true
        const resp = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true, headers: { "Content-Type": "application/json" } }
        );
        const newAccess = resp.data.accessToken;
        if (!newAccess) throw new Error("No access token returned from refresh");

        setAccessToken(newAccess);
        processQueue(null, newAccess);

        original.headers.Authorization = `Bearer ${newAccess}`;
        return API(original);
      } catch (e) {
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
