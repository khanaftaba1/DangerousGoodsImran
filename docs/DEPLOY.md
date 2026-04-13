# Free hosting (Vercel + Render)

Monorepo: deploy **frontend** and **backend** as **two services**. Supabase stays on [supabase.com](https://supabase.com) (free tier).

## 1. Backend — Render (free web service)

1. [render.com](https://render.com) → New **Web Service** → connect this GitHub repo.
2. **Root directory:** `backend`
3. **Build command:** `npm install && npm run build`
4. **Start command:** `npm start`
5. **Environment** (from `backend/.env.example`, use real values):

   | Key | Notes |
   |-----|--------|
   | `PORT` | Usually set automatically by Render (your app uses `process.env.PORT \|\| 5000`). |
   | `FRONTEND_URL` | Your Vercel URL, e.g. `https://your-app.vercel.app` (set after frontend deploy). |
   | `SUPABASE_URL` | Project URL |
   | `SUPABASE_ANON_KEY` | Anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | Service role (server only) |

6. Copy the service URL, e.g. `https://dangerous-goods-api.onrender.com`.

## 2. Frontend — Vercel (free)

1. [vercel.com](https://vercel.com) → Import repo.
2. **Root directory:** `frontend`
3. **Framework:** Next.js (auto-detected).
4. **Environment variables:**

   | Key | Value |
   |-----|--------|
   | `NEXT_PUBLIC_API_URL` | `https://YOUR-RENDER-BACKEND.onrender.com/api` |
   | `NEXT_PUBLIC_SUPABASE_URL` | Same as your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same anon key |

5. Deploy, then set **`FRONTEND_URL`** on Render to the **production Vercel URL** and redeploy the backend so CORS and OAuth use the correct origin.

## 3. OAuth redirects (Supabase)

In **Authentication → URL configuration**:

- **Site URL:** `https://YOUR-VERCEL-APP.vercel.app`
- **Redirect URLs:** include `https://YOUR-VERCEL-APP.vercel.app/auth/callback` and `http://localhost:3000/auth/callback` for local dev.

Provider (Google / LinkedIn) settings in Supabase use Supabase’s callback URLs as documented for each provider.

## 4. Cold starts (Render free)

The API may sleep when idle; the first request after sleep can take ~30–60s.
