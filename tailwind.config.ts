import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Цветовая палитра StandartSoft
        brand: {
          primary: "#3d1139",
          secondary: "#e51c27",
          accent1: "#751433",
          accent2: "#ad182d",
          bg: "#fcfcfc",
        },
      },
      fontFamily: {
        // Шрифты бренда
        heading: ["Montserrat", "sans-serif"],
        body: ["Roboto Condensed", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "brand-h1": "3.5rem",
        "brand-h2": "2.5rem",
        "brand-h3": "1.875rem",
        "brand-slogan": "1.125rem",
      },
      letterSpacing: {
        brand: "0.03em",
        "brand-wide": "0.04em",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(90deg, #3d1139 0%, #3d1139 66%, #e51c27 67%, #e51c27 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
