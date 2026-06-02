# Urban Cairn — Merge Plan
**Goal:** Keep the OLD site (`urban-cairn`) **100% intact** — its light editorial theme, Inter/Instrument Serif fonts, vermilion accent, layout, UX, animations, **every existing image, page, route, data file and component stays untouched**. PURELY ADDITIVE: bring over the NEW site's (`uc-tech-sol`) richer **data**, **coded SVG product mockups**, and **industry images** — each one **re-styled to match the old site's design tokens** so nothing looks foreign.

> Principle: *purana bhi SAB rakhna hai — saari images, pages, content, components. Kuch replace/remove NAHI. Bas naya ADD karna hai, old ke design ke hisab se set karke. (Additive only — no deletions, no replacements.)*

---

## 1. Source → Target token bridge (the core of everything)

The new mockups/CSS use the new site's DARK tokens. To make them look native in the old LIGHT site, remap **every** new token to an old equivalent. This table is the contract:

| New token (uc-tech-sol) | Old equivalent (urban-cairn) | Notes |
|---|---|---|
| `--ink`, `--ink-2`, `--surface*` | `--bg-pure` / `--bg-soft` / `--bg-tint` | dark→light surfaces (white card interiors) |
| `--text`, `--text-dim`, `--text-muted` | `--text`, `--text-soft`, `--text-muted` | already align |
| `--line`, `--line-strong` | `--line`, `--line-strong` | already align |
| `--brand`, `--azure`, `--cyan` (navy/cyan) | `--accent` (#FF5A1F) + `--info` (#0A66FF) | charts/accents → vermilion + electric blue |
| `--good` / `--bad` | `--success` (#0FA958) / a red token | buy/sell, up/down |
| `--grad-brand` | vermilion→blue gradient (build new) | KPI tiles, app card |
| `--font-display` (Clash) | `--font-display` (Inter) | auto-swaps font |
| `--font-mono` (JetBrains) | `--font-mono` (JetBrains) | identical |
| `--glow-cyan`, `--shadow-*` | `--shadow-sm/md/lg` (old, lighter) | softer light-theme shadows |

**Decision (recommended):** recolor all 4 mockups to the LIGHT palette so they sit inside the old white `Laptop`/`Phone` device frames and look like native screenshots. (Optional flourish: keep the *trading terminal* dark, since traders expect dark UIs — but default is light to honor "sab purana rakho".)

---

## 2. Inventory — what moves, what's re-skinned

### A. Coded SVG mockups (the "SVG images")
Source: `uc-tech-sol/src/components/mockups/Mock.jsx` + `src/styles/mockups.css`
- `DashboardMock`, `TradingMock`, `MobileMock`, `CrmMock` + inner `AreaChart`, `MiniBars`, `Chrome`.
- **Action:** copy into `urban-cairn/src/components/mockups/Mock.jsx`; create `urban-cairn/src/styles/mockups.css` with **light-recolored** rules (apply token table). Render the desktop mocks inside old `DeviceMockup.Laptop`, the mobile mock inside `DeviceMockup.Phone` (old already has white-screen frames — drop-in).
- Icons used (`LayoutGrid, BarChart3, Users, Boxes, Workflow, Bell, Package`): verify they resolve in old `lucide-react` and register where needed.

### B. Data — bring over / enrich
| New file | Old state | Action |
|---|---|---|
| `data/industries.js` (10 industries) | **absent** (old only has SEO `locations.js`) | **NEW file** in old, paths rewritten to old base. Keep `locations.js` for `/for/:industry` SEO routes. |
| `data/process.js` (8 detailed steps) | old `Process.jsx` page exists, thinner | **NEW file**, feed old Process page + a Home "How we work" section |
| `data/portfolio.js` (12 projects + `mock` key) | old has deep `caseStudies.js` (3–4, with recharts) | **NEW file**: 12-project showcase grid using mockups. Keep `caseStudies.js` for deep dives. Wire `portfolioCategories` filter. |
| `services` (features[], mini `process[]`, `tagline`, `summary`) | old `services.js` (6, editorial: `num`/`badge`/`result`) | **ADD-ONLY enrich** — append `features`, `process`, `tagline`, `summary` as NEW optional fields. Do NOT touch/remove any existing field (`num`/`badge`/`result`/`icon`/`benefits`/`useCases`). Existing rendering stays identical; new fields render only where we add new sections. Old `additionalCapabilities` stays as-is too. |

### C. Images
- Only genuinely new = **10 industry photos** → copy `uc-tech-sol/public/img/industries/*.jpg` → `urban-cairn/public/industries/*.jpg`; reference as `industries/<slug>.jpg` (BASE_URL auto-prefixes).
- Case/blog/hero photos already exist in old `public/case`, `public/blog`, `public/hero-photo.jpg` — **reuse**, just rewrite new data's `/uc-tech-sol/img/case/x.jpg` → `/case/x.jpg`.

---

## 3. Phase-by-phase build order

**Phase 0 — Safety**
- Old site is its own git repo (`master`). Branch: `git checkout -b feature/port-from-uc-tech-sol`.
- `npm install && npm run dev` to confirm baseline builds.

**Phase 1 — Token bridge + mockups (visual core)**
1. Add `src/styles/mockups.css` (light-recolored; import in `index.css` or `main.jsx`).
2. Add `src/components/mockups/Mock.jsx` (ported, using old icon imports).
3. Render one mock inside `DeviceMockup.Laptop` on a scratch route; eyeball against light theme; tune colors.
4. Verify charts animate (`draw`/`grow`/`shimmer` keyframes) and respect `prefers-reduced-motion`.

**Phase 2 — Data port**
1. `data/industries.js`, `data/process.js`, `data/portfolio.js` (paths rewritten to old base).
2. Enrich `data/services.js` with `features`/`process`/`tagline`/`summary`.
3. Copy 10 industry images to `public/industries/`.

**Phase 3 — Surfaces (wire data into old-styled components)**
1. **Industries**: new bento/tint grid section (old `--tint-*` cards, `card-hover`) on Home + optional `/industries` page. Reuse old `Reveal`, `t-eyebrow`, `h-display`.
2. **Process**: feed old `Process.jsx` with 8 steps (old timeline/number styling).
3. **Portfolio**: 12-card grid with category filter; each card uses a device-frame mockup (`mock` key) or photo (`image`). Detail view reuses old `CaseStudyDetail` patterns (challenge/solution/stack/impact).
4. **Services**: old magazine spreads now also render `features` + mini-`process` rows — same vermilion editorial style.
5. Add nav/footer links + routes for any new pages (`/industries`, `/portfolio/:slug` if added).

**Phase 4 — SEO + polish**
- Add `seo.js` entries + `<SEO>` tags for new pages.
- `generate-static-seo.mjs` (old build step) — add new routes to its route list.
- Update `posts.js`/sitemap only if new pages are public.

**Phase 5 — Verify**
- `npm run lint` clean, `npm run build` passes (incl. static-SEO step).
- Visual check at 320/375/768/1024/1440; light + the device-frame mocks.
- Keyboard nav + reduced-motion + Lighthouse on Home.

---

## 4. Files touched (summary)
**New:** `src/components/mockups/Mock.jsx`, `src/styles/mockups.css`, `src/data/industries.js`, `src/data/process.js`, `src/data/portfolio.js`, `public/industries/*.jpg` (10), maybe `src/pages/Industries.jsx`.
**Edited:** `src/data/services.js` (enrich), `src/data/seo.js`, `src/pages/Home.jsx`, `src/pages/Services.jsx`, `src/pages/Process.jsx`, `src/pages/Portfolio.jsx`, `src/App.jsx` (routes), `src/components/Navbar.jsx` / `Footer.jsx`, `scripts/generate-static-seo.mjs`, `src/index.css` (import mockups.css).
**Untouched (kept 100%):** theme tokens, fonts, layout, colors, all existing animations/components, **all existing images** (`public/case`, `public/blog`, `public/brand`, hero), and **every existing page** (Home, About, Services, Portfolio, Blog/BlogPost, City `/in/:city`, Industry `/for/:industry`, FreeAudit, AuditChecklist, Process, TradingTools, WhatsAppAutomation, Privacy, Terms, Contact). New surfaces are ADDED; existing edits only APPEND new sections, never remove old ones.

## 5. Risks & guards
- **Token leakage:** any unmapped `var(--cyan)`/`--ink` will render wrong on light bg → grep the ported CSS for new-only token names before commit.
- **Image base path:** old uses `/case/`, new uses `/img/case/` — rewrite all paths; never hardcode the deploy base (`/urban-cairn-website/`), rely on BASE_URL.
- **Icon mismatch:** confirm every lucide icon name from new data exists in old's `lucide-react` version.
- **Don't import new fonts** (Clash/Satoshi) — let `--font-display` map to Inter so type stays old.
- **Scope creep:** do NOT pull new site's dark sections, Aurora, or its global CSS — only the 4 mockups + data.
