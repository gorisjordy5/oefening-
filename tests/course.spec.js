import { test, expect } from '@playwright/test';
import { steps, chapters } from '../src/course.js';

const total = steps.length;
const countText = count => `${count} van ${total} stappen afgewerkt (${Math.round(count / total * 100)}%)`;
const position = count => `Huidige positie: stap ${count} van ${total}`;
async function open(page) {
  await page.goto('./');
  await page.getByRole('link', { name: /Open de cursus/ }).click();
}

test('hoofdstukken, grenzen en expliciet afwerken', async ({ page }) => {
  await open(page);
  await expect(page.getByRole('button', { name: '← Vorige', exact: true })).toBeDisabled();
  await expect(page.getByText(countText(0))).toBeVisible();
  await page.getByRole('button', { name: 'Stap afgewerkt', exact: true }).click();
  await page.getByRole('button', { name: 'Volgende →', exact: true }).click();
  await expect(page.locator('#stap-titel')).toHaveText('Materialen vergelijken');
  await expect(page.locator('#stap-titel')).toBeFocused();
  await page.getByRole('button', { name: '← Vorige', exact: true }).click();
  await expect(page.getByText(countText(1))).toBeVisible();
  await page.getByRole('button', { name: 'Stap weer openzetten' }).click();
  await expect(page.getByText(countText(0))).toBeVisible();
  for (const { title } of chapters) {
    await page.getByRole('button', { name: title, exact: true }).click();
    await expect(page.locator('.course-slide .eyebrow')).toHaveText(title);
  }
  await page.getByRole('button', { name: /Je nachttafel controleren/ }).click();
  await expect(page.getByRole('button', { name: 'Volgende →', exact: true })).toBeDisabled();
  await expect(page.getByText(position(total))).toBeVisible();
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
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Materiaal', exact: true })).toBeFocused();
  await expect(page.getByRole('button', { name: 'Materiaal', exact: true })).toHaveCSS('outline-style', 'solid');
  await page.keyboard.press('Enter');
  await expect(page.locator('#stap-titel')).toBeFocused();
});

test('voortgang herstelt na terugkeer en reset vraagt bevestiging', async ({ page, context }) => {
  await open(page);
  await page.getByRole('button', { name: 'Stap afgewerkt', exact: true }).click();
  await page.getByRole('button', { name: 'Volgende →', exact: true }).click();
  await page.reload();
  await page.getByRole('link', { name: /Open de cursus/ }).click();
  await expect(page.getByText(position(2))).toBeVisible();
  await expect(page.getByText(countText(1))).toBeVisible();
  const returning = await context.newPage();
  await page.close();
  await open(returning);
  await expect(returning.getByText(position(2))).toBeVisible();
  returning.once('dialog', dialog => dialog.dismiss());
  await returning.getByRole('button', { name: 'Opnieuw beginnen', exact: true }).click();
  await expect(returning.getByText(countText(1))).toBeVisible();
  returning.once('dialog', dialog => dialog.accept());
  await returning.getByRole('button', { name: 'Opnieuw beginnen', exact: true }).click();
  await returning.reload();
  await returning.getByRole('link', { name: /Open de cursus/ }).click();
  await expect(returning.getByText(countText(0))).toBeVisible();
  await expect(returning.getByText(position(1))).toBeVisible();
});

test('geblokkeerde opslag laat navigeren en afwerken toe', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
  });
  await open(page);
  await expect(page.getByRole('status')).toContainText('Bewaren lukt niet');
  await page.getByRole('button', { name: 'Stap afgewerkt', exact: true }).click();
  await page.getByRole('button', { name: 'Volgende →', exact: true }).click();
  await expect(page.getByText(position(2))).toBeVisible();
  await expect(page.getByText(countText(1))).toBeVisible();
});

test('volledige cursus met illustraties en opdrachten hervat en werkt alle stappen af', async ({ page }, testInfo) => {
  await open(page);
  for (const [index, step] of steps.entries()) {
    const slide = page.locator('.course-slide');
    await expect(page.locator('#stap-titel')).toHaveText(step.title);
    await expect(slide).toContainText('Leerdoel:');
    await expect(slide).not.toContainText(/Voorbeeldinhoud|wordt nog|volgt later|voorbeeldstap/);
    await expect(slide.getByRole('img').first()).toBeVisible();
    await expect(slide.locator('.lesson-exercise')).toBeVisible();
    await slide.getByText('Bekijk antwoord en bespreekcriteria', { exact: true }).click();
    await expect(slide.locator('details p').first()).toBeVisible();
    if (index >= 3) {
      await expect(slide.getByRole('heading', { name: 'Wat heb je nodig?' })).toBeVisible();
      await expect(slide.getByRole('heading', { name: 'Veilig werken · eerst lezen' })).toBeVisible();
      await expect(slide.getByRole('heading', { name: 'Controle vóór je verdergaat' })).toBeVisible();
      expect(await slide.locator('ol > li').count()).toBeGreaterThanOrEqual(4);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await slide.getByRole('img').first().scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath(`${step.id}.png`) });
    await page.getByRole('button', { name: 'Stap afgewerkt', exact: true }).click();
    await expect(page.getByText(countText(index + 1))).toBeVisible();
    if (index < total - 1) await page.getByRole('button', { name: 'Volgende →', exact: true }).click();
    if (index === 6) {
      await page.reload();
      await page.getByRole('link', { name: /Open de cursus/ }).click();
      await expect(page.locator('#stap-titel')).toHaveText(steps[7].title);
      await expect(page.getByText(countText(7))).toBeVisible();
    }
  }
  await expect(page.getByRole('button', { name: 'Volgende →', exact: true })).toBeDisabled();
  await page.reload();
  await page.getByRole('link', { name: /Open de cursus/ }).click();
  await expect(page.getByText(countText(total))).toBeVisible();
  await expect(page.getByText(position(total))).toBeVisible();
});
