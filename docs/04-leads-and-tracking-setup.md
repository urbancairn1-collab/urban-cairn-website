# Leads + Visitor Tracking — Setup (do today)

Everything below is FREE. The website code is already wired — you only create the
accounts and bring back the IDs. Paste them into `.env`, then Claude runs
`npm run deploy` and it goes live.

Bring back these 5 values:
`VITE_GA_ID`, `VITE_CLARITY_ID`, `VITE_EMAILJS_SERVICE`, `VITE_EMAILJS_TEMPLATE`, `VITE_EMAILJS_PUBLIC`

---

## 1. Microsoft Clarity — "who came, what they saw" (5 min) ⭐ easiest
Records real screen sessions + heatmaps (scroll, clicks, rage-clicks).

1. Go to **https://clarity.microsoft.com** → sign in with Google/Microsoft.
2. Click **+ New project**.
   - Name: `Urban Cairn`
   - Website URL: `https://urbancairn.in`
3. Open the project → **Settings** → **Setup** → **Install manually**.
4. Copy the **project ID** (the 10-char code in the tag, e.g. `abcd1234ef`).
   → this is **`VITE_CLARITY_ID`**.

## 2. Google Analytics 4 — visitor numbers + sources (10 min)
Shows how many people, from where (Google / Instagram / WhatsApp), which pages, which city.

1. Go to **https://analytics.google.com** → sign in (use the business Gmail).
2. **Admin** (bottom-left gear) → **Create** → **Account** → name it `Urban Cairn` → Next.
3. Create a **Property** → name `urbancairn.in`, timezone **India**, currency **INR** → Next → fill business info → Create.
4. Choose platform **Web** → Website URL `https://urbancairn.in`, stream name `Web` → **Create stream**.
5. Copy the **Measurement ID** (top-right, looks like `G-XXXXXXXXXX`).
   → this is **`VITE_GA_ID`**.

## 3. EmailJS — every contact lead lands in your Gmail (15 min)
1. Go to **https://www.emailjs.com** → **Sign Up** (free).
2. **Email Services** → **Add New Service** → pick **Gmail** → connect `urbancairn1@gmail.com` → allow.
   - Copy the **Service ID** → **`VITE_EMAILJS_SERVICE`**.
3. **Email Templates** → **Create New Template**.
   - In the template body paste these variables somewhere visible:
     ```
     Name: {{from_name}}
     Phone: {{from_phone}}
     Email: {{from_email}}
     Business: {{business_type}}
     Need: {{interest}}
     Message: {{message}}
     ```
   - Set **To Email** = `urbancairn1@gmail.com`
   - Set **Subject** = `New lead — {{from_name}}`
   - Save → copy the **Template ID** → **`VITE_EMAILJS_TEMPLATE`**.
4. **Account** → **General / API Keys** → copy the **Public Key** → **`VITE_EMAILJS_PUBLIC`**.

> After this, the contact form will: (a) email you instantly **and** (b) still open
> WhatsApp with the lead pre-filled. Two channels, nothing missed.

---

## 4. Google Search Console — get found on Google (after GA is done, 5 min)
1. Go to **https://search.google.com/search-console** → **Add property** → **URL prefix** → `https://urbancairn.in`.
2. Verify using **Google Analytics** (works once Step 2 is done) — one click.
3. Left menu → **Sitemaps** → submit: `sitemap.xml`.
   (No code/ID needed — this is account-side only.)

## 5. Bing Webmaster — feeds Bing + ChatGPT/AI search (3 min)
1. Go to **https://www.bing.com/webmasters** → sign in.
2. **Import** from Google Search Console (one click) — done.

## 6. Google Business Profile — local map ranking, Vadodara (10 min)
1. Go to **https://business.google.com** → create profile.
   - Name: `Urban Cairn Tech Solution`
   - Category: `Software company` / `Website designer`
   - Area served: Vadodara + India (online)
   - Add phone, website `urbancairn.in`, hours.
2. Verify (Google sends a code). This is what makes you show up in local "near me" searches.

---

## After you collect the IDs
Paste the 5 values into `.env`, then deploy:
```
npm run deploy
```
Tracking + email go live immediately. Search ranking builds over the following weeks.
