"use client";

import { useEffect, useState } from "react";
import {
  ShoppingBag, Users, IndianRupee, Package, MessageSquare,
  TrendingUp, Clock, CheckCircle, AlertCircle, RefreshCw
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  newInquiries: number;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  shippingName: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-purple-100 text-purple-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dashboard");
      if (res.ok) {
        const data = await res.json();
        setStats(data.data.stats);
        setRecentOrders(data.data.recentOrders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const statCards = stats ? [
    { label: "Total Revenue", value: formatPrice(stats.totalRevenue), icon: <IndianRupee className="w-6 h-6" />, color: "from-amber-400 to-orange-500", change: "+12% this month" },
    { label: "Total Orders", value: stats.totalOrders.toString(), icon: <ShoppingBag className="w-6 h-6" />, color: "from-blue-400 to-indigo-500", change: `${stats.pendingOrders} pending` },
    { label: "Customers", value: stats.totalCustomers.toString(), icon: <Users className="w-6 h-6" />, color: "from-emerald-400 to-green-500", change: "+5% this week" },
    { label: "Products", value: stats.totalProducts.toString(), icon: <Package className="w-6 h-6" />, color: "from-purple-400 to-violet-500", change: "Active listings" },
    { label: "New Inquiries", value: stats.newInquiries.toString(), icon: <MessageSquare className="w-6 h-6" />, color: "from-rose-400 to-pink-500", change: "Needs response" },
  ] : [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="h-10 w-10 skeleton rounded-xl mb-3" />
              <div className="h-6 w-24 skeleton rounded mb-1" />
              <div className="h-4 w-32 skeleton rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center text-white mb-3`}>
                {card.icon}
              </div>
              <p className="text-2xl font-bold text-slate-900 mb-1">{card.value}</p>
              <p className="text-xs font-medium text-slate-500">{card.label}</p>
              <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />{card.change}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Recent Orders */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-slate-200">
            <h2 className="font-bold text-slate-900">Recent Orders</h2>
            <a href="/admin/orders" className="text-xs text-amber-500 hover:underline font-medium">View All</a>
          </div>
          <div className="divide-y divide-slate-100">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <div className="h-4 flex-1 skeleton rounded" />
                  <div className="h-4 w-20 skeleton rounded" />
                </div>
              ))
            ) : recentOrders.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No orders yet</p>
              </div>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm">{order.orderNumber}</p>
                    <p className="text-xs text-slate-400">{order.shippingName}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[order.status] || "bg-slate-100 text-slate-600"}`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{formatPrice(order.totalAmount)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "Add New Product", href: "/admin/products/new", icon: <Package className="w-4 h-4" />, color: "bg-amber-50 text-amber-600 hover:bg-amber-100" },
                { label: "View Inquiries", href: "/admin/inquiries", icon: <MessageSquare className="w-4 h-4" />, color: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
                { label: "Manage Orders", href: "/admin/orders", icon: <ShoppingBag className="w-4 h-4" />, color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" },
                { label: "Write Blog Post", href: "/admin/blog/new", icon: <AlertCircle className="w-4 h-4" />, color: "bg-purple-50 text-purple-600 hover:bg-purple-100" },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${action.color}`}
                >
                  {action.icon}
                  {action.label}
                </a>
              ))}
            </div>
          </div>

          {/* Status breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-900 mb-4">Order Status</h2>
            <div className="space-y-3">
              {[
                { label: "Pending", count: stats?.pendingOrders || 0, icon: <Clock className="w-4 h-4 text-amber-500" /> },
                { label: "Confirmed", count: 0, icon: <CheckCircle className="w-4 h-4 text-blue-500" /> },
                { label: "Delivered", count: 0, icon: <CheckCircle className="w-4 h-4 text-emerald-500" /> },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3 text-sm">
                  {s.icon}
                  <span className="flex-1 text-slate-600">{s.label}</span>
                  <span className="font-bold text-slate-900">{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
