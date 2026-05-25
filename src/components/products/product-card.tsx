"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye, Star, Zap, Shield, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import { toast } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    brand: { name: string; slug: string };
    category: { name: string };
    price: number;
    salePrice?: number | null;
    gstRate: number;
    wattage?: number | null;
    warranty?: string | null;
    images: { url: string; isPrimary: boolean; alt?: string | null }[];
    stock: number;
    isAvailable: boolean;
    isNewArrival: boolean;
    isFeatured: boolean;
    rating?: number;
    reviewCount?: number;
  };
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const { addItem } = useCartStore();
  const primaryImage = product.images.find((i) => i.isPrimary) || product.images[0];
  const discount = product.salePrice ? getDiscountPercentage(product.price, product.salePrice) : null;
  const whatsappMsg = encodeURIComponent(`Hi! I'm interested in ${product.name}. Please provide pricing details.`);

  const handleAddToCart = () => {
    if (!product.isAvailable || product.stock === 0) return;
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      salePrice: product.salePrice || undefined,
      image: primaryImage?.url || "",
      brand: product.brand.name,
      stock: product.stock,
      gstRate: product.gstRate,
    });
    toast({ type: "success", title: "Added to cart!", description: product.name });
  };

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 hover:shadow-lg transition-all p-4 flex gap-5">
        <Link href={`/products/${product.slug}`} className="relative w-36 h-28 shrink-0 rounded-xl overflow-hidden bg-slate-100">
          {primaryImage && (
            <Image src={primaryImage.url} alt={primaryImage.alt || product.name} fill className="object-cover" />
          )}
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{product.brand.name}</span>
                <span className="text-xs text-slate-400">{product.category.name}</span>
              </div>
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-semibold text-slate-900 hover:text-amber-600 transition-colors line-clamp-1">{product.name}</h3>
              </Link>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                {product.wattage && <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{product.wattage}W</span>}
                {product.warranty && <span className="flex items-center gap-1"><Shield className="w-3 h-3" />{product.warranty} warranty</span>}
              </div>
            </div>
            <div className="text-right shrink-0">
              {product.salePrice ? (
                <div>
                  <span className="text-xl font-bold text-slate-900">{formatPrice(product.salePrice)}</span>
                  <span className="text-sm text-slate-400 line-through ml-2">{formatPrice(product.price)}</span>
                </div>
              ) : (
                <span className="text-xl font-bold text-slate-900">{formatPrice(product.price)}</span>
              )}
              <p className="text-xs text-slate-400">+{product.gstRate}% GST</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <Button size="sm" variant="solar" onClick={handleAddToCart} disabled={!product.isAvailable}>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </Button>
            <Link href={`/products/${product.slug}`}>
              <Button size="sm" variant="outline">View Details</Button>
            </Link>
            <a href={`https://wa.me/918090277689?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Zap className="w-12 h-12 text-slate-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNewArrival && <Badge className="text-xs">New</Badge>}
          {product.isFeatured && !product.isNewArrival && <Badge variant="secondary" className="text-xs">Featured</Badge>}
          {discount && <Badge className="bg-red-500 text-white border-0 text-xs">-{discount}%</Badge>}
          {!product.isAvailable && <Badge className="bg-slate-500 text-white border-0 text-xs">Out of Stock</Badge>}
        </div>

        {/* Quick actions */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          <Link href={`/products/${product.slug}`}>
            <button className="w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-amber-50 transition-colors">
              <Eye className="w-4 h-4 text-slate-600" />
            </button>
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className={cn(
              "w-9 h-9 rounded-xl shadow-lg flex items-center justify-center transition-colors",
              product.isAvailable ? "bg-amber-500 hover:bg-amber-400" : "bg-slate-300 cursor-not-allowed"
            )}
          >
            <ShoppingCart className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{product.brand.name}</span>
          {product.wattage && (
            <span className="text-xs text-slate-400 flex items-center gap-0.5">
              <Zap className="w-3 h-3" />{product.wattage}W
            </span>
          )}
        </div>

        <Link href={`/products/${product.slug}`} className="flex-1">
          <h3 className="font-semibold text-slate-900 text-sm leading-snug hover:text-amber-600 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>

        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-slate-700">{product.rating}</span>
            {product.reviewCount && <span className="text-xs text-slate-400">({product.reviewCount})</span>}
          </div>
        )}

        <div className="flex items-end justify-between mt-auto">
          <div>
            {product.salePrice ? (
              <div>
                <span className="text-lg font-bold text-slate-900">{formatPrice(product.salePrice)}</span>
                <span className="text-sm text-slate-400 line-through ml-1.5">{formatPrice(product.price)}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-slate-900">{formatPrice(product.price)}</span>
            )}
            <p className="text-xs text-slate-400">+{product.gstRate}% GST</p>
          </div>
          <Button
            size="sm"
            variant="solar"
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className="text-xs px-3"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
