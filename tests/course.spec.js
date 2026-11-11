import { test, expect } from '@playwright/test';

test('hoofdstukken, grenzen en expliciet afwerken', async ({ page }, testInfo) => {
  await page.goto('./');
  await page.getByRole('link', { name: /Open de cursus/ }).click();
  await expect(page.getByRole('button', { name: '← Vorige', exact: true })).toBeDisabled();
  await expect(page.getByText('0 van 7 stappen afgewerkt (0%)')).toBeVisible();
  await page.getByRole('button', { name: 'Stap afgewerkt', exact: true }).click();
  await page.getByRole('button', { name: 'Volgende →', exact: true }).click();
  await expect(page.locator('#stap-titel')).toHaveText('Materialen vergelijken');
  await expect(page.locator('#stap-titel')).toBeFocused();
  await page.getByRole('button', { name: '← Vorige', exact: true }).click();
  await expect(page.getByText('1 van 7 stappen afgewerkt (14%)')).toBeVisible();
  await page.getByRole('button', { name: 'Stap weer openzetten' }).click();
  await expect(page.getByText('0 van 7 stappen afgewerkt (0%)')).toBeVisible();
  for (const title of ['Werktekening en voorbereiding', 'Gereedschappen en veiligheid', 'Aftekenen, zagen en verbinden', 'Montage en afwerking']) {
    await page.getByRole('button', { name: title, exact: true }).click();
    await expect(page.locator('.course-slide .eyebrow')).toHaveText(title);
  }
  await page.getByRole('button', { name: 'Volgende →', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Volgende →', exact: true })).toBeDisabled();
  await expect(page.getByText('Huidige positie: stap 7 van 7')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('cursus.png'), fullPage: true });
  await page.reload();
  await page.getByRole('link', { name: /Open de cursus/ }).click();
  await expect(page.getByText('Huidige positie: stap 1 van 7')).toBeVisible();
});

test('cursus is bereikbaar met toetsenbord en zichtbare focus', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: /Open de cursus/ })).toBeFocused();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Materiaal', exact: true })).toBeFocused();
  await expect(page.getByRole('button', { name: 'Materiaal', exact: true })).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  await expect(page.locator('#stap-titel')).toBeFocused();
});
