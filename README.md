# Undangan Digital SaaS

Platform undangan digital multi-tenant (wedding, birthday, engagement). Lihat [`PRD.md`](./PRD.md) untuk product spec, [`ENGINEERING.md`](./ENGINEERING.md) untuk aturan teknis, [`TASKS.md`](./TASKS.md) untuk breakdown pengerjaan per fase.

## Tech stack

Next.js (App Router) + TypeScript, Tailwind CSS + shadcn/ui, TanStack Query, React Hook Form + Zod, Supabase (Postgres + Auth + Storage). Detail lengkap di `PRD.md` section 3.

## Menjalankan lokal

```bash
pnpm install
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Environment variables

Salin `.env.example` ke `.env.local`, isi dengan credential Supabase project kamu:

```bash
cp .env.example .env.local
```

| Variable | Keterangan |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL project Supabase (Settings > API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon/public key, aman untuk client |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key, server-only, JANGAN pernah pakai prefix `NEXT_PUBLIC_` |

## Database

Schema & migration ada di `supabase/migrations/`. Jalankan lewat Supabase CLI atau paste manual ke SQL editor di dashboard Supabase project kamu. Detail schema di `PRD.md` section 7.

## Scripts

```bash
pnpm dev         # dev server
pnpm build       # production build
pnpm typecheck   # cek TypeScript tanpa emit
pnpm lint        # ESLint
pnpm test        # Vitest
```
