// tests/auth/login.setup.js
import { test } from '@playwright/test';
import fs from 'fs';

test('Login and save auth state', async ({ page }) => {
  await page.goto('https://abs-testing.simulationhub.com/');

  // Login
  await page.getByPlaceholder('Email').fill('mayuri.deokar@cctech.co.in');
  await page.getByPlaceholder('Password').fill('Mayuri@29');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Wait until login is successful
  await page.waitForSelector('button:has-text("Create")');

  // Extract sessionStorage manually
  const sessionData = await page.evaluate(() => {
    const data = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      data[key] = sessionStorage.getItem(key);
    }
    return data;
  });

  fs.writeFileSync('session.json', JSON.stringify(sessionData, null, 2));

  // Save cookies + localStorage
  await page.context().storageState({ path: 'auth.json' });

  console.log('✅ Login session saved successfully!');
});
