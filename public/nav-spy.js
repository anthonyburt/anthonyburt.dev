window.__navSpyLoaded = true;
window.__navSpyReady = false;

const initNavSpy = () => {
  const nav = document.querySelector('.site-nav');
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.site-nav a[data-section]');
  const sections = Array.from(navLinks)
    .map((link) => {
      const id = link.dataset.section || link.getAttribute('href')?.slice(1);
      return id ? document.getElementById(id) : null;
    })
    .filter(Boolean);

  if (!navLinks.length || !sections.length) {
    window.requestAnimationFrame(initNavSpy);
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

  const updateScrollOffset = () => {
    if (!header) return;
    const height = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--scroll-offset', `${height + 12}px`);
  };

  let ticking = false;
  let lockId = null;
  let lockUntil = 0;

  const updateActive = () => {
    if (lockId && Date.now() < lockUntil) {
      setActive(lockId);
      ticking = false;
      return;
    }

    if (window.scrollY <= window.innerHeight * 0.05) {
      setActive('summary');
      ticking = false;
      return;
    }

    const thresholdY = window.innerHeight * 0.5;
    let current = sections[0].id;

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= thresholdY) {
        current = section.id;
      } else {
        break;
      }
    }

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = 'contact';
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
      window.requestAnimationFrame(updateScrollOffset);
    },
    { passive: true },
  );

  if (nav) {
    nav.addEventListener('scroll', () => window.requestAnimationFrame(updateNavFade), {
      passive: true,
    });
  }

  const setLock = (target) => {
    lockId = target;
    lockUntil = Date.now() + 500;
    setActive(target);
    window.setTimeout(() => {
      if (Date.now() >= lockUntil) {
        updateActive();
      }
    }, 520);
  };

  window.addEventListener('hashchange', () => {
    const target = window.location.hash.replace('#', '');
    if (target) {
      setLock(target);
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const target = link.dataset.section;
      if (target) {
        setLock(target);
      }
    });
  });

  if (window.location.hash) {
    setActive(window.location.hash.replace('#', ''));
  } else {
    setActive(sections[0].id);
  }

  updateNavFade();
  updateScrollOffset();
  updateActive();
  window.__navSpyReady = true;
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavSpy);
} else {
  initNavSpy();
}
