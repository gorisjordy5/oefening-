import { test, expect } from '@playwright/test';

test('materiaallessen en referentieontwerp zijn bruikbaar met illustraties en antwoorden', async ({ page }, testInfo) => {
  await page.goto('./');
  await page.getByRole('link', { name: /Open de cursus/ }).click();
  await expect(page.getByRole('img', { name: 'Vezels en lagen vergelijken', exact: true })).toBeVisible();
  await expect(page.locator('.course-slide')).not.toContainText('Voorbeeldinhoud');
  await page.getByRole('img', { name: 'Vezels en lagen vergelijken', exact: true }).scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('materiaal-detail.png') });
  await page.getByText('Bekijk antwoord en bespreekcriteria', { exact: true }).click();
  await expect(page.getByText(/Massief: doorlopende vezels/)).toBeVisible();
  await page.getByRole('button', { name: 'Volgende →', exact: true }).click();
  await expect(page.getByRole('img', { name: 'Materiaalverdeling van de nachttafel', exact: true })).toBeVisible();
  await page.getByText('Bekijk antwoord en bespreekcriteria', { exact: true }).click();
  await expect(page.getByText(/21 mm verandert de binnenbreedte/)).toBeVisible();
  await page.getByRole('button', { name: 'Werktekening en voorbereiding', exact: true }).click();
  await expect(page.locator('.course-slide')).not.toContainText('Voorbeeldinhoud');
  await expect(page.getByRole('img', { name: 'Vooraanzicht met één deur en één lade', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Zijdoorsnede en bovenaanzicht', exact: true })).toBeVisible();
  await expect(page.getByRole('table', { name: 'Zaaglijst van hetzelfde referentiekastje' })).toBeVisible();
  await expect(page.getByRole('row', { name: /H · Binnenfront en achterstuk lade/ })).toContainText('387 × 100 × 16');
  await expect(page.getByRole('img', { name: 'Ladebak en verbindingen', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Blum: planning 110°/ })).toHaveAttribute('href', 'https://publications.blum.com/2024/catalogue/en/77/');
  await expect(page.locator('.course-slide')).toContainText('230M4000');
  await expect(page.locator('.course-slide')).toContainText('71B3550');
  await page.getByText('Bekijk antwoord en bespreekcriteria', { exact: true }).click();
  await expect(page.getByText(/A: twee kastzijden/)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const drawing = page.getByRole('region', { name: 'Vooraanzicht met één deur en één lade — horizontaal verschuifbaar' });
  await drawing.focus();
  await drawing.scrollIntoViewIfNeeded();
  await page.keyboard.press('ArrowRight');
  await expect(drawing).toBeFocused();
  if (page.viewportSize().width < 400) {
    await expect.poll(() => drawing.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
  }
  await page.screenshot({ path: testInfo.outputPath('tekening-detail.png') });
  await page.getByRole('table').scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath('zaaglijst-detail.png') });
  await page.screenshot({ path: testInfo.outputPath('referentieontwerp.png'), fullPage: true });
});
