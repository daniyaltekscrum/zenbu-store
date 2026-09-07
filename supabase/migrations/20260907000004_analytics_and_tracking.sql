-- Migration 4: Analytics & Tracking
-- analytics_sessions, analytics_events, form_sessions

-- 1. Analytics Sessions
create table if not exists public.analytics_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text not null unique,
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  device text,
  browser text,
  country text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text
);

create index if not exists idx_analytics_sessions_session_id on public.analytics_sessions(session_id);
create index if not exists idx_analytics_sessions_last_seen on public.analytics_sessions(last_seen desc);

-- 2. Analytics Events
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  event_type text not null check (
    event_type in (
      'page_view',
      'product_view',
      'product_like',
      'add_to_cart',
      'remove_from_cart',
      'search',
      'checkout_start',
      'checkout_step_complete',
      'form_field_focus',
      'form_field_blur',
      'form_abandoned',
      'purchase'
    )
  ),
  product_id uuid references public.products(id) on delete set null,
  page_url text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_analytics_events_session_id on public.analytics_events(session_id);
create index if not exists idx_analytics_events_event_type on public.analytics_events(event_type);
create index if not exists idx_analytics_events_product_id on public.analytics_events(product_id);
create index if not exists idx_analytics_events_created_at on public.analytics_events(created_at desc);

-- 3. Form Sessions (Form drop-off tracking)
create table if not exists public.form_sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  form_name text not null,
  fields_total integer not null default 0,
  fields_completed integer not null default 0,
  completed boolean not null default false,
  abandoned_at_field text,
  started_at timestamptz not null default now(),
  ended_at timestamptz
);

create index if not exists idx_form_sessions_session_id on public.form_sessions(session_id);
create index if not exists idx_form_sessions_form_name on public.form_sessions(form_name);
create index if not exists idx_form_sessions_started_at on public.form_sessions(started_at desc);
