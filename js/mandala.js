// Mandala-Generator der Handpan Schule des Lebens.
// Konstruktion: Grundmaß R = Kreisradius = Abstand der Rosetten zur Mitte; jede Rosette ist ein Stern {n/k} mit Schlaufen.
// Genutzt von js/hero-mandala.js (Startseite); Entwurfswerkzeug: Logo-Spielwiese.
const D = Math.PI / 180, R = 63.5;
const BLOOM_END = 6.8; // Sekunden, bis „Erblühen“ fertig ist

const f = n => Math.round(n * 1000) / 1000;
const rot = ([x, y], a) => { const c = Math.cos(a * D), s = Math.sin(a * D); return [f(x * c - y * s), f(x * s + y * c)]; };
const flip = p => [p[0], -p[1]];
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const clamp = x => Math.max(0, Math.min(1, x));
const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const backOut = x => { const c = 1.70158; return x <= 0 ? 0 : 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); };

// gemessener Bauch der Schlaufe (aus dem Original), wird auf [Kreuzung, Ende] abgebildet
const BULB = [[[28.32,0],[33.37,-3.97],[39.94,-5.81],[45.27,-5.81]],[[45.27,-5.81],[56.45,-5.81],[59.75,-1.03],[59.75,0]]];

function half(p, tip) {
  const th = 180 * p.k / p.n * D;                       // Stern {n/k}: Strangmitte auf halbem Schritt
  const M = [p.ri * Math.cos(th), p.ri * Math.sin(th)]; // Tangente am Innenkreis
  const s = (tip - p.neck) / 31.43;
  const bulb = BULB.map(c => c.map(([x, y]) => [p.neck + (x - 28.32) * s, y * p.width]));
  const N = bulb[0][0];
  let dn = [bulb[0][1][0] - N[0], bulb[0][1][1] - N[1]];
  const l = Math.hypot(dn[0], dn[1]); dn = [dn[0] / l, dn[1] / l];
  const dm = [Math.sin(th), -Math.cos(th)];
  const L = Math.hypot(N[0] - M[0], N[1] - M[1]) / 26.2;
  return [[M, [M[0] + 5.05 * L * dm[0], M[1] + 5.05 * L * dm[1]], [N[0] - 10.18 * L * dn[0], N[1] - 10.18 * L * dn[1]], N], ...bulb];
}
const mirrorBack = cs => cs.slice().reverse().map(c => c.slice().reverse().map(flip));

function rosetteD(p, tipAt) {
  const g = gcd(p.n, p.k), step = 360 * p.k / p.n, per = p.n / g;
  let d = '';
  for (let j = 0; j < g; j++) {
    for (let i = 0; i < per; i++) {
      const a = j * 360 / p.n - step * i;
      const h = half(p, tipAt(a));
      [...h, ...mirrorBack(h)].forEach((c, ci) => {
        const q = c.map(pt => rot(pt, a));
        if (i === 0 && ci === 0) d += `M${q[0]}`;
        d += `C${q[1]} ${q[2]} ${q[3]}`;
      });
    }
    d += 'Z';
  }
  return d;
}
function leafD(p, tip) {
  const b = half(p, tip).slice(1);
  let d = `M${b[0][0]}`;
  for (const c of [...b, ...mirrorBack(b)]) d += `C${c[1]} ${c[2]} ${c[3]}`;
  return d + 'Z';
}

const meter = typeof document !== 'undefined' && document.createElementNS('http://www.w3.org/2000/svg', 'path');
const lenOf = d => { meter.setAttribute('d', d); return meter.getTotalLength(); };

