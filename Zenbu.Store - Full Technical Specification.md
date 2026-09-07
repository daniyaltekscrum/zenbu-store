# Zenbu.Store — Full Product & Technical Specification

**Purpose of this document:** a complete build brief you can hand to Antigravity (or any AI coding agent) so it can scaffold, build, and deploy Zenbu.Store end‑to‑end with minimal back‑and‑forth. It covers stack, design system, database schema, product‑import workflow, analytics/tracking, and a phase‑by‑phase build plan with ready‑to‑paste prompts.

**Decisions locked in for this build:**
- Store sells general/mixed products (not a single niche) — architecture uses flexible categories/attributes rather than a rigid schema.
- **Payments: Cash on Delivery (COD) only** — no card/online gateway integration. For online/advance payments and general customer questions, the site routes people to **WhatsApp: +92 312 0813050** (click-to-chat, pre-filled messages — full spec in Section 9).
- **Database: Supabase** (confirmed). **Hosting: Vercel**. **Analytics:** PostHog + a custom Supabase-based dashboard.

---

## 0. Start Right Now (today's action list)

Do these in order, then hand this whole document to Antigravity:
1. Create a free **Supabase** project (name it `zenbu-store`) — note the project URL and anon/service keys.
2. Create a **GitHub** repo (`zenbu-store`) — Antigravity will push code here.
3. Create/log into a **Vercel** account and connect it to that GitHub repo (you can do this after Phase 1 scaffolding exists).
4. Set up **WhatsApp Business** (free app) on +92 312 0813050 so you can add a greeting message, catalog, and quick replies for order chats.
5. Prepare a starter **CSV of 10–20 products** (title, price, category, images) so you have real data to test the import flow with immediately.
6. Open Antigravity and paste the **Phase 1 prompt** from Section 11 below to kick off the build.

---

## 1. Tech Stack (the "easiest path")

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router, TypeScript)** | SSR/SSG out of the box → best SEO; deploys natively on Vercel |
| Styling | **Tailwind CSS + shadcn/ui** | Fast to build, easy to theme, works great with glassmorphism |
| Database + Auth + Storage | **Supabase** (Postgres) | One dashboard for DB, auth, file storage, and edge functions. Relational data (orders → items → products) fits e‑commerce far better than Firebase's NoSQL model. Generous free tier. |
| Hosting | **Vercel** | Zero‑config Next.js deploys, previews on every git push, free SSL, edge network (fast globally) |
| Payments | **Cash on Delivery (COD)** + **WhatsApp for online payments/contact** (+92 312 0813050) | Zero payment-gateway integration needed — fastest path to launch; Stripe/Safepay can be added later as a drop-in if you ever want in-site card payments |
| Analytics/Tracking | **PostHog (free tier)** + **custom Supabase event tables** | PostHog gives you funnels, session replay, and heatmaps out of the box so you don't build that from scratch; custom tables capture store‑specific events (likes, form abandonment, product views tied to your product IDs) |
| Search on site | **Postgres full‑text search** (built into Supabase) to start; upgrade to Algolia/Meilisearch later if catalog grows large |
| Images | **Supabase Storage** or **Cloudinary** (Cloudinary if you want automatic resizing/optimization) |
| Email (order confirmations, abandoned cart) | **Resend** (easiest to set up with Next.js) |

Firebase note: Firebase is fine if you ever want a mobile app alongside the site, since Firestore + Firebase Auth is convenient for mobile SDKs. For a web‑only store, Supabase is simpler because it's plain SQL, has row‑level security, and lets you write normal relational queries for orders/inventory.

---

## 2. Design System — "Clean, Modern, Glassmorphism"

**Overall direction:** minimal chrome, generous white space, one accent color, and glass panels used *sparingly* (on nav, product cards on hover, filter drawers, modals) — not on every element, or it looks noisy.

**Core visual rules:**
- **Background:** soft gradient mesh or a very light neutral (near‑white in light mode, near‑black in dark mode) so frosted glass has something to blur against.
- **Glass panels:** `backdrop-filter: blur(16–24px)`, background `rgba(255,255,255,0.55)` (light) or `rgba(20,20,25,0.55)` (dark), `1px` semi‑transparent border, soft large‑radius corners (16–24px), subtle drop shadow.
- **Typography:** one modern sans (Inter, Geist, or General Sans) — large confident headings, generous line‑height, muted secondary text.
- **Color:** neutral base (white/near‑black) + a single accent color for CTAs and highlights (avoid rainbow palettes — feels more premium).
- **Motion:** small, fast micro‑interactions only — hover lift on product cards, fade/slide on modals, skeleton loaders while data streams in. No heavy animation that hurts performance/SEO.
- **Dark mode:** supported from day one (`next-themes`), since glassmorphism reads especially well in dark UI.

