"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, RefreshCw, ShoppingBag, Eye, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import { toast } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const ORDER_STATUSES = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  CONFIRMED: "bg-blue-100 text-blue-700 border-blue-200",
  PROCESSING: "bg-purple-100 text-purple-700 border-purple-200",
  SHIPPED: "bg-indigo-100 text-indigo-700 border-indigo-200",
  DELIVERED: "bg-emerald-100 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
};

interface Order {
  id: string;
  orderNumber: string;
  shippingName: string;
  shippingEmail: string;
  shippingPhone: string;
  shippingCity: string;
  shippingState: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount: number;
  createdAt: string;
  items: { quantity: number; product: { name: string } }[];
}

export function AdminOrdersManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const LIMIT = 15;

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: LIMIT.toString(),
        ...(filterStatus !== "ALL" && { status: filterStatus }),
      });
      const res = await fetch(`/api/orders?${params}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.data || []);
        setTotal(data.meta?.total || 0);
      }
    } catch {
      toast({ type: "error", title: "Failed to load orders" });
    } finally {
      setLoading(false);
    }
  }, [page, filterStatus]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast({ type: "success", title: `Order status updated to ${status}` });
        fetchOrders();
      }
    } catch {
      toast({ type: "error", title: "Failed to update status" });
    }
  };

  const filteredOrders = orders.filter((o) =>
    !search ||
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
    o.shippingName.toLowerCase().includes(search.toLowerCase()) ||
    o.shippingEmail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
          <p className="text-slate-500 text-sm">{total} total orders</p>
        </div>
        <button onClick={fetchOrders} className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
          <RefreshCw className={`w-4 h-4 text-slate-500 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search orders, customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          {["ALL", ...ORDER_STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => { setFilterStatus(s); setPage(1); }}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                filterStatus === s ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Order</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Items</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Payment</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 8 }).map((__, j) => (
                      <td key={j} className="px-4 py-4"><div className="h-4 skeleton rounded" /></td>
                    ))}
                  </tr>
                ))
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-slate-400">
                    <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No orders found</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <>
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-sm font-semibold text-slate-900">{order.orderNumber}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-slate-800">{order.shippingName}</p>
                        <p className="text-xs text-slate-400">{order.shippingCity}, {order.shippingState}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-slate-600">{order.items.length} item(s)</p>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {order.items.map((i) => i.product.name).join(", ")}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-bold text-slate-900">{formatPrice(order.totalAmount)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={order.paymentStatus === "PAID" ? "success" : "warning"}
                          className="text-xs"
                        >
                          {order.paymentStatus}
                        </Badge>
                        <p className="text-xs text-slate-400 mt-0.5">{order.paymentMethod}</p>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className={cn(
                            "text-xs font-medium px-2 py-1 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500",
                            statusStyles[order.status] || "bg-slate-100 text-slate-600"
                          )}
                        >
                          {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end">
                          <button
                            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            <ChevronDown className={cn("w-4 h-4 transition-transform", expandedOrder === order.id && "rotate-180")} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedOrder === order.id && (
                      <tr key={`${order.id}-expand`} className="bg-slate-50">
                        <td colSpan={8} className="px-4 py-3">
                          <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-semibold text-slate-700 mb-1">Shipping Address</p>
                              <p className="text-slate-500">{order.shippingName}</p>
                              <p className="text-slate-500">{order.shippingPhone}</p>
                              <p className="text-slate-500">{order.shippingEmail}</p>
                              <p className="text-slate-500">{order.shippingCity}, {order.shippingState}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-slate-700 mb-1">Items</p>
                              {order.items.map((item, i) => (
                                <p key={i} className="text-slate-500">{item.product.name} × {item.quantity}</p>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>

        {total > LIMIT && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Showing {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, total)} of {total}
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
              <Button size="sm" variant="outline" disabled={page * LIMIT >= total} onClick={() => setPage(page + 1)}>Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
