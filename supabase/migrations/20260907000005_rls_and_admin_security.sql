-- Migration 5: Row Level Security (RLS) & Security Policies
-- Enables RLS on every table and defines role-based access rules

-- 1. Helper Functions
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

-- 2. Enable RLS on ALL tables
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

-- 3. Core Catalog Policies (categories, products, product_images, product_variants)
-- Public read; Admin-only write
create policy "categories_select_public"
  on public.categories for select
  to public
  using (true);

create policy "categories_admin_insert"
  on public.categories for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "categories_admin_update"
  on public.categories for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "categories_admin_delete"
  on public.categories for delete
  to authenticated
  using ((select public.is_admin()));

create policy "products_select_public"
  on public.products for select
  to public
  using (status = 'active' or (select public.is_admin()));

create policy "products_admin_insert"
  on public.products for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "products_admin_update"
  on public.products for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "products_admin_delete"
  on public.products for delete
  to authenticated
  using ((select public.is_admin()));

create policy "product_images_select_public"
  on public.product_images for select
  to public
  using (true);

create policy "product_images_admin_insert"
  on public.product_images for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "product_images_admin_update"
  on public.product_images for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "product_images_admin_delete"
  on public.product_images for delete
  to authenticated
  using ((select public.is_admin()));

create policy "product_variants_select_public"
  on public.product_variants for select
  to public
  using (true);

create policy "product_variants_admin_insert"
  on public.product_variants for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "product_variants_admin_update"
  on public.product_variants for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "product_variants_admin_delete"
  on public.product_variants for delete
  to authenticated
  using ((select public.is_admin()));

-- 4. Customer & Admin Policies
create policy "customers_select_owner_or_admin"
  on public.customers for select
  to authenticated
  using (auth_user_id = (select auth.uid()) or (select public.is_admin()));

create policy "customers_insert_owner_or_admin"
  on public.customers for insert
  to authenticated
  with check (auth_user_id = (select auth.uid()) or (select public.is_admin()));

create policy "customers_update_owner_or_admin"
  on public.customers for update
  to authenticated
  using (auth_user_id = (select auth.uid()) or (select public.is_admin()))
  with check (auth_user_id = (select auth.uid()) or (select public.is_admin()));

create policy "customers_delete_admin_only"
  on public.customers for delete
  to authenticated
  using ((select public.is_admin()));

create policy "admin_users_select_admin"
  on public.admin_users for select
  to authenticated
  using ((select public.is_admin()));

create policy "admin_users_manage_admin"
  on public.admin_users for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- 5. Addresses Policies
create policy "addresses_select_owner_or_admin"
  on public.addresses for select
  to authenticated
  using (customer_id = (select public.get_current_customer_id()) or (select public.is_admin()));

create policy "addresses_insert_owner_or_admin"
  on public.addresses for insert
  to authenticated
  with check (customer_id = (select public.get_current_customer_id()) or (select public.is_admin()));

create policy "addresses_update_owner_or_admin"
  on public.addresses for update
  to authenticated
  using (customer_id = (select public.get_current_customer_id()) or (select public.is_admin()))
  with check (customer_id = (select public.get_current_customer_id()) or (select public.is_admin()));

create policy "addresses_delete_owner_or_admin"
  on public.addresses for delete
  to authenticated
  using (customer_id = (select public.get_current_customer_id()) or (select public.is_admin()));

-- 6. Orders & Order Items Policies
-- Customers read their own; Admin reads all; Public can insert COD orders (guest checkout)
create policy "orders_select_owner_or_admin"
  on public.orders for select
  to authenticated
  using (customer_id = (select public.get_current_customer_id()) or (select public.is_admin()));

create policy "orders_insert_checkout"
  on public.orders for insert
  to public
  with check (true);

create policy "orders_admin_update"
  on public.orders for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "orders_admin_delete"
  on public.orders for delete
  to authenticated
  using ((select public.is_admin()));

create policy "order_items_select_owner_or_admin"
  on public.order_items for select
  to authenticated
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and (o.customer_id = (select public.get_current_customer_id()) or (select public.is_admin()))
    )
  );

create policy "order_items_insert_checkout"
  on public.order_items for insert
  to public
  with check (true);

create policy "order_items_admin_update"
  on public.order_items for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "order_items_admin_delete"
  on public.order_items for delete
  to authenticated
  using ((select public.is_admin()));

-- 7. Carts & Cart Items Policies (Support customer_id OR session_id)
create policy "carts_select_owner_or_session"
  on public.carts for select
  to public
  using (
    (customer_id is not null and customer_id = (select public.get_current_customer_id()))
    or session_id is not null
    or (select public.is_admin())
  );

create policy "carts_insert_owner_or_session"
  on public.carts for insert
  to public
  with check (
    (customer_id is not null and customer_id = (select public.get_current_customer_id()))
    or session_id is not null
    or (select public.is_admin())
  );