**Pages that need this treatment:**
1. **Homepage** — hero, featured categories, trending products, glass nav bar (sticky, blurred) over the hero image.
2. **Category/Listing page** — glass filter sidebar (price, category, rating), product grid.
3. **Product detail page** — large gallery, glass "buy box" card floating over content, related products.
4. **Cart drawer** — slide‑in glass panel, not a full page reload.
5. **Checkout** — single‑page, minimal, progress indicator, glass summary card.
6. **Account / Orders** — simple, functional, same design language, less glass (data-heavy pages read better with more solid backgrounds).
7. **Admin/Analytics dashboard** — see Section 6.

**Reference direction to give Antigravity verbatim:** *"Apple.com meets Linear.app meets a frosted-glass control center — light, airy, one accent color, big product photography, no clutter."*

---

## 3. Site Structure / Pages

```
/                         → Homepage
/products                 → All products (filterable, paginated)
/category/[slug]          → Category listing
/product/[slug]           → Product detail page
/search?q=                → Search results
/cart                     → Cart (or drawer, but keep a page fallback for SEO/deep-linking)
/checkout                 → Checkout flow
/order/confirmation/[id]  → Order confirmation
/account                  → Login/orders/wishlist
/wishlist                 → Saved/liked products
/about, /contact, /faq, /shipping-returns, /privacy, /terms  → SEO + trust pages
/sitemap.xml, /robots.txt → auto-generated
/admin                    → Admin panel (protected route)
/admin/products           → Product CRUD + sheet/link import
/admin/orders             → Order management
/admin/dashboard          → Analytics & tracking dashboard
```

---

## 4. SEO Strategy (built in from the start, not bolted on later)

- **Rendering:** use Next.js Server Components + `generateStaticParams`/ISR for product and category pages so pages are pre-rendered and fast (Core Web Vitals matter for ranking).
- **Metadata:** use the Next.js Metadata API on every route — unique `title`, `description`, canonical URL, Open Graph + Twitter card image per product.
- **Structured data (JSON-LD):** `Product` schema (price, availability, rating) on product pages, `BreadcrumbList` on category/product pages, `Organization`/`WebSite` on the homepage. This is what gets you star ratings and price snippets in Google.
- **Sitemap & robots:** auto-generate `sitemap.xml` (Next.js `app/sitemap.ts`) that includes every product/category, and `robots.txt` allowing crawl of storefront but disallowing `/admin` and `/checkout`.
- **URLs:** clean, keyword-based slugs (`/product/wireless-earbuds-black`, not `/product/1029`).
- **Images:** always use `next/image` with descriptive `alt` text (helps Google Images traffic, which matters a lot for general stores).
- **Performance:** lazy-load below-the-fold images, minimize client JS on product/category pages, target Lighthouse 90+ on mobile.
- **Internal linking:** related products, "customers also viewed," and breadcrumbs — helps Google crawl deep into the catalog.
- **Content:** short unique descriptions per product (avoid pasting the same manufacturer description as every other store — duplicate content hurts ranking). If importing via links, have Antigravity rewrite/summarize descriptions rather than scrape verbatim.

---

## 5. Database Schema (Supabase / Postgres)

```sql
-- Core catalog
categories (id, name, slug, parent_id, image_url, created_at)
products (
  id, title, slug, description, price, compare_at_price,
  category_id, brand, sku, stock_quantity, status (draft/active/archived),
  source_url,           -- if imported from a product link
  source_type,          -- 'manual' | 'sheet' | 'link_import'
  seo_title, seo_description,
  created_at, updated_at
)
product_images (id, product_id, url, position, alt_text)
product_variants (id, product_id, name, value, price_delta, stock_quantity) -- size/color etc.

-- Customers & orders
customers (id, auth_user_id, email, name, phone, created_at)
addresses (id, customer_id, line1, city, country, postal_code, is_default)
orders (id, customer_id, status, subtotal, shipping_fee, total, payment_method, payment_status, created_at)
order_items (id, order_id, product_id, variant_id, quantity, unit_price)
carts (id, customer_id/session_id, created_at, updated_at)
cart_items (id, cart_id, product_id, variant_id, quantity)

-- Engagement / wishlist
wishlists (id, customer_id/session_id, product_id, created_at)   -- "likes"
product_reviews (id, product_id, customer_id, rating, comment, created_at)

-- Analytics & tracking (custom, feeds the dashboard)
analytics_sessions (id, session_id, first_seen, last_seen, device, browser, country, referrer, utm_source, utm_medium, utm_campaign)
analytics_events (
  id, session_id, event_type, product_id, page_url,
  metadata (jsonb),      -- flexible extra data per event
  created_at
)
-- event_type examples: page_view, product_view, product_like, add_to_cart,
-- remove_from_cart, search, checkout_start, checkout_step_complete,
-- form_field_focus, form_field_blur, form_abandoned, purchase

form_sessions (
  id, session_id, form_name, fields_total, fields_completed,
  completed (boolean), abandoned_at_field, started_at, ended_at
)
```

