// Rasterizes public/og-default.svg -> public/og-default.png (1200x630).
// Social platforms (WhatsApp, LinkedIn, Facebook, X) do NOT render SVG OG
// images — they need a real raster. SEO.jsx references og-default.png, so this
// keeps share previews from showing a blank/broken image.
// Run: node scripts/gen-og-image.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const svgPath = resolve(root, 'public/og-default.svg');
const pngPath = resolve(root, 'public/og-default.png');

const svg = await readFile(svgPath, 'utf8');
const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true }
});
const png = resvg.render().asPng();
await writeFile(pngPath, png);
console.log(`[og] wrote ${pngPath} (${(png.length / 1024).toFixed(1)} KB)`);
