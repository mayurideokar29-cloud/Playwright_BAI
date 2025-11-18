import { test, expect } from '@playwright/test';

test('Create unique floorplan and verify in Recent Floorplan', async ({
  page,
}) => {
  // Login using saved auth
  await page.goto('https://abs-testing.simulationhub.com/');
  await page.getByPlaceholder('Email').fill('mayuri.deokar@cctech.co.in');
  await page.getByPlaceholder('Password').fill('Mayuri@29');
  await page.getByRole('button', { name: 'Sign in' }).click();
  // Open Office
  await page.getByRole('button', { name: 'office Image Office' }).click();

  // Open Floorplan
  await page.getByRole('menuitem', { name: 'map' }).click();

  // Generate unique name
  const uniqueName = `Floorplan_${Date.now()}`;
  console.log('Created Floorplan Name:', uniqueName);

  // Enter name
  await page
    .getByRole('textbox', { name: 'Enter Floorplan Name' })
    .fill(uniqueName);

  // ---- FIXED CLICK ----
  await page.locator('.MuiCard-root', { hasText: 'Start from Sketch' }).click();
  // Click Create
  await page.getByRole('button', { name: 'Create' }).click();

  // Wait for the process to appear in list
  const recentEntry = page.getByRole('button', {
    name: new RegExp(uniqueName),
  });

  await expect(recentEntry).toBeVisible({ timeout: 20000 });

  console.log(
    '✔ Floorplan successfully created and visible in Recent Floorplan'
  );
});
