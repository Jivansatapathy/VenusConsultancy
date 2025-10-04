// Production Configuration for Venus Hiring Application
export const productionConfig = {
  // API Configuration
  api: {
    baseURL: process.env.VITE_API_URL || 'https://your-production-api.com',
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
