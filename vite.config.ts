// // vite.config.ts
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 8080, // Explains why it’s on 8080
//   },
// });

// vite.config.ts
// vite.config.ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      "/agent": {
        target: "https://opulent-tribble-vw7qxp454q73xwrq-3000.app.github.dev",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/agent/, "/agent"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});