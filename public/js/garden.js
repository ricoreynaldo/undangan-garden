// Semua gerak dekoratif taman: bunga mekar saat terlihat, kelopak berjatuhan (canvas),
// kupu-kupu yang menghindari jari/kursor, sulur cerita mengikuti gulir, dan
// "tanam bunga" saat area kosong diketuk. app.js tetap jalan tanpa file ini.
(() => {
  const root = document.documentElement;
  if (!root.classList.contains('motion')) return;

  const C = window.INVITATION || {};
  const OPT = { petals: true, butterflies: 3, plant: true, ...(C.garden || {}) };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const small = matchMedia('(max-width: 640px)').matches;

  // ---------- tampil & mekar saat terlihat ----------
  const reveal = new IntersectionObserver((entries) => {
    let k = 0;
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.style.setProperty('--rd', `${(k++ * 0.09).toFixed(2)}s`);
      e.target.classList.add('in');
      reveal.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  const bloom = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      e.target.classList.toggle('live', e.isIntersecting); // goyangan dijeda di luar layar
      if (e.isIntersecting) e.target.classList.add('bloomed');
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.15 });

  // Sampul langsung mekar (berurutan per pojok)
  const coverFlora = $$('#cover .flora');
  const order = { tl: 0, br: 0.25, tr: 0.45, bl: 0.65 };
  coverFlora.forEach((f) => {
    const corner = f.closest('.corner');
    const b = corner ? order[[...corner.classList].find((c) => c in order)] : 0.35;
    f.style.setProperty('--b', `${b + 0.2}s`);
  });
  requestAnimationFrame(() => setTimeout(() => coverFlora.forEach((f) => f.classList.add('bloomed', 'live')), 60));

  function startGarden() {
    $$('main [data-reveal]').forEach((el) => reveal.observe(el));
    $$('.flora:not(.manual)').forEach((el) => { if (!el.closest('#cover')) bloom.observe(el); });
  }

  // ---------- kelopak berjatuhan (canvas) ----------
  const cv = $('#petals');
  const ctx = cv.getContext('2d');
  const COLORS = ['#f6c9c6', '#f0a9b0', '#fde3df', '#ffffff', '#f7dca0', '#d9cdf0', '#f9c3a8'];
  let W = 0, H = 0;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  addEventListener('resize', resize);

  const makePetal = (top) => ({
    x: Math.random() * W,
    y: top ? rand(-60, -10) : Math.random() * H,
    r: rand(4.5, 9),
    vy: rand(0.35, 0.95),
    vx: rand(-0.15, 0.15),
    sw: Math.random() * 6.28, swS: rand(0.008, 0.022),
    rot: Math.random() * 6.28, vr: rand(-0.03, 0.03),
    flip: Math.random() * 6.28, vf: rand(0.02, 0.06),
    depth: rand(0.3, 1),
    c: pick(COLORS), a: rand(0.55, 0.95),
  });
  const petals = OPT.petals ? Array.from({ length: small ? 16 : 28 }, () => makePetal(false)) : [];
  const sparks = []; // partikel ledakan kelopak (bergravitasi, memudar)

  function drawPetal(p, alpha) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.scale(1, Math.cos(p.flip) * 0.9 + 0.1);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.c;
    const r = p.r;
    ctx.beginPath();
    ctx.moveTo(0, r);
    ctx.bezierCurveTo(-r * 0.95, r * 0.35, -r * 0.7, -r * 0.9, -r * 0.12, -r);
    ctx.lineTo(0, -r * 0.78);
    ctx.lineTo(r * 0.12, -r);
    ctx.bezierCurveTo(r * 0.7, -r * 0.9, r * 0.95, r * 0.35, 0, r);
    ctx.fill();
    ctx.restore();
  }

  function burst(x, y, n = 24) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, sp = rand(1.5, 5.5);
      sparks.push({
        x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2.2,
        r: rand(4, 8), rot: Math.random() * 6.28, vr: rand(-0.12, 0.12),
        flip: Math.random() * 6.28, vf: rand(0.08, 0.16), c: pick(COLORS), life: 1,
      });
    }
    if (sparks.length > 160) sparks.splice(0, sparks.length - 160);
  }

  let last = performance.now(), t = 0, lastY = scrollY;
  function frame(now) {
    const dt = Math.min((now - last) / 16.67, 3);
    last = now; t += dt;
    const dy = scrollY - lastY; lastY = scrollY;
    const wind = Math.sin(t * 0.004) * 0.35 + Math.sin(t * 0.0013) * 0.25;
    ctx.clearRect(0, 0, W, H);

    for (const p of petals) {
      p.sw += p.swS * dt;
      p.x += (p.vx + wind + Math.sin(p.sw) * 0.55) * dt;
      p.y += p.vy * dt - dy * p.depth * 0.25; // ikut bergeser saat digulir (kesan kedalaman)
      p.rot += p.vr * dt;
      p.flip += p.vf * dt;
      if (p.y < -40) p.y += H + 60;
      if (p.y > H + 30 || p.x < -40 || p.x > W + 40) Object.assign(p, makePetal(true));
      drawPetal(p, p.a);
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.vy += 0.07 * dt; s.vx *= 0.985;
      s.x += s.vx * dt; s.y += s.vy * dt;
      s.rot += s.vr * dt; s.flip += s.vf * dt;
      s.life -= 0.011 * dt;
      if (s.life <= 0 || s.y > H + 30) { sparks.splice(i, 1); continue; }
      drawPetal(s, Math.min(1, s.life * 1.6));
    }

    flutter(dt);
    requestAnimationFrame(frame);
  }

  // ---------- kupu-kupu ----------
  const WINGS = [['#f3a35c', '#f9d59a'], ['#8fb1e8', '#d9e5fb'], ['#ea8fa8', '#fbd3de'], ['#b29ce0', '#ece4fb'], ['#f2c84b', '#fff0b8']];
  const wing = (a, b) => `<path d="M0-1C-6-17-26-23-27-10C-28-1-14 3 0 1Z" fill="${a}"/><path d="M0-1C-8-11-20-14-21-8C-21-3-12 0 0 0Z" fill="${b}" opacity=".85"/>`
    + `<path d="M0 1C-7 4-19 9-16 18C-13 24-4 14 0 3Z" fill="${a}"/><circle cx="-18" cy="-11" r="2.2" fill="#fff" opacity=".7"/>`;
  const box = $('#flutter');
  const flies = Array.from({ length: Math.max(0, Math.min(OPT.butterflies | 0, 6)) }, (_, i) => {
    const [a, b] = WINGS[i % WINGS.length];
    const el = document.createElement('div');
    el.className = 'bf';
    el.style.setProperty('--fl', `${rand(0.18, 0.26).toFixed(2)}s`);
    el.innerHTML = `<svg viewBox="-30 -30 60 60"><g class="wl">${wing(a, b)}</g><g class="wr"><g transform="scale(-1 1)">${wing(a, b)}</g></g>`
      + '<ellipse rx="1.8" ry="10" cy="2" fill="#4a3a34"/><path d="M0-8Q-3-15-6-18M0-8Q3-15 6-18" stroke="#4a3a34" stroke-width="1" fill="none"/></svg>';
    box.append(el);
    return { el, x: rand(0.1, 0.9) * W, y: rand(0.15, 0.85) * H, a: Math.random() * 6.28, v: rand(0.9, 1.4), seed: Math.random() * 100, t: 0, s: rand(0.75, 1.1) };
  });
  let px = -999, py = -999;
  addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; }, { passive: true });
  addEventListener('pointerdown', (e) => { px = e.clientX; py = e.clientY; }, { passive: true });
  const turn = (want, cur) => Math.atan2(Math.sin(want - cur), Math.cos(want - cur));

  function flutter(dt) {
    for (const b of flies) {
      b.t += dt * 0.012;
      b.a += (Math.sin(b.t * 1.7 + b.seed) * 0.045 + Math.sin(b.t * 0.6 + b.seed * 2) * 0.03) * dt;
      const m = 50;
      if (b.x < m || b.x > W - m || b.y < m || b.y > H - m) b.a += turn(Math.atan2(H / 2 - b.y, W / 2 - b.x), b.a) * 0.06 * dt;
      let sp = b.v;
      const dx = b.x - px, dy = b.y - py;
      if (dx * dx + dy * dy < 130 * 130) { b.a += turn(Math.atan2(dy, dx), b.a) * 0.2 * dt; sp *= 2.6; }
      b.x += Math.cos(b.a) * sp * dt;
      b.y += Math.sin(b.a) * sp * dt + Math.sin(b.t * 9) * 0.5 * dt;
      b.el.style.transform = `translate3d(${(b.x - 17).toFixed(1)}px,${(b.y - 17).toFixed(1)}px,0) rotate(${((b.a * 180) / Math.PI + 90).toFixed(1)}deg) scale(${b.s})`;
    }
  }

  // ---------- gulir: sulur cerita + paralaks hero ----------
  const storyWrap = $('#storyWrap');
  const archImg = $('.arch-photo img');
  const sun = $('.hero-sun');
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const vh = innerHeight;
      if (storyWrap) {
        const r = storyWrap.getBoundingClientRect();
        const p = Math.min(Math.max((vh * 0.62 - r.top) / r.height, 0), 1);
        storyWrap.style.setProperty('--p', p.toFixed(4));
      }
      const y = scrollY;
      if (y < vh * 1.2) {
        if (archImg) archImg.style.transform = `translateY(${(y * 0.06).toFixed(1)}px) scale(1.08)`;
        if (sun) sun.style.transform = `translate(-50%, ${(y * 0.25).toFixed(1)}px)`;
      }
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  // ---------- ketuk untuk menanam bunga ----------
  const planted = $('#planted');
  const KINDS = [['daisy', 'white'], ['cosmos', 'blush'], ['blossom', 'lav'], ['rose', 'rose'], ['poppy', 'coral'], ['cosmos', 'butter'], ['peony', 'blush'], ['blossom', 'peach']];
  function plant(e) {
    if (!OPT.plant || !root.classList.contains('started') || !window.FLORA) return;
    if (e.target.closest('a, button, input, select, textarea, label, iframe, img, .lightbox, .card, .gift, .story-card, .music')) return;
    const [kind, pal] = pick(KINDS);
    const el = document.createElement('div');
    el.className = 'plant';
    el.style.left = `${e.pageX}px`;
    el.style.top = `${e.pageY}px`;
    el.style.setProperty('--s', rand(0.8, 1.25).toFixed(2));
    el.innerHTML = window.FLORA.glyph(kind, pal, Math.round(rand(0, 360)));
    planted.append(el);
    while (planted.children.length > 14) planted.firstElementChild.remove();
    requestAnimationFrame(() => requestAnimationFrame(() => el.firstElementChild.classList.add('bloomed')));
    burst(e.clientX, e.clientY, 8);
    setTimeout(() => el.classList.add('wilt'), 2800);
    setTimeout(() => el.remove(), 3700);
  }
  addEventListener('click', plant);

  // ---------- API untuk app.js ----------
  window.__garden = {
    burst,
    roll(el, v) {
      el.innerHTML = `<span class="tick">${v}</span>`;
    },
    stagger(els) {
      els.forEach((el, i) => { el.style.setProperty('--rd', `${(i * 0.07).toFixed(2)}s`); el.classList.add('pop'); });
    },
  };

  window.addEventListener('invite-open', () => {
    burst(W / 2, H * 0.62, small ? 36 : 56);
    startGarden();
    onScroll();
  }, { once: true });

  requestAnimationFrame(frame);
})();
