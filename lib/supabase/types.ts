export type Json =
  string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Category = {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  image_url: string | null;
  created_at: string;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  category_id: string | null;
  brand: string | null;
  sku: string | null;
  stock_quantity: number;
  status: "draft" | "active" | "archived";
  source_url: string | null;
  source_type: "manual" | "sheet" | "link_import";
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  position: number;
  alt_text: string | null;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  name: string;
  value: string;
  price_delta: number;
  stock_quantity: number;
};

export type Customer = {
  id: string;
  auth_user_id: string | null;
  email: string;
  name: string | null;
  phone: string | null;
  created_at: string;
};

export type Address = {
  id: string;
  customer_id: string;
  line1: string;
  city: string;
  country: string;
  postal_code: string | null;
  is_default: boolean;
};

export type Order = {
  id: string;
  customer_id: string | null;
  status: string;
  subtotal: number;
  shipping_fee: number;
  total: number;
  payment_method: "cod" | "whatsapp";
  payment_status: "pending" | "confirmed" | "delivered" | "cancelled";
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  unit_price: number;
};

export type Cart = {
  id: string;
  customer_id: string | null;
  session_id: string | null;
  created_at: string;
  updated_at: string;
};

export type CartItem = {
  id: string;
  cart_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
};

export type Wishlist = {
  id: string;
  customer_id: string | null;
  session_id: string | null;
  product_id: string;
  created_at: string;
};

export type ProductReview = {
  id: string;
  product_id: string;
  customer_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
};

export type AnalyticsSession = {
  id: string;
  session_id: string;
  first_seen: string;
  last_seen: string;
  device: string | null;
  browser: string | null;
  country: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};

export type AnalyticsEvent = {
  id: string;
  session_id: string;
  event_type: string;
  product_id: string | null;
  page_url: string;
  metadata: Json | null;
  created_at: string;
};

export type FormSession = {
  id: string;
  session_id: string;
  form_name: string;
  fields_total: number;
  fields_completed: number;
  completed: boolean;
  abandoned_at_field: string | null;
  started_at: string;
  ended_at: string | null;
};
