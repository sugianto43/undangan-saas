-- Storage bucket for invitation cover + gallery photos.
-- Private bucket: reads go through signed URLs generated server-side,
-- so RLS can enforce "owner always, public only if invitation is published"
-- the same way it does for the invitations/rsvps/wishes tables.

insert into storage.buckets (id, name, public)
values ('invitation-photos', 'invitation-photos', false)
on conflict (id) do nothing;

-- Path convention: {invitation_id}/cover.{ext} or {invitation_id}/gallery/{filename}
-- storage.foldername(name) returns the path segments before the filename,
-- so foldername(name)[1] is always the invitation id regardless of subfolder.

create policy "invitation_photos_owner_insert" on storage.objects
  for insert with check (
    bucket_id = 'invitation-photos'
    and exists (
      select 1 from invitations
      where invitations.id::text = (storage.foldername(name))[1]
      and invitations.user_id = auth.uid()
    )
  );

create policy "invitation_photos_owner_update" on storage.objects
  for update using (
    bucket_id = 'invitation-photos'
    and exists (
      select 1 from invitations
      where invitations.id::text = (storage.foldername(name))[1]
      and invitations.user_id = auth.uid()
    )
  );

create policy "invitation_photos_owner_delete" on storage.objects
  for delete using (
    bucket_id = 'invitation-photos'
    and exists (
      select 1 from invitations
      where invitations.id::text = (storage.foldername(name))[1]
      and invitations.user_id = auth.uid()
    )
  );

create policy "invitation_photos_select" on storage.objects
  for select using (
    bucket_id = 'invitation-photos'
    and exists (
      select 1 from invitations
      where invitations.id::text = (storage.foldername(name))[1]
      and (invitations.user_id = auth.uid() or invitations.status = 'published')
    )
  );
