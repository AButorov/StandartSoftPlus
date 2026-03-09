// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://standartsoftplus.com",
  base: "/",
  trailingSlash: "always",

  server: {
    host: "0.0.0.0",
    port: 4321,
  },

  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes("/resources/documents"),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
      },
      hmr: {
        clientPort: 4321,
      },
    },
  },
});
