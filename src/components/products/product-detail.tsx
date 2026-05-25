"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart, MessageCircle, Phone, Star, Shield,
  Zap, Package, Check, ChevronRight, Download, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import { toast } from "@/components/ui/toaster";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    brand: { name: string; slug: string };
    category: { name: string; slug: string };
    price: number;
    salePrice?: number;
    gstRate: number;
    wattage?: number;
    voltage?: number;
    capacity?: string;
    warranty?: string;
    images: { url: string; isPrimary: boolean; alt: string; id: string; sortOrder: number }[];
    stock: number;
    isAvailable: boolean;
    isNewArrival: boolean;
    isFeatured: boolean;
    specifications: Record<string, string>;
    usageType: string[];
    rating: number;
    reviewCount: number;
  };
}

const TAB_SPECS = "specs";
const TAB_DESC = "description";
const TAB_WARRANTY = "warranty";

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(TAB_SPECS);
  const { addItem } = useCartStore();

  const discount = product.salePrice ? getDiscountPercentage(product.price, product.salePrice) : null;
  const effectivePrice = product.salePrice || product.price;
  const gstAmount = (effectivePrice * product.gstRate) / 100;
  const priceWithGST = effectivePrice + gstAmount;
  const whatsappMsg = encodeURIComponent(`Hi! I want to inquire about: ${product.name}. Please provide availability and bulk pricing.`);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      salePrice: product.salePrice,
      image: product.images[0]?.url || "",
      brand: product.brand.name,
      stock: product.stock,
      gstRate: product.gstRate,
    }, quantity);
    toast({ type: "success", title: "Added to cart!", description: `${quantity}x ${product.name}` });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
        <Link href="/" className="hover:text-slate-600">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/products" className="hover:text-slate-600">Products</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/products?category=${product.category.slug}`} className="hover:text-slate-600">{product.category.name}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600 line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left — Images */}
        <div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-4">
            <Image
              src={product.images[selectedImage]?.url || ""}
              alt={product.images[selectedImage]?.alt || product.name}
              fill
              className="object-cover"
              priority
            />
            {discount && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-500 text-white border-0 text-sm">-{discount}% OFF</Badge>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(i)}
                className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                  selectedImage === i ? "border-amber-500" : "border-transparent hover:border-slate-300"
                }`}
              >
                <Image src={img.url} alt={img.alt} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right — Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Link href={`/products?brand=${product.brand.slug}`}>
              <Badge variant="outline" className="text-amber-600 border-amber-500">{product.brand.name}</Badge>
            </Link>
            <Badge variant="secondary">{product.category.name}</Badge>
            {product.isNewArrival && <Badge>New Arrival</Badge>}
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-700">{product.rating}</span>
            <span className="text-sm text-slate-400">({product.reviewCount} reviews)</span>
          </div>

          <p className="text-slate-500 leading-relaxed mb-6">{product.shortDescription}</p>

          {/* Key specs chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.wattage && (
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-full text-sm">
                <Zap className="w-3.5 h-3.5" /> {product.wattage}W
              </div>
            )}
            {product.warranty && (
              <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1.5 rounded-full text-sm">
                <Shield className="w-3.5 h-3.5" /> {product.warranty} Warranty
              </div>
            )}
            {product.isAvailable ? (
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full text-sm">
                <Check className="w-3.5 h-3.5" /> In Stock ({product.stock} units)
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-700 px-3 py-1.5 rounded-full text-sm">
                Out of Stock
              </div>
            )}
          </div>

          {/* Usage types */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.usageType.map((type) => (
              <span key={type} className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full capitalize">
                {type.toLowerCase()}
              </span>
            ))}
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200 rounded-2xl p-5 mb-6">
            <div className="flex items-end gap-3 mb-3">
              <span className="text-4xl font-bold text-slate-900">
                {formatPrice(product.salePrice || product.price)}
              </span>
              {product.salePrice && (
                <span className="text-xl text-slate-400 line-through mb-1">{formatPrice(product.price)}</span>
              )}
            </div>
            <div className="text-sm text-slate-500 space-y-1">
              <p>Base price: {formatPrice(effectivePrice)}</p>
              <p>GST ({product.gstRate}%): {formatPrice(gstAmount)}</p>
              <p className="font-semibold text-slate-700">Total inc. GST: {formatPrice(priceWithGST)}</p>
            </div>
          </div>

          {/* Quantity + CTA */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors text-lg"
              >
                −
              </button>
              <span className="w-12 text-center font-semibold text-slate-900">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors text-lg"
              >
                +
              </button>
            </div>
            <Button
              variant="solar"
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!product.isAvailable}
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href={`https://wa.me/918090277689?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" className="w-full bg-[#25D366] text-white hover:bg-[#20bd5a]">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Inquiry
              </Button>
            </a>
            <a href="tel:+918090277689">
              <Button variant="outline" className="w-full">
                <Phone className="w-4 h-4" />
                Call for Quote
              </Button>
            </a>
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Package className="w-4 h-4 text-amber-500" />
              Free delivery above ₹50,000
            </div>
            <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-1 border-b border-slate-200 mb-8">
          {[
            { id: TAB_SPECS, label: "Specifications" },
            { id: TAB_DESC, label: "Description" },
            { id: TAB_WARRANTY, label: "Warranty" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab.id
                  ? "border-amber-500 text-amber-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === TAB_SPECS && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex items-start gap-3 py-2.5 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-500 min-w-[200px]">{key}</span>
                <span className="text-sm font-medium text-slate-900">{value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === TAB_DESC && (
          <div className="prose prose-slate max-w-none">
            {product.description.split("\n\n").map((para, i) => (
              <p key={i} className="text-slate-600 leading-relaxed mb-4">{para.trim()}</p>
            ))}
          </div>
        )}

        {activeTab === TAB_WARRANTY && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <Shield className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Performance Warranty</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                25-year linear power output warranty. The panel guarantees at least 97% of rated power in year 1,
                degrading by no more than 0.55% per year to 82.6% in year 25.
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
              <Package className="w-8 h-8 text-emerald-500 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">Product Warranty</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                12-year product warranty against defects in materials and workmanship.
                Free replacement of defective panels within warranty period. Warranty backed by {product.brand.name}.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
