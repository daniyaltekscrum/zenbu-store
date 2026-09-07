-- Migration 6: Import 31 Products from dvago.pk
-- Includes Baby Nutrition, Baby Diapers, and Adult Care categories

-- 1. Categories
insert into public.categories (id, name, slug, image_url)
values ('c0000000-0000-0000-0000-000000000011', 'Baby & Child Nutrition', 'baby-nutrition', 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80')
on conflict (id) do update set name = excluded.name, image_url = excluded.image_url;

insert into public.categories (id, name, slug, image_url)
values ('c0000000-0000-0000-0000-000000000012', 'Baby Diapers & Pants', 'baby-diapers', 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80')
on conflict (id) do update set name = excluded.name, image_url = excluded.image_url;

insert into public.categories (id, name, slug, image_url)
values ('c0000000-0000-0000-0000-000000000013', 'Adult Care & Incontinence', 'adult-care', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80')
on conflict (id) do update set name = excluded.name, image_url = excluded.image_url;

-- 2. Products, Images, and Variants

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'pediasure-vanilla-850g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Pediasure Triplesure Vanilla Milk Powder 850g',
      'pediasure-vanilla-850g',
      'PEDIASURE® Powder with New Triple Sure Formula. PediaSure Triple Sure is a complete, balanced nutritional supplement that’s scientifically formulated to support growth, promote immunity and help to build a healthy appetite. Its new triple-protein complex helps support growth and development . Now with added DHA to support brain and central nervous health. Sourced from official authorized distributors by ABBOTT NUTRITION. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      7100,
      8165,
      'c0000000-0000-0000-0000-000000000011',
      'ABBOTT NUTRITION',
      'SKU-PEDIASURE--100',
      50,
      'active',
      'https://www.dvago.pk/p/pediasure-vanilla-850g',
      'link_import',
      'Pediasure Triplesure Vanilla Milk Powder 850g — Buy Online with COD | Zenbu.Store',
      'Order Pediasure Triplesure Vanilla Milk Powder 850g at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/Pediasure%20Triplesure%20Vanilla%20Milk%20Powder%20850G.png', 0, 'Pediasure Triplesure Vanilla Milk Powder 850g');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'pediasure-chocolate-400g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Pediasure Triplesure Chocolate Milk Powder 400g',
      'pediasure-chocolate-400g',
      'PEDIASURE® Powder with New Triple Sure Formula. PediaSure Triple Sure is a complete, balanced nutritional supplement that’s scientifically formulated to support growth, promote immunity and help to build a healthy appetite. Its new triple-protein complex helps support growth and development . Now with added DHA to support brain and central nervous health. Sourced from official authorized distributors by ABBOTT NUTRITION. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      3515,
      4042,
      'c0000000-0000-0000-0000-000000000011',
      'ABBOTT NUTRITION',
      'SKU-PEDIASURE--101',
      50,
      'active',
      'https://www.dvago.pk/p/pediasure-chocolate-400g',
      'link_import',
      'Pediasure Triplesure Chocolate Milk Powder 400g — Buy Online with COD | Zenbu.Store',
      'Order Pediasure Triplesure Chocolate Milk Powder 400g at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/pediasure%20triplesure%20chocolate%20milk%20powder%20400G.png', 0, 'Pediasure Triplesure Chocolate Milk Powder 400g');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'pediasure-vanilla-400g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Pediasure Triplesure Vanilla Milk Powder 400g',
      'pediasure-vanilla-400g',
      'PEDIASURE® Powder with New Triple Sure Formula. PediaSure Triple Sure is a complete, balanced nutritional supplement that’s scientifically formulated to support growth, promote immunity and help to build a healthy appetite. Its new triple-protein complex helps support growth and development . Now with added DHA to support brain and central nervous health. Sourced from official authorized distributors by ABBOTT NUTRITION. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      3515,
      4042,
      'c0000000-0000-0000-0000-000000000011',
      'ABBOTT NUTRITION',
      'SKU-PEDIASURE--102',
      50,
      'active',
      'https://www.dvago.pk/p/pediasure-vanilla-400g',
      'link_import',
      'Pediasure Triplesure Vanilla Milk Powder 400g — Buy Online with COD | Zenbu.Store',
      'Order Pediasure Triplesure Vanilla Milk Powder 400g at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/dvago-products-images/pediasure-vanilla-400g.webp', 0, 'Pediasure Triplesure Vanilla Milk Powder 400g');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'pediasure-strawberry-850g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Pediasure Triplesure Strawberry Milk Powder 850g',
      'pediasure-strawberry-850g',
      'PEDIASURE® Powder with New Triple Sure Formula. PediaSure Triple Sure is a complete, balanced nutritional supplement that’s scientifically formulated to support growth, promote immunity and help to build a healthy appetite. Its new triple-protein complex helps support growth and development . Now with added DHA to support brain and central nervous health. Sourced from official authorized distributors by ABBOTT NUTRITION. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      7100,
      8165,
      'c0000000-0000-0000-0000-000000000011',
      'ABBOTT NUTRITION',
      'SKU-PEDIASURE--103',
      50,
      'active',
      'https://www.dvago.pk/p/pediasure-strawberry-850g',
      'link_import',
      'Pediasure Triplesure Strawberry Milk Powder 850g — Buy Online with COD | Zenbu.Store',
      'Order Pediasure Triplesure Strawberry Milk Powder 850g at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/10195-1.jpeg', 0, 'Pediasure Triplesure Strawberry Milk Powder 850g');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'pediasure-chocolate-850g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Pediasure Triplesure Chocolate Milk Powder 850g',
      'pediasure-chocolate-850g',
      'PEDIASURE® Powder with New Triple Sure Formula. PediaSure Triple Sure is a complete, balanced nutritional supplement that’s scientifically formulated to support growth, promote immunity and help to build a healthy appetite. Its new triple-protein complex helps support growth and development . Now with added DHA to support brain and central nervous health. Sourced from official authorized distributors by ABBOTT NUTRITION. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      7100,
      8165,
      'c0000000-0000-0000-0000-000000000011',
      'ABBOTT NUTRITION',
      'SKU-PEDIASURE--104',
      50,
      'active',
      'https://www.dvago.pk/p/pediasure-chocolate-850g',
      'link_import',
      'Pediasure Triplesure Chocolate Milk Powder 850g — Buy Online with COD | Zenbu.Store',
      'Order Pediasure Triplesure Chocolate Milk Powder 850g at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/Pediasure%20Triplesure%20Chocolate%20Milk%20Powder%20850G.png', 0, 'Pediasure Triplesure Chocolate Milk Powder 850g');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'enfagrow-a-stage-3-vanilla-400g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Enfagrow A+3 Milk Powder 380g',
      'enfagrow-a-stage-3-vanilla-400g',
      '(Mother’s Milk is the best for babies and helps in preventing diarrhea and illness) . Every pack of Enfagrow A+ Neuro Pro formula contains a unique blend of nutrients to support your child’s overall mental and physical development.Only Brand in Pakistan with the Breakthrough molecule MFGM (Milk Fat Globule Membrane) and Highest level of 360 DHA, gives 2X brain power and help meet recommended daily DHA intake*. Now with 2’-FL. Complemented with Iron and Zinc that help support your child’s natural defenses^. Prebiotic FOS, promotes growth of good Bifidus bacteria to help maintain a healthy digestive system. NO ADDED SUCROSE^ Zinc and iron support your child’s natural defenses for children up to 6 years of age.* FAO/WHO recommends daily dietary DHA intake of 10-12mg/kg body weight for children 12-24 months or 100-150mg DHA+EPA for children 2 years old and above. Reference: FAO 2010. Fats and fatty acids in human nutrition. Report of an expert consultation. FAO Food and Nutrition Paper no. 91. FAO:Rome. Sourced from official authorized distributors by Mead Johnson. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      3681.15,
      4233,
      'c0000000-0000-0000-0000-000000000011',
      'Mead Johnson',
      'SKU-ENFAGROW-A-105',
      50,
      'active',
      'https://www.dvago.pk/p/enfagrow-a-stage-3-vanilla-400g',
      'link_import',
      'Enfagrow A+3 Milk Powder 380g — Buy Online with COD | Zenbu.Store',
      'Order Enfagrow A+3 Milk Powder 380g at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/stage%203%2C%20380%20gm.png', 0, 'Enfagrow A+3 Milk Powder 380g');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'meiji-big-soft-pack-200g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'MEIJI BIG SOFT PACK 200G',
      'meiji-big-soft-pack-200g',
      'MEIJI BIG is designed to provide the nutritional support required for the healthy growth of children aged 1 and over.MEIJI BIG provides good quality protein required to support increasing needs of growing children. It includes 40% whey protein and an increased amount of sulfur-containing amino acids, such as cysteine.Meiji BIG is fortified with DHA (Docosahexaenoic acid) which plays a vital role in brain and retinal development.Meiji BIG includes Milk-phospholipids to promote concentration of DHA in the body.Meiji BIG contains a balanced ratio of a-linolenic acid (omega-3) and linoleic acid (omega-6), which are the precursors of docosahexaenioc acid (DHA) and arachidonic acid (ARA), respectively, and vital for cerebral and retinal development.Meiji BIG contains FOS (Fructo-oligosachharides) which can be utilized by intestinal bifidobacteria in infants and promotes growth of good bacteria. FOS also helps in inhibiting growth of pathogenic intestinal bacteria . Sourced from official authorized distributors by MEIJI. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      1062.04,
      1221,
      'c0000000-0000-0000-0000-000000000011',
      'MEIJI',
      'SKU-MEIJI-BIG--106',
      50,
      'active',
      'https://www.dvago.pk/p/meiji-big-soft-pack-200g',
      'link_import',
      'MEIJI BIG SOFT PACK 200G — Buy Online with COD | Zenbu.Store',
      'Order MEIJI BIG SOFT PACK 200G at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/18491.jpg', 0, 'MEIJI BIG SOFT PACK 200G');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'meiji-kid-plus-200g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'MEIJI KID PLUS 200G',
      'meiji-kid-plus-200g',
      'Meiji Kids plus is a high quality growing up formula, designed to provide the nutritional support required for the healthy growth of children aged 3 years and onwards. Well-balanced nutrition is essential during a childs rapid growth phase.Fortified with high quality protein and nutrition, essential for the physical foundation of child.Fortified with Calcium, essential for healthy teeth and bones.Contains sufficient amount of iron that plays important role in production of red blood cell and is an essential component of hemoglobin.Contains milk phospholipids derived from cows milk that is a good source of sphingomyelin. Sourced from official authorized distributors by MEIJI. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      1062.04,
      1221,
      'c0000000-0000-0000-0000-000000000011',
      'MEIJI',
      'SKU-MEIJI-KID--107',
      50,
      'active',
      'https://www.dvago.pk/p/meiji-kid-plus-200g',
      'link_import',
      'MEIJI KID PLUS 200G — Buy Online with COD | Zenbu.Store',
      'Order MEIJI KID PLUS 200G at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/18620.jpg', 0, 'MEIJI KID PLUS 200G');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'meiji-kid-plus-600g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'MEIJI KID PLUS 600G',
      'meiji-kid-plus-600g',
      'Meiji Kids plus is a high quality growing up formula, designed to provide the nutritional support required for the healthy growth of children aged 3 years and onwards. Well-balanced nutrition is essential during a childs rapid growth phase.Fortified with high quality protein and nutrition, essential for the physical foundation of child.Fortified with Calcium, essential for healthy teeth and bones.Contains sufficient amount of iron that plays important role in production of red blood cell and is an essential component of hemoglobin.Contains milk phospholipids derived from cows milk that is a good source of sphingomyelin. Sourced from official authorized distributors by MEIJI. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      2904.86,
      3341,
      'c0000000-0000-0000-0000-000000000011',
      'MEIJI',
      'SKU-MEIJI-KID--108',
      50,
      'active',
      'https://www.dvago.pk/p/meiji-kid-plus-600g',
      'link_import',
      'MEIJI KID PLUS 600G — Buy Online with COD | Zenbu.Store',
      'Order MEIJI KID PLUS 600G at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/18621.png', 0, 'MEIJI KID PLUS 600G');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'meiji-big-growing-up-formula-powdered-milk-400g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Meiji Big Milk Powder 400g',
      'meiji-big-growing-up-formula-powdered-milk-400g',
      'Mechico presents 100% soft silicone nipples. These nipples are BPA free & adheres to highest safety standards. The silicone nipples are designed to most carefully mimic natural feeding. Mechico Silicon Nipples 2 Pcs Sourced from official authorized distributors by MEIJI. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      2419.9,
      2783,
      'c0000000-0000-0000-0000-000000000011',
      'MEIJI',
      'SKU-MEIJI-BIG--109',
      50,
      'active',
      'https://www.dvago.pk/p/meiji-big-growing-up-formula-powdered-milk-400g',
      'link_import',
      'Meiji Big Milk Powder 400g — Buy Online with COD | Zenbu.Store',
      'Order Meiji Big Milk Powder 400g at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/09355-1.jpg', 0, 'Meiji Big Milk Powder 400g');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'meiji-big-growing-up-formula-powdered-milk-900g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Meiji Big Milk Powder 900g',
      'meiji-big-growing-up-formula-powdered-milk-900g',
      'MEIJI BIG is designed to provide the nutritional support required for the healthy growth of children aged 1 and over. MEIJI BIG provides good quality protein required to support increasing needs of growing children. It includes 40% whey protein and an increased amount of sulfur-containing amino acids, such as cysteine. Meiji BIG is fortified with DHA (Docosahexaenoic acid) which plays a vital role in brain and retinal development. Meiji BIG includes Milk-phospholipids to promote concentration of DHA in the body. Meiji BIG contains a balanced ratio of a-linolenic acid (omega-3) and linoleic acid (omega-6), which are the precursors of docosahexaenioc acid (DHA) and arachidonic acid (ARA), respectively, and vital for cerebral and retinal development. Meiji BIG contains FOS (Fructo-oligosachharides) which can be utilized by intestinal bifidobacteria in infants and promotes growth of good bacteria. FOS also helps in inhibiting growth of pathogenic intestinal bacteria . Sourced from official authorized distributors by MEIJI. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      5262.25,
      6052,
      'c0000000-0000-0000-0000-000000000011',
      'MEIJI',
      'SKU-MEIJI-BIG--110',
      50,
      'active',
      'https://www.dvago.pk/p/meiji-big-growing-up-formula-powdered-milk-900g',
      'link_import',
      'Meiji Big Milk Powder 900g — Buy Online with COD | Zenbu.Store',
      'Order Meiji Big Milk Powder 900g at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/Meiji%20Big%20Milk%20Powder%20900G.png', 0, 'Meiji Big Milk Powder 900g');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'meiji-fm-t-infant-formula-powdered-400g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Meiji FM-T Infant Formula Stage 1 Milk Powder 400g',
      'meiji-fm-t-infant-formula-powdered-400g',
      'Features : Meiji FMT is an infant formula recommended for age 0-6 months . Meiji FMT is fortified with DHA (Docosahexaenoic acid) which plays a vital role in brain and retinal development of infants.  Meiji FMT includes Milk-phospholipids to promote concentration of DHA in the body . Meiji FMT contains a balanced ratio of a-linolenic acid (omega-3) and linoleic acid (omega-6), which are the precursors of docosahexaenioc acid (DHA) and arachidonic acid (ARA), respectively, and vital for cerebral and retinal development . Meiji FMT contains nucleotides, which are present in mother’s milk, and are considered to strengthen the immune system . Meiji FMT contains FOS (Fructo-oligosachharides) which can be utilized by intestinal bifidobacteria in infants and promotes growth of good bacteria. FOS also helps in inhibiting growth of pathogenic intestinal bacteria . Also contains the proper amounts and a balanced ratio of other vitamins and minerals to promote the healthy growth of infants . MEIJI FM-T is granulated to dissolve easily. Sourced from official authorized distributors by MEIJI. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      2419.9,
      2783,
      'c0000000-0000-0000-0000-000000000011',
      'MEIJI',
      'SKU-MEIJI-FM-T-111',
      50,
      'active',
      'https://www.dvago.pk/p/meiji-fm-t-infant-formula-powdered-400g',
      'link_import',
      'Meiji FM-T Infant Formula Stage 1 Milk Powder 400g — Buy Online with COD | Zenbu.Store',
      'Order Meiji FM-T Infant Formula Stage 1 Milk Powder 400g at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/09357.jpg', 0, 'Meiji FM-T Infant Formula Stage 1 Milk Powder 400g');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'meiji-fm-t-infant-formula-powdered-900g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Meiji FM-T Infant Formula Stage 1 Milk Powder 900g',
      'meiji-fm-t-infant-formula-powdered-900g',
      'Meiji FMT is an infant formula recommended for age 0-6 months.Meiji FMT is fortified with DHA (Docosahexaenoic acid) which plays a vital role in brain and retinal development of infants.Meiji FMT includes Milk-phospholipids to promote concentration of DHA in the body.Meiji FMT contains a balanced ratio of a-linolenic acid (omega-3) and linoleic acid (omega-6), which are the precursors of docosahexaenioc acid (DHA) and arachidonic acid (ARA), respectively, and vital for cerebral and retinal development.Meiji FMT contains nucleotides, which are present in mother’s milk, and are considered to strengthen the immune system.Meiji FMT contains FOS (Fructo-oligosachharides) which can be utilized by intestinal bifidobacteria in infants and promotes growth of good bacteria. FOS also helps in inhibiting growth of pathogenic intestinal bacteriaAlso contains the proper amounts and a balanced ratio of other vitamins and minerals to promote the healthy growth of infants.MEIJI FM-T is granulated to dissolve easily. Sourced from official authorized distributors by MEIJI. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      5262.25,
      6052,
      'c0000000-0000-0000-0000-000000000011',
      'MEIJI',
      'SKU-MEIJI-FM-T-112',
      50,
      'active',
      'https://www.dvago.pk/p/meiji-fm-t-infant-formula-powdered-900g',
      'link_import',
      'Meiji FM-T Infant Formula Stage 1 Milk Powder 900g — Buy Online with COD | Zenbu.Store',
      'Order Meiji FM-T Infant Formula Stage 1 Milk Powder 900g at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/dvago-products-images/meiji-fm-t-infant-formula-powdered-900g.webp', 0, 'Meiji FM-T Infant Formula Stage 1 Milk Powder 900g');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'meiji-fu-follow-up-formula-powdered-milk-400g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Meiji FU Follow-Up Formula Milk Powder 400g',
      'meiji-fu-follow-up-formula-powdered-milk-400g',
      'Meiji FU is a follow up formula recommended for infants from 6 -12 months.Meiji FU is fortified with DHA (Docosahexaenoic acid) which plays a vital role in brain and retinal development of infants.Meiji FU includes Milk-phospholipids to promote concentration of DHA in the body.Meiji FU contains a balanced ratio of a-linolenic acid (omega-3) and linoleic acid (omega-6), which are the precursors of docosahexaenioc acid (DHA) and arachidonic acid (ARA), respectively, and vital for cerebral and retinal development.Meiji FU contains nucleotides, which are present in mother’s milk, and are considered to strengthen the immune system.Meiji FU contains FOS (Fructo-oligosachharides) which can be utilized by intestinal bifidobacteria in infants and promotes growth of good bacteria. FOS also helps in inhibiting growth of pathogenic intestinal bacteriaContains a balanced ratio of iron, calcium and other minerals that tend to be lacking in typical baby food.Contains proper amounts of natural ß-carotene, which is considered to be a vital antioxidant.MEIJI FU is granulated to dissolve easily. Sourced from official authorized distributors by MEIJI. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      2419.9,
      2783,
      'c0000000-0000-0000-0000-000000000011',
      'MEIJI',
      'SKU-MEIJI-FU-F-113',
      50,
      'active',
      'https://www.dvago.pk/p/meiji-fu-follow-up-formula-powdered-milk-400g',
      'link_import',
      'Meiji FU Follow-Up Formula Milk Powder 400g — Buy Online with COD | Zenbu.Store',
      'Order Meiji FU Follow-Up Formula Milk Powder 400g at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/09362-1.jpg', 0, 'Meiji FU Follow-Up Formula Milk Powder 400g');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'meiji-fu-follow-up-formula-powdered-milk-900g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Meiji FU Follow-Up Formula Stage 2 Milk Powder 900g',
      'meiji-fu-follow-up-formula-powdered-milk-900g',
      'Meiji FU is a follow up formula recommended for infants from 6 -12 months.Meiji FU is fortified with DHA (Docosahexaenoic acid) which plays a vital role in brain and retinal development of infants.Meiji FU includes Milk-phospholipids to promote concentration of DHA in the body.Meiji FU contains a balanced ratio of a-linolenic acid (omega-3) and linoleic acid (omega-6), which are the precursors of docosahexaenioc acid (DHA) and arachidonic acid (ARA), respectively, and vital for cerebral and retinal development.Meiji FU contains nucleotides, which are present in mother’s milk, and are considered to strengthen the immune system.Meiji FU contains FOS (Fructo-oligosachharides) which can be utilized by intestinal bifidobacteria in infants and promotes growth of good bacteria. FOS also helps in inhibiting growth of pathogenic intestinal bacteriaContains a balanced ratio of iron, calcium and other minerals that tend to be lacking in typical baby food.Contains proper amounts of natural ß-carotene, which is considered to be a vital antioxidant.MEIJI FU is granulated to dissolve easily. Sourced from official authorized distributors by MEIJI. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      5262.25,
      6052,
      'c0000000-0000-0000-0000-000000000011',
      'MEIJI',
      'SKU-MEIJI-FU-F-114',
      50,
      'active',
      'https://www.dvago.pk/p/meiji-fu-follow-up-formula-powdered-milk-900g',
      'link_import',
      'Meiji FU Follow-Up Formula Stage 2 Milk Powder 900g — Buy Online with COD | Zenbu.Store',
      'Order Meiji FU Follow-Up Formula Stage 2 Milk Powder 900g at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/dvago-products-images/meiji-fu-follow-up-formula-powdered-milk-900g.webp', 0, 'Meiji FU Follow-Up Formula Stage 2 Milk Powder 900g');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'meiji-lactoless-powdered-milk-350g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Meiji Lactoless Lactose Free Formula Milk Powder 350g',
      'meiji-lactoless-powdered-milk-350g',
      'Meiji Lactoless is a specialized formula recommended for infants and children who have a lactase deficiency or transient lactose intolerance.Meiji Lactoless is for infants and children who suffer from diarrhea or abdominal pains when consuming milk that contains lactose.Meiji Lactoless is:Lactose-freeEasily digestible and contains absorbable milk proteinFortified with taurine and cystineEnriched with well-balanced compound of linoleic acid and a-linolenic acid, which are essential fatty acidsFormulated with well-balanced mineralsSupplemented with appropriate vitamin content Sourced from official authorized distributors by MEIJI. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      2419.9,
      2783,
      'c0000000-0000-0000-0000-000000000011',
      'MEIJI',
      'SKU-MEIJI-LACT-115',
      50,
      'active',
      'https://www.dvago.pk/p/meiji-lactoless-powdered-milk-350g',
      'link_import',
      'Meiji Lactoless Lactose Free Formula Milk Powder 350g — Buy Online with COD | Zenbu.Store',
      'Order Meiji Lactoless Lactose Free Formula Milk Powder 350g at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/09356-1.jpg', 0, 'Meiji Lactoless Lactose Free Formula Milk Powder 350g');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'meiji-pre-powdered-milk-400g';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Meiji Pre Special Formula Milk Powder 400g',
      'meiji-pre-powdered-milk-400g',
      'Fortified with FOS (Fructo-oligosaccharides). FOS assists in bowel movements and improving the properties of the baby’s stool . Contains FOS, Nucleotides, Vitamin A and Zinc, which are considered to strengthen the immune system . Contains a balanced ratio of a-linolenic acid (omega-3) and linoleic acid (omega-6), which are the pre-cursors of docosahexaenoic acid (DHA) and arachidonic acid (ARA) respectively, and vital for cerebral and retinal development . Enhanced with suitable amounts of ß-carotene. Selenium, both of which are known antioxidants. Also contains suitable amounts and a balanced ratio of other vitamins and minerals to promote the healthy growth of rapidly-growing low birth weight infants . MEIJI PRE is granulated to dissolve easily . Sourced from official authorized distributors by MEIJI. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      2031.94,
      2337,
      'c0000000-0000-0000-0000-000000000011',
      'MEIJI',
      'SKU-MEIJI-PRE--116',
      50,
      'active',
      'https://www.dvago.pk/p/meiji-pre-powdered-milk-400g',
      'link_import',
      'Meiji Pre Special Formula Milk Powder 400g — Buy Online with COD | Zenbu.Store',
      'Order Meiji Pre Special Formula Milk Powder 400g at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/dvago-products-images/meiji-pre-powdered-milk-400g.webp', 0, 'Meiji Pre Special Formula Milk Powder 400g');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'bf-2-grow-300gm-box';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Morinaga BF-2 Follow Up Formula Milk Powder Soft Pack 300g',
      'bf-2-grow-300gm-box',
      'BF-2 is a follow-up formula designed for infants from 6 months onwards and for young children . BF-2 is formulated to supply essential nutrients that infants and children need. If breast milk is not adopted due to medical reason, BF-2 can be used as a nutritional supplement to complement weaning diet and cow€™s milk and helps prevent deficiency of nutrients during and even after the weaning period . Features : Lactoferrin, that helps in building immunity and provides defense against various diseases as well as promoting the intestinal (tummy) environment . Lactulose is a component of the lactose in milk, which is described as prebiotics, promotes to increase the number of Bifidobacteria in the human microbiota . Nucleotides, help in developing the digestive system and also enhances nutrient absorption . DHA, LA & ALA, enhances brain function, promotes the development of visual and retinal function and also prevents allergic diseases. Sourced from official authorized distributors by MORINAGA. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      1406.07,
      1617,
      'c0000000-0000-0000-0000-000000000011',
      'MORINAGA',
      'SKU-BF-2-GROW--117',
      50,
      'active',
      'https://www.dvago.pk/p/bf-2-grow-300gm-box',
      'link_import',
      'Morinaga BF-2 Follow Up Formula Milk Powder Soft Pack 300g — Buy Online with COD | Zenbu.Store',
      'Order Morinaga BF-2 Follow Up Formula Milk Powder Soft Pack 300g at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/dvago-products-images/bf-2-grow-300gm-box.webp', 0, 'Morinaga BF-2 Follow Up Formula Milk Powder Soft Pack 300g');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'canbebe-comfort-dry-baby-diapers-size-3-midi-28pcs';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Canbebe Comfort Dry Baby Diapers Size 3 Midi 28Pcs',
      'canbebe-comfort-dry-baby-diapers-size-3-midi-28pcs',
      'Soft and absorbent baby diapers designed for babies in Size 3 (Midi), typically suitable for 6–11 kg weight range . These diapers feature super-absorbent cores and a breathable outer layer to keep your baby dry, comfortable, and free from irritation. With secure fit and leak protection, they’re ideal for everyday use, naps, and playtime. Sourced from official authorized distributors by CANBEBE. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      1796.01,
      2065,
      'c0000000-0000-0000-0000-000000000012',
      'CANBEBE',
      'SKU-CANBEBE-CO-118',
      50,
      'active',
      'https://www.dvago.pk/p/canbebe-comfort-dry-baby-diapers-size-3-midi-28pcs',
      'link_import',
      'Canbebe Comfort Dry Baby Diapers Size 3 Midi 28Pcs — Buy Online with COD | Zenbu.Store',
      'Order Canbebe Comfort Dry Baby Diapers Size 3 Midi 28Pcs at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/Canbebe%20Comfort%20Dry%20Baby%20Diapers%20Size%203%20Midi%2028Pcs.png', 0, 'Canbebe Comfort Dry Baby Diapers Size 3 Midi 28Pcs');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'bona-papa-magic-eoc-e-large';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Bona Papa Magic Baby Diapers Extra Large size 5 36Pcs',
      'bona-papa-magic-eoc-e-large',
      'Bona Papa Baby diapers gives your child the comfort and freedom required to keep them active and happy. Its anatomical shape and quality material absorbs all the wetness leaving the baby dry, energetic and lively all day long. Get a Bona Papa diaper now and let your baby have fun and enjoy. Sourced from official authorized distributors by ANA & BATLA INDUSTRIES PVT LTD. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      1323.06,
      1522,
      'c0000000-0000-0000-0000-000000000012',
      'ANA & BATLA INDUSTRIES PVT LTD',
      'SKU-BONA-PAPA--119',
      50,
      'active',
      'https://www.dvago.pk/p/bona-papa-magic-eoc-e-large',
      'link_import',
      'Bona Papa Magic Baby Diapers Extra Large size 5 36Pcs — Buy Online with COD | Zenbu.Store',
      'Order Bona Papa Magic Baby Diapers Extra Large size 5 36Pcs at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/18408.jpg', 0, 'Bona Papa Magic Baby Diapers Extra Large size 5 36Pcs');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'bona-papa-magic-eco-large';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Bona Papa Magic Baby Diapers Large size 4 40Pcs',
      'bona-papa-magic-eco-large',
      'Bona Papa Baby diapers gives your child the comfort and freedom required to keep them active and happy. Its anatomical shape and quality material absorbs all the wetness leaving the baby dry, energetic and lively all day long. Get a Bona Papa diaper now and let your baby have fun and enjoy. Sourced from official authorized distributors by ANA & BATLA INDUSTRIES PVT LTD. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      1323.06,
      1522,
      'c0000000-0000-0000-0000-000000000012',
      'ANA & BATLA INDUSTRIES PVT LTD',
      'SKU-BONA-PAPA--120',
      50,
      'active',
      'https://www.dvago.pk/p/bona-papa-magic-eco-large',
      'link_import',
      'Bona Papa Magic Baby Diapers Large size 4 40Pcs — Buy Online with COD | Zenbu.Store',
      'Order Bona Papa Magic Baby Diapers Large size 4 40Pcs at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/18407.jpg', 0, 'Bona Papa Magic Baby Diapers Large size 4 40Pcs');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'bona-papa-magic-eco-medium-44pcs';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Bona Papa Magic Baby Diapers Medium size 3 44Pcs',
      'bona-papa-magic-eco-medium-44pcs',
      'Bona Papa Baby diapers gives your child the comfort and freedom required to keep them active and happy. Its anatomical shape and quality material absorbs all the wetness leaving the baby dry, energetic and lively all day long. Get a Bona Papa diaper now and let your baby have fun and enjoy. Sourced from official authorized distributors by ANA & BATLA INDUSTRIES PVT LTD. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      1323.06,
      1522,
      'c0000000-0000-0000-0000-000000000012',
      'ANA & BATLA INDUSTRIES PVT LTD',
      'SKU-BONA-PAPA--121',
      50,
      'active',
      'https://www.dvago.pk/p/bona-papa-magic-eco-medium-44pcs',
      'link_import',
      'Bona Papa Magic Baby Diapers Medium size 3 44Pcs — Buy Online with COD | Zenbu.Store',
      'Order Bona Papa Magic Baby Diapers Medium size 3 44Pcs at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/18406.jpg', 0, 'Bona Papa Magic Baby Diapers Medium size 3 44Pcs');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'sof-ped-adult-daiper-l';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Sofped Adult Diapers Size L 10Pcs',
      'sof-ped-adult-daiper-l',
      'Sofped premium adult diapers are efficient, comfortable and convenient. Sofped adult diapers have following product features to keep adult skin dry and active.Soft & breathable | Skin-smart cloth fabric | Refastenable closer tabs |Wetness indicator |Elastic leg cuffs | Maximum absorbency | 40-60 inches |100-150 cm | 10 pcs . Sourced from official authorized distributors by ANA & BATLA INDUSTRIES PVT LTD. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      1532.43,
      1762,
      'c0000000-0000-0000-0000-000000000013',
      'ANA & BATLA INDUSTRIES PVT LTD',
      'SKU-SOF-PED-AD-122',
      50,
      'active',
      'https://www.dvago.pk/p/sof-ped-adult-daiper-l',
      'link_import',
      'Sofped Adult Diapers Size L 10Pcs — Buy Online with COD | Zenbu.Store',
      'Order Sofped Adult Diapers Size L 10Pcs at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/21305.png', 0, 'Sofped Adult Diapers Size L 10Pcs');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'diaper-jumbo-large-pack-80pcs';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Shield Baby Diapers Large Pack Jumbo size 4 80Pcs',
      'diaper-jumbo-large-pack-80pcs',
      'DIAPER JUMBO LARGE PACK 80 PCS Sourced from official authorized distributors by SHIELD CORPORATION. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      2445.02,
      2812,
      'c0000000-0000-0000-0000-000000000012',
      'SHIELD CORPORATION',
      'SKU-DIAPER-JUM-123',
      50,
      'active',
      'https://www.dvago.pk/p/diaper-jumbo-large-pack-80pcs',
      'link_import',
      'Shield Baby Diapers Large Pack Jumbo size 4 80Pcs — Buy Online with COD | Zenbu.Store',
      'Order Shield Baby Diapers Large Pack Jumbo size 4 80Pcs at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/25095.webp', 0, 'Shield Baby Diapers Large Pack Jumbo size 4 80Pcs');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'diaper-jumbo-medium-88pcs';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Shield Baby Diaper Jumbo Medium size 3 88Pcs',
      'diaper-jumbo-medium-88pcs',
      'DIAPER JUMBO MEDIUM 88PCS Sourced from official authorized distributors by SHIELD CORPORATION. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      2445.02,
      2812,
      'c0000000-0000-0000-0000-000000000012',
      'SHIELD CORPORATION',
      'SKU-DIAPER-JUM-124',
      50,
      'active',
      'https://www.dvago.pk/p/diaper-jumbo-medium-88pcs',
      'link_import',
      'Shield Baby Diaper Jumbo Medium size 3 88Pcs — Buy Online with COD | Zenbu.Store',
      'Order Shield Baby Diaper Jumbo Medium size 3 88Pcs at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/25096.webp', 0, 'Shield Baby Diaper Jumbo Medium size 3 88Pcs');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'canbebe-baby-diapers-mini-jumbo-size2-70pcs';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Canbebe Baby Diaper Mini Jumbo Size 2 70Pcs',
      'canbebe-baby-diapers-mini-jumbo-size2-70pcs',
      'Let your baby enjoy hours of uninterrupted sleep and play with Canbebe diapers! The super absorbent layer keeps your little one dry, the elastic tape prevents leakages by covering the baby''s belly and gives total freedom to move around. Canbebe is suitable for all skin types, which keeps your baby rash-free and happy. Make sure you buy the right diaper size according to your baby''s weight. Sourced from official authorized distributors by CANBEBE. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      2592.15,
      2981,
      'c0000000-0000-0000-0000-000000000012',
      'CANBEBE',
      'SKU-CANBEBE-BA-125',
      50,
      'active',
      'https://www.dvago.pk/p/canbebe-baby-diapers-mini-jumbo-size2-70pcs',
      'link_import',
      'Canbebe Baby Diaper Mini Jumbo Size 2 70Pcs — Buy Online with COD | Zenbu.Store',
      'Order Canbebe Baby Diaper Mini Jumbo Size 2 70Pcs at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/1000000024612.png', 0, 'Canbebe Baby Diaper Mini Jumbo Size 2 70Pcs');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'canbebe-maxi-plus-46p';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Canbebe Baby Diapers Maxi Plus size 4+ 46Pcs',
      'canbebe-maxi-plus-46p',
      'Let your baby enjoy hours of uninterrupted sleep and play with Canbebe ComfortDry diapers! The super-absorbent layer of our diaper keeps your little one dry and fits your baby perfectly. The elastic tape prevents leakages by covering the baby''s belly and gives total freedom to move around. Canbebe ComfortDry is suitable for all skin types, which keeps your baby rash-free and happy. Make sure you buy the right diaper size according to your baby''s weight. Sourced from official authorized distributors by CANBEBE. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      2592.15,
      2981,
      'c0000000-0000-0000-0000-000000000012',
      'CANBEBE',
      'SKU-CANBEBE-MA-126',
      50,
      'active',
      'https://www.dvago.pk/p/canbebe-maxi-plus-46p',
      'link_import',
      'Canbebe Baby Diapers Maxi Plus size 4+ 46Pcs — Buy Online with COD | Zenbu.Store',
      'Order Canbebe Baby Diapers Maxi Plus size 4+ 46Pcs at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/24615_1.webp', 0, 'Canbebe Baby Diapers Maxi Plus size 4+ 46Pcs');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'bona-papa-super-junior-xxl-1s';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Bona Papa Baby Diapers Super Junior XXL size 6 50Pcs',
      'bona-papa-super-junior-xxl-1s',
      'Bona Papa  Baby diapers gives your child the comfort and freedom required to keep them active and happy. Its anatomical shape and quality material absorbs all the wetness leaving the baby dry, energetic and lively all day long. Get a Bona Papa diaper now and let your baby have fun and enjoy. Sourced from official authorized distributors by ANA & BATLA INDUSTRIES PVT LTD. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      1509.01,
      1735,
      'c0000000-0000-0000-0000-000000000012',
      'ANA & BATLA INDUSTRIES PVT LTD',
      'SKU-BONA-PAPA--127',
      50,
      'active',
      'https://www.dvago.pk/p/bona-papa-super-junior-xxl-1s',
      'link_import',
      'Bona Papa Baby Diapers Super Junior XXL size 6 50Pcs — Buy Online with COD | Zenbu.Store',
      'Order Bona Papa Baby Diapers Super Junior XXL size 6 50Pcs at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/dvago-products-images/bona-papa-super-junior-xxl-1s.webp', 0, 'Bona Papa Baby Diapers Super Junior XXL size 6 50Pcs');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'bona-papa-super-maxi-l-1s';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Bona Papa Baby Diapers Super Maxi Large Size 4 50Pcs',
      'bona-papa-super-maxi-l-1s',
      'Bona Papa Baby diapers gives your child the comfort and freedom required to keep them active and happy. Its anatomical shape and quality material absorbs all the wetness leaving the baby dry, energetic and lively all day long. Get a Bona Papa diaper now and let your baby have fun and enjoy. Sourced from official authorized distributors by ANA & BATLA INDUSTRIES PVT LTD. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      1293,
      1487,
      'c0000000-0000-0000-0000-000000000012',
      'ANA & BATLA INDUSTRIES PVT LTD',
      'SKU-BONA-PAPA--128',
      50,
      'active',
      'https://www.dvago.pk/p/bona-papa-super-maxi-l-1s',
      'link_import',
      'Bona Papa Baby Diapers Super Maxi Large Size 4 50Pcs — Buy Online with COD | Zenbu.Store',
      'Order Bona Papa Baby Diapers Super Maxi Large Size 4 50Pcs at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/dvago-products-images/bona-papa-super-maxi-l-1s.webp', 0, 'Bona Papa Baby Diapers Super Maxi Large Size 4 50Pcs');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'momse-jumbo-pants-xlarge-46s';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Momse Jumbo Pants Extra Large Size 5 46Pcs',
      'momse-jumbo-pants-xlarge-46s',
      'Superabsorbent and convenient diapers/pants for maintaining cleanliness and hygiene for up to 8 hours . Sourced from official authorized distributors by ANA & BATLA INDUSTRIES PVT LTD. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      1900.21,
      2185,
      'c0000000-0000-0000-0000-000000000012',
      'ANA & BATLA INDUSTRIES PVT LTD',
      'SKU-MOMSE-JUMB-129',
      50,
      'active',
      'https://www.dvago.pk/p/momse-jumbo-pants-xlarge-46s',
      'link_import',
      'Momse Jumbo Pants Extra Large Size 5 46Pcs — Buy Online with COD | Zenbu.Store',
      'Order Momse Jumbo Pants Extra Large Size 5 46Pcs at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/ProductsImages/Momse%20Jumbo%20Pants%20Extra%20Large%20Size%205%2046Pcs.png', 0, 'Momse Jumbo Pants Extra Large Size 5 46Pcs');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;

