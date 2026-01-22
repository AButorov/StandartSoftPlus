// astro.config.dev.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "http://localhost:4321",
  base: "/",

  server: {
    host: "0.0.0.0",
    port: 4321,
  },

  integrations: [react()],

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
