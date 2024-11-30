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
    // proxy: {
    //   // "/api": "http://192.168.99.101:8000",
    //   "/api": {
    //     target: "http://localhost:8000",
    //     changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   }
    // },
  },
  plugins: [react()],
  resolve: {
    alias: {
      pages: "/src/pages",
      assets: "/src/assets",
      shared: "/src/shared",
      app: "/src/app",
      widgets: "/src/widgets",
      features: "/src/features",
      entities: "/src/entities",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },
});
