-- Migration 3: Engagement & Reviews
-- wishlists, product_reviews

-- 1. Wishlists (likes - supports both logged-in customers and anonymous sessions)
create table if not exists public.wishlists (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete cascade,
  session_id text,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint check_wishlist_owner check (customer_id is not null or session_id is not null)
);

create index if not exists idx_wishlists_customer_id on public.wishlists(customer_id);
create index if not exists idx_wishlists_session_id on public.wishlists(session_id);
create index if not exists idx_wishlists_product_id on public.wishlists(product_id);

-- Enforce unique like per customer / session
create unique index if not exists idx_unique_customer_wishlist
  on public.wishlists(customer_id, product_id)
  where customer_id is not null;

create unique index if not exists idx_unique_session_wishlist
  on public.wishlists(session_id, product_id)
  where session_id is not null;

-- 2. Product Reviews
create table if not exists public.product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  is_approved boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_product_reviews_product_id on public.product_reviews(product_id);
create index if not exists idx_product_reviews_customer_id on public.product_reviews(customer_id);
create index if not exists idx_product_reviews_rating on public.product_reviews(rating);

drop trigger if exists set_product_reviews_updated_at on public.product_reviews;
create trigger set_product_reviews_updated_at
  before update on public.product_reviews
  for each row
  execute function public.handle_updated_at();
