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
| `/terms` | Terms & Conditions |
| `/privacy` | Privacy Policy |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Backend

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
| `NEXT_PUBLIC_API_URL` | Backend API URL (client-side) |
| `API_URL` | Backend API URL (server-side) |

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `FRONTEND_URL` | Frontend origin for CORS |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |

## License

This project is for educational and portfolio purposes.
