// Production Configuration for Venus Hiring Application
// 
// IMPORTANT: This configuration requires VITE_API_URL to be set in your production environment.
// The insecure fallback URL has been removed to prevent 404 errors from broken domains.
//
// To set up your production environment:
// 1. Set VITE_API_URL environment variable to your production API domain
// 2. If using Render free tier, upgrade to paid plan or migrate to dedicated infrastructure
// 3. Ensure your API domain is accessible and properly configured
//
// Example: VITE_API_URL=https://your-production-api.com
export const productionConfig = {
  // API Configuration
  api: {
    baseURL: (() => {
      const apiUrl = process.env.VITE_API_URL;
      if (!apiUrl) {
        console.warn(
          'VITE_API_URL environment variable not set. Using fallback URL.',
          'To fix this, set VITE_API_URL to your production API domain.'
        );
        // Provide a fallback URL instead of throwing an error
        return 'https://venusconsultancy.onrender.com';
      }
      return apiUrl;
    })(),
    timeout: 30000,
    retries: 3
  },
  
  // Security Configuration
  security: {
    secureCookies: true,
    httpsOnly: true,
    tokenExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    refreshTokenExpiry: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
  },
  
  // Performance Configuration
  performance: {
    bundleAnalyzer: true,
    chunkSizeWarningLimit: 500,
    enableGzip: true,
    enableBrotli: true
  },
  
  // Application Configuration
  app: {
    name: 'Venus Hiring',
    version: '1.0.0',
    environment: 'production',
    debug: false
  },
  
  // Feature Flags
  features: {
    persistentLogin: true,
    lazyLoading: true,
    bundleOptimization: true,
    analytics: true
  }
};

export default productionConfig;
