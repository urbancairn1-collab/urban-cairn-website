# Urban Cairn: Trading-Tools Repositioning

**Date:** 2026-08-03
**Status:** Approved design, ready for implementation planning
**Backup / revert point:** `_backups/RD-WEB_2026-08-03_1225/` (source tarball + full git bundle)

---

## 1. Context

`urbancairn.in` is a React 19 + Vite 8 site deployed as static HTML to GitHub Pages. It currently
positions Urban Cairn Tech Solution as a general software studio: websites, apps, WhatsApp
automation, plus a secondary trading-tools page.

The business has changed. Revenue now comes mainly from trading tooling:

- Indicators sold to the Indian retail market
- Gold (XAUUSD) automation for MetaTrader 4 and 5
- Custom Pine Script written to a client's own logic
- Client-specific trading automation
- Python trading dashboards: option chain, stock scanners, full custom systems

The site must lead with this without discarding the local-SEO work already ranking.

### 1.1 Real assets available

| Asset | Detail |
|---|---|
| UC Gold EA Prime | MT5, XAUUSD. 3 marketing creatives. Pricing 999 / 2800 / 5500 / 10000 INR for 1m / 3m / 6m / 1yr |
| 80% Win Rate Indicator | MT5, all pairs. 2 creatives. Pricing 500 / 1200 / 4500 / 8000 INR for 1m / 3m / 1yr / lifetime |
| Backtest data (Gold EA) | 30d: PF 1.467, win 65.88% (56/85). 90d: PF 1.747, win 70.77% (184/260). 365d: PF 1.433, win 65.43% (685/1047). Max DD 21.22% / 31.56% / 32.55% |
| Real MT5 screenshot | GOLD M5 terminal, swing-liquidity levels drawn |
| 4 demo videos | Screen recordings, mp4 |
| VPS lab stack | Docker, Traefik, wildcard auto-HTTPS, n8n automation, AceQuant algo-signal dashboard running 24/7 |

### 1.2 Competitive research (fetched 2026-08-03)

| | LuxAlgo | ChartPrime | Tradetron | Sensibull |
|---|---|---|---|---|
| Theme | Dark | Dark | Dark | Dark |
| Hero visual | Real TSLA chart with live labels | Gradient wave | Tech graphics | Product screenshots |
| Proof position | Immediately below hero | Immediately below hero | Immediately below hero | Below hero |
| Proof content | Trustpilot, 9 partner logos | 100k users, 4.8 stars | 405k signups, 175k trades/day | Broker logos, founder testimonial |
| Risk reversal | 30-day money back | 7-day risk free | Free tier | Free tier |
| Pricing | Monthly/annual toggle | Toggle, save 40%, payment logos | 6 tiers, 0 to 9000 INR | Free vs Pro, per-broker pricing |
| Tail | testimonials, pricing, FAQ, CTA | same | same | same |

**Conclusions drawn:**

1. Dark is the category convention, unanimously. Combined with the Page Theme Lock rule (one theme
   per page, no mid-page inversion), this settles the visual direction: the site goes fully dark.
2. Heroes use a real chart, not decoration.
3. Credibility numbers appear before the first scroll ends.
4. Risk reversal is universal because trust is the blocker in this category.
5. Sensibull leads with its SEBI Research Analyst number. Urban Cairn is not an RA and does not need
   to be, because it sells software rather than advice. Stating that difference plainly is both
   safer and a genuine differentiator.

### 1.3 The wedge

LuxAlgo, ChartPrime and Tradetron sell only their own products. None writes custom Pine Script to a
client's logic, builds a client's MT5 EA, or delivers a bespoke Python option-chain dashboard.
Urban Cairn does both. That combination, backed by real screenshots and real demo video, is the
positioning.

---

## 2. Design read and dials

> Reading this as: a products-plus-services landing for Indian retail traders and trading
> businesses, with a dark technical-terminal language, leaning toward native CSS custom properties
> plus IBM Plex Sans and JetBrains Mono, with restrained motivated motion.

| Dial | Value | Reason |
|---|---|---|
| DESIGN_VARIANCE | 7 | Asymmetric and editorial, but conversion matters more than art |
| MOTION_INTENSITY | 5 | Motion must explain data, not perform |
| VISUAL_DENSITY | 6 | Traders expect data density. Not a gallery, not a cockpit |

Redesign mode: **overhaul** for the trading surface, **preserve** for routes, slugs, IA and existing
local-SEO pages.

---

## 3. Scope

### In scope

- Full dark theme applied site-wide, replacing the light editorial theme
- New home page composition, trading-led
- 5 new trading service pages
- 2 new product pages with pricing and Razorpay checkout
- Case study rework using real, sanitised screenshots and video
- Compliance and disclaimer layer
- Product, Offer and FAQPage structured data
- Sitemap, prerender and SEO wiring for the new routes

