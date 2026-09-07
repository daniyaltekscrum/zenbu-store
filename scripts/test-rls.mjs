import { createClient } from "@supabase/supabase-js";
import fs from "fs";

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

async function testRLS() {
  console.log("=== Testing RLS Policies ===");

  // 1. Test anon insert on products (Must be BLOCKED by RLS)
  const { error: prodInsertError } = await supabase.from("products").insert({
    title: "Unauthorized Product",
    slug: "unauthorized-product",
    price: 999,
  });
  console.log(
    "1. Anon INSERT to products (Expected to FAIL):",
    prodInsertError ? `BLOCKED (${prodInsertError.message})` : "UNEXPECTED SUCCESS"
  );

  // 2. Test anon insert to analytics_events (Must SUCCEED per policy)
  const { error: analyticsInsertError } = await supabase.from("analytics_events").insert({
    session_id: "test-session-rls",
    event_type: "page_view",
    page_url: "/",
  });
  console.log(
    "2. Anon INSERT to analytics_events (Expected to SUCCEED):",
    analyticsInsertError ? `FAILED: ${analyticsInsertError.message}` : "ALLOWED"
  );

  // 3. Test anon SELECT from analytics_events (Must return 0 rows per policy)
  const { data: analyticsSelect, error: analyticsSelectError } = await supabase
    .from("analytics_events")
    .select("*");
  console.log(
    "3. Anon SELECT from analytics_events (Expected 0 rows / restricted):",
    analyticsSelect ? `Returned ${analyticsSelect.length} rows (Hidden from anon)` : analyticsSelectError.message
  );

  console.log("=== RLS Verification Complete ===");
}

testRLS();
