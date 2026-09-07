import fs from "fs";

const urls = [
  "https://www.dvago.pk/p/pediasure-vanilla-850g",
  "https://www.dvago.pk/p/pediasure-chocolate-400g",
  "https://www.dvago.pk/p/pediasure-vanilla-400g",
  "https://www.dvago.pk/p/pediasure-strawberry-850g",
  "https://www.dvago.pk/p/pediasure-chocolate-850g",
  "https://www.dvago.pk/p/enfagrow-a-stage-3-vanilla-400g",
  "https://www.dvago.pk/p/meiji-big-soft-pack-200g",
  "https://www.dvago.pk/p/meiji-kid-plus-200g",
  "https://www.dvago.pk/p/meiji-kid-plus-600g",
  "https://www.dvago.pk/p/meiji-big-growing-up-formula-powdered-milk-400g",
  "https://www.dvago.pk/p/meiji-big-growing-up-formula-powdered-milk-900g",
  "https://www.dvago.pk/p/meiji-fm-t-infant-formula-powdered-400g",
  "https://www.dvago.pk/p/meiji-fm-t-infant-formula-powdered-900g",
  "https://www.dvago.pk/p/meiji-fu-follow-up-formula-powdered-milk-400g",
  "https://www.dvago.pk/p/meiji-fu-follow-up-formula-powdered-milk-900g",
  "https://www.dvago.pk/p/meiji-lactoless-powdered-milk-350g",
  "https://www.dvago.pk/p/meiji-pre-powdered-milk-400g",
  "https://www.dvago.pk/p/bf-2-grow-300gm-box",
  "https://www.dvago.pk/p/canbebe-comfort-dry-baby-diapers-size-3-midi-28pcs",
  "https://www.dvago.pk/p/bona-papa-magic-eoc-e-large",
  "https://www.dvago.pk/p/bona-papa-magic-eco-large",
  "https://www.dvago.pk/p/bona-papa-magic-eco-medium-44pcs",
  "https://www.dvago.pk/p/sof-ped-adult-daiper-l",
  "https://www.dvago.pk/p/diaper-jumbo-large-pack-80pcs",
  "https://www.dvago.pk/p/diaper-jumbo-medium-88pcs",
  "https://www.dvago.pk/p/canbebe-baby-diapers-mini-jumbo-size2-70pcs",
  "https://www.dvago.pk/p/canbebe-maxi-plus-46p",
  "https://www.dvago.pk/p/bona-papa-super-junior-xxl-1s",
  "https://www.dvago.pk/p/bona-papa-super-maxi-l-1s",
  "https://www.dvago.pk/p/momse-jumbo-pants-xlarge-46s",
  "https://www.dvago.pk/p/molfix-baby-diapers-junior-size5-22s-twin",
];

function determineCategory(title, slug) {
  const text = (title + " " + slug).toLowerCase();
  if (text.includes("adult") || text.includes("sof-ped")) {
    return {
      id: "c0000000-0000-0000-0000-000000000013",
      name: "Adult Care & Incontinence",
      slug: "adult-care",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    };
  }
  if (
    text.includes("diaper") ||
    text.includes("canbebe") ||
    text.includes("bona papa") ||
    text.includes("momse") ||
    text.includes("molfix")
  ) {
    return {
      id: "c0000000-0000-0000-0000-000000000012",
      name: "Baby Diapers & Pants",
      slug: "baby-diapers",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80",
    };
  }
  return {
    id: "c0000000-0000-0000-0000-000000000011",
    name: "Baby & Child Nutrition",
    slug: "baby-nutrition",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
  };
}

function rewriteDescription(title, rawDesc, brand) {
  const brandName = brand || "Zenbu.Store Verified";
  if (!rawDesc || rawDesc.length < 20) {
    return `Premium ${title} sourced directly from verified distributors by ${brandName}. Authentic formula guaranteed with fast Cash on Delivery across Pakistan. Contact WhatsApp at +92 312 0813050 for assistance.`;
  }
  return `${rawDesc.replace(/DVAGO/gi, "Zenbu.Store").trim()} Sourced from official authorized distributors by ${brandName}. Available for nationwide Cash on Delivery with guaranteed authenticity.`;
}

function escapeSql(str) {
  if (!str) return "NULL";
  return `'${str.replace(/'/g, "''").replace(/\\/g, "\\\\")}'`;
}

