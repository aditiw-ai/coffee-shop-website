/* ══════════════════════════════════════════
   GROUNDED COFFEE — script.js (Vintage Cinema Edition)
══════════════════════════════════════════ */
'use strict';

/* ── MENU DATA ── */
const menuData = {
  hot: [
    { name: 'Signature Espresso',    desc: 'Double shot of our house blend. Notes of dark chocolate, hazelnut & dried cherry.', price: '$4.50', badge: 'House Favourite', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=75' },
    { name: 'Cortado', desc: 'Equal parts espresso and warm micro-foamed milk. Balanced, rich, direct.', price: '$7.00', badge: null, img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80'},
    { name: 'Ethiopian Pour Over',   desc: 'Single origin Yirgacheffe. Bright & floral with notes of jasmine and bergamot.',      price: '$6.50', badge: 'Single Origin',  img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=75' },
    { name: 'Oat Milk Flat White',   desc: 'Silky, smooth and satisfying. Velvety microfoam meets a double ristretto.',           price: '$5.50', badge: 'Plant-Based',    img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=75' },
    { name: 'Cinnamon Honey Latte',  desc: 'House espresso, steamed milk, raw honey & a dusting of Ceylon cinnamon.',             price: '$6.00', badge: 'Seasonal',       img: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=600&q=75' },
    { name: 'Classic Cappuccino',    desc: 'One part espresso, one part steamed milk, one part cloud-like foam. Timeless.',       price: '$5.00', badge: null,             img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=75' }
  ],
  cold: [
    { name: 'Cold Brew Reserve',     desc: '20-hour slow steep. Smooth, low-acid and dangerously drinkable.',                     price: '$6.00', badge: 'Best Seller',    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=75' },
    { name: 'Iced Caramel Cortado',  desc: 'Double ristretto over ice with house-made salted caramel and oat milk.',              price: '$6.50', badge: null,             img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=75' },
    { name: 'Nitro Cold Brew',       desc: 'Cold brew infused with nitrogen for a creamy, stout-like texture. Served straight.',  price: '$7.00', badge: 'On Tap',         img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=75' },
    { name: 'Espresso Tonic',        desc: 'Bright tonic water, house cold brew and a shot of espresso. Unexpectedly brilliant.', price: '$7.50', badge: 'Signature',      img: 'https://images.unsplash.com/photo-1562547256-2c5ee93b60b7?w=600&q=75' }
  ],
  food: [
    { name: 'Cardamom Morning Bun',  desc: 'Laminated pastry rolled in cardamom sugar. Buttery, flaky and freshly baked daily.',  price: '$4.00', badge: 'Baked Daily',    img: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=600&q=75' },
    { name: 'Avocado Toast',         desc: 'Sourdough, whipped feta, smashed avocado, chilli flakes and a poached egg.',          price: '$12.00', badge: null,            img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=600&q=75' },
    { name: 'Banana Walnut Slice',   desc: 'House-baked banana loaf with toasted walnuts and a brown butter glaze drizzle.',      price: '$5.50', badge: 'GF Option',      img: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&q=75' },
    { name: 'Granola Bowl',          desc: 'House-made clusters, seasonal fruit compote, coconut yoghurt and bee pollen.',        price: '$10.00', badge: 'Vegan',         img: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=600&q=75' }
  ]
};

/* ── RENDER MENU ── */
function renderMenu(tab) {
  const grid = document.getElementById('menuGrid');
  const items = menuData[tab];

  // Fade out
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(14px)';
  grid.style.transition = 'opacity 0.22s ease, transform 0.22s ease';

  setTimeout(() => {
    grid.innerHTML = items.map(item => `
      <article class="menu-card">
        <div class="menu-card-img">
          <img src="${item.img}" alt="${item.name}" loading="lazy" />
          ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
        </div>
        <div class="menu-card-body">
          <h3 class="menu-card-name">${item.name}</h3>
          <p class="menu-card-desc">${item.desc}</p>
          <div class="menu-card-footer">
            <span class="menu-card-price">${item.price}</span>
            <button class="menu-card-add" aria-label="Add ${item.name}">+</button>
          </div>
        </div>
      </article>
    `).join('');

    // Staggered card entrance
    const cards = grid.querySelectorAll('.menu-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(24px)';
      card.style.transition = `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms,
                               transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms,
                               box-shadow 0.45s ease`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }));
    });

    // Fade grid back in
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
    grid.style.transition = 'opacity 0.30s ease, transform 0.30s ease';

    // Add button interaction
    grid.querySelectorAll('.menu-card-add').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (btn.dataset.animating) return;
        btn.dataset.animating = '1';
        const orig = btn.textContent;
        btn.textContent = '✓';
        btn.style.background = 'var(--caramel)';
        btn.style.color = 'white';
        btn.style.boxShadow = '0 0 20px rgba(184,115,51,0.55)';
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.boxShadow = '';
          delete btn.dataset.animating;
        }, 1600);
      });
    });
  }, 220);
}

/* ── TABS ── */
function initTabs() {
  document.getElementById('menuTabs').querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.tab);
    });
  });
}

