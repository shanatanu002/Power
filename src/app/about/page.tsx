import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { AboutContent } from "@/components/pages/about-content";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Yati Powers — India's trusted solar energy solutions provider with 15+ years of experience supplying premium solar panels, batteries and inverters.",
};

export default function AboutPage() {
  return (
    <MainLayout>
      <AboutContent />
    </MainLayout>
  );
}
