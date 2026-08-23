# Engineering Guidelines — Undangan Digital SaaS

Status: v1
Berlaku untuk semua kontributor (human atau AI agent) di project ini.

Tujuan dokumen ini: standar teknis ala perusahaan besar (code quality, review, testing, git hygiene) tapi tetap proporsional untuk tim kecil/MVP — bukan ritual berat yang bikin lambat.

---

## 1. Prinsip umum

1. **Readability > cleverness.** Kode dibaca lebih sering daripada ditulis. Kalau harus pilih antara solusi pintar-tapi-ribet vs solusi jelas-tapi-panjang, pilih yang jelas.
2. **Small diffs.** Satu PR = satu concern. Jangan campur refactor + fitur baru + fix bug dalam satu PR.
3. **No dead code.** Hapus kode yang tidak dipakai, jangan komentari-lalu-tinggalkan. Git history sudah jadi arsip.
4. **YAGNI, tapi bukan alasan sembarangan.** Ikuti scope PRD (section 6: Out of scope). Jangan tambah abstraksi untuk kebutuhan hipotetis.
5. **Boring technology.** Pakai stack yang sudah diputuskan di PRD.md section 3. Jangan ganti library tanpa diskusi & alasan tertulis.

---

## 2. TypeScript

- `strict: true` di `tsconfig.json`. Tidak ada pengecualian.
- **Dilarang** `any` eksplisit. Kalau tipe benar-benar tidak diketahui, pakai `unknown` + narrow.
- Semua data dari luar (API response, form input, Supabase query result) divalidasi via Zod schema sebelum dipakai — jangan percaya tipe dari `as`.
- Tipe domain (invitation, rsvp, wish) didefinisikan sekali di `types/`, di-infer dari Zod schema (`z.infer<typeof schema>`), bukan didefinisikan dobel manual.
- Tidak ada `// @ts-ignore` tanpa komentar alasan + link issue/PR.

---

## 3. Struktur kode & konvensi

- Komponen React: PascalCase file & nama (`RsvpForm.tsx`).
- Hook custom: `useXxx.ts`, taruh di `lib/queries/` (TanStack Query hooks) atau `lib/hooks/` (non-query hooks).
- Server-only logic (Supabase server client, secret key) **tidak boleh** diimpor ke client component. Pisahkan tegas `lib/supabase/client.ts` (browser) vs `server.ts` (server-only, pakai `import "server-only"`).
- Komponen halaman publik (`/u/[slug]`) default Server Component. Interaktivitas (form RSVP, lightbox galeri) jadi Client Component terpisah, di-import ke dalamnya — jangan jadikan seluruh halaman `"use client"`.
- Tidak ada business logic di dalam JSX/komponen. Query/mutation logic di `lib/queries/`, validasi di `lib/validations/`, komponen fokus render + event handling saja.
- Barrel file (`index.ts` re-export) hanya di level folder publik (`components/ui/index.ts`), jangan di semua folder — bikin circular import risk.

---

## 4. State management

- **Server state** (data dari Supabase: invitations, rsvps, wishes) → TanStack Query. Jangan duplikasi ke local state/context.
- **Client-only UI state** (modal terbuka, step form aktif, tab aktif) → `useState`/`useReducer` lokal. Zustand baru dipakai kalau ada state yang genuinely global lintas banyak komponen tak bertetangga (belum ada kasusnya di MVP — jangan pasang preventif).
- Query key TanStack Query konsisten: `['invitations']`, `['invitation', id]`, `['rsvps', invitationId]`, `['wishes', invitationId]` — didefinisikan sebagai konstanta di `lib/queries/keys.ts`, jangan hardcode string berulang di banyak file.

---

## 5. Form & validasi

- Semua form pakai React Hook Form + `zodResolver`.
- Zod schema untuk satu entity didefinisikan sekali, dipakai ulang untuk client validation DAN server validation di Route Handler (single source of truth, jangan tulis validasi dua kali beda tempat).
- Pesan error validasi dalam Bahasa Indonesia (user-facing), sesuai target user.

---

## 6. Data & Supabase

