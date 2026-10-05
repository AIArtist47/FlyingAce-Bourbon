/**
 * Motion layer — Lenis smooth scroll driving GSAP ScrollTrigger.
 *
 * Everything here is additive: the page is fully readable and navigable with
 * this file absent or `prefers-reduced-motion: reduce` set.
 */

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

declare global {
  interface Window {
    __motionFallback?: number;
  }
}

// The bundle arrived, so cancel Base.astro's "un-hide everything" safety timer.
window.clearTimeout(window.__motionFallback);

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const forcedColors = window.matchMedia('(forced-colors: active)').matches;

/* -------------------------------------------------------------------------- */
/* Fluid island nav                                                           */
/*                                                                            */
/* One block slides between nav items instead of each item owning an          */
/* underline. It travels on x and scaleX only — never width — and gets a      */
/* transient over-stretch proportional to the distance, so it reads as one    */
/* body of liquid being pulled across rather than a box teleporting.          */
/* -------------------------------------------------------------------------- */

const navEl = document.querySelector<HTMLElement>('[data-nav]');
const islandEl = document.querySelector<HTMLElement>('[data-nav-island]');

/** Set while a pointer or focus is inside the nav; it outranks scroll. */
let navHovered: HTMLElement | null = null;

const navLinks = () =>
  navEl ? Array.from(navEl.querySelectorAll<HTMLElement>('.hdr__link')) : [];

const activeNavLink = () => navLinks().find((l) => l.classList.contains('is-active')) ?? null;

function moveIsland(target: HTMLElement | null, instant = false) {
  if (!islandEl || !navEl) return;

  navLinks().forEach((link) => link.classList.toggle('is-lit', link === target));
  gsap.killTweensOf(islandEl);

  if (!target) {
    gsap.to(islandEl, { opacity: 0, duration: reduce ? 0 : 0.25, ease: 'power2.out' });
    return;
  }

  const left = target.offsetLeft;
  const width = target.offsetWidth;
  const travel = Math.abs(left - (Number(gsap.getProperty(islandEl, 'x')) || 0));
  const settled = Number(gsap.getProperty(islandEl, 'scaleX')) > 0;
  const duration = instant || reduce ? 0 : 0.5;

  const tl = gsap.timeline();
  tl.to(islandEl, { opacity: 1, duration: duration ? 0.18 : 0, ease: 'power2.out' }, 0).to(
    islandEl,
    { x: left, duration, ease: 'power3.out' },
    0,
  );

  // Stretch only when it is actually travelling between two lit items.
  const stretch = settled ? Math.min(travel * 0.3, 44) : 0;

  if (duration && stretch > 2) {
    tl.to(islandEl, { scaleX: width + stretch, duration: duration * 0.42, ease: 'power2.out' }, 0).to(
      islandEl,
      { scaleX: width, duration: duration * 0.62, ease: 'power3.out' },
      duration * 0.42,
    );
  } else {
    tl.to(islandEl, { scaleX: width, duration, ease: 'power3.out' }, 0);
  }
}
/* -------------------------------------------------------------------------- */
/* Smooth scroll                                                              */
/* -------------------------------------------------------------------------- */

let lenis: Lenis | null = null;

if (!reduce) {
  lenis = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    smoothWheel: true,
    autoRaf: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* -------------------------------------------------------------------------- */
/* Header: condense, scroll progress, active section                          */
/* -------------------------------------------------------------------------- */

const header = document.querySelector<HTMLElement>('[data-header]');

if (header) {
  ScrollTrigger.create({
    start: 'top -8px',
    end: 99999,
    onToggle: (self) => header.classList.toggle('is-stuck', self.isActive),
  });

  const bar = header.querySelector<HTMLElement>('[data-progress]');
  if (bar && !reduce) {
    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: () => document.documentElement.scrollHeight - window.innerHeight,
        scrub: 0.25,
        invalidateOnRefresh: true,
      },
    });
  }

  /* Underline exactly one nav item: the last target the reader has scrolled
     past. Per-section triggers would light up several at once, because the
     pillar cards (#brewery, #restaurant) share a single grid row. */
  const targets = Array.from(header.querySelectorAll<HTMLAnchorElement>('.hdr__link'))
    .map((link) => {
      const id = link.getAttribute('href') ?? '';
      const section = id.startsWith('#') && id !== '#' ? document.querySelector<HTMLElement>(id) : null;
      return section ? { link, section } : null;
    })
    .filter((entry): entry is { link: HTMLAnchorElement; section: HTMLElement } => entry !== null);

  if (targets.length) {
    const syncNav = () => {
      const probe = window.scrollY + (header.offsetHeight ?? 0) + window.innerHeight * 0.35;

      const passed = targets
        .map((entry) => ({
          ...entry,
          top: entry.section.getBoundingClientRect().top + window.scrollY,
        }))
        .sort((a, b) => a.top - b.top)
        .filter((entry) => entry.top <= probe);

      const current = passed.length ? passed[passed.length - 1].link : null;
      targets.forEach((entry) => entry.link.classList.toggle('is-active', entry.link === current));

      /* A pointer in the nav outranks the scroll position. On a page whose
         nav holds no in-page sections — the Distillery page — `current` is
         always null, so fall back to the link the server marked as the
         current page, or the island would never appear there. */
      if (!navHovered) moveIsland(current ?? activeNavLink());
    };

    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: syncNav, onRefresh: syncNav });
    syncNav();
  }
}

