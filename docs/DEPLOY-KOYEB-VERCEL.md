# Deploy DG-Online: Koyeb (API) + Vercel (frontend)

This monorepo has two deployable apps:

| App | Platform | Folder | Purpose |
|-----|----------|--------|---------|
| **Express API** | **Koyeb** | `backend/` | REST API, auth cookies, Supabase service role |
| **Next.js** | **Vercel** | `frontend/` | Website, OAuth callback, browser → API calls |

**Database & auth** stay on [Supabase](https://supabase.com) (no change).

---

## Prerequisites

- GitHub repo pushed (this project).
- Supabase project with `schema-and-seed.sql` (or equivalent) applied.
- Local `.env` values handy for **non-secret** mapping (you will paste production values in dashboards—never commit real secrets).

---

## Part A — Backend on Koyeb

### A1. Create the web service

1. Sign in at [Koyeb](https://www.koyeb.com/).
2. **Create App** → **GitHub** → select this repository.
3. Add a **Web Service** (or “Service” with public HTTP).

### A2. Monorepo: use the `backend` directory

In the service **Build & deploy** settings:

- **Root directory:** `backend`  
  (so install/build/run run inside `backend/`, not the repo root.)

### A3. Build and run commands

| Setting | Value |
|--------|--------|
| **Build command** | `npm install && npm run build` |
| **Run command** | `npm start` |

`npm run build` runs `tsc` and outputs to `dist/`. `npm start` runs `node dist/server.js`.

### A4. Port

The app uses `process.env.PORT || 5000`. Koyeb injects **`PORT`** — leave it; do **not** hardcode `5000` in Koyeb’s port field if the UI asks: choose **HTTP** on the port your process listens on (usually the same as `PORT`).

### A5. Environment variables (Koyeb)

Add these in the service **Variables** tab:

| Name | Value / notes |
|------|----------------|
| `FRONTEND_URL` | **Temporary:** `http://localhost:3000` or your Vercel URL once it exists (see Part B). **Must** match the browser origin users use (scheme + host, no trailing slash). Update after Vercel deploy and **redeploy** the API. |
| `SUPABASE_URL` | Project URL from Supabase **Settings → API**. |
| `SUPABASE_ANON_KEY` | `anon` **public** key. |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` key — **server only**, never in Vercel `NEXT_PUBLIC_*`. |

Optional (only if you use Stripe later):

| Name | Value |
|------|--------|
| `STRIPE_SECRET_KEY` | `sk_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` |

### A6. Deploy and copy the public URL

After the first successful deploy, Koyeb gives a URL like:

`https://<your-service>-<org>.koyeb.app`

Your API base for the browser is:

`https://<your-service>-<org>.koyeb.app/api`

**Health check:** open `https://<...>/api/health` — you should see JSON with `status: "ok"`.

---

## Part B — Frontend on Vercel

### B1. Import the project

1. [Vercel](https://vercel.com) → **Add New** → **Project** → import the **same** GitHub repo.

### B2. Root directory

- **Root Directory:** `frontend`  
- Framework: **Next.js** (auto-detected).

### B3. Environment variables (Vercel)

In **Settings → Environment Variables** (Production + Preview as needed):

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Same as `SUPABASE_URL` in Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same anon key as in the frontend `.env.local`. |
| `NEXT_PUBLIC_API_URL` | `https://<your-koyeb-host>/api` (no trailing slash before `/api`; use exact Koyeb URL). |

**Server-side rendering** (course/program/pricing pages that fetch the API during `next build` / request) uses `API_URL` in `server-api.ts`. Set:

| Name | Value |
|------|--------|
| `API_URL` | Same as `NEXT_PUBLIC_API_URL`: `https://<your-koyeb-host>/api` |

If `API_URL` is missing on Vercel, SSR may fall back to localhost defaults and catalog pages can be empty in production.

Optional:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SHOW_CATALOG_SOURCE` | `1` — shows dev hint when data source is API vs unavailable. |

### B4. Deploy

Trigger deploy. Note the production URL, e.g. `https://dg-online.vercel.app`.

---

## Part C — Wire everything together

### C1. Update Koyeb `FRONTEND_URL`

1. Koyeb → your API service → **Variables**.
2. Set `FRONTEND_URL` to your **Vercel** URL, e.g. `https://your-project.vercel.app` (no path).
3. **Redeploy** the API so CORS allows the Vercel origin.

The backend uses `FRONTEND_URL` for CORS and (for server-side OAuth URL helper) redirect configuration.

### C2. Supabase Authentication URLs

In Supabase: **Authentication → URL configuration**

1. **Site URL:** your Vercel URL, e.g. `https://your-project.vercel.app`
2. **Redirect URLs** — add:
   - `https://your-project.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (optional, for local dev)

Save.

### C3. Google / LinkedIn providers

In **Authentication → Providers**, keep redirect URIs as **Supabase’s** OAuth callback URLs (per provider docs). Your app only uses `redirectTo` = `https://your-app.vercel.app/auth/callback` in the browser; Supabase handles the provider round-trip.

---

## Part D — Checklist

- [ ] `GET https://<koyeb>/api/health` returns OK.
- [ ] Vercel site loads; home/courses show data (not empty), or check `API_URL` if lists are empty.
- [ ] Sign in with email or Google works; redirect returns to `/auth/callback` then home.
- [ ] `FRONTEND_URL` on Koyeb equals the exact Vercel origin you use in the browser.

---

## Troubleshooting

| Symptom | What to check |
|--------|----------------|
| CORS errors in browser | `FRONTEND_URL` on Koyeb matches Vercel URL; redeploy API after changing it. |
| OAuth redirect mismatch | Supabase **Redirect URLs** include `https://.../auth/callback`. |
| Catalog empty on Vercel | Set `API_URL` and `NEXT_PUBLIC_API_URL` to Koyeb `/api`; redeploy frontend. |
| API 404 | Koyeb **root directory** is `backend`; health path is `/api/health`. |

---

## Cost note

Koyeb and Vercel free tiers have limits (sleep/cold start, build minutes). For production traffic or always-on API, review each platform’s paid tiers.