async function scrapeAll() {
  console.log(`Starting extraction for ${urls.length} products from dvago.pk...`);
  const products = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const slugFromUrl = url.split("/p/")[1];
    console.log(`[${i + 1}/${urls.length}] Fetching: ${slugFromUrl}...`);

    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      if (!res.ok) {
        console.warn(`  HTTP ${res.status} for ${url}`);
      }

      const html = await res.text();

      // Extract JSON-LD product-markup-schema
      const match = html.match(
        /<script[^>]*id="product-markup-schema"[^>]*>([\s\S]*?)<\/script>/
      );

      let item = null;
      if (match && match[1]) {
        try {
          item = JSON.parse(match[1]);
        } catch (e) {
          console.warn("  Failed parsing JSON-LD schema:", e.message);
        }
      }

      // Fallback extraction from HTML title/meta if JSON-LD missing
      let title = item?.name;
      if (!title) {
        const titleMatch = html.match(/<title>([^<]+)<\/title>/);
        if (titleMatch) {
          title = titleMatch[1].replace(/Buy /i, "").replace(/ Online at Best Prices in Pakistan.*/i, "").trim();
        } else {
          title = slugFromUrl.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        }
      }

      let image = item?.image;
      if (!image) {
        const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
        if (ogImageMatch) image = ogImageMatch[1];
      }

      let price = 0;
      if (item?.offers?.price) {
        price = parseFloat(item.offers.price);
      } else {
        const priceMatch = html.match(/Rs\.?\s*([0-9,]+)/i);
        if (priceMatch) price = parseFloat(priceMatch[1].replace(/,/g, ""));
      }

      let description = item?.description || "";
      let brand = item?.brand?.name || "";

      const category = determineCategory(title, slugFromUrl);
      const uniqueDesc = rewriteDescription(title, description, brand);

      products.push({
        url,
        slug: slugFromUrl,
        title,
        price: price > 0 ? price : 1500,
        compare_at_price: price > 0 ? Math.round(price * 1.15) : 1800,
        image: image || "/logo/1.png",
        description: uniqueDesc,
        brand: brand || "Verified Brand",
        sku: `SKU-${slugFromUrl.slice(0, 10).toUpperCase()}-${i + 100}`,
        stock: 50,
        category,
      });

      console.log(`  ✓ ${title} — Rs. ${price || 1500} (${category.name})`);
    } catch (err) {
      console.error(`  Error scraping ${url}:`, err.message);
    }
  }

  // Save JSON
  if (!fs.existsSync("data")) fs.mkdirSync("data", { recursive: true });
  fs.writeFileSync("data/dvago_products.json", JSON.stringify(products, null, 2));
  console.log(`\nSuccessfully scraped ${products.length} products to data/dvago_products.json`);

  // Generate SQL Migration
  const categoriesMap = new Map();
  products.forEach((p) => {
    if (!categoriesMap.has(p.category.id)) {
      categoriesMap.set(p.category.id, p.category);
    }
  });

  let sql = `-- Migration 6: Import 31 Products from dvago.pk
-- Includes Baby Nutrition, Baby Diapers, and Adult Care categories

-- 1. Categories
`;

  for (const cat of categoriesMap.values()) {
    sql += `insert into public.categories (id, name, slug, image_url)
values (${escapeSql(cat.id)}, ${escapeSql(cat.name)}, ${escapeSql(cat.slug)}, ${escapeSql(cat.image)})
on conflict (id) do update set name = excluded.name, image_url = excluded.image_url;

`;
  }

  sql += `-- 2. Products, Images, and Variants\n`;

  for (const p of products) {
    const productId = `gen_random_uuid()`;
    const seoTitle = `${p.title} — Buy Online with COD | Zenbu.Store`;
    const seoDesc = `Order ${p.title} at best price in Pakistan. 100% genuine with Cash on Delivery & WhatsApp support at +92 312 0813050.`;

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
      ${p.compare_at_price},
      ${escapeSql(p.category.id)},
      ${escapeSql(p.brand)},
      ${escapeSql(p.sku)},
      ${p.stock},
      'active',
      ${escapeSql(p.url)},
      'link_import',
      ${escapeSql(seoTitle)},
      ${escapeSql(seoDesc)}
    ) returning id into v_prod_id;

    insert into public.product_images (product_id, url, position, alt_text)
    values (v_prod_id, ${escapeSql(p.image)}, 0, ${escapeSql(p.title)});

    insert into public.product_variants (product_id, name, value, price_delta, stock_quantity)
    values (v_prod_id, 'Pack', 'Standard', 0, ${p.stock});
  end if;
end $$;
`;
  }

  fs.writeFileSync("supabase/migrations/20260907000006_import_dvago_products.sql", sql);
  console.log(`Generated SQL migration: supabase/migrations/20260907000006_import_dvago_products.sql`);
}

scrapeAll();
