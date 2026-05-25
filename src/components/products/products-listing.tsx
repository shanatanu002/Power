"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Grid2X2, List, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";

// Demo products for UI — replaced by API calls in production
const demoProducts = [
  {
    id: "p1", name: "Adani 400W Mono PERC Solar Panel", slug: "adani-400w-mono-perc",
    brand: { name: "Adani Solar", slug: "adani-solar" },
    category: { name: "Solar Panels", slug: "solar-panels" },
    price: 12500, salePrice: 10800, gstRate: 12, wattage: 400, warranty: "25 Years",
    images: [{ url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop", isPrimary: true, alt: "Solar Panel", id: "i1", sortOrder: 0 }],
    stock: 50, isAvailable: true, isFeatured: true, isNewArrival: false,
    usageType: ["RESIDENTIAL", "COMMERCIAL"], rating: 4.8, reviewCount: 156,
  },
  {
    id: "p2", name: "Waaree 550W Bifacial Solar Panel", slug: "waaree-550w-bifacial",
    brand: { name: "Waaree", slug: "waaree" },
    category: { name: "Solar Panels", slug: "solar-panels" },
    price: 17500, salePrice: 15200, gstRate: 12, wattage: 550, warranty: "25 Years",
    images: [{ url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop", isPrimary: true, alt: "Solar Panel", id: "i2", sortOrder: 0 }],
    stock: 35, isAvailable: true, isFeatured: true, isNewArrival: false,
    usageType: ["COMMERCIAL", "INDUSTRIAL"], rating: 4.9, reviewCount: 203,
  },
  {
    id: "p3", name: "Tata Power Solar 335W Rooftop Panel", slug: "tata-power-335w-rooftop",
    brand: { name: "Tata Power Solar", slug: "tata-power-solar" },
    category: { name: "Solar Panels", slug: "solar-panels" },
    price: 9800, salePrice: null, gstRate: 12, wattage: 335, warranty: "25 Years",
    images: [{ url: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=400&h=300&fit=crop", isPrimary: true, alt: "Solar Panel", id: "i3", sortOrder: 0 }],
    stock: 60, isAvailable: true, isFeatured: false, isNewArrival: false,
    usageType: ["RESIDENTIAL"], rating: 4.7, reviewCount: 178,
  },
  {
    id: "p4", name: "Luminous 150Ah Lithium Battery", slug: "luminous-150ah-lithium",
    brand: { name: "Luminous", slug: "luminous" },
    category: { name: "Batteries", slug: "batteries" },
    price: 32000, salePrice: 28500, gstRate: 18, wattage: null, warranty: "5 Years",
    images: [{ url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", isPrimary: true, alt: "Battery", id: "i4", sortOrder: 0 }],
    stock: 20, isAvailable: true, isFeatured: true, isNewArrival: true,
    usageType: ["RESIDENTIAL", "COMMERCIAL"], rating: 4.7, reviewCount: 89,
  },
  {
    id: "p5", name: "Exide 200Ah Tall Tubular Battery", slug: "exide-200ah-tubular",
    brand: { name: "Exide", slug: "exide" },
    category: { name: "Batteries", slug: "batteries" },
    price: 18000, salePrice: null, gstRate: 18, wattage: null, warranty: "3 Years",
    images: [{ url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400&h=300&fit=crop", isPrimary: true, alt: "Battery", id: "i5", sortOrder: 0 }],
    stock: 40, isAvailable: true, isFeatured: false, isNewArrival: false,
    usageType: ["RESIDENTIAL"], rating: 4.6, reviewCount: 312,
  },
  {
    id: "p6", name: "Livguard 100Ah Solar Battery", slug: "livguard-100ah-solar",
    brand: { name: "Livguard", slug: "livguard" },
    category: { name: "Batteries", slug: "batteries" },
    price: 12000, salePrice: 10500, gstRate: 18, wattage: null, warranty: "3 Years",
    images: [{ url: "https://images.unsplash.com/photo-1609592903843-a0c40c9cf01f?w=400&h=300&fit=crop", isPrimary: true, alt: "Battery", id: "i6", sortOrder: 0 }],
    stock: 25, isAvailable: true, isFeatured: false, isNewArrival: true,
    usageType: ["RESIDENTIAL"], rating: 4.5, reviewCount: 67,
  },
  {
    id: "p7", name: "Luminous 5kW Hybrid Inverter", slug: "luminous-5kw-hybrid-inverter",
    brand: { name: "Luminous", slug: "luminous" },
    category: { name: "Inverters", slug: "inverters" },
    price: 45000, salePrice: 39500, gstRate: 18, wattage: 5000, warranty: "2 Years",
    images: [{ url: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=400&h=300&fit=crop", isPrimary: true, alt: "Inverter", id: "i7", sortOrder: 0 }],
    stock: 15, isAvailable: true, isFeatured: true, isNewArrival: false,
    usageType: ["RESIDENTIAL", "COMMERCIAL"], rating: 4.8, reviewCount: 134,
  },
  {
    id: "p8", name: "Loom Solar 3kW On-Grid Inverter", slug: "loom-solar-3kw-ongrid",
    brand: { name: "Loom Solar", slug: "loom-solar" },
    category: { name: "Inverters", slug: "inverters" },
    price: 28000, salePrice: 25000, gstRate: 18, wattage: 3000, warranty: "5 Years",
    images: [{ url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop", isPrimary: true, alt: "Inverter", id: "i8", sortOrder: 0 }],
    stock: 22, isAvailable: true, isFeatured: false, isNewArrival: false,
    usageType: ["RESIDENTIAL"], rating: 4.6, reviewCount: 91,
  },
];

const brands = ["All", "Adani Solar", "Tata Power Solar", "Waaree", "Luminous", "Exide", "Livguard", "Loom Solar"];
const categories = ["All", "Solar Panels", "Batteries", "Inverters", "Charge Controllers", "Complete Systems"];
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest First", value: "newest" },
  { label: "Best Rated", value: "rating" },
];

export function ProductsListing() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "All");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200000]);

  const filteredProducts = demoProducts.filter((p) => {
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.name.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = selectedBrand === "All" || p.brand.name === selectedBrand;
    const matchesCategory = selectedCategory === "All" || p.category.name === selectedCategory;
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const activeFilters = [
    selectedBrand !== "All" ? selectedBrand : null,
    selectedCategory !== "All" ? selectedCategory : null,
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search products, brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 min-w-[180px]"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Filter toggle */}
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilters.length > 0 && (
            <span className="bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {activeFilters.length}
            </span>
          )}
        </Button>

        {/* View mode */}
        <div className="flex rounded-lg border border-slate-300 overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={cn("p-2 transition-colors", viewMode === "grid" ? "bg-amber-500 text-white" : "bg-white text-slate-500 hover:bg-slate-50")}
          >
            <Grid2X2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn("p-2 transition-colors", viewMode === "list" ? "bg-amber-500 text-white" : "bg-white text-slate-500 hover:bg-slate-50")}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter bar */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                      selectedCategory === cat
                        ? "bg-amber-500 text-white"
                        : "bg-white border border-slate-300 text-slate-600 hover:border-amber-500"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Brand</label>
              <div className="flex flex-wrap gap-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                      selectedBrand === brand
                        ? "bg-amber-500 text-white"
                        : "bg-white border border-slate-300 text-slate-600 hover:border-amber-500"
                    )}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1.5 pl-3">
              {filter}
              <button
                onClick={() => {
                  if (filter === selectedBrand) setSelectedBrand("All");
                  if (filter === selectedCategory) setSelectedCategory("All");
                }}
                className="hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          <button
            onClick={() => { setSelectedBrand("All"); setSelectedCategory("All"); }}
            className="text-xs text-slate-400 hover:text-red-500 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-slate-500 mb-6">
        Showing <span className="font-semibold text-slate-900">{sortedProducts.length}</span> products
        {search && <> for &quot;<span className="text-amber-600">{search}</span>&quot;</>}
      </p>

      {/* Products grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
          <p className="text-slate-500 mb-4">Try adjusting your filters or search query</p>
          <Button onClick={() => { setSearch(""); setSelectedBrand("All"); setSelectedCategory("All"); }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className={cn(
          "grid gap-6",
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1"
        )}>
          {sortedProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <ProductCard product={product as any} viewMode={viewMode} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