create policy "carts_update_owner_or_session"
  on public.carts for update
  to public
  using (
    (customer_id is not null and customer_id = (select public.get_current_customer_id()))
    or session_id is not null
    or (select public.is_admin())
  )
  with check (
    (customer_id is not null and customer_id = (select public.get_current_customer_id()))
    or session_id is not null
    or (select public.is_admin())
  );

create policy "carts_delete_owner_or_session"
  on public.carts for delete
  to public
  using (
    (customer_id is not null and customer_id = (select public.get_current_customer_id()))
    or session_id is not null
    or (select public.is_admin())
  );

create policy "cart_items_select_owner_or_session"
  on public.cart_items for select
  to public
  using (
    exists (
      select 1 from public.carts c
      where c.id = cart_items.cart_id
        and (
          (c.customer_id is not null and c.customer_id = (select public.get_current_customer_id()))
          or c.session_id is not null
          or (select public.is_admin())
        )
    )
  );

create policy "cart_items_insert_owner_or_session"
  on public.cart_items for insert
  to public
  with check (
    exists (
      select 1 from public.carts c
      where c.id = cart_items.cart_id
        and (
          (c.customer_id is not null and c.customer_id = (select public.get_current_customer_id()))
          or c.session_id is not null
          or (select public.is_admin())
        )
    )
  );

create policy "cart_items_update_owner_or_session"
  on public.cart_items for update
  to public
  using (
    exists (
      select 1 from public.carts c
      where c.id = cart_items.cart_id
        and (
          (c.customer_id is not null and c.customer_id = (select public.get_current_customer_id()))
          or c.session_id is not null
          or (select public.is_admin())
        )
    )
  )
  with check (
    exists (
      select 1 from public.carts c
      where c.id = cart_items.cart_id
        and (
          (c.customer_id is not null and c.customer_id = (select public.get_current_customer_id()))
          or c.session_id is not null
          or (select public.is_admin())
        )
    )
  );

create policy "cart_items_delete_owner_or_session"
  on public.cart_items for delete
  to public
  using (
    exists (
      select 1 from public.carts c
      where c.id = cart_items.cart_id
        and (
          (c.customer_id is not null and c.customer_id = (select public.get_current_customer_id()))
          or c.session_id is not null
          or (select public.is_admin())
        )
    )
  );

-- 8. Wishlists Policies
create policy "wishlists_select_owner_or_session"
  on public.wishlists for select
  to public
  using (
    (customer_id is not null and customer_id = (select public.get_current_customer_id()))
    or session_id is not null
    or (select public.is_admin())
  );

create policy "wishlists_insert_owner_or_session"
  on public.wishlists for insert
  to public
  with check (
    (customer_id is not null and customer_id = (select public.get_current_customer_id()))
    or session_id is not null
    or (select public.is_admin())
  );

create policy "wishlists_delete_owner_or_session"
  on public.wishlists for delete
  to public
  using (
    (customer_id is not null and customer_id = (select public.get_current_customer_id()))
    or session_id is not null
    or (select public.is_admin())
  );

-- 9. Product Reviews Policies
create policy "reviews_select_approved_or_admin"
  on public.product_reviews for select
  to public
  using (is_approved = true or (select public.is_admin()));

create policy "reviews_insert_authenticated_buyer"
  on public.product_reviews for insert
  to authenticated
  with check (
    customer_id = (select public.get_current_customer_id())
    or (select public.is_admin())
  );

create policy "reviews_update_author_or_admin"
  on public.product_reviews for update
  to authenticated
  using (
    customer_id = (select public.get_current_customer_id())
    or (select public.is_admin())
  )
  with check (
    customer_id = (select public.get_current_customer_id())
    or (select public.is_admin())
  );

create policy "reviews_delete_author_or_admin"
  on public.product_reviews for delete
  to authenticated
  using (
    customer_id = (select public.get_current_customer_id())
    or (select public.is_admin())
  );

-- 10. Analytics & Tracking Policies (Client INSERT-only; Admin-only read)
create policy "analytics_sessions_insert_client"
  on public.analytics_sessions for insert
  to anon, authenticated
  with check (true);

create policy "analytics_sessions_select_admin_only"
  on public.analytics_sessions for select
  to authenticated
  using ((select public.is_admin()));

create policy "analytics_sessions_manage_admin_only"
  on public.analytics_sessions for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "analytics_events_insert_client"
  on public.analytics_events for insert
  to anon, authenticated
  with check (true);

create policy "analytics_events_select_admin_only"
  on public.analytics_events for select
  to authenticated
  using ((select public.is_admin()));

create policy "analytics_events_manage_admin_only"
  on public.analytics_events for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "form_sessions_insert_client"
  on public.form_sessions for insert
  to anon, authenticated
  with check (true);

create policy "form_sessions_update_client"
  on public.form_sessions for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "form_sessions_select_admin_only"
  on public.form_sessions for select
  to authenticated
  using ((select public.is_admin()));

create policy "form_sessions_manage_admin_only"
  on public.form_sessions for all
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
