import { expect, test } from '@playwright/test';

test('header remains sticky while scrolling', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('.site-header');

  const position = await header.evaluate((el) => getComputedStyle(el).position);
  expect(position).toBe('sticky');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(header).toBeVisible();

  const rect = await header.evaluate((el) => el.getBoundingClientRect());
  expect(rect.top).toBeGreaterThanOrEqual(0);
  expect(rect.top).toBeLessThan(2);
});

test('desktop header has no nav fade when not scrollable', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.waitForFunction(() => window.__navSpyReady === true);

  const nav = page.locator('.site-nav');
  const isScrollable = await nav.evaluate((el) => el.scrollWidth > el.clientWidth + 2);
  expect(isScrollable).toBeFalsy();

  const afterOpacity = await page.evaluate(() => {
    const navEl = document.querySelector('.site-nav');
    if (!navEl) return null;
    return getComputedStyle(navEl, '::after').opacity;
  });
  expect(afterOpacity).toBe('0');
});
