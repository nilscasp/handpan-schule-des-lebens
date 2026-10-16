// Hero der Startseite: Das Mandala liegt als Gravur auf dem Dom der Handpan.
// Ablauf beim ersten Besuch: Ein Lichtschimmer läuft über ein Netz aus Rosetten von den Bildrändern
// zur Mitte, die vier mittleren drehen sich ineinander, dann erblüht die Mitte. Danach atmet es ruhig.
// Vier Ebenen (.hero-mandala) verrechnen sich per Mischmodus direkt mit dem Foto: Die Linien nehmen das Licht des Bildes an.
// Braucht js/mandala.js (buildMandala, BLOOM_END, R).
(function () {
  const layers = [...document.querySelectorAll('.hero-photo .hero-mandala')];
  const hero = document.querySelector('.hero-photo');
  const photo = hero && hero.querySelector('.hero-photo-img');
  if (!layers.length || !hero || typeof buildMandala !== 'function') return;

  const P = { n: 8, k: 3, neck: 28.4, tip: 61.9, width: 1, ri: 12.7, dot: 4.85, oval: 1.05, sw: 0.9, swc: 0.7, gap: 1.1, count: 4, glow: 0 };
  // Lage im Foto (1920 × 1280): Dom-Mitte 973/668, Mandala-Box 545 px breit (= 322 Mandala-Einheiten)
  const k = 545 / 322;
  const NETZ = { dauer: 3.8, pause: -.15, ex: 973 / k * 1.05, ey: 668 / k * 1.2 };
  const VORLAUF = NETZ.dauer + NETZ.pause - 3.1; // Verschiebung der Erblühen-Zeitleiste durch den Lichtschimmer
  const DEPTH = .6;                              // Deckkraft der Rillen-Ebene (wie im CSS)

  const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handy = window.matchMedia('(max-width: 768px)'); // dort ist der Hero ein anderes Foto, Mandala ausgeblendet
  const KEY = 'hero-mandala-gesehen';
  let gesehen = false;
  try { gesehen = sessionStorage.getItem(KEY) === '1'; } catch (e) {}

  const modes = { atmen: !ruhig.matches, welle: false }; // nach dem Erblühen nur ruhiges Atmen, keine Welle
  let drawStart = null, sichtbar = true, last = 0;
  const t0 = performance.now();

  function render(now) {
    const t = (now - t0) / 1000;
    const blooming = drawStart !== null && now >= drawStart;
    const svg = buildMandala(t, { P, FG: 'currentColor', BG: 'none', modes, drawStart: blooming ? drawStart : null, netz: NETZ });
    layers.forEach((el, i) => { el.innerHTML = svg.replace(/(id="|url\(#|href="#)/g, '$1hm' + i + '-'); });
    const dt = blooming ? (now - drawStart) / 1000 : 99;
    // unterwegs reines Licht, erst in der Mitte wird es zur Gravur
    layers[0].style.opacity = blooming ? (DEPTH * Math.max(0, Math.min(1, (dt - NETZ.dauer + .6) / 1.1))).toFixed(3) : '';
    // warmes Aufglühen, wenn die goldenen Blätter erscheinen
    layers[3].style.opacity = blooming ? (Math.max(0, 1 - Math.abs(dt - 5.6 - VORLAUF) / .9) * .8).toFixed(3) : '0';
  }

  function frame(now) {
    if (sichtbar && !handy.matches) {
      if (drawStart !== null && now >= drawStart && (now - drawStart) / 1000 > BLOOM_END + VORLAUF) drawStart = null;
      const blooming = drawStart !== null;
      // während des Ablaufs jedes Bild, danach beim ruhigen Atmen nur jedes zweite (spart Rechenzeit)
      if (blooming || now - last > 32) { render(now); last = now; }
    }
    if (!ruhig.matches) requestAnimationFrame(frame);
  }

  function start() {
    if (ruhig.matches || handy.matches) { render(performance.now()); return; } // ruhige Darstellung: nur die fertige Gravur
    if (!gesehen) {
      drawStart = performance.now() + 300; // kurz warten, bis das Foto steht
      try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    }
    requestAnimationFrame(frame);
  }

  // Lage dem Bildausschnitt nachführen: Das Foto füllt den Hero per object-fit: cover (je nach Breite beschnitten
  // und per object-position verschoben). Dom-Mitte und Mandala-Größe werden aus Foto-Pixeln umgerechnet.
  function place() {
    const W = hero.clientWidth, H = hero.clientHeight;
    if (!W || !H) return;
    const s = Math.max(W / 1920, H / 1280);
    const pos = (photo ? getComputedStyle(photo).objectPosition : '50% 50%').split(' ').map(v => parseFloat(v) / 100);
    const dx = (W - 1920 * s) * (isNaN(pos[0]) ? .5 : pos[0]), dy = (H - 1280 * s) * (isNaN(pos[1]) ? .5 : pos[1]);
    layers.forEach(el => {
      el.style.left = (dx + 973 * s) + 'px';
      el.style.top = (dy + 668 * s) + 'px';
      el.style.width = (545 * s) + 'px';
      el.style.setProperty('--hm-persp', (1300 * s) + 'px');
    });
  }
  place();
  if ('ResizeObserver' in window) new ResizeObserver(place).observe(hero);
  else window.addEventListener('resize', place);

  // nur rechnen, solange der Hero im Bild ist
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(es => { sichtbar = es[0].isIntersecting; }).observe(hero);
  }
  handy.addEventListener && handy.addEventListener('change', () => { if (!handy.matches) render(performance.now()); });

  if (photo && !photo.complete) photo.addEventListener('load', start, { once: true });
  else start();
})();
