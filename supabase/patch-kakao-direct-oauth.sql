-- 직접 카카오 OAuth 연동용 패치
-- Supabase SQL Editor 에서 실행하세요.

alter table public.profiles
add column if not exists kakao_id text unique;

create index if not exists profiles_kakao_id_idx on public.profiles (kakao_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  provider_name text := coalesce(new.raw_app_meta_data ->> 'provider', 'email');
  display_name text := coalesce(
    meta ->> 'nickname',
    meta ->> 'user_name',
    meta ->> 'name',
    meta ->> 'full_name',
    'user'
  );
  profile_avatar text := coalesce(
    meta ->> 'avatar_url',
    meta ->> 'picture',
    meta ->> 'profile_image'
  );
  generated_login_id text;
begin
  generated_login_id := lower(
    regexp_replace(
      coalesce(meta ->> 'nickname', meta ->> 'user_name', meta ->> 'name', 'user'),
      '[^a-zA-Z0-9가-힣]',
      '',
      'g'
    )
  );

  if generated_login_id = '' or length(generated_login_id) < 2 then
    generated_login_id := 'user' || substr(replace(new.id::text, '-', ''), 1, 8);
  end if;

  while exists (select 1 from public.profiles p where p.login_id = generated_login_id) loop
    generated_login_id := generated_login_id || floor(random() * 10)::text;
  end loop;

  insert into public.profiles (
    id,
    login_id,
    kakao_id,
    name,
    phone,
    email,
    avatar_url,
    auth_provider
  )
  values (
    new.id,
    generated_login_id,
    meta ->> 'kakao_id',
    display_name,
    null,
    null,
    profile_avatar,
    provider_name
  )
  on conflict (id) do update set
    name = excluded.name,
    kakao_id = coalesce(excluded.kakao_id, public.profiles.kakao_id),
    avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url),
    updated_at = now();

  return new;
end;
$$;
