// client/src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { SEOContentProvider } from "./context/SEOContentContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SEOContentProvider>
        <App />
      </SEOContentProvider>
    </AuthProvider>
  </React.StrictMode>
);
