import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    exclude: ["tests/e2e/**/*", "node_modules/**/*"],
    onConsoleLog: (log) => {
      if (log.includes("act(...)")) return false;
      if (log.includes("wrap-tests-with-act")) return false;
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        ".astro/",
        "**/*.config.*",
        "**/tests/**",
      ],
    },
  },
});
