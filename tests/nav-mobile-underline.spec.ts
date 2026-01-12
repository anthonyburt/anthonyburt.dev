import { expect, test } from '@playwright/test';

test.use({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});

test('mobile nav underline behavior stays singular after tap + scroll', async ({ page }) => {
  test.setTimeout(45000);
  await page.goto('/');
  await page.waitForFunction(() => window.__navSpyReady === true);

  await page.tap('.site-nav a[data-section="experience"]');
  await page.mouse.move(0, 0);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    const doc = document.documentElement;
    const body = document.body;
    const maxScroll = Math.max(body.scrollHeight, doc.scrollHeight) - window.innerHeight - 1;
    const targetY = Math.max(0, maxScroll);
    window.scrollTo(0, targetY);
    window.dispatchEvent(new Event('scroll'));
    return new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
  });

  await page.waitForFunction(() => window.scrollY > 0);

  await page.waitForFunction(() => {
    const active = document.querySelector('.site-nav a.active');
    const section = active?.getAttribute('data-section');
    return section && section !== 'experience';
  });

  const underlineState = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('.site-nav a'));
    const highlighted = links.filter(
      (link) =>
        link.classList.contains('active') ||
        link.matches(':hover') ||
        link.matches(':focus') ||
        link.matches(':focus-visible'),
    );
    return {
      count: highlighted.length,
      sections: highlighted.map((link) => link.getAttribute('data-section')),
    };
  });

  expect(
    underlineState.count,
    `expected <= 1 highlighted nav link, got ${underlineState.count}: ${underlineState.sections.join(
      ', ',
    )}`,
  ).toBeLessThanOrEqual(1);
});
