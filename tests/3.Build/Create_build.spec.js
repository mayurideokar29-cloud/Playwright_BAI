import { test, expect } from '@playwright/test';

test('Create Build with unique name', async ({ page }) => {
  // ---------- LOGIN ----------
  await page.goto('https://abs-testing.simulationhub.com/');
  // Wait for home page to load
  await page.waitForLoadState('networkidle');

  // ---------- OPEN PROJECT ----------
  await page.getByRole('button', { name: /office/i }).click(); // office image card

  // ---------- ENTER UNIQUE BUILD NAME ----------
  const buildName = `test-auto-${Date.now()}`; // Unique build name

  await page.getByText('domain').click();
  const domainInput = page.getByRole('textbox', { name: 'Select an option' });

  await domainInput.click();
  await domainInput.fill(buildName);

  // Select the suggestion
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Select from DataHub' }).click();

  // ---------- NEXT PAGES ----------
  await page.getByRole('button', { name: 'Go to next page' }).click();
  await page.getByRole('button', { name: 'Go to next page' }).click();
  await page.getByRole('button', { name: 'Go to next page' }).click();

  // ---------- SELECT FLOORPLAN ----------
  await page
    .getByRole('gridcell', { name: 'Floorplan 1_Converted.json' })
    .click();

  // ---------- CREATE NEW CONFIGURATION ----------
  await page.getByRole('button', { name: 'Create New Configuration' }).click();

  // ---------- WAIT FOR IMPORT POPUP ----------
  const popup = page.getByRole('dialog', {
    name: /Importing Build Configuration/i,
  });

  await expect(popup).toBeVisible(); // assertion

  // Wait until progress bar disappears
  await popup.waitFor({ state: 'hidden', timeout: 120000 }); // waits up to 2 min

  // ---------- CLICK CREATED BUILD ----------
  const createdBuildBtn = page.getByRole('button', {
    name: new RegExp(buildName),
  });
  await expect(createdBuildBtn).toBeVisible();
  await createdBuildBtn.click();

  console.log(`Build created successfully: ${buildName}`);
});
