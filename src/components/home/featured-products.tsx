"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye, Star, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import { toast } from "@/components/ui/toaster";

// Static featured products for demo — these will be replaced by API data
const featuredProducts = [
  {
    id: "1",
    name: "Adani 400W Mono PERC Solar Panel",
    slug: "adani-400w-mono-perc-solar-panel",
    brand: "Adani Solar",
    category: "Solar Panels",
    price: 12500,
    salePrice: 10800,
    wattage: 400,
    warranty: "25 Years",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 156,
    isFeatured: true,
    isNew: false,
    stock: 50,
    gstRate: 12,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Luminous 150Ah Lithium Battery",
    slug: "luminous-150ah-lithium-battery",
    brand: "Luminous",
    category: "Batteries",
    price: 32000,
    salePrice: 28500,
    wattage: null,
    warranty: "5 Years",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 89,
    isFeatured: true,
    isNew: true,
    stock: 20,
    gstRate: 18,
    badge: "New Arrival",
  },
  {
    id: "3",
    name: "Waaree 550W Bifacial Panel",
    slug: "waaree-550w-bifacial-panel",
    brand: "Waaree",
    category: "Solar Panels",
    price: 17500,
    salePrice: 15200,
    wattage: 550,
    warranty: "25 Years",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 203,
    isFeatured: true,
    isNew: false,
    stock: 35,
    gstRate: 12,
    badge: "Top Rated",
  },
  {
    id: "4",
    name: "Exide 200Ah Tubular Battery",
    slug: "exide-200ah-tubular-battery",
    brand: "Exide",
    category: "Batteries",
    price: 18000,
    salePrice: null,
    wattage: null,
    warranty: "3 Years",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 312,
    isFeatured: true,
    isNew: false,
    stock: 40,
    gstRate: 18,
    badge: "Popular",
  },
];

export function FeaturedProducts() {
  const { addItem } = useCartStore();

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      salePrice: product.salePrice || undefined,
      image: product.image,
      brand: product.brand,
      stock: product.stock,
      gstRate: product.gstRate,
    });
    toast({ type: "success", title: "Added to cart!", description: product.name });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">Featured</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-1">Best Selling Products</h2>
          </div>
          <Link href="/products">
            <Button variant="outline" className="group">
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, i) => {
            const discount = product.salePrice
              ? getDiscountPercentage(product.price, product.salePrice)
              : null;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.badge && (
                      <Badge variant={product.isNew ? "default" : "secondary"} className="text-xs">
                        {product.badge}
                      </Badge>
                    )}
                    {discount && (
                      <Badge className="bg-red-500 text-white text-xs">-{discount}%</Badge>
                    )}
                  </div>

                  {/* Quick actions */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <Link href={`/products/${product.slug}`}>
                      <button className="w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center hover:bg-amber-50 transition-colors">
                        <Eye className="w-4 h-4 text-slate-600" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-9 h-9 bg-amber-500 rounded-xl shadow-lg flex items-center justify-center hover:bg-amber-400 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      {product.brand}
                    </span>
                    {product.wattage && (
                      <span className="text-xs text-slate-400 flex items-center gap-0.5">
                        <Zap className="w-3 h-3" /> {product.wattage}W
                      </span>
                    )}
                  </div>

                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-semibold text-slate-900 text-sm leading-snug hover:text-amber-600 transition-colors line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium text-slate-700">{product.rating}</span>
                    <span className="text-xs text-slate-400">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {product.salePrice ? (
                        <div>
                          <span className="text-lg font-bold text-slate-900">
                            {formatPrice(product.salePrice)}
                          </span>
                          <span className="text-sm text-slate-400 line-through ml-1.5">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-slate-900">
                          {formatPrice(product.price)}
                        </span>
                      )}
                      <p className="text-xs text-slate-400">+GST</p>
                    </div>
                    <Button
                      size="sm"
                      variant="solar"
                      onClick={() => handleAddToCart(product)}
                      className="text-xs px-3"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