/* -------------------------------------------------------------------------- */
/* Anchor links routed through Lenis                                          */
/* -------------------------------------------------------------------------- */

const headerOffset = () => -(header?.offsetHeight ?? 0);

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    closeDrawer();

    if (href === '#top') {
      lenis ? lenis.scrollTo(0, { duration: 1.3 }) : window.scrollTo({ top: 0 });
      return;
    }

    if (lenis) {
      lenis.scrollTo(target, { offset: headerOffset(), duration: 1.25 });
    } else {
      target.scrollIntoView();
    }
  });
});

/* The brand lockups — header and footer — navigate home. When you are already
   on the home page there is nowhere to go, so they return to the top rather
   than reloading the page under you. */
document.querySelectorAll<HTMLAnchorElement>('[data-home]').forEach((home) => {
  home.addEventListener('click', (event) => {
    if (home.pathname !== window.location.pathname) return; // let it navigate
    event.preventDefault();
    closeDrawer();
    if (lenis) lenis.scrollTo(0, { duration: 1.3 });
    else window.scrollTo({ top: 0 });
  });
});

/* A cross-page link such as /#visit arrives through the browser's own hash
   jump, which knows nothing about the sticky header and leaves the section
   tucked underneath it. This re-seats it — and has to run AFTER
   ScrollTrigger.refresh(), which otherwise restores the scroll it recorded
   and undoes the correction. */
