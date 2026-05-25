import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your solar product order",
};

export default function CheckoutPage() {
  return (
    <MainLayout>
      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>
          <CheckoutForm />
        </div>
      </div>
    </MainLayout>
  );
}
