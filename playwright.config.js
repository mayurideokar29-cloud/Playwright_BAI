// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'https://abs-testing.simulationhub.com/', // <-- FIXED
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: false,
  },

  projects: [
    {
      name: 'setup',
      testMatch: 'tests/auth/login.setup.js',
    },
    {
      name: 'chromium',
      use: { storageState: 'auth.json' },
      dependencies: ['setup'],
    },
  ],
});
