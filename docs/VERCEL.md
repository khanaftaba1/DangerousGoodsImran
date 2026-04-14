# Deploy the frontend on Vercel

The Next.js app lives in **`frontend/`**. Point Vercel at that folder so installs and builds run in the right place.

## 1. Import the repo

1. Go to [vercel.com](https://vercel.com) → **Add New…** → **Project** → import **`DangerousGoodsImran`** (or your fork).
2. **Configure Project:**
   - **Root Directory:** set to **`frontend`** (click “Edit” next to the repo name).
   - **Framework Preset:** must be **Next.js** — **not “Other”.**  
     If it says **Other**, Vercel uses the wrong output (`public` / `.`) and every route returns **`404 NOT_FOUND`**.  
     Fix: **Settings → Build and Deployment → Framework Preset** → choose **Next.js** → Save → Redeploy.
   - Build command: `npm run build` (default once Next.js is selected).
   - Do **not** set a custom Output Directory for Next.js; the Next builder handles it.

## 2. Environment variables

Add these in **Project → Settings → Environment Variables** (apply to **Production** and **Preview** as needed):

| Name | Example | Purpose |
|------|---------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Supabase anon key |
| `NEXT_PUBLIC_API_URL` | `https://your-backend.onrender.com/api` | Browser calls to Express API (auth, catalog when client-side) |
| `API_URL` | Same as `NEXT_PUBLIC_API_URL` | **Required for SSR:** server components fetch courses/programs from Express (`src/lib/server-api.ts`). Without it, Vercel still tries localhost and catalog can be empty. |

Optional:

- `NEXT_PUBLIC_SHOW_CATALOG_SOURCE=1` — debug badge for catalog source.

### Critical: `NEXT_PUBLIC_*` is baked in at **build** time

Next.js replaces `process.env.NEXT_PUBLIC_API_URL` in the **client JavaScript when `next build` runs**. If you add or change `NEXT_PUBLIC_API_URL` in the Vercel dashboard **after** a deployment, the **browser can keep calling the old URL** (e.g. `http://localhost:5000`) until you **redeploy** (Deployments → **Redeploy**, ideally **clear cache**).

Changing **`API_URL`** alone does **not** update the client bundle — only **`NEXT_PUBLIC_API_URL`** does, and only after a **new build**.

Redeploy after changing any `NEXT_PUBLIC_*` variable.

## 3. Supabase OAuth

In **Supabase → Authentication → URL configuration**, add your Vercel URL:

- **Site URL:** `https://your-project.vercel.app` (or your custom domain).
- **Redirect URLs:** include  
  `https://your-project.vercel.app/auth/callback`

Keep **Google / LinkedIn** provider settings as in the Supabase docs (provider dashboards use Supabase’s callback URLs, not your app URL).

## 4. Backend CORS (when the API is deployed)

Set the Express **`FRONTEND_URL`** env var to your Vercel URL (e.g. `https://your-project.vercel.app`) so cookies and OAuth redirects match.

If the API is **not** deployed yet, the marketing site can still load; authenticated flows and API-dependent sections need a reachable **`NEXT_PUBLIC_API_URL`** / **`API_URL`**.

## 5. Monorepo note

`package-lock.json` may exist at the repo root. Vercel with **Root Directory = `frontend`** uses **`frontend/package.json`** and installs dependencies inside `frontend/` — that is correct.

The repo includes **`frontend/vercel.json`** so Vercel detects **Next.js** even when configuring the project.

---

## Troubleshooting: `404 NOT_FOUND` (Vercel)

1. **Framework Preset is “Other” (most common)**  
   In **Settings → Build and Deployment**, if **Framework Preset** is **Other**, change it to **Next.js** and redeploy.  
   **Other** + Root Directory `frontend` still deploys a non-Next output and breaks all routes.

2. **Set Root Directory to `frontend`**
   - Vercel → **Project → Settings → General**
   - **Root Directory** → **Edit** → set to **`frontend`** (not `.` or empty).
   - **Save**, then **Deployments → … → Redeploy** (use “Clear cache and redeploy” if available).

3. **Confirm the build log**
   - Open the latest deployment → **Building** log.
   - You should see **`next build`** and output like **“Route (app)”** listing your routes.
   - If you see only the **monorepo root** `package.json` (e.g. only `concurrently`), the root directory is wrong.

4. **URL**
   - Open the **`.vercel.app`** hostname shown on the deployment **Overview** (e.g. `project-name-xxx.vercel.app`), not an old/deleted preview URL.

5. **Node version** (if build fails or behaves oddly)
   - **Settings → Environment Variables** → add `NODE_VERSION` = `20` (or `22`).

6. **Still stuck**
   - Remove the project in Vercel and **Import** the repo again, explicitly choosing **`frontend`** as the root directory when the wizard asks.
