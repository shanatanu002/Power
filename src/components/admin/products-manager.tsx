"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus, Search, Edit, Trash2, Eye, RefreshCw,
  Package, Filter, MoreHorizontal, CheckCircle, XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { toast } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  wattage?: number;
  brand: { name: string };
  category: { name: string };
  images: { url: string; isPrimary: boolean }[];
}

export function AdminProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const LIMIT = 10;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: LIMIT.toString(),
        ...(search && { search }),
      });
      const res = await fetch(`/api/products?${params}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.data || []);
        setTotal(data.meta?.total || 0);
      }
    } catch (err) {
      toast({ type: "error", title: "Failed to load products" });
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleDelete = async (slug: string) => {
    try {
      const res = await fetch(`/api/products/${slug}`, { method: "DELETE" });
      if (res.ok) {
        toast({ type: "success", title: "Product deleted" });
        fetchProducts();
      } else {
        throw new Error("Delete failed");
      }
    } catch {
      toast({ type: "error", title: "Failed to delete product" });
    } finally {
      setConfirmDelete(null);
    }
  };

  const toggleAvailability = async (slug: string, isAvailable: boolean) => {
    try {
      const res = await fetch(`/api/products/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !isAvailable }),
      });
      if (res.ok) {
        toast({ type: "success", title: `Product ${isAvailable ? "disabled" : "enabled"}` });
        fetchProducts();
      }
    } catch {
      toast({ type: "error", title: "Update failed" });
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500 text-sm">{total} total products</p>
        </div>
        <Link href="/admin/products/new">
          <Button variant="solar" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-5 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search products, brands..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
          />
        </div>
        <button
          onClick={fetchProducts}
          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 text-slate-500 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-12">#</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Product</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Brand / Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Price</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Stock</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: LIMIT }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((__, j) => (
                      <td key={j} className="px-4 py-4">
                        <div className="h-4 skeleton rounded w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-400">
                    <Package className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No products found</p>
                  </td>
                </tr>
              ) : (
                products.map((product, idx) => {
                  const img = product.images.find((i) => i.isPrimary) || product.images[0];
                  return (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-xs text-slate-400">{(page - 1) * LIMIT + idx + 1}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                            {img && <Image src={img.url} alt={product.name} fill className="object-cover" />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-900 line-clamp-1">{product.name}</p>
                            {product.wattage && <p className="text-xs text-slate-400">{product.wattage}W</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-slate-700">{product.brand.name}</p>
                        <p className="text-xs text-slate-400">{product.category.name}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-semibold text-slate-900">
                          {formatPrice(product.salePrice || product.price)}
                        </p>
                        {product.salePrice && (
                          <p className="text-xs text-slate-400 line-through">{formatPrice(product.price)}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "text-sm font-medium",
                          product.stock > 10 ? "text-emerald-600" : product.stock > 0 ? "text-amber-600" : "text-red-600"
                        )}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <Badge variant={product.isAvailable ? "success" : "destructive"} className="w-fit text-xs">
                            {product.isAvailable ? "Active" : "Disabled"}
                          </Badge>
                          {product.isFeatured && <Badge variant="default" className="w-fit text-xs">Featured</Badge>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/products/${product.slug}`} target="_blank">
                            <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                          </Link>
                          <Link href={`/admin/products/${product.slug}/edit`}>
                            <button className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-colors" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                          </Link>
                          <button
                            onClick={() => toggleAvailability(product.slug, product.isAvailable)}
                            className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                            title={product.isAvailable ? "Disable" : "Enable"}
                          >
                            {product.isAvailable ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                          </button>
                          {confirmDelete === product.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(product.slug)}
                                className="px-2 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setConfirmDelete(null)}
                                className="px-2 py-1 bg-slate-200 text-slate-700 rounded-lg text-xs hover:bg-slate-300 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDelete(product.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {total > LIMIT && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Showing {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, total)} of {total}
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
              <Button size="sm" variant="outline" disabled={page * LIMIT >= total} onClick={() => setPage(page + 1)}>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
