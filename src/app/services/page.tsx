import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { ServicesContent } from "@/components/pages/services-content";

export const metadata: Metadata = {
  title: "Solar Installation & Services",
  description: "Comprehensive solar energy services — residential, commercial, industrial installation, battery backup, maintenance and more across India.",
};

export default function ServicesPage() {
  return (
    <MainLayout>
      <ServicesContent />
    </MainLayout>
  );
}
