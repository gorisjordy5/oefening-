import { test, expect } from '@playwright/test';

test('startpagina toont project zonder horizontaal scrollen', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle('Stap voor stap een nachttafel maken');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('img', { name: /Schematische nachttafel/ })).toBeVisible();
  await expect(page.getByText('500 × 500 × 700 mm')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('startpagina.png'), fullPage: true });
  await page.getByRole('link', { name: /Ontdek het project/ }).click();
  await expect(page).toHaveURL(/#project$/);
  await expect(page.getByRole('heading', { name: 'Een klein meubel, veel vakmanschap' })).toBeInViewport();
  expect(errors).toEqual([]);
});

test('toetsenbord bereikt inhoud en project met zichtbare focus', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Ga naar de inhoud' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await expect(skip).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: /Ontdek het project/ })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#project$/);
});
