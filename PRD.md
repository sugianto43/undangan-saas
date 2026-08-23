# PRD — Undangan Digital SaaS (MVP)

Status: Draft v1
Owner: (isi nama PM/lead)
Last updated: 2026-08-23

---

## 1. Ringkasan

Platform SaaS multi-tenant untuk membuat undangan digital online (nikahan, ulang tahun, tunangan, dll). User mendaftar, memilih tema, mengisi data acara, lalu mempublikasikan undangan sebagai halaman publik dengan link unik. Tamu membuka link, melihat detail acara, mengisi RSVP, dan menulis ucapan.

**Value proposition:** "Bikin undangan digital sendiri, live dalam 5 menit, gratis."

**MVP goal:** Validasi demand dengan flow end-to-end lengkap tanpa payment. Semua gratis di fase ini.

---

## 2. Target pengguna

- **Pemilik undangan (host)**: non-teknis, butuh cepat, akses dari HP/desktop, tidak mau ribet setup.
- **Tamu (guest)**: buka link dari WhatsApp, browser mobile, tidak perlu login.

---

## 3. Tech stack (keputusan final)

| Layer | Pilihan | Alasan |
|---|---|---|
| Frontend/SSR | Next.js (App Router) + TypeScript | SSR per slug, SEO, cepat deploy, type-safe |
| UI | Tailwind CSS + shadcn/ui | Cepat, konsisten, customizable |
| Form | React Hook Form + Zod | Form kompleks (editor undangan) + validasi type-safe |
| Server state | TanStack Query | Caching, mutation, refetch rekap RSVP/ucapan tanpa reload manual |
| Backend/DB | Supabase (Postgres) | DB relasional, free tier cukup |
| Auth | Supabase Auth (email + Google) | Gratis, terintegrasi langsung dengan DB |
| Storage | Supabase Storage | Upload foto cover & galeri, sudah termasuk CDN dasar |
| Deploy | Vercel | Native support Next.js |
| Package manager | pnpm | Cepat, gratis, siap kalau nanti jadi monorepo |

Tidak ada payment gateway di MVP. Tidak ada custom domain di MVP.

**Sengaja ditunda ke fase berikutnya** (baru dipakai kalau ada kebutuhan nyata / traffic naik): Zustand, NestJS, tRPC, Drizzle ORM, Redis, BullMQ, S3/R2, Cloudflare CDN, Clerk/Better Auth, Sentry, PostHog, Playwright, Turborepo. Jangan tambahkan salah satu dari ini tanpa keputusan eksplisit dari PM — start-nya sengaja minim biar MVP cepat validasi.

---

## 4. User flow inti

```
Host                                    Guest
----                                    -----
1. Sign up / login
2. Pilih tipe acara (wedding/birthday/engagement)
3. Pilih tema dari galeri
4. Isi form data acara + upload foto
5. Publish -> dapat slug unik
6. Bagikan link                    ->   7. Buka link (?to=Nama opsional)
                                          8. Lihat cover, countdown, info acara, galeri
                                          9. Isi RSVP (hadir/tidak + jumlah orang)
                                         10. Tulis ucapan
11. Lihat rekap RSVP & ucapan
    di dashboard
```

---

## 5. Fitur — IN scope (MVP)

### 5.1 Auth
- Sign up / login via email+password dan Google OAuth (Supabase Auth)
- Session persist, protected routes untuk dashboard

### 5.2 Dashboard host
- List undangan milik user (card: judul, tipe acara, status, tanggal acara, jumlah RSVP)
- Create undangan baru
- Edit undangan existing
- Delete undangan
- Lihat detail: rekap RSVP (jumlah hadir/tidak, total tamu) + daftar ucapan masuk

### 5.3 Editor undangan
Form input:
- Tipe acara: `wedding` | `birthday` | `engagement`
- Judul/nama tuan rumah (mis. "Budi & Ani" atau "Ulang Tahun ke-25 Ani")
- Tanggal & waktu acara
- Lokasi: teks alamat + link Google Maps (paste manual, bukan embed API)
- Deskripsi/cerita singkat (textarea, markdown-lite opsional)
- Upload cover image (1 file)
- Upload galeri foto (maks 10 file, tiap file maks 5MB, format jpg/png/webp)
- Pilih tema (dropdown dari daftar tema tersedia)
- Slug: auto-generate dari judul, editable, validasi unik

