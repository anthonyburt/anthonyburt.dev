window.__navSpyLoaded = true;
window.__navSpyReady = false;

const initNavSpy = (attempt = 0) => {
  const nav = document.querySelector('.site-nav');
  const navLinks = document.querySelectorAll('.site-nav a[data-section]');
  const sections = Array.from(navLinks)
    .map((link) => {
      const targetId = link.dataset.section || link.getAttribute('href')?.slice(1);
      return targetId ? document.getElementById(targetId) : null;
    })
    .filter(Boolean);

  if (!navLinks.length || !sections.length) {
    if (attempt < 10) {
      window.requestAnimationFrame(() => initNavSpy(attempt + 1));
    }
    return;
  }

  const setActive = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.dataset.section === id;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const updateNavFade = () => {
    if (!nav) return;
    const canScroll = nav.scrollWidth > nav.clientWidth + 2;
    const atStart = nav.scrollLeft <= 1;
    nav.classList.toggle('is-scrollable', canScroll && !atStart);
  };

  let ticking = false;
  let lockId = null;
  let lockUntil = 0;

  const updateActive = () => {
    if (window.scrollY <= window.innerHeight * 0.05) {
      setActive('summary');
      ticking = false;
      return;
    }

    if (lockId && Date.now() < lockUntil) {
      setActive(lockId);
      ticking = false;
      return;
    }

    const thresholdY = window.innerHeight * 0.1;
    let current = sections[0].id;
    const visible = sections
      .map((section) => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.max(
          0,
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0),
        );
        return { section, rect, visibleHeight };
      })
      .filter(
        ({ rect, visibleHeight }) =>
          rect.bottom > 0 && rect.top < window.innerHeight && visibleHeight > 0,
      );

    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setActive('contact');
      ticking = false;
      return;
    }

    if (visible.length) {
      const bufferY = window.innerHeight * 0.25;
      const eligible = visible.filter(({ rect }) => rect.top <= thresholdY + bufferY);
      const nonContact = eligible.filter(({ section }) => section.id !== 'contact');
      const pickClosestBelow = (items) =>
        items.reduce((best, next) => (next.rect.top > best.rect.top ? next : best));

      if (nonContact.length) {
        current = pickClosestBelow(nonContact).section.id;
      } else if (eligible.length) {
        current = pickClosestBelow(eligible).section.id;
      } else {
        const closest = visible.reduce((best, next) => {
          const bestDelta = Math.abs(best.rect.top - thresholdY);
          const nextDelta = Math.abs(next.rect.top - thresholdY);
          return nextDelta < bestDelta ? next : best;
        });
        current = closest.section.id;
      }
    } else {
      const threshold = window.scrollY + thresholdY;
      for (const section of sections) {
        if (section.offsetTop <= threshold) {
          current = section.id;
        } else {
          break;
        }
      }
    }

    setActive(current);
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActive);
        ticking = true;
      }
    },
    { passive: true },
  );

  window.addEventListener(
    'resize',
    () => {
      window.requestAnimationFrame(updateActive);
      window.requestAnimationFrame(updateNavFade);
    },
    { passive: true },
  );

  if (nav) {
    nav.addEventListener('scroll', () => window.requestAnimationFrame(updateNavFade), {
      passive: true,
    });
  }

  window.addEventListener('hashchange', () => {
    const target = window.location.hash.replace('#', '');
    if (target) {
      lockId = target;
      lockUntil = Date.now() + 400;
      setActive(target);
    }
  });

  if (window.location.hash) {
    setActive(window.location.hash.replace('#', ''));
  } else {
    setActive(sections[0].id);
  }

  updateNavFade();
  updateActive();
  window.__navSpyReady = true;
};

initNavSpy();
