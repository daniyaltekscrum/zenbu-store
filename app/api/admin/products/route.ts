import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: products, error } = await supabase
      .from("products")
      .select("*, categories(id, name, slug), product_images(id, url, position)")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ products });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const body = await req.json();

    // Check if batch insert (Sheet or multiple import) or single insert
    const items = Array.isArray(body) ? body : [body];
    const results = [];
    const errors = [];

    for (const item of items) {
      const slug =
        item.slug ||
        item.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

      const productPayload = {
        title: item.title,
        slug,
        description: item.description || "",
        price: Number(item.price) || 0,
        compare_at_price: item.compare_at_price ? Number(item.compare_at_price) : null,
        category_id: item.category_id || null,
        brand: item.brand || "Zenbu Verified",
        sku: item.sku || `SKU-${Date.now().toString().slice(-6)}`,
        stock_quantity: Number(item.stock) || 50,
        status: item.status || "active",
        source_type: item.source_type || "manual",
        source_url: item.source_url || null,
        seo_title: item.seo_title || item.title,
        seo_description: item.seo_description || (item.description ? item.description.slice(0, 155) : ""),
      };

      const { data: prod, error: prodErr } = await supabase
        .from("products")
        .insert(productPayload)
        .select()
        .single();

      if (prodErr) {
        errors.push({ title: item.title, error: prodErr.message });
      } else {
        // Insert images if provided
        if (item.images && Array.isArray(item.images) && item.images.length > 0) {
          const imageRows = item.images.map((url: string, idx: number) => ({
            product_id: prod.id,
            url,
            position: idx,
            alt_text: `${prod.title} photo ${idx + 1}`,
          }));
          await supabase.from("product_images").insert(imageRows);
        } else if (item.image) {
          await supabase.from("product_images").insert({
            product_id: prod.id,
            url: item.image,
            position: 0,
            alt_text: prod.title,
          });
        }
        results.push(prod);
      }
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      products: results,
      errors,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const body = await req.json();

    // Support single stock edit or bulk actions: { action: 'activate' | 'archive' | 'delete', ids: string[] }
    // Or single update: { id: string, stock_quantity: number, ... }
    if (body.action && Array.isArray(body.ids)) {
      if (body.action === "delete") {
        const { error } = await supabase.from("products").delete().in("id", body.ids);
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true });
      }

      const statusMap: Record<string, string> = {
        activate: "active",
        archive: "archived",
      };

      const status = statusMap[body.action];
      if (status) {
        const { error } = await supabase
          .from("products")
          .update({ status })
          .in("id", body.ids);
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true });
      }
    }

    if (body.id) {
      const updates = { ...body };
      delete updates.id;
      const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", body.id)
        .select()
        .single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ success: true, product: data });
    }

    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
