import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import dotenv from "dotenv";
import path from "path";

// https://vite.dev/config/
export default defineConfig(() => {
  // Load environment variables from .env file
  dotenv.config({ path: path.resolve(__dirname, "../.env") });

  // Get API port from environment
  const apiPort = process.env.API_PORT;
  console.log(`API Port: ${apiPort}`);

  return {
    plugins: [react()],
    css: {},
    resolve: {
      alias: {
        "@my-blog/common": fileURLToPath(
          new URL("../packages/common/src", import.meta.url)
        ),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: `http://localhost:${apiPort}`,
          changeOrigin: true,
        },
      },
    },
  };
});