### Out of scope (explicitly deferred)

- Razorpay Orders API, license-key generation, expiry automation, renewal reminders. These need a
  backend; the site is static. Phase 2.
- Any change to the VPS lab stack
- Rewriting existing blog posts
- Changing the company logo or wordmark

---

## 4. Information architecture

### 4.1 Preserved without change

These slugs already rank or are linked externally. They must not move.

```
/                      /about              /services         /portfolio
/contact               /process            /industries       /free-audit
/audit-checklist       /privacy            /terms            /blog, /blog/:slug
/case-study/:slug      /for/:industry      /in/:city         /whatsapp-automation
```

### 4.2 New routes

```
/trading                                  Trading hub, links to all five below
/trading/pine-script-development
/trading/mt5-ea-development
/trading/python-trading-dashboard
/trading/option-chain-dashboard
/trading/stock-scanner-development
/products/uc-gold-ea-prime
/products/80-win-rate-indicator
```

`/trading-tools` (existing) becomes a 301-style client redirect to `/trading` so no inbound link
breaks. Because GitHub Pages cannot issue real 301s, the existing prerendered
`/trading-tools/index.html` keeps a canonical tag pointing at `/trading` plus a meta refresh.

### 4.3 Navigation

Single line, desktop height 68px:

```
Trading   Products   Work   Services   About   [ Talk to us ]
```

"Trading" and "Products" are new and lead. "Services" holds websites, apps and WhatsApp automation.

---

## 5. Visual system

### 5.1 Tokens

Replaces the light palette in `src/index.css`. One accent only.

```css
--bg:            #0B0D10;   /* warm near-black, never pure #000 */
--bg-soft:       #101317;
--surface:       #14171C;   /* cards, panels */
--surface-raised:#1A1E24;
--line:          #232830;
--line-strong:   #2E3540;

--accent:        #E0A63C;   /* gold. the only accent */
--accent-soft:   #7A5A1E;

--up:            #16A34A;   /* semantic only: profit, buy, long */
--down:          #DC2626;   /* semantic only: loss, sell, short */

--text:          #F2F3F5;
--text-soft:     #B4BAC2;
--text-muted:    #8B929B;
```

Gold is taken from the client's own Gold EA creative and matches the XAUUSD specialty. The
design tool suggested slate plus green; that was rejected because slate-900 with green is the
default palette of nearly every developer-tool site and reads as generic.

Green and red are **semantic, not decorative**. They appear only on numbers, chart marks and
directional labels. They never become button or heading colours.

Radius system, applied consistently: cards 14px, inputs 10px, buttons full pill.

### 5.2 Typography

| Role | Font |
|---|---|
| Display and body | IBM Plex Sans, weights 400/500/600/700 |
| All numerals, tickers, metrics, code | JetBrains Mono |

Instrument Serif is retired. It is a recognised AI-generated-site signature and does not fit a
trading context. Every metric renders in mono so figures align in columns the way traders expect.

Self-hosted with `font-display: swap`. Two families only.

### 5.3 Motion

Every animation must justify itself in one sentence. Permitted:

- Scroll reveal on section entry, 600ms, `cubic-bezier(0.16, 1, 0.3, 1)`, stagger 60ms
- Number count-up on metrics entering the viewport, once
- Chart screenshots masked in on scroll to imply the chart drawing itself
- Hover lift on pricing cards, `translateY(-2px)`, and `scale(0.98)` on active

Banned: scroll hijacking, more than one marquee, infinite loops on static content, custom cursors.
All motion collapses under `prefers-reduced-motion: reduce`. Only `transform` and `opacity` animate.

---

## 6. Home page composition

Eleven sections, each a different layout family, so the page never reads as a template.

| # | Section | Layout family | Content |
|---|---|---|---|
| 1 | Hero | Asymmetric split | H1 "Aapka logic. Hamara code." Subtext under 20 words. CTAs: "Talk to us" primary, "See pricing" secondary. Right side: real MT5 gold chart screenshot |
| 2 | Proof bar | Hairline strip | Udyam ID, GSTIN, platforms supported, VPS uptime. Real facts only |
| 3 | **01 Indicators** | Split, chart right | Custom Pine Script, TradingView, non-repaint, alerts. Links to service page |
| 4 | **02 MT4 / MT5** | Full-bleed video | Gold EA automation, 24/7 VPS execution. Uses a demo video, muted, loop, poster frame |
| 5 | **03 Python dashboards** | Bento, exactly 3 cells | Option chain, stock scanner, backtest engine |
| 6 | **04 Ready products** | Two pricing cards | Gold EA Prime and 80% WR Indicator, plan toggle, Razorpay and WhatsApp CTAs |
| 7 | Case studies | Horizontal scroll rail | 4 to 6 sanitised real screenshots |
| 8 | Process | Vertical rail | Logic intake, build, backtest, deploy, support |
| 9 | Honesty band | Full-width statement | "We build trading software. We do not give trading advice." |
| 10 | FAQ | Accordion | Search-intent questions, emits FAQPage schema |
| 11 | Final CTA | Centered close | WhatsApp plus free strategy review |

