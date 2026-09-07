import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

async function run() {
  const catUrl = 'https://www.dvago.pk/cat/sexual-wellness';
  console.log(`Fetching category page: ${catUrl}...`);
  const catHtml = await fetchPage(catUrl);
  const $cat = cheerio.load(catHtml);

  const productUrls = new Set();
  $cat('a[href*="/p/"]').each((_, el) => {
    let href = $cat(el).attr('href');
    if (href) {
      if (!href.startsWith('http')) {
        href = 'https://www.dvago.pk' + (href.startsWith('/') ? href : '/' + href);
      }
      productUrls.add(href);
    }
  });

  console.log(`Found ${productUrls.size} products. Scraping details...`);

  const category = {
    id: "c0000000-0000-0000-0000-000000000014",
    name: "Sexual Wellness",
    slug: "sexual-wellness",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80"
  };

  const newProducts = [];
  const urls = Array.from(productUrls);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      console.log(`[${i + 1}/${urls.length}] Scraping: ${url}`);
      const html = await fetchPage(url);
      const $ = cheerio.load(html);

      let title = $('meta[property="og:title"]').attr('content') || $('h1').first().text().trim() || '';
      title = title.replace(/\s*\|.*$/, '').replace(/\s*-\s*Dvago.*$/i, '').trim();

      const rawPrice = $('meta[property="product:price:amount"]').attr('content') || $('[class*="price"]').text() || '';
      const priceMatch = rawPrice.match(/[\d,]+(?:\.\d+)?/);
      const price = priceMatch ? Number(priceMatch[0].replace(/,/g, '')) : 500;

      let image = $('meta[property="og:image"]').attr('content') || $('img[src*="Product"]').attr('src') || '';
      if (!image.startsWith('http') && image.startsWith('/')) {
        image = 'https://www.dvago.pk' + image;
      }

      let brand = $('meta[property="product:brand"]').attr('content') || $('[class*="brand"]').text().trim() || 'Zenbu Verified';
      if (!brand || brand === 'Zenbu Verified') {
        if (title.toLowerCase().includes('durex')) brand = 'DUREX';
        else if (title.toLowerCase().includes('rough rider')) brand = 'ROUGH RIDER';
        else if (title.toLowerCase().includes('lifestyle')) brand = 'LIFESTYLES';
        else if (title.toLowerCase().includes('pulse')) brand = 'PULSE';
        else if (title.toLowerCase().includes('bareback')) brand = 'BAREBACK';
        else if (title.toLowerCase().includes('ok ')) brand = 'OK';
      }

      const slug = url.split('/p/')[1] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const compare_at_price = Math.round(price * 1.15);

      const description = `${title} is a genuine, dermatologically tested wellness essential from ${brand}. Manufactured under international quality and safety benchmarks, hermetically sealed to ensure maximum intimacy protection, comfort, and peace of mind. Shipped in 100% discreet, plain-box packaging with nationwide Cash on Delivery and zero advance payment from Zenbu.Store.`;

      newProducts.push({
        url,
        slug,
        title,
        price,
        compare_at_price,
        image: image || '/logo/1.png',
        description,
        brand: brand.toUpperCase(),
        sku: `SKU-SW-${100 + i}`,
        stock: 50,
        category
      });

      // Small delay
      await new Promise(r => setTimeout(r, 400));
    } catch (err) {
      console.warn(`Failed ${url}: ${err.message}`);
    }
  }

  console.log(`Successfully scraped ${newProducts.length} sexual wellness products.`);

  // Load existing dvago products and append
  const filePath = path.resolve('data/dvago_products.json');
  const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Deduplicate by slug
  const existingSlugs = new Set(existing.map(p => p.slug));
  let addedCount = 0;

  newProducts.forEach(p => {
    if (!existingSlugs.has(p.slug)) {
      existing.push(p);
      existingSlugs.add(p.slug);
      addedCount++;
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), 'utf8');
  console.log(`Saved! Added ${addedCount} new items. Total products in catalog: ${existing.length}.`);
}

run().catch(console.error);

