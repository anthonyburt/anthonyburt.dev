import { expect, test } from '@playwright/test';

test('selected project links target existing project cards', async ({ page }) => {
  await page.goto('/');

  const links = page.locator('.selected-projects a');
  const count = await links.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    const link = links.nth(index);
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
    expect(href?.startsWith('#')).toBeTruthy();

    const selector = href ?? '';
    const target = page.locator(selector);
    await expect(target).toHaveCount(1);

    await link.click();
    const escaped = selector.replace('#', '\\#');
    await expect(page).toHaveURL(new RegExp(`${escaped}$`));

    const rect = await target.evaluate((el) => el.getBoundingClientRect());
    const viewport = page.viewportSize();
    expect(viewport).not.toBeNull();
    if (viewport) {
      expect(rect.top).toBeGreaterThanOrEqual(-1);
      expect(rect.top).toBeLessThan(viewport.height);
    }
  }
});
