import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [
      react(),
      // Only show visualizer in production or when explicitly requested
      ...(isProduction || process.env.VITE_BUNDLE_ANALYZER === 'true' ? [
        visualizer({
          filename: "dist/stats.html",
          open: false, // Don't auto-open in production
          gzipSize: true,
          brotliSize: true,
          template: 'treemap' // Better visualization
        })
      ] : [])
    ],
    server: {
      port: 5173,
      open: !isProduction, // Don't auto-open in production
      host: true, // Allow external connections
      cors: true
    },
    build: {
      outDir: "dist",
      sourcemap: isProduction ? false : true, // No sourcemaps in production
      minify: 'terser', // Better minification
      terserOptions: {
        compress: {
          drop_console: isProduction, // Remove console.log in production
          drop_debugger: isProduction
        }
      },
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
          },
          // Optimize chunk naming for better caching
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop().replace('.jsx', '').replace('.js', '') : 'chunk';
            return `assets/${facadeModuleId}-[hash].js`;
          },
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      },
      // Production optimizations
      chunkSizeWarningLimit: 500,
      target: 'es2015', // Better browser support
      cssCodeSplit: true, // Split CSS for better caching
      reportCompressedSize: true
    },
    // Environment variables
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString())
    }
  };
});
