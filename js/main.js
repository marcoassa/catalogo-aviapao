/* ============================================================
   PADARIA AVIAPÃO — main.js
   Parallax · Scroll Animations · Lightbox · Snap · Header
   ============================================================ */

'use strict';

/* ── UTILITÁRIOS ─────────────────────────────────────────── */
const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── DOM READY ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initHamburger();
  initScrollAnimations();
  initParallax();
  initLightbox();
  initActiveNavLink();
});

/* ═══════════════════════════════════════════════════════════
   1. HEADER — scroll shrink + glass
═══════════════════════════════════════════════════════════ */
function initHeader() {
  const header = qs('#header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // No snap-container, escuta o próprio container
  const snapContainer = qs('#snap-home');
  if (snapContainer) {
    snapContainer.addEventListener('scroll', onScroll, { passive: true });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ═══════════════════════════════════════════════════════════
   2. HAMBURGER — menu mobile
═══════════════════════════════════════════════════════════ */
function initHamburger() {
  const btn   = qs('#hamburger-btn');
  const links = qs('#nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));

    // Fecha ao clicar em qualquer link
    if (isOpen) {
      qsa('a', links).forEach(a => {
        a.addEventListener('click', closeMenu, { once: true });
      });
    }
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      closeMenu();
    }
  });

  function closeMenu() {
    links.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }
}

/* ═══════════════════════════════════════════════════════════
   3. SCROLL ANIMATIONS — Intersection Observer
═══════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  const elements = qsa('.reveal');
  if (!elements.length) return;

  // Detecta se está dentro do snap container para usar como root
  const snapContainer = qs('#snap-home');

  let snapScrolling = false;
  let snapTimer;

  // Marca quando o snap está rolando e aguarda que ele pare
  // antes de disparar as animações reveal (evita conflito visual)
  if (snapContainer) {
    snapContainer.addEventListener('scroll', () => {
      snapScrolling = true;
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        snapScrolling = false;
      }, 120); // 120ms após parar o scroll, libera os reveals
    }, { passive: true });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        // Se o snap ainda está rolando, aguarda ele parar
        const delay = snapScrolling ? 140 : 0;
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);

        observer.unobserve(el);
      });
    },
    {
      threshold: 0.10,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════
   4. PARALLAX — Hero background
═══════════════════════════════════════════════════════════ */
function initParallax() {
  const heroBg        = qs('#hero-parallax');
  const snapContainer = qs('#snap-home');
  if (!heroBg) return;

  let ticking = false;
  let lastScroll = 0;

  const applyParallax = () => {
    const speed  = 0.35;
    const offset = lastScroll * speed;
    heroBg.style.transform = `scale(1.1) translateY(${offset}px)`;
    ticking = false;
  };

  const onScroll = (scrollY) => {
    lastScroll = scrollY;
    // requestAnimationFrame garante que o parallax não compete
    // com o compositor do snap no mesmo frame
    if (!ticking) {
      requestAnimationFrame(applyParallax);
      ticking = true;
    }
  };

  if (snapContainer) {
    snapContainer.addEventListener('scroll', () => {
      onScroll(snapContainer.scrollTop);
    }, { passive: true });
  } else {
    window.addEventListener('scroll', () => {
      onScroll(window.scrollY);
    }, { passive: true });
  }
}

/* ═══════════════════════════════════════════════════════════
   5. LIGHTBOX
═══════════════════════════════════════════════════════════ */
function initLightbox() {
  const lightbox     = qs('#lightbox');
  const lightboxImg  = qs('#lightbox-img');
  const closeBtn     = qs('#lightbox-close');
  if (!lightbox || !lightboxImg) return;

  // Abre ao clicar em qualquer card lightbox-trigger
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.lightbox-trigger');
    if (!trigger) return;

    const src = trigger.getAttribute('data-src') || '';
    const alt = trigger.getAttribute('data-alt') || '';

    // Só abre se tiver imagem real (não placeholder)
    const imgEl = trigger.querySelector('img');
    if (imgEl && imgEl.complete && imgEl.naturalWidth === 0) return; // imagem falhou

    lightboxImg.src = src || (imgEl ? imgEl.src : '');
    lightboxImg.alt = alt;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Foco acessível
    closeBtn && closeBtn.focus();
  });

  // Fecha ao clicar no botão
  closeBtn && closeBtn.addEventListener('click', closeLightbox);

  // Fecha ao clicar no fundo
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Fecha com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImg.src = '';
    lightboxImg.alt = '';
  }
}

/* ═══════════════════════════════════════════════════════════
   6. ACTIVE NAV LINK — destaca a página atual
═══════════════════════════════════════════════════════════ */
function initActiveNavLink() {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = qsa('.nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop().split('#')[0] || 'index.html';

    if (linkFile === currentFile) {
      // Não remove a classe active existente — já foi definida no HTML
      link.classList.add('active');
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   7. SMOOTH SNAP — navegação por teclado nas seções snap
═══════════════════════════════════════════════════════════ */
(function initSnapKeyboard() {
  const snapContainer = qs('#snap-home');
  if (!snapContainer) return;

  const sections = qsa('.snap-section', snapContainer);
  let currentIdx = 0;

  snapContainer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      currentIdx = Math.min(currentIdx + 1, sections.length - 1);
      // scrollTop instântaneo: o snap cuida da animação nativamente
      // (não usar scrollIntoView smooth pois conflita com snap mandatory)
      snapContainer.scrollTop = sections[currentIdx].offsetTop;
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      currentIdx = Math.max(currentIdx - 1, 0);
      snapContainer.scrollTop = sections[currentIdx].offsetTop;
    }
  });
})();

/* ═══════════════════════════════════════════════════════════
   8. ANCHOR LINKS — navegação global de outras páginas
═══════════════════════════════════════════════════════════ */
(function initAnchorScroll() {
  // Se chegou na página com #hash, rola suavemente até a seção
  if (window.location.hash) {
    setTimeout(() => {
      const target = qs(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }
})();

/* ═══════════════════════════════════════════════════════════
   9. HEADER SECTION DETECTION (somente na Home)
═══════════════════════════════════════════════════════════ */
(function initSectionObserver() {
  const snapContainer = qs('#snap-home');
  const navLinks = qsa('.nav-links a[href^="index.html#"], .nav-links a[href^="#"]');
  if (!snapContainer || !navLinks.length) return;

  const sections = qsa('.snap-section[id]', snapContainer);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          const linkId = href.split('#')[1];
          if (linkId === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      });
    },
    { root: snapContainer, threshold: 0.55 }
  );

  sections.forEach(s => observer.observe(s));
})();

/* ═══════════════════════════════════════════════════════════
   10. PAGE ENTRANCE ANIMATION
═══════════════════════════════════════════════════════════ */
document.body.classList.add('page-fade-in');
