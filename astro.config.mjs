import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://abutorov.github.io",
  base: "/001_StandartSoftPlus/",

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
