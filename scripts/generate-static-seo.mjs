// Generates sitemap.xml + robots.txt + 404.html + og-default.png into /dist after build,
// AND pre-renders every SPA route as <route>/index.html so GitHub Pages returns
// HTTP 200 (not 404 with SPA fallback) — required for Google indexing.

import { writeFile, copyFile, readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const SITE_URL = 'https://urbancairn.in';

// Static routes
const STATIC = [
  { path: '/', priority: '1.0', change: 'weekly' },
  { path: '/free-audit', priority: '0.95', change: 'weekly' },
  { path: '/audit-checklist', priority: '0.85', change: 'monthly' },
  { path: '/services', priority: '0.9', change: 'monthly' },
  { path: '/portfolio', priority: '0.9', change: 'monthly' },
  { path: '/process', priority: '0.85', change: 'monthly' },
  { path: '/industries', priority: '0.85', change: 'monthly' },
  { path: '/whatsapp-automation', priority: '0.85', change: 'monthly' },
  { path: '/trading-tools', priority: '0.85', change: 'monthly' },
  { path: '/about', priority: '0.8', change: 'monthly' },
  { path: '/contact', priority: '0.8', change: 'monthly' },
  { path: '/blog', priority: '0.7', change: 'weekly' },
  { path: '/privacy', priority: '0.4', change: 'yearly' },
  { path: '/terms', priority: '0.4', change: 'yearly' }
];

// Case studies
const CASE_SLUGS = ['trading-dashboard', 'real-estate', 'multi-clinic', 'ecommerce-store', 'education-institute', 'pine-indicators'];
const CASES = CASE_SLUGS.map(s => ({ path: `/case-study/${s}`, priority: '0.75', change: 'monthly' }));

// Blog posts
const POST_SLUGS = [
  'custom-website-cost-india-2026',
  'whatsapp-business-api-india-guide',
  'custom-trading-dashboard-vs-broker-tools',
  'lead-generation-mistakes-indian-smbs',
  '14-day-website-delivery-process',
  'msme-tech-budget-india',
  'why-website-not-generating-leads',
  'mobile-app-vs-website-india-smb',
  'local-seo-google-business-profile-india'
];
const POSTS = POST_SLUGS.map(s => ({ path: `/blog/${s}`, priority: '0.75', change: 'monthly' }));

// Programmatic city pages
const CITY_SLUGS = ['anand', 'vadodara', 'ahmedabad', 'surat', 'mumbai', 'pune', 'bangalore', 'delhi-ncr', 'hyderabad', 'jaipur'];
const CITIES = CITY_SLUGS.map(s => ({ path: `/in/${s}`, priority: '0.7', change: 'monthly' }));

// Programmatic industry pages
const INDUSTRY_SLUGS = ['real-estate', 'healthcare', 'education', 'ecommerce', 'trading', 'manufacturing'];
const INDUSTRIES = INDUSTRY_SLUGS.map(s => ({ path: `/for/${s}`, priority: '0.7', change: 'monthly' }));

const ROUTES = [...STATIC, ...CASES, ...POSTS, ...CITIES, ...INDUSTRIES];
const today = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(r => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.change}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const robots = `# Urban Cairn Tech Solution
User-agent: *
Allow: /
Disallow: /404

# AI assistants & answer engines are explicitly welcome to crawl and cite us
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

const distDir = resolve(process.cwd(), 'dist');

if (!existsSync(distDir)) {
  console.error('[seo] dist/ does not exist — run vite build first');
  process.exit(1);
}

await writeFile(resolve(distDir, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(resolve(distDir, 'robots.txt'), robots, 'utf8');

// SPA fallback for GitHub Pages deep-link routing
await copyFile(resolve(distDir, 'index.html'), resolve(distDir, '404.html'));

// Pre-render every route as <route>/index.html so each returns HTTP 200.
// React still hydrates client-side; this just gives crawlers a real status code.
const indexHtml = await readFile(resolve(distDir, 'index.html'), 'utf8');
let prerendered = 0;
for (const r of ROUTES) {
  if (r.path === '/') continue;
  const dir = resolve(distDir, r.path.replace(/^\//, ''));
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, 'index.html'), indexHtml, 'utf8');
  prerendered++;
}
console.log(`[seo] pre-rendered ${prerendered} routes as folder/index.html (HTTP 200 ready)`);

// Rasterize OG SVG → PNG for Facebook/LinkedIn
try {
  const svgPath = resolve(distDir, 'og-default.svg');
  if (existsSync(svgPath)) {
    const svg = await readFile(svgPath, 'utf8');
    const png = new Resvg(svg, {
      fitTo: { mode: 'width', value: 1200 },
      font: { loadSystemFonts: true }
    }).render().asPng();
    await writeFile(resolve(distDir, 'og-default.png'), png);
    console.log('[seo] og-default.png rasterized (1200x630)');
  }
} catch (e) {
  console.warn('[seo] og PNG generation failed:', e.message);
}

console.log(`[seo] sitemap.xml (${ROUTES.length} routes), robots.txt, 404.html generated`);
