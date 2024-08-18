import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
    proxy: {
      // "/api": "http://192.168.99.101:8000"
      "/api": "http://localhost:8000",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      components: "/src/components",
      hooks: "/src/hooks",
      interfaces: "/src/interfaces",
      pages: "/src/pages",
      urls: "/src/urls",
      assets: "/src/assets",
      services: "/src/services",
      data: "/src/data"
    },
  },
});
