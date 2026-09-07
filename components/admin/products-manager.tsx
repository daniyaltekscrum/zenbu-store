"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Papa from "papaparse";
import {
  Package,
  Plus,
  FileSpreadsheet,
  Link2,
  Search,
  Filter,
  Trash2,
  Archive,
  CheckCircle,
  X,
  Upload,
  AlertCircle,
  Loader2,
  Sparkles,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CatalogCategory } from "@/lib/catalog";

interface ProductRow {
  id: string;
  title: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  stock_quantity: number;
  status: "active" | "draft" | "archived";
  source_type: "manual" | "sheet" | "link_import";
  source_url?: string;
  brand: string;
  sku: string;
  categories?: { id: string; name: string; slug: string };
  product_images?: { id: string; url: string; position: number }[];
}

interface ProductsManagerProps {
  initialProducts: ProductRow[];
  categories: CatalogCategory[];
}

export function ProductsManager({ initialProducts, categories }: ProductsManagerProps) {
  const [products, setProducts] = useState<ProductRow[]>(initialProducts);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [savingStockId, setSavingStockId] = useState<string | null>(null);

  // Modals state
  const [activeModal, setActiveModal] = useState<"none" | "manual" | "sheet" | "link">("none");

  // Manual / Review form state
  const [formProduct, setFormProduct] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    compare_at_price: "",
    brand: "Zenbu Verified",
    category_id: categories[0]?.id || "",
    sku: "",
    stock: "50",
    image: "",
    source_type: "manual" as "manual" | "sheet" | "link_import",
    source_url: "",
  });

  // Link import specific state
  const [linkUrl, setLinkUrl] = useState("");
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkError, setLinkError] = useState("");

  // Sheet CSV import state
  const [csvPreview, setCsvPreview] = useState<any[]>([]);
  const [csvErrors, setCsvErrors] = useState<string[]>([]);
  const [csvLoading, setCsvLoading] = useState(false);
  const [csvSuccessMsg, setCsvSuccessMsg] = useState("");

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (categoryFilter !== "all" && p.categories?.slug !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, statusFilter, categoryFilter, searchQuery]);

  // Bulk Actions
  const handleBulkAction = async (action: "activate" | "archive" | "delete") => {
    if (selectedIds.length === 0) return;
    if (action === "delete" && !confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) {
      return;
    }

    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ids: selectedIds }),
      });

      if (res.ok) {
        if (action === "delete") {
          setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
        } else {
          const newStatus = action === "activate" ? "active" : "archived";
          setProducts((prev) =>
            prev.map((p) => (selectedIds.includes(p.id) ? { ...p, status: newStatus } : p))
          );
        }
        setSelectedIds([]);
      }
    } catch {
      alert("Failed to execute bulk action");
    }
  };

  // Inline Stock Edit
  const handleStockChange = async (id: string, newStock: number) => {
    setSavingStockId(id);
    try {
      const res = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, stock_quantity: newStock }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, stock_quantity: newStock } : p))
        );
      }
    } finally {
      setSavingStockId(null);
    }
  };

  // Link Scraper Handler
  const handleScrapeLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl.trim()) return;

    setLinkLoading(true);
    setLinkError("");

    try {
      const res = await fetch("/api/admin/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: linkUrl }),
      });

      const data = await res.json();
      if (!res.ok) {
        setLinkError(data.error || "Scraping failed. You can use the manual paste fallback below.");
        // Pre-fill manual fallback
        setFormProduct((prev) => ({
          ...prev,
          source_url: linkUrl,
          source_type: "link_import",
        }));
        return;
      }

      // Populate review form with scraped & AI-rewritten data
      setFormProduct({
        title: data.title || "",
        slug: data.slug || "",
        description: data.description || "",
        price: data.price ? String(data.price) : "",
        compare_at_price: data.compare_at_price ? String(data.compare_at_price) : "",
        brand: data.brand || "Zenbu Verified",
        category_id: categories[0]?.id || "",
        sku: `SKU-${Date.now().toString().slice(-6)}`,
        stock: "50",
        image: data.image || "",
        source_type: "link_import",
        source_url: data.source_url || linkUrl,
      });
    } catch (err: any) {
      setLinkError(err.message || "Failed to reach scraping service");
    } finally {
      setLinkLoading(false);
    }
  };

  // Save reviewed product (works for Manual, Link Import, or Manual Fallback)
  const handleSaveReviewedProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: formProduct.title,
        slug:
          formProduct.slug ||
          formProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: formProduct.description,
        price: Number(formProduct.price) || 0,
        compare_at_price: formProduct.compare_at_price ? Number(formProduct.compare_at_price) : null,
        brand: formProduct.brand,
        category_id: formProduct.category_id,
        sku: formProduct.sku,
        stock: Number(formProduct.stock) || 50,
        image: formProduct.image,
        source_type: formProduct.source_type,
        source_url: formProduct.source_url || null,
        status: "active",
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.products?.[0]) {
        setProducts((prev) => [data.products[0], ...prev]);
        setActiveModal("none");
        // Reset form
        setFormProduct({
          title: "",
          slug: "",
          description: "",
          price: "",
          compare_at_price: "",
          brand: "Zenbu Verified",
          category_id: categories[0]?.id || "",
          sku: "",
          stock: "50",
          image: "",
          source_type: "manual",
          source_url: "",
        });
      } else {
        alert(data.error || "Failed to save product");
      }
    } catch {
      alert("Error saving product to database");
    }
  };

  // CSV File Upload Handler (Path A)
  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvErrors([]);
    setCsvPreview([]);
    setCsvSuccessMsg("");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as any[];
        const errors: string[] = [];
        const validRows: any[] = [];

        // Required columns: title, description, price, category, sku, stock
        rows.forEach((row, index) => {
          const rowNum = index + 2;
          if (!row.title || !row.title.trim()) {
            errors.push(`Row ${rowNum}: Missing required 'title'`);
            return;
          }
          if (!row.price || isNaN(Number(row.price))) {
            errors.push(`Row ${rowNum}: Missing or invalid 'price' for "${row.title}"`);
            return;
          }

          // Match category slug or fallback
          const matchedCat = categories.find(
            (c) =>
              c.slug.toLowerCase() === (row.category || "").toLowerCase().trim() ||
              c.name.toLowerCase() === (row.category || "").toLowerCase().trim()
          );

          validRows.push({
            title: row.title.trim(),
            description: row.description || "",
            price: Number(row.price),
            compare_at_price: row.compare_at_price ? Number(row.compare_at_price) : null,
            brand: row.brand || "Zenbu Verified",
            category_id: matchedCat?.id || categories[0]?.id,
            category_name: matchedCat?.name || categories[0]?.name || "General",
            sku: row.sku || `SKU-${Date.now().toString().slice(-6)}-${index}`,
            stock: Number(row.stock) || 50,
            image: row.image_url_1 || row.image || "/logo/1.png",
            images: [row.image_url_1, row.image_url_2].filter(Boolean),
            source_type: "sheet",
          });
        });

        setCsvErrors(errors);
        setCsvPreview(validRows);
      },
      error: (err) => {
        setCsvErrors([`Failed to parse CSV file: ${err.message}`]);
      },
    });
  };

  // Confirm CSV Import
  const handleConfirmCsvImport = async () => {
    if (csvPreview.length === 0) return;
    setCsvLoading(true);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(csvPreview),
      });

      const data = await res.json();
      if (res.ok) {
        setProducts((prev) => [...(data.products || []), ...prev]);
        setCsvSuccessMsg(`Successfully imported ${data.count} products!`);
        setTimeout(() => {
          setActiveModal("none");
          setCsvPreview([]);
          setCsvSuccessMsg("");
        }, 1500);
      } else {
        alert(data.error || "Failed to import CSV products");
      }
    } catch {
      alert("Network error during import");
    } finally {
      setCsvLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Main Import Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products Management</h1>
          <p className="text-xs sm:text-sm text-zinc-500">
            Create products manually, bulk import from CSV templates, or scrape live product links with AI descriptions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Path A: Import from Sheet */}
          <Button
            onClick={() => setActiveModal("sheet")}
            variant="outline"
            size="sm"
            className="rounded-xl gap-1.5 font-semibold text-xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Import from Sheet
          </Button>

          {/* Path B: Import from Link */}
          <Button
            onClick={() => {
              setLinkUrl("");
              setLinkError("");
              setActiveModal("link");
            }}
            variant="outline"
            size="sm"
            className="rounded-xl gap-1.5 font-semibold text-xs border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20"
          >
            <Link2 className="w-4 h-4 text-emerald-600" />
            Import from Link
          </Button>

          {/* Manual Entry */}
          <Button
            onClick={() => {
              setFormProduct({
                title: "",
                slug: "",
                description: "",
                price: "",
                compare_at_price: "",
                brand: "Zenbu Verified",
                category_id: categories[0]?.id || "",
                sku: "",
                stock: "50",
                image: "",
                source_type: "manual",
                source_url: "",
              });
              setActiveModal("manual");
            }}
            size="sm"
            className="rounded-xl gap-1.5 font-semibold text-xs"
          >
            <Plus className="w-4 h-4" />
            New Product
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by title, brand, SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border border-black/10 dark:border-white/10 focus:border-emerald-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-zinc-700 dark:text-zinc-300 focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Action Toolbar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between p-3 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 animate-in fade-in">
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
            {selectedIds.length} {selectedIds.length === 1 ? "product" : "products"} selected
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkAction("activate")}
              className="h-8 text-xs font-semibold"
            >
              <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Activate
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkAction("archive")}
              className="h-8 text-xs font-semibold"
            >
              <Archive className="w-3.5 h-3.5 mr-1 text-zinc-500" />
              Archive
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkAction("delete")}
              className="h-8 text-xs font-semibold text-rose-600 border-rose-500/30 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/70 dark:bg-zinc-900/60 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50/80 dark:bg-zinc-800/80 border-b border-black/5 dark:border-white/5 text-zinc-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={
                      filteredProducts.length > 0 &&
                      selectedIds.length === filteredProducts.length
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(filteredProducts.map((p) => p.id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                    className="rounded-xs cursor-pointer"
                  />
                </th>
                <th className="p-3.5">Product</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Inline Stock</th>
                <th className="p-3.5">Source</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-zinc-500">
                    No products found matching the criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const isSelected = selectedIds.includes(product.id);
                  const img = product.product_images?.[0]?.url || "/logo/1.png";

                  return (
                    <tr
                      key={product.id}
                      className={`hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors ${
                        isSelected ? "bg-emerald-50/30 dark:bg-emerald-950/20" : ""
                      }`}
                    >
                      <td className="p-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedIds([...selectedIds, product.id]);
                            } else {
                              setSelectedIds(selectedIds.filter((id) => id !== product.id));
                            }
                          }}
                          className="rounded-xs cursor-pointer"
                        />
                      </td>

                      <td className="p-3.5">
                        <div className="flex items-center gap-3 min-w-[200px]">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white dark:bg-zinc-800 border shrink-0 flex items-center justify-center">
                            <Image
                              src={img}
                              alt=""
                              fill
                              sizes="40px"
                              className="object-contain p-1"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                              {product.title}
                            </div>
                            <div className="text-[10px] text-zinc-400 font-mono">
                              {product.brand} • {product.sku}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5 text-zinc-600 dark:text-zinc-300 whitespace-nowrap">
                        {product.categories?.name || "General"}
                      </td>

                      <td className="p-3.5 font-bold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                        Rs. {product.price.toLocaleString()}
                      </td>

                      {/* Inline Stock Quantity Editing */}
                      <td className="p-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            defaultValue={product.stock_quantity}
                            onBlur={(e) =>
                              handleStockChange(product.id, Number(e.target.value))
                            }
                            className="w-16 h-8 px-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-black/10 dark:border-white/10 text-xs font-bold text-center focus:border-emerald-500 focus:outline-hidden"
                          />
                          {savingStockId === product.id && (
                            <Loader2 className="w-3.5 h-3.5 text-emerald-500 animate-spin" />
                          )}
                        </div>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <Badge variant="outline" className="text-[10px] uppercase font-mono">
                          {product.source_type}
                        </Badge>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <Badge
                          variant={product.status === "active" ? "accent" : "outline"}
                          className="text-[10px]"
                        >
                          {product.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Path A - CSV / Sheet Import Modal */}
      {activeModal === "sheet" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setActiveModal("none")}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-950 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold">Import Products from CSV / Sheet</h3>
              </div>
              <button
                onClick={() => setActiveModal("none")}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Template Format Instructions */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-500/20 text-xs text-zinc-600 dark:text-zinc-300 space-y-1">
              <div className="font-bold text-zinc-900 dark:text-white">Fixed Column Template:</div>
              <div className="font-mono text-[11px] text-emerald-800 dark:text-emerald-300">
                title, description, price, category, sku, stock, image_url_1, image_url_2
              </div>
              <p className="text-[11px] text-zinc-500 pt-1">
                Google Sheets link sync is stubbed as a future direct API integration; currently accepts immediate CSV exports.
              </p>
            </div>

            {/* Upload Input */}
            <div className="border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl p-8 text-center space-y-3 hover:border-emerald-500/40 transition-colors">
              <Upload className="w-8 h-8 mx-auto text-zinc-400" />
              <div className="space-y-1">
                <div className="text-sm font-bold">Upload CSV file</div>
                <div className="text-xs text-zinc-500">Select an exported spreadsheet (.csv)</div>
              </div>
              <input
                type="file"
                accept=".csv"
                onChange={handleCsvUpload}
                className="block mx-auto text-xs cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 dark:file:bg-emerald-950 dark:file:text-emerald-300 hover:file:bg-emerald-100"
              />
            </div>

            {/* Parsing Errors Banner */}
            {csvErrors.length > 0 && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-500/20 text-xs text-rose-700 dark:text-rose-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Validation Warnings ({csvErrors.length})
                </div>
                <ul className="list-disc pl-5 space-y-0.5 max-h-24 overflow-y-auto">
                  {csvErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Preview Table */}
            {csvPreview.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Preview Valid Rows ({csvPreview.length})</span>
                  <span className="text-emerald-600">Review before database insert</span>
                </div>
                <div className="max-h-56 overflow-y-auto rounded-xl border border-black/5 dark:border-white/5 divide-y divide-black/5 dark:divide-white/5">
                  {csvPreview.map((row, idx) => (
                    <div key={idx} className="p-3 text-xs flex justify-between items-center">
                      <div className="min-w-0 pr-3">
                        <div className="font-bold truncate">{row.title}</div>
                        <div className="text-[10px] text-zinc-400">
                          {row.category_name} • SKU: {row.sku} • Qty: {row.stock}
                        </div>
                      </div>
                      <div className="font-bold whitespace-nowrap">Rs. {row.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {csvSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center">
                {csvSuccessMsg}
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end gap-2 pt-3 border-t border-black/5 dark:border-white/5">
              <Button variant="outline" size="sm" onClick={() => setActiveModal("none")}>
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={csvPreview.length === 0 || csvLoading}
                onClick={handleConfirmCsvImport}
                className="font-bold gap-1.5"
              >
                {csvLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                Confirm Import ({csvPreview.length} Products)
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Path B - Paste Product Link Modal */}
      {activeModal === "link" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setActiveModal("none")}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-xl bg-white dark:bg-zinc-950 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2">
                <Link2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold">Import from Product Link</h3>
              </div>
              <button
                onClick={() => setActiveModal("none")}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* URL Input Form */}
            <form onSubmit={handleScrapeLink} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Product Page URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    placeholder="https://www.dvago.pk/p/pediasure-vanilla-850g"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="flex-1 h-10 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border border-black/10 dark:border-white/10 focus:border-emerald-500 focus:outline-hidden"
                  />
                  <Button type="submit" disabled={linkLoading} size="sm" className="h-10 px-4 font-bold">
                    {linkLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Scrape & Rewrite"}
                  </Button>
                </div>
              </div>
            </form>

            {/* Error or Fallback Warning */}
            {linkError && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> {linkError}
                </div>
                <p className="text-[11px]">
                  Manual Fallback Activated: You can paste the title, price, and image below and proceed.
                </p>
              </div>
            )}

            {/* Review Form (Every import funnels through this before saving) */}
            {(formProduct.title || formProduct.source_url) && (
              <form onSubmit={handleSaveReviewedProduct} className="space-y-4 pt-2 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Review & Confirm Details</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">Title *</label>
                  <input
                    type="text"
                    required
                    value={formProduct.title}
                    onChange={(e) => setFormProduct({ ...formProduct, title: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Price (Rs.) *</label>
                    <input
                      type="number"
                      required
                      value={formProduct.price}
                      onChange={(e) => setFormProduct({ ...formProduct, price: e.target.value })}
                      className="w-full h-9 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium">Compare At (Rs.)</label>
                    <input
                      type="number"
                      value={formProduct.compare_at_price}
                      onChange={(e) =>
                        setFormProduct({ ...formProduct, compare_at_price: e.target.value })
                      }
                      className="w-full h-9 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Brand</label>
                    <input
                      type="text"
                      value={formProduct.brand}
                      onChange={(e) => setFormProduct({ ...formProduct, brand: e.target.value })}
                      className="w-full h-9 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium">Category</label>
                    <select
                      value={formProduct.category_id}
                      onChange={(e) =>
                        setFormProduct({ ...formProduct, category_id: e.target.value })
                      }
                      className="w-full h-9 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">Image URL</label>
                  <input
                    type="url"
                    value={formProduct.image}
                    onChange={(e) => setFormProduct({ ...formProduct, image: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium">AI-Rewritten Description</label>
                    <span className="text-[10px] text-emerald-600 font-semibold">SEO Protected</span>
                  </div>
                  <textarea
                    rows={3}
                    value={formProduct.description}
                    onChange={(e) =>
                      setFormProduct({ ...formProduct, description: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => setActiveModal("none")}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="font-bold">
                    Save to Catalog
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: Manual Product Entry Modal */}
      {activeModal === "manual" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setActiveModal("none")}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-xl bg-white dark:bg-zinc-950 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold">New Product (Manual Entry)</h3>
              </div>
              <button
                onClick={() => setActiveModal("none")}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveReviewedProduct} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pediasure Vanilla Milk Powder 850g"
                  value={formProduct.title}
                  onChange={(e) => setFormProduct({ ...formProduct, title: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Price (Rs.) *</label>
                  <input
                    type="number"
                    required
                    placeholder="7100"
                    value={formProduct.price}
                    onChange={(e) => setFormProduct({ ...formProduct, price: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">Compare At Price (Rs.)</label>
                  <input
                    type="number"
                    placeholder="8165"
                    value={formProduct.compare_at_price}
                    onChange={(e) =>
                      setFormProduct({ ...formProduct, compare_at_price: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Brand</label>
                  <input
                    type="text"
                    value={formProduct.brand}
                    onChange={(e) => setFormProduct({ ...formProduct, brand: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium">Initial Stock Quantity</label>
                  <input
                    type="number"
                    value={formProduct.stock}
                    onChange={(e) => setFormProduct({ ...formProduct, stock: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium">Category</label>
                <select
                  value={formProduct.category_id}
                  onChange={(e) =>
                    setFormProduct({ ...formProduct, category_id: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium">Primary Image URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formProduct.image}
                  onChange={(e) => setFormProduct({ ...formProduct, image: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium">Product Description</label>
                <textarea
                  rows={3}
                  placeholder="Enter detailed specifications, ingredients, or benefits..."
                  value={formProduct.description}
                  onChange={(e) =>
                    setFormProduct({ ...formProduct, description: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-black/5 dark:border-white/5">
                <Button variant="outline" size="sm" onClick={() => setActiveModal("none")}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="font-bold">
                  Create Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
