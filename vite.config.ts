import { defineConfig, loadEnv } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiKey = env.PROXY_API_KEY ?? env.API_KEY ?? env.API_Key;
  const proxyHeaders = apiKey ? { "X-API-Key": apiKey } : undefined;

  return {
    plugins: [
      devtools(),
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
      }),
      viteReact(),
      tailwindcss(),
    ],
    server: {
      proxy: {
        "/api": {
          target: "https://back-end-main-2fian7.laravel.cloud/api/v2",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          cookieDomainRewrite: "localhost",
          headers: proxyHeaders,
        },
      },
    },
    preview: {
      proxy: {
        "/api": {
          target: "https://back-end-main-2fian7.laravel.cloud/api/v2",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          cookieDomainRewrite: "localhost",
          headers: proxyHeaders,
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