/* ── NAVBAR ── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── MOBILE MENU ── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', e => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ── CUSTOM CURSOR ── */
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');
  if (!cursor || !cursorTrail) return;

  let mx = 0, my = 0;
  let tx = 0, ty = 0;
  let raf;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Trail uses lerp for smooth follow
  function animateTrail() {
    tx += (mx - tx) * 0.15;
    ty += (my - ty) * 0.15;
    cursorTrail.style.left = tx + 'px';
    cursorTrail.style.top  = ty + 'px';
    raf = requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Hide on leave
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorTrail.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorTrail.style.opacity = '1';
  });
}

/* ── HERO PARTICLES (floating steam dots) ── */
function initHeroParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const count = 12;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 3 + Math.random() * 5;
    const left = 8 + Math.random() * 55; // left half of hero
    const dur  = 4 + Math.random() * 6;
    const delay = Math.random() * 8;

    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${left}%; bottom: ${20 + Math.random() * 20}%;
      --dur: ${dur}s; --delay: ${delay}s;
    `;
    container.appendChild(p);
  }
}

/* ── PARALLAX HERO ── */
function initParallax() {
  const img = document.getElementById('heroImg');
  if (!img || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      img.style.transform = `scale(1.0) translateY(${y * 0.28}px)`;
    }
  }, { passive: true });
}

/* ── HERO IMAGE LOAD ── */
function initHeroImage() {
  const img = document.getElementById('heroImg');
  if (!img) return;
  const reveal = () => img.classList.add('loaded');
  img.complete ? reveal() : img.addEventListener('load', reveal);
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  // Generic [data-reveal] elements
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

  // Section-level stagger
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const children = entry.target.querySelectorAll(
        '.pillar, .about-body, .footer-col, .testimonial-card, .section-header, .menu-card'
      );
      children.forEach((child, i) => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(28px)';
        child.style.transition = `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms,
                                   transform 0.65s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        }));
      });
      sectionObs.unobserve(entry.target);
    });
  }, { threshold: 0.06 });

  document.querySelectorAll('.about, .testimonials, .footer-top').forEach(el => sectionObs.observe(el));
}

/* ── ACTIVE NAV ── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(link => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.style.color = isActive ? 'var(--gold-light)' : '';
        });
      }
    });
  }, { threshold: 0.40 });

  sections.forEach(s => obs.observe(s));
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── NEWSLETTER ── */
function initNewsletter() {
  const btn     = document.getElementById('subscribeBtn');
  const success = document.getElementById('newsletterSuccess');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const input = btn.closest('.newsletter-form').querySelector('input');
    const email = input.value.trim();

    if (!email || !email.includes('@')) {
      input.style.borderBottom = '2px solid rgba(200,80,80,0.70)';
      input.focus();
      setTimeout(() => input.style.borderBottom = '', 2000);
      return;
    }

    const textEl = btn.querySelector('.btn-text');
    if (textEl) textEl.textContent = '✓';
    btn.disabled = input.disabled = true;
    success.classList.add('show');

    setTimeout(() => {
      if (textEl) textEl.textContent = 'Subscribe';
      btn.disabled = input.disabled = false;
      input.value = '';
      success.classList.remove('show');
    }, 4500);
  });

  const input = btn.closest('.newsletter-form').querySelector('input');
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
}

/* ── GALLERY HOVER TILT ── */
function initGalleryTilt() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
      item.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.transition = 'transform 0.5s ease';
      setTimeout(() => item.style.transition = '', 500);
    });
  });
}

