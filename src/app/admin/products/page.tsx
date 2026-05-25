import type { Metadata } from "next";
import { AdminProductsManager } from "@/components/admin/products-manager";

export const metadata: Metadata = { title: "Manage Products | Admin" };

export default function AdminProductsPage() {
  return <AdminProductsManager />;
}
