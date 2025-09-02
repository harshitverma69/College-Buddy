import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL, // Your backend server address
        changeOrigin: true,
        ws: true,
        secure: false, // If your backend is HTTPS, set this to true
        // Add this to handle cookies correctly across domains
        cookieDomainRewrite: {
          "*": "" // Rewrites cookie domain to match the frontend domain
        },
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Vite Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Vite Proxy: Sending request to target:', proxyReq.method, proxyReq.host, proxyReq.path);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Vite Proxy: Received response from target:', proxyRes.statusCode, req.url);
          });
        },
        logLevel: 'debug'
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
}));
