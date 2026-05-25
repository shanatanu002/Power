import type { Metadata } from "next";
import { AdminOrdersManager } from "@/components/admin/orders-manager";

export const metadata: Metadata = { title: "Manage Orders | Admin" };

export default function AdminOrdersPage() {
  return <AdminOrdersManager />;
}
