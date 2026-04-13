# DG-Online — Dangerous Goods Training Platform

A full-stack clone of [dangerousgoods.online](https://dangerousgoods.online), built as a monorepo with a Next.js frontend and Express.js backend powered by Supabase.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (App Router), React, TypeScript, Tailwind CSS |
| Backend | Express.js, TypeScript, Supabase (PostgreSQL + Auth) |
| Auth | Supabase Auth, JWT via httpOnly cookies |
| Styling | Tailwind CSS v4, Titillium Web font |

## Project Structure

```
├── frontend/          Next.js application
│   ├── src/
│   │   ├── app/       Pages & routes (App Router)
│   │   ├── components/  Reusable UI & layout components
│   │   └── lib/       Data, types, constants, API client
│   └── public/        Static assets (images, favicon)
│
├── backend/           Express.js API server
│   └── src/
│       ├── config/    Supabase client setup
│       ├── middleware/ Auth middleware
│       └── server.ts  Entry point
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, courses, pricing, FAQ, trainer |
| `/courses` | Course listing with search |
| `/course/:slug` | Course detail (9 courses, 2 layout variants) |
| `/pricing` | Support plans, learning programs, FAQ |
| `/program/:slug` | Program detail (3 programs) |
| `/contact-us` | Contact form |
| `/account` | Signed-in user profile (Part 7) |
| `/auth/callback` | Supabase OAuth return — server exchanges `code` (PKCE in cookies); then `/auth/complete` syncs session |
| `/terms` | Terms & Conditions |
| `/privacy` | Privacy Policy |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Run frontend + backend together (recommended)

From the **repository root**:

```bash
npm install
npm run dev
```

This starts the API on port **5000** and Next.js on **3000**. On Linux it frees stale listeners on those ports first. Open [http://localhost:3000](http://localhost:3000).

### Frontend only

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Course, program, and pricing data are loaded from the API; run the backend or point `API_URL` at a reachable server, or those sections will be empty until the API responds.

### Backend only

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API runs on [http://localhost:5000](http://localhost:5000).

## Environment Variables

### Frontend (`frontend/.env.local`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base including `/api` (e.g. `http://127.0.0.1:5000/api`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (OAuth PKCE in the browser) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `API_URL` | Same as above for server-side fetches (catalog) if different from default |

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `FRONTEND_URL` | Frontend origin for CORS and OAuth `redirectTo` |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Anon key — used for password/OAuth/refresh on the server |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role — database access and token verification |

### Supabase Auth (Part 7)

In the Supabase dashboard: **Authentication → URL configuration** — set **Site URL** to `http://localhost:3000` and add **Redirect URLs** `http://localhost:3000/auth/callback`. Enable **Google** and **LinkedIn (OIDC)** providers under **Authentication → Providers** (configure client IDs/secrets there).

## Deployment (free tier)

See **[docs/DEPLOY.md](docs/DEPLOY.md)** for Vercel (frontend) + Render (backend) + Supabase env and OAuth URLs.

## License

This project is for educational and portfolio purposes.
