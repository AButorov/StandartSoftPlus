import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://abutorov.github.io",
  base: "/",

  server: {
    host: "0.0.0.0",
    port: 4321,
  },

  integrations: [react(), tailwind()],

  vite: {
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