`orders.payment_method` values: `'cod'` or `'whatsapp'`. `orders.payment_status` values: `'pending'`, `'confirmed'`, `'delivered'`, `'cancelled'` — since there's no payment gateway, you (or your team) flip this manually in `/admin/orders` once cash/transfer is received.

This structure lets the dashboard answer: which products get viewed but not bought, which forms people abandon and on which field, who liked a product without buying, cart abandonment rate, top referrers, etc. — all from your own database, no vendor lock-in.

---

## 6. Getting Products Onto the Site (two easy paths)

### Path A — Google Sheet upload
1. Antigravity builds a fixed-column Google Sheet template: `title, description, price, category, sku, stock, image_url_1, image_url_2, ...`.
2. In `/admin/products`, add an **"Import from Sheet"** button that:
   - Accepts a shared Google Sheet link (uses the Google Sheets API, read-only), **or**
   - Accepts a CSV export upload (simplest — no API keys needed to start).
3. The importer validates rows, uploads images to Supabase Storage/Cloudinary, and inserts into `products` with `source_type = 'sheet'`.
4. Show a preview + "confirm import" step before writing to the database, so bad rows don't silently break the catalog.

*Recommendation: start with CSV upload (zero API setup) and add live Google Sheet sync later if you want it to update automatically.*

### Path B — Paste a product link
1. In `/admin/products`, add an **"Import from Link"** field.
2. Antigravity builds a small scraper (Next.js API route using Cheerio/Playwright, or a scraping API like ScraperAPI/Bright Data for sites with bot protection) that pulls: title, price, images, and description from the given URL.
3. Run the scraped description through an AI rewrite step (you already have Claude/GPT access) so it's unique, not copy-pasted — this protects your SEO from duplicate-content penalties.
4. Show the extracted data in a review form before saving, so you can edit price/margin before it goes live.
5. **Note:** scraping third-party sites should respect that site's terms of service — this feature works best for your own supplier catalogs, marketplaces with public APIs (e.g., AliExpress affiliate API), or sites that explicitly allow it. Flag this to Antigravity so it builds in a manual-paste fallback (you paste title/price/images yourself) for sites that block scraping.

---

## 7. Admin Dashboard — Product & Order Management

- **Products:** table view with search/filter, bulk actions (activate/archive/delete), inline stock editing, the two import flows above.
- **Orders:** list with status filters (pending/paid/shipped/delivered/cancelled), click into an order to see items, customer, and update status/tracking number.
- **Inventory alerts:** low-stock and out-of-stock banners.

---

## 8. Analytics & Tracking Dashboard — "track everything"

### What gets tracked (event list)
| Category | Events |
|---|---|
| Traffic | page views, unique visitors, sessions, traffic source/UTM, device/browser/country |
| Product engagement | product views (per product), product likes/wishlist adds, time on product page, "add to cart" clicks, "buy now" clicks |
| Search | every search query typed, zero-result searches (tells you what you should stock), filter usage |
| Cart & checkout funnel | cart adds, cart removals, cart abandonment, checkout started, each checkout step completed/dropped, payment method chosen |
| Forms | field-by-field completion (which field people stop at), full completion rate, time-to-complete, abandoned vs. submitted |
| Conversion | purchases, revenue, average order value, conversion rate by traffic source, repeat customers |

