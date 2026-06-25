# Deploying to Render

This website is a **Vite + React single-page app (SPA)** — it has no backend
of its own. You asked to publish it on Render **as a Web Service**, so this
guide covers that path (Option B). A simpler Static Site path is also included
(Option A) in case you want it later.

The repository already contains everything you need:

- `server.js` — a tiny, zero-dependency Node server that serves the built
  `dist/` folder, binds to `0.0.0.0:$PORT` (required by Render), and falls back
  to `index.html` for client-side routes.
- `render.yaml` — a Render Blueprint that configures the Web Service
  automatically.
- `npm`/`pnpm` scripts: `build` (produces `dist/`) and `start` (runs the server).

---

## Option B — Deploy as a Web Service (what you asked for)

### Fastest way: Blueprint (uses `render.yaml`)

1. Push this repo to GitHub (already done: `asim-vokshi/webii`).
2. In Render, click **New +** → **Blueprint**.
3. Connect/select the **`asim-vokshi/webii`** repository.
4. Render reads `render.yaml` and pre-fills everything. Click **Apply**.
5. Wait for the first build/deploy to finish. Your site will be live at
   `https://asim-vokshi-website.onrender.com` (or the name you chose).

### Manual way: create the Web Service yourself

In Render, click **New +** → **Web Service**, connect the repo, then use these
**exact settings**:

| Setting | Value |
| --- | --- |
| **Repository** | `asim-vokshi/webii` |
| **Branch** | `main` |
| **Root Directory** | *(leave blank — the project is at the repo root)* |
| **Language / Runtime** | `Node` |
| **Region** | `Frankfurt (EU Central)` *(closest to Albania; optional)* |
| **Instance Type** | `Free` (or a paid tier to avoid cold starts) |
| **Build Command** | `corepack enable && pnpm install --frozen-lockfile && pnpm run build` |
| **Start Command** | `pnpm run start` |
| **Health Check Path** | `/` |
| **Auto-Deploy** | `Yes` (deploys on every push to `main`) |

#### Environment Variables

| Key | Value | Why |
| --- | --- | --- |
| `NODE_VERSION` | `22.13.0` | Pin the Node version used to build/run. |

> You do **not** need to set `PORT`. Render injects `PORT` automatically and
> `server.js` reads it. Do not hard-code a port.

#### Prefer npm instead of pnpm?

This project is configured for **pnpm** (see `pnpm-lock.yaml`). If you would
rather use npm, use these commands instead and delete `pnpm-lock.yaml`:

- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run start`

---

## Option A — Deploy as a Static Site (simpler & recommended for an SPA)

Because the site is fully static after build, a Render **Static Site** is the
cheapest and fastest option (served from a global CDN, free TLS).

In Render, click **New +** → **Static Site**, connect the repo, then:

| Setting | Value |
| --- | --- |
| **Branch** | `main` |
| **Build Command** | `corepack enable && pnpm install --frozen-lockfile && pnpm run build` |
| **Publish Directory** | `dist` |

**Add a rewrite rule** so client-side routes work (e.g. `/stafi`, `/lajme`):

- Go to the service → **Redirects/Rewrites** → **Add Rule**
  - **Source:** `/*`
  - **Destination:** `/index.html`
  - **Action:** `Rewrite`

That's it — no `server.js` needed for this option.

---

## Custom domain (optional)

After the service is live:

1. Open the service → **Settings** → **Custom Domains** → **Add Custom Domain**.
2. Enter your domain (e.g. `www.shavokshi.edu.al`).
3. Add the CNAME / A records Render shows you at your DNS provider.
4. Render provisions a free TLS certificate automatically.

---

## Notes

- **Cold starts:** On the Free plan, a Web Service spins down after inactivity
  and the first request afterward is slow (~30–60s). The Static Site option
  (Option A) does not have this issue. Upgrade to a paid instance to avoid it
  for the Web Service.
- **SPA routing** is handled by `server.js` (Option B) or the rewrite rule
  (Option A); both serve `index.html` for unknown paths so deep links work.
- **Build output** goes to `dist/` and is git-ignored (Render builds it fresh).
