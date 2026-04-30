# Analytics + form delivery — env var setup (15 min total)

All analytics + form delivery is wired in code. It activates when you create `.env.local` in `urban-cairn/` and add the keys below, then run `npm run deploy`.

## Where to get each key

### 1. Google Analytics 4 — `VITE_GA_ID` (5 min)

1. Go to https://analytics.google.com → **Admin** (bottom-left gear) → **Create property**
2. Property name: `Urban Cairn`
3. Reporting time zone: India · GMT+05:30
4. Currency: INR
5. Click **Next**, fill in industry/size, click **Next**
6. Choose **Web** stream
7. URL: `https://urbancairn1-collab.github.io/urban-cairn-website/`
8. Stream name: `Urban Cairn Production`
9. Click **Create stream**
10. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`)

### 2. Microsoft Clarity — `VITE_CLARITY_ID` (3 min)

Free heatmaps + session recordings. Better than Hotjar for free tier.

1. Go to https://clarity.microsoft.com → sign in with Microsoft / Google
2. **Create new project**
3. Name: `Urban Cairn`
4. Website: `urbancairn1-collab.github.io/urban-cairn-website`
5. Category: `Technology / Software`
6. After creation, on the **Setup** tab, copy the **Project ID** (alphanumeric, 10 chars)

### 3. EmailJS — form delivery (5 min)

Until this is set, the form falls back to opening WhatsApp (which still works — leads still reach you). Setting EmailJS gives you email delivery in addition.

1. Go to https://www.emailjs.com → sign up (free tier: 200 emails/month)
2. **Email Services** → **Add New Service** → choose Gmail → connect `urbancairn1@gmail.com` → name it `service_urbancairn` → save
3. Copy the **Service ID** (e.g., `service_xxxxxxx`)
4. **Email Templates** → **Create New Template**
5. Subject: `New lead from {{from_name}} — {{business_type}}`
6. Body:
   ```
   New lead via Urban Cairn website.

   Name: {{from_name}}
   Phone / WhatsApp: {{from_phone}}
   Email: {{from_email}}

   Business type: {{business_type}}
   Interest: {{interest}}

   Message:
   {{message}}
   ```
7. To Email: `urbancairn1@gmail.com`
8. Save and copy the **Template ID** (e.g., `template_xxxxxxx`)
9. Account → **API Keys** → copy the **Public Key**

### 4. Calendly — `VITE_CALENDLY_URL` (5 min)

Optional. Adds a "Pick a slot" tab on the free-audit page.

1. https://calendly.com → sign up free
2. Create event type: **45-Minute Strategy Call**
3. Make sure the event link is something clean like `calendly.com/urbancairn/strategy`
4. Copy the full URL

## Step 2 — Create `.env.local`

In `urban-cairn/.env.local` (this file is gitignored — never commits):

```
VITE_GA_ID=G-XXXXXXXXXX
VITE_CLARITY_ID=xxxxxxxxxx
VITE_EMAILJS_SERVICE=service_xxxxxxx
VITE_EMAILJS_TEMPLATE=template_xxxxxxx
VITE_EMAILJS_PUBLIC=YOUR_PUBLIC_KEY
VITE_CALENDLY_URL=https://calendly.com/urbancairn/strategy
```

## Step 3 — Redeploy

```bash
cd urban-cairn
npm run deploy
```

That's it. GA, Clarity, EmailJS, Calendly all live within 2-3 min after deploy completes.

## How to verify it's working

- **GA:** Within 5 min of opening the live site, you should see "1 user in last 30 minutes" in GA4 → **Reports** → **Realtime**
- **Clarity:** Click around the live site, then check Clarity dashboard within 30 min — heatmap + recording should appear
- **EmailJS:** Submit a test form on `/free-audit/`. You should receive an email within 30 sec.
- **Calendly:** Go to `/free-audit/`, click the **"Pick a slot"** tab — Calendly widget should load.

## Conversion events that auto-track in GA4

Already wired in code — appear automatically in GA4 Events report:

| Event | Triggered when |
|---|---|
| `page_view` | Any page change |
| `lead_submit` | Lead form completes (with business_type, interest props) |
| `generate_lead` | Same — Google's standard conversion event |
| `whatsapp_click` | Floating WhatsApp button clicked |
| `sticky_cta_click` | Bottom-floating CTA clicked |
| `hero_cta_click` | Home hero CTA clicked (with A/B variant) |
| `ab_assigned` | A/B test variant assigned |

In GA4: **Configure → Events → mark `generate_lead` as conversion** to see it in Conversions reports.
