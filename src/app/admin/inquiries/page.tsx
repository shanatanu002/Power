import type { Metadata } from "next";
import { AdminInquiriesManager } from "@/components/admin/inquiries-manager";

export const metadata: Metadata = { title: "Inquiries | Admin" };

export default function AdminInquiriesPage() {
  return <AdminInquiriesManager />;
}
