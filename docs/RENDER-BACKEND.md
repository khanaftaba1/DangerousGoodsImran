# Deploy the Express backend (Render — free)

**Use Render (or Railway/Fly.io), not Vercel**, for this repo’s **Express** app. Vercel is built for **Next.js** and serverless functions; a normal `app.listen()` API needs a **Node Web Service** that stays running.

## 1. Create a Web Service on Render

1. [dashboard.render.com](https://dashboard.render.com) → **New +** → **Web Service**.
2. Connect **GitHub** → repo **`DangerousGoodsImran`** → branch **`master`**.
3. Configure:
   | Field | Value |
   |-------|--------|
   | **Name** | e.g. `dangerous-goods-api` (becomes part of the URL) |
   | **Root Directory** | **`backend`** |
   | **Runtime** | **Node** |
   | **Build Command** | `npm install && npm run build` |
   | **Start Command** | `npm start` |
   | **Instance type** | **Free** |

4. **Create Web Service**.

## 2. Environment variables

In **Environment** (same page or **Environment** tab), add:

| Key | Value |
|-----|--------|
| `NODE_VERSION` | `20` or `22` (recommended; matches local) |
| `FRONTEND_URL` | Your **Vercel** origin(s), **comma-separated** if you use both production and preview URLs, e.g. `https://your-app.vercel.app,https://your-app-git-main-xxx.vercel.app` — **required for CORS**. No trailing slashes. OAuth redirect uses the **first** URL only. |
| `SUPABASE_URL` | From Supabase project settings |
| `SUPABASE_ANON_KEY` | Anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role (server only, never expose to browser) |
| `STRIPE_SECRET_KEY` | Optional until Part 8; use a test key or placeholder |
| `STRIPE_WEBHOOK_SECRET` | Optional until webhooks |

**Do not set `PORT` manually** — Render injects `PORT`; the app already uses `process.env.PORT || 5000`.

Save → Render will redeploy.

## 3. API URL

After deploy, your API base is:

`https://<service-name>.onrender.com`

Health check: **`GET https://<service-name>.onrender.com/api/health`** → `{ "success": true, ... }`.

Full API prefix: **`https://<service-name>.onrender.com/api`**.

## 4. Point Vercel at the API

In **Vercel** → project → **Settings → Environment Variables**:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_API_URL` | `https://<service-name>.onrender.com/api` |
| `API_URL` | Same value (for **SSR** catalog in Next.js) |

Redeploy the **frontend** so both take effect.

## 5. Supabase OAuth

**Authentication → URL configuration** already has your Vercel callback. No change required for Render unless you add a **new** frontend URL.

## 6. Free tier behavior

- The service **spins down** after ~15 minutes idle; the **first request** after sleep can take **30–60 seconds**.
- Fine for demos; upgrade on Render if you need always-on.

## 7. Preview deployments (optional)

Vercel **preview** URLs (e.g. `*.vercel.app` per branch) are **not** in `FRONTEND_URL` by default, so the browser may hit **CORS errors** when calling the API. For previews, either temporarily add that preview URL to **`FRONTEND_URL`** on Render (comma-separated list would require a small code change — today `FRONTEND_URL` is a single URL) or test only **production** frontend against the API.