### 6.1 Section numbering

The client asked for numbered sections. The numbers 01 to 04 render as **large gold typographic
elements integral to each section's layout**, not as small uppercase tracked micro-labels. The
small-label form is the single most recognisable AI-site signature and is avoided deliberately
while still delivering the requested numbering.

### 6.2 Hero constraints

Headline maximum 2 lines. Subtext maximum 20 words and 4 lines. Maximum 4 text elements total.
Top padding capped at 6rem. CTAs visible without scrolling. No trust strip, no tagline under the
CTAs; those belong to section 2.

---

## 7. Product pages

One template, two instances.

Order: product hero with real chart, what it does, key features, **backtest evidence block**,
pricing table, how delivery and licensing work, FAQ, final CTA.

### 7.1 Backtest evidence block

Every performance figure must carry its context. The rendered form is a table:

| Period | Net PnL | Max drawdown | Win rate | Profit factor |
|---|---|---|---|---|
| 30 days | +81.03 USD | 30.83 USD (21.22%) | 65.88% (56/85) | 1.467 |
| 90 days | +382.08 USD | 51.50 USD (31.56%) | 70.77% (184/260) | 1.747 |
| 365 days | +1,057.41 USD | 221.17 USD (32.55%) | 65.43% (685/1047) | 1.433 |

Directly beneath, non-optional and not visually de-emphasised:

> Backtest results on XAUUSD M15, default settings. Past performance is not indicative of future
> results. Trading involves risk of loss.

Rules:

- Drawdown is always shown next to profit, never omitted
- No percentage return is shown as a headline without its period and drawdown
- The words "guaranteed", "assured", "risk-free returns" and "profit guarantee" are banned sitewide
- Headline win-rate claims must state the sample size

### 7.2 Pricing and checkout

Plan toggle across the tiers. Each tier carries two actions:

- **Buy now** to a Razorpay Payment Page link (hosted by Razorpay, no backend, no secret key in the
  frontend)
- **Ask on WhatsApp** with a prefilled message naming the product and plan

Payment method logos below the table, mirroring the ChartPrime pattern.

A short delivery note states that after payment the buyer sends their MT5 account number on
WhatsApp and the licence is bound to it, normally within a few hours. Account binding is what stops
the `.ex5` file from being copied, so it is presented as a feature rather than an inconvenience.

`src/data/products.js` holds product records: id, name, platform, symbol, tagline, features,
backtest rows, plans (label, price, months, razorpayUrl), screenshots, video, faqs.

---

## 8. Trading service pages

Five pages, one template, driven by `src/data/tradingServices.js`.

Order: hero, what we build, how it works, real work examples, what you receive (source, docs,
support terms), pricing model (fixed quote after a scoping call), FAQ, CTA.

| Page | Primary keyword |
|---|---|
| Pine Script development | pine script developer india |
| MT5 EA development | mt5 expert advisor developer |
| Python trading dashboard | python trading dashboard developer |
| Option chain dashboard | option chain dashboard development |
| Stock scanner development | stock scanner developer india |

Each page states explicitly that the client owns the source code, because that is a real
differentiator against marketplace vendors who ship compiled files only.

---

## 9. Case studies and screenshot sanitisation

Screenshots are the site's strongest asset and its biggest leak risk. This policy is binding.

| Permitted on the site | Must be removed before publishing |
|---|---|
| Chart with signals, entries, TP and SL levels | The indicator or EA Inputs and Parameters window |
| Dashboard shell, tabs, filters, layout | Any source code, Pine editor or `.mq5` view |
| Equity curve, profit factor, drawdown, win rate | Strategy names that reveal the method |
| Order panels, position lists with masked values | Client names, account numbers, broker logins, client balances |

Process for each image:

1. Crop to the chart or dashboard area
2. Blur or crop out any parameter panel
3. Rename EA and indicator labels to the public product name. The supplied
   `SwingPointsLiquidityEA` label in the MT5 title bar must be renamed
4. Mask account numbers in the title bar
5. Export at 2x, convert to WebP with a JPEG fallback, set explicit width and height

