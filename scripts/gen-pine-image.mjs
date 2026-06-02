// Generates public/case/pine-indicators.jpg — a dark, on-brand "Pine Indicators"
// trading-chart poster (candles + BUY/SELL + dotted EMA bands), rasterized from SVG.
// Run: node scripts/gen-pine-image.mjs
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const W = 1200, H = 900;

// ---- chart geometry (4:3 card, content kept clear of overlay chips) ----
const cx0 = 70, cx1 = W - 70;          // chart x range
const cyTop = 300, cyBot = 760;        // chart y range (price band)
// price points 0..1 — rising with a mid dip, ends strong
const P = [.34,.30,.38,.33,.28,.24,.30,.26,.20,.27,.34,.30,.40,.46,.42,.52,.58,.54,.64,.70,.66,.76,.82,.88,.84,.93];
const n = P.length;
const step = (cx1 - cx0) / (n - 1);
const x = (i) => cx0 + i * step;
const y = (v) => cyBot - v * (cyBot - cyTop);

// candles: derive o/c from consecutive points, h/l with a wick margin
const candles = P.map((p, i) => {
  const o = i === 0 ? p : P[i - 1];
  const c = p;
  const hi = Math.max(o, c) + 0.035;
  const lo = Math.min(o, c) - 0.035;
  return { o, c, hi, lo, up: c >= o };
});
const cw = step * 0.56;

const emaLow = P.map((p, i) => `${i ? 'L' : 'M'} ${x(i).toFixed(1)} ${y(p - 0.10).toFixed(1)}`).join(' ');
const emaHigh = P.map((p, i) => `${i ? 'L' : 'M'} ${x(i).toFixed(1)} ${y(p + 0.10).toFixed(1)}`).join(' ');
const closeLine = P.map((p, i) => `${i ? 'L' : 'M'} ${x(i).toFixed(1)} ${y(p).toFixed(1)}`).join(' ');

const candleSvg = candles.map((k, i) => {
  const col = k.up ? '#16d97a' : '#ff5a52';
  const bw = Math.max(4, cw);
  const top = y(Math.max(k.o, k.c));
  const bot = y(Math.min(k.o, k.c));
  return `<line x1="${x(i).toFixed(1)}" x2="${x(i).toFixed(1)}" y1="${y(k.hi).toFixed(1)}" y2="${y(k.lo).toFixed(1)}" stroke="${col}" stroke-width="2"/>`
    + `<rect x="${(x(i) - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(3, bot - top).toFixed(1)}" rx="2" fill="${col}"/>`;
}).join('');

// markers
const buyI = 8, sellI = 3;
const buy = `<g transform="translate(${x(buyI)}, ${y(candles[buyI].lo) + 46})">
  <rect x="-44" y="-26" width="88" height="46" rx="10" fill="#16d97a"/>
  <polygon points="0,-40 -10,-26 10,-26" fill="#16d97a"/>
  <text x="0" y="6" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="26" font-weight="900" fill="#04210f">BUY</text></g>`;
const sell = `<g transform="translate(${x(sellI)}, ${y(candles[sellI].hi) - 46})">
  <rect x="-44" y="-20" width="88" height="46" rx="10" fill="#ff5a52"/>
  <polygon points="0,40 -10,26 10,26" fill="#ff5a52"/>
  <text x="0" y="12" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="26" font-weight="900" fill="#2a0606">SELL</text></g>`;

const gridLines = [0.2, 0.4, 0.6, 0.8].map(g =>
  `<line x1="${cx0}" x2="${cx1}" y1="${y(g).toFixed(1)}" y2="${y(g).toFixed(1)}" stroke="rgba(176,199,230,0.07)" stroke-width="1"/>`).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1322"/><stop offset="55%" stop-color="#06090f"/><stop offset="100%" stop-color="#0b1a14"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="60%">
      <stop offset="0%" stop-color="rgba(22,217,122,0.16)"/><stop offset="100%" stop-color="rgba(22,217,122,0)"/>
    </radialGradient>
    <linearGradient id="title" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#16d97a"/><stop offset="55%" stop-color="#eafff4"/><stop offset="100%" stop-color="#9fe9c4"/>
    </linearGradient>
    <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(22,217,122,0.22)"/><stop offset="100%" stop-color="rgba(22,217,122,0)"/>
    </linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ${gridLines}

  <!-- title block (center-top, clear of corner chips) -->
  <text x="${W / 2}" y="150" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="92" font-weight="900" letter-spacing="2" fill="url(#title)">PINE INDICATORS</text>
  <text x="${W / 2}" y="200" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="6" fill="#9fb0c8">PRECISE SIGNALS &#183; POWERFUL TRADES</text>

  <!-- area under close line -->
  <path d="${closeLine} L ${cx1} ${cyBot} L ${cx0} ${cyBot} Z" fill="url(#fill)"/>
  <!-- EMA bands (dotted) -->
  <path d="${emaHigh}" fill="none" stroke="#ff5a52" stroke-width="3" stroke-dasharray="2 12" stroke-linecap="round" opacity="0.8"/>
  <path d="${emaLow}" fill="none" stroke="#16d97a" stroke-width="3" stroke-dasharray="2 12" stroke-linecap="round" opacity="0.9"/>
  <!-- glowing close line -->
  <path d="${closeLine}" fill="none" stroke="#16d97a" stroke-width="4" filter="url(#soft)" opacity="0.7"/>
  ${candleSvg}
  ${buy}
  ${sell}

  <!-- brand mark bottom-right -->
  <text x="${W - 60}" y="${H - 54}" text-anchor="end" font-family="Arial Black, Arial, sans-serif" font-size="30" font-weight="900" letter-spacing="3" fill="#eafff4">UC<tspan fill="#16d97a"> PINE SUITE</tspan></text>
  <text x="${W - 60}" y="${H - 28}" text-anchor="end" font-family="Arial, sans-serif" font-size="17" letter-spacing="2" fill="#5d6b80">TRADINGVIEW &#183; PINE SCRIPT v5</text>
</svg>`;

const png = new Resvg(svg, { fitTo: { mode: 'width', value: W }, font: { loadSystemFonts: true } }).render().asPng();
const out = resolve(process.cwd(), 'public', 'case', 'pine-indicators.jpg');
await writeFile(out, png);
console.log('[pine-image] wrote', out, `(${(png.length / 1024).toFixed(0)} KB)`);
