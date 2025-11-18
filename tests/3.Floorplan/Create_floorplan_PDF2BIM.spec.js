import { test, expect } from '@playwright/test';

test('Create floorplan in PDF2BIM with unique name', async ({ page }) => {
  // ---------- Generate Unique Name ----------
  const uniqueName = `fp_${Date.now()}`;

  // ---------- Login ----------
  await page.goto('https://abs-testing.simulationhub.com/');

  // ---------- Go to Office ----------
  await page.getByRole('button', { name: 'office Image Office' }).click();

  // ---------- Open PDF2BIM ----------
  await page.getByText('map').click();

  // ---------- Enter Unique Floorplan Name ----------
  await page
    .getByRole('textbox', { name: 'Enter Floorplan Name' })
    .fill(uniqueName);

  // ---------- Click Outside (if needed) ----------
  await page
    .getByText(
      'widgetsPDFs to BIM With AIConvert PDFs, drawings, or images into BIM model'
    )
    .click();

  // ---------- Create ----------
  await page.getByRole('button', { name: 'Create' }).click();

  // ---------- Wait for Navigation ----------
  await page.waitForLoadState('networkidle');

  // ---------- Extract projectId from URL ----------
  const url = page.url();
  const projectId = url.split('/')[4]; // Example: /project/12345/pdf2bim

  console.log('Created Project ID:', projectId);

  // ---------- Navigate to /projectId/pdf2bim ----------
  await page.goto(
    `https://abs-testing.simulationhub.com/project/${projectId}/pdf2bim`
  );

  // ---------- Optional: verify navigation ----------
  await expect(page).toHaveURL(new RegExp(`project/${projectId}/pdf2bim$`));
});