function buildMandala(t, S) {
  const { FG, BG, modes = {}, drawStart = null, btFix = null, id = '' } = S;
  const p = { ...S.P };
  let glow = p.glow, spin = 0, leafOpacity = 1;

  if (modes.atmen) { const b = Math.sin(t * 2 * Math.PI / 6); p.tip += 2.2 * b; p.neck += 1.1 * b; p.width *= 1 + .07 * b; p.ri *= 1 + .04 * b; }
  let tipAt = () => p.tip;
  if (modes.welle) tipAt = a => p.tip - 1.8 + 3.2 * Math.sin(t * 2 * Math.PI / 3.2 - a * D * 2);
  if (modes.drehen) {
    const per = 4.5, u = (t % per) / per, e = ease(clamp(u / .4));
    spin = (Math.floor(t / per) + e) * 360 / p.n;
    leafOpacity = (Math.cos(e * 2 * Math.PI) + 1) / 2;
  }
  if (modes.puls) glow += 2.6 * (.5 + .5 * Math.sin(t * 2 * Math.PI / 2.6));

  // Erblühen: Zeitleiste in Sekunden
  //   Rosetten zeichnen sich auseinanderliegend → gleiten drehend zusammen →
  //   dunkle Blätter (Linsen) stülpen sich aus der Mitte → goldene Blätter wachsen und glühen auf
  let cD = 1, rD = 1, iD = 1, dotS = 1, leafS = 1, ovalT = () => 1;
  let df = 1, rr = 0, lensS = 1;
  const out3 = x => 1 - Math.pow(1 - x, 3);
  // Entfalten wie eine Blüte: keine Drehung. Jedes Blatt gleitet in voller Größe aus dem Mittelpunkt,
  // die Spitze voran, durch einen Keil mit Spitze in der Mitte, bis seine Basis im Mittelpunkt ankommt.
  const slide = (ang, off) => `rotate(${f(ang)}) translate(${f(-off)} 0) rotate(${f(-ang)})`;
  const wedge = (id, ang, half) => { const q = h => rot([400, 0], ang + h); return `<clipPath id="${id}" clipPathUnits="userSpaceOnUse"><path d="M0,0L${q(-half)}L${rot([400, 0], ang)}L${q(half)}Z"/></clipPath>`; };
  // Anreise (optional, S.anreise = { dauer, pause, weitX, weitY }): die vier Rosetten kommen fertig gezeichnet
  // von den Bildrändern herein, rollen dabei wie Räder, halten auf ihren Plätzen und rücken dann zusammen.
  const an = S.anreise || null;
  let travel = 0;
  // Netz (optional, S.netz = { dauer, pause, ex, ey }): das ganze Bild ist ein Gitter aus Rosetten im Abstand der vier Plätze.
  // Ein Lichtschimmer wandert von den Rändern zur Mitte und macht es sichtbar; am Ende bleiben nur die vier um die Mitte.
  const nz = S.netz || null, dd = R * 1.32;
  let rho = null, netFade = 1;
  if (drawStart !== null) {
    let dt = btFix ?? (performance.now() - drawStart) / 1000;
    if (an) {
      travel = 1 - out3(clamp(dt / an.dauer));
      dt = dt - an.dauer - an.pause + 3.1; // danach weiter wie beim Erblühen ab dem Zusammenrücken
    } else if (nz) {
      const rho0 = Math.hypot(nz.ex, nz.ey) * .82; // Welle beginnt knapp innerhalb der Bildecken
      const u = clamp(dt / nz.dauer);
      rho = dd + (rho0 - dd) * (1 - Math.pow(u, 1.12)); // gleichmäßig mit leichtem Zug, kommt mit Schwung in der Mitte an
      // übriges Netz blendet zum Ende der Welle aus und ist weg, bevor die vier ineinanderdrehen
      netFade = 1 - clamp((dt - nz.dauer * .78) / (nz.dauer * .22 + .9)); // verlischt, während es sich mit den vier zusammenzieht
      dt = dt - nz.dauer - nz.pause + 3.1;
    } else {
      cD = ease(clamp(dt / 1.2)); rD = ease(clamp((dt - .3) / 2.6)); iD = ease(clamp((dt - 2.3) / .6));
      dotS = backOut(clamp((dt - 2.6) / .45));
      ovalT = i => backOut(clamp((dt - 2.7 - i * .06) / .4));
    }
    // im Netz-Modus startet das Ineinanderdrehen schon in Bewegung (Schwung der Welle) und läuft weich aus
    const g = nz ? Math.sin(clamp((dt - 3.1) / 1.7) * Math.PI / 2) : ease(clamp((dt - 3.1) / 1.2));
    df = 1 + .32 * (1 - g); rr = 22.5 * (1 - g);
    const l = clamp((dt - 4.1) / 1.1);
    lensS = out3(l);
    const b = clamp((dt - 5.0) / .9);
    leafS = out3(b);
    glow += 3.2 * Math.max(0, 1 - Math.abs(dt - 5.6) / .7);
  }

  const d = rosetteD(p, tipAt);
  const rLen = drawStart !== null ? lenOf(d) : 0;
  const dash = (len, prog) => prog < 1 ? ` stroke-dasharray="${f(len)} ${f(len)}" stroke-dashoffset="${f(len * (1 - prog))}"` : '';

  const ovals = Array.from({ length: p.n }, (_, i) => {
    const a = 360 / p.n * i, tip = tipAt(a), s = (tip - p.neck) / 31.43, sc = ovalT(i) * p.oval;
    if (sc <= 0) return '';
    return `<ellipse transform="rotate(${f(a)}) translate(${f(p.neck + (tip - p.neck) * .731)} 0) scale(${f(sc)})" rx="${f(5.05 * s)}" ry="${f(2.02 * p.width)}"/>`;
  }).join('');

  const count = Math.round(p.count);
  const H = 2 * R + 34, V = 2 * H;
  const place = dist => count === 1 ? [{ a: 0, c: [0, 0] }] :
    Array.from({ length: count }, (_, i) => { const a = 360 / count * i + (count === 4 ? 0 : -90); return { a, c: rot([dist, 0], a) }; });
  const weit = a => an ? (Math.abs(Math.cos(a * D)) > .5 ? an.weitX : an.weitY) : 0;
  const centers = place(R * df).map(({ a }) => ({ a, c: rot([R * df + travel * weit(a), 0], a) })), finals = place(R);
  const roll = a => travel * weit(a) / R / D * .5; // halbe Abrollbewegung, wirkt ruhiger

  // dunkle Blätter = Linsen zweier Kreise; beide Kreise gehen durch die Mitte, die zweite Ecke liegt bei ci + cj
  const lenses = [];
  for (let i = 0; i < finals.length; i++) for (let j = i + 1; j < finals.length; j++) {
    const ci = finals[i].c, cj = finals[j].c;
    if (count === 1 || Math.hypot(ci[0] - cj[0], ci[1] - cj[1]) > 2 * R - .01) continue;
    const p1 = [0, 0], p2 = [f(ci[0] + cj[0]), f(ci[1] + cj[1])];
    const arc = (c, from, to) => {
      const m = [(from[0] + to[0]) / 2 - c[0], (from[1] + to[1]) / 2 - c[1]], ml = Math.hypot(m[0], m[1]);
      const mid = [c[0] + R * m[0] / ml, c[1] + R * m[1] / ml];
      const cr = (to[0] - from[0]) * (mid[1] - from[1]) - (to[1] - from[1]) * (mid[0] - from[0]);
      return `A${R} ${R} 0 0 ${cr > 0 ? 0 : 1} ${to}`;
    };
    lenses.push({ d: `M${p1}${arc(ci, p1, p2)}${arc(cj, p2, p1)}Z`, ang: Math.atan2(p2[1], p2[0]) / D });
  }
  // Keilöffnung: dunkles Blatt zwischen den Tangenten der beiden Kreise, goldenes Blatt im Raum dazwischen
  const step = count > 1 ? 360 / count : 90;
  const wedges = lenses.map((l, i) => wedge(`wl${i}`, l.ang, 90 - step / 2)).join('') + centers.map(({ a }, i) => wedge(`wf${i}`, a, step / 2)).join('');
  const lensTf = l => slide(l.ang, (1 - lensS) * R * 2 * Math.cos(step / 2 * D));
  const lensBlack = w => lensS > 0 ? lenses.map((l, i) => `<g clip-path="url(#wl${i})"><path d="${l.d}" transform="${lensTf(l)}" fill="#000"${w ? ` stroke="#000" stroke-width="${f(w)}"` : ''}/></g>`).join('') : '';

  const gapW = p.gap ? p.gap * 2 + p.swc : 0;
  const MB = 2000; // Maskenfläche groß genug, damit Rosetten auch weit draußen sichtbar bleiben
  const box = `maskUnits="userSpaceOnUse" x="${-MB}" y="${-MB}" width="${2 * MB}" height="${2 * MB}"`;
  const masks = count === 1 ? '' : centers.map(({ c }, i) =>
    `<mask id="m${i}" ${box}><circle cx="${c[0]}" cy="${c[1]}" r="${R}" fill="#fff"/>${lensBlack(gapW)}</mask>`).join('') +
    `<mask id="mc" ${box}><rect x="${-MB}" y="${-MB}" width="${2 * MB}" height="${2 * MB}" fill="#fff"/>${lensBlack(p.swc + 2 * p.gap + .8)}</mask>`;

  const rosettes = centers.map(({ a, c }, i) => {
    const dir = count % 2 === 0 && i % 2 ? -1 : 1;
    const use = `<use href="#ro" transform="translate(${c[0]} ${c[1]}) rotate(${f(a + dir * (spin + rr + roll(a)))})"/>`;
    return count === 1 ? use : `<g mask="url(#m${i})">${use}</g>`;
  }).join('');

  const circleLen = 2 * Math.PI * R;
  const circles = p.swc > 0 && count > 1 ? `<g fill="none" stroke="${FG}" stroke-width="${p.swc}"><g mask="url(#mc)">` +
    centers.map(({ a, c }) => `<circle cx="${c[0]}" cy="${c[1]}" r="${R}" transform="rotate(${f(a + 180)} ${c[0]} ${c[1]})"${dash(circleLen, cD)}/>`).join('') + '</g>' +
    (lensS > 0 ? `<g stroke-linejoin="round">${lenses.map((l, i) => `<g clip-path="url(#wl${i})"><path d="${l.d}" transform="${lensTf(l)}"/></g>`).join('')}</g>` : '') + '</g>' : '';

  let leaves = '', leafMask = '';
  if (count > 1 && p.n % 2 === 0 && leafS > 0 && leafOpacity > 0.01) {
    const ld = leafD(p, Math.min(tipAt(180), R));
    const tf = a => `rotate(${f(a)}) translate(${R} 0) rotate(180)`;
    const grow = `opacity="${f(leafOpacity)}"`;
    if (p.gap) leafMask = `<mask id="lm" ${box}><rect x="${-MB}" y="${-MB}" width="${2 * MB}" height="${2 * MB}" fill="#fff"/><g ${grow}>` +
      centers.map(({ a }, i) => `<g clip-path="url(#wf${i})"><path d="${ld}" transform="${slide(a, (1 - leafS) * (R - p.neck + 2))} ${tf(a)}" fill="#000" stroke="#000" stroke-width="${f(p.gap * 2 + p.sw)}" stroke-linejoin="round"/></g>`).join('') + '</g></mask>';
    leaves = `<g ${grow}>` +
      centers.map(({ a }, i) => `<g clip-path="url(#wf${i})"><path d="${ld}" transform="${slide(a, (1 - leafS) * (R - p.neck + 2))} ${tf(a)}" fill="${FG}" stroke="${FG}" stroke-width="${p.sw}" stroke-linejoin="round"/></g>`).join('') + '</g>';
  }

  let net = '', netMask = '', coreA = 1;
  if (rho !== null && netFade > 0) {
    const W = dd * 2.6, soft = dd * .45, total = rho + W;
    coreA = 1 - clamp((rho - dd) / (dd * 1.4));
    const M = Math.ceil(nz.ex / dd) + 1, N = Math.ceil(nz.ey / dd) + 1;
    let uses = '';
    for (let m = -M; m <= M; m++) for (let n = -N; n <= N; n++) {
      if (Math.abs(m + n) % 2 === 0 || Math.abs(m) + Math.abs(n) === 1) continue; // Schachbrett; die vier in der Mitte zeichnet der Kern
      const x = m * dd * df / 1.32, y = n * dd * df / 1.32, r = Math.hypot(m * dd, n * dd); // Netz zieht sich mit den vier zusammen
      if (r > total + R || r < rho - soft - R) continue;
      uses += `<use href="#ro" transform="translate(${f(x)} ${f(y)}) rotate(${f(rr)})"/><circle cx="${f(x)}" cy="${f(y)}" r="${R}"/>`;
    }
    netMask = `<radialGradient id="ng" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="${f(total)}">` +
      `<stop offset="${f(Math.max(0, (rho - soft) / total))}" stop-color="#000"/><stop offset="${f(rho / total)}" stop-color="#fff"/>` +
      `<stop offset="${f((rho + W * .35) / total)}" stop-color="#777"/><stop offset="1" stop-color="#000"/></radialGradient>` +
      `<mask id="nm" ${box}><rect x="${-MB}" y="${-MB}" width="${2 * MB}" height="${2 * MB}" fill="url(#ng)"/></mask>`;
    net = `<g mask="url(#nm)" opacity="${f(netFade)}" fill="none" stroke="${FG}" stroke-width="${p.swc}">${uses}</g>`;
  }

  const filter = glow > 0.05 ? `<filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${f(glow)}" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>` : '';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-H} ${-H} ${V} ${V}" width="${V}" height="${V}">
<title>Handpan Schule des Lebens</title>
<defs>${filter}
<g id="ro"><path d="${d}" fill="none" stroke="${FG}" stroke-width="${p.sw}" stroke-linejoin="round" stroke-linecap="round"${dash(rLen, rD)}/>` +
`<circle r="${f(p.ri)}" fill="none" stroke="${FG}" stroke-width="${p.sw}" transform="rotate(-90)"${dash(2 * Math.PI * p.ri, iD)}/>` +
(p.dot > 0 ? `<circle r="${f(p.dot * dotS)}" fill="${FG}"/>` : '') + `<g fill="${FG}">${ovals}</g></g>
${wedges}${masks}${leafMask}${netMask}</defs>
<rect x="${-H}" y="${-H}" width="${V}" height="${V}" fill="${BG}"/>
<g${filter ? ' filter="url(#glow)"' : ''}>${net}<g${coreA < 1 ? ` opacity="${f(coreA)}"` : ''}><g${leafMask ? ' mask="url(#lm)"' : ''}>${rosettes}${circles}</g>${leaves}</g></g>
</svg>`;
  return id ? svg.replace(/(id="|url\(#|href="#)/g, `$1${id}-`) : svg;
}

