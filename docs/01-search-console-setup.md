# Google Search Console — step-by-step (5 min)

This unlocks everything else. Until you do this, Google has zero visibility into your site, and we can't measure anything.

## Step 1 — Open Search Console

Go to https://search.google.com/search-console and sign in with the same Google account you'll use for Analytics.

## Step 2 — Add property

Click **"Add property"** at the top-left.

You'll see two options:
- **Domain** — best, but requires DNS access (use this later when you point urbancairn.in)
- **URL prefix** — use this for now

Pick **URL prefix** and paste:

```
https://urbancairn1-collab.github.io/urban-cairn-website/
```

Click **Continue**.

## Step 3 — Verify ownership

Choose verification method **"HTML tag"** (easiest).

You'll see a meta tag like:

```html
<meta name="google-site-verification" content="ABC123xyz..." />
```

Copy just the `content` value (the `ABC123xyz...` part) and send it to me. I'll add it to `index.html` and redeploy. Then click **Verify** — should be instant.

> Alternative: if you can upload an HTML file to the repo, you can use the "HTML file" method. But the meta tag is faster.

## Step 4 — Submit sitemap

Once verified, in the left nav click **Sitemaps**.

In the "Add a new sitemap" box, type:

```
sitemap.xml
```

Click **Submit**. Google will queue the 40 URLs for indexing.

## Step 5 — Request indexing of top pages (manual boost)

Even after sitemap submission, Google takes 1-4 weeks to crawl new sites. You can manually request indexing for your top 5 pages right now:

1. Go to **URL Inspection** (top of left nav).
2. Paste each of these URLs one at a time:
   - `https://urbancairn1-collab.github.io/urban-cairn-website/`
   - `https://urbancairn1-collab.github.io/urban-cairn-website/free-audit/`
   - `https://urbancairn1-collab.github.io/urban-cairn-website/services/`
   - `https://urbancairn1-collab.github.io/urban-cairn-website/portfolio/`
   - `https://urbancairn1-collab.github.io/urban-cairn-website/in/anand/`
3. For each, click **"Request indexing"** if available.
4. Wait 24-72 hours.

## What success looks like

After 7-14 days, in the **Coverage** report you should see:
- Valid: ~30+ pages
- Excluded: 0-5 (small number of URLs Google chose not to index — this is normal)
- Errors: 0

## When to come back

- **Day 7:** Check if pages have started getting indexed.
- **Day 30:** Look at "Performance" report — what queries are bringing impressions, what's the CTR.
- **Day 90:** Adjust meta titles/descriptions based on what's getting impressions but low clicks.
