-- ==============================================================================
-- ZENBU.STORE — FULL DATABASE SCHEMA & RLS POLICIES (PHASE 2)
-- Paste this entire script into your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ecmkcwesujxkozfnrccj/sql/new
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. EXTENSIONS & UTILITIES
-- ------------------------------------------------------------------------------
create extension if not exists "pgcrypto";

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ------------------------------------------------------------------------------
-- 2. CORE CATALOG
-- ------------------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  parent_id uuid references public.categories(id) on delete set null,
  image_url text,
  created_at timestamptz not null default now()
);

create index if not exists idx_categories_slug on public.categories(slug);
create index if not exists idx_categories_parent_id on public.categories(parent_id);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  price numeric(12, 2) not null check (price >= 0),
  compare_at_price numeric(12, 2) check (compare_at_price is null or compare_at_price >= 0),
  category_id uuid references public.categories(id) on delete set null,
  brand text,
  sku text unique,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  status text not null default 'active' check (status in ('draft', 'active', 'archived')),
  source_url text,
  source_type text not null default 'manual' check (source_type in ('manual', 'sheet', 'link_import')),
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_products_slug on public.products(slug);
create index if not exists idx_products_category_id on public.products(category_id);
create index if not exists idx_products_status on public.products(status);
create index if not exists idx_products_created_at on public.products(created_at desc);

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
  before update on public.products
  for each row
  execute function public.handle_updated_at();

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  position integer not null default 0,
  alt_text text,
  created_at timestamptz not null default now()
);

create index if not exists idx_product_images_product_id on public.product_images(product_id);
create index if not exists idx_product_images_position on public.product_images(product_id, position);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  value text not null,
  price_delta numeric(12, 2) not null default 0,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  created_at timestamptz not null default now()
);

create index if not exists idx_product_variants_product_id on public.product_variants(product_id);

-- ------------------------------------------------------------------------------
-- 3. CUSTOMERS, ORDERS & CARTS
-- ------------------------------------------------------------------------------
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete cascade,
  email text not null,
  name text,
  phone text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_customers_auth_user_id on public.customers(auth_user_id);
create index if not exists idx_customers_email on public.customers(email);

drop trigger if exists set_customers_updated_at on public.customers;
create trigger set_customers_updated_at
  before update on public.customers
  for each row
  execute function public.handle_updated_at();

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_admin_users_auth_user_id on public.admin_users(auth_user_id);

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  line1 text not null,
  city text not null,
  country text not null default 'Pakistan',
  postal_code text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_addresses_customer_id on public.addresses(customer_id);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete set null,
  guest_email text,
  guest_phone text,
  guest_name text,
  shipping_address jsonb,
  status text not null default 'pending',
  subtotal numeric(12, 2) not null check (subtotal >= 0),
  shipping_fee numeric(12, 2) not null default 0 check (shipping_fee >= 0),
  total numeric(12, 2) not null check (total >= 0),
  payment_method text not null check (payment_method in ('cod', 'whatsapp')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'confirmed', 'delivered', 'cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_orders_customer_id on public.orders(customer_id);
create index if not exists idx_orders_payment_status on public.orders(payment_status);
create index if not exists idx_orders_created_at on public.orders(created_at desc);

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at
  before update on public.orders
  for each row
  execute function public.handle_updated_at();

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  variant_id uuid references public.product_variants(id) on delete set null,
  product_title text not null,
  variant_name text,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null check (unit_price >= 0),
  created_at timestamptz not null default now()
);

create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_order_items_product_id on public.order_items(product_id);

create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete cascade,
  session_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint check_cart_owner check (customer_id is not null or session_id is not null)
);

create index if not exists idx_carts_customer_id on public.carts(customer_id);
create index if not exists idx_carts_session_id on public.carts(session_id);

drop trigger if exists set_carts_updated_at on public.carts;
create trigger set_carts_updated_at
  before update on public.carts
  for each row
  execute function public.handle_updated_at();

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  variant_id uuid references public.product_variants(id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (cart_id, product_id, variant_id)
);

create index if not exists idx_cart_items_cart_id on public.cart_items(cart_id);
create index if not exists idx_cart_items_product_id on public.cart_items(product_id);

drop trigger if exists set_cart_items_updated_at on public.cart_items;
create trigger set_cart_items_updated_at
  before update on public.cart_items
  for each row
  execute function public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 4. ENGAGEMENT & REVIEWS
-- ------------------------------------------------------------------------------
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

create unique index if not exists idx_unique_customer_wishlist
  on public.wishlists(customer_id, product_id)
  where customer_id is not null;

create unique index if not exists idx_unique_session_wishlist
  on public.wishlists(session_id, product_id)
  where session_id is not null;

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

