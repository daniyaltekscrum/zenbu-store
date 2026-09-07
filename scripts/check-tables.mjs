import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Load .env.local
const envContent = fs.readFileSync(".env.local", "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    env[match[1]] = match[2].trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const tables = [
  "categories",
  "products",
  "product_images",
  "product_variants",
  "customers",
  "orders",
  "order_items",
  "carts",
  "cart_items",
  "wishlists",
  "product_reviews",
  "analytics_sessions",
  "analytics_events",
  "form_sessions",
];

async function check() {
  console.log("Checking Supabase tables at:", supabaseUrl);
  let allExist = true;

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select("*").limit(1);
    if (error) {
      console.log(`Table '${table}':`, error.message, `(code: ${error.code})`);
      if (error.code === "PGRST204" || error.code === "PGRST205" || error.message.includes("does not exist") || error.code === "42P01") {
        allExist = false;
      }
    } else {
      console.log(`Table '${table}': Accessible. Returned ${data ? data.length : 0} rows.`);
    }
  }

  if (allExist) {
    console.log("\nALL TABLES CHECKED.");
  } else {
    console.log("\nSome tables not yet exposed or migration pending.");
  }
}

check();