Demo videos are cropped to the chart area, muted, looped, given a poster frame, marked
`preload="none"` and lazy-loaded so they never block LCP.

Each case study states the problem, what was built, the platform, and the outcome in operational
terms such as execution latency, uptime or hours saved. Client profit figures are never claimed on
a client's behalf.

---

## 10. Compliance layer

Urban Cairn sells software. It is not a SEBI Registered Research Analyst and does not provide
trading advice or recommendations. That is stated plainly rather than left ambiguous.

1. **Honesty band**, home section 9, full width, plain language:
   "We build trading software. We do not give trading advice, tips or calls, and we do not manage
   anyone's money. What you do with the tools is your decision."
2. **Footer disclaimer** on every page: risk warning plus "not investment advice" plus
   "not a SEBI Registered Research Analyst".
3. **Product page disclaimer** directly under every backtest table, as specified in 7.1.
4. **Razorpay merchant safety.** Payment gateway terms commonly prohibit unsubstantiated financial
   return claims. Every number on the site is labelled as a backtest with its period and settings,
   and no return is promised. This protects the payment account, which now carries real revenue.

---

## 11. SEO plan

The existing local play (`/in/anand`, `/in/vadodara`, `/in/ahmedabad`, `/in/surat`) targets
"web development company in <city>" and is preserved untouched. The trading play is national and
global, so it needs its own pages rather than reusing city pages.

Per new page:

- Unique title and description written to search intent, no duplication
- `FaqSection` with FAQPage schema, reusing the existing component
- Breadcrumb schema
- Product plus Offer schema on product pages, including `priceCurrency: INR` and each plan price,
  which is what surfaces pricing in search results
- `SoftwareApplication` schema on product pages
- Internal links from the home page and from `/services`
- Added to `scripts/generate-static-seo.mjs` route list and therefore to `sitemap.xml` and the
  prerender pass

`llms.txt` is updated so AI answer engines can read the trading capability list.

Target after this work: the site can answer queries of the form "pine script developer india",
"mt5 gold ea developer", "python option chain dashboard developer" with a dedicated, prerendered,
schema-rich page rather than a paragraph on a general services page.

---

## 12. Risk controls

The client asked explicitly for this to be done without risk.

1. All work happens on a branch, `feature/trading-repositioning`. `master` stays deployable.
2. The revert point is `_backups/RD-WEB_2026-08-03_1225/`, taken before any change.
3. No existing route, slug, nav label or form field name changes. Analytics and inbound links keep
   working.
4. `npm run build` must pass with all routes prerendering after every phase. The current baseline is
   45 of 45.
5. Nothing is deployed until the git auth problem is resolved. `master` is currently 10 commits
   ahead of origin and pushes fail with 403 because credentials resolve to
   `pacpltradingdesk-dotcom` while the repository belongs to `urbancairn1-collab`.
6. Light-theme removal is done token-first, so any missed component degrades to a dark surface
   rather than an unreadable white block. Every page is checked visually before merge.
7. No real credentials from the VPS lab documentation appear anywhere in the site or repository.

### Known issue raised separately

`README-LAB.md` in the VPS lab folder contains a live dashboard password in plain text for a
publicly reachable HTTPS host. This is outside the scope of this redesign but should be rotated.

---

## 13. Build phases

| Phase | Deliverable | Verification |
|---|---|---|
| 1 | Dark token system, typography swap, global styles | Build green, every existing page readable |
| 2 | Navigation, footer, compliance band, disclaimers | Build green, disclaimer on all pages |
| 3 | Home page sections 1 to 6 | Hero fits viewport, no layout repeats |
| 4 | Home sections 7 to 11, case study rail | Real assets in place, video lazy-loads |
| 5 | Product pages plus `products.js` plus Razorpay links | Schema validates, prices correct |
| 6 | Five trading service pages plus `tradingServices.js` | Each page unique title, FAQ schema |
| 7 | SEO wiring, sitemap, `llms.txt`, redirect for `/trading-tools` | 53 of 53 routes prerender (45 existing plus 8 new) |
| 8 | Asset sanitisation pass, image optimisation | No parameter windows, no account numbers |
| 9 | Accessibility and performance pass | Contrast AA, reduced motion, LCP under 2.5s |

---

## 14. Open items requiring client input during build

1. Razorpay Payment Page URLs, one per plan across both products. These are created in the Razorpay
   dashboard and cannot be generated from here.
2. Confirmation of which of the 4 demo videos may be published, and whether any contain client data.
3. The public-facing name to replace `SwingPointsLiquidityEA` in the MT5 screenshot.
4. Real, verifiable numbers for the proof bar. No figure is invented; if a number cannot be
   verified, the slot is dropped rather than filled.
