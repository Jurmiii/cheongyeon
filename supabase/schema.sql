-- =============================================================================
-- 청연(cheongyeon) — Supabase 초기 스키마
-- Supabase Dashboard → SQL Editor 에 붙여넣어 실행하세요.
-- 카카오 로그인(auth.users) 연동 + 마이페이지(profiles, reservations)
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. profiles — auth.users 1:1 확장 프로필
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  login_id text unique,
  kakao_id text unique,
  name text not null default '',
  phone text,
  email text,
  avatar_url text,
  auth_provider text not null default 'kakao',
  stamp_count integer not null default 0 check (stamp_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Supabase Auth 사용자 프로필 (카카오 OAuth 포함)';
comment on column public.profiles.login_id is '표시용 아이디. 카카오 최초 가입 시 자동 생성 가능';
comment on column public.profiles.auth_provider is 'oauth provider: kakao, email 등';

create index if not exists profiles_email_idx on public.profiles (email);
create index if not exists profiles_login_id_idx on public.profiles (login_id);
create index if not exists profiles_kakao_id_idx on public.profiles (kakao_id);
create index if not exists profiles_kakao_id_idx on public.profiles (kakao_id);

-- ---------------------------------------------------------------------------
-- 2. reservations — 클래스 예약 (마이페이지)
-- ---------------------------------------------------------------------------
create type public.reservation_status as enum (
  'upcoming',
  'completed',
  'cancelled',
  'noshow'
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  class_title text not null,
  branch text not null,
  location text not null,
  reservation_date date not null,
  reservation_time time not null,
  guest_count integer not null default 1 check (guest_count >= 1),
  reserver_name text,
  reserver_phone text,
  request_message text,
  payment_method text check (payment_method in ('card', 'bank')),
  card_company text,
  installment_plan text,
  save_payment_method boolean not null default false,
  status public.reservation_status not null default 'upcoming',
  image_url text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.reservations is '클래스 예약 내역';

create index if not exists reservations_user_id_idx on public.reservations (user_id);
create index if not exists reservations_status_idx on public.reservations (status);
create index if not exists reservations_date_idx on public.reservations (reservation_date desc);

-- ---------------------------------------------------------------------------
-- 3. updated_at 자동 갱신
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists reservations_set_updated_at on public.reservations;
create trigger reservations_set_updated_at
before update on public.reservations
for each row
execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 4. 카카오( OAuth ) 가입 시 profiles 자동 생성
-- ---------------------------------------------------------------------------
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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 5. Row Level Security (RLS)
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.reservations enable row level security;

-- profiles: 본인만 조회·수정
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- reservations: 본인만 CRUD
drop policy if exists "reservations_select_own" on public.reservations;
create policy "reservations_select_own"
on public.reservations
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "reservations_insert_own" on public.reservations;
create policy "reservations_insert_own"
on public.reservations
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "reservations_update_own" on public.reservations;
create policy "reservations_update_own"
on public.reservations
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "reservations_delete_own" on public.reservations;
create policy "reservations_delete_own"
on public.reservations
for delete
to authenticated
using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 6. (선택) 1:1 문의 — Contact 페이지 연동 시
-- ---------------------------------------------------------------------------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  name text not null,
  phone text not null,
  email text not null,
  inquiry_type text not null,
  content text not null,
  is_agreed boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'answered', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists inquiries_user_id_idx on public.inquiries (user_id);
create index if not exists inquiries_status_idx on public.inquiries (status);

drop trigger if exists inquiries_set_updated_at on public.inquiries;
create trigger inquiries_set_updated_at
before update on public.inquiries
for each row
execute function public.set_updated_at();

alter table public.inquiries enable row level security;

drop policy if exists "inquiries_insert_public" on public.inquiries;
create policy "inquiries_insert_public"
on public.inquiries
for insert
to anon, authenticated
with check (true);

drop policy if exists "inquiries_select_own" on public.inquiries;
create policy "inquiries_select_own"
on public.inquiries
for select
to authenticated
using (auth.uid() = user_id);
