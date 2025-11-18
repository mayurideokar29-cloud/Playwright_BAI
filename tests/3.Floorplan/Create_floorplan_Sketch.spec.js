import { test, expect } from '@playwright/test';

test('Create unique floorplan and verify in Recent Floorplan', async ({
  page,
}) => {
  await page.goto('https://abs-testing.simulationhub.com/');

  await page.getByRole('button', { name: 'office Image Office' }).click();
  await page.getByRole('menuitem', { name: 'map' }).click();

  const uniqueName = `Floorplan_${Date.now()}`;
  console.log('Created Floorplan:', uniqueName);

  await page
    .getByRole('textbox', { name: 'Enter Floorplan Name' })
    .fill(uniqueName);

  await page.locator('.MuiCard-root', { hasText: 'Start from Sketch' }).click();
  await page.getByRole('button', { name: 'Create' }).click();

  // -----------------------------
  // ⭐ FIX 1: Refresh the listing
  // -----------------------------
  await expect(page.locator('text=Recent Floorplan')).toBeVisible();
  await expect(page.locator(`text=${uniqueName}`)).toBeVisible();

  console.log('✔ Floorplan found:', uniqueName);
});
