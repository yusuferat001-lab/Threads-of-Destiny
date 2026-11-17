import { defineConfig } from '@playwright/test';

/**
 * Duman testleri: derlenmiş istemci (client -> server/public) + bellek-içi sunucu (npm run dev:bellek,
 * PostgreSQL gerekmez) tek porttan (3001) servis edilir. İki proje: PC ve mobil.
 * Çalıştırma: (1) cd client && npm run build  (2) cd e2e && npm install && npx playwright install chromium && npm test
 * Yerelde Chromium yolu farklıysa PW_CHROMIUM_PATH ver.
 */
const CI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  timeout: 90_000,
  expect: { timeout: 10_000 },
  // Oyun olayları rastgele; yardımcılar bunu tolere eder. CI'da tek yeniden deneme: "flaky" olarak raporlanır.
  retries: CI ? 1 : 0,
  workers: CI ? 2 : undefined,
  reporter: CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:3001',
    locale: 'tr-TR',
    trace: 'off',
    screenshot: 'only-on-failure',
    launchOptions: process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
  },
  projects: [
    { name: 'pc', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobil', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
  ],
  webServer: {
    command: 'npm run dev:bellek',
    cwd: '../server',
    url: 'http://127.0.0.1:3001',
    reuseExistingServer: !CI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
