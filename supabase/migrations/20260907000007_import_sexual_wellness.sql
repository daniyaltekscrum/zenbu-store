-- Migration 7: Import 18 Sexual Wellness Products from dvago.pk
-- Category: Sexual Wellness (c0000000-0000-0000-0000-000000000014)
-- Includes Durex, Pulse, OK, Rough Rider, Josh, Skyn, Lifestyles with plain-box discreet COD

-- 1. Category
insert into public.categories (id, name, slug, image_url)
values ('c0000000-0000-0000-0000-000000000014', 'Sexual Wellness', 'sexual-wellness', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80')
on conflict (id) do update set name = excluded.name, image_url = excluded.image_url;

-- 2. Products, Images, and Variants

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'durex-extended-pleasure-3s';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Durex Extended Pleasure Condoms (Pack of 3)',
      'durex-extended-pleasure-3s',
      'Durex Extended Pleasure condoms contain a special climax-control lubricant inside the teat that helps him last longer, extending intimacy and mutual enjoyment. Made from natural rubber latex, dermatologically tested, and 100% electronically inspected for maximum reliability. Sourced from authorized distribution and delivered in 100% discreet, plain-box packaging with nationwide Cash on Delivery.',
      480,
      550,
      'c0000000-0000-0000-0000-000000000014',
      'DUREX',
      'SKU-SW-100',
      50,
      'active',
      'https://www.dvago.pk/p/durex-extended-pleasure-3s',
      'link_import',
      'Durex Extended Pleasure Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Durex Extended Pleasure Condoms (Pack of 3) for Rs. 480 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/Durex%20Extended%20Pleasure%20Condoms%20%281%20Pack%20%3D%203Pcs%29.png', 0, 'Durex Extended Pleasure Condoms (Pack of 3)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Durex Extended Pleasure Condoms (Pack of 3)',
      description = 'Durex Extended Pleasure condoms contain a special climax-control lubricant inside the teat that helps him last longer, extending intimacy and mutual enjoyment. Made from natural rubber latex, dermatologically tested, and 100% electronically inspected for maximum reliability. Sourced from authorized distribution and delivered in 100% discreet, plain-box packaging with nationwide Cash on Delivery.',
      price = 480,
      compare_at_price = 550,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'DUREX',
      seo_title = 'Durex Extended Pleasure Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Durex Extended Pleasure Condoms (Pack of 3) for Rs. 480 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'pulse-ribbed-dotted-delay-3s';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Pulse Ribbed & Dotted Delay Condoms (Pack of 3)',
      'pulse-ribbed-dotted-delay-3s',
      'Pulse Ribbed & Dotted Delay condoms combine raised texture ribs and stimulating dots with special delaying lubricant to enhance sensation for her while prolonging performance for him. High-grade natural latex crafted to international safety specifications. Dispatched in unbranded, discreet packaging across Pakistan with Cash on Delivery.',
      240,
      280,
      'c0000000-0000-0000-0000-000000000014',
      'PULSE',
      'SKU-SW-101',
      50,
      'active',
      'https://www.dvago.pk/p/pulse-ribbed-dotted-delay-3s',
      'link_import',
      'Pulse Ribbed & Dotted Delay Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Pulse Ribbed & Dotted Delay Condoms (Pack of 3) for Rs. 240 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/19749.png', 0, 'Pulse Ribbed & Dotted Delay Condoms (Pack of 3)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Pulse Ribbed & Dotted Delay Condoms (Pack of 3)',
      description = 'Pulse Ribbed & Dotted Delay condoms combine raised texture ribs and stimulating dots with special delaying lubricant to enhance sensation for her while prolonging performance for him. High-grade natural latex crafted to international safety specifications. Dispatched in unbranded, discreet packaging across Pakistan with Cash on Delivery.',
      price = 240,
      compare_at_price = 280,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'PULSE',
      seo_title = 'Pulse Ribbed & Dotted Delay Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Pulse Ribbed & Dotted Delay Condoms (Pack of 3) for Rs. 240 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'ok-dotted-condoms';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'OK Dotted Textured Condoms (Pack of 3)',
      'ok-dotted-condoms',
      'OK Dotted condoms feature hundreds of raised tactile dots distributed evenly across the shaft for elevated stimulation and passion during intimate moments. Electronically tested to ensure foolproof safety, elasticity, and dependable protection. Plain brown box delivery with zero advance payment.',
      160,
      200,
      'c0000000-0000-0000-0000-000000000014',
      'OK',
      'SKU-SW-102',
      50,
      'active',
      'https://www.dvago.pk/p/ok-dotted-condoms',
      'link_import',
      'OK Dotted Textured Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic OK Dotted Textured Condoms (Pack of 3) for Rs. 160 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/dvago-products-images/ok-dotted-condoms.webp', 0, 'OK Dotted Textured Condoms (Pack of 3)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'OK Dotted Textured Condoms (Pack of 3)',
      description = 'OK Dotted condoms feature hundreds of raised tactile dots distributed evenly across the shaft for elevated stimulation and passion during intimate moments. Electronically tested to ensure foolproof safety, elasticity, and dependable protection. Plain brown box delivery with zero advance payment.',
      price = 160,
      compare_at_price = 200,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'OK',
      seo_title = 'OK Dotted Textured Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic OK Dotted Textured Condoms (Pack of 3) for Rs. 160 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'lifestyle-endurance-delay-1s';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Lifestyles Endurance Climax Control Condoms (Pack of 3)',
      'lifestyle-endurance-delay-1s',
      'Lifestyles Endurance condoms are engineered with climax-control lubricant to help sustain staying power without sacrificing sensation. Features ultra-smooth silicone lubrication and premium natural latex. Delivered in complete privacy with tamper-evident, unmarked boxes via Cash on Delivery.',
      420,
      480,
      'c0000000-0000-0000-0000-000000000014',
      'LIFESTYLES',
      'SKU-SW-103',
      50,
      'active',
      'https://www.dvago.pk/p/lifestyle-endurance-delay-1s',
      'link_import',
      'Lifestyles Endurance Climax Control Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Lifestyles Endurance Climax Control Condoms (Pack of 3) for Rs. 420 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/dvago-products-images/lifestyle-endurance-delay-1s.webp', 0, 'Lifestyles Endurance Climax Control Condoms (Pack of 3)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Lifestyles Endurance Climax Control Condoms (Pack of 3)',
      description = 'Lifestyles Endurance condoms are engineered with climax-control lubricant to help sustain staying power without sacrificing sensation. Features ultra-smooth silicone lubrication and premium natural latex. Delivered in complete privacy with tamper-evident, unmarked boxes via Cash on Delivery.',
      price = 420,
      compare_at_price = 480,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'LIFESTYLES',
      seo_title = 'Lifestyles Endurance Climax Control Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Lifestyles Endurance Climax Control Condoms (Pack of 3) for Rs. 420 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'durex-invisible-extra-thin-condom-pack-of-3';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Durex Invisible Extra Thin Condoms (Pack of 3)',
      'durex-invisible-extra-thin-condom-pack-of-3',
      'Durex Invisible represents the thinnest condom line designed by Durex, crafted to maximize sensitivity and skin-to-skin feeling while upholding rigorous safety benchmarks. Lubricated, straight-walled, and teat-ended for effortless application. Shipped in confidential, plain packaging with COD across Pakistan.',
      540,
      620,
      'c0000000-0000-0000-0000-000000000014',
      'DUREX',
      'SKU-SW-104',
      50,
      'active',
      'https://www.dvago.pk/p/durex-invisible-extra-thin-condom-pack-of-3',
      'link_import',
      'Durex Invisible Extra Thin Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Durex Invisible Extra Thin Condoms (Pack of 3) for Rs. 540 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/1000000015985.png', 0, 'Durex Invisible Extra Thin Condoms (Pack of 3)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Durex Invisible Extra Thin Condoms (Pack of 3)',
      description = 'Durex Invisible represents the thinnest condom line designed by Durex, crafted to maximize sensitivity and skin-to-skin feeling while upholding rigorous safety benchmarks. Lubricated, straight-walled, and teat-ended for effortless application. Shipped in confidential, plain packaging with COD across Pakistan.',
      price = 540,
      compare_at_price = 620,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'DUREX',
      seo_title = 'Durex Invisible Extra Thin Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Durex Invisible Extra Thin Condoms (Pack of 3) for Rs. 540 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'durex-play-tingle-lube-50ml-gel';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Durex Play Tingle Sensual Lubricant Gel (50ml)',
      'durex-play-tingle-lube-50ml-gel',
      'Durex Play Tingle is a silky, water-based personal lubricant that produces an exciting tingling and warming sensation on contact. Non-greasy, non-staining, and safe to use with all natural latex and polyisoprene condoms. Formulated to alleviate intimate dryness and heighten pleasure. Shipped in completely discreet parcels.',
      1250,
      1450,
      'c0000000-0000-0000-0000-000000000014',
      'DUREX',
      'SKU-SW-105',
      50,
      'active',
      'https://www.dvago.pk/p/durex-play-tingle-lube-50ml-gel',
      'link_import',
      'Durex Play Tingle Sensual Lubricant Gel (50ml) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Durex Play Tingle Sensual Lubricant Gel (50ml) for Rs. 1250 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/1000000015980.png', 0, 'Durex Play Tingle Sensual Lubricant Gel (50ml)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Durex Play Tingle Sensual Lubricant Gel (50ml)',
      description = 'Durex Play Tingle is a silky, water-based personal lubricant that produces an exciting tingling and warming sensation on contact. Non-greasy, non-staining, and safe to use with all natural latex and polyisoprene condoms. Formulated to alleviate intimate dryness and heighten pleasure. Shipped in completely discreet parcels.',
      price = 1250,
      compare_at_price = 1450,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'DUREX',
      seo_title = 'Durex Play Tingle Sensual Lubricant Gel (50ml) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Durex Play Tingle Sensual Lubricant Gel (50ml) for Rs. 1250 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'bareback-ultra-thin-3s';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Bareback Ultra Thin Sensitive Condoms (Pack of 3)',
      'bareback-ultra-thin-3s',
      'Bareback Ultra Thin condoms are designed for couples desiring an authentic, natural sensation without compromising dependable defense. Crafted from premium natural latex with smooth lubrication for a seamless, natural feel. Guaranteed discreet nationwide shipping with Cash on Delivery.',
      320,
      370,
      'c0000000-0000-0000-0000-000000000014',
      'BAREBACK',
      'SKU-SW-106',
      50,
      'active',
      'https://www.dvago.pk/p/bareback-ultra-thin-3s',
      'link_import',
      'Bareback Ultra Thin Sensitive Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Bareback Ultra Thin Sensitive Condoms (Pack of 3) for Rs. 320 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/dvago-products-images/bareback-ultra-thin-3s.webp', 0, 'Bareback Ultra Thin Sensitive Condoms (Pack of 3)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Bareback Ultra Thin Sensitive Condoms (Pack of 3)',
      description = 'Bareback Ultra Thin condoms are designed for couples desiring an authentic, natural sensation without compromising dependable defense. Crafted from premium natural latex with smooth lubrication for a seamless, natural feel. Guaranteed discreet nationwide shipping with Cash on Delivery.',
      price = 320,
      compare_at_price = 370,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'BAREBACK',
      seo_title = 'Bareback Ultra Thin Sensitive Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Bareback Ultra Thin Sensitive Condoms (Pack of 3) for Rs. 320 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'durex-extended-pleasure-condom-pack-of-12';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Durex Extended Pleasure Condoms (Economy Pack of 12)',
      'durex-extended-pleasure-condom-pack-of-12',
      'Durex Extended Pleasure 12-pack value box provides long-lasting climax control with benzocaine-infused inner lubricant. Perfect for ongoing protection with genuine Durex quality and dermatological assurance. Delivered in confidential, plain brown boxes to any city in Pakistan.',
      1650,
      1890,
      'c0000000-0000-0000-0000-000000000014',
      'DUREX',
      'SKU-SW-107',
      50,
      'active',
      'https://www.dvago.pk/p/durex-extended-pleasure-condom-pack-of-12',
      'link_import',
      'Durex Extended Pleasure Condoms (Economy Pack of 12) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Durex Extended Pleasure Condoms (Economy Pack of 12) for Rs. 1650 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/1000000015982.png', 0, 'Durex Extended Pleasure Condoms (Economy Pack of 12)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Durex Extended Pleasure Condoms (Economy Pack of 12)',
      description = 'Durex Extended Pleasure 12-pack value box provides long-lasting climax control with benzocaine-infused inner lubricant. Perfect for ongoing protection with genuine Durex quality and dermatological assurance. Delivered in confidential, plain brown boxes to any city in Pakistan.',
      price = 1650,
      compare_at_price = 1890,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'DUREX',
      seo_title = 'Durex Extended Pleasure Condoms (Economy Pack of 12) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Durex Extended Pleasure Condoms (Economy Pack of 12) for Rs. 1650 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'durex-play-very-cherry-lubricant-50ml';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Durex Play Very Cherry Flavoured Pleasure Lube (50ml)',
      'durex-play-very-cherry-lubricant-50ml',
      'Durex Play Very Cherry is an enticing, sugar-free fruity personal lubricant that adds a sweet aroma and smooth glide to foreplay and intercourse. Water-soluble, condom-compatible, and gentle on intimate skin. Shipped anonymously in unmarked outer packaging.',
      1250,
      1450,
      'c0000000-0000-0000-0000-000000000014',
      'DUREX',
      'SKU-SW-108',
      50,
      'active',
      'https://www.dvago.pk/p/durex-play-very-cherry-lubricant-50ml',
      'link_import',
      'Durex Play Very Cherry Flavoured Pleasure Lube (50ml) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Durex Play Very Cherry Flavoured Pleasure Lube (50ml) for Rs. 1250 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/1000000016464.png', 0, 'Durex Play Very Cherry Flavoured Pleasure Lube (50ml)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Durex Play Very Cherry Flavoured Pleasure Lube (50ml)',
      description = 'Durex Play Very Cherry is an enticing, sugar-free fruity personal lubricant that adds a sweet aroma and smooth glide to foreplay and intercourse. Water-soluble, condom-compatible, and gentle on intimate skin. Shipped anonymously in unmarked outer packaging.',
      price = 1250,
      compare_at_price = 1450,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'DUREX',
      seo_title = 'Durex Play Very Cherry Flavoured Pleasure Lube (50ml) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Durex Play Very Cherry Flavoured Pleasure Lube (50ml) for Rs. 1250 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'rough-rider-studded-3s';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Rough Rider Studded Premium Condoms (Pack of 3)',
      'rough-rider-studded-3s',
      'Rough Rider Studded condoms feature hundreds of prominent rubber studs engineered specifically to maximize friction and sensory thrill. Made from superior natural rubber latex with reservoir tip and gentle lubricant. Sourced from authorized suppliers and dispatched in plain discreet packaging.',
      380,
      440,
      'c0000000-0000-0000-0000-000000000014',
      'ROUGH RIDER',
      'SKU-SW-109',
      50,
      'active',
      'https://www.dvago.pk/p/rough-rider-studded-3s',
      'link_import',
      'Rough Rider Studded Premium Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Rough Rider Studded Premium Condoms (Pack of 3) for Rs. 380 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/dvago-products-images/rough-rider-studded-3s.jpg', 0, 'Rough Rider Studded Premium Condoms (Pack of 3)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Rough Rider Studded Premium Condoms (Pack of 3)',
      description = 'Rough Rider Studded condoms feature hundreds of prominent rubber studs engineered specifically to maximize friction and sensory thrill. Made from superior natural rubber latex with reservoir tip and gentle lubricant. Sourced from authorized suppliers and dispatched in plain discreet packaging.',
      price = 380,
      compare_at_price = 440,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'ROUGH RIDER',
      seo_title = 'Rough Rider Studded Premium Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Rough Rider Studded Premium Condoms (Pack of 3) for Rs. 380 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'pulse-dotted-premium';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Pulse Dotted Premium Pleasure Condoms (Pack of 3)',
      'pulse-dotted-premium',
      'Pulse Dotted condoms provide intense tactile pleasure with raised microspheres throughout the surface. Rigorously tested against international ISO quality metrics for tear-resistance and security. Order online with full privacy and Cash on Delivery.',
      240,
      280,
      'c0000000-0000-0000-0000-000000000014',
      'PULSE',
      'SKU-SW-110',
      50,
      'active',
      'https://www.dvago.pk/p/pulse-dotted-premium',
      'link_import',
      'Pulse Dotted Premium Pleasure Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Pulse Dotted Premium Pleasure Condoms (Pack of 3) for Rs. 240 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/19748.png', 0, 'Pulse Dotted Premium Pleasure Condoms (Pack of 3)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Pulse Dotted Premium Pleasure Condoms (Pack of 3)',
      description = 'Pulse Dotted condoms provide intense tactile pleasure with raised microspheres throughout the surface. Rigorously tested against international ISO quality metrics for tear-resistance and security. Order online with full privacy and Cash on Delivery.',
      price = 240,
      compare_at_price = 280,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'PULSE',
      seo_title = 'Pulse Dotted Premium Pleasure Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Pulse Dotted Premium Pleasure Condoms (Pack of 3) for Rs. 240 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'pulse-delay-premium-3s';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Pulse Delay Climax Control Condoms (Pack of 3)',
      'pulse-delay-premium-3s',
      'Pulse Delay condoms incorporate an active prolonging formula on the interior tip to help men manage timing and enhance intimate endurance. Form-fitting contour for natural comfort. Dispatched in unmarked parcels with zero advance payment.',
      240,
      280,
      'c0000000-0000-0000-0000-000000000014',
      'PULSE',
      'SKU-SW-111',
      50,
      'active',
      'https://www.dvago.pk/p/pulse-delay-premium-3s',
      'link_import',
      'Pulse Delay Climax Control Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Pulse Delay Climax Control Condoms (Pack of 3) for Rs. 240 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/19750.png', 0, 'Pulse Delay Climax Control Condoms (Pack of 3)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Pulse Delay Climax Control Condoms (Pack of 3)',
      description = 'Pulse Delay condoms incorporate an active prolonging formula on the interior tip to help men manage timing and enhance intimate endurance. Form-fitting contour for natural comfort. Dispatched in unmarked parcels with zero advance payment.',
      price = 240,
      compare_at_price = 280,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'PULSE',
      seo_title = 'Pulse Delay Climax Control Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Pulse Delay Climax Control Condoms (Pack of 3) for Rs. 240 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'ok-gold-skin-to-skin-3s';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'OK Gold Skin-to-Skin Ultra Sensitive Condoms (Pack of 3)',
      'ok-gold-skin-to-skin-3s',
      'OK Gold Skin-to-Skin condoms deliver an ultra-fine latex membrane for elevated closeness and authentic skin warmth. Pre-lubricated with a reservoir tip, offering dependable contraceptive and infection protection. Shipped confidentially across Pakistan.',
      190,
      230,
      'c0000000-0000-0000-0000-000000000014',
      'OK',
      'SKU-SW-112',
      50,
      'active',
      'https://www.dvago.pk/p/ok-gold-skin-to-skin-3s',
      'link_import',
      'OK Gold Skin-to-Skin Ultra Sensitive Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic OK Gold Skin-to-Skin Ultra Sensitive Condoms (Pack of 3) for Rs. 190 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/dvago-products-images/ok-gold-skin-to-skin-3s.webp', 0, 'OK Gold Skin-to-Skin Ultra Sensitive Condoms (Pack of 3)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'OK Gold Skin-to-Skin Ultra Sensitive Condoms (Pack of 3)',
      description = 'OK Gold Skin-to-Skin condoms deliver an ultra-fine latex membrane for elevated closeness and authentic skin warmth. Pre-lubricated with a reservoir tip, offering dependable contraceptive and infection protection. Shipped confidentially across Pakistan.',
      price = 190,
      compare_at_price = 230,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'OK',
      seo_title = 'OK Gold Skin-to-Skin Ultra Sensitive Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic OK Gold Skin-to-Skin Ultra Sensitive Condoms (Pack of 3) for Rs. 190 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'durex-extra-safe-condom-pack-of-3';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Durex Extra Safe Thick Barrier Condoms (Pack of 3)',
      'durex-extra-safe-condom-pack-of-3',
      'Durex Extra Safe condoms are slightly thicker and pre-lubricated with extra silicone lubricant to offer ultimate peace of mind and maximum reassurance without compromising intimacy comfort. Sourced from genuine Durex stock and delivered in sealed, plain packaging.',
      480,
      550,
      'c0000000-0000-0000-0000-000000000014',
      'DUREX',
      'SKU-SW-113',
      50,
      'active',
      'https://www.dvago.pk/p/durex-extra-safe-condom-pack-of-3',
      'link_import',
      'Durex Extra Safe Thick Barrier Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Durex Extra Safe Thick Barrier Condoms (Pack of 3) for Rs. 480 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/1000000010056.png', 0, 'Durex Extra Safe Thick Barrier Condoms (Pack of 3)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Durex Extra Safe Thick Barrier Condoms (Pack of 3)',
      description = 'Durex Extra Safe condoms are slightly thicker and pre-lubricated with extra silicone lubricant to offer ultimate peace of mind and maximum reassurance without compromising intimacy comfort. Sourced from genuine Durex stock and delivered in sealed, plain packaging.',
      price = 480,
      compare_at_price = 550,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'DUREX',
      seo_title = 'Durex Extra Safe Thick Barrier Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Durex Extra Safe Thick Barrier Condoms (Pack of 3) for Rs. 480 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'josh-classic-7s';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Josh Classic Natural Condoms (Pack of 7x4 / 28 Pieces)',
      'josh-classic-7s',
      'Josh Classic condoms offer dependable everyday protection with smooth natural latex and premium lubrication. This multi-pack provides unbeatable value, containing four 7-packs (28 total condoms) sealed for freshness. Shipped in private, discrete packaging with COD nationwide.',
      520,
      600,
      'c0000000-0000-0000-0000-000000000014',
      'JOSH',
      'SKU-SW-114',
      50,
      'active',
      'https://www.dvago.pk/p/josh-classic-7s',
      'link_import',
      'Josh Classic Natural Condoms (Pack of 7x4 / 28 Pieces) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Josh Classic Natural Condoms (Pack of 7x4 / 28 Pieces) for Rs. 520 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/classic%207x4.jpg', 0, 'Josh Classic Natural Condoms (Pack of 7x4 / 28 Pieces)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Josh Classic Natural Condoms (Pack of 7x4 / 28 Pieces)',
      description = 'Josh Classic condoms offer dependable everyday protection with smooth natural latex and premium lubrication. This multi-pack provides unbeatable value, containing four 7-packs (28 total condoms) sealed for freshness. Shipped in private, discrete packaging with COD nationwide.',
      price = 520,
      compare_at_price = 600,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'JOSH',
      seo_title = 'Josh Classic Natural Condoms (Pack of 7x4 / 28 Pieces) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Josh Classic Natural Condoms (Pack of 7x4 / 28 Pieces) for Rs. 520 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'durex-invisible-extra-thin-condom-pack-of-12';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Durex Invisible Extra Thin Condoms (Economy Pack of 12)',
      'durex-invisible-extra-thin-condom-pack-of-12',
      'Durex Invisible Extra Thin in a 12-condom economy pack provides the highest sensitivity in Durex latex engineering. Maximizes heat and sensory transmission while upholding the highest British and European safety standards. Dispatched in plain discreet boxing.',
      1850,
      2100,
      'c0000000-0000-0000-0000-000000000014',
      'DUREX',
      'SKU-SW-115',
      50,
      'active',
      'https://www.dvago.pk/p/durex-invisible-extra-thin-condom-pack-of-12',
      'link_import',
      'Durex Invisible Extra Thin Condoms (Economy Pack of 12) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Durex Invisible Extra Thin Condoms (Economy Pack of 12) for Rs. 1850 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/15984.png', 0, 'Durex Invisible Extra Thin Condoms (Economy Pack of 12)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Durex Invisible Extra Thin Condoms (Economy Pack of 12)',
      description = 'Durex Invisible Extra Thin in a 12-condom economy pack provides the highest sensitivity in Durex latex engineering. Maximizes heat and sensory transmission while upholding the highest British and European safety standards. Dispatched in plain discreet boxing.',
      price = 1850,
      compare_at_price = 2100,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'DUREX',
      seo_title = 'Durex Invisible Extra Thin Condoms (Economy Pack of 12) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Durex Invisible Extra Thin Condoms (Economy Pack of 12) for Rs. 1850 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'skyn-orignal-non-latex-3s';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Skyn Original Polyisoprene Non-Latex Condoms (Pack of 3)',
      'skyn-orignal-non-latex-3s',
      'Skyn Original condoms are made from revolutionary SKYNFEEL™ polyisoprene—a completely non-latex synthetic material that is noticeably softer and more natural to the touch. Ideal for users with latex allergies or sensitivities. Shipped discreetly with zero advance payment.',
      890,
      990,
      'c0000000-0000-0000-0000-000000000014',
      'SKYN',
      'SKU-SW-116',
      50,
      'active',
      'https://www.dvago.pk/p/skyn-orignal-non-latex-3s',
      'link_import',
      'Skyn Original Polyisoprene Non-Latex Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Skyn Original Polyisoprene Non-Latex Condoms (Pack of 3) for Rs. 890 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/23171.jpg', 0, 'Skyn Original Polyisoprene Non-Latex Condoms (Pack of 3)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Skyn Original Polyisoprene Non-Latex Condoms (Pack of 3)',
      description = 'Skyn Original condoms are made from revolutionary SKYNFEEL™ polyisoprene—a completely non-latex synthetic material that is noticeably softer and more natural to the touch. Ideal for users with latex allergies or sensitivities. Shipped discreetly with zero advance payment.',
      price = 890,
      compare_at_price = 990,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'SKYN',
      seo_title = 'Skyn Original Polyisoprene Non-Latex Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Skyn Original Polyisoprene Non-Latex Condoms (Pack of 3) for Rs. 890 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'durex-mutual-pleasure-3s';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Durex Mutual Pleasure Ribbed & Delay Condoms (Pack of 3)',
      'durex-mutual-pleasure-3s',
      'Durex Mutual Pleasure condoms are designed for synchronized intimacy: ribs and raised dots speed her up while Performa™ climax-delaying lubricant inside slows him down. Tested dermatologically for safety and biocompatibility. Packaged in plain, discreet cartons with COD.',
      510,
      590,
      'c0000000-0000-0000-0000-000000000014',
      'DUREX',
      'SKU-SW-117',
      50,
      'active',
      'https://www.dvago.pk/p/durex-mutual-pleasure-3s',
      'link_import',
      'Durex Mutual Pleasure Ribbed & Delay Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      'Buy authentic Durex Mutual Pleasure Ribbed & Delay Condoms (Pack of 3) for Rs. 510 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/mutual%203%20pc.png', 0, 'Durex Mutual Pleasure Ribbed & Delay Condoms (Pack of 3)');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  else
    update public.products set
      title = 'Durex Mutual Pleasure Ribbed & Delay Condoms (Pack of 3)',
      description = 'Durex Mutual Pleasure condoms are designed for synchronized intimacy: ribs and raised dots speed her up while Performa™ climax-delaying lubricant inside slows him down. Tested dermatologically for safety and biocompatibility. Packaged in plain, discreet cartons with COD.',
      price = 510,
      compare_at_price = 590,
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = 'DUREX',
      seo_title = 'Durex Mutual Pleasure Ribbed & Delay Condoms (Pack of 3) — Buy Online in Pakistan | Zenbu.Store',
      seo_description = 'Buy authentic Durex Mutual Pleasure Ribbed & Delay Condoms (Pack of 3) for Rs. 510 with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.'
    where id = v_prod_id;
  end if;
end $$;
