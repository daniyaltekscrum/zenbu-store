import fs from 'fs';
import path from 'path';

const productsFile = path.resolve('data/dvago_products.json');
const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));

// Title and price refinement map
const refinements = {
  'durex-extended-pleasure-3s': {
    title: 'Durex Extended Pleasure Condoms (Pack of 3)',
    brand: 'DUREX',
    price: 480,
    compare_at_price: 550,
    desc: 'Durex Extended Pleasure condoms contain a special climax-control lubricant inside the teat that helps him last longer, extending intimacy and mutual enjoyment. Made from natural rubber latex, dermatologically tested, and 100% electronically inspected for maximum reliability. Sourced from authorized distribution and delivered in 100% discreet, plain-box packaging with nationwide Cash on Delivery.'
  },
  'pulse-ribbed-dotted-delay-3s': {
    title: 'Pulse Ribbed & Dotted Delay Condoms (Pack of 3)',
    brand: 'PULSE',
    price: 240,
    compare_at_price: 280,
    desc: 'Pulse Ribbed & Dotted Delay condoms combine raised texture ribs and stimulating dots with special delaying lubricant to enhance sensation for her while prolonging performance for him. High-grade natural latex crafted to international safety specifications. Dispatched in unbranded, discreet packaging across Pakistan with Cash on Delivery.'
  },
  'ok-dotted-condoms': {
    title: 'OK Dotted Textured Condoms (Pack of 3)',
    brand: 'OK',
    price: 160,
    compare_at_price: 200,
    desc: 'OK Dotted condoms feature hundreds of raised tactile dots distributed evenly across the shaft for elevated stimulation and passion during intimate moments. Electronically tested to ensure foolproof safety, elasticity, and dependable protection. Plain brown box delivery with zero advance payment.'
  },
  'lifestyle-endurance-delay-1s': {
    title: 'Lifestyles Endurance Climax Control Condoms (Pack of 3)',
    brand: 'LIFESTYLES',
    price: 420,
    compare_at_price: 480,
    desc: 'Lifestyles Endurance condoms are engineered with climax-control lubricant to help sustain staying power without sacrificing sensation. Features ultra-smooth silicone lubrication and premium natural latex. Delivered in complete privacy with tamper-evident, unmarked boxes via Cash on Delivery.'
  },
  'durex-invisible-extra-thin-condom-pack-of-3': {
    title: 'Durex Invisible Extra Thin Condoms (Pack of 3)',
    brand: 'DUREX',
    price: 540,
    compare_at_price: 620,
    desc: 'Durex Invisible represents the thinnest condom line designed by Durex, crafted to maximize sensitivity and skin-to-skin feeling while upholding rigorous safety benchmarks. Lubricated, straight-walled, and teat-ended for effortless application. Shipped in confidential, plain packaging with COD across Pakistan.'
  },
  'durex-play-tingle-lube-50ml-gel': {
    title: 'Durex Play Tingle Sensual Lubricant Gel (50ml)',
    brand: 'DUREX',
    price: 1250,
    compare_at_price: 1450,
    desc: 'Durex Play Tingle is a silky, water-based personal lubricant that produces an exciting tingling and warming sensation on contact. Non-greasy, non-staining, and safe to use with all natural latex and polyisoprene condoms. Formulated to alleviate intimate dryness and heighten pleasure. Shipped in completely discreet parcels.'
  },
  'bareback-ultra-thin-3s': {
    title: 'Bareback Ultra Thin Sensitive Condoms (Pack of 3)',
    brand: 'BAREBACK',
    price: 320,
    compare_at_price: 370,
    desc: 'Bareback Ultra Thin condoms are designed for couples desiring an authentic, natural sensation without compromising dependable defense. Crafted from premium natural latex with smooth lubrication for a seamless, natural feel. Guaranteed discreet nationwide shipping with Cash on Delivery.'
  },
  'durex-extended-pleasure-condom-pack-of-12': {
    title: 'Durex Extended Pleasure Condoms (Economy Pack of 12)',
    brand: 'DUREX',
    price: 1650,
    compare_at_price: 1890,
    desc: 'Durex Extended Pleasure 12-pack value box provides long-lasting climax control with benzocaine-infused inner lubricant. Perfect for ongoing protection with genuine Durex quality and dermatological assurance. Delivered in confidential, plain brown boxes to any city in Pakistan.'
  },
  'durex-play-very-cherry-lubricant-50ml': {
    title: 'Durex Play Very Cherry Flavoured Pleasure Lube (50ml)',
    brand: 'DUREX',
    price: 1250,
    compare_at_price: 1450,
    desc: 'Durex Play Very Cherry is an enticing, sugar-free fruity personal lubricant that adds a sweet aroma and smooth glide to foreplay and intercourse. Water-soluble, condom-compatible, and gentle on intimate skin. Shipped anonymously in unmarked outer packaging.'
  },
  'rough-rider-studded-3s': {
    title: 'Rough Rider Studded Premium Condoms (Pack of 3)',
    brand: 'ROUGH RIDER',
    price: 380,
    compare_at_price: 440,
    desc: 'Rough Rider Studded condoms feature hundreds of prominent rubber studs engineered specifically to maximize friction and sensory thrill. Made from superior natural rubber latex with reservoir tip and gentle lubricant. Sourced from authorized suppliers and dispatched in plain discreet packaging.'
  },
  'pulse-dotted-premium': {
    title: 'Pulse Dotted Premium Pleasure Condoms (Pack of 3)',
    brand: 'PULSE',
    price: 240,
    compare_at_price: 280,
    desc: 'Pulse Dotted condoms provide intense tactile pleasure with raised microspheres throughout the surface. Rigorously tested against international ISO quality metrics for tear-resistance and security. Order online with full privacy and Cash on Delivery.'
  },
  'pulse-delay-premium-3s': {
    title: 'Pulse Delay Climax Control Condoms (Pack of 3)',
    brand: 'PULSE',
    price: 240,
    compare_at_price: 280,
    desc: 'Pulse Delay condoms incorporate an active prolonging formula on the interior tip to help men manage timing and enhance intimate endurance. Form-fitting contour for natural comfort. Dispatched in unmarked parcels with zero advance payment.'
  },
  'ok-gold-skin-to-skin-3s': {
    title: 'OK Gold Skin-to-Skin Ultra Sensitive Condoms (Pack of 3)',
    brand: 'OK',
    price: 190,
    compare_at_price: 230,
    desc: 'OK Gold Skin-to-Skin condoms deliver an ultra-fine latex membrane for elevated closeness and authentic skin warmth. Pre-lubricated with a reservoir tip, offering dependable contraceptive and infection protection. Shipped confidentially across Pakistan.'
  },
  'durex-extra-safe-condom-pack-of-3': {
    title: 'Durex Extra Safe Thick Barrier Condoms (Pack of 3)',
    brand: 'DUREX',
    price: 480,
    compare_at_price: 550,
    desc: 'Durex Extra Safe condoms are slightly thicker and pre-lubricated with extra silicone lubricant to offer ultimate peace of mind and maximum reassurance without compromising intimacy comfort. Sourced from genuine Durex stock and delivered in sealed, plain packaging.'
  },
  'josh-classic-7s': {
    title: 'Josh Classic Natural Condoms (Pack of 7x4 / 28 Pieces)',
    brand: 'JOSH',
    price: 520,
    compare_at_price: 600,
    desc: 'Josh Classic condoms offer dependable everyday protection with smooth natural latex and premium lubrication. This multi-pack provides unbeatable value, containing four 7-packs (28 total condoms) sealed for freshness. Shipped in private, discrete packaging with COD nationwide.'
  },
  'durex-invisible-extra-thin-condom-pack-of-12': {
    title: 'Durex Invisible Extra Thin Condoms (Economy Pack of 12)',
    brand: 'DUREX',
    price: 1850,
    compare_at_price: 2100,
    desc: 'Durex Invisible Extra Thin in a 12-condom economy pack provides the highest sensitivity in Durex latex engineering. Maximizes heat and sensory transmission while upholding the highest British and European safety standards. Dispatched in plain discreet boxing.'
  },
  'skyn-orignal-non-latex-3s': {
    title: 'Skyn Original Polyisoprene Non-Latex Condoms (Pack of 3)',
    brand: 'SKYN',
    price: 890,
    compare_at_price: 990,
    desc: 'Skyn Original condoms are made from revolutionary SKYNFEEL™ polyisoprene—a completely non-latex synthetic material that is noticeably softer and more natural to the touch. Ideal for users with latex allergies or sensitivities. Shipped discreetly with zero advance payment.'
  },
  'durex-mutual-pleasure-3s': {
    title: 'Durex Mutual Pleasure Ribbed & Delay Condoms (Pack of 3)',
    brand: 'DUREX',
    price: 510,
    compare_at_price: 590,
    desc: 'Durex Mutual Pleasure condoms are designed for synchronized intimacy: ribs and raised dots speed her up while Performa™ climax-delaying lubricant inside slows him down. Tested dermatologically for safety and biocompatibility. Packaged in plain, discreet cartons with COD.'
  }
};