/* ── CANVAS STEAM WISPS ──
   Renders organic, drifting smoke trails on the hero canvas.
   Completely replaces the DOM-particle approach with smoother visuals.
*/
function initHeroSteam() {
  const canvas = document.getElementById('heroSteamCanvas');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let W, H, wisps;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeWisp() {
    return {
      x:     W * (0.05 + Math.random() * 0.50), // left-half cluster
      y:     H * (0.55 + Math.random() * 0.30), // near bottom third
      vy:    -(0.18 + Math.random() * 0.30),     // rise speed
      vx:    (Math.random() - 0.5) * 0.12,       // slight horizontal drift
      r:     6 + Math.random() * 14,             // radius
      alpha: 0,
      maxA:  0.06 + Math.random() * 0.10,        // peak opacity
      phase: Math.random() * Math.PI * 2,        // sine wave offset
      amp:   0.4 + Math.random() * 0.8,          // horizontal sine amplitude
      life:  0,                                  // 0→1
      dur:   200 + Math.random() * 220,          // frames to live
    };
  }

  function resetWisp(w) { Object.assign(w, makeWisp()); }

  function initWisps() {
    wisps = Array.from({ length: 18 }, makeWisp);
    // stagger start so they don't all appear together
    wisps.forEach((w, i) => { w.life = (i / wisps.length) * w.dur; });
  }

  function drawFrame() {
    ctx.clearRect(0, 0, W, H);
    wisps.forEach(w => {
      w.life++;
      if (w.life > w.dur) { resetWisp(w); return; }

      const t = w.life / w.dur;
      // alpha: fade in then fade out
      w.alpha = t < 0.25
        ? (t / 0.25) * w.maxA
        : t > 0.70
          ? ((1 - t) / 0.30) * w.maxA
          : w.maxA;

      // position
      const sineX = Math.sin(w.phase + w.life * 0.025) * w.amp;
      const px = w.x + w.life * (w.vx + sineX * 0.04);
      const py = w.y + w.life * w.vy;

      // grow radius slightly as it rises
      const r = w.r * (1 + t * 0.6);

      const grad = ctx.createRadialGradient(px, py, 0, px, py, r);
      grad.addColorStop(0,   `rgba(220, 175, 100, ${w.alpha})`);
      grad.addColorStop(0.5, `rgba(200, 140,  70, ${w.alpha * 0.55})`);
      grad.addColorStop(1,   `rgba(180, 110,  50, 0)`);

      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    requestAnimationFrame(drawFrame);
  }

  resize();
  initWisps();
  drawFrame();

  window.addEventListener('resize', () => { resize(); initWisps(); }, { passive: true });
}

/* ── MAGNETIC BUTTONS ──
   Gently pulls .btn-glow elements toward the cursor when hovering nearby.
   Gives a premium, tactile feel without requiring a library.
*/
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.btn-glow').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect  = btn.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const dx    = (e.clientX - cx) * 0.28;
      const dy    = (e.clientY - cy) * 0.28;
      btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      setTimeout(() => btn.style.transition = '', 500);
    });
  });
}

/* ── ORNAMENT DIVIDER REVEAL ──
   The ornamental SVG divider uses [data-reveal] logic but needs a
   scaleX transform, so we give it its own lightweight observer.
*/
function initOrnamentReveal() {
  const divider = document.querySelector('.ornament-divider');
  if (!divider) return;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      divider.classList.add('revealed');
      obs.disconnect();
    }
  }, { threshold: 0.3 });
  obs.observe(divider);
}

/* ════════════════════════════════════════════════════
   NEW FEATURES
   1. Reserve a Table popup
   2. Order Now popup
   3. Contact Form
════════════════════════════════════════════════════ */

/* ── SHARED POPUP HELPERS ── */

/**
 * openPopup(overlayId)
 * Adds the "open" class to the overlay so CSS transitions play.
 * Also locks body scroll so the page behind doesn't scroll.
 */
function openPopup(overlayId) {
  const overlay = document.getElementById(overlayId);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Move focus inside the popup for accessibility
  const firstInput = overlay.querySelector('input, button:not(.popup-close)');
  if (firstInput) setTimeout(() => firstInput.focus(), 450);
}

