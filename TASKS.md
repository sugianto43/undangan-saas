# Task Breakdown per Phase

Sumber: PRD.md section 12 (milestone) + ENGINEERING.md (aturan teknis).
Urutan wajib dari atas ke bawah — jangan lompat fase sebelum fase sebelumnya selesai & checklist ENGINEERING.md section 9 pass.

Cara pakai: jalankan slash command `/phase-N-<nama>` di Claude Code untuk masing-masing fase. Command otomatis baca PRD.md + ENGINEERING.md sebagai aturan, kerjakan task di bawah, lalu centang checklist ini.

---

## Phase 0 — Project Setup

- [x] Init Next.js (App Router) + TypeScript, `strict: true`
- [x] Setup Tailwind CSS
- [x] Setup shadcn/ui (init + tambah komponen dasar: button, input, form, card, dialog)
- [x] Install & setup TanStack Query (`QueryProvider` di `components/providers/query-provider.tsx`, wrap root layout)
- [x] Install React Hook Form + Zod
- [x] Setup Supabase project (dev), simpan credential di `.env.local`, buat `.env.example` — **`.env.example` dibuat; user perlu isi `.env.local` dengan credential Supabase project sendiri, belum ada project Supabase yang dibuat**
- [x] Buat `lib/supabase/client.ts` (browser) dan `lib/supabase/server.ts` (server-only, `import "server-only"`)
- [x] Jalankan SQL migration awal (tabel `invitations`, `invitation_photos`, `rsvps`, `wishes` — dari PRD.md section 7) + aktifkan RLS policy — **file migration `supabase/migrations/0001_init.sql` dibuat, belum dijalankan ke project Supabase nyata (belum ada project)**
- [x] Setup ESLint + Prettier + `pnpm typecheck` script
- [x] Setup Vitest dasar
- [x] Buat struktur folder sesuai PRD.md section 9
- [x] README.md project: cara run lokal, env yang dibutuhkan

## Phase 1 — Auth

- [ ] Halaman `/login`: email+password sign up/login, tombol Google OAuth (Supabase Auth)
- [ ] Middleware/protected route untuk `/dashboard/*`
- [ ] Session handling (server component baca session, redirect kalau belum login)
- [ ] Logout action
- [ ] Unit test: validasi form login (Zod schema)

## Phase 2 — CRUD Undangan (Dashboard, tanpa tema/foto dulu)

- [ ] `lib/validations/invitation.ts` — Zod schema untuk create/update invitation
- [ ] `lib/queries/keys.ts` — query key constants
- [ ] `lib/queries/useInvitations.ts`, `useInvitation.ts`, mutation hooks (create/update/delete/publish)
- [ ] API Route Handlers: `POST/PATCH/DELETE /api/invitations`, `POST /api/invitations/[id]/publish` (validasi Zod di server juga, RLS enforce ownership)
- [ ] `/dashboard` — list undangan milik user (card: judul, tipe, status, tanggal, count RSVP) pakai TanStack Query
- [ ] `/dashboard/new` — form create (RHF + Zod), slug auto-generate + editable + validasi unik
- [ ] `/dashboard/[id]/edit` — form edit, reuse komponen form dari `new`
- [ ] Delete undangan (dengan confirm dialog)
- [ ] Publish/unpublish toggle
- [ ] Unit test: Zod schema invitation, slug generator util

## Phase 3 — Halaman Publik Minimal

- [ ] `/u/[slug]` — Server Component, fetch invitation by slug (published only, RLS enforce)
- [ ] Section: cover (nama dari `?to=` query param, fallback default), info acara (tanggal, waktu, lokasi + link maps), deskripsi
- [ ] 1 desain default dulu (belum multi-tema)
- [ ] 404 page kalau slug tidak ada / belum published
- [ ] Mobile-first responsive check

## Phase 4 — RSVP & Wishes

- [ ] `lib/validations/rsvp.ts`, `lib/validations/wish.ts`
- [ ] API Route Handlers: `POST /api/rsvps`, `POST /api/wishes` (public, RLS insert-only untuk published invitation)
- [ ] Component Client `RsvpForm` di halaman publik (RHF + Zod + TanStack Query mutation)
- [ ] Component Client `WishForm` + `WishesList` (tampil ucapan terbaru)
- [ ] Soft-limit submit ganda via localStorage (bukan hard block)
- [ ] `/dashboard/[id]/responses` — rekap RSVP (jumlah hadir/tidak/ragu, total tamu) + list ucapan, pakai TanStack Query
- [ ] Unit test: Zod schema RSVP & wish

## Phase 5 — Upload Foto

- [ ] Setup Supabase Storage bucket (cover + gallery), policy akses sesuai ownership
- [ ] Upload cover image di form editor (validasi ukuran/tipe file client-side)
- [ ] Upload galeri (maks 10 file) dengan preview & reorder sederhana
- [ ] Simpan url ke `invitation_photos`
- [ ] Tampilkan galeri di halaman publik (grid + lightbox sederhana), pakai `next/image`
- [ ] Lazy-load galeri di bawah fold

## Phase 6 — Multi-tema

- [ ] Definisikan struktur tema di `components/themes/` (classic, modern, minimal — 3 dulu)
- [ ] Tema hanya styling (warna, font) — struktur komponen sama
- [ ] Dropdown pilih tema di form editor, preview mini per tema
- [ ] Terapkan `theme_id` ke rendering halaman publik

## Phase 7 — Countdown + Polish UI/UX

- [ ] Countdown timer component (client, update tiap detik/menit)
- [ ] Preview mode untuk host sebelum publish
- [ ] Polish spacing/typography semua halaman (dashboard + publik)
- [ ] Empty states (belum ada undangan, belum ada RSVP, belum ada ucapan)
- [ ] Loading & error states konsisten (skeleton, toast error)

## Phase 8 — QA End-to-End

- [ ] Jalankan checklist ENGINEERING.md section 9 penuh
- [ ] Manual test: full flow host (create → publish → lihat link) + full flow guest (buka link → RSVP → ucapan)
- [ ] Lighthouse mobile score `/u/[slug]` > 80
- [ ] Cross-browser check dasar (Chrome, Safari mobile)
- [ ] Cek RLS: user A tidak bisa akses/edit undangan user B

## Phase 9 — Deploy

- [ ] Setup Supabase project production (terpisah dari dev)
- [ ] Setup env variables di Vercel (production + preview)
- [ ] Deploy ke Vercel, custom Vercel domain/subdomain
- [ ] Smoke test di production URL
- [ ] Buat 1 undangan nyata untuk validasi end-to-end dengan acara sungguhan

---

## Aturan tambahan tiap fase (berlaku semua)

- Baca ulang PRD.md section 6 (Out of scope) sebelum mulai — jangan implement fitur di luar scope tanpa diminta.
- Ikuti ENGINEERING.md penuh (TypeScript strict, no `any`, server/client separation, RLS wajib, dst).
- Tiap fase selesai = checklist ENGINEERING.md section 9 pass sebelum lanjut fase berikut.
- Commit per task/PR kecil, bukan satu commit raksasa per fase.