Status undangan: `draft` (belum publish) → `published` (publik bisa akses).

### 5.4 Tema
- 3–5 template visual statis untuk MVP, styling beda per tipe acara (palet warna, font)
- Tema hanya styling — struktur komponen & data sama untuk semua tema
- Tidak ada drag-drop customizer di MVP

### 5.5 Halaman publik undangan
Route: `/u/[slug]`
- Cover section dengan nama tamu dari query param `?to=Nama` (fallback: "Tamu Undangan" jika kosong)
- Countdown timer ke tanggal acara
- Info acara (tanggal, waktu, lokasi + tombol "Buka di Maps" ke link yang diisi host)
- Deskripsi/cerita acara
- Galeri foto (grid, lightbox sederhana)
- Form RSVP: nama, status hadir (hadir/tidak hadir/ragu), jumlah orang
- Form ucapan: nama + pesan, list ucapan terbaru di bawah form
- Mobile-first, load < 2 detik di koneksi 3G/4G rata-rata

### 5.6 RSVP & Ucapan
- Tamu tidak perlu login untuk submit RSVP/ucapan
- Satu submission per browser session (soft limit via localStorage, bukan hard block — MVP tidak butuh anti-spam kuat)
- Host lihat rekap real-time di dashboard (polling atau Supabase realtime — realtime nice-to-have, boleh polling on-mount dulu)

---

## 6. Fitur — OUT of scope (MVP, fase berikutnya)

Urutan prioritas untuk fase 2+:
1. Payment/billing + paket premium (unlock tema lebih banyak, custom domain)
2. Amplop digital (nomor rekening/QRIS/e-wallet)
3. Background music autoplay
4. Google Maps embed interaktif
5. Custom domain per undangan
6. Drag-drop tema customizer
7. Love story timeline builder terpisah
8. Live streaming link
9. Multi-bahasa
10. Analytics pengunjung (page view, share count)
11. Anti-spam RSVP lebih kuat (captcha/rate limit server-side)

Jangan implement item di atas kecuali diminta eksplisit — scope creep merusak timeline MVP.

---

## 7. Data model

### Tabel

```sql
-- users: dikelola otomatis oleh Supabase Auth (auth.users)

create table invitations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  slug text not null unique,
  event_type text not null check (event_type in ('wedding', 'birthday', 'engagement')),
  title text not null,
  event_date timestamptz not null,
  location_text text,
  location_link text,
  description text,
  cover_image_url text,
  theme_id text not null default 'classic',
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table invitation_photos (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references invitations(id) on delete cascade,
  url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table rsvps (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references invitations(id) on delete cascade,
  guest_name text not null,
  attending text not null check (attending in ('yes', 'no', 'maybe')),
  guest_count int not null default 1,
  created_at timestamptz not null default now()
);

create table wishes (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references invitations(id) on delete cascade,
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index idx_invitations_user_id on invitations(user_id);
create index idx_invitations_slug on invitations(slug);
create index idx_rsvps_invitation_id on rsvps(invitation_id);
create index idx_wishes_invitation_id on wishes(invitation_id);
```

### Row Level Security (wajib, isolasi tenant)
- `invitations`: user hanya bisa `select/insert/update/delete` baris milik `user_id = auth.uid()`. Public (anon) hanya boleh `select` baris dengan `status = 'published'`.
- `invitation_photos`: ikut akses induk `invitations` (via join policy).
- `rsvps`, `wishes`: anon boleh `insert` (tanpa auth) untuk invitation yang `published`; hanya owner invitation yang boleh `select`.

---

## 8. Routes (Next.js App Router)

```
/                          landing page (marketing, CTA sign up)
/login                     login/sign up
/dashboard                 list undangan milik user (protected)
/dashboard/new             form create undangan (protected)
/dashboard/[id]/edit       form edit undangan (protected)
/dashboard/[id]/responses  rekap RSVP + ucapan (protected)
/u/[slug]                  halaman publik undangan (SSR, public)
```

