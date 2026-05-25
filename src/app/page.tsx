import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/home/hero";
import { CategoriesSection } from "@/components/home/categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { BrandsSection } from "@/components/home/brands";
import { SolarCalculator } from "@/components/home/solar-calculator";
import { TestimonialsSection } from "@/components/home/testimonials";
import { InquiryForm } from "@/components/home/inquiry-form";
import { SolutionsSection } from "@/components/home/solutions";
import { FAQSection } from "@/components/home/faq";

export const metadata: Metadata = {
  title: "Yati Powers - Premium Solar Panels & Battery Solutions in India",
  description: "India's trusted solar energy solutions provider. Supply and installation of solar panels, lithium batteries, inverters from top brands — Adani, Tata, Luminous, Waaree. Residential, commercial & industrial solar solutions.",
};

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <SolutionsSection />
      <WhyChooseUs />
      <SolarCalculator />
      <BrandsSection />
      <TestimonialsSection />
      <InquiryForm />
      <FAQSection />
    </MainLayout>
  );
}