- Semua akses tabel wajib lewat Row Level Security policy (lihat PRD.md section 7). Tidak ada tabel tanpa RLS aktif, termasuk saat development.
- Query Supabase kompleks (join, filter berlapis) dibungkus fungsi bernama di `lib/supabase/queries/`, bukan ditulis inline di komponen/route handler.
- Migration SQL selalu file baru bernomor urut di `supabase/migrations/`, tidak pernah edit migration lama yang sudah di-apply ke environment manapun.
- Tidak ada service role key di client bundle. Cek `NEXT_PUBLIC_` prefix sebelum commit — hanya anon key yang boleh public.

---

## 7. Testing

Level testing proporsional untuk MVP, prioritas pada bagian paling kritikal:

- **Unit test (Vitest)**: wajib untuk semua Zod schema validasi dan fungsi util murni (slug generator, date formatter, dsb).
- **Component test**: opsional di MVP, tambahkan untuk komponen dengan logic kompleks (RSVP form dengan conditional field).
- **E2E**: ditunda ke fase setelah MVP stabil (lihat PRD.md — Playwright masuk daftar "ditunda"). Sebagai gantinya, checklist manual QA wajib dijalankan sebelum tiap deploy ke production (lihat section 9).
- Test file bersebelahan dengan source (`RsvpForm.test.tsx` di folder yang sama), bukan folder `__tests__` terpisah jauh.

---

## 8. Git & PR workflow

- Branch naming: `feat/<ringkas>`, `fix/<ringkas>`, `chore/<ringkas>`, `refactor/<ringkas>`.
- Commit message ikut [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`.
- Tidak ada commit langsung ke `main`. Semua lewat PR, minimal 1 review (kalau solo dev: self-review pakai checklist section 9 sebelum merge).
- PR description wajib: apa yang berubah, kenapa, cara test manual.
- Squash merge ke `main` — history `main` tetap linear & bersih.
- `main` selalu deployable. Fitur belum selesai disembunyikan lewat feature flag sederhana (env var / config), bukan branch menggantung lama.

---

## 9. Checklist sebelum merge/deploy

- [ ] `pnpm typecheck` pass (zero TS error)
- [ ] `pnpm lint` pass
- [ ] Test unit relevan pass
- [ ] Manual test flow yang diubah (host flow atau guest flow) di localhost
- [ ] Cek responsive mobile (halaman publik terutama — mayoritas trafik dari HP)
- [ ] Tidak ada `console.log` tertinggal
- [ ] Tidak ada secret/API key hardcoded
- [ ] RLS policy dites kalau ada perubahan tabel/akses data

---

## 10. Environment & config

- Semua secret via `.env.local` (gitignored). `.env.example` selalu up to date sebagai referensi variable yang dibutuhkan.
- Environment terpisah: `development` (local + Supabase project dev), `production` (Supabase project prod + Vercel prod). Jangan share satu Supabase project untuk dev dan prod.
- Feature flag sederhana lewat env var (`NEXT_PUBLIC_FEATURE_X=true`) untuk fitur yang di-deploy tapi belum di-release penuh.

---

## 11. Performance baseline

- Image selalu lewat `next/image`, tidak ada `<img>` mentah untuk foto galeri/cover.
- Lazy-load galeri foto di bawah fold.
- Lighthouse mobile score `/u/[slug]` harus > 80 sebelum dianggap "done" untuk fitur halaman publik manapun.
- Query Supabase select kolom spesifik, jangan `select('*')` di path yang sering diakses (halaman publik).

---

## 12. Yang sengaja TIDAK diberlakukan di MVP

Supaya jelas batasnya — ini bukan kelalaian, ini keputusan sadar sesuai skala project:

- Tidak ada monorepo/Turborepo (masih 1 app)
- Tidak ada CI/CD pipeline penuh dengan multi-stage deploy (cukup Vercel auto-deploy dari `main` + preview per PR)
- Tidak ada load testing / performance budget otomatis
- Tidak ada design system formal (token库) — cukup Tailwind config + shadcn/ui default, konsisten manual
- Tidak ada RFC/design-doc formal untuk tiap fitur kecil — cukup untuk perubahan besar (ganti auth provider, ganti DB, dsb)

Naikkan level rigor ini bertahap sesuai pertumbuhan tim/traffic, bukan di-set penuh dari hari pertama.
