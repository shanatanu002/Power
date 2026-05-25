import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { InquiryForm } from "@/components/home/inquiry-form";

export const metadata: Metadata = {
  title: "Contact Us — Free Solar Consultation",
  description: "Get in touch with Yati Powers for a free solar consultation, product inquiry, or installation quote. Call, WhatsApp, or fill the form.",
};

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Contact Us</span>
          <h1 className="text-5xl font-bold mt-3 mb-4">Let&apos;s Talk Solar</h1>
          <p className="text-slate-300 text-lg">
            Our solar experts are ready to help. Get a free consultation, customized quote, or just ask a question.
          </p>
        </div>
      </div>
      <InquiryForm />

      {/* Map placeholder */}
      <section className="h-80 bg-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 text-slate-500">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium">123, Solar Street, Energy Nagar, India</p>
          <p className="text-xs">Google Maps integration — add your API key in .env</p>
        </div>
      </section>
    </MainLayout>
  );
}
