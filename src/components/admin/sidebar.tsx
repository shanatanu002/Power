"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Sun, LayoutDashboard, Package, ShoppingBag, Users, MessageSquare,
  FileText, Settings, LogOut, ChevronLeft, ChevronRight, Image,
  Star, Bell, BarChart3, Megaphone
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Products", href: "/admin/products", icon: <Package className="w-5 h-5" /> },
  { label: "Orders", href: "/admin/orders", icon: <ShoppingBag className="w-5 h-5" /> },
  { label: "Customers", href: "/admin/customers", icon: <Users className="w-5 h-5" /> },
  { label: "Inquiries", href: "/admin/inquiries", icon: <MessageSquare className="w-5 h-5" /> },
  { label: "Blog", href: "/admin/blog", icon: <FileText className="w-5 h-5" /> },
  { label: "Testimonials", href: "/admin/testimonials", icon: <Star className="w-5 h-5" /> },
  { label: "Banners", href: "/admin/banners", icon: <Image className="w-5 h-5" /> },
  { label: "Newsletter", href: "/admin/newsletter", icon: <Megaphone className="w-5 h-5" /> },
  { label: "Analytics", href: "/admin/analytics", icon: <BarChart3 className="w-5 h-5" /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
];

interface AdminSidebarProps {
  user: { name?: string | null; email?: string | null; image?: string | null };
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={cn(
      "flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 shrink-0",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 h-16">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-sm">Yati Admin</span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center mx-auto">
            <Sun className="w-5 h-5 text-white" />
          </div>
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="flex justify-center py-2 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-500/25"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <span className="shrink-0">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="p-3 border-t border-slate-800">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">
                {user.name?.[0]?.toUpperCase() || "A"}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">{user.name || "Admin"}</p>
              <p className="text-slate-400 text-xs truncate">{user.email}</p>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-2 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl text-xs transition-colors"
          >
            <Sun className="w-4 h-4" />
            {!collapsed && "View Site"}
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center justify-center gap-2 px-2 py-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl text-xs transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && "Logout"}
          </button>
        </div>
      </div>
    </aside>
  );
}