function seatHash() {
  if (window.location.hash.length < 2) return;

  const landing = document.querySelector<HTMLElement>(window.location.hash);
  if (!landing) return;

  const y = landing.getBoundingClientRect().top + window.scrollY + headerOffset();
  if (lenis) lenis.scrollTo(y, { immediate: true });
  else window.scrollTo({ top: y });
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

if (!reduce) {
  const words = gsap.utils.toArray<HTMLElement>('[data-hero-title] .word__in');
  if (words.length) {
    gsap.to(words, {
      y: 0,
      duration: 1.25,
      ease: 'power4.out',
      stagger: 0.07,
      delay: 0.1,
    });
  }

  const media = document.querySelector<HTMLElement>('[data-hero-media]');
  const hero = document.querySelector<HTMLElement>('.hero');
  if (media && hero) {
    gsap.to(media, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
}

const heroVideo = document.querySelector<HTMLIFrameElement>('[data-hero-video]');
if (heroVideo) {
  if (reduce) {
    heroVideo.remove();
  } else {
    heroVideo.addEventListener('load', () => {
      // Give the player a beat to paint its first frame before crossfading.
      window.setTimeout(() => heroVideo.classList.add('is-ready'), 700);
    });
  }
}

/* -------------------------------------------------------------------------- */
/* Section reveals                                                            */
/* -------------------------------------------------------------------------- */

if (!reduce) {
  const from: Record<string, gsap.TweenVars> = {
    up: { y: 0 },
    fade: {},
    left: { x: 0 },
    right: { x: 0 },
    scale: { scale: 1 },
  };

  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    const kind = el.dataset.reveal ?? 'up';
    const step = Number(el.dataset.stagger ?? 0);

    gsap.to(el, {
      opacity: 1,
      ...(from[kind] ?? from.up),
      duration: kind === 'scale' ? 1.4 : 1,
      ease: 'power3.out',
      delay: step * 0.09,
      /* Hand transform back to CSS once the reveal is done, otherwise the
         leftover inline value outranks the stylesheet and any
         `:hover { transform }` on a revealed element silently dies.
         Order matters: the class must land BEFORE the inline transform is
         dropped, because the start-state rule is gated on
         `:not(.is-revealed)` — clear it first and the start offset reasserts
         itself, leaving the element permanently 40px low. */
      onComplete() {
        el.classList.add('is-revealed');
        gsap.set(el, { clearProps: 'transform' });
      },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  /* Images with a parallax budget — overscaled so no edge is ever exposed. */
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax ?? 0.08) * 100;
    const box = el.parentElement ?? el;

    gsap.fromTo(
      el,
      { yPercent: -amount, scale: 1.16 },
      {
        yPercent: amount,
        scale: 1.16,
        ease: 'none',
        scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

/* -------------------------------------------------------------------------- */
/* Mission statement — words lift out of the page as it scrolls past          */
/* -------------------------------------------------------------------------- */

const mission = document.querySelector<HTMLElement>('[data-mission]');

if (mission && !reduce) {
  const words = (mission.textContent ?? '').trim().split(/\s+/);
  const frag = document.createDocumentFragment();

  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.className = 'mw';
    span.textContent = word;
    frag.appendChild(span);
    if (i < words.length - 1) frag.appendChild(document.createTextNode(' '));
  });

  mission.textContent = '';
  mission.appendChild(frag);

  gsap.fromTo(
    mission.querySelectorAll('.mw'),
    { opacity: 0.2 },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.5,
      scrollTrigger: {
        trigger: mission,
        start: 'top 85%',
        end: 'bottom 60%',
        scrub: true,
      },
    },
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile drawer                                                              */
/* -------------------------------------------------------------------------- */

const drawer = document.querySelector<HTMLElement>('[data-drawer]');
const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');

function openDrawer() {
  if (!drawer) return;
  drawer.hidden = false;
  openBtn?.setAttribute('aria-expanded', 'true');
  lenis?.stop();

  const panel = drawer.querySelector('.drawer__panel');
  const links = drawer.querySelectorAll('[data-drawer-link], .drawer__phone');

  if (reduce) {
    closeBtn?.focus();
    return;
  }

  gsap
    .timeline()
    .fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.6, ease: 'power3.out' })
    .fromTo(
      links,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' },
      '-=0.3',
    )
    .add(() => closeBtn?.focus());
}

function closeDrawer() {
  if (!drawer || drawer.hidden) return;
  openBtn?.setAttribute('aria-expanded', 'false');

  const finish = () => {
    drawer.hidden = true;
    lenis?.start();
  };

  if (reduce) {
    finish();
    return;
  }

  gsap.to(drawer.querySelector('.drawer__panel'), {
    xPercent: 100,
    duration: 0.45,
    ease: 'power3.in',
    onComplete: finish,
  });
}

openBtn?.addEventListener('click', openDrawer);
closeBtn?.addEventListener('click', () => {
  closeDrawer();
  openBtn?.focus();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && drawer && !drawer.hidden) {
    closeDrawer();
    openBtn?.focus();
  }
});

/* -------------------------------------------------------------------------- */
/* Nav island wiring                                                          */
/* -------------------------------------------------------------------------- */

if (navEl && islandEl) {
  navLinks().forEach((link) => {
    const lift = () => {
      navHovered = link;
      moveIsland(link);
    };
    link.addEventListener('pointerenter', lift);
    // Keyboard gets the same island, not a different affordance.
    link.addEventListener('focus', lift);
  });

  const release = () => {
    navHovered = null;
    moveIsland(activeNavLink());
  };

  navEl.addEventListener('pointerleave', release);
  navEl.addEventListener('focusout', (event) => {
    if (!navEl.contains(event.relatedTarget as Node | null)) release();
  });

  // Links reflow with the header, so re-park without animating.
  window.addEventListener('resize', () => moveIsland(navHovered ?? activeNavLink(), true));
  document.fonts?.ready.then(() => moveIsland(navHovered ?? activeNavLink(), true));
}

/* -------------------------------------------------------------------------- */
/* Lineup filter (Distillery page)                                            */
/*                                                                            */
/* Filtering is a content change, not decoration, so it runs regardless of     */
/* motion preference — only the transition is conditional. Cards leave on      */
/* opacity and transform, are then taken out of the flow, and the survivors    */
/* stagger back in.                                                           */
/* -------------------------------------------------------------------------- */

const lineupRoot = document.querySelector<HTMLElement>('[data-lineup]');

if (lineupRoot) {
  const tabs = Array.from(lineupRoot.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const cards = Array.from(lineupRoot.querySelectorAll<HTMLElement>('[data-group]'));
  const status = lineupRoot.querySelector<HTMLElement>('[data-lineup-status]');

  const apply = (filter: string) => {
    tabs.forEach((tab) => {
      const on = tab.dataset.filter === filter;
      tab.classList.toggle('is-on', on);
      tab.setAttribute('aria-pressed', String(on));
    });

    const keep = cards.filter((c) => filter === 'all' || c.dataset.group === filter);
    const drop = cards.filter((c) => !keep.includes(c));

    if (status) {
      status.textContent = `${keep.length} of ${cards.length} spirits shown`;
    }

    if (reduce) {
      drop.forEach((c) => (c.hidden = true));
      keep.forEach((c) => {
        c.hidden = false;
        gsap.set(c, { clearProps: 'all' });
      });
      return;
    }

    gsap.killTweensOf(cards);

    if (drop.length) {
      gsap.to(drop, {
        opacity: 0,
        y: 12,
        scale: 0.97,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => drop.forEach((c) => (c.hidden = true)),
      });
    }

    const entering = keep.filter((c) => c.hidden);
    keep.forEach((c) => (c.hidden = false));

    if (entering.length) {
      gsap.fromTo(
        entering,
        { opacity: 0, y: 16, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: 'power3.out',
          stagger: 0.04,
          delay: drop.length ? 0.16 : 0,
          clearProps: 'transform',
        },
      );
    }

    ScrollTrigger.refresh();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => apply(tab.dataset.filter ?? 'all'));
  });
}

/* -------------------------------------------------------------------------- */
/* Cursor dot                                                                 */
/*                                                                            */
/* A 44px circle trailing the pointer. The system cursor stays visible and    */
/* does the pointing; this follows with eased lag and swells to full size     */
/* over anything clickable.                                                   */
/*                                                                            */
/* The box stays 44px for its whole life — only `scale` changes, so it never  */
/* leaves its composited layer or triggers layout. Difference blending        */
/* inverts whatever is beneath it instead of being recoloured per section.    */
/*                                                                            */
/* Off for coarse pointers, reduced motion and forced colours.                */
/* -------------------------------------------------------------------------- */

if (canHover && !reduce && !forcedColors) {
  /** 10px idle inside the 44px box. */
  const IDLE = 10 / 44;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');
  document.body.appendChild(dot);

  /* One-time base transform. The -50% pair centres the box on the pointer;
     parking it off-screen keeps it out of the top-left corner until the
     first move. */
  gsap.set(dot, { xPercent: -50, yPercent: -50, scale: IDLE, x: -120, y: -120 });

  window.addEventListener(
    'mousemove',
    (event) => {
      gsap.to(dot, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.35,
        ease: 'power3.out',
        // 'auto' only clears the properties in conflict, so this never kills
        // an in-flight scale tween — and moves cannot stack into jitter.
        overwrite: 'auto',
      });
    },
    { passive: true },
  );

  const MAGNETIC = 'a, button, [data-magnetic]';

  const setActive = (active: boolean) => {
    dot.dataset.active = String(active);
    gsap.to(dot, {
      scale: active ? 1 : IDLE,
      duration: 0.24,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  document.addEventListener('mouseover', (event) => {
    if ((event.target as Element | null)?.closest?.(MAGNETIC)) setActive(true);
  });

  document.addEventListener('mouseout', (event) => {
    const target = (event.target as Element | null)?.closest?.(MAGNETIC);
    if (!target) return;

    /* mouseout also fires when the pointer moves onto a child, which would
       shrink the dot inside the very element it is sitting on. Only stand
       down once the pointer has genuinely left. */
    const next = event.relatedTarget;
    if (next instanceof Node && target.contains(next)) return;

    setActive(false);
  });
}

/* -------------------------------------------------------------------------- */
/* Keep trigger positions honest once webfonts and images settle              */
/* -------------------------------------------------------------------------- */

document.fonts?.ready.then(() => ScrollTrigger.refresh());

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
  /* The browser keeps re-anchoring to the hash while images above the target
     finish loading, so a single correction gets overwritten. Seat once the
     page has stopped moving, and again as a safety net. */
  window.setTimeout(seatHash, 120);
  window.setTimeout(seatHash, 600);
});
