import { test, expect } from '@playwright/test';

test('Create project with unique name', async ({ page }) => {
  // --- Generate unique project name ---
  const projectName = `Test_${Date.now()}`;

  // --- Login ---
  await page.goto('https://abs-testing.simulationhub.com/');

  await page.getByPlaceholder('Email').fill('mayuri.deokar@cctech.co.in');
  await page.getByPlaceholder('Password').fill('Mayuri@29');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Wait for dashboard
  await expect(page.getByRole('button', { name: 'Create' })).toBeVisible({
    timeout: 15000,
  });
  await page.getByRole('button', { name: 'Create' }).click();

  // --- PROJECT DETAILS ---
  await page.locator('input[type="string"]').first().fill(projectName);

  await page
    .locator('textarea[id="outlined-basic"]')
    .fill('Automated project created by Playwright');

  await page.getByRole('button', { name: 'Next' }).click();

  // --- PREFERENCES ---
  await page.getByRole('radio', { name: 'US' }).check();

  await page.locator('#BuildingTypes').click();
  await page
    .getByRole('option', { name: 'Dining Bar Lounge or Leisure' })
    .click();

  await page.locator('#ASHRAEClimateZone').click();
  await page.getByRole('option', { name: '1A (Very Hot - Humid)' }).click();

  await page.locator('#EnergyStandards').click();
  await page.getByRole('option', { name: 'ASHRAE 90.1 2016' }).click();

  await page.locator('#VentilationSystem').click();
  await page.getByRole('option', { name: 'ASHRAE 62.1 2019' }).click();

  await page.locator('#LEEDRatingSystem').click();
  await page.getByRole('option', { name: 'LEED v5' }).click();

  await page.getByRole('button', { name: 'Next' }).click();

  // --- LOCATION (Use default without typing anything) ---
  await page.getByRole('combobox').click();

  // --- Create Project ---
  await page.getByRole('button', { name: 'Create' }).click();

  // --- Verification ---
  await expect(
    page.locator('p.MuiTypography-body1.fwMedium.colorGrey', {
      hasText: 'Recent',
    })
  ).toBeVisible({ timeout: 20000 });
  //await expect(page.getByText('Recent')).toBeVisible({ timeout: 20000 });
  // await expect(page.getByText(projectName)).toBeVisible({ timeout: 20000 });

  // console.log('Project Created:', projectName);
});
