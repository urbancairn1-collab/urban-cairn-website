# syntax=docker/dockerfile:1.7
# ─────────────────────────────────────────────────────────────────────────────
# Urban Cairn — production image
#
#   stage 1 (build)   node + chromium -> vite build + SEO gen + real prerender
#   stage 2 (runtime) nginx:alpine serving static dist/ , no TLS, no host port
#
# The runtime image contains ONLY static files. Nothing from the build stage
# (node_modules, chromium, source) ships to production.
# ─────────────────────────────────────────────────────────────────────────────

########################  stage 1 — build  ###################################
# package.json requires node ^20.19 || >=22.12 (vite 8). Pin 22.
FROM node:22-bookworm-slim AS build

# scripts/prerender.mjs drives headless Chrome over every route to bake real
# HTML. Use Debian's chromium rather than letting puppeteer download its own:
# the OS package brings its shared libraries with it, so the build is smaller
# and doesn't need the long apt list of libnss/libatk/... dependencies.
# puppeteer.launch() honours PUPPETEER_EXECUTABLE_PATH, so no code change.
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      chromium \
      ca-certificates \
      fonts-liberation \
      fonts-noto-color-emoji \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Dependencies first so this layer caches across source-only changes.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# ---- build-time configuration ----------------------------------------------
# IMPORTANT: VITE_* values are compiled INTO the JS bundle. They are NOT read
# at container start. Changing any of these needs a rebuild, not a restart.
ARG VITE_GA_ID=""
ARG VITE_CLARITY_ID=""
ARG VITE_EMAILJS_SERVICE=""
ARG VITE_EMAILJS_TEMPLATE=""
ARG VITE_EMAILJS_PUBLIC=""
ARG VITE_CALENDLY_URL=""

ENV VITE_GA_ID=$VITE_GA_ID \
    VITE_CLARITY_ID=$VITE_CLARITY_ID \
    VITE_EMAILJS_SERVICE=$VITE_EMAILJS_SERVICE \
    VITE_EMAILJS_TEMPLATE=$VITE_EMAILJS_TEMPLATE \
    VITE_EMAILJS_PUBLIC=$VITE_EMAILJS_PUBLIC \
    VITE_CALENDLY_URL=$VITE_CALENDLY_URL

# gen-og-image -> vite build -> sitemap/robots/404 + route shells -> prerender
RUN npm run build

# Hard-fail if prerendering silently produced empty shells (see script header).
RUN node deploy/verify-prerender.mjs

########################  stage 2 — runtime  #################################
FROM nginx:alpine AS runtime

# Config first, then the built site.
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# CNAME is a GitHub Pages artifact and means nothing here.
RUN rm -f /usr/share/nginx/html/CNAME \
 && nginx -t

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