### Dashboard layout (glassmorphism, matching site style, dark-mode friendly)
1. **Top row — live stat cards** (glass cards): Active visitors right now, Today's revenue, Today's orders, Conversion rate — with small sparkline trend under each.
2. **Funnel chart:** Visit → Product view → Add to cart → Checkout started → Purchase, with drop-off % between each step (this directly shows where you're losing sales).
3. **Form completion widget:** bar/heat list of forms (checkout, contact, newsletter) showing % who started vs. finished, and which field most people abandon on.
4. **Top products table:** most viewed, most liked, most added-to-cart, most purchased — side by side, so you can spot "high interest, low sales" products (pricing or copy problem) vs. "low interest" products (visibility problem).
5. **Search insights:** top search terms + zero-result searches.
6. **Traffic breakdown:** source/medium pie or bar chart, device split, country map.
7. **Revenue over time:** line chart with date range picker (today/7d/30d/custom).
8. **Recent activity feed:** live-updating list of key events (new order, new like, cart abandoned) — Supabase Realtime makes this easy.

### How to build it (easiest route)
- Log every event from the frontend to a single `POST /api/track` route → inserts into `analytics_events`/`form_sessions` in Supabase. Use `navigator.sendBeacon` for "user left the page" events so abandonment is captured reliably.
- Use **PostHog** (free up to a generous event volume) as a drop-in library for automatic session recording, heatmaps, and funnel/retention analysis — this saves you from building session replay yourself.
- Build the **custom dashboard UI** in `/admin/dashboard` using **Recharts** or **Tremor** (a component library made specifically for dashboards, pairs very well with Tailwind + glassmorphism) querying your Supabase tables directly (Supabase's JS client + SQL views for aggregation, e.g. a `funnel_summary` view).
- Add **Vercel Analytics** (one line to enable) for Core Web Vitals monitoring alongside everything else — helps keep SEO performance visible too.

---

## 9. Auth, Payments, Email — quick notes
- **Auth:** Supabase Auth (email/password + Google login) for customer accounts; a separate protected `/admin` route gated by a role check.
- **Payments:** integrate Stripe first (fastest official Next.js docs/examples exist); add Safepay/JazzCash/Easypaisa and/or COD as additional methods once the core flow works.
- **Transactional email:** Resend + React Email for order confirmations, shipping updates, and abandoned-cart nudges (which you can trigger straight from the `form_sessions`/cart-abandonment data above).

---

## 10. Environment & Deployment
- Repo on GitHub → import into Vercel → auto-deploys on every push, with preview URLs for branches.
- Environment variables needed: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-only), `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_SITE_URL`.
- Connect your domain (Zenbu.Store) in Vercel's Domains settings and set up DNS.

---

## 11. Phase-by-Phase Build Plan (prompts to paste into Antigravity)

**Phase 1 — Scaffold**
> "Create a new Next.js 15 app with TypeScript, App Router, Tailwind CSS, and shadcn/ui. Set up ESLint/Prettier. Initialize a Supabase project and connect it with environment variables. Set up the folder structure: app/(storefront), app/admin, lib/, components/."

**Phase 2 — Database**
> "Using the schema in Section 5, create the Supabase tables via SQL migration, including row-level security policies (customers can only read/write their own orders/cart/wishlist; products/categories are publicly readable; analytics tables are write-only from the client and read-only from the admin role)."

**Phase 3 — Storefront UI**
> "Build the homepage, category listing, product detail, cart, and checkout pages per the design system in Section 2. Use a glassmorphism aesthetic: blurred translucent panels, one accent color, dark mode support via next-themes."

**Phase 4 — SEO**
> "Implement the Next.js Metadata API on all routes, JSON-LD structured data for products/breadcrumbs/organization, an auto-generated sitemap.xml and robots.txt, and next/image everywhere with descriptive alt text."

**Phase 5 — Product import**
> "Build /admin/products with CSV upload import and a 'paste product link' importer that scrapes title/price/images/description, shows a review/edit screen, and saves to the products table."

**Phase 6 — Tracking**
> "Add a POST /api/track endpoint that logs events to analytics_events and form_sessions per the event list in Section 8. Instrument the frontend to fire these events (page views, product views, likes, cart actions, search, and field-level form tracking using focus/blur/beforeunload). Integrate PostHog for session recording and funnels."

**Phase 7 — Admin analytics dashboard**
> "Build /admin/dashboard using Tremor/Recharts matching the site's glassmorphism design: live stat cards, funnel chart, form-completion widget, top products table, search insights, traffic breakdown, and a revenue-over-time chart with a date range picker, all pulling from Supabase."

**Phase 8 — Payments & email**
> "Integrate Stripe checkout, add COD as a manual payment option, and set up Resend + React Email for order confirmation emails."

**Phase 9 — Deploy**
> "Push to GitHub and connect the repo to Vercel. Add all environment variables in Vercel's project settings. Connect the Zenbu.Store domain."

---

## 12. Post-Launch Checklist
- [ ] Submit sitemap to Google Search Console & Bing Webmaster Tools
- [ ] Run Lighthouse on mobile — fix anything under 90
- [ ] Test the full purchase flow end-to-end (including COD and card payment)
- [ ] Confirm analytics events are firing correctly (check PostHog + your dashboard match)
- [ ] Set up abandoned-cart email trigger
- [ ] Add at least 20–30 products before launch so the store doesn't look empty
- [ ] Test on a real mobile device (most general-store traffic is mobile)