/**
 * closePopup(overlayId)
 * Removes "open" class and restores body scroll.
 */
function closePopup(overlayId) {
  const overlay = document.getElementById(overlayId);
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/**
 * Attach close behaviour:
 *  - The × button inside the popup
 *  - Clicking the dark backdrop (outside the popup box)
 *  - Pressing Escape
 */
function attachPopupClose(overlayId, closeBtnId) {
  const overlay  = document.getElementById(overlayId);
  const closeBtn = document.getElementById(closeBtnId);
  if (!overlay) return;

  // × button
  closeBtn?.addEventListener('click', () => closePopup(overlayId));

  // Click outside the box
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePopup(overlayId);
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closePopup(overlayId);
    }
  });
}

/* ── SHARED: Show success message then reset a form ── */
function showFormSuccess(successId, formId, delayMs = 3500) {
  const success = document.getElementById(successId);
  const form    = document.getElementById(formId);
  if (!success) return;
  success.classList.add('show');
  // After delay: hide success, reset form
  setTimeout(() => {
    success.classList.remove('show');
    form?.reset();
  }, delayMs);
}

/* ── SHARED: Simple field validation ──
   Marks empty required fields red and returns false if any fail.
   fieldIds = array of input/textarea IDs to check
*/
function validateFields(fieldIds) {
  let valid = true;
  fieldIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('error');
    const isEmpty = el.value.trim() === '';
    const isInvalidEmail = el.type === 'email' && !el.value.includes('@');
    if (isEmpty || isInvalidEmail) {
      el.classList.add('error');
      valid = false;
      // Remove red outline after user starts typing
      el.addEventListener('input', () => el.classList.remove('error'), { once: true });
    }
  });
  return valid;
}

/* ══════════════════════
   1. RESERVE A TABLE
══════════════════════ */
function initReservePopup() {
  // Wire up every button that should open the reserve popup
  // We use querySelectorAll so any future trigger buttons also work
  document.querySelectorAll('#navReserveBtn').forEach(btn => {
    btn.addEventListener('click', () => openPopup('reserveOverlay'));
  });

  attachPopupClose('reserveOverlay', 'reserveClose');

  // Guests stepper  (+/− buttons)
  let guests = 2;
  const guestsValue = document.getElementById('guestsValue');
  const guestsInput = document.getElementById('resGuests');

  document.getElementById('guestsUp')?.addEventListener('click', () => {
    if (guests >= 20) return;           // hard ceiling: 20 guests
    guests++;
    guestsValue.textContent = guests;
    guestsInput.value = guests;
  });
  document.getElementById('guestsDown')?.addEventListener('click', () => {
    if (guests <= 1) return;            // minimum: 1 guest
    guests--;
    guestsValue.textContent = guests;
    guestsInput.value = guests;
  });

  // Form submission
  document.getElementById('reserveForm')?.addEventListener('submit', e => {
    e.preventDefault();
    // Validate required fields
    if (!validateFields(['resName', 'resEmail', 'resDate', 'resTime'])) return;
    showFormSuccess('reserveSuccess', 'reserveForm', 4000);
    // Close popup after a moment so user can read the message
    setTimeout(() => closePopup('reserveOverlay'), 4200);
  });
}

/* ══════════════════════
   2. ORDER NOW
══════════════════════ */
function initOrderPopup() {
  // Open triggers
  document.querySelectorAll('#heroOrderBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      buildOrderItems();
      openPopup('orderOverlay');
    });
  });
  // Also let menu card + buttons open order popup pre-selected
  document.addEventListener('click', e => {
    if (e.target.closest('.menu-card-add')) {
      const card = e.target.closest('.menu-card');
      const name = card?.querySelector('.menu-card-name')?.textContent;
      buildOrderItems(name);   // pass name to pre-select that item
      openPopup('orderOverlay');
    }
  });

  attachPopupClose('orderOverlay', 'orderClose');

  // Submit
  document.getElementById('orderSubmitBtn')?.addEventListener('click', () => {
    // Check at least one item has qty > 0
    const qtys = [...document.querySelectorAll('.qty-display')];
    const anySelected = qtys.some(q => parseInt(q.textContent) > 0);
    if (!anySelected) {
      // Pulse the order list gently to signal "pick something"
      const list = document.getElementById('orderItems');
      list.style.outline = '1px solid rgba(220,80,80,0.40)';
      list.style.borderRadius = '8px';
      setTimeout(() => { list.style.outline = ''; }, 1800);
      return;
    }
    showFormSuccess('orderSuccess', null, 4000);
    setTimeout(() => {
      closePopup('orderOverlay');
      // Reset quantities
      document.querySelectorAll('.qty-display').forEach(q => { q.textContent = '0'; });
      updateOrderSummary();
    }, 4300);
  });
}

