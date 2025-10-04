import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          
          // Animation libraries
          'vendor-animations': ['gsap', 'framer-motion'],
          
          // UI libraries
          'vendor-icons': ['lucide-react', '@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons', '@fortawesome/fontawesome-svg-core'],
          
          // Utilities
          'vendor-utils': ['axios']
        }
      }
    }
  }
});
