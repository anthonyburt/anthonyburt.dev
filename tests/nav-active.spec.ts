import { expect, test } from '@playwright/test';

const sections = ['summary', 'skills', 'interests', 'contact'];

const expectActive = async (page, id: string) => {
  await page.waitForFunction((sectionId) => {
    const active = document.querySelector('.site-nav a.active');
    return active?.getAttribute('data-section') === sectionId;
  }, id);
  const link = page.locator(`.site-nav a[data-section="${id}"]`);
  await expect(link).toHaveClass(/active/);
  await expect(link).toHaveAttribute('aria-current', 'true');
};

const scrollToSection = async (page, id: string) => {
  await page.evaluate((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, id);
};

test.describe('nav active state', () => {
  for (const width of [1200, 800]) {
    test(`updates active link on scroll at width ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      await page.waitForFunction(() => window.__navSpyReady === true);

      await expectActive(page, 'summary');

      for (const id of sections.slice(1)) {
        await scrollToSection(page, id);
        await expectActive(page, id);
      }

      for (const id of [...sections].reverse()) {
        await scrollToSection(page, id);
        await expectActive(page, id);
      }

      await page.click('.site-nav a[data-section="interests"]');
      await expectActive(page, 'interests');
    });
  }
});
