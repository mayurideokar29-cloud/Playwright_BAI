// tests/auth/login.setup.js
import { test } from '@playwright/test';

test('Login and save auth state', async ({ page }) => {
  await page.goto('https://abs-testing.simulationhub.com/');

  await page.getByPlaceholder('Email').fill('mayuri.deokar@cctech.co.in');
  await page.getByPlaceholder('Password').fill('Mayuri@29');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Wait till login completes (adjust selector based on your dashboard)
  await page.waitForSelector('button:has-text("Create")');

  // Save session
  await page.context().storageState({ path: 'auth.json' });
});
