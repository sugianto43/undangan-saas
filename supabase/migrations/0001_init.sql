-- Initial schema: invitations, invitation_photos, rsvps, wishes
-- users table is managed by Supabase Auth (auth.users)

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

-- Row Level Security

alter table invitations enable row level security;
alter table invitation_photos enable row level security;
alter table rsvps enable row level security;
alter table wishes enable row level security;

-- invitations: owner full access
create policy "invitations_owner_select" on invitations
  for select using (auth.uid() = user_id);

create policy "invitations_owner_insert" on invitations
  for insert with check (auth.uid() = user_id);

create policy "invitations_owner_update" on invitations
  for update using (auth.uid() = user_id);

create policy "invitations_owner_delete" on invitations
  for delete using (auth.uid() = user_id);

-- invitations: public can read published invitations
create policy "invitations_public_select_published" on invitations
  for select using (status = 'published');

-- invitation_photos: owner full access via parent invitation
create policy "invitation_photos_owner_all" on invitation_photos
  for all using (
    exists (
      select 1 from invitations
      where invitations.id = invitation_photos.invitation_id
      and invitations.user_id = auth.uid()
    )
  );

-- invitation_photos: public can read photos of published invitations
create policy "invitation_photos_public_select" on invitation_photos
  for select using (
    exists (
      select 1 from invitations
      where invitations.id = invitation_photos.invitation_id
      and invitations.status = 'published'
    )
  );

-- rsvps: owner can read responses to their invitations
create policy "rsvps_owner_select" on rsvps
  for select using (
    exists (
      select 1 from invitations
      where invitations.id = rsvps.invitation_id
      and invitations.user_id = auth.uid()
    )
  );

-- rsvps: anyone (including anon) can submit to a published invitation
create policy "rsvps_public_insert" on rsvps
  for insert with check (
    exists (
      select 1 from invitations
      where invitations.id = rsvps.invitation_id
      and invitations.status = 'published'
    )
  );

-- wishes: owner can read wishes on their invitations
create policy "wishes_owner_select" on wishes
  for select using (
    exists (
      select 1 from invitations
      where invitations.id = wishes.invitation_id
      and invitations.user_id = auth.uid()
    )
  );

-- wishes: public can read wishes on published invitations (for the wishes list on the public page)
create policy "wishes_public_select" on wishes
  for select using (
    exists (
      select 1 from invitations
      where invitations.id = wishes.invitation_id
      and invitations.status = 'published'
    )
  );

-- wishes: anyone (including anon) can submit to a published invitation
create policy "wishes_public_insert" on wishes
  for insert with check (
    exists (
      select 1 from invitations
      where invitations.id = wishes.invitation_id
      and invitations.status = 'published'
    )
  );
