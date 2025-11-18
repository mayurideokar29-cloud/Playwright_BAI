// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'https://abs-testing.simulationhub.com/',
    headless: false,
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\/login\.setup\.js/,
    },
    {
      name: 'chromium',
      use: { storageState: 'auth.json' },
      dependencies: ['setup'],
    },
  ],
});
