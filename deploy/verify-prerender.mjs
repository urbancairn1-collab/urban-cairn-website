// Build-time assertion: did the prerender actually bake real HTML?
//
// scripts/prerender.mjs catches per-route failures, warns, and keeps going —
// and the build still exits 0. If headless Chrome can't start in the build
// container, every route silently ships as an empty <div id="root"></div>.
// The site still LOOKS fine in a browser (React hydrates client-side) but is
// invisible to crawlers, which would quietly undo the site's SEO work.
//
// This script fails the build instead of letting that ship.

import { readdir, readFile } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');

// Routes that are intentionally empty shells (404.html is a copy of index.html
// before prerender, but prerender overwrites index.html only).
const IGNORE = new Set(['/404.html']);

async function findHtml(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'assets') continue;
      await findHtml(full, out);
    } else if (entry.name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

const files = await findHtml(distDir);
if (files.length === 0) {
  console.error('[verify-prerender] FAIL: no HTML found in dist/ — did the build run?');
  process.exit(1);
}

let checked = 0;
const empty = [];
const noTitle = [];

for (const file of files) {
  const rel = '/' + relative(distDir, file).split(sep).join('/');
  if (IGNORE.has(rel)) continue;
  checked++;

  const html = await readFile(file, 'utf8');

  // An un-prerendered shell looks like: <div id="root"></div>
  if (/<div id="root">\s*<\/div>/.test(html)) empty.push(rel);

  // A prerendered page should carry a real per-route <title>.
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title) noTitle.push(rel);
}


if (empty.length > 0) {
  console.error(
    `\n[verify-prerender] FAIL: ${empty.length}/${checked} routes shipped as empty shells.\n` +
    `Headless Chrome almost certainly failed inside the build stage.\n` +
    `Affected routes (first 15):\n  ` + empty.slice(0, 15).join('\n  ') + '\n'
  );
  process.exit(1);
}

if (noTitle.length > 0) {
  console.error(
    `\n[verify-prerender] FAIL: ${noTitle.length} routes have no <title>:\n  ` +
    noTitle.slice(0, 15).join('\n  ') + '\n'
  );
  process.exit(1);
}

console.log(`[verify-prerender] OK — ${checked} routes contain real prerendered HTML.`);
