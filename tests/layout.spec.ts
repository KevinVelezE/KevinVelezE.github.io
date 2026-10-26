import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { entryPath } from './site-url';

for (const width of [320, 390, 1440]) {
  test(`reads and navigates without horizontal scrolling at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    await page.goto(entryPath);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('navigation')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    const illustration = page.getByRole('img', { name: /parallel projections/i });
    await expect(illustration).toBeVisible();
    await expect(page.locator('figcaption')).toContainText('Conceptual illustration');
    const copy = await page.locator('.introduction-copy').boundingBox();
    const diagram = await illustration.boundingBox();
    expect(copy).not.toBeNull();
    expect(diagram).not.toBeNull();
    if (width === 1440) {
      expect(diagram!.x).toBeGreaterThan(copy!.x + copy!.width);
      expect(diagram!.y).toBeLessThan(copy!.y + copy!.height);
    } else {
      expect(diagram!.y).toBeGreaterThanOrEqual(copy!.y + copy!.height);
    }
    const scan = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    expect(scan.violations).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath('page.png'), fullPage: true });
  });
}

test('allows enlarged text at 320px without clipping contact links', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto(entryPath);
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
});

test('supports skip link and visible keyboard focus through navigation', async ({ page }) => {
  await page.goto(entryPath);
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  expect(await skip.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe('none');
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
  // Start again to inspect the actual tab order, without injecting focus.
  await page.goto(entryPath);
  for (const name of ['Skip to content', 'Kevin Vélez Escarria', 'Mathematical work', 'Background', 'Contact']) {
    await page.keyboard.press('Tab');
    const active = page.getByRole('link', { name, exact: true }).first();
    await expect(active).toBeFocused();
    expect(await active.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe('none');
  }
});