API (Route Handlers atau langsung Supabase client dari server component — pilih salah satu pola, jangan campur):
```
POST   /api/invitations          create
PATCH  /api/invitations/[id]     update
DELETE /api/invitations/[id]     delete
POST   /api/invitations/[id]/publish
POST   /api/rsvps                submit RSVP (public)
POST   /api/wishes               submit ucapan (public)
```

---

## 9. Folder structure yang disarankan

```
undangan-saas/
  PRD.md                      <- dokumen ini
  app/
    (marketing)/page.tsx
    login/page.tsx
    dashboard/
      page.tsx
      new/page.tsx
      [id]/edit/page.tsx
      [id]/responses/page.tsx
    u/[slug]/page.tsx
    api/
      invitations/route.ts
      invitations/[id]/route.ts
      invitations/[id]/publish/route.ts
      rsvps/route.ts
      wishes/route.ts
  components/
    ui/                        <- shadcn/ui generated components
    editor/                   <- form komponen editor undangan (RHF + Zod)
    public-invitation/        <- komponen halaman publik (cover, countdown, gallery, rsvp-form, wishes-list)
    dashboard/
    themes/                   <- styling per tema (classic, modern, minimal, dst)
    providers/
      query-provider.tsx       <- TanStack Query client provider
  lib/
    supabase/
      client.ts               <- browser client
      server.ts                <- server client
    validations/               <- zod schema per form
    queries/                   <- TanStack Query hooks (useInvitations, useInvitation, useRsvps, dst)
  types/
    invitation.ts
  supabase/
    migrations/                <- SQL migration files (schema di section 7)
```

---

## 10. Non-functional requirements

- Halaman publik `/u/[slug]` load < 2 detik (Lighthouse mobile score > 80)
- Responsive mobile-first (mayoritas trafik tamu dari HP via WhatsApp)
- Upload foto: validasi ukuran & tipe file di client sebelum upload
- Slug validasi: lowercase, alfanumerik + dash, unik, tidak boleh kosong
- Semua form pakai validasi schema (rekomendasi: zod) baik client maupun server-side
- Tidak menyimpan data sensitif tamu selain nama (tidak ada email/phone wajib di MVP)

---

## 11. Metrik keberhasilan MVP

- Host bisa selesai bikin undangan end-to-end < 10 menit
- Halaman publik load < 2 detik di mobile
- Minimal 1 undangan real dipakai untuk acara sungguhan sebagai validasi
- Zero friction pembayaran (semua gratis → fokus validasi demand dulu)

---

## 12. Milestone pengerjaan (urutan disarankan)

1. Setup project: Next.js + Tailwind + Supabase client + schema migration
2. Auth flow (login/signup, protected route middleware)
3. CRUD undangan (dashboard list, create, edit, delete) — tanpa tema dulu, styling default
4. Halaman publik `/u/[slug]` versi minimal (tanpa tema pilihan, 1 desain saja)
5. RSVP + wishes (form + simpan ke DB + tampil di halaman publik & dashboard)
6. Upload foto (cover + galeri) via Supabase Storage
7. Multi-tema (3–5 desain, styling only)
8. Countdown timer + polish UI/UX
9. QA end-to-end + performance check
10. Deploy ke Vercel + testing dengan acara nyata

Jangan lompat ke tema/polish sebelum flow inti (step 1–5) jalan end-to-end.

---

## 13. Open questions (butuh keputusan sebelum/selama development)

- Nama produk & domain?
- Batas jumlah undangan gratis per user (unlimited di MVP, atau ada limit soft)?
- Bahasa UI: Indonesia saja atau siapkan struktur i18n dari awal (rekomendasi: Indonesia saja dulu, jangan over-engineer)?
- Apakah host perlu preview undangan sebelum publish (rekomendasi: ya, wajib ada preview mode)?

---

## 14. Non-goals (tegaskan ulang)

Agen AI atau developer yang lanjutkan project ini **tidak boleh** menambahkan fitur di section 6 (Out of scope) tanpa instruksi eksplisit dari PM/owner, meskipun secara teknis mudah ditambahkan. Godaan terbesar biasanya: payment, custom domain, tema customizer. Tahan sampai MVP tervalidasi.
