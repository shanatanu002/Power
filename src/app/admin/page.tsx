import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/dashboard";

export const metadata: Metadata = { title: "Admin Dashboard | Yati Powers" };

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