-- ------------------------------------------------------------------------------
-- 5. ANALYTICS & TRACKING
-- ------------------------------------------------------------------------------
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

-- ------------------------------------------------------------------------------
-- 6. RLS SECURITY POLICIES
-- ------------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select coalesce(
    (
      select exists (
        select 1 from public.admin_users where auth_user_id = (select auth.uid())
      ) or exists (
        select 1 from public.customers where auth_user_id = (select auth.uid()) and is_admin = true
      )
    ),
    false
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.get_current_customer_id()
returns uuid
language sql
security definer
set search_path = ''
stable
as $$
  select id from public.customers where auth_user_id = (select auth.uid()) limit 1;
$$;

grant execute on function public.get_current_customer_id() to authenticated;

-- Enable RLS
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.customers enable row level security;
alter table public.admin_users enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.wishlists enable row level security;
alter table public.product_reviews enable row level security;
alter table public.analytics_sessions enable row level security;
alter table public.analytics_events enable row level security;
alter table public.form_sessions enable row level security;

-- Policies
create policy "categories_select_public" on public.categories for select to public using (true);
create policy "categories_admin_insert" on public.categories for insert to authenticated with check ((select public.is_admin()));
create policy "categories_admin_update" on public.categories for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "categories_admin_delete" on public.categories for delete to authenticated using ((select public.is_admin()));

create policy "products_select_public" on public.products for select to public using (status = 'active' or (select public.is_admin()));
create policy "products_admin_insert" on public.products for insert to authenticated with check ((select public.is_admin()));
create policy "products_admin_update" on public.products for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "products_admin_delete" on public.products for delete to authenticated using ((select public.is_admin()));

create policy "product_images_select_public" on public.product_images for select to public using (true);
create policy "product_images_admin_insert" on public.product_images for insert to authenticated with check ((select public.is_admin()));
create policy "product_images_admin_update" on public.product_images for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "product_images_admin_delete" on public.product_images for delete to authenticated using ((select public.is_admin()));

create policy "product_variants_select_public" on public.product_variants for select to public using (true);
create policy "product_variants_admin_insert" on public.product_variants for insert to authenticated with check ((select public.is_admin()));
create policy "product_variants_admin_update" on public.product_variants for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "product_variants_admin_delete" on public.product_variants for delete to authenticated using ((select public.is_admin()));

create policy "customers_select_owner_or_admin" on public.customers for select to authenticated using (auth_user_id = (select auth.uid()) or (select public.is_admin()));
create policy "customers_insert_owner_or_admin" on public.customers for insert to authenticated with check (auth_user_id = (select auth.uid()) or (select public.is_admin()));
create policy "customers_update_owner_or_admin" on public.customers for update to authenticated using (auth_user_id = (select auth.uid()) or (select public.is_admin())) with check (auth_user_id = (select auth.uid()) or (select public.is_admin()));
create policy "customers_delete_admin_only" on public.customers for delete to authenticated using ((select public.is_admin()));

create policy "admin_users_select_admin" on public.admin_users for select to authenticated using ((select public.is_admin()));
create policy "admin_users_manage_admin" on public.admin_users for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "addresses_select_owner_or_admin" on public.addresses for select to authenticated using (customer_id = (select public.get_current_customer_id()) or (select public.is_admin()));
create policy "addresses_insert_owner_or_admin" on public.addresses for insert to authenticated with check (customer_id = (select public.get_current_customer_id()) or (select public.is_admin()));
create policy "addresses_update_owner_or_admin" on public.addresses for update to authenticated using (customer_id = (select public.get_current_customer_id()) or (select public.is_admin())) with check (customer_id = (select public.get_current_customer_id()) or (select public.is_admin()));
create policy "addresses_delete_owner_or_admin" on public.addresses for delete to authenticated using (customer_id = (select public.get_current_customer_id()) or (select public.is_admin()));

create policy "orders_select_owner_or_admin" on public.orders for select to authenticated using (customer_id = (select public.get_current_customer_id()) or (select public.is_admin()));
create policy "orders_insert_checkout" on public.orders for insert to public with check (true);
create policy "orders_admin_update" on public.orders for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "orders_admin_delete" on public.orders for delete to authenticated using ((select public.is_admin()));

create policy "order_items_select_owner_or_admin" on public.order_items for select to authenticated using (
  exists (
    select 1 from public.orders o
    where o.id = order_items.order_id
      and (o.customer_id = (select public.get_current_customer_id()) or (select public.is_admin()))
  )
);
create policy "order_items_insert_checkout" on public.order_items for insert to public with check (true);
create policy "order_items_admin_update" on public.order_items for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "order_items_admin_delete" on public.order_items for delete to authenticated using ((select public.is_admin()));

create policy "carts_select_owner_or_session" on public.carts for select to public using (
  (customer_id is not null and customer_id = (select public.get_current_customer_id())) or session_id is not null or (select public.is_admin())
);
create policy "carts_insert_owner_or_session" on public.carts for insert to public with check (
  (customer_id is not null and customer_id = (select public.get_current_customer_id())) or session_id is not null or (select public.is_admin())
);
create policy "carts_update_owner_or_session" on public.carts for update to public using (
  (customer_id is not null and customer_id = (select public.get_current_customer_id())) or session_id is not null or (select public.is_admin())
) with check (
  (customer_id is not null and customer_id = (select public.get_current_customer_id())) or session_id is not null or (select public.is_admin())
);
create policy "carts_delete_owner_or_session" on public.carts for delete to public using (
  (customer_id is not null and customer_id = (select public.get_current_customer_id())) or session_id is not null or (select public.is_admin())
);

create policy "cart_items_select_owner_or_session" on public.cart_items for select to public using (
  exists (
    select 1 from public.carts c
    where c.id = cart_items.cart_id
      and ((c.customer_id is not null and c.customer_id = (select public.get_current_customer_id())) or c.session_id is not null or (select public.is_admin()))
  )
);
create policy "cart_items_insert_owner_or_session" on public.cart_items for insert to public with check (
  exists (
    select 1 from public.carts c
    where c.id = cart_items.cart_id
      and ((c.customer_id is not null and c.customer_id = (select public.get_current_customer_id())) or c.session_id is not null or (select public.is_admin()))
  )
);
create policy "cart_items_update_owner_or_session" on public.cart_items for update to public using (
  exists (
    select 1 from public.carts c
    where c.id = cart_items.cart_id
      and ((c.customer_id is not null and c.customer_id = (select public.get_current_customer_id())) or c.session_id is not null or (select public.is_admin()))
  )
) with check (
  exists (
    select 1 from public.carts c
    where c.id = cart_items.cart_id
      and ((c.customer_id is not null and c.customer_id = (select public.get_current_customer_id())) or c.session_id is not null or (select public.is_admin()))
  )
);
create policy "cart_items_delete_owner_or_session" on public.cart_items for delete to public using (
  exists (
    select 1 from public.carts c
    where c.id = cart_items.cart_id
      and ((c.customer_id is not null and c.customer_id = (select public.get_current_customer_id())) or c.session_id is not null or (select public.is_admin()))
  )
);

create policy "wishlists_select_owner_or_session" on public.wishlists for select to public using (
  (customer_id is not null and customer_id = (select public.get_current_customer_id())) or session_id is not null or (select public.is_admin())
);
create policy "wishlists_insert_owner_or_session" on public.wishlists for insert to public with check (
  (customer_id is not null and customer_id = (select public.get_current_customer_id())) or session_id is not null or (select public.is_admin())
);
create policy "wishlists_delete_owner_or_session" on public.wishlists for delete to public using (
  (customer_id is not null and customer_id = (select public.get_current_customer_id())) or session_id is not null or (select public.is_admin())
);

create policy "reviews_select_approved_or_admin" on public.product_reviews for select to public using (is_approved = true or (select public.is_admin()));
create policy "reviews_insert_authenticated" on public.product_reviews for insert to authenticated with check (
  customer_id = (select public.get_current_customer_id()) or (select public.is_admin())
);
create policy "reviews_update_author_or_admin" on public.product_reviews for update to authenticated using (
  customer_id = (select public.get_current_customer_id()) or (select public.is_admin())
) with check (
  customer_id = (select public.get_current_customer_id()) or (select public.is_admin())
);
create policy "reviews_delete_author_or_admin" on public.product_reviews for delete to authenticated using (
  customer_id = (select public.get_current_customer_id()) or (select public.is_admin())
);

create policy "analytics_sessions_insert_client" on public.analytics_sessions for insert to anon, authenticated with check (true);
create policy "analytics_sessions_select_admin_only" on public.analytics_sessions for select to authenticated using ((select public.is_admin()));
create policy "analytics_sessions_manage_admin_only" on public.analytics_sessions for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "analytics_events_insert_client" on public.analytics_events for insert to anon, authenticated with check (true);
create policy "analytics_events_select_admin_only" on public.analytics_events for select to authenticated using ((select public.is_admin()));
create policy "analytics_events_manage_admin_only" on public.analytics_events for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "form_sessions_insert_client" on public.form_sessions for insert to anon, authenticated with check (true);
create policy "form_sessions_update_client" on public.form_sessions for update to anon, authenticated using (true) with check (true);
create policy "form_sessions_select_admin_only" on public.form_sessions for select to authenticated using ((select public.is_admin()));
create policy "form_sessions_manage_admin_only" on public.form_sessions for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

-- ------------------------------------------------------------------------------
-- 7. STARTER SEED DATA
-- ------------------------------------------------------------------------------
insert into public.categories (id, name, slug, image_url) values
  ('c0000000-0000-0000-0000-000000000001', 'Home & Organization', 'home-organization', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'),
  ('c0000000-0000-0000-0000-000000000002', 'Personal Electronics', 'electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'),
  ('c0000000-0000-0000-0000-000000000003', 'Daily Lifestyle', 'lifestyle', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'),
  ('c0000000-0000-0000-0000-000000000004', 'Kitchen & Dining', 'kitchen-dining', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80')
on conflict (id) do nothing;

insert into public.products (
  id, title, slug, description, price, compare_at_price, category_id, brand, sku, stock_quantity, status, source_type, seo_title, seo_description
) values
  (
    'p0000000-0000-0000-0000-000000000001',
    'Minimalist Frosted Glass Desk Organizer',
    'minimalist-frosted-glass-desk-organizer',
    'An elegant, modular desktop organizer crafted from tempered frosted glass and anodized aluminum. Keeps stationery, notes, and digital essentials tidy.',
    2850.00,
    3500.00,
    'c0000000-0000-0000-0000-000000000001',
    'Zenbu Living',
    'DSK-ORG-01',
    45,
    'active',
    'manual',
    'Frosted Glass Desk Organizer — Zenbu.Store',
    'Keep your desk clutter-free with the Zenbu Minimalist Frosted Glass Organizer.'
  ),
  (
    'p0000000-0000-0000-0000-000000000002',
    'Wireless Noise-Canceling Earbuds Pro',
    'wireless-noise-canceling-earbuds-pro',
    'High-fidelity wireless sound featuring hybrid active noise cancellation, transparency mode, and up to 32 hours of playback with the USB-C charging case.',
    4950.00,
    6200.00,
    'c0000000-0000-0000-0000-000000000002',
    'Zenbu Audio',
    'EAR-ANC-02',
    28,
    'active',
    'manual',
    'Wireless Earbuds Pro — Active Noise Canceling — Zenbu.Store',
    'Premium wireless ANC earbuds with 32-hour battery life and Cash on Delivery.'
  ),
  (
    'p0000000-0000-0000-0000-000000000003',
    'Double-Walled Matte Insulated Tumbler 500ml',
    'double-walled-matte-insulated-tumbler-500ml',
    'Thermal vacuum insulation maintains drinks ice-cold for 24 hours or steaming hot for 12 hours. BPA-free stainless steel with sweat-proof powder coating.',
    1950.00,
    2400.00,
    'c0000000-0000-0000-0000-000000000003',
    'Zenbu Hydrate',
    'TMB-MAT-03',
    60,
    'active',
    'manual',
    'Matte Stainless Steel Insulated Tumbler 500ml — Zenbu.Store',
    'Double-walled vacuum insulated tumbler for everyday commute and gym.'
  ),
  (
    'p0000000-0000-0000-0000-000000000004',
    'Precision Coffee Scale with Built-in Timer',
    'precision-coffee-scale-timer',
    'Accurate to 0.1g for barista-grade pour-over coffee brewing. Features automatic tare, backlit digital LED display, and rechargeable lithium battery.',
    3200.00,
    3900.00,
    'c0000000-0000-0000-0000-000000000004',
    'Zenbu Brew',
    'SCL-TIM-04',
    18,
    'active',
    'manual',
    'Precision Digital Coffee Scale with Timer — Zenbu.Store',
    'Professional 0.1g accuracy coffee brewing scale with USB rechargeable battery.'
  )
on conflict (id) do nothing;

insert into public.product_images (product_id, url, position, alt_text) values
  ('p0000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80', 0, 'Minimalist Frosted Glass Desk Organizer front view'),
  ('p0000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80', 0, 'Wireless Noise-Canceling Earbuds Pro in charging case'),
  ('p0000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=80', 0, 'Double-Walled Matte Insulated Tumbler'),
  ('p0000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80', 0, 'Precision Coffee Scale on wood counter')
on conflict do nothing;

insert into public.product_variants (product_id, name, value, price_delta, stock_quantity) values
  ('p0000000-0000-0000-0000-000000000001', 'Color', 'Frosted Smoke', 0, 25),
  ('p0000000-0000-0000-0000-000000000001', 'Color', 'Frosted Ice', 0, 20),
  ('p0000000-0000-0000-0000-000000000002', 'Color', 'Midnight Black', 0, 15),
  ('p0000000-0000-0000-0000-000000000002', 'Color', 'Glacier White', 0, 13),
  ('p0000000-0000-0000-0000-000000000003', 'Capacity', '500ml', 0, 35),
  ('p0000000-0000-0000-0000-000000000003', 'Capacity', '750ml', 450.00, 25)
on conflict do nothing;
