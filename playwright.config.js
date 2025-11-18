import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'https://abs-testing.simulationhub.com/',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /login\.setup\.js/,
    },
    {
      name: 'chromium',
      use: {
        storageState: 'auth.json',
      },
      dependencies: ['setup'],
    },
  ],
});