// Update products in dvago_products.json
let updatedCount = 0;
products.forEach(p => {
  if (p.category.slug === 'sexual-wellness' && refinements[p.slug]) {
    const ref = refinements[p.slug];
    p.title = ref.title;
    p.brand = ref.brand;
    p.price = ref.price;
    p.compare_at_price = ref.compare_at_price;
    p.description = ref.desc;
    if (!p.image || p.image === '/logo/1.png') {
      p.image = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80';
    }
    updatedCount++;
  }
});

fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), 'utf8');
console.log(`Updated ${updatedCount} sexual wellness products in data/dvago_products.json`);

// Now generate SQL migration
const swProducts = products.filter(p => p.category.slug === 'sexual-wellness');

function escapeSql(str) {
  if (!str) return "''";
  return "'" + str.replace(/'/g, "''") + "'";
}

let sql = `-- Migration 7: Import 18 Sexual Wellness Products from dvago.pk
-- Category: Sexual Wellness (c0000000-0000-0000-0000-000000000014)
-- Includes Durex, Pulse, OK, Rough Rider, Josh, Skyn, Lifestyles with plain-box discreet COD

-- 1. Category
insert into public.categories (id, name, slug, image_url)
values ('c0000000-0000-0000-0000-000000000014', 'Sexual Wellness', 'sexual-wellness', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80')
on conflict (id) do update set name = excluded.name, image_url = excluded.image_url;

-- 2. Products, Images, and Variants
`;

swProducts.forEach((p) => {
  const seoTitle = `${p.title} — Buy Online in Pakistan | Zenbu.Store`;
  const seoDesc = `Buy authentic ${p.title} for Rs. ${p.price} with 100% discreet packaging and Cash on Delivery nationwide. Zero advance payment.`;

  sql += `
do $$
declare
  v_prod_id uuid;
begin
  select id into v_prod_id from public.products where slug = ${escapeSql(p.slug)};
  if v_prod_id is null then
    insert into public.products (
      title, slug, description, price, compare_at_price,
      category_id, brand, sku, stock_quantity, status,
      source_url, source_type, seo_title, seo_description
    ) values (
      ${escapeSql(p.title)},
      ${escapeSql(p.slug)},
      ${escapeSql(p.description)},
      ${p.price},
      ${p.compare_at_price || 'null'},
      'c0000000-0000-0000-0000-000000000014',
      ${escapeSql(p.brand)},
      ${escapeSql(p.sku)},
      ${p.stock || 50},
      'active',
      ${escapeSql(p.url)},
      'link_import',
      ${escapeSql(seoTitle)},
      ${escapeSql(seoDesc)}
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, ${escapeSql(p.image)}, 0, ${escapeSql(p.title)});

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, ${p.stock || 50});
  else
    update public.products set
      title = ${escapeSql(p.title)},
      description = ${escapeSql(p.description)},
      price = ${p.price},
      compare_at_price = ${p.compare_at_price || 'null'},
      category_id = 'c0000000-0000-0000-0000-000000000014',
      brand = ${escapeSql(p.brand)},
      seo_title = ${escapeSql(seoTitle)},
      seo_description = ${escapeSql(seoDesc)}
    where id = v_prod_id;
  end if;
end $$;
`;
});

const migrationFile = path.resolve('supabase/migrations/20260907000007_import_sexual_wellness.sql');
fs.writeFileSync(migrationFile, sql, 'utf8');
console.log(`Generated migration at: ${migrationFile}`);
