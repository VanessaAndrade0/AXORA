-- Nácar Finanzas: tabla, reglas de privacidad y bucket de capturas.
-- Pégalo completo en Supabase > SQL Editor > New query y presiona Run.
-- Se puede ejecutar más de una vez sin dañar nada.

-- 1) Tabla de datos: un renglón por documento (ajustes, movimientos, pagos fijos...).
create table if not exists public.docs (
  user_id    uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  path       text        not null,
  data       jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, path)
);

-- 2) Privacidad: cada usuaria solo ve y cambia sus propios renglones.
alter table public.docs enable row level security;
drop policy if exists "docs: solo la duena" on public.docs;
create policy "docs: solo la duena" on public.docs
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- 3) Tiempo real: lo que cambias en un dispositivo aparece en el otro.
do $$
begin
  alter publication supabase_realtime add table public.docs;
exception when duplicate_object then null;
end $$;

-- 4) Bucket privado para las capturas (máximo 5 MB por imagen).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('capturas', 'capturas', false, 5242880, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update
  set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

-- 5) Cada usuaria solo entra a su propia carpeta dentro del bucket.
drop policy if exists "capturas: ver las mias" on storage.objects;
create policy "capturas: ver las mias" on storage.objects
  for select to authenticated
  using (bucket_id = 'capturas' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "capturas: subir las mias" on storage.objects;
create policy "capturas: subir las mias" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'capturas' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "capturas: cambiar las mias" on storage.objects;
create policy "capturas: cambiar las mias" on storage.objects
  for update to authenticated
  using (bucket_id = 'capturas' and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'capturas' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "capturas: borrar las mias" on storage.objects;
create policy "capturas: borrar las mias" on storage.objects
  for delete to authenticated
  using (bucket_id = 'capturas' and (storage.foldername(name))[1] = (select auth.uid())::text);
