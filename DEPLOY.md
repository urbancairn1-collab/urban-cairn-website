# Deploying Urban Cairn to your VPS

> ### ⚠️ Correction — verified on the server 2026-09-07, read before §6
>
> This guide was written believing the VPS ran **Traefik** with wildcard
> auto-HTTPS alongside n8n and an AceQuant dashboard. That was checked directly
> on the box and **is not the case**. The actual server (`srv1798857`) runs a
> production **EMS stack** — Django/Celery (`teamaxis/*`), Postgres, Redis,
> MinIO, ClamAV, Grafana, Prometheus — compose project `ems` in `/srv/ems/infra`.
>
> Consequences:
>
> - **§6c Option A (Traefik) does not apply**, and
>   `deploy/docker-compose.traefik.yml` has nothing to attach to on this host.
>   Both are kept only in case the site later moves to a Traefik box.
> - Ports 80 and 443 are owned by the **`ems-nginx-1`** container, which today
>   serves `portal.mkpdigital.in` and `objects.mkpdigital.in`. Urban Cairn has
>   to be added as a second site inside that nginx.
> - Its vhosts are rendered from a mounted *template*
>   (`/srv/ems/infra/nginx/templates/ems.prod.conf.template`) at container
>   start, so config changes need an nginx **restart**, not `nginx -s reload`.
> - **Ordering matters:** those 443 blocks have no catch-all, so pointing
>   `urbancairn.in` DNS at this server *before* its config and certificate exist
>   serves visitors a cert-mismatch warning for `objects.mkpdigital.in`.
>   Config and cert first; DNS last.
> - The existing Let's Encrypt cert covers only the `mkpdigital.in` names.
>   Urban Cairn needs its own.
>
> Everything else here — the Dockerfile, the build, §5's verification, the
> `VITE_*` build-time trap, §8 updates, §9 troubleshooting — is unaffected.

The site is a static, prerendered React/Vite build. There is **no backend, no
database, no runtime secret** — the container serves plain HTML/CSS/JS through
nginx. That makes it cheap and safe to run alongside your existing projects.

Your own design spec records the VPS lab stack as *"Docker, Traefik, wildcard
auto-HTTPS, n8n automation, AceQuant algo-signal dashboard running 24/7"*, so
**Traefik is the default path below**. If that has changed, §6c covers host
nginx and Nginx Proxy Manager too.

Because the box already runs other things, this setup deliberately:

- adds **no public host port** (Traefik reaches it over the docker network),
- binds only **127.0.0.1:8087** so you can `curl` it locally to verify,
- takes **no host volumes** and shares no state with your other stacks.

---

## 0. What is in this deployment set

| File | Purpose |
|---|---|
| `Dockerfile` | 2-stage build: node+chromium builds & prerenders → nginx serves |
| `docker-compose.yml` | Base stack: loopback port, healthcheck, log rotation |
| `deploy/docker-compose.traefik.yml` | Overlay that attaches it to your Traefik |
| `deploy/nginx.conf` | Route-aware serving, gzip, cache policy, security headers |
| `deploy/verify-prerender.mjs` | **Fails the build** if prerendering silently broke |
| `deploy/env.deploy.example` | The one deploy-only variable (`HOST_PORT`) |
| `.dockerignore` | Keeps the build context small |

One repo change was required and has already been made:

> `package-lock.json` was out of sync with `package.json` (`Missing:
> @emnapi/runtime@1.11.3 from lock file`), which made `npm ci` — and therefore
> any clean Docker build — fail immediately. Regenerated; `npm ci` now passes.
> **Commit this lockfile change**, or the VPS build fails on the first try.

---

## 1. Before you start

On the VPS:

```bash
docker --version          # need Docker Engine 20.10+
docker compose version    # need the v2 plugin ("docker compose", not "docker-compose")
free -m                   # the build needs ~2GB RAM free
df -h                     # and ~3GB disk for the build stage
```

Collect the two Traefik values you will need in §6c:

```bash
docker network ls                              # your Traefik network name
docker inspect traefik | grep -i certresolver  # your certresolver name
```

