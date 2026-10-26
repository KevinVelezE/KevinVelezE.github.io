import { expect, test } from '@playwright/test';
import { entryPath, siteOrigin } from './site-url';

test('identifies Kevin and provides working navigation to each section', async ({ page }) => {
  const response = await page.goto(entryPath);
  expect(response?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kevin Vélez Escarria');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  for (const [label, id] of [
    ['Mathematical work', 'mathematical-work'],
    ['Background', 'background'],
    ['Contact', 'contact'],
  ]) {
    await nav.getByRole('link', { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links.map((link) => link.getAttribute('href')!).filter((href) =>
      href.length < 2 || !document.getElementById(href.slice(1))),
  );
  expect(brokenAnchors).toEqual([]);
});

test('distinguishes the thesis from the coauthored MAPI extended abstract', async ({ page }) => {
  await page.goto(entryPath);
  const works = page.locator('#mathematical-work article');
  await expect(works).toHaveCount(2);
  const thesis = works.filter({ hasText: 'Undergraduate thesis' });
  await expect(thesis).toContainText('Julio Delgado');
  const abstract = works.filter({ hasText: 'Extended abstract' });
  await expect(abstract).toContainText('Juan Lopez');
  await expect(abstract).toContainText('MAPI 4');
  await expect(page.getByRole('heading', { name: /publications|software/i })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /\bCV\b|coming soon|tomography explorer/i })).toHaveCount(0);
});

test('opens document pages on GitHub with concise labels and no language or hosting badges', async ({ page }) => {
  await page.goto(entryPath);
  const works = page.locator('#mathematical-work');
  const thesis = works.getByRole('link', { name: 'Read thesis (PDF)', exact: true });
  const abstract = works.getByRole('link', { name: 'Read abstract (PDF)', exact: true });
  await expect(thesis).toHaveAttribute('href', 'https://github.com/KevinVelezE/KevinVelezE/blob/main/papers/tesis.pdf');
  await expect(abstract).toHaveAttribute('href', 'https://github.com/KevinVelezE/KevinVelezE/blob/main/papers/mapi4-abstract.pdf');
  await expect(works.locator('a[download], a[href*="/raw/"]')).toHaveCount(0);
  await expect(works).not.toContainText(/hosted on GitHub|\bSpanish\b|\bEnglish\b/i);
});

test('offers the public GitHub profile and institutional email', async ({ page }) => {
  await page.goto(entryPath);
  const contact = page.locator('#contact');
  await expect(contact.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/KevinVelezE');
  await expect(contact.getByRole('link', { name: 'velez.kevin@correounivalle.edu.co' }))
    .toHaveAttribute('href', 'mailto:velez.kevin@correounivalle.edu.co');
});

test('keeps content and navigation available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${siteOrigin}${entryPath}`);
  await expect(page.getByRole('heading', { name: 'Kevin Vélez Escarria', exact: true })).toBeVisible();
  await page.getByRole('navigation').getByRole('link', { name: 'Mathematical work' }).click();
  await expect(page).toHaveURL(/#mathematical-work$/);
  await expect(page.locator('#mathematical-work article')).toHaveCount(2);
  await expect(page.locator('#contact a[href^="mailto:"]')).toBeVisible();
  await context.close();
});

test('loads only same-origin assets and sets no cookies', async ({ page, request }) => {
  const requested: string[] = [];
  const failed: string[] = [];
  page.on('request', (req) => requested.push(req.url()));
  page.on('response', (res) => { if (res.status() >= 400) failed.push(res.url()); });
  page.on('requestfailed', (req) => failed.push(req.url()));
  await page.goto(entryPath, { waitUntil: 'load' });
  expect(requested.length).toBeGreaterThan(0);
  expect(requested.filter((url) => new URL(url).origin !== siteOrigin)).toEqual([]);
  expect(failed).toEqual([]);
  expect(await page.context().cookies()).toEqual([]);
  await expect(page.locator('script[src], iframe, form')).toHaveCount(0);
  const icon = await page.locator('link[rel="icon"]').getAttribute('href');
  expect(icon).toBe(`${entryPath}favicon.svg`);
  const response = await request.get(new URL(icon!, siteOrigin).href);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('image/svg+xml');
});

test('links only to selected public materials and does not serve a local CV', async ({ page, request }) => {
  await page.goto(entryPath);
  const externalLinks = await page.locator('a:not([href^="#"])').evaluateAll((links) =>
    [...new Set(links.map((link) => link.getAttribute('href')))].sort(),
  );
  expect(externalLinks).toEqual([
    'https://github.com/KevinVelezE',
    'https://github.com/KevinVelezE/KevinVelezE/blob/main/papers/mapi4-abstract.pdf',
    'https://github.com/KevinVelezE/KevinVelezE/blob/main/papers/tesis.pdf',
    'mailto:velez.kevin@correounivalle.edu.co',
  ]);
  expect((await request.get(`${entryPath}cv.pdf`)).status()).toBe(404);
});

test('has descriptive metadata without claiming a local preview as its public URL', async ({ page }) => {
  await page.goto(entryPath);
  await expect(page).toHaveTitle('Kevin Vélez Escarria | Mathematics and computation');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Fourier analysis/);
  if (process.env.SITE_URL) {
    const expected = new URL(entryPath, process.env.SITE_URL).href;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', expected);
  } else {
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  }
});
