"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun, ShoppingCart, Menu, X, Phone, ChevronDown,
  Zap, Battery, Building2, Home, Factory, User, LogOut
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Solar Panels", href: "/products?category=solar-panels", icon: <Sun className="w-4 h-4" /> },
      { label: "Batteries", href: "/products?category=batteries", icon: <Battery className="w-4 h-4" /> },
      { label: "Inverters", href: "/products?category=inverters", icon: <Zap className="w-4 h-4" /> },
      { label: "Residential", href: "/products?type=RESIDENTIAL", icon: <Home className="w-4 h-4" /> },
      { label: "Commercial", href: "/products?type=COMMERCIAL", icon: <Building2 className="w-4 h-4" /> },
      { label: "Industrial", href: "/products?type=INDUSTRIAL", icon: <Factory className="w-4 h-4" /> },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { getTotalItems, openCart } = useCartStore();
  const cartCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-amber-400" />
              <a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`} className="hover:text-amber-400 transition-colors">
                +91 98765 43210
              </a>
            </span>
            <span>info@yatipowers.com</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-medium">🌞 Free Solar Consultation Available</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50"
            : "bg-white border-b border-slate-200"
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Sun className="w-5 h-5 text-white" />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-slate-900 leading-none block">
                  Yati <span className="text-amber-500">Powers</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium leading-none">Solar Energy Solutions</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        pathname.startsWith(link.href)
                          ? "text-amber-600 bg-amber-50"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      )}
                    >
                      {link.label}
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", activeDropdown === link.label && "rotate-180")} />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
                        >
                          <div className="p-2">
                            {link.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                              >
                                <span className="text-amber-500">{child.icon}</span>
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "text-amber-600 bg-amber-50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-slate-900 text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              {/* Auth */}
              {session ? (
                <div className="hidden md:flex items-center gap-2">
                  {(session.user as any)?.role === "ADMIN" && (
                    <Link href="/admin">
                      <Button size="sm" variant="secondary">Admin</Button>
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                    title="Sign out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/auth/login">
                    <Button size="sm" variant="ghost">Login</Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="sm" variant="solar">Get Quote</Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-lg overflow-hidden sticky top-16 z-40"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-amber-50 text-amber-600"
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                        >
                          <span className="text-amber-400">{child.icon}</span>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <Link href="/contact">
                  <Button className="w-full" variant="solar">Get Free Quote</Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
