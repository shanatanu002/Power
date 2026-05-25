"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, RefreshCw, MessageSquare, Phone, Mail, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { toast } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const typeColors: Record<string, string> = {
  GENERAL: "bg-slate-100 text-slate-600",
  PRODUCT: "bg-blue-100 text-blue-600",
  QUOTE: "bg-amber-100 text-amber-600",
  INSTALLATION: "bg-purple-100 text-purple-600",
  CONSULTATION: "bg-emerald-100 text-emerald-600",
  COMPLAINT: "bg-red-100 text-red-600",
};

const statusColors: Record<string, string> = {
  NEW: "bg-red-100 text-red-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  RESOLVED: "bg-emerald-100 text-emerald-700",
  CLOSED: "bg-slate-100 text-slate-600",
};

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  type: string;
  status: string;
  createdAt: string;
  product?: { name: string; slug: string } | null;
}

export function AdminInquiriesManager() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: "50",
        ...(filterStatus !== "ALL" && { status: filterStatus }),
      });
      const res = await fetch(`/api/inquiries?${params}`);
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.data || []);
        setTotal(data.meta?.total || 0);
      }
    } catch {
      toast({ type: "error", title: "Failed to load inquiries" });
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast({ type: "success", title: "Status updated" });
        fetchInquiries();
      }
    } catch {
      toast({ type: "error", title: "Update failed" });
    }
  };

  const filtered = inquiries.filter((i) =>
    !search ||
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.email.toLowerCase().includes(search.toLowerCase()) ||
    i.phone.includes(search)
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inquiries</h1>
          <p className="text-slate-500 text-sm">{total} total inquiries</p>
        </div>
        <button onClick={fetchInquiries} className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50">
          <RefreshCw className={`w-4 h-4 text-slate-500 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search by name, email, phone..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          {["ALL", "NEW", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
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

      {/* Cards */}
      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="space-y-2">
                <div className="h-4 w-48 skeleton rounded" />
                <div className="h-3 w-full skeleton rounded" />
              </div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 py-16 text-center text-slate-400">
            <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No inquiries found</p>
          </div>
        ) : (
          filtered.map((inquiry) => (
            <div key={inquiry.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div
                className="flex items-start gap-4 p-5 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setExpanded(expanded === inquiry.id ? null : inquiry.id)}
              >
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-amber-600 font-bold text-sm">{inquiry.name[0].toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <p className="font-semibold text-slate-900">{inquiry.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{inquiry.email}</span>
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{inquiry.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColors[inquiry.type]}`}>
                        {inquiry.type}
                      </span>
                      <select
                        value={inquiry.status}
                        onChange={(e) => { e.stopPropagation(); updateStatus(inquiry.id, e.target.value); }}
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                          "text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500",
                          statusColors[inquiry.status]
                        )}
                      >
                        {["NEW", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <span className="text-xs text-slate-400">{formatDate(inquiry.createdAt)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-2 line-clamp-2">{inquiry.message}</p>
                </div>
              </div>

              {expanded === inquiry.id && (
                <div className="border-t border-slate-100 p-5 bg-slate-50">
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">{inquiry.message}</p>
                  {inquiry.product && (
                    <p className="text-sm text-slate-500 mb-4">
                      Product: <a href={`/products/${inquiry.product.slug}`} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline flex items-center gap-1 inline-flex">
                        {inquiry.product.name} <ExternalLink className="w-3 h-3" />
                      </a>
                    </p>
                  )}
                  <div className="flex gap-3">
                    <a href={`mailto:${inquiry.email}`} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors">
                      <Mail className="w-4 h-4" /> Reply Email
                    </a>
                    <a href={`tel:${inquiry.phone}`} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-colors">
                      <Phone className="w-4 h-4" /> Call
                    </a>
                    <a
                      href={`https://wa.me/${inquiry.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${inquiry.name}, regarding your solar inquiry...`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
