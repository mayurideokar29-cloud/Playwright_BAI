import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://abs-testing.simulationhub.com/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page
    .getByRole('textbox', { name: 'Email' })
    .fill('mayuri.deokar@cctech.co.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Mayuri@29');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page
    .getByRole('button', { name: 'dining_bar_lounge_or_leisure' })
    .first()
    .click();
  await page.getByText('map').click();
  await page.getByRole('textbox', { name: 'Enter Floorplan Name' }).click();
  await page
    .getByRole('textbox', { name: 'Enter Floorplan Name' })
    .press('ControlOrMeta+a');
  await page
    .getByRole('textbox', { name: 'Enter Floorplan Name' })
    .fill('floorplan1');
  await page
    .getByText(
      'domain_addStart from SketchStart with a blank canvas to sketch your design from'
    )
    .click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page
    .getByRole('button', { name: 'floorplan1 (Status: Running)' })
    .click();
  await page
    .locator('iframe[title="FloorSpace.js"]')
    .contentFrame()
    .getByText('New Create a new floorplan')
    .click();
  await page
    .locator('iframe[title="FloorSpace.js"]')
    .contentFrame()
    .getByTitle('Create new')
    .nth(1)
    .click();
  await page
    .locator('iframe[title="FloorSpace.js"]')
    .contentFrame()
    .getByText('Space 1 - 1')
    .click();
});