The **build** is the heavy part (headless Chrome over 45 routes). The
**runtime** is tiny — nginx plus static files, well under 100MB.

> If the VPS has under 2GB RAM free, do not build on it — it will compete with
> n8n and the AceQuant dashboard. See §9 "Low-memory VPS".

---

## 2. Put the code on the VPS

```bash
mkdir -p /opt/urbancairn && cd /opt/urbancairn
git clone https://github.com/urbancairn1-collab/urban-cairn-website.git .
```

Confirm the lockfile fix from §0 is in what you cloned:

```bash
npm ci --dry-run    # must NOT say "can only install packages when ... in sync"
```

If it errors, run `npm install --package-lock-only` and commit the result.

> Note: your spec records that `master` was 10 commits ahead of origin with
> pushes failing 403 (credentials resolving to `pacpltradingdesk-dotcom` rather
> than `urbancairn1-collab`). If that is still unresolved, what you clone here
> may be behind your local work. Check before you build.

---

## 3. Configure environment

```bash
cp .env.example .env
cat deploy/env.deploy.example >> .env
nano .env
```

Fill in the values already used on GitHub Pages (GA, Clarity, EmailJS,
Calendly). `.env.example` documents where each one comes from.

Confirm the loopback port is free:

```bash
ss -ltnp | grep 8087        # no output = free
```

If taken, set a different `HOST_PORT` in `.env`.

> ### The one thing people get wrong here
> `VITE_*` values are **compiled into the JavaScript bundle at build time**.
> They are not read when the container starts. Changing GA or EmailJS keys
> means `docker compose build` again — restarting the container does nothing.

---

## 4. Build and start

```bash
cd /opt/urbancairn
docker compose build          # first build: roughly 5-12 min
docker compose up -d
docker compose ps             # STATUS should reach "healthy"
```

This starts it on loopback only — not yet on the domain. Verify first (§5),
then attach it to Traefik (§6).

---

## 5. Verify the build actually worked

**Do not skip this.** It is the difference between a working site and one that
is invisible to Google.

The build drives headless Chrome over every route to bake real HTML. If Chrome
fails, `scripts/prerender.mjs` warns and keeps going, and the build still exits
0 — you would ship pages that are an empty `<div id="root">`. They look perfect
in a browser (React fills them in client-side) and are blank to crawlers, which
would quietly undo the local-SEO work in the site's history.

`deploy/verify-prerender.mjs` now runs inside the Docker build and **fails the
build** if that happens, so a green build already means prerendering worked.
Confirm end-to-end anyway:

```bash
# 1. homepage responds
curl -sI http://127.0.0.1:8087/ | head -1          # HTTP/1.1 200 OK

# 2. a deep route returns real content
curl -s http://127.0.0.1:8087/in/anand/ | grep -c "Anand"     # want > 0

# 3. the shell check — this must print 0
curl -s http://127.0.0.1:8087/in/anand/ | grep -c 'id="root"></div>'

# 4. per-route title (the Anand page title, not the homepage one)
curl -s http://127.0.0.1:8087/in/anand/ | grep -o '<title>[^<]*</title>'

# 5. SEO files
curl -sI http://127.0.0.1:8087/sitemap.xml | head -1
curl -s  http://127.0.0.1:8087/robots.txt | head -5

# 6. unknown URL returns a real 404
curl -sI http://127.0.0.1:8087/definitely-not-a-page | head -1   # HTTP/1.1 404
```

If check 3 prints anything other than `0`, stop and read §9.

---

## 6. Connect your domain

### 6a. First decide: staging subdomain, or straight cutover?

`urbancairn.in` is **live on GitHub Pages right now** (`public/CNAME` pins it).

**Recommended — prove it on a subdomain first.** Point `vps.urbancairn.in` at
the VPS, verify the real site over HTTPS, then move the apex. The live site
never goes down. Your Traefik already does **wildcard auto-HTTPS**, so a
subdomain needs no new certificate work at all — this is nearly free for you.

**Straight cutover.** Faster, but mistakes are visible to real visitors and DNS
errors take hours to undo because of TTL caching.