do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = 'molfix-baby-diapers-junior-size5-22s-twin';
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      'Molfix Baby Diapers Twin Pack Junior Size 5 22Pcs',
      'molfix-baby-diapers-junior-size5-22s-twin',
      'Key Features : Molfix Hypoallergenic baby nappies are dermatologically tested . Highly absorbent thanks to the double absorbent layers in the core . No leakage thanks to two elastic leak-proof barriers . Provides maximum comfort and freedom of movement thanks to its anatomical shape and ultra-elastic side bands. Soft Top sheet, which is friendly with your baby’s skin and very comfortable too. Sourced from official authorized distributors by HAYAT KIMYA PAKISTAN. Available for nationwide Cash on Delivery with guaranteed authenticity.',
      1879.72,
      2162,
      'c0000000-0000-0000-0000-000000000012',
      'HAYAT KIMYA PAKISTAN',
      'SKU-MOLFIX-BAB-130',
      50,
      'active',
      'https://www.dvago.pk/p/molfix-baby-diapers-junior-size5-22s-twin',
      'link_import',
      'Molfix Baby Diapers Twin Pack Junior Size 5 22Pcs — Buy Online with COD | Zenbu.Store',
      'Order Molfix Baby Diapers Twin Pack Junior Size 5 22Pcs at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.'
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, 'https://dvago-assets.s3.ap-southeast-1.amazonaws.com/dvago-products-images/molfix-baby-diapers-junior-size5-22s-twin.webp', 0, 'Molfix Baby Diapers Twin Pack Junior Size 5 22Pcs');

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, 50);
  end if;
end $$;
