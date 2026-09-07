-- Seed Data for Zenbu.Store Catalog

-- Categories
insert into public.categories (id, name, slug, image_url) values
  ('c0000000-0000-0000-0000-000000000001', 'Home & Organization', 'home-organization', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'),
  ('c0000000-0000-0000-0000-000000000002', 'Personal Electronics', 'electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'),
  ('c0000000-0000-0000-0000-000000000003', 'Daily Lifestyle', 'lifestyle', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'),
  ('c0000000-0000-0000-0000-000000000004', 'Kitchen & Dining', 'kitchen-dining', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80')
on conflict (id) do nothing;

-- Products
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

-- Product Images
insert into public.product_images (product_id, url, position, alt_text) values
  ('p0000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80', 0, 'Minimalist Frosted Glass Desk Organizer front view'),
  ('p0000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80', 0, 'Wireless Noise-Canceling Earbuds Pro in charging case'),
  ('p0000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=80', 0, 'Double-Walled Matte Insulated Tumbler'),
  ('p0000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80', 0, 'Precision Coffee Scale on wood counter')
on conflict do nothing;

-- Product Variants
insert into public.product_variants (product_id, name, value, price_delta, stock_quantity) values
  ('p0000000-0000-0000-0000-000000000001', 'Color', 'Frosted Smoke', 0, 25),
  ('p0000000-0000-0000-0000-000000000001', 'Color', 'Frosted Ice', 0, 20),
  ('p0000000-0000-0000-0000-000000000002', 'Color', 'Midnight Black', 0, 15),
  ('p0000000-0000-0000-0000-000000000002', 'Color', 'Glacier White', 0, 13),
  ('p0000000-0000-0000-0000-000000000003', 'Capacity', '500ml', 0, 35),
  ('p0000000-0000-0000-0000-000000000003', 'Capacity', '750ml', 450.00, 25)
on conflict do nothing;