Either way, **do not delete the GitHub Pages deployment** until the VPS has
served the live domain correctly for a day.

### 6b. DNS records at your registrar

Find the VPS public IP:

```bash
curl -4 ifconfig.me
```

Check what is there today before changing anything:

```bash
dig +short urbancairn.in
dig +short www.urbancairn.in
```

The apex almost certainly points at GitHub Pages IPs (`185.199.108.153`,
`185.199.109.153`, `185.199.110.153`, `185.199.111.153`) or a `CNAME` to
`urbancairn1-collab.github.io`.

**Staging subdomain (recommended first step):**

| Type | Name | Value | TTL |
|---|---|---|---|
| `A` | `vps` | `<your VPS IP>` | 300 |

**Real cutover:**

| Type | Name | Value | TTL |
|---|---|---|---|
| `A` | `@` | `<your VPS IP>` | 300 |
| `CNAME` | `www` | `urbancairn.in.` | 300 |

Things that actually matter:

- **Delete the four GitHub Pages `A` records** when you add yours. Leaving them
  means DNS round-robins between GitHub and your VPS and the site works only
  about half the time — a genuinely confusing failure to debug.
- **Drop TTL to 300 a day before** cutover, so a mistake costs 5 minutes rather
  than hours. Raise it back to 3600 once you are happy.
- On **Cloudflare**, set the record to **DNS only (grey cloud)** if your
  certresolver uses HTTP-01. If your wildcard setup uses DNS-01 (likely, given
  wildcard auto-HTTPS), proxying is fine — but verify before assuming.

---

### 6c. Put it on the domain

<details open>
<summary><b>Option A — Traefik</b> (your current stack)</summary>

Open `deploy/docker-compose.traefik.yml` and set the two values from §1:

```yaml
# the network your Traefik is on
networks:
  proxy:
    external: true
    name: proxy              # <-- your real network name

# and in the labels:
  - "traefik.docker.network=proxy"                              # <-- same name
  - "traefik.http.routers.urbancairn.tls.certresolver=letsencrypt"  # <-- your resolver
```

The hostname is **already set to `vps.urbancairn.in`** (staging). Leave it —
§7 covers flipping it to the live domain once you have clicked around and are
happy. `urbancairn.in` keeps serving from GitHub Pages until then.

Add the one DNS record staging needs:

| Type | Name | Value | TTL |
|---|---|---|---|
| `A` | `vps` | `<your VPS IP>` | 300 |

This is safe to add right now — a new subdomain cannot affect the live site.

Then bring it up with the overlay:

```bash
cd /opt/urbancairn
docker compose -f docker-compose.yml -f deploy/docker-compose.traefik.yml up -d
docker compose logs -f            # watch the router attach / cert issue
```

Make that the default so later `docker compose` calls pick it up automatically:

```bash
echo 'COMPOSE_FILE=docker-compose.yml:deploy/docker-compose.traefik.yml' >> .env
```

If the router does not appear in the Traefik dashboard, the network name is
almost always the culprit — `docker network inspect <name>` should list both
`traefik` and `urbancairn-web`.

</details>

<details>
<summary><b>Option B — host nginx + certbot</b></summary>

```bash
sudo nano /etc/nginx/sites-available/urbancairn.in
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name urbancairn.in www.urbancairn.in;

    location / {
        proxy_pass http://127.0.0.1:8087;      # match HOST_PORT
        proxy_http_version 1.1;

        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host  $host;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/urbancairn.in /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d urbancairn.in -d www.urbancairn.in
```

Then in the **443** block certbot created, above `location /`:

```nginx
    if ($host = www.urbancairn.in) { return 301 https://urbancairn.in$request_uri; }

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

> Add HSTS **only after HTTPS is confirmed working**. It tells browsers to
> refuse plain HTTP for a year, and that is hard to walk back.

</details>

<details>
<summary><b>Option C — Nginx Proxy Manager</b></summary>

**Hosts → Proxy Hosts → Add Proxy Host**

- Domain Names: `urbancairn.in`, `www.urbancairn.in`
- Scheme: `http`
- Forward Hostname / IP: `172.17.0.1` (the docker bridge — NPM in a container
  cannot reach host `127.0.0.1`)
- Forward Port: `8087`
- Enable **Block Common Exploits** and **Websockets Support**
- **SSL tab** → Request a new SSL Certificate → Force SSL → HTTP/2

</details>

### 6d. Verify the domain

```bash
curl -sI https://urbancairn.in | head -1                    # 200
curl -sI http://urbancairn.in | head -1                     # 301 -> https
curl -sI https://www.urbancairn.in | head -1                # 301 -> apex
curl -s https://urbancairn.in/in/anand/ | grep -c 'id="root"></div>'   # 0
curl -s https://urbancairn.in/sitemap.xml | head -3
```

Then in a browser, hard-reload and **send a real contact-form submission**.
EmailJS is the one thing a wrong build-arg breaks silently — the form looks
like it worked either way, and you only find out when leads stop arriving.

---

## 7. After cutover

Once the VPS has served the live domain correctly for ~24h:

1. **Google Search Console** → resubmit `https://urbancairn.in/sitemap.xml`,
   and run URL Inspection on two or three city pages to confirm Google sees
   rendered content.
2. **Disable GitHub Pages** (repo → Settings → Pages → Source: None) so it
   cannot resurface if DNS is ever reverted.
3. Raise DNS TTL back to 3600.
4. Confirm GA4 and Clarity are recording sessions from the new host.

---

## 8. Updating the site later

```bash
cd /opt/urbancairn
git pull
docker compose build && docker compose up -d
docker image prune -f
```

Because `verify-prerender.mjs` runs inside the build, a failed prerender fails
`docker compose build` and **leaves the old container running**. You cannot
accidentally replace a good site with empty shells.

---

## 9. Troubleshooting

**`npm ci` fails: "can only install packages when your package.json and
package-lock.json are in sync"**
The §0 lockfile fix is not in your clone. `npm install --package-lock-only`,
commit, redeploy.

**Build fails at `verify-prerender.mjs`, "routes shipped as empty shells"**
Headless Chrome did not run in the build stage — almost always memory. Check
`free -m` during the build, add swap, or build elsewhere. This failure is the
script doing its job; shipping would have been worse.

**Build killed, exit code 137**
Out of memory. Add swap:

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

**Low-memory VPS — build elsewhere**
On any machine with Docker and 2GB+ free:

```bash
docker compose build
docker save urbancairn-web:latest | gzip > urbancairn-web.tar.gz
scp urbancairn-web.tar.gz you@your-vps:/opt/urbancairn/
```

On the VPS:

```bash
gunzip -c urbancairn-web.tar.gz | docker load
docker compose up -d --no-build
```

**Traefik: 404 page not found**
The router did not attach. Check the network name matches on both the service
and the `networks:` block, and that `traefik.enable=true` is present:

```bash
docker network inspect <your-network> | grep -i urbancairn
```

**502 Bad Gateway**
Container not reachable.

```bash
docker compose ps                          # healthy?
curl -sI http://127.0.0.1:8087/ | head -1  # 200?
```

**Deep links 404 but the homepage works**
The prerendered route folders did not ship:

```bash
docker compose exec urbancairn-web ls /usr/share/nginx/html/in/anand/
```

**Certbot fails validation (Option B only)**
Port 80 must be publicly reachable and DNS must already resolve to the VPS.

---

## 10. Rollback

Nothing here touches your other projects — no shared volumes, no public host
ports, and no changes to Traefik itself beyond one container's labels.

```bash
cd /opt/urbancairn && docker compose down
```

To go back to GitHub Pages: restore the four GitHub Pages `A` records, remove
the VPS `A` record, and re-enable Pages in repo settings. With TTL at 300 that
takes about 5 minutes — which is exactly why §6b says to lower the TTL first.

---

## Unrelated, but worth acting on

Your design spec flags this under "Known issue raised separately":

> `README-LAB.md` in the VPS lab folder contains a live dashboard password in
> plain text for a publicly reachable HTTPS host.

That is outside this deployment, but you will be on that VPS while following
this guide — a good moment to rotate it.
