// Generator ilustrasi bunga — SVG murni, tanpa file gambar.
// Mengisi setiap elemen [data-flora="…"] (sampul, mahkota lengkung, karangan, padang, sulur, ikon).
// Dekorasi tetap tampil utuh walau animasi mati; garden.js hanya menambah kelas `.bloomed` / `.live`.
//   .pp   = kelopak / bagian kepala bunga (mekar dari pangkal)
//   .lf   = daun (tumbuh dari pangkal)
//   .stem = tangkai / sulur (tergambar lewat stroke-dashoffset, pathLength=1)
// Delay mekar: --b (per svg) + --o (per bunga) + --d (per kelopak).
(() => {
  // [warna pangkal, warna ujung, aksen]
  const PAL = {
    rose: ['#d4677a', '#f9d3d4', '#a8475c'],
    blush: ['#eea9ae', '#fff3f1', '#d48791'],
    white: ['#e8dcc9', '#ffffff', '#cdb995'],
    butter: ['#ecb948', '#fff5cf', '#c98f22'],
    lav: ['#9a84cc', '#efe8fb', '#6f58a8'],
    peach: ['#f09a78', '#ffe7da', '#cf6f52'],
    coral: ['#e77b70', '#ffd9cf', '#bf5048'],
  };
  const LEAF = [['#4a784b', '#9fc38d'], ['#6c9265', '#c7dcb3']];
  const STEM = '#5f8a58';

  const f = (n) => +n.toFixed(2);
  const rng = (seed) => () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  // ---------- gradien (sekali per halaman) ----------
  const defs = Object.entries(PAL).map(([k, [a, b]]) =>
    `<radialGradient id="fl-${k}" cx=".5" cy="1" r="1.1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`).join('')
    + LEAF.map(([a, b], i) => `<linearGradient id="lf-${i}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`).join('');
  document.body.insertAdjacentHTML('afterbegin',
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${defs}</defs></svg>`);

  // ---------- bentuk kelopak (menghadap atas, pangkal di 0,0) ----------
  const P = {
    long: 'M0 0C-6-9-7-33 0-42C7-33 6-9 0 0Z',
    round: 'M0 0C-17-9-19-37 0-41C19-37 17-9 0 0Z',
    notch: 'M0 0C-15-10-19-33-10-40L-4-35L0-41L4-35L10-40C19-33 15-10 0 0Z',
    heart: 'M0 0C-13-8-17-27-8-33C-3-35 0-31 0-28C0-31 3-35 8-33C17-27 13-8 0 0Z',
  };

  const ring = (n, shape, pal, sc = 1, off = 0, d0 = 0, st = 0.04) => {
    let s = '';
    for (let i = 0; i < n; i++) {
      s += `<g transform="rotate(${f(off + (i * 360) / n)})${sc !== 1 ? ` scale(${sc})` : ''}">`
        + `<path class="pp" d="${P[shape]}" fill="url(#fl-${pal})" stroke="${PAL[pal][2]}" stroke-opacity=".28" stroke-width=".8" style="--d:${f(d0 + i * st)}s"/></g>`;
    }
    return s;
  };
  const disc = (r, fill, d) => `<circle class="pp" r="${r}" fill="${fill}" style="--d:${d}s"/>`;
  const dots = (n, r, fill, d, size = 1.3) => {
    let s = `<g class="pp" style="--d:${d}s">`;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      s += `<circle cx="${f(Math.cos(a) * r)}" cy="${f(Math.sin(a) * r)}" r="${size}" fill="${fill}"/>`;
    }
    return `${s}</g>`;
  };

  // Kepala bunga — semua berpusat di 0,0 dengan jari-jari ±42
  const HEADS = {
    daisy: (pal = 'white') => ring(16, 'long', pal, 1, 0, 0, 0.025) + ring(16, 'long', pal, 0.72, 11, 0.2, 0.02)
      + disc(9, '#f2c14e', 0.5) + dots(10, 5.5, '#c98a1c', 0.6),
    rose: (pal = 'rose') => ring(5, 'round', pal, 1, 0, 0, 0.06) + ring(5, 'round', pal, 0.76, 36, 0.25, 0.06)
      + ring(5, 'round', pal, 0.52, 12, 0.5, 0.05) + ring(3, 'round', pal, 0.3, 50, 0.7, 0.05)
      + disc(4.5, PAL[pal][2], 0.85),
    peony: (pal = 'blush') => ring(10, 'round', pal, 1, 0, 0, 0.03) + ring(9, 'round', pal, 0.8, 18, 0.2, 0.03)
      + ring(8, 'round', pal, 0.6, 8, 0.4, 0.03) + ring(6, 'round', pal, 0.4, 30, 0.55, 0.03)
      + dots(8, 4, '#f3c45a', 0.75, 1.6),
    cosmos: (pal = 'blush') => ring(8, 'notch', pal, 1, 0, 0, 0.05) + disc(8, '#f0c24f', 0.45) + dots(12, 6, '#c98a1c', 0.55),
    blossom: (pal = 'blush') => ring(5, 'heart', pal, 1, 0, 0, 0.06) + dots(5, 7, PAL[pal][2], 0.35, 1.2)
      + disc(3.6, '#f6d36b', 0.4),
    poppy: (pal = 'coral') => ring(4, 'round', pal, 1, 45, 0, 0.06) + ring(4, 'round', pal, 0.86, 0, 0.15, 0.06)
      + disc(9, '#3a2f2f', 0.45) + dots(12, 11.5, '#3a2f2f', 0.5, 1.4),
    // tulip & kuncup: tampak samping, tumbuh dari pangkal 0,0 ke atas
    tulip: (pal = 'rose') => `<g class="pp" style="--d:0s"><path d="M0 0C-15-2-17-22-12-36L-6-27L0-38L6-27L12-36C17-22 15-2 0 0Z" fill="url(#fl-${pal})" stroke="${PAL[pal][2]}" stroke-opacity=".35" stroke-width=".8"/>`
      + `<path d="M0-1C-6-6-6-22 0-30C6-22 6-6 0-1Z" fill="${PAL[pal][1]}" opacity=".45"/></g>`,
    bud: (pal = 'rose') => `<g class="pp" style="--d:0s"><path d="M0-2C-10-8-10-22 0-30C10-22 10-8 0-2Z" fill="url(#fl-${pal})"/>`
      + `<path d="M0 0C-8-2-10-10-7-16C-4-10-2-6 0-4C2-6 4-10 7-16C10-10 8-2 0 0Z" fill="${LEAF[0][0]}"/></g>`,
    lav: () => {
      let s = `<path class="stem" pathLength="1" d="M0 0V-64" stroke="${STEM}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
      for (let i = 0; i < 9; i++) {
        const y = -24 - i * 5;
        const x = i % 2 ? 2.8 : -2.8;
        s += `<ellipse class="pp" cx="${x}" cy="${y}" rx="${f(3.6 - i * 0.18)}" ry="${f(4.8 - i * 0.2)}" fill="url(#fl-lav)" style="--d:${f(0.3 + i * 0.05)}s"/>`;
      }
      return s;
    },
    // lencana countdown: kelopak + cakram putih untuk angka
    badge: (pal = 'blush') => ring(8, 'round', pal, 1, 0, 0, 0.04) + ring(8, 'round', pal, 0.82, 22.5, 0.15, 0.04)
      + disc(27, '#fffdf8', 0.4),
    leaf: (v = 0) => `<g class="lf"><path d="M0 0C11-10 13-31 0-46C-13-31-11-10 0 0Z" fill="url(#lf-${v})"/>`
      + `<path d="M0-3Q1-22 0-40" stroke="#fff" stroke-opacity=".35" stroke-width="1" fill="none"/></g>`,
  };

  // satu bunga/daun di posisi tertentu
  const item = (it, i = 0, remap) => {
    const { t, x = 0, y = 0, s = 1, r = 0 } = it;
    const pal = (remap && remap[it.pal]) || it.pal;
    const body = t === 'leaf' ? HEADS.leaf(it.v || 0) : HEADS[t](pal);
    const o = it.o ?? i * 0.06;
    return `<g transform="translate(${f(x)} ${f(y)})${r ? ` rotate(${f(r)})` : ''}${s !== 1 ? ` scale(${f(s)})` : ''}" style="--o:${f(o)}s">${body}</g>`;
  };
  const svg = (vb, inner, cls = '', par = '') =>
    `<svg class="flora ${cls}" viewBox="${vb}"${par ? ` preserveAspectRatio="${par}"` : ''} aria-hidden="true" focusable="false">${inner}</svg>`;
  const ordered = (list, remap) => {
    // daun dulu (di belakang), lalu bunga; delay mekar mengikuti urutan
    const leaves = list.filter((x) => x.t === 'leaf' || x.t === 'lav');
    const heads = list.filter((x) => x.t !== 'leaf' && x.t !== 'lav');
    return leaves.map((x, i) => item({ ...x, o: x.o ?? i * 0.035 }, i, remap)).join('')
      + heads.map((x, i) => item({ ...x, o: x.o ?? 0.25 + i * 0.07 }, i, remap)).join('');
  };
  const ALT = { blush: 'peach', rose: 'coral', peach: 'blush', lav: 'butter', coral: 'rose', butter: 'lav' };

  // ---------- komposisi ----------
  const CORNER = [ // buket pojok — pojok di 0,0, dicerminkan lewat CSS
    { t: 'leaf', x: 28, y: 118, s: 1.5, r: 168 },
    { t: 'leaf', x: 112, y: 24, s: 1.45, r: 98 },
    { t: 'leaf', x: 70, y: 170, s: 1.2, r: 200, v: 1 },
    { t: 'leaf', x: 170, y: 52, s: 1.15, r: 70, v: 1 },
    { t: 'leaf', x: 140, y: 118, s: 1.1, r: 135 },
    { t: 'leaf', x: 22, y: 220, s: 1.05, r: 185, v: 1 },
    { t: 'leaf', x: 232, y: 24, s: 1, r: 96 },
    { t: 'leaf', x: 96, y: 96, s: 1.2, r: 142, v: 1 },
    { t: 'lav', x: 182, y: 96, s: 1.1, r: 118 },
    { t: 'lav', x: 84, y: 192, s: 1.05, r: 160 },
    { t: 'peony', x: 58, y: 58, s: 1.4, pal: 'blush' },
    { t: 'rose', x: 150, y: 44, s: 0.95, pal: 'rose' },
    { t: 'rose', x: 46, y: 150, s: 0.9, pal: 'peach' },
    { t: 'cosmos', x: 128, y: 124, s: 0.72, pal: 'lav' },
    { t: 'daisy', x: 212, y: 62, s: 0.62, pal: 'white' },
    { t: 'daisy', x: 62, y: 226, s: 0.58, pal: 'white' },
    { t: 'poppy', x: 196, y: 136, s: 0.5, pal: 'coral' },
    { t: 'blossom', x: 252, y: 30, s: 0.42, pal: 'blush' },
    { t: 'blossom', x: 28, y: 282, s: 0.4, pal: 'lav' },
    { t: 'blossom', x: 150, y: 196, s: 0.34, pal: 'butter' },
    { t: 'bud', x: 276, y: 70, s: 0.85, r: 62, pal: 'rose' },
    { t: 'bud', x: 118, y: 246, s: 0.85, r: 205, pal: 'blush' },
  ];
  const SPRIG = [ // ranting kecil untuk sudut kartu
    { t: 'leaf', x: 18, y: 66, s: 0.95, r: 165 },
    { t: 'leaf', x: 66, y: 16, s: 0.95, r: 105, v: 1 },
    { t: 'leaf', x: 70, y: 72, s: 0.8, r: 138 },
    { t: 'lav', x: 96, y: 40, s: 0.75, r: 110 },
    { t: 'rose', x: 38, y: 38, s: 0.7, pal: 'blush' },
    { t: 'daisy', x: 104, y: 22, s: 0.4, pal: 'white' },
    { t: 'blossom', x: 20, y: 108, s: 0.34, pal: 'lav' },
    { t: 'cosmos', x: 76, y: 86, s: 0.36, pal: 'butter' },
    { t: 'bud', x: 134, y: 30, s: 0.6, r: 72, pal: 'rose' },
  ];

  const polar = (a, r) => [Math.cos((a * Math.PI) / 180) * r, Math.sin((a * Math.PI) / 180) * r];

  // karangan bulat (lingkar daun + kelompok bunga)
  function wreath(remap) {
    const R = 120;
    const leaves = [];
    for (let a = 0, k = 0; a < 360; a += 10, k++) {
      const out = k % 2 === 0;
      const [x, y] = polar(a + 3, R + (out ? 5 : -5));
      leaves.push({ t: 'leaf', x, y, s: 0.44 + (k % 3) * 0.05, r: a + (out ? 145 : 215), v: k % 2, o: a / 360 });
    }
    const F = [
      [118, 'peony', 0.75, 'blush'], [142, 'rose', 0.55, 'rose'], [96, 'rose', 0.48, 'peach'], [162, 'daisy', 0.38, 'white'],
      [78, 'cosmos', 0.36, 'lav'], [178, 'blossom', 0.28, 'blush'], [62, 'blossom', 0.26, 'butter'],
      [300, 'rose', 0.52, 'blush'], [320, 'cosmos', 0.42, 'lav'], [282, 'daisy', 0.34, 'white'], [338, 'blossom', 0.28, 'peach'],
      [22, 'blossom', 0.24, 'lav'], [252, 'blossom', 0.22, 'butter'], [222, 'bud', 0.5, 'rose'],
    ].map(([a, t, s, pal], i) => {
      const [x, y] = polar(a, R);
      return { t, x, y, s, pal, r: t === 'bud' ? a + 180 : (i * 37) % 360, o: 0.6 + i * 0.08 };
    });
    const ringPath = `<circle class="stem" pathLength="1" r="${R}" stroke="${STEM}" stroke-width="1.6" fill="none" transform="rotate(100)"/>`;
    return svg('-170 -170 340 340', ringPath + leaves.map((x) => item(x)).join('') + F.map((x) => item(x, 0, remap)).join(''), 'wreath');
  }

  // mahkota bunga di atas bingkai lengkung (pusat lengkung di 0,0; jari-jari 140)
  function arch() {
    const R = 140;
    const leaves = [];
    let k = 0;
    for (let a = 184; a <= 356; a += 8, k++) {
      const out = k % 2 === 0;
      const [x, y] = polar(a, R + (out ? 5 : -4));
      const tilt = out ? -32 : 32;
      // kiri mengarah searah jarum jam (ke puncak), kanan berlawanan (juga ke puncak)
      const r = a < 270 ? a + 180 + tilt : a - tilt;
      leaves.push({ t: 'leaf', x, y, s: 0.36 + (k % 3) * 0.06, r, v: k % 2, o: Math.abs(a - 270) < 90 ? (90 - Math.abs(a - 270)) / 90 * 0.2 + (a < 270 ? 0 : 0.1) : 0 });
    }
    [[-1, 16], [-1, 52], [1, 22], [1, 64]].forEach(([side, y], i) => leaves.push({ t: 'leaf', x: side * (R + (i % 2 ? -4 : 4)), y, s: 0.42, r: side < 0 ? -24 : 24, v: i % 2, o: 0 }));
    const F = [
      [200, 'peony', 0.62, 'blush'], [220, 'rose', 0.44, 'rose'], [186, 'rose', 0.4, 'peach'], [238, 'daisy', 0.32, 'white'],
      [256, 'blossom', 0.24, 'lav'], [290, 'blossom', 0.22, 'butter'], [312, 'cosmos', 0.36, 'lav'], [334, 'rose', 0.5, 'blush'],
      [352, 'daisy', 0.34, 'white'],
    ].map(([a, t, s, pal], i) => {
      const [x, y] = polar(a, R);
      return { t, x, y, s, pal, r: (i * 41) % 360, o: 0.5 + i * 0.09 };
    });
    F.push({ t: 'cosmos', x: -R - 2, y: 40, s: 0.3, pal: 'butter', o: 1.3 }, { t: 'bud', x: R + 2, y: 44, s: 0.5, r: 12, pal: 'rose', o: 1.4 });
    const stem = `<path class="stem" pathLength="1" d="M${-R} 80V0A${R} ${R} 0 0 1 ${R} 0V80" stroke="${STEM}" stroke-width="1.6" fill="none"/>`;
    return svg('-170 -170 340 340', stem + leaves.map((x) => item(x)).join('') + F.map((x) => item(x)).join(''), 'arch-svg');
  }

  // sulur pembatas bagian
  function vine(remap) {
    const W = 1000;
    const yAt = (x) => 50 + 16 * Math.sin((x / W) * Math.PI * 4 + 0.5);
    const slope = (x) => 16 * Math.cos((x / W) * Math.PI * 4 + 0.5) * ((Math.PI * 4) / W);
    let d = `M0 ${f(yAt(0))}`;
    for (let x = 10; x <= W; x += 10) d += `L${x} ${f(yAt(x))}`;
    const parts = [];
    for (let x = 30, k = 0; x < W - 20; x += 34, k++) {
      const th = (Math.atan(slope(x)) * 180) / Math.PI;
      const up = k % 2 === 0;
      parts.push({ t: 'leaf', x, y: yAt(x), s: 0.36 + (k % 3) * 0.05, r: th + (up ? 40 : 140), v: k % 2, o: (x / W) * 1.3 });
    }
    [[110, 'blossom', 0.3, 'lav'], [300, 'cosmos', 0.38, 'blush'], [500, 'rose', 0.5, 'rose'], [700, 'daisy', 0.36, 'white'], [890, 'blossom', 0.3, 'butter']]
      .forEach(([x, t, s, pal], i) => parts.push({ t, x, y: yAt(x), s, pal, r: i * 50, o: (x / W) * 1.3 + 0.35 }));
    const stem = `<path class="stem" pathLength="1" d="${d}" stroke="${STEM}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    return svg('0 0 1000 100', stem + parts.map((x) => item(x, 0, remap)).join(''), 'vine');
  }

  // padang bunga: beberapa lapis svg (tiap lapis bergoyang terpisah — transform di elemen HTML, murah)
  const LAYERS = [
    { grass: ['#b8d0a8', '#a6c295', '#c7dbb8'], hill: '#cfe0c2', blades: 44, bh: [26, 60], n: 15, h: [60, 110], sc: [0.32, 0.44],
      kinds: ['daisy', 'blossom', 'lav', 'bud', 'blossom'], wd: 7.5, wa: 1.6 },
    { grass: ['#8fb27f', '#7ea56f', '#a3c293'], hill: '#a9c79a', blades: 52, bh: [30, 72], n: 17, h: [90, 160], sc: [0.4, 0.58],
      kinds: ['daisy', 'tulip', 'cosmos', 'lav', 'poppy', 'blossom', 'tulip'], wd: 6, wa: 2.2 },
    { grass: ['#5d8a55', '#4a7448', '#6f9a63'], hill: null, blades: 64, bh: [22, 64], n: 9, h: [120, 190], sc: [0.5, 0.7],
      kinds: ['tulip', 'daisy', 'cosmos', 'rose', 'tulip'], wd: 4.8, wa: 2.6 },
  ];
  const PALS = ['rose', 'blush', 'butter', 'lav', 'peach', 'coral'];
  function meadow(el) {
    const seed = Number(el.dataset.seed) || 1;
    const count = Number(el.dataset.layers) || 3;
    const ground = el.dataset.ground; // warna bukit lapis depan (opsional)
    const W = 1200, H = 240;
    let out = '';
    LAYERS.slice(3 - count).forEach((L, li) => {
      const rnd = rng(seed * 31 + li);
      const pick = (a) => a[Math.floor(rnd() * a.length)];
      const lerp = ([a, b]) => a + rnd() * (b - a);
      let s = '';
      const hill = li === count - 1 && ground ? ground : L.hill;
      if (hill) s += `<path d="M0 ${H}V${H - 16}Q${W * 0.22} ${H - 34} ${W * 0.48} ${H - 20}T${W} ${H - 22}V${H}Z" fill="${hill}"/>`;
      const blades = (n) => {
        let g = '';
        for (let i = 0; i < n; i++) {
          const x = rnd() * W, ht = lerp(L.bh), b = (rnd() - 0.5) * 30;
          g += `<path d="M${f(x - 3.5)} ${H}Q${f(x + b * 0.4)} ${f(H - ht * 0.55)} ${f(x + b)} ${f(H - ht)}Q${f(x + b * 0.25 + 1)} ${f(H - ht * 0.5)} ${f(x + 3.5)} ${H}Z" fill="${pick(L.grass)}"/>`;
        }
        return g;
      };
      s += blades(Math.round(L.blades * 0.65));
      for (let i = 0; i < L.n; i++) {
        const x = (i + 0.2 + rnd() * 0.6) * (W / L.n);
        const ht = lerp(L.h), tx = x + (rnd() - 0.5) * 26, cx = x + (rnd() - 0.5) * 34;
        const kind = pick(L.kinds);
        const o = f(rnd() * 1.2);
        const sc = lerp(L.sc);
        const my = H - ht * 0.45, mx = (x + cx) / 2;
        const side = rnd() > 0.5 ? 1 : -1;
        const head = kind === 'lav'
          ? ''
          : `<g transform="translate(${f(tx)} ${f(H - ht)}) scale(${f(sc)})${kind === 'tulip' || kind === 'bud' ? '' : ` rotate(${f(rnd() * 60)})`}" style="--o:${f(o + 0.8)}s">${HEADS[kind](pick(PALS))}</g>`;
        const stemD = kind === 'lav'
          ? ''
          : `<path class="stem" pathLength="1" d="M${f(x)} ${H}Q${f(cx)} ${f(H - ht * 0.5)} ${f(tx)} ${f(H - ht + (kind === 'tulip' || kind === 'bud' ? 0 : 4))}" stroke="${STEM}" stroke-width="${f(2.2 + sc)}" fill="none" stroke-linecap="round"/>`;
        const lav = kind === 'lav'
          ? `<g transform="translate(${f(x)} ${H}) scale(${f(sc * 2.4)}) rotate(${f((rnd() - 0.5) * 16)})">${HEADS.lav()}</g>`
          : `<g transform="translate(${f(mx)} ${f(my)}) rotate(${side * 55}) scale(${f(sc * 0.9)})" style="--o:${f(o + 0.4)}s">${HEADS.leaf(i % 2)}</g>`;
        s += `<g style="--o:${o}s">${stemD}${lav}${head}</g>`;
      }
      s += blades(Math.round(L.blades * 0.35));
      out += `<svg class="flora m-layer" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" style="--wd:${L.wd}s;--wa:${L.wa}deg;--wdl:-${f(rnd() * 4)}s" aria-hidden="true" focusable="false">${s}</svg>`;
    });
    return out;
  }

  const glyph = (t, pal, rot = 0) => {
    const up = t === 'tulip' || t === 'bud';
    return svg('-50 -50 100 100', item({ t, pal, x: 0, y: up ? 22 : 0, r: rot, s: up ? 1.3 : 1, o: 0 }), 'glyph');
  };

  const BUILD = {
    corner: (el) => svg('0 0 320 320', ordered(CORNER, el.dataset.alt ? ALT : null), 'corner-svg'),
    sprig: (el) => svg('0 0 180 180', ordered(SPRIG, el.dataset.alt ? ALT : null), 'sprig'),
    wreath: (el) => wreath(el.dataset.alt ? ALT : null),
    arch,
    vine: (el) => vine(el.dataset.alt ? ALT : null),
    meadow,
    glyph: (el) => glyph(el.dataset.t || 'blossom', el.dataset.pal, Number(el.dataset.r) || 0),
  };

  document.querySelectorAll('[data-flora]').forEach((el) => {
    const build = BUILD[el.dataset.flora];
    if (!build) return;
    el.innerHTML = build(el);
    if (el.hasAttribute('data-manual')) el.querySelectorAll('.flora').forEach((s) => s.classList.add('manual'));
  });

  window.FLORA = { glyph, PAL };
})();
