import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://abutorov.github.io",
  base: "/001_StandartSoftPlus/",

  integrations: [react(), tailwind()],
});