/**
 * buildOrderItems(preSelectName)
 * Renders all hot + cold items (drinks only) into #orderItems.
 * If preSelectName is supplied, that item starts with qty = 1.
 */
function buildOrderItems(preSelectName) {
  const container = document.getElementById('orderItems');
  if (!container) return;

  // Combine hot + cold only for ordering
  const allItems = [...menuData.hot, ...menuData.cold];
  container.innerHTML = allItems.map((item, idx) => {
    const startQty = (preSelectName && item.name === preSelectName) ? 1 : 0;
    return `
      <div class="order-item" data-idx="${idx}" data-price="${item.price.replace('$','')}">
        <img class="order-item-img" src="${item.img}" alt="${item.name}" loading="lazy" />
        <div class="order-item-info">
          <div class="order-item-name">${item.name}</div>
          <div class="order-item-price">${item.price}</div>
        </div>
        <div class="order-item-qty">
          <button class="qty-btn qty-minus" aria-label="Decrease quantity">−</button>
          <span class="qty-display">${startQty}</span>
          <button class="qty-btn qty-plus"  aria-label="Increase quantity">+</button>
        </div>
      </div>`;
  }).join('');

  // Delegate quantity clicks
  container.addEventListener('click', e => {
    const btn  = e.target.closest('.qty-btn');
    if (!btn) return;
    const item    = btn.closest('.order-item');
    const display = item.querySelector('.qty-display');
    let qty = parseInt(display.textContent);
    if (btn.classList.contains('qty-plus'))  qty = Math.min(qty + 1, 10);
    if (btn.classList.contains('qty-minus')) qty = Math.max(qty - 1, 0);
    display.textContent = qty;
    // Highlight row if selected
    item.style.borderColor = qty > 0 ? 'rgba(200,150,40,0.35)' : '';
    item.style.background  = qty > 0 ? 'rgba(200,150,40,0.07)' : '';
    updateOrderSummary();
  });

  updateOrderSummary();
}

/** Recalculates and updates the count + total in the order summary bar */
function updateOrderSummary() {
  let totalItems = 0, totalPrice = 0;
  document.querySelectorAll('.order-item').forEach(item => {
    const qty   = parseInt(item.querySelector('.qty-display').textContent);
    const price = parseFloat(item.dataset.price);
    totalItems += qty;
    totalPrice += qty * price;
  });
  const countEl = document.getElementById('orderCount');
  const totalEl = document.getElementById('orderTotal');
  if (countEl) countEl.textContent = totalItems;
  if (totalEl) totalEl.textContent = `$${totalPrice.toFixed(2)}`;
}

/* ══════════════════════
   3. CONTACT FORM
══════════════════════ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateFields(['contactName', 'contactEmail', 'contactMessage'])) return;

    // Disable submit button while "sending"
    const submitBtn = form.querySelector('[type="submit"]');
    const btnText   = submitBtn?.querySelector('.btn-text');
    if (btnText) btnText.textContent = 'Sending…';
    if (submitBtn) submitBtn.disabled = true;

    // Simulate network delay
    setTimeout(() => {
      if (btnText) btnText.textContent = 'Send Message';
      if (submitBtn) submitBtn.disabled = false;
      showFormSuccess('contactSuccess', 'contactForm', 5000);
    }, 900);
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  renderMenu('hot');
  initTabs();
  initNavbar();
  initMobileMenu();
  initCursor();
  initHeroParticles();
  initHeroSteam();
  initParallax();
  initHeroImage();
  initScrollReveal();
  initActiveNav();
  initSmoothScroll();
  initNewsletter();
  initGalleryTilt();
  initMagneticButtons();
  initOrnamentReveal();
  /* ── NEW FEATURES ── */
  initReservePopup();   // Reserve a Table popup
  initOrderPopup();     // Order Now popup
  initContactForm();    // Contact form section
});