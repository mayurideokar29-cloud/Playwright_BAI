import { test, expect } from '@playwright/test';

test('Login and save auth state', async ({ page }) => {
  test.setTimeout(60000);

  console.log('🔄 Opening website...');
  await page.goto('https://abs-testing.simulationhub.com/');

  console.log('🔄 Filling login form...');
  await page.getByPlaceholder('Email').fill('mayuri.deokar@cctech.co.in');
  await page.getByPlaceholder('Password').fill('Mayuri@29');

  console.log('🔄 Clicking Sign in...');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // ❗ THIS IS THE CORRECT WAIT (Dashboard button appears)
  console.log('⏳ Waiting for dashboard...');
  await expect(page.getByRole('button', { name: 'Create' })).toBeVisible({
    timeout: 30000,
  });

  // Save authentication
  await page.context().storageState({ path: 'auth.json' });

  console.log('✅ Login success — Auth saved!');
});
