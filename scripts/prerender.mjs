// Real static prerendering (SSG) for the SPA.
//
// generate-static-seo.mjs writes an EMPTY index.html shell into every route
// folder so deep links return 200. This script then boots each of those routes
// in headless Chrome, lets React + Router + helmet render the real content and
// per-page <head>, and overwrites the shell with the fully-rendered HTML — so
// crawlers and AI answer engines read the actual page, not an empty <div id=root>.
//
// React still re-renders client-side on load (createRoot), so interactivity is
// unchanged; this only adds crawlable HTML + correct per-route meta tags.

import { readdir, writeFile } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import { spawn } from 'node:child_process';
import puppeteer from 'puppeteer';

const distDir = resolve(process.cwd(), 'dist');
const PORT = 4179;
const ORIGIN = `http://localhost:${PORT}`;
const SETTLE_MS = 1400; // let entrance animations + helmet head updates finish

// Collect every route from the index.html files already in dist/
async function findRoutes(dir, routes = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (entry.name === 'assets') continue;
      await findRoutes(resolve(dir, entry.name), routes);
    } else if (entry.name === 'index.html') {
      const rel = relative(distDir, dir).split(sep).join('/');
      routes.push(rel === '' ? '/' : `/${rel}`);
    }
  }
  return routes;
}

async function waitForServer(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch { /* not up yet */ }
    await new Promise(r => setTimeout(r, 250));
  }
  throw new Error('vite preview did not start in time');
}

const preview = spawn(
  'npx',
  ['vite', 'preview', '--port', String(PORT), '--strictPort'],
  { cwd: process.cwd(), stdio: 'ignore', shell: true }
);

let browser;
try {
  await waitForServer(ORIGIN);
  const routes = await findRoutes(distDir);
  browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  let done = 0;
  for (const route of routes) {
    const page = await browser.newPage();
    try {
      await page.goto(`${ORIGIN}${route}`, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(
        () => document.querySelector('#root')?.children.length > 0,
        { timeout: 15000 }
      );
      await new Promise(r => setTimeout(r, SETTLE_MS));
      const html = '<!DOCTYPE html>\n' + await page.evaluate(() => document.documentElement.outerHTML);
      const outFile = route === '/'
        ? resolve(distDir, 'index.html')
        : resolve(distDir, route.slice(1), 'index.html');
      await writeFile(outFile, html, 'utf8');
      done++;
      process.stdout.write(`\r[prerender] ${done}/${routes.length} ${route}`.padEnd(60));
    } catch (err) {
      console.warn(`\n[prerender] skipped ${route}: ${err.message}`);
    } finally {
      await page.close();
    }
  }
  console.log(`\n[prerender] rendered ${done}/${routes.length} routes with real content`);
} finally {
  if (browser) await browser.close();
  preview.kill();
}
