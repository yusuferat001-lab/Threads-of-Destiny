import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: "./tests/globalSetup.ts",
    env: {
      DATABASE_URL: "file:./test.db",
    },
    testTimeout: 30000,
    hookTimeout: 30000,
  },
});
